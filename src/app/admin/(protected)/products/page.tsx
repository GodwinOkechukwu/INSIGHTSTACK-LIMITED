"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import AdminTable from "../../_components/AdminTable";
import AdminPagination from "../../_components/AdminPagination";
import StatusBadge from "../../_components/StatusBadge";
import ConfirmModal from "../../_components/ConfirmModal";

export default function ProductsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products", page, search, status],
    queryFn: () =>
      fetch(`/api/admin/products?page=${page}&search=${search}&status=${status}&per_page=20`)
        .then((r) => r.json()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/admin/products/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      setDeleteId(null);
    },
  });

  const columns = [
    {
      key: "image",
      header: "Image",
      width: "w-16",
      render: (row: any) =>
        row.images?.[0]?.src ? (
          <img src={row.images[0].src} alt={row.name} className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
        ) : (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xl">📦</div>
        ),
    },
    { key: "name", header: "Name", render: (row: any) => <span className="font-medium text-gray-800">{row.name}</span> },
    { key: "sku", header: "SKU", render: (row: any) => <span className="text-gray-500 text-xs">{row.sku || "—"}</span> },
    { key: "price", header: "Price", render: (row: any) => <span className="font-semibold">₦{parseFloat(row.price).toLocaleString()}</span> },
    { key: "stock_status", header: "Stock", render: (row: any) => <StatusBadge status={row.stock_status} /> },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/products/${row.id}`}
            className="px-3 py-1 text-xs bg-[#004B93] text-white rounded hover:bg-[#003a73]"
          >
            Edit
          </Link>
          <button
            onClick={() => setDeleteId(row.id)}
            className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-100"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
          />
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
          >
            <option value="">All Status</option>
            <option value="publish">Published</option>
            <option value="draft">Draft</option>
            <option value="trash">Trash</option>
          </select>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-[#3DBD7F] text-white rounded-lg text-sm font-semibold hover:bg-[#2ea86f] whitespace-nowrap"
        >
          + Add Product
        </Link>
      </div>

      <AdminTable columns={columns} data={data?.products ?? []} loading={isLoading} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {data?.total ?? 0} products total
        </p>
        <AdminPagination page={page} totalPages={data?.pages ?? 1} onPageChange={setPage} />
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Product"
        message="Are you sure you want to delete this product? This will move it to trash."
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
