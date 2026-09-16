"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Brand = { id: string; slug: string; name: string };

export default function VehicleSelector({ brands }: { brands: Brand[] }) {
  const router = useRouter();
  const [brandSlug, setBrandSlug] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!brandSlug) return;
    router.push(`/catalogue?marque=${brandSlug}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
      <span className="text-white text-sm font-medium whitespace-nowrap font-display tracking-wide">
        Trouvez les pièces de votre véhicule
      </span>

      <select
        value={brandSlug}
        onChange={(e) => setBrandSlug(e.target.value)}
        className="rounded-md border-0 px-3 py-2 text-sm text-navy-950 min-w-[160px]"
      >
        <option value="">Marque</option>
        {brands.map((b) => (
          <option key={b.id} value={b.slug}>
            {b.name}
          </option>
        ))}
      </select>

      <button type="submit" className="btn-primary" disabled={!brandSlug}>
        Valider mon véhicule
      </button>
    </form>
  );
}
