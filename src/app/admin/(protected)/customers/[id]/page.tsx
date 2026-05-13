"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import StatusBadge from "../../../_components/StatusBadge";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading } = useQuery({
    queryKey: ["admin-customer", id],
    queryFn: () => fetch(`/api/admin/customers/${id}`).then((r) => r.json()),
  });

  if (isLoading) return <div className="text-gray-400 text-sm py-10 text-center">Loading...</div>;
  if (!customer?.id) return <div className="text-red-500 text-sm py-10 text-center">Customer not found.</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/customers" className="text-gray-400 hover:text-gray-600 text-sm">← Back</Link>
        <h2 className="text-lg font-semibold text-gray-800">
          {`${customer.first_name || ""} ${customer.last_name || ""}`.trim() || customer.username}
        </h2>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.is_verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {customer.is_verified ? "Verified" : "Unverified"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3 text-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Profile</h3>
          {[
            ["Username", customer.username],
            ["Email", customer.email],
            ["Phone", customer.phone || "—"],
            ["Address", customer.address || "—"],
            ["City", customer.city || "—"],
            ["State", customer.state || "—"],
            ["Country", customer.country || "—"],
            ["Joined", new Date(customer.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <span className="w-24 text-gray-500 shrink-0">{label}</span>
              <span className="text-gray-800 font-medium break-all">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
          {customer.recent_orders?.length === 0 && (
            <p className="text-sm text-gray-400">No orders yet.</p>
          )}
          <div className="divide-y divide-gray-50">
            {customer.recent_orders?.map((o: any) => (
              <div key={o.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">Order #{o.id}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(o.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={o.status} />
                  <span className="text-sm font-semibold">₦{parseFloat(o.total).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
