import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

const VALID_STATUSES = ["pending", "processing", "completed", "cancelled", "on-hold", "refunded"];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    const order = await queryOne<any>(
      `SELECT o.*, u.first_name, u.last_name, u.email, u.phone
       FROM ${T.orders} o
       LEFT JOIN ${T.users} u ON u.id = o.customer_id
       WHERE o.id = $1`,
      [parseInt(id, 10)],
    );

    if (!order) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const items = await query(
      `SELECT * FROM ${T.orderItems} WHERE order_id = $1 ORDER BY id`,
      [order.id],
    );

    return NextResponse.json({
      id: order.id,
      status: order.status,
      currency: order.currency,
      total: order.total?.toString() ?? "0",
      subtotal: order.subtotal?.toString() ?? "0",
      discount: order.discount?.toString() ?? "0",
      shipping_cost: order.shipping_cost?.toString() ?? "0",
      payment_method: order.payment_method,
      payment_method_title: order.payment_method_title,
      transaction_id: order.transaction_id,
      billing: order.billing,
      order_notes: order.order_notes,
      receipt_url: order.receipt_url,
      shipping_option: order.shipping_option,
      created_at: order.created_at,
      updated_at: order.updated_at,
      customer: {
        id: order.customer_id,
        name: `${order.first_name ?? ""} ${order.last_name ?? ""}`.trim(),
        email: order.email,
        phone: order.phone,
      },
      line_items: items.map((i: any) => ({
        id: i.id,
        product_id: i.product_id,
        name: i.name,
        quantity: i.quantity,
        price: i.price?.toString() ?? "0",
        total: i.total?.toString() ?? "0",
        image_url: i.image_url,
      })),
    });
  } catch (error) {
    console.error("Admin order detail error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { status, order_notes } = body;

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const existing = await queryOne<any>(`SELECT id FROM ${T.orders} WHERE id = $1`, [parseInt(id, 10)]);
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    await query(
      `UPDATE ${T.orders} SET
        status = COALESCE($1, status),
        order_notes = COALESCE($2, order_notes),
        updated_at = NOW()
       WHERE id = $3`,
      [status ?? null, order_notes ?? null, parseInt(id, 10)],
    );

    return NextResponse.json({ message: "Order updated" });
  } catch (error) {
    console.error("Admin update order error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
