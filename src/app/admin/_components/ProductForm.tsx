"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

interface Category {
  id: number;
  name: string;
  parent_name?: string | null;
}

interface AttributeRow {
  name: string;
  options: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: string;
  status: string;
  type: string;
  categories: number[];
  images: string[];
  attributes: AttributeRow[];
}

interface Props {
  initial?: Partial<ProductFormData> & { images?: { src: string }[]; attributes?: { name: string; options: string[] }[]; categories?: { id: number }[] };
  categories: Category[];
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  error?: string;
  submitLabel?: string;
}

const DEFAULT: ProductFormData = {
  name: "",
  slug: "",
  sku: "",
  description: "",
  short_description: "",
  price: "",
  regular_price: "",
  sale_price: "",
  stock_status: "instock",
  stock_quantity: "",
  status: "publish",
  type: "simple",
  categories: [],
  images: [],
  attributes: [],
};

export default function ProductForm({ initial, categories, onSubmit, loading, error, submitLabel = "Save" }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    ...DEFAULT,
    ...initial,
    images: (initial?.images as any[])?.map((i: any) => i.src ?? i) ?? [],
    attributes: (initial?.attributes as any[])?.map((a: any) => ({ name: a.name, options: Array.isArray(a.options) ? a.options.join(", ") : "" })) ?? [],
    categories: (initial?.categories as any[])?.map((c: any) => c.id ?? c) ?? [],
  });

  function set(key: keyof ProductFormData, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addAttribute() {
    set("attributes", [...form.attributes, { name: "", options: "" }]);
  }

  function removeAttribute(i: number) {
    set("attributes", form.attributes.filter((_, idx) => idx !== i));
  }

  function updateAttribute(i: number, field: "name" | "options", val: string) {
    set("attributes", form.attributes.map((a, idx) => idx === i ? { ...a, [field]: val } : a));
  }

  function toggleCategory(id: number) {
    set(
      "categories",
      form.categories.includes(id)
        ? form.categories.filter((c) => c !== id)
        : [...form.categories, id],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      ...form,
      price: parseFloat(form.price),
      regular_price: parseFloat(form.regular_price || form.price),
      sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
      stock_quantity: form.stock_quantity ? parseInt(form.stock_quantity, 10) : null,
      attributes: form.attributes.map((a) => ({
        name: a.name,
        options: a.options.split(",").map((s) => s.trim()).filter(Boolean),
      })),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">General Info</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                placeholder="Product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  placeholder="auto-generated"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  value={form.sku}
                  onChange={(e) => set("sku", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  placeholder="SKU-001"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                value={form.short_description}
                onChange={(e) => set("short_description", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30 resize-none"
                placeholder="Brief description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30 resize-none"
                placeholder="Full product description..."
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Pricing</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (₦)</label>
                <input
                  type="number"
                  value={form.regular_price}
                  onChange={(e) => set("regular_price", e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (₦)</label>
                <input
                  type="number"
                  value={form.sale_price}
                  onChange={(e) => set("sale_price", e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  value={form.stock_status}
                  onChange={(e) => set("stock_status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                >
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                  <option value="onbackorder">On Backorder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={form.stock_quantity}
                  onChange={(e) => set("stock_quantity", e.target.value)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  placeholder="Leave blank for unlimited"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Attributes</h3>
              <button
                type="button"
                onClick={addAttribute}
                className="text-sm text-[#004B93] hover:underline"
              >
                + Add Attribute
              </button>
            </div>
            {form.attributes.length === 0 && (
              <p className="text-sm text-gray-400">No attributes added yet.</p>
            )}
            {form.attributes.map((attr, i) => (
              <div key={i} className="grid grid-cols-5 gap-3 items-start">
                <div className="col-span-2">
                  <input
                    value={attr.name}
                    onChange={(e) => updateAttribute(i, "name", e.target.value)}
                    placeholder="Attribute name (e.g. Color)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    value={attr.options}
                    onChange={(e) => updateAttribute(i, "options", e.target.value)}
                    placeholder="Options comma-separated (e.g. Red, Blue)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAttribute(i)}
                  className="py-2 text-red-400 hover:text-red-600 text-lg"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Publish</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              >
                <option value="publish">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              >
                <option value="simple">Simple</option>
                <option value="variable">Variable</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#3DBD7F] hover:bg-[#2ea86f] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60"
            >
              {loading ? "Saving..." : submitLabel}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Categories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="rounded border-gray-300 text-[#004B93]"
                  />
                  <span className="text-sm text-gray-700">
                    {cat.parent_name ? `${cat.parent_name} → ` : ""}{cat.name}
                  </span>
                </label>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-gray-400">No categories available.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <ImageUploader
              label="Product Images"
              value={form.images}
              onChange={(urls) => set("images", urls)}
              maxImages={5}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
