import { Header } from "@/components/Header";
import { AdminProducts } from "@/components/AdminProducts";
import { readProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <Header />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-400">Admin</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-neutral-950 md:text-6xl">后台管理</h1>
            <p className="mt-4 max-w-2xl text-neutral-500">添加、编辑或删除 iPhone 产品数据。第一版数据保存到本地 JSON 文件。</p>
          </div>
          <a href="/" className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800">查看前台</a>
        </div>
        <AdminProducts initialProducts={readProducts()} />
      </section>
    </main>
  );
}
