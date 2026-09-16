import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const brand = await getBrandBySlug(params.slug);
  if (!brand) notFound();

  return (
    <div className="container-page py-8">
      <h1 className="font-display font-700 text-3xl text-navy-950 mb-1">{brand.name}</h1>
      <p className="text-steel-600 text-sm mb-8">{brand.products.length} produit(s) disponibles</p>

      {brand.products.length === 0 ? (
        <p className="text-steel-500 text-sm">Aucun produit disponible pour cette marque pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {brand.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
