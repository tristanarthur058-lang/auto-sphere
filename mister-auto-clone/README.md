<<<<<<< HEAD
"# auto-sphere"  
"# auto-sphere"  
=======
# AutoParts — Clone de vitrine e-commerce (style Mister Auto)

Vitrine catalogue en Next.js 14 (App Router) + Prisma, sans module de paiement.

## Fonctionnalités

- Sélecteur de marque qui filtre le catalogue
- Catalogue avec filtres par catégorie et par marque, + recherche texte
- Fiches produit (image, référence, prix, description, marque)
- Pages Accueil, Catalogue, Fiche produit, Marque, Panier, Contact, À propos
- **Panier** : ajout depuis les cartes produit ou la fiche produit, quantités modifiables,
  persistant (localStorage) — page `/panier` avec récapitulatif
- **Commande sans paiement en ligne** : le bouton "Commander via WhatsApp" ouvre WhatsApp
  avec un message pré-rempli listant les articles et le total, envoyé au numéro de contact.
  Un bouton "Appeler pour commander" (lien `tel:`) est proposé en alternative.
- Design bleu/gris sobre, référence produit façon "fiche technique" en police mono

## Installation en local

```bash
npm install
```

### Base de données (développement — SQLite, zéro config)

Le schéma `prisma/schema.prisma` est configuré par défaut sur SQLite
(fichier local `prisma/dev.db`), pour que tu puisses tester immédiatement
sans installer PostgreSQL.

```bash
npx prisma generate
npm run db:push      # crée les tables dans prisma/dev.db
npm run db:seed      # remplit la base avec des données de démo
npm run dev           # http://localhost:3000
```

### Passage en production sur PostgreSQL

1. Ouvre `prisma/schema.prisma` et remplace le bloc `datasource db` actif
   (SQLite) par le bloc PostgreSQL déjà présent en commentaire juste en
   dessous.
2. Copie `.env.example` vers `.env` et renseigne `DATABASE_URL` avec les
   identifiants de ta base PostgreSQL (Neon, Supabase, Railway, RDS, etc.).
3. Relance :

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

4. Déploie (Vercel, par exemple) en renseignant `DATABASE_URL` dans les
   variables d'environnement du projet.

## Structure

```
app/
  page.tsx                 → Accueil
  catalogue/page.tsx        → Catalogue + filtres
  produit/[slug]/page.tsx   → Fiche produit
  marque/[slug]/page.tsx    → Page marque
  contact/page.tsx
  a-propos/page.tsx
components/
  Header.tsx, Footer.tsx, VehicleSelector.tsx, ProductCard.tsx
lib/
  prisma.ts   → client Prisma
  data.ts     → requêtes (catégories, marques, catalogue, produits…)
prisma/
  schema.prisma, seed.ts
```

## Prochaines étapes possibles

- Paiement en ligne (Stripe) en plus de la commande WhatsApp/téléphone
- Espace client (connexion / historique de commandes)
- Espace admin pour gérer le catalogue sans passer par la BDD directement

## Modifier le numéro de contact utilisé pour les commandes

Le numéro utilisé pour WhatsApp et l'appel se trouve dans `lib/contact.ts`.
>>>>>>> 508ef6d (projet auto-sphere)
