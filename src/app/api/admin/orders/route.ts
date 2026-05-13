import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;
    const status = searchParams.get("status") || "";
    const search = searchParams.get("search") || "";
    const dateFrom = searchParams.get("date_from") || "";
    const dateTo = searchParams.get("date_to") || "";

    const conditions: string[] = [];
    const params: any[] = [];
    let pi = 1;

    if (status) {
      conditions.push(`o.status = $${pi}`);
      params.push(status);
      pi++;
    }
    if (dateFrom) {
      conditions.push(`o.created_at >= $${pi}`);
      params.push(dateFrom);
      pi++;
    }
    if (dateTo) {
      conditions.push(`o.created_at <= $${pi}`);
      params.push(dateTo);
      pi++;
    }
    if (search) {
      conditions.push(`(u.email ILIKE $${pi} OR u.first_name ILIKE $${pi} OR u.last_name ILIKE $${pi} OR CAST(o.id AS TEXT) = $${pi + 1})`);
      params.push(`%${search}%`, search);
      pi += 2;
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await query(
      `SELECT COUNT(*) AS total FROM ${T.orders} o
       LEFT JOIN ${T.users} u ON u.id = o.customer_id
       ${where}`,
      params,
    );
    const total = parseInt(countResult[0].total, 10);

    const orders = await query(
      `SELECT o.*, u.first_name, u.last_name, u.email,
              (SELECT COUNT(*) FROM ${T.orderItems} oi WHERE oi.order_id = o.id) AS item_count
       FROM ${T.orders} o
       LEFT JOIN ${T.users} u ON u.id = o.customer_id
       ${where}
       ORDER BY o.created_at DESC LIMIT $${pi} OFFSET $${pi + 1}`,
      [...params, limit, offset],
    );

    return NextResponse.json({
      orders: orders.map((o: any) => ({
        id: o.id,
        status: o.status,
        total: o.total?.toString() ?? "0",
        currency: o.currency,
        payment_method_title: o.payment_method_title,
        item_count: parseInt(o.item_count, 10),
        customer_name: `${o.first_name ?? ""} ${o.last_name ?? ""}`.trim(),
        customer_email: o.email,
        billing: o.billing,
        created_at: o.created_at,
        updated_at: o.updated_at,
      })),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin orders list error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
