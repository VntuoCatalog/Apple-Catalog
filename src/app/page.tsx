import { Header } from "@/components/Header";
import { SearchFilters } from "@/components/SearchFilters";
import { allProducts, getFilterOptions } from "@/lib/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <Header />
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-400">Apple Product Catalog</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-7xl">
          探索历代 iPhone。
        </h1>
      </section>
      <SearchFilters products={allProducts} options={getFilterOptions()} />
    </main>
  );
}
