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

1. La personne dont le téléphone est à jour ouvre **Mon foyer**, crée son
   compte, puis touche **« Créer mon foyer »**. Le contenu de *son*
   téléphone devient la référence partagée. Elle en est le fondateur.
2. Elle saisit l'**adresse** de l'autre dans « Inviter quelqu'un ».
3. L'autre crée son compte **avec cette adresse**. Le foyer apparaît de
   lui-même : rien à saisir, rien à recevoir. Son contenu local est
   remplacé par celui du foyer.

Aucun courriel n'est envoyé : c'est l'adresse qui fait la clé. Si l'adresse
saisie ne correspond pas à celle du compte créé, le **code du foyer** reste
disponible en secours, replié sous « Voir le code du foyer ».

Le fondateur voit les membres et les invitations en attente, peut annuler
une invitation et retirer un membre. Les autres membres voient la même
liste, sans les commandes.

Une invitation reçue alors qu'on appartient déjà à un foyer n'est jamais
appliquée d'office : elle est proposée, avec la mention que le contenu
local sera remplacé.

## Si la connexion se perd régulièrement sur un téléphone

C'était le cas avec l'ancien partage : la seule preuve qu'un téléphone
appartenait au foyer était un code rangé dans le stockage du navigateur. Ce
stockage vidé, la connexion était perdue et il fallait ressaisir le code.

L'appartenance vit maintenant dans la base, attachée au compte. Un
téléphone qui perd tout se reconnecte et retrouve son foyer.

Trois protections ont été ajoutées par-dessus :

- l'app **réclame le stockage permanent** au lancement, ce qui la met à
  l'abri du ménage que fait le téléphone quand il manque de place ;
- le jeton de reprise est recopié dans un **cookie**, qui ne vit pas au même
  endroit et survit à ce ménage : la session se rouvre toute seule, sans
  rien ressaisir ;
- l'app **compte les effacements**. Dans **Mon foyer → Diagnostic de cet
  appareil**, le relevé dit combien de fois le stockage a disparu, si l'app
  est ouverte depuis l'écran d'accueil, si le stockage permanent est
  accordé, et sur quelle adresse elle tourne.

Le geste qui change le plus de choses : **installer l'app sur l'écran
d'accueil** (menu Partager → « Sur l'écran d'accueil ») et l'ouvrir toujours
par cette icône. Une app installée est traitée tout autrement qu'un onglet.

Attention aussi à l'adresse : deux adresses différentes sont deux stockages
différents. Un lien vers une préversion Vercel n'est pas le même site que
l'adresse habituelle.

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
