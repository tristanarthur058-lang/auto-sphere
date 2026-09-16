import Link from "next/link";
import { PHONE_DISPLAY, EMAIL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-steel-300 mt-16">
      <div className="container-page py-10 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-white font-display font-600 mb-3 tracking-wide">AUTOSPHÈREPARTS</h3>
          <p className="text-steel-400 leading-relaxed">
            Pièces de carrosserie et d'intérieur d'origine pour véhicules premium, sélectionnées par marque.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Catégories</h4>
          <ul className="space-y-2">
            <li><Link href="/catalogue?categorie=pare-choc-avant" className="hover:text-white">Pare-choc avant</Link></li>
            <li><Link href="/catalogue?categorie=phares" className="hover:text-white">Phares</Link></li>
            <li><Link href="/catalogue?categorie=jante" className="hover:text-white">Jante</Link></li>
            <li><Link href="/catalogue?categorie=sieges" className="hover:text-white">Sièges</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Contact</h4>
          <p className="text-steel-400">{EMAIL}</p>
          <p className="text-steel-400">{PHONE_DISPLAY}</p>
        </div>
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-steel-500">
        © {new Date().getFullYear()} AutosphèreParts — Site de démonstration
      </div>
    </footer>
  );
}
