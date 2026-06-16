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
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-500">
          用年份、芯片、容量、颜色与型号编号快速检索 Apple 产品。第一版聚焦 iPhone 分类，数据由本地 JSON 驱动。
        </p>
      </section>
      <SearchFilters products={allProducts} options={getFilterOptions()} />
    </main>
  );
}
