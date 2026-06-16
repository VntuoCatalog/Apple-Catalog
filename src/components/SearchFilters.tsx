"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

type FilterOptions = {
  years: number[];
  chips: string[];
  capacities: string[];
  colors: string[];
  modelNumbers: string[];
};

const defaultFilter = "all";

export function SearchFilters({ products, options }: { products: Product[]; options: FilterOptions }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(defaultFilter);
  const [chip, setChip] = useState(defaultFilter);
  const [capacity, setCapacity] = useState(defaultFilter);
  const [color, setColor] = useState(defaultFilter);
  const [modelNumber, setModelNumber] = useState(defaultFilter);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const searchable = [
        product.name,
        product.year.toString(),
        product.chip,
        product.introduction,
        ...product.capacities,
        ...product.modelNumbers,
        ...product.colors.map((item) => item.name),
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (year === defaultFilter || product.year.toString() === year) &&
        (chip === defaultFilter || product.chip === chip) &&
        (capacity === defaultFilter || product.capacities.includes(capacity)) &&
        (color === defaultFilter || product.colors.some((item) => item.name === color)) &&
        (modelNumber === defaultFilter || product.modelNumbers.includes(modelNumber))
      );
    });
  }, [products, query, year, chip, capacity, color, modelNumber]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-3 shadow-soft ring-1 ring-black/5">
        <label htmlFor="search" className="sr-only">搜索 Apple 产品</label>
        <input
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索年份、芯片、容量、颜色或型号编号"
          className="h-16 w-full rounded-[1.5rem] border-0 bg-neutral-50 px-6 text-lg tracking-tight text-neutral-950 outline-none ring-0 placeholder:text-neutral-400 focus:bg-white focus:shadow-inner"
        />
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        <Select label="年份" value={year} onChange={setYear} values={options.years.map(String)} />
        <Select label="芯片" value={chip} onChange={setChip} values={options.chips} />
        <Select label="容量" value={capacity} onChange={setCapacity} values={options.capacities} />
        <Select label="颜色" value={color} onChange={setColor} values={options.colors} />
        <Select label="型号编号" value={modelNumber} onChange={setModelNumber} values={options.modelNumbers} />
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-950">iPhone 产品目录</h2>
        <p className="text-sm text-neutral-500">共 {filteredProducts.length} 款</p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-16 rounded-[2rem] bg-white p-12 text-center text-neutral-500 ring-1 ring-black/5">
          没有找到匹配产品。请尝试更少的筛选条件。
        </div>
      ) : null}
    </section>
  );
}

function Select({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-neutral-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-black/5 bg-white px-4 text-sm text-neutral-800 outline-none transition focus:border-neutral-300 focus:ring-4 focus:ring-neutral-200"
      >
        <option value={defaultFilter}>全部</option>
        {values.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}
