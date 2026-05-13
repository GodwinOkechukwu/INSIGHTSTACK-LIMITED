"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import AdminTable from "../../_components/AdminTable";
import AdminPagination from "../../_components/AdminPagination";

export default function CustomersPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [verified, setVerified] = useState("");

  const params = new URLSearchParams({ page: String(page), limit: "20" });
  if (search) params.set("search", search);
  if (verified !== "") params.set("verified", verified);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-customers", page, search, verified],
    queryFn: () => fetch(`/api/admin/customers?${params}`).then((r) => r.json()),
  });

  const toggleVerify = useMutation({
    mutationFn: ({ id, is_verified }: { id: number; is_verified: boolean }) =>
      fetch(`/api/admin/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_verified }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-customers"] }),
  });

  const columns = [
    {
      key: "name",
      header: "Customer",
      render: (row: any) => (
        <div>
          <p className="text-sm font-medium text-gray-800">{`${row.first_name || ""} ${row.last_name || ""}`.trim() || row.username}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    { key: "phone", header: "Phone", render: (row: any) => <span className="text-sm text-gray-600">{row.phone || "—"}</span> },
    { key: "order_count", header: "Orders", render: (row: any) => <span className="text-gray-600">{row.order_count}</span> },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.is_verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {row.is_verified ? "Verified" : "Unverified"}
        </span>
      ),
    },
    {
      key: "joined",
      header: "Joined",
      render: (row: any) => (
        <span className="text-xs text-gray-400">
          {new Date(row.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex gap-2">
          <Link href={`/admin/customers/${row.id}`} className="px-3 py-1 text-xs bg-[#004B93] text-white rounded hover:bg-[#003a73]">
            View
          </Link>
          <button
            onClick={() => toggleVerify.mutate({ id: row.id, is_verified: !row.is_verified })}
            className={`px-3 py-1 text-xs rounded border ${row.is_verified ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100" : "border-green-100 bg-green-50 text-green-700 hover:bg-green-100"}`}
          >
            {row.is_verified ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
        />
        <select
          value={verified}
          onChange={(e) => { setVerified(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
        >
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>

      <AdminTable columns={columns} data={data?.customers ?? []} loading={isLoading} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{data?.total ?? 0} customers total</p>
        <AdminPagination page={page} totalPages={data?.pages ?? 1} onPageChange={setPage} />
      </div>
    </div>
  );
}
