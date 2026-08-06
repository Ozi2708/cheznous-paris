-- ─────────────────────────────────────────────────────────────
-- Chez nous à Paris — comptes personnels et foyers partagés
-- À coller dans Supabase : SQL Editor → New query → Run
--
-- Remplace le partage par simple code (table foyer_state), où le code
-- suffisait à tout lire. Ici chacun a son compte ; l'accès aux données
-- d'un foyer découle de l'appartenance à ce foyer, vérifiée par Postgres
-- à chaque requête. Le script est rejouable sans dommage.
-- ─────────────────────────────────────────────────────────────


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


-- ── 6. Codes d'invitation ──
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


-- ── 7. Créer un foyer ──
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


-- ── 8. Rejoindre un foyer ──
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

  select * into cible from foyers where foyers.code = propre;
  if not found then
    raise exception 'Aucun foyer ne porte ce code.';
  end if;

  insert into foyer_members (foyer_id, user_id, role)
  values (cible.id, moi, 'membre')
  on conflict (foyer_id, user_id) do nothing;

  return query select cible.id, cible.code, cible.nom;
end $$;


-- ── 9. Mon foyer ──
-- Un seul aller-retour au démarrage : le foyer et ses membres.
create or replace function cn_mon_foyer()
returns table (foyer_id uuid, code text, nom text, membres jsonb)
language sql
security definer
stable
set search_path = public
as $$
  select
    f.id,
    f.code,
    f.nom,
    coalesce(
      (select jsonb_agg(jsonb_build_object(
                'id', p.id,
                'prenom', p.prenom,
                'email', p.email,
                'role', m2.role
              ) order by m2.joined_at)
       from foyer_members m2
       join profiles p on p.id = m2.user_id
       where m2.foyer_id = f.id),
      '[]'::jsonb
    )
  from foyer_members m
  join foyers f on f.id = m.foyer_id
  where m.user_id = auth.uid()
  order by m.joined_at
  limit 1;
$$;


-- Ces fonctions n'ont de sens que connecté.
revoke execute on function cn_creer_foyer(text)    from anon;
revoke execute on function cn_rejoindre_foyer(text) from anon;
revoke execute on function cn_mon_foyer()          from anon;
grant  execute on function cn_creer_foyer(text)    to authenticated;
grant  execute on function cn_rejoindre_foyer(text) to authenticated;
grant  execute on function cn_mon_foyer()          to authenticated;


-- ── 10. Diffusion temps réel ──
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
