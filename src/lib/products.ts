import fs from "node:fs";
import path from "node:path";
import type { Product } from "@/types/product";

const dataFilePath = path.join(process.cwd(), "src", "data", "products.json");

function ensureDataFile() {
  if (!fs.existsSync(dataFilePath)) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, "[]", "utf8");
  }
}

export function readProducts(): Product[] {
  ensureDataFile();
  const raw = fs.readFileSync(dataFilePath, "utf8");
  try {
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

export function writeProducts(products: Product[]) {
  ensureDataFile();
  fs.writeFileSync(dataFilePath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
}

export function getProductBySlug(slug: string) {
  return readProducts().find((product) => product.slug === slug);
}

export function getFilterOptions(products = readProducts()) {
  return {
    years: Array.from(new Set(products.map((item) => item.year))).sort((a, b) => b - a),
    chips: Array.from(new Set(products.map((item) => item.chip))).sort(),
    capacities: Array.from(new Set(products.flatMap((item) => item.capacities))).sort((a, b) => parseInt(a) - parseInt(b)),
    colors: Array.from(new Set(products.flatMap((item) => item.colors.map((color) => color.name)))).sort(),
    modelNumbers: Array.from(new Set(products.flatMap((item) => item.modelNumbers))).sort(),
  };
}

export function createSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
