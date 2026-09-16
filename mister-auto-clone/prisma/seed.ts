import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Nettoyage de la base…");
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();

  console.log("Création des catégories (types de pièces)…");
  const categories = await Promise.all(
    [
      { slug: "pare-choc-avant", name: "Pare-choc avant" },
      { slug: "pare-choc-arriere", name: "Pare-chocs arrière" },
      { slug: "console", name: "Console" },
      { slug: "ecran-multimedia", name: "Écran multimédia" },
      { slug: "phares", name: "Phares" },
      { slug: "volant", name: "Volant" },
      { slug: "jante", name: "Jante" },
      { slug: "sieges", name: "Sièges" },
    ].map((c) => prisma.category.create({ data: c }))
  );
  const cat = (slug: string) => categories.find((c) => c.slug === slug)!;

  console.log("Création des marques de véhicules…");
  const brandLogos: Record<string, string> = {
    Mercedes: "/images/marque-mercedes.jpg",
    Audi: "/images/marque-audi.jpg",
    BMW: "/images/marque-bmw.jpg",
    Dodge: "/images/marque-dodge.jpg",
    Porsche: "/images/marque-porsche.jpg",
    Volkswagen: "/images/marque-volkswagen.jpg",
  };
  const brands = await Promise.all(
    ["Mercedes", "Audi", "BMW", "Dodge", "Porsche", "Volkswagen"].map((name) =>
      prisma.brand.create({ data: { slug: name.toLowerCase(), name, logoUrl: brandLogos[name] } })
    )
  );
  const brand = (name: string) => brands.find((b) => b.name === name)!;

  console.log("Création des produits…");
  const products = [
    // --- Best-sellers (un par catégorie) ---
    {
      slug: "pare-choc-avant-mercedes",
      reference: "PCA-MB-001",
      name: "Pare-choc avant Mercedes Classe V / Vito W447",
      description: `Pare-choc avant d'origine Mercedes-Benz, noir, calandre diamant avec étoile centrale chromée, feux avant inclus.
Fixations et rails d'origine, prêt à poser.
Étiquette constructeur d'origine visible sur le phare (référence pièce Mercedes-Benz / Hella).

Compatibilité :
Mercedes-Benz Classe V W447 et Vito W447 — nous consulter pour confirmer la compatibilité exacte avec votre finition (calandre diamant, capteurs de stationnement, phares LED).`,
      price: 450.0,
      oldPrice: 600.0,
      imageUrl: "/images/pare-choc-avant-mercedes-1.jpg",
      images:
        "/images/pare-choc-avant-mercedes-1.jpg,/images/pare-choc-avant-mercedes-2.jpg,/images/pare-choc-avant-mercedes-3.jpg,/images/pare-choc-avant-mercedes-4.jpg,/images/pare-choc-avant-mercedes-5.jpg,/images/pare-choc-avant-mercedes-6.jpg",
      categorySlug: "pare-choc-avant",
      brandName: "Mercedes",
      bestSeller: true,
    },
    {
      slug: "jante-19-mercedes-amg",
      reference: "JT-MB-AMG-19",
      name: "Jeu de jantes AMG 19 pouces Mercedes (x4)",
      description: `Jeu de 4 jantes d'origine Mercedes-Benz AMG, finition noir brillant avec liseré poli, design 5 branches doubles caractéristique AMG, gravure "AMG" sur la jante et cache-moyeu Mercedes-Benz.

État neuf, vendues par jeu de 4.

Compatibilité :
Mercedes-Benz Classe C, Classe E, GLC (selon génération et finition AMG Line) — nous consulter avec votre numéro de châssis (VIN) pour confirmer l'entraxe et la compatibilité exacte avec votre modèle.`,
      price: 950.0,
      oldPrice: 1700.0,
      imageUrl: "/images/jante-19-mercedes-amg-1.jpg",
      images:
        "/images/jante-19-mercedes-amg-1.jpg,/images/jante-19-mercedes-amg-2.jpg,/images/jante-19-mercedes-amg-3.jpg,/images/jante-19-mercedes-amg-4.jpg,/images/jante-19-mercedes-amg-5.jpg,/images/jante-19-mercedes-amg-6.jpg",
      categorySlug: "jante",
      brandName: "Mercedes",
      bestSeller: true,
    },
    {
      slug: "ecran-multimedia-porsche",
      reference: "EM-PO-003",
      name: "Écran multimédia tactile Porsche PCM",
      description: `Écran tactile PCM (Porsche Communication Management) d'origine, boutons physiques rétroéclairés (SOURCE, SOUND, MEDIA, PHONE, APPS, CAR, NAV, OPTION), molettes de commande de chaque côté.

Références constructeur visibles au dos : 971.919.597.C (Panamera 971) et 958.919.597.D (Cayenne 958).

État neuf/déballé, prêt à installer.

Compatibilité :
Porsche Panamera (971) et Porsche Cayenne (958) — nous consulter avec votre référence constructeur ou votre VIN pour confirmer la compatibilité exacte avec votre version.`,
      price: 600.0,
      oldPrice: 890.0,
      imageUrl: "/images/ecran-multimedia-porsche-1.jpg",
      images:
        "/images/ecran-multimedia-porsche-1.jpg,/images/ecran-multimedia-porsche-2.jpg,/images/ecran-multimedia-porsche-3.jpg,/images/ecran-multimedia-porsche-4.jpg,/images/ecran-multimedia-porsche-5.jpg,/images/ecran-multimedia-porsche-6.jpg,/images/ecran-multimedia-porsche-7.jpg,/images/ecran-multimedia-porsche-8.jpg",
      categorySlug: "ecran-multimedia",
      brandName: "Porsche",
      bestSeller: true,
    },
    {
      slug: "phares-led-bmw",
      reference: "PH-BM-004",
      name: "Phares avant LED BMW Laser (paire)",
      description: `Paire de phares avant d'origine BMW, technologie Full LED avec module BMW Laser (feux de route longue portée), signature lumineuse bleue caractéristique, feux de jour intégrés.

Face arrière technique visible : connecteurs d'origine, étiquette constructeur, pastille de réglage, étiquette de sécurité laser.

Vendus en paire, montage direct, état neuf/déballé.

Compatibilité :
BMW Série 1 / 2 (selon génération) — nous consulter avec votre numéro de châssis (VIN) pour confirmer la compatibilité exacte avec votre modèle et finition.`,
      price: 630.0,
      oldPrice: 350.0,
      imageUrl: "/images/phares-led-bmw-1.jpg",
      images:
        "/images/phares-led-bmw-1.jpg,/images/phares-led-bmw-2.jpg,/images/phares-led-bmw-3.jpg,/images/phares-led-bmw-4.jpg,/images/phares-led-bmw-5.jpg,/images/phares-led-bmw-6.jpg,/images/phares-led-bmw-7.jpg,/images/phares-led-bmw-8.jpg,/images/phares-led-bmw-9.jpg,/images/phares-led-bmw-10.jpg",
      categorySlug: "phares",
      brandName: "BMW",
      bestSeller: true,
    },
    {
      slug: "volant-cuir-volkswagen",
      reference: "VL-VW-005",
      name: "Volant gainé cuir Volkswagen R-Line multifonction",
      description: `Volant d'origine Volkswagen gainé cuir noir, coutures contrastées, finitions R-Line (badge R sur la branche inférieure), branches aluminium brossé.

Commandes multifonction intégrées : régulateur/limiteur de vitesse (OK, décroché, flèches de navigation menu) sur la branche droite, contrôle audio (volume, sourdine) sur la branche gauche.

Vue de l'arrière : connecteurs d'origine (airbag et molette), fixations et axe de colonne de direction visibles.

État neuf/déballé.

Compatibilité :
Volkswagen Golf 7 / Golf 7.5 R-Line et modèles équipés du pack R-Line — nous consulter avec votre numéro de châssis (VIN) pour confirmer la compatibilité exacte (airbag et connectique selon millésime).`,
      price: 120.0,
      oldPrice: 200.0,
      imageUrl: "/images/volant-cuir-volkswagen-1.jpg",
      images:
        "/images/volant-cuir-volkswagen-1.jpg,/images/volant-cuir-volkswagen-2.jpg,/images/volant-cuir-volkswagen-3.jpg,/images/volant-cuir-volkswagen-4.jpg,/images/volant-cuir-volkswagen-5.jpg,/images/volant-cuir-volkswagen-6.jpg,/images/volant-cuir-volkswagen-7.jpg,/images/volant-cuir-volkswagen-8.jpg,/images/volant-cuir-volkswagen-9.jpg",
      categorySlug: "volant",
      brandName: "Volkswagen",
      bestSeller: true,
    },
    {
      slug: "pare-choc-arriere-dodge",
      reference: "PCR-DO-006",
      name: "Pare-choc arrière chromé Dodge Ram",
      description: `Pare-choc arrière d'origine Dodge Ram, finition chromée avec marchepieds intégrés et coins en plastique noir renforcé.

Emplacement de plaque d'immatriculation centralisé avec passage de câblage, découpe pour attelage/capteur.

État neuf, prêt à poser, fixations d'origine.

Compatibilité :
Dodge Ram (1500/2500/3500 selon génération) — nous consulter avec votre numéro de châssis (VIN) pour confirmer la compatibilité exacte avec votre modèle et année.`,
      price: 200.0,
      oldPrice: 380.0,
      imageUrl: "/images/pare-choc-arriere-dodge-1.jpg",
      images:
        "/images/pare-choc-arriere-dodge-1.jpg,/images/pare-choc-arriere-dodge-2.jpg,/images/pare-choc-arriere-dodge-3.jpg,/images/pare-choc-arriere-dodge-4.jpg",
      categorySlug: "pare-choc-arriere",
      brandName: "Dodge",
      bestSeller: true,
    },
    {
      slug: "jante-alliage-bmw-19",
      reference: "JT-BM-007",
      name: "Jeu de jantes alliage BMW M finition diamantée (x4)",
      description: `Jeu de 4 jantes alliage d'origine BMW, design double-branches finition diamantée gris anthracite, logo M sur la branche centrale et cache-moyeu BMW.

Deux versions disponibles selon stock : jantes nues (studio) ou montées avec pneus Goodyear.

État neuf, vendues par jeu de 4.

Compatibilité :
BMW Série 3 / 4 (selon génération) — nous consulter avec votre numéro de châssis (VIN) pour confirmer l'entraxe et la compatibilité exacte avec votre modèle.`,
      price: 1650.0,
      oldPrice: 950.0,
      imageUrl: "/images/jante-alliage-bmw-1.jpg",
      images:
        "/images/jante-alliage-bmw-1.jpg,/images/jante-alliage-bmw-2.jpg,/images/jante-alliage-bmw-3.jpg,/images/jante-alliage-bmw-4.jpg,/images/jante-alliage-bmw-5.jpg,/images/jante-alliage-bmw-6.jpg,/images/jante-alliage-bmw-7.jpg",
      categorySlug: "jante",
      brandName: "BMW",
      bestSeller: true,
    },
    {
      slug: "sieges-cuir-mercedes",
      reference: "SG-MB-008",
      name: "Banquette et sièges arrière Mercedes Classe V / Vito W447",
      description: `Ensemble de sièges arrière d'origine Mercedes-Benz pour Classe V / Vito W447.

Banquette 3 places en similicuir noir, dossiers rabattables, accoudoirs latéraux relevables, fixations Isofix sur les 3 places, tablettes arrière escamotables.
Siège captain individuel en tissu, accoudoir, rails coulissants, appui-tête réglable.

Fixations et rails d'origine inclus, prêt à installer.

Compatibilité :
Mercedes-Benz Classe V W447 et Vito W447 — configuration selon version (banquette 2+1 ou sièges captain individuels). Nous consulter pour confirmer la compatibilité exacte avec votre configuration intérieure.`,
      price: 600.0,
      oldPrice: 950.0,
      imageUrl: "/images/sieges-cuir-mercedes-1.jpg",
      images:
        "/images/sieges-cuir-mercedes-1.jpg,/images/sieges-cuir-mercedes-2.jpg,/images/sieges-cuir-mercedes-3.jpg,/images/sieges-cuir-mercedes-4.jpg,/images/sieges-cuir-mercedes-5.jpg,/images/sieges-cuir-mercedes-6.jpg,/images/sieges-cuir-mercedes-7.jpg,/images/sieges-cuir-mercedes-8.jpg,/images/sieges-cuir-mercedes-9.jpg,/images/sieges-cuir-mercedes-10.jpg,/images/sieges-cuir-mercedes-11.jpg,/images/sieges-cuir-mercedes-12.jpg",
      categorySlug: "sieges",
      brandName: "Mercedes",
      bestSeller: true,
    },

    {
      slug: "console-refrigeree-mercedes-classe-v-vito",
      reference: "CS-MB-VCLASS-01",
      name: "Console réfrigérée Mercedes Classe V / Vito W447",
      description: `Console centrale en similicuir beige, avec finition haut de gamme.
Réfrigérateur intégré dans la partie inférieure.
Deux porte-gobelets intégrés dans la partie supérieure.
Grand accoudoir central rembourré.
Compartiment de rangement.
Design prévu pour s'intégrer entre les sièges avant.
Alimentation électrique nécessaire pour le fonctionnement du réfrigérateur.

Compatibilité :
Mercedes-Benz Classe V W447 — V 200, V 220, V 250, V 300 (différentes versions et finitions selon la configuration intérieure)
Mercedes-Benz Vito W447 — Vito Tourer, versions avec sièges individuels à l'avant

Compatibilité indiquée par les fabricants à partir de 2014 pour le W447, avec certaines restrictions concernant les véhicules équipés d'une banquette avant double ou d'une cloison.`,
      price: 450.0,
      oldPrice: 700.0,
      imageUrl: "/images/console-mercedes-vclass-1.jpg",
      images:
        "/images/console-mercedes-vclass-1.jpg,/images/console-mercedes-vclass-2.jpg,/images/console-mercedes-vclass-3.jpg,/images/console-mercedes-vclass-4.jpg,/images/console-mercedes-vclass-5.jpg",
      categorySlug: "console",
      brandName: "Mercedes",
      bestSeller: false,
    },

    {
      slug: "console-double-porte-gobelet-multimarques",
      reference: "CS-MULTI-02",
      name: "Console centrale double porte-gobelets avec chargeur à induction",
      description: `Console centrale avec double porte-gobelets, compartiment de rangement isotherme et chargeur à induction sans fil intégré. Ports USB pour la recharge des appareils.

Finition plastique texturé noir, montage entre les sièges avant.

Compatibilité :
Modèle disponible pour plusieurs marques et générations de véhicules (Nissan, Toyota, Volkswagen, Mercedes selon motorisation). Merci de nous communiquer votre marque, modèle et année pour confirmer la compatibilité exacte avant commande.`,
      price: 390.0,
      imageUrl: "/images/console-multimarques-1.jpg",
      images:
        "/images/console-multimarques-1.jpg,/images/console-multimarques-2.jpg,/images/console-multimarques-3.jpg,/images/console-multimarques-4.jpg,/images/console-multimarques-5.jpg",
      categorySlug: "console",
      brandName: "Mercedes",
      bestSeller: false,
    },

    {
      slug: "pare-choc-arriere-mercedes-eqv300",
      reference: "PCR-MB-EQV-001",
      name: "Hayon avec pare-choc arrière Mercedes EQV 300 (feux inclus)",
      description: `Ensemble arrière complet d'origine Mercedes-Benz EQV 300 : hayon (malle arrière avec vitre teintée et baguette chromée "EQV 300"), pare-choc arrière noir avec seuil de chargement chromé, et paire de feux arrière à LED.

Fixations et charnières d'origine, état neuf/déballé.

Compatibilité :
Mercedes-Benz EQV 300 — nous consulter avec votre numéro de châssis (VIN) pour confirmer la compatibilité exacte avec votre version.`,
      price: 1450.0,
      imageUrl: "/images/pare-choc-arriere-mercedes-eqv-1.jpg",
      images:
        "/images/pare-choc-arriere-mercedes-eqv-1.jpg,/images/pare-choc-arriere-mercedes-eqv-2.jpg,/images/pare-choc-arriere-mercedes-eqv-3.jpg,/images/pare-choc-arriere-mercedes-eqv-4.jpg,/images/pare-choc-arriere-mercedes-eqv-5.jpg,/images/pare-choc-arriere-mercedes-eqv-6.jpg,/images/pare-choc-arriere-mercedes-eqv-7.jpg",
      categorySlug: "pare-choc-arriere",
      brandName: "Mercedes",
      bestSeller: false,
    },

    // --- Produits complémentaires (catalogue plus large) ---
    {
      slug: "phares-audi-full-led",
      reference: "PH-AU-009",
      name: "Phares Full LED Audi",
      description: "Optiques Full LED avec signature lumineuse dynamique.",
      price: 720.0,
      imageUrl: "https://images.unsplash.com/photo-1617469767053-3d3e9c4e93c1?w=600",
      categorySlug: "phares",
      brandName: "Audi",
      bestSeller: false,
    },
    {
      slug: "volant-sport-porsche",
      reference: "VL-PO-010",
      name: "Volant sport Porsche",
      description: "Volant sport à méplat, gainage Alcantara, palettes au volant.",
      price: 340.0,
      imageUrl: "https://images.unsplash.com/photo-1601929889081-93b1b28e57b2?w=600",
      categorySlug: "volant",
      brandName: "Porsche",
      bestSeller: false,
    },
    {
      slug: "jante-alliage-mercedes-18",
      reference: "JT-MB-011",
      name: 'Jante alliage Mercedes 18"',
      description: "Jante alliage 18 pouces design multi-branches, finition noire.",
      price: 275.0,
      imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
      categorySlug: "jante",
      brandName: "Mercedes",
      bestSeller: false,
    },
    {
      slug: "console-centrale-bmw",
      reference: "CC-BM-012",
      name: "Console centrale BMW",
      description: "Console centrale avec chargeur à induction et rangement coulissant.",
      price: 290.0,
      imageUrl: "https://images.unsplash.com/photo-1600661653561-629509216228?w=600",
      categorySlug: "console",
      brandName: "BMW",
      bestSeller: false,
    },
    {
      slug: "pare-choc-avant-volkswagen",
      reference: "PCA-VW-013",
      name: "Pare-choc avant Volkswagen",
      description: "Pare-choc avant brut à peindre, compatible capteurs de stationnement.",
      price: 310.0,
      imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600",
      categorySlug: "pare-choc-avant",
      brandName: "Volkswagen",
      bestSeller: false,
    },
    {
      slug: "sieges-cuir-dodge",
      reference: "SG-DO-014",
      name: "Sièges cuir Dodge (avant, paire)",
      description: "Paire de sièges sport gainés cuir/Alcantara, surpiqûres contrastées.",
      price: 780.0,
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600",
      categorySlug: "sieges",
      brandName: "Dodge",
      bestSeller: false,
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        reference: p.reference,
        name: p.name,
        description: p.description,
        price: p.price,
        oldPrice: (p as any).oldPrice,
        imageUrl: p.imageUrl,
        images: (p as any).images ?? "",
        bestSeller: p.bestSeller,
        categoryId: cat(p.categorySlug).id,
        brandId: brand(p.brandName).id,
      },
    });
  }

  console.log(`Terminé : ${products.length} produits créés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
