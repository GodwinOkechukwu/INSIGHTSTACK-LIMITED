"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import ProductForm from "../../../_components/ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => fetch(`/api/admin/products/${id}`).then((r) => r.json()),
  });

  const { data: catData } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => fetch("/api/admin/categories").then((r) => r.json()),
  });

  async function handleSubmit(data: any) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to update product");
        return;
      }
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      router.push("/admin/products");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (productLoading) {
    return <div className="text-gray-400 text-sm py-10 text-center">Loading product...</div>;
  }

  if (!product?.id) {
    return <div className="text-red-500 text-sm py-10 text-center">Product not found.</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="text-gray-400 hover:text-gray-600 text-sm">
          ← Back to Products
        </Link>
        <h2 className="text-lg font-semibold text-gray-800">Edit: {product.name}</h2>
      </div>

      <ProductForm
        initial={product}
        categories={catData?.categories ?? []}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Update Product"
      />
    </div>
  );
}
