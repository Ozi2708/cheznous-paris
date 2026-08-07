-- ─────────────────────────────────────────────────────────────
-- Qui est quoi, et où ? — à coller dans le SQL Editor de Supabase.
-- Ne modifie rien : ces requêtes se contentent de regarder.
-- ─────────────────────────────────────────────────────────────

-- 0. Le script installé est-il à jour ? À lancer en premier : tant que la
--    réponse n'est pas la version attendue, le reste ne veut rien dire.
select cn_version() as version_installee;

select array_to_string(proargnames, ', ') as colonnes_de_cn_mon_foyer
from pg_proc where proname = 'cn_mon_foyer';

-- 1. Les comptes existants, et s'ils sont confirmés.
select u.email,
       u.email_confirmed_at is not null as confirme,
       u.created_at
from auth.users u
order by u.created_at;

-- 2. Les foyers, leurs membres et leur rôle. C'est la réponse à
--    « pourquoi suis-je membre et pas fondateur ».
select f.nom            as foyer,
       f.code,
       p.prenom,
       p.email,
       m.role,
       m.joined_at
from foyer_members m
join foyers   f on f.id = m.foyer_id
join profiles p on p.id = m.user_id
order by f.created_at, m.joined_at;

-- 3. Les invitations en attente.
select f.nom as foyer, i.email as adresse_invitee, i.created_at
from foyer_invitations i
join foyers f on f.id = i.foyer_id
order by i.created_at;

-- 4. Ce que contient chaque foyer.
select f.nom as foyer, d.cle, d.updated_at, length(d.valeur::text) as taille
from foyer_data d
join foyers f on f.id = d.foyer_id
order by f.nom, d.cle;


-- ─────────────────────────────────────────────────────────────
-- Réparation manuelle, si la requête 2 montre un rôle inattendu.
-- Remplacez l'adresse, puis exécutez la ligne voulue.
-- ─────────────────────────────────────────────────────────────

-- Faire de quelqu'un le fondateur de son foyer :
-- update foyer_members m set role = 'fondateur'
-- from profiles p
-- where p.id = m.user_id and lower(p.email) = 'valentin@exemple.fr';

-- Repasser quelqu'un en simple membre :
-- update foyer_members m set role = 'membre'
-- from profiles p
-- where p.id = m.user_id and lower(p.email) = 'manon@exemple.fr';
