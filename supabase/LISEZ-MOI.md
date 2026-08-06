# Comptes et foyers — mise en service

Trois opérations dans le tableau de bord Supabase, une seule fois. Rien à
faire côté Vercel : l'app est déjà câblée.

## 1. Exécuter le script

**SQL Editor → New query** → coller tout `comptes.sql` → **Run**.

Le script est rejouable : on peut le relancer sans rien casser. Il crée les
profils, les foyers, les appartenances, la table des données partagées, et
les règles d'accès.

## 2. Activer les comptes par courriel

**Authentication → Sign In / Providers → Email** : activer le fournisseur.

**Confirm email** : à *désactiver* pour deux personnes. Sinon Supabase envoie
un courriel de confirmation via son serveur de démonstration — limité à
quelques envois par heure, et souvent classé en indésirable. Vous seriez
bloqués à l'inscription sans comprendre pourquoi.

Si vous préférez le garder actif, il faut brancher un vrai serveur d'envoi
dans **Project Settings → Auth → SMTP Settings**. L'app gère les deux cas :
sans confirmation elle connecte directement, avec confirmation elle affiche
« ouvrez le lien reçu par courriel ».

## 3. Autoriser l'adresse de l'app

**Authentication → URL Configuration → Redirect URLs** : ajouter l'adresse
Vercel du site. Elle ne sert qu'au lien « mot de passe oublié ».

---

## Ensuite, dans l'app

1. Chacun ouvre **Mon foyer** et crée son compte.
2. **Une seule personne** touche « Créer mon foyer ». Le contenu de *son*
   téléphone devient la référence partagée — choisissez celui qui est à jour.
3. L'autre touche « J'ai déjà un code » et saisit le code à huit caractères.
   Son contenu local est remplacé par celui du foyer : c'est annoncé à
   l'écran avant de valider.

## Ce que remplace ce script

L'ancien partage reposait sur la seule table `foyer_state` et un code de
foyer, avec une règle d'accès `using (true)` : n'importe qui disposant de la
clé publique — livrée dans le bundle, donc lisible par tous — pouvait lire
et modifier les données de **tous** les foyers, code ou pas. Ici l'accès
découle de l'appartenance, vérifiée par Postgres à chaque requête.

`foyer_state` n'est ni modifiée ni supprimée par le script : les anciennes
données restent consultables. On peut la retirer une fois la bascule faite :

```sql
drop table if exists foyer_state;
```
