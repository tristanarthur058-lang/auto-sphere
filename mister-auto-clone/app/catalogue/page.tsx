import Link from "next/link";
import { getCatalogue, getCategories, getBrands } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

type SearchParams = {
  categorie?: string;
  marque?: string;
  q?: string;
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [products, categories, brands] = await Promise.all([
    getCatalogue({
      categorySlug: searchParams.categorie,
      brandSlug: searchParams.marque,
      q: searchParams.q,
    }),
    getCategories(),
    getBrands(),
  ]);

  function buildLink(overrides: Partial<SearchParams>) {
    const params = new URLSearchParams({
      ...(searchParams as Record<string, string>),
      ...overrides,
    });
    // enlève les clés vides
    Array.from(params.keys()).forEach((k) => {
      if (!params.get(k)) params.delete(k);
    });
    return `/catalogue?${params.toString()}`;
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-display font-700 text-3xl text-navy-950 mb-2">Catalogue</h1>

      {searchParams.q && (
        <p className="text-steel-600 text-sm mb-6">
          Résultats pour « {searchParams.q} » — {products.length} produit(s)
        </p>
      )}

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        {/* Filtres */}
        <aside className="space-y-6">
          <div>
            <h2 className="font-display font-600 text-sm uppercase tracking-wide text-steel-500 mb-3">
              Catégories
            </h2>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href={buildLink({ categorie: "" })}
                  className={!searchParams.categorie ? "text-signal-600 font-medium" : "text-steel-700 hover:text-signal-600"}
                >
                  Toutes
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={buildLink({ categorie: c.slug })}
                    className={
                      searchParams.categorie === c.slug
                        ? "text-signal-600 font-medium"
                        : "text-steel-700 hover:text-signal-600"
                    }
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-600 text-sm uppercase tracking-wide text-steel-500 mb-3">
              Marques
            </h2>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href={buildLink({ marque: "" })}
                  className={!searchParams.marque ? "text-signal-600 font-medium" : "text-steel-700 hover:text-signal-600"}
                >
                  Toutes
                </Link>
              </li>
              {brands.map((b) => (
                <li key={b.id}>
                  <Link
                    href={buildLink({ marque: b.slug })}
                    className={
                      searchParams.marque === b.slug
                        ? "text-signal-600 font-medium"
                        : "text-steel-700 hover:text-signal-600"
                    }
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Résultats */}
        <div>
          {products.length === 0 ? (
            <p className="text-steel-500 text-sm">Aucun produit ne correspond à ces critères.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
