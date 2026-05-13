"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import StatusBadge from "../../../_components/StatusBadge";

function fmt(v: string | number) {
  return `₦${parseFloat(String(v)).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

const STATUSES = ["pending", "processing", "completed", "on-hold", "cancelled", "refunded"];

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const { data: order, isLoading } = useQuery({
    queryKey: ["admin-order", id],
    queryFn: () => fetch(`/api/admin/orders/${id}`).then((r) => r.json()),
  });

  useEffect(() => {
    if (order?.status) setNewStatus(order.status);
    if (order?.order_notes !== undefined) setNotes(order.order_notes || "");
  }, [order?.status, order?.order_notes]);

  const updateMutation = useMutation({
    mutationFn: (body: any) =>
      fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-order", id] });
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  if (isLoading) return <div className="text-gray-400 text-sm py-10 text-center">Loading...</div>;
  if (!order?.id) return <div className="text-red-500 text-sm py-10 text-center">Order not found.</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="text-gray-400 hover:text-gray-600 text-sm">
          ← Back to Orders
        </Link>
        <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Order info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Line items */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="divide-y divide-gray-50">
              {order.line_items?.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{fmt(item.total)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{fmt(order.subtotal)}</span>
              </div>
              {parseFloat(order.discount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{fmt(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{parseFloat(order.shipping_cost) > 0 ? fmt(order.shipping_cost) : "Free"}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
                <span>Total</span>
                <span>{fmt(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Customer</h3>
            <div className="text-sm space-y-1 text-gray-600">
              <p><span className="font-medium text-gray-800">{order.customer?.name || "—"}</span></p>
              <p>{order.customer?.email}</p>
              <p>{order.customer?.phone}</p>
            </div>
            {order.billing && (
              <div className="mt-3 pt-3 border-t border-gray-50 text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-1">Billing Address</p>
                <p>{order.billing.address || order.billing.houseAddress}</p>
                <p>{[order.billing.city, order.billing.state].filter(Boolean).join(", ")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">Update Order</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30 resize-none"
                placeholder="Internal notes..."
              />
            </div>
            {saved && <p className="text-xs text-green-600">Saved successfully!</p>}
            <button
              onClick={() => updateMutation.mutate({ status: newStatus, order_notes: notes })}
              disabled={updateMutation.isPending}
              className="w-full py-2.5 bg-[#004B93] hover:bg-[#003a73] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-2 text-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Info</h3>
            <div className="flex justify-between text-gray-600">
              <span>Method</span>
              <span className="font-medium text-gray-800">{order.payment_method_title || "—"}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Transaction ID</span>
              <span className="font-mono text-xs text-gray-500 truncate max-w-32">{order.transaction_id || "—"}</span>
            </div>
            {order.receipt_url && (
              <a
                href={order.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-[#004B93] text-xs hover:underline"
              >
                View Receipt →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
