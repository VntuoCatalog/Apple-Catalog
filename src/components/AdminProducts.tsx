"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Product, ProductColor } from "@/types/product";

type ProductForm = {
  id?: string;
  name: string;
  year: string;
  chip: string;
  capacities: string;
  modelNumbers: string;
  introduction: string;
  colors: ProductColor[];
};

const emptyForm: ProductForm = {
  name: "",
  year: "",
  chip: "",
  capacities: "",
  modelNumbers: "",
  introduction: "",
  colors: [{ name: "", hex: "#f5f5f7", image: "" }],
};

export function AdminProducts({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const isEditing = Boolean(form.id);
  const total = useMemo(() => products.length, [products]);

  function updateColor(index: number, field: keyof ProductColor, value: string) {
    setForm((current) => ({
      ...current,
      colors: current.colors.map((color, colorIndex) => (colorIndex === index ? { ...color, [field]: value } : color)),
    }));
  }

  function addColor() {
    setForm((current) => ({ ...current, colors: [...current.colors, { name: "", hex: "#f5f5f7", image: "" }] }));
  }

  function removeColor(index: number) {
    setForm((current) => ({ ...current, colors: current.colors.filter((_, colorIndex) => colorIndex !== index) }));
  }

  function editProduct(product: Product) {
    setForm({
      id: product.id,
      name: product.name,
      year: String(product.year),
      chip: product.chip,
      capacities: product.capacities.join(", "),
      modelNumbers: product.modelNumbers.join(", "),
      introduction: product.introduction,
      colors: product.colors,
    });
    setMessage("正在编辑该产品。保存后会覆盖原数据。");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function refreshProducts() {
    const response = await fetch("/api/products", { cache: "no-store" });
    setProducts(await response.json());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const payload = {
      id: form.id,
      name: form.name,
      year: Number(form.year),
      chip: form.chip,
      capacities: form.capacities.split(","),
      modelNumbers: form.modelNumbers.split(","),
      introduction: form.introduction,
      colors: form.colors,
    };

    const response = await fetch("/api/products", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    setIsSaving(false);

    if (!response.ok) {
      setMessage(result.message ?? "保存失败，请检查表单。 ");
      return;
    }

    setForm(emptyForm);
    setMessage(isEditing ? "产品已更新。" : "产品已添加。前台会立即读取新的 JSON 数据。");
    await refreshProducts();
  }

  async function deleteProduct(product: Product) {
    const confirmed = window.confirm(`确定删除「${product.name}」吗？`);
    if (!confirmed) return;
    const response = await fetch(`/api/products?id=${encodeURIComponent(product.id)}`, { method: "DELETE" });
    if (response.ok) {
      setMessage("产品已删除。");
      await refreshProducts();
      if (form.id === product.id) setForm(emptyForm);
    } else {
      setMessage("删除失败。");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-black/5">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">{isEditing ? "编辑产品" : "添加产品"}</h2>
            <p className="mt-1 text-sm text-neutral-500">图片可填写 `/products/xxx.png` 或完整图片 URL。</p>
          </div>
          {isEditing ? (
            <button type="button" onClick={() => setForm(emptyForm)} className="rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-200">
              取消编辑
            </button>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="产品名称" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="例如 iPhone 16 Pro" />
          <Field label="年份" value={form.year} onChange={(value) => setForm({ ...form, year: value })} placeholder="例如 2024" type="number" />
          <Field label="芯片" value={form.chip} onChange={(value) => setForm({ ...form, chip: value })} placeholder="例如 A18 Pro" />
          <Field label="容量" value={form.capacities} onChange={(value) => setForm({ ...form, capacities: value })} placeholder="128GB, 256GB, 512GB" />
          <Field label="型号编号" value={form.modelNumbers} onChange={(value) => setForm({ ...form, modelNumbers: value })} placeholder="A3083, A3292" />
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">产品介绍</span>
          <textarea
            value={form.introduction}
            onChange={(event) => setForm({ ...form, introduction: event.target.value })}
            rows={4}
            placeholder="输入产品亮点和简介"
            className="w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-200"
          />
        </label>

        <div className="mt-6 rounded-[1.5rem] bg-neutral-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-950">颜色和对应图片</h3>
            <button type="button" onClick={addColor} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-black/5 transition hover:bg-neutral-100">
              添加颜色
            </button>
          </div>
          <div className="space-y-4">
            {form.colors.map((color, index) => (
              <div key={index} className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 md:grid-cols-[1fr_0.7fr_1.4fr_auto]">
                <Field label="颜色名称" value={color.name} onChange={(value) => updateColor(index, "name", value)} placeholder="Natural Titanium" />
                <Field label="色值" value={color.hex} onChange={(value) => updateColor(index, "hex", value)} placeholder="#B9B2A8" type="color" />
                <Field label="图片路径 / URL" value={color.image} onChange={(value) => updateColor(index, "image", value)} placeholder="/products/iphone.png" />
                <button type="button" onClick={() => removeColor(index)} className="self-end rounded-full bg-neutral-100 px-4 py-3 text-sm text-neutral-500 transition hover:bg-red-50 hover:text-red-600" disabled={form.colors.length === 1}>
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>

        {message ? <p className="mt-4 rounded-2xl bg-neutral-50 px-4 py-3 text-sm text-neutral-600">{message}</p> : null}

        <button type="submit" disabled={isSaving} className="mt-6 h-12 w-full rounded-full bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isSaving ? "保存中..." : isEditing ? "保存修改" : "添加到目录"}
        </button>
      </form>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-black/5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">产品数据</h2>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-500">共 {total} 款</span>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[1.5rem] bg-neutral-50 p-10 text-center text-neutral-500">
            当前没有任何默认产品数据。请在左侧添加第一款 iPhone。
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col gap-4 rounded-[1.5rem] bg-neutral-50 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">{product.year} · {product.chip}</p>
                  <h3 className="mt-1 text-lg font-semibold text-neutral-950">{product.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{product.capacities.join(" / ")} · {product.modelNumbers.join(" / ")}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => editProduct(product)} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-black/5 transition hover:bg-neutral-100">编辑</button>
                  <button type="button" onClick={() => deleteProduct(product)} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-black/5 transition hover:bg-red-50">删除</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-200"
      />
    </label>
  );
}
