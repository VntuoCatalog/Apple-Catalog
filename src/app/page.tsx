import { Header } from "@/components/Header";
import { SearchFilters } from "@/components/SearchFilters";
import { getFilterOptions, readProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default function Home() {
  const products = readProducts();

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <Header />
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-400">Apple Product Catalog</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-7xl">
          探索你的 Apple 产品库。
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-500">
          通过后台录入产品后，可按年份、芯片、容量、颜色与型号编号快速检索。第一版聚焦 iPhone 分类。
        </p>
      </section>
      <SearchFilters products={products} options={getFilterOptions(products)} />
    </main>
  );
}
