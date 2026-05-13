import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const categories = await query(
      `SELECT c.*, p.name AS parent_name
       FROM ${T.categories} c
       LEFT JOIN ${T.categories} p ON p.id = c.parent_id
       ORDER BY c.parent_id NULLS FIRST, c.name`,
    );
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Admin categories error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { name, slug, description = "", parent_id = null, image_url = null } = await req.json();
    if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const category = await queryOne<any>(
      `INSERT INTO ${T.categories} (name, slug, description, parent_id, image_url, count, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,0,NOW(),NOW()) RETURNING *`,
      [name, finalSlug, description, parent_id || null, image_url],
    );

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
    }
    console.error("Admin create category error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
