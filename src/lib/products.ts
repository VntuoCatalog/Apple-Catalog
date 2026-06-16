import products from "@/data/products.json";
import type { Product } from "@/types/product";

export const allProducts = products as Product[];

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

export function getFilterOptions() {
  return {
    years: Array.from(new Set(allProducts.map((item) => item.year))).sort((a, b) => b - a),
    chips: Array.from(new Set(allProducts.map((item) => item.chip))).sort(),
    capacities: Array.from(new Set(allProducts.flatMap((item) => item.capacities))).sort((a, b) => parseInt(a) - parseInt(b)),
    colors: Array.from(new Set(allProducts.flatMap((item) => item.colors.map((color) => color.name)))).sort(),
    modelNumbers: Array.from(new Set(allProducts.flatMap((item) => item.modelNumbers))).sort(),
  };
}
