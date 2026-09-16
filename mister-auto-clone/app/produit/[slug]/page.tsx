import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductImages } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const gallery = getProductImages(product);

  return (
    <div className="container-page py-8">
      <nav className="text-xs text-steel-500 mb-6 flex gap-1.5">
        <Link href="/" className="hover:text-navy-900">Accueil</Link>
        <span>/</span>
        <Link href="/catalogue" className="hover:text-navy-900">Catalogue</Link>
        <span>/</span>
        <Link href={`/catalogue?categorie=${product.category.slug}`} className="hover:text-navy-900">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={gallery} alt={product.name} />

        <div>
          <span className="ref-tag mb-3">{product.reference}</span>
          <Link href={`/marque/${product.brand.slug}`} className="block text-sm text-signal-600 font-medium uppercase tracking-wide mt-2 hover:underline">
            {product.brand.name}
          </Link>
          <h1 className="font-display font-700 text-3xl text-navy-950 mt-1 mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display font-700 text-3xl text-navy-900">
              {product.price.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-steel-400 line-through text-lg">{product.oldPrice!.toFixed(2)} €</span>
            )}
          </div>

          <p className="text-steel-700 leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className={`h-2.5 w-2.5 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-sm text-steel-700">
              {product.inStock ? "En stock — expédié sous 24h" : "Actuellement indisponible"}
            </span>
          </div>

          <AddToCartButton
            product={{
              slug: product.slug,
              reference: product.reference,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              brand: product.brand.name,
            }}
          />
        </div>
      </div>
    </div>
  );
}
