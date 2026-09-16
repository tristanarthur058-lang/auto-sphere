"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

type Props = {
  product: {
    slug: string;
    reference: string;
    name: string;
    price: number;
    imageUrl: string;
    brand: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-steel-300 rounded-md">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2.5 text-steel-600 hover:text-navy-900"
          aria-label="Diminuer la quantité"
        >
          −
        </button>
        <span className="px-3 text-sm font-medium min-w-[2ch] text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2.5 text-steel-600 hover:text-navy-900"
          aria-label="Augmenter la quantité"
        >
          +
        </button>
      </div>
      <button onClick={handleAdd} className="btn-primary flex-1 sm:flex-none">
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
    </div>
  );
}
