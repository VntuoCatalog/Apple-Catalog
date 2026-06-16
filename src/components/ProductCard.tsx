import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.10)]"
    >
      <div className="mb-8 flex h-64 items-center justify-center rounded-[1.5rem] bg-neutral-50">
        <img
          src={product.heroImage}
          alt={product.name}
          className="h-56 w-auto object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">{product.year}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">{product.name}</h2>
          </div>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">{product.chip}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-neutral-500">{product.introduction}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {product.colors.slice(0, 4).map((color) => (
            <span key={color.name} className="h-5 w-5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} title={color.name} />
          ))}
        </div>
      </div>
    </Link>
  );
}
