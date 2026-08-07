-- Le strict nécessaire pour charger comptes.sql hors de Supabase :
-- le schéma auth, une table users, auth.uid() pilotable, les deux rôles,
-- et la publication temps réel.
create schema if not exists auth;

create table if not exists auth.users (
  id                 uuid primary key default gen_random_uuid(),
  email              text,
  raw_user_meta_data jsonb default '{}'::jsonb
);

-- Chez Supabase, auth.uid() lit le jeton. Ici on la pilote par un réglage
-- de session : c'est ce qui permet de jouer tour à tour chaque compte.
create or replace function auth.uid() returns uuid
language sql stable as $$
  select nullif(current_setting('cn.uid', true), '')::uuid;
$$;

do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated; end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end $$;
