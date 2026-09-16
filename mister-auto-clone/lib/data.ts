import { prisma } from "@/lib/prisma";

export function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export function getBrands() {
  return prisma.brand.findMany({ orderBy: { name: "asc" } });
}

export async function getBrandsWithSampleImage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: { products: { take: 1, orderBy: { createdAt: "asc" } } },
  });
  return brands.map((b) => ({
    id: b.id,
    slug: b.slug,
    name: b.name,
    imageUrl: b.logoUrl ?? b.products[0]?.imageUrl ?? null,
  }));
}

export function getBestSellers() {
  return prisma.product.findMany({
    where: { bestSeller: true },
    orderBy: { name: "asc" },
    include: { brand: true, category: true },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true },
  });
}

/** Renvoie la liste des photos d'un produit (photo principale + galerie, sans doublon). */
export function getProductImages(product: { imageUrl: string; images: string }): string[] {
  const extra = product.images
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
  const all = [product.imageUrl, ...extra];
  return Array.from(new Set(all));
}

export function getBrandBySlug(slug: string) {
  return prisma.brand.findUnique({
    where: { slug },
    include: { products: { include: { category: true, brand: true } } },
  });
}

export async function getCatalogue(params: {
  categorySlug?: string;
  brandSlug?: string;
  q?: string;
}) {
  return prisma.product.findMany({
    where: {
      category: params.categorySlug ? { slug: params.categorySlug } : undefined,
      brand: params.brandSlug ? { slug: params.brandSlug } : undefined,
      name: params.q ? { contains: params.q } : undefined,
    },
    include: { brand: true, category: true },
    orderBy: { name: "asc" },
  });
}
