-- ─────────────────────────────────────────────────────────────
-- Chez nous à Paris — comptes personnels et foyers partagés
-- À coller dans Supabase : SQL Editor → New query → Run
--
-- Remplace le partage par simple code (table foyer_state), où le code
-- suffisait à tout lire. Ici chacun a son compte ; l'accès aux données
-- d'un foyer découle de l'appartenance à ce foyer, vérifiée par Postgres
-- à chaque requête. Le script est rejouable sans dommage.
-- ─────────────────────────────────────────────────────────────


-- ── 0. Version ──
-- Le script est long, et le SQL Editor annule tout dès la moindre erreur :
-- on ne peut pas savoir de l'extérieur si une exécution a abouti. Cette
-- fonction le dit. Après « Run », lancez :
--
--     select cn_version();
--
-- Si la date qui revient n'est pas celle-ci, le script n'est pas passé —
-- regardez le message d'erreur rouge, il porte la cause.
drop function if exists cn_version();
create function cn_version() returns text
language sql immutable as $$ select '2026-08-07-d'::text $$;
grant execute on function cn_version() to authenticated, anon;


-- ── 1. Profils ──
-- Une ligne par compte, créée automatiquement à l'inscription.
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  prenom     text        not null default '',
  email      text        not null default '',
  created_at timestamptz not null default now()
);

-- Le prénom voyage dans les métadonnées de l'inscription.
create or replace function cn_nouveau_profil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, prenom, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'prenom', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists cn_trigger_nouveau_profil on auth.users;
create trigger cn_trigger_nouveau_profil
  after insert on auth.users
  for each row execute function cn_nouveau_profil();


