"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ProductForm from "../../../_components/ProductForm";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: catData } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => fetch("/api/admin/categories").then((r) => r.json()),
  });

  async function handleSubmit(data: any) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to create product");
        return;
      }
      router.push("/admin/products");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="text-gray-400 hover:text-gray-600 text-sm">
          ← Back to Products
        </Link>
        <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>
      </div>

      <ProductForm
        categories={catData?.categories ?? []}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Create Product"
      />
    </div>
  );
}
