"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { WHATSAPP_LINK } from "@/lib/contact";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, totalItems, clear } = useCart();

  function buildOrderMessage() {
    const date = new Date().toLocaleDateString("fr-FR");
    const lines = items.map(
      (i) =>
        `${i.name} (Réf. ${i.reference})\n  ${i.qty} x ${i.price.toFixed(2)} € = ${(i.price * i.qty).toFixed(2)} €`
    );
    return [
      "🧾 FACTURE — AutosphèreParts",
      `Date : ${date}`,
      "――――――――――――――――――――",
      ...lines,
      "――――――――――――――――――――",
      `TOTAL : ${totalPrice.toFixed(2)} €`,
      "",
      "Bonjour, je souhaite passer cette commande.",
    ].join("\n");
  }

  const waLink = `${WHATSAPP_LINK}?text=${encodeURIComponent(buildOrderMessage())}`;

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display font-700 text-3xl text-navy-950 mb-3">Votre panier est vide</h1>
        <p className="text-steel-600 mb-6">Parcourez le catalogue pour ajouter des pièces.</p>
        <Link href="/catalogue" className="btn-primary">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-display font-700 text-3xl text-navy-950 mb-6">Votre panier</h1>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        {/* Liste des articles */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.slug} className="card p-4 flex items-center gap-4">
              <Link href={`/produit/${item.slug}`} className="relative h-20 w-20 shrink-0 bg-steel-100 rounded-md overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
              </Link>
              <div className="flex-1 min-w-0">
                <span className="ref-tag mb-1">{item.reference}</span>
                <Link href={`/produit/${item.slug}`} className="block text-sm font-medium text-navy-950 hover:text-signal-600 truncate">
                  {item.name}
                </Link>
                <p className="text-xs text-steel-500">{item.brand}</p>
              </div>
              <div className="flex items-center border border-steel-300 rounded-md shrink-0">
                <button
                  onClick={() => updateQty(item.slug, item.qty - 1)}
                  className="px-2.5 py-1.5 text-steel-600 hover:text-navy-900"
                  aria-label="Diminuer"
                >
                  −
                </button>
                <span className="px-2 text-sm min-w-[2ch] text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.slug, item.qty + 1)}
                  className="px-2.5 py-1.5 text-steel-600 hover:text-navy-900"
                  aria-label="Augmenter"
                >
                  +
                </button>
              </div>
              <span className="font-display font-700 text-navy-900 w-24 text-right shrink-0">
                {(item.price * item.qty).toFixed(2)} €
              </span>
              <button
                onClick={() => removeItem(item.slug)}
                className="text-steel-400 hover:text-red-500 text-xs shrink-0"
              >
                Retirer
              </button>
            </div>
          ))}

          <button onClick={clear} className="text-xs text-steel-400 hover:text-red-500">
            Vider le panier
          </button>
        </div>

        {/* Récapitulatif + commande */}
        <div className="card p-6 h-fit sticky top-24">
          <div className="flex justify-between text-sm text-steel-600 mb-2">
            <span>{totalItems} article(s)</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between font-display font-700 text-xl text-navy-950 mb-6 pt-3 border-t border-steel-200">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full mb-3"
          >
            Commander via WhatsApp
          </a>
          <p className="text-xs text-steel-500 mt-4 text-center">
            Aucun paiement en ligne : votre commande (façon facture, avec le total) est envoyée directement sur WhatsApp à notre équipe.
          </p>
        </div>
      </div>
    </div>
  );
}