-- ── 2. Foyers et appartenances ──
create table if not exists foyers (
  id         uuid primary key default gen_random_uuid(),
  nom        text        not null default 'Notre foyer',
  code       text        not null unique,
  cree_par   uuid        references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists foyer_members (
  foyer_id  uuid not null references foyers(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  role      text not null default 'membre',   -- 'fondateur' | 'membre'
  joined_at timestamptz not null default now(),
  primary key (foyer_id, user_id)
);

create index if not exists foyer_members_user_idx on foyer_members(user_id);


-- ── 3. Données partagées ──
-- Une ligne par (foyer, type de donnée) : découper par clé évite que la
-- liste de courses écrase le planning.
--
-- « appareil » porte l'identifiant du téléphone qui a écrit. C'est ce qui
-- permet à ce téléphone de reconnaître son propre écho en temps réel sans
-- comparer les valeurs — la comparaison échouait dès deux écritures
-- rapprochées, et l'app annulait sa propre modification.
create table if not exists foyer_data (
  foyer_id   uuid        not null references foyers(id) on delete cascade,
  cle        text        not null,
  valeur     jsonb       not null,
  updated_at timestamptz not null default now(),
  maj_par    uuid        references auth.users(id) on delete set null,
  appareil   text        not null default '',
  primary key (foyer_id, cle)
);

-- L'horodatage est posé par le serveur, jamais par le téléphone : deux
-- téléphones n'ont pas la même heure, et une horloge en retard ferait
-- passer une écriture ancienne pour la plus récente.
create or replace function cn_horodate()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists cn_trigger_horodate on foyer_data;
create trigger cn_trigger_horodate
  before insert or update on foyer_data
  for each row execute function cn_horodate();


-- ── 4. Appartenance ──
-- Interrogée par les règles de sécurité de foyer_members elle-même : sans
-- « security definer » Postgres bouclerait (la règle consulte la table
-- qu'elle protège). La fonction contourne les règles, mais ne répond que
-- sur l'utilisateur connecté.
create or replace function cn_est_membre(p_foyer uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from foyer_members
    where foyer_id = p_foyer and user_id = auth.uid()
  );
$$;

-- « Cette personne partage-t-elle un foyer avec moi ? » — sert à n'exposer
-- les profils qu'entre membres d'un même foyer.
create or replace function cn_partage_foyer(p_user uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from foyer_members mien
    join foyer_members autre on autre.foyer_id = mien.foyer_id
    where mien.user_id = auth.uid() and autre.user_id = p_user
  );
$$;


-- ── 5. Règles d'accès ──
alter table profiles      enable row level security;
alter table foyers        enable row level security;
alter table foyer_members enable row level security;
alter table foyer_data    enable row level security;

-- Profils : le sien, et ceux du foyer.
drop policy if exists "profil_lecture" on profiles;
create policy "profil_lecture" on profiles for select to authenticated
  using (id = auth.uid() or cn_partage_foyer(id));

drop policy if exists "profil_maj" on profiles;
create policy "profil_maj" on profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- Foyers : lecture réservée aux membres ; la création passe par la
-- fonction cn_creer_foyer, jamais par une insertion directe.
drop policy if exists "foyer_lecture" on foyers;
create policy "foyer_lecture" on foyers for select to authenticated
  using (cn_est_membre(id));

drop policy if exists "foyer_maj" on foyers;
create policy "foyer_maj" on foyers for update to authenticated
  using (cn_est_membre(id)) with check (cn_est_membre(id));

-- Appartenances : on voit ses colocataires, on ne peut retirer que soi.
drop policy if exists "membres_lecture" on foyer_members;
create policy "membres_lecture" on foyer_members for select to authenticated
  using (cn_est_membre(foyer_id));

drop policy if exists "membres_depart" on foyer_members;
create policy "membres_depart" on foyer_members for delete to authenticated
  using (user_id = auth.uid());

-- Données : tout est permis aux membres, rien aux autres.
drop policy if exists "donnees_membres" on foyer_data;
create policy "donnees_membres" on foyer_data for all to authenticated
  using (cn_est_membre(foyer_id)) with check (cn_est_membre(foyer_id));

-- Les règles ci-dessus disent qui a le droit de voir quelles lignes ; les
-- droits ci-dessous disent qui a le droit de toucher la table. Il faut les
-- deux. Supabase les accorde d'ordinaire tout seul aux nouvelles tables,
-- mais un projet où ce réglage a été modifié refuserait tout avec un
-- « permission denied » que rien dans les règles n'expliquerait.
grant usage on schema public to authenticated;
grant select, update                 on profiles      to authenticated;
grant select, update                 on foyers        to authenticated;
grant select, delete                 on foyer_members to authenticated;
grant select, insert, update, delete on foyer_data    to authenticated;


-- ── 6. Mise à niveau ──
-- « create or replace » sait tout changer d'une fonction sauf la forme de
-- ce qu'elle rend. Une fonction qui gagne une colonne fait donc échouer le
-- script sur une base déjà installée, l'ancienne version reste en place, et
-- l'app se retrouve devant une réponse à laquelle il manque des champs :
-- elle prend le fondateur pour un simple membre et cache ses commandes.
-- On efface donc les fonctions appelées par l'app avant de les réécrire.
--
-- Les fonctions citées par les règles d'accès (cn_est_membre,
-- cn_partage_foyer) n'apparaissent pas ici : Postgres refuserait de les
-- supprimer, et leur forme n'a pas bougé.
drop function if exists cn_mon_foyer();
drop function if exists cn_creer_foyer(text);
drop function if exists cn_rejoindre_foyer(text);
drop function if exists cn_inviter(text);
drop function if exists cn_annuler_invitation(text);
drop function if exists cn_retirer_membre(uuid);
drop function if exists cn_accepter_invitation(uuid);


-- ── 7. Codes d'invitation ──
-- Alphabet sans caractères ambigus (ni I, O, 0, 1) : un code se lit à voix
-- haute sans hésitation.
create or replace function cn_genere_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  lettres constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  essai   text;
  i       int;
begin
  loop
    essai := '';
    for i in 1..8 loop
      essai := essai || substr(lettres, 1 + floor(random() * length(lettres))::int, 1);
    end loop;
    exit when not exists (select 1 from foyers where code = essai);
  end loop;
  return essai;
end $$;


-- ── 8. Créer un foyer ──
create or replace function cn_creer_foyer(p_nom text default 'Notre foyer')
returns table (foyer_id uuid, code text, nom text)
language plpgsql
security definer
set search_path = public
as $$
declare
  moi      uuid := auth.uid();
  nouveau  foyers%rowtype;
begin
  if moi is null then
    raise exception 'Connexion requise.';
  end if;

  insert into foyers (nom, code, cree_par)
  values (coalesce(nullif(trim(p_nom), ''), 'Notre foyer'), cn_genere_code(), moi)
  returning * into nouveau;

  insert into foyer_members (foyer_id, user_id, role)
  values (nouveau.id, moi, 'fondateur');

  return query select nouveau.id, nouveau.code, nouveau.nom;
end $$;


-- ── 9. Rejoindre un foyer ──
-- Passe par une fonction car les règles interdisent — à juste titre — de
-- lire un foyer dont on n'est pas encore membre.
create or replace function cn_rejoindre_foyer(p_code text)
returns table (foyer_id uuid, code text, nom text)
language plpgsql
security definer
set search_path = public
as $$
declare
  moi     uuid := auth.uid();
  propre  text := upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  cible   foyers%rowtype;
begin
  if moi is null then
    raise exception 'Connexion requise.';
  end if;

  select f.* into cible from foyers f where f.code = propre;
  if not found then
    raise exception 'Aucun foyer ne porte ce code.';
  end if;

  -- Toutes les colonnes sont préfixées : « foyer_id » est aussi le nom
  -- d'une valeur de retour de cette fonction, et Postgres refuse de
  -- trancher entre les deux.
  --
  -- Une personne, un foyer. Sans cela, quelqu'un qui a touché « Créer mon
  -- foyer » par erreur avant de saisir le code se retrouverait membre des
  -- deux, et l'app continuerait de lui montrer le premier : elle croirait
  -- avoir rejoint alors que rien n'aurait changé à l'écran.
  delete from foyer_members fm
  where fm.user_id = moi and fm.foyer_id <> cible.id;

  -- Un foyer que plus personne n'habite n'est joignable par personne.
  -- Celui qu'on rejoint est mis hors de portée : à cet instant on n'y est
  -- pas encore inscrit, et il serait emporté avec les autres.
  delete from foyers f
  where f.id <> cible.id
    and not exists (select 1 from foyer_members fm where fm.foyer_id = f.id);

  insert into foyer_members (foyer_id, user_id, role)
  select cible.id, moi, 'membre'
  where not exists (
    select 1 from foyer_members fm where fm.foyer_id = cible.id and fm.user_id = moi
  );

  return query select cible.id, cible.code, cible.nom;
end $$;


-- ── 10. Invitations par adresse ──
-- Le fondateur inscrit une adresse ; la personne qui se connecte avec cette
-- adresse est rattachée au foyer sans code à transmettre ni courriel à
-- envoyer. C'est l'adresse elle-même qui fait la clé.
create table if not exists foyer_invitations (
  foyer_id   uuid not null references foyers(id) on delete cascade,
  email      text not null,                    -- toujours en minuscules
  invite_par uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (foyer_id, email)
);

create index if not exists foyer_invitations_email_idx on foyer_invitations(email);

-- L'adresse du compte connecté. Lue dans profiles plutôt que dans le jeton :
-- une seule source, la même pour tout le monde.
create or replace function cn_mon_email()
returns text
language sql
security definer
stable
set search_path = public
as $$
  select lower(coalesce(p.email, '')) from profiles p where p.id = auth.uid();
$$;

create or replace function cn_est_fondateur(p_foyer uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from foyer_members m
    where m.foyer_id = p_foyer and m.user_id = auth.uid() and m.role = 'fondateur'
  );
$$;

alter table foyer_invitations enable row level security;

-- Une invitation se voit des deux côtés : par les membres du foyer, et par
-- la personne conviée.
drop policy if exists "invitations_lecture" on foyer_invitations;
create policy "invitations_lecture" on foyer_invitations for select to authenticated
  using (cn_est_membre(foyer_id) or email = cn_mon_email());

grant select on foyer_invitations to authenticated;


-- ── 11. Mon foyer ──
-- Un seul aller-retour au démarrage. La fonction commence par honorer une
-- invitation en attente : c'est le moment où l'adresse suffit à rattacher.
create or replace function cn_mon_foyer()
returns table (
  foyer_id uuid, code text, nom text, mon_role text,
  membres jsonb, invitations jsonb, invitation_recue jsonb
)
language plpgsql
security definer
set search_path = public
as $$
declare
  moi      uuid := auth.uid();
  mon_mail text := cn_mon_email();
  actuel   uuid;
  attendue uuid;
begin
  if moi is null then return; end if;

  select m.foyer_id into actuel
  from foyer_members m where m.user_id = moi
  order by m.joined_at desc limit 1;

  -- Sans foyer et attendu quelque part : on rattache, et l'invitation a
  -- rempli son office. Avec un foyer déjà en place, on ne déplace personne
  -- sans son accord : l'invitation reste en attente et l'app la propose.
  if actuel is null and mon_mail <> '' then
    select i.foyer_id into attendue
    from foyer_invitations i where i.email = mon_mail
    order by i.created_at limit 1;

    if attendue is not null then
      insert into foyer_members (foyer_id, user_id, role)
      values (attendue, moi, 'membre')
      on conflict do nothing;
      delete from foyer_invitations i where i.email = mon_mail and i.foyer_id = attendue;
      actuel := attendue;
    end if;
  end if;

  if actuel is null then return; end if;

  -- Un foyer sans fondateur ne peut plus être administré par personne :
  -- ni invitation, ni retrait. Cela arrive si le fondateur est parti, ou
  -- si l'appartenance a été créée par un chemin qui ne pose pas le rôle.
  -- Le plus ancien membre reprend alors la maison.
  if not exists (
    select 1 from foyer_members m where m.foyer_id = actuel and m.role = 'fondateur'
  ) then
    update foyer_members m set role = 'fondateur'
    where m.foyer_id = actuel
      and m.user_id = (
        select m2.user_id from foyer_members m2
        where m2.foyer_id = actuel
        order by m2.joined_at, m2.user_id limit 1
      );
  end if;

  return query
  select
    f.id,
    f.code,
    f.nom,
    (select m.role from foyer_members m where m.foyer_id = f.id and m.user_id = moi),
    coalesce(
      (select jsonb_agg(jsonb_build_object(
                'id', p.id, 'prenom', p.prenom, 'email', p.email, 'role', m2.role
              ) order by m2.joined_at)
       from foyer_members m2
       join profiles p on p.id = m2.user_id
       where m2.foyer_id = f.id),
      '[]'::jsonb),
    coalesce(
      (select jsonb_agg(jsonb_build_object('email', i.email, 'depuis', i.created_at)
                order by i.created_at)
       from foyer_invitations i where i.foyer_id = f.id),
      '[]'::jsonb),
    coalesce(
      (select jsonb_build_object('foyer_id', a.id, 'nom', a.nom)
       from foyer_invitations i
       join foyers a on a.id = i.foyer_id
       where i.email = mon_mail and i.foyer_id <> f.id
       order by i.created_at limit 1),
      'null'::jsonb)
  from foyers f where f.id = actuel;
end $$;


-- ── 12. Gestion du foyer, réservée au fondateur ──
create or replace function cn_inviter(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  moi    uuid := auth.uid();
  propre text := lower(trim(coalesce(p_email, '')));
  chez   uuid;
begin
  if moi is null then raise exception 'Connexion requise.'; end if;
  if propre !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$' then
    raise exception 'Adresse électronique invalide.';
  end if;

  select m.foyer_id into chez from foyer_members m
  where m.user_id = moi order by m.joined_at desc limit 1;
  if chez is null then raise exception 'Créez d’abord votre foyer.'; end if;
  if not cn_est_fondateur(chez) then
    raise exception 'Seul le fondateur du foyer peut inviter.';
  end if;
  if propre = cn_mon_email() then
    raise exception 'Cette adresse est la vôtre.';
  end if;

  -- Déjà présent : l'invitation n'aurait aucun effet, autant le dire.
  if exists (select 1 from foyer_members m join profiles p on p.id = m.user_id
             where m.foyer_id = chez and lower(p.email) = propre) then
    raise exception 'Cette personne fait déjà partie du foyer.';
  end if;

  insert into foyer_invitations (foyer_id, email, invite_par)
  values (chez, propre, moi)
  on conflict (foyer_id, email) do nothing;
end $$;

create or replace function cn_annuler_invitation(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  moi    uuid := auth.uid();
  propre text := lower(trim(coalesce(p_email, '')));
  chez   uuid;
begin
  if moi is null then raise exception 'Connexion requise.'; end if;
  select m.foyer_id into chez from foyer_members m
  where m.user_id = moi order by m.joined_at desc limit 1;
  if chez is null or not cn_est_fondateur(chez) then
    raise exception 'Seul le fondateur du foyer peut retirer une invitation.';
  end if;
  delete from foyer_invitations i where i.foyer_id = chez and i.email = propre;
end $$;

create or replace function cn_retirer_membre(p_user uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  moi  uuid := auth.uid();
  chez uuid;
begin
  if moi is null then raise exception 'Connexion requise.'; end if;
  if p_user = moi then
    raise exception 'Pour partir vous-même, quittez le foyer.';
  end if;
  select m.foyer_id into chez from foyer_members m
  where m.user_id = moi order by m.joined_at desc limit 1;
  if chez is null or not cn_est_fondateur(chez) then
    raise exception 'Seul le fondateur du foyer peut retirer un membre.';
  end if;
  delete from foyer_members m where m.foyer_id = chez and m.user_id = p_user;
end $$;

-- Accepter une invitation quand on appartient déjà à un foyer : c'est un
-- déménagement, il ne peut pas se faire dans le dos de l'intéressé.
create or replace function cn_accepter_invitation(p_foyer uuid)
returns table (foyer_id uuid, code text, nom text)
language plpgsql
security definer
set search_path = public
as $$
declare
  moi      uuid := auth.uid();
  mon_mail text := cn_mon_email();
  cible    foyers%rowtype;
begin
  if moi is null then raise exception 'Connexion requise.'; end if;
  if not exists (select 1 from foyer_invitations i
                 where i.foyer_id = p_foyer and i.email = mon_mail) then
    raise exception 'Aucune invitation en cours pour cette adresse.';
  end if;

  select f.* into cible from foyers f where f.id = p_foyer;
  if not found then raise exception 'Ce foyer n’existe plus.'; end if;

  delete from foyer_members fm where fm.user_id = moi and fm.foyer_id <> cible.id;
  delete from foyers f
  where f.id <> cible.id
    and not exists (select 1 from foyer_members fm where fm.foyer_id = f.id);

  insert into foyer_members (foyer_id, user_id, role)
  select cible.id, moi, 'membre'
  where not exists (
    select 1 from foyer_members fm where fm.foyer_id = cible.id and fm.user_id = moi
  );
  delete from foyer_invitations i where i.foyer_id = cible.id and i.email = mon_mail;

  return query select cible.id, cible.code, cible.nom;
end $$;


-- Ces fonctions n'ont de sens que connecté.
revoke execute on function cn_creer_foyer(text)         from anon;
revoke execute on function cn_rejoindre_foyer(text)     from anon;
revoke execute on function cn_mon_foyer()               from anon;
revoke execute on function cn_inviter(text)             from anon;
revoke execute on function cn_annuler_invitation(text)  from anon;
revoke execute on function cn_retirer_membre(uuid)      from anon;
revoke execute on function cn_accepter_invitation(uuid) from anon;
grant  execute on function cn_creer_foyer(text)         to authenticated;
grant  execute on function cn_rejoindre_foyer(text)     to authenticated;
grant  execute on function cn_mon_foyer()               to authenticated;
grant  execute on function cn_inviter(text)             to authenticated;
grant  execute on function cn_annuler_invitation(text)  to authenticated;
grant  execute on function cn_retirer_membre(uuid)      to authenticated;
grant  execute on function cn_accepter_invitation(uuid) to authenticated;


-- ── 13. Diffusion temps réel ──
alter table foyer_data replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'foyer_data'
  ) then
    alter publication supabase_realtime add table foyer_data;
  end if;
end $$;
