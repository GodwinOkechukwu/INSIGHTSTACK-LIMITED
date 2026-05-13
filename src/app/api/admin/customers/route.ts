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
    const search = searchParams.get("search") || "";
    const verified = searchParams.get("verified") || "";

    const conditions = [`role = 'customer'`];
    const params: any[] = [];
    let pi = 1;

    if (search) {
      conditions.push(`(email ILIKE $${pi} OR first_name ILIKE $${pi} OR last_name ILIKE $${pi} OR phone ILIKE $${pi})`);
      params.push(`%${search}%`);
      pi++;
    }
    if (verified !== "") {
      conditions.push(`is_verified = $${pi}`);
      params.push(verified === "true");
      pi++;
    }

    const where = `WHERE ${conditions.join(" AND ")}`;

    const countResult = await query(`SELECT COUNT(*) AS total FROM ${T.users} ${where}`, params);
    const total = parseInt(countResult[0].total, 10);

    const customers = await query(
      `SELECT id, username, first_name, last_name, email, phone, address, city, state,
              is_verified, created_at,
              (SELECT COUNT(*) FROM ${T.orders} WHERE customer_id = u.id) AS order_count
       FROM ${T.users} u ${where}
       ORDER BY created_at DESC LIMIT $${pi} OFFSET $${pi + 1}`,
      [...params, limit, offset],
    );

    return NextResponse.json({
      customers: customers.map((c: any) => ({
        ...c,
        order_count: parseInt(c.order_count, 10),
      })),
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin customers error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
