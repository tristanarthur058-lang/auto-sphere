"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

type Props = {
  product: {
    slug: string;
    reference: string;
    name: string;
    price: number;
    oldPrice: number | null;
    imageUrl: string;
    images?: string;
    brand: { name: string };
  };
};

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const photoCount = product.images
    ? Array.from(new Set([product.imageUrl, ...product.images.split(",").map((u) => u.trim()).filter(Boolean)])).length
    : 1;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      reference: product.reference,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand.name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="card group flex flex-col overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-steel-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-signal-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Promo
          </span>
        )}
        {photoCount > 1 && (
          <span className="absolute bottom-2 right-2 bg-navy-950/70 text-white text-[11px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            {photoCount}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span className="ref-tag w-fit">{product.reference}</span>
        <span className="text-xs text-steel-500 uppercase tracking-wide">{product.brand.name}</span>
        <h3 className="text-sm font-medium text-navy-950 leading-snug line-clamp-2">{product.name}</h3>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-display font-700 text-navy-900">{product.price.toFixed(2)} €</span>
            {hasDiscount && (
              <span className="text-xs text-steel-400 line-through">{product.oldPrice!.toFixed(2)} €</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label="Ajouter au panier"
            title="Ajouter au panier"
            className={`shrink-0 h-8 w-8 flex items-center justify-center rounded-md transition-colors ${
              added ? "bg-emerald-500" : "bg-navy-900 hover:bg-signal-600"
            } text-white`}
          >
            {added ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
