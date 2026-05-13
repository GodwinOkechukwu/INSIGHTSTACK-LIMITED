import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

// GET /api/admin/reviews
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") || "20", 10)));
    const offset = (page - 1) * perPage;
    const productId = searchParams.get("product_id") || "";
    const search = searchParams.get("search") || "";

    const conditions: string[] = [];
    const params: any[] = [];
    let pi = 1;

    if (productId) {
      conditions.push(`r.product_id = $${pi}`);
      params.push(parseInt(productId, 10));
      pi++;
    }
    if (search) {
      conditions.push(`(r.reviewer ILIKE $${pi} OR r.comment ILIKE $${pi})`);
      params.push(`%${search}%`);
      pi++;
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRows = await query(
      `SELECT COUNT(*) AS total FROM ${T.reviews} r ${where}`,
      params,
    );
    const total = parseInt(countRows[0].total, 10);

    const reviews = await query(
      `SELECT r.*, p.name AS product_name
       FROM ${T.reviews} r
       JOIN ${T.products} p ON p.id = r.product_id
       ${where}
       ORDER BY r.created_at DESC
       LIMIT $${pi} OFFSET $${pi + 1}`,
      [...params, perPage, offset],
    );

    return NextResponse.json({
      reviews,
      total,
      page,
      pages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.error("Admin reviews list error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
