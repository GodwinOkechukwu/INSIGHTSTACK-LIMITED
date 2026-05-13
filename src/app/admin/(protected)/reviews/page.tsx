"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AdminTable from "../../_components/AdminTable";
import AdminPagination from "../../_components/AdminPagination";
import ConfirmModal from "../../_components/ConfirmModal";

type Product = { id: number; name: string };
type Review = {
  id: number;
  product_id: number;
  product_name: string;
  reviewer: string;
  rating: number;
  comment: string;
  verified: boolean;
  created_at: string;
};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-yellow-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const qc = useQueryClient();

  // --- Generator state ---
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [count, setCount] = useState(10);
  const [productSearch, setProductSearch] = useState("");
  const [generateSuccess, setGenerateSuccess] = useState("");

  // --- Reviews list state ---
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterProductId, setFilterProductId] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch all products for selector
  const { data: productsData } = useQuery({
    queryKey: ["admin-products-all"],
    queryFn: () =>
      fetch("/api/admin/products?per_page=200&status=publish")
        .then((r) => r.json()),
  });

  const allProducts: Product[] = productsData?.products ?? [];
  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()),
  );

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectAll = () => setSelectedProducts(filteredProducts.map((p) => p.id));
  const clearAll = () => setSelectedProducts([]);

  const generateMutation = useMutation({
    mutationFn: () =>
      fetch("/api/admin/reviews/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_ids: selectedProducts, count }),
      }).then((r) => r.json()),
    onSuccess: (data) => {
      setGenerateSuccess(data.message || "Reviews generated!");
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      setTimeout(() => setGenerateSuccess(""), 4000);
    },
  });

  // Fetch reviews list
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["admin-reviews", page, search, filterProductId],
    queryFn: () =>
      fetch(
        `/api/admin/reviews?page=${page}&search=${search}&product_id=${filterProductId}&per_page=20`,
      ).then((r) => r.json()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/admin/reviews/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      setDeleteId(null);
    },
  });

  const columns = [
    {
      key: "product",
      header: "Product",
      render: (row: Review) => (
        <span className="font-medium text-gray-800 text-xs">{row.product_name}</span>
      ),
    },
    {
      key: "reviewer",
      header: "Reviewer",
      render: (row: Review) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">{row.reviewer}</p>
          {row.verified && (
            <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded">
              Verified
            </span>
          )}
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (row: Review) => <StarDisplay rating={row.rating} />,
    },
    {
      key: "comment",
      header: "Comment",
      render: (row: Review) => (
        <p className="text-xs text-gray-600 max-w-xs truncate">{row.comment}</p>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (row: Review) => (
        <span className="text-xs text-gray-400">
          {new Date(row.created_at).toLocaleDateString("en-GB")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: Review) => (
        <button
          onClick={() => setDeleteId(row.id)}
          className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-100"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Generator ──────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Review Generator</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Generate realistic fake reviews for selected products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Select Products
            </label>
            <input
              type="search"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
            />
            <div className="flex gap-2 text-xs">
              <button
                onClick={selectAll}
                className="text-[#004B93] hover:underline"
              >
                Select all ({filteredProducts.length})
              </button>
              <span className="text-gray-300">|</span>
              <button onClick={clearAll} className="text-red-500 hover:underline">
                Clear
              </button>
              {selectedProducts.length > 0 && (
                <span className="text-gray-500 ml-auto">
                  {selectedProducts.length} selected
                </span>
              )}
            </div>
            <div className="border border-gray-200 rounded-lg max-h-52 overflow-y-auto divide-y divide-gray-50">
              {filteredProducts.length === 0 ? (
                <p className="text-xs text-gray-400 p-3">No products found.</p>
              ) : (
                filteredProducts.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(p.id)}
                      onChange={() => toggleProduct(p.id)}
                      className="accent-[#004B93]"
                    />
                    <span className="text-sm text-gray-700">{p.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Count + generate */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Reviews Per Product
              </label>
              <input
                type="number"
                min={1}
                max={200}
                value={count}
                onChange={(e) => setCount(Math.min(200, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              />
              <p className="text-xs text-gray-400">Between 1 and 200 reviews per product.</p>
            </div>

            {selectedProducts.length > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700">
                Will generate <strong>{count * selectedProducts.length}</strong> total reviews
                across <strong>{selectedProducts.length}</strong> product(s).
              </div>
            )}

            {generateSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700 font-medium">
                {generateSuccess}
              </div>
            )}

            {generateMutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                Failed to generate reviews. Please try again.
              </div>
            )}

            <button
              onClick={() => generateMutation.mutate()}
              disabled={selectedProducts.length === 0 || generateMutation.isPending}
              className="w-full py-3 bg-[#3DBD7F] text-white rounded-lg text-sm font-semibold hover:bg-[#2ea86f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generateMutation.isPending
                ? "Generating..."
                : `Generate ${count} Review${count !== 1 ? "s" : ""} per Product`}
            </button>
          </div>
        </div>
      </div>

      {/* ── Reviews List ─────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-base font-bold text-gray-900 flex-1">All Reviews</h2>
          <input
            type="search"
            placeholder="Search reviewer or comment..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-60 focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
          />
          <select
            value={filterProductId}
            onChange={(e) => { setFilterProductId(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
          >
            <option value="">All Products</option>
            {allProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <AdminTable columns={columns} data={reviewsData?.reviews ?? []} loading={isLoading} />

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{reviewsData?.total ?? 0} reviews total</p>
          <AdminPagination
            page={page}
            totalPages={reviewsData?.pages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Review"
        message="Are you sure you want to delete this review? This cannot be undone."
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
