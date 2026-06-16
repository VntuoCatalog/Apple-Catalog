import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ColorImageSwitcher } from "@/components/ColorImageSwitcher";
import { getProductBySlug, readProducts } from "@/lib/products";

export function generateStaticParams() {
  return readProducts().map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  return {
    title: product ? `${product.name} | Apple Catalog` : "Product | Apple Catalog",
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <Header />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <ColorImageSwitcher productName={product.name} colors={product.colors} />

        <div className="flex flex-col justify-center">
          <Link href="/" className="mb-8 inline-flex text-sm font-medium text-neutral-500 transition hover:text-neutral-950">
            ← 返回目录
          </Link>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">{product.category} · {product.year}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-6xl">{product.name}</h1>
          <p className="mt-6 text-lg leading-8 text-neutral-500">{product.introduction}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Spec title="芯片" value={product.chip} />
            <Spec title="年份" value={product.year.toString()} />
            <Spec title="容量" value={product.capacities.join(" / ")} />
            <Spec title="型号编号" value={product.modelNumbers.join(" / ")} />
          </div>

          <div className="mt-8 rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
            <h2 className="text-sm font-semibold text-neutral-950">可选颜色</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <span key={color.name} className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-2 text-sm text-neutral-600">
                  <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                  {color.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Spec({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-black/5">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">{title}</p>
      <p className="mt-2 text-base font-semibold leading-6 text-neutral-950">{value}</p>
    </div>
  );
}
