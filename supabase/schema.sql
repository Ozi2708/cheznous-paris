-- ─────────────────────────────────────────────────────────────
-- Chez nous à Paris — état partagé entre les téléphones du foyer
-- À coller dans Supabase : SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────

-- Une ligne par (foyer, type de donnée).
-- Découper par clé évite que la liste de courses écrase le planning.
create table if not exists foyer_state (
  code        text        not null,
  key         text        not null,   -- 'week' | 'shop' | 'favs' | 'batch' | 'pending'
  value       jsonb       not null,
  updated_at  timestamptz not null default now(),
  primary key (code, key)
);

alter table foyer_state enable row level security;

-- Le code de foyer (long et aléatoire) fait office de secret partagé.
drop policy if exists "acces_par_code_de_foyer" on foyer_state;
create policy "acces_par_code_de_foyer"
  on foyer_state
  for all
  to anon
  using (true)
  with check (char_length(code) >= 8);

-- Diffusion temps réel vers les téléphones connectés.
alter table foyer_state replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'foyer_state'
  ) then
    alter publication supabase_realtime add table foyer_state;
  end if;
end $$;
