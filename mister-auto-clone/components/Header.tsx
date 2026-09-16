import Link from "next/link";
import { getCategories, getBrands } from "@/lib/data";
import VehicleSelector from "@/components/VehicleSelector";
import CartIcon from "@/components/CartIcon";

export default async function Header() {
  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-steel-200">
      {/* Bandeau utilitaire */}
      <div className="bg-navy-950 text-steel-200 text-xs">
        <div className="container-page flex items-center justify-between py-1.5">
          <span>Livraison sous 24/48h en France métropolitaine</span>
          <Link href="/contact" className="hover:text-white">
            Besoin d'aide ? Contactez-nous
          </Link>
        </div>
      </div>

      {/* Logo + recherche */}
      <div className="container-page py-4 flex items-center gap-6">
        <Link href="/" className="font-display font-700 text-2xl tracking-tight text-navy-900 whitespace-nowrap">
          AUTOSPHÈRE<span className="text-signal-500">PARTS</span>
        </Link>

        <form action="/catalogue" className="flex-1 hidden md:flex">
          <input
            type="text"
            name="q"
            placeholder="Rechercher une pièce, une référence, une marque…"
            className="w-full border border-steel-300 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal-500"
          />
          <button type="submit" className="bg-navy-900 hover:bg-navy-800 text-white px-5 rounded-r-md text-sm font-medium">
            Rechercher
          </button>
        </form>

        <Link href="/contact" className="hidden lg:block text-sm text-steel-600 hover:text-navy-900 whitespace-nowrap">
          Contact
        </Link>
        <CartIcon />
      </div>

      {/* Nav catégories (types de pièces) */}
      <nav className="border-t border-steel-100 bg-steel-50">
        <div className="container-page flex flex-wrap gap-x-6 gap-y-2 py-2.5 text-sm">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/catalogue?categorie=${c.slug}`}
              className="text-steel-700 hover:text-signal-600 font-medium whitespace-nowrap"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Sélecteur de marque */}
      <div className="bg-navy-900">
        <div className="container-page py-3">
          <VehicleSelector brands={brands} />
        </div>
      </div>
    </header>
  );
}
