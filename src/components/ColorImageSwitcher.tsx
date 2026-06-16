"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductColor } from "@/types/product";

export function ColorImageSwitcher({ productName, colors }: { productName: string; colors: ProductColor[] }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="rounded-[2.5rem] bg-white p-6 shadow-soft ring-1 ring-black/5">
      <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] bg-neutral-50 p-10">
        <Image
          src={selectedColor.image}
          alt={`${productName} ${selectedColor.name}`}
          width={360}
          height={360}
          className="h-80 w-auto object-contain"
          priority
        />
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">当前颜色</p>
          <p className="mt-1 text-lg font-semibold text-neutral-950">{selectedColor.name}</p>
        </div>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSelectedColor(color)}
              aria-label={`切换到 ${color.name}`}
              className={`h-9 w-9 rounded-full border p-1 transition ${selectedColor.name === color.name ? "border-neutral-950" : "border-black/10 hover:border-neutral-400"}`}
            >
              <span className="block h-full w-full rounded-full" style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
