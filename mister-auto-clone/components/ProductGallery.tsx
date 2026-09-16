"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square bg-steel-100 rounded-lg overflow-hidden">
        <Image src={current} alt={alt} fill className="object-cover" sizes="50vw" priority />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? "border-signal-500" : "border-transparent hover:border-steel-300"
              }`}
              aria-label={`Voir la photo ${i + 1}`}
            >
              <Image src={img} alt={`${alt} — photo ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
