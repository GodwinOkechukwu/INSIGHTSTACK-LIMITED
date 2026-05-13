"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import AdminTable from "../../_components/AdminTable";
import AdminPagination from "../../_components/AdminPagination";
import StatusBadge from "../../_components/StatusBadge";

function formatCurrency(v: string) {
  return `₦${parseFloat(v).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const params = new URLSearchParams({ page: String(page), limit: "20" });
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders", page, status, search, dateFrom, dateTo],
    queryFn: () => fetch(`/api/admin/orders?${params}`).then((r) => r.json()),
  });

  const columns = [
    { key: "id", header: "#", render: (row: any) => <span className="font-mono text-gray-600 text-xs">#{row.id}</span> },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => (
        <div>
          <p className="text-sm font-medium text-gray-800">{row.customer_name || "Guest"}</p>
          <p className="text-xs text-gray-400">{row.customer_email}</p>
        </div>
      ),
    },
    { key: "item_count", header: "Items", render: (row: any) => <span className="text-gray-600">{row.item_count}</span> },
    { key: "total", header: "Total", render: (row: any) => <span className="font-semibold">{formatCurrency(row.total)}</span> },
    { key: "payment", header: "Payment", render: (row: any) => <span className="text-xs text-gray-500">{row.payment_method_title || "—"}</span> },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
    { key: "date", header: "Date", render: (row: any) => <span className="text-xs text-gray-500">{formatDate(row.created_at)}</span> },
    {
      key: "actions",
      header: "",
      render: (row: any) => (
        <Link
          href={`/admin/orders/${row.id}`}
          className="px-3 py-1 text-xs bg-[#004B93] text-white rounded hover:bg-[#003a73]"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
        />
        <span className="self-center text-gray-400 text-sm">to</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
        />
      </div>

      <AdminTable columns={columns} data={data?.orders ?? []} loading={isLoading} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{data?.total ?? 0} orders total</p>
        <AdminPagination page={page} totalPages={data?.pages ?? 1} onPageChange={setPage} />
      </div>
    </div>
  );
}
