import Link from "next/link";
import Image from "next/image";
import { getBrandsWithSampleImage, getBestSellers } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [brands, bestSellers] = await Promise.all([
    getBrandsWithSampleImage(),
    getBestSellers(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-900">
        <div className="container-page py-14">
          <p className="text-signal-500 font-mono text-xs tracking-widest uppercase mb-3">
            Pièces d'origine pour véhicules premium
          </p>
          <h1 className="font-display font-700 text-4xl sm:text-5xl text-white leading-[1.05] mb-4 max-w-2xl">
            La pièce exacte pour votre véhicule, sans se tromper.
          </h1>
          <p className="text-steel-300 text-base mb-6 max-w-md">
            Sélectionnez la marque de votre véhicule : nous filtrons automatiquement
            les pièces disponibles. Carrosserie, intérieur, jantes et équipements.
          </p>
          <Link href="/catalogue" className="btn-primary">
            Voir le catalogue complet
          </Link>
        </div>
      </section>

      {/* Marques */}
      <section className="container-page py-12">
        <h2 className="font-display font-700 text-2xl text-navy-950 mb-6">Nos marques</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/marque/${b.slug}`}
              className="card overflow-hidden group hover:border-signal-500 transition-colors"
            >
              <div className="relative aspect-square bg-steel-100">
                {b.imageUrl && (
                  <Image
                    src={b.imageUrl}
                    alt={b.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                )}
              </div>
              <div className="p-3 text-center">
                <span className="font-display font-600 text-navy-900">{b.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best-sellers */}
      <section className="container-page py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-700 text-2xl text-navy-950">Nos Best-sellers</h2>
          <Link href="/catalogue" className="text-signal-600 text-sm font-medium hover:underline">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
