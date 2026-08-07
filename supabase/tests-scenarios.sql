-- L'invitation par adresse, du point de vue des trois comptes.
\set ON_ERROR_STOP off
\pset pager off

insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'valentin@exemple.fr', '{"prenom":"Valentin"}'),
  ('22222222-2222-2222-2222-222222222222', 'manon@exemple.fr',    '{"prenom":"Manon"}'),
  ('33333333-3333-3333-3333-333333333333', 'tiers@exemple.fr',    '{"prenom":"Tiers"}');

\echo '=== 1. Valentin crée le foyer et y met ses recettes ==='
set cn.uid = '11111111-1111-1111-1111-111111111111';
select foyer_id from cn_creer_foyer('Chez nous') \gset f_
insert into foyer_data (foyer_id, cle, valeur, maj_par, appareil)
values (:'f_foyer_id', 'myrecipes', '["tarte","dahl"]'::jsonb,
        '11111111-1111-1111-1111-111111111111', 'tel-valentin');
select mon_role from cn_mon_foyer();

\echo '=== 2. Il invite l’adresse de Manon ==='
select cn_inviter('  MANON@exemple.FR  ');
\echo '  -> il voit l’invitation en attente :'
select invitations from cn_mon_foyer();

\echo '=== 3. Adresses refusées ==='
select cn_inviter('pasunemail');
select cn_inviter('valentin@exemple.fr');

\echo '=== 4. Manon se connecte : rattachée sans rien saisir ==='
set cn.uid = '22222222-2222-2222-2222-222222222222';
select nom, mon_role from cn_mon_foyer();
\echo '  -> l’invitation a été consommée :'
select count(*) as invitations_restantes from foyer_invitations;
\echo '  -> elle lit les recettes partagées :'
set role authenticated; select cle, valeur from foyer_data; reset role;

\echo '=== 5. Elle n’est pas fondatrice : elle ne peut ni inviter ni retirer ==='
select cn_inviter('quelquun@exemple.fr');
select cn_retirer_membre('11111111-1111-1111-1111-111111111111');

\echo '=== 6. Le tiers ne voit toujours rien ==='
set cn.uid = '33333333-3333-3333-3333-333333333333';
select count(*) as foyer_pour_le_tiers from cn_mon_foyer();
set role authenticated;
select count(*) as donnees_visibles from foyer_data;
select count(*) as invitations_visibles from foyer_invitations;
reset role;

\echo '=== 7. Valentin voit les deux membres et peut retirer Manon ==='
set cn.uid = '11111111-1111-1111-1111-111111111111';
select jsonb_array_length(membres) as nb_membres from cn_mon_foyer();
select cn_retirer_membre('22222222-2222-2222-2222-222222222222');
select jsonb_array_length(membres) as apres_retrait from cn_mon_foyer();
\echo '  -> il ne peut pas se retirer lui-même :'
select cn_retirer_membre('11111111-1111-1111-1111-111111111111');

\echo '=== 8. Invitation quand on a déjà un foyer : proposée, pas imposée ==='
set cn.uid = '22222222-2222-2222-2222-222222222222';
select foyer_id from cn_creer_foyer('Foyer de Manon') \gset m_
set cn.uid = '11111111-1111-1111-1111-111111111111';
select cn_inviter('manon@exemple.fr');
set cn.uid = '22222222-2222-2222-2222-222222222222';
\echo '  -> elle reste chez elle, et voit l’invitation :'
select nom, invitation_recue from cn_mon_foyer();
\echo '  -> elle accepte :'
select nom from cn_accepter_invitation(:'f_foyer_id');
select nom, jsonb_array_length(membres) as nb from cn_mon_foyer();
\echo '  -> son ancien foyer, sans habitant, a disparu :'
select count(*) as reste from foyers where id = :'m_foyer_id';

\echo '=== 9. Valentin annule une invitation ==='
set cn.uid = '11111111-1111-1111-1111-111111111111';
select cn_inviter('quelquun@exemple.fr');
select jsonb_array_length(invitations) as en_attente from cn_mon_foyer();
select cn_annuler_invitation('quelquun@exemple.fr');
select jsonb_array_length(invitations) as apres_annulation from cn_mon_foyer();
