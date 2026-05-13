import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    const customer = await queryOne<any>(
      `SELECT id, username, first_name, last_name, email, phone, address, city, state,
              country, postcode, avatar_url, is_verified, created_at, updated_at
       FROM ${T.users} WHERE id = $1 AND role = 'customer'`,
      [parseInt(id, 10)],
    );
    if (!customer) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const orders = await query(
      `SELECT id, status, total, created_at FROM ${T.orders}
       WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 10`,
      [customer.id],
    );

    return NextResponse.json({ ...customer, recent_orders: orders });
  } catch (error) {
    console.error("Admin customer detail error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { is_verified, first_name, last_name, email, phone, address } = body;

    const existing = await queryOne<any>(
      `SELECT id FROM ${T.users} WHERE id = $1 AND role = 'customer'`,
      [parseInt(id, 10)],
    );
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    await query(
      `UPDATE ${T.users} SET
        is_verified = COALESCE($1, is_verified),
        first_name = COALESCE($2, first_name),
        last_name = COALESCE($3, last_name),
        email = COALESCE($4, email),
        phone = COALESCE($5, phone),
        address = COALESCE($6, address),
        updated_at = NOW()
       WHERE id = $7`,
      [is_verified ?? null, first_name, last_name, email, phone, address, parseInt(id, 10)],
    );

    return NextResponse.json({ message: "Customer updated" });
  } catch (error) {
    console.error("Admin update customer error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
