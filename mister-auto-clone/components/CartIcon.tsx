"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/panier"
      className="relative flex items-center gap-1.5 text-sm text-steel-700 hover:text-navy-900 whitespace-nowrap"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span className="hidden sm:inline">Panier</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 sm:right-auto sm:left-3 bg-signal-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
