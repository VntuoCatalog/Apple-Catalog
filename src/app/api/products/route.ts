import { NextResponse } from "next/server";
import { createSlug, readProducts, writeProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

type ProductInput = Omit<Product, "id" | "slug" | "category" | "heroImage"> & {
  id?: string;
  slug?: string;
  category?: "iPhone";
  heroImage?: string;
};

function cleanList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

function normalizeProduct(input: ProductInput, existing?: Product): Product {
  const name = input.name?.trim();
  const year = Number(input.year);
  const chip = input.chip?.trim();
  const introduction = input.introduction?.trim();
  const capacities = cleanList(input.capacities ?? []);
  const modelNumbers = cleanList(input.modelNumbers ?? []);
  const colors = (input.colors ?? [])
    .map((color) => ({
      name: color.name.trim(),
      hex: color.hex.trim() || "#f5f5f7",
      image: color.image.trim(),
    }))
    .filter((color) => color.name && color.image);

  if (!name || !year || !chip || !introduction || capacities.length === 0 || modelNumbers.length === 0 || colors.length === 0) {
    throw new Error("请完整填写名称、年份、颜色、容量、芯片、型号编号和产品介绍。每个颜色都需要图片路径或图片 URL。");
  }

  const baseSlug = input.slug?.trim() || createSlug(name);
  return {
    id: existing?.id ?? input.id ?? `${baseSlug}-${Date.now()}`,
    slug: existing?.slug ?? baseSlug,
    category: "iPhone",
    name,
    year,
    colors,
    capacities,
    chip,
    modelNumbers,
    introduction,
    heroImage: input.heroImage?.trim() || colors[0].image,
  };
}

export async function GET() {
  return NextResponse.json(readProducts());
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ProductInput;
    const products = readProducts();
    const product = normalizeProduct(input);
    const usedSlugs = new Set(products.map((item) => item.slug));
    let slug = product.slug;
    let index = 2;
    while (usedSlugs.has(slug)) {
      slug = `${product.slug}-${index}`;
      index += 1;
    }
    const nextProduct = { ...product, slug, id: `${slug}-${Date.now()}` };
    writeProducts([nextProduct, ...products]);
    return NextResponse.json(nextProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "保存失败" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const input = (await request.json()) as ProductInput;
    const products = readProducts();
    const index = products.findIndex((item) => item.id === input.id);
    if (index === -1) return NextResponse.json({ message: "未找到产品" }, { status: 404 });
    const product = normalizeProduct(input, products[index]);
    products[index] = product;
    writeProducts(products);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "更新失败" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "缺少产品 ID" }, { status: 400 });
  const products = readProducts();
  writeProducts(products.filter((item) => item.id !== id));
  return NextResponse.json({ ok: true });
}
