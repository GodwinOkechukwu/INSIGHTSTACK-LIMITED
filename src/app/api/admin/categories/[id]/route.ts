import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const category = await queryOne<any>(`SELECT * FROM ${T.categories} WHERE id = $1`, [parseInt(id, 10)]);
  if (!category) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { name, slug, description, parent_id, image_url } = body;

    const existing = await queryOne<any>(`SELECT id FROM ${T.categories} WHERE id = $1`, [parseInt(id, 10)]);
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const finalSlug = slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined);

    const updated = await queryOne<any>(
      `UPDATE ${T.categories} SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        parent_id = $4,
        image_url = COALESCE($5, image_url),
        updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [name, finalSlug, description, parent_id ?? null, image_url, parseInt(id, 10)],
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin update category error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const catId = parseInt(id, 10);

  const existing = await queryOne<any>(`SELECT id FROM ${T.categories} WHERE id = $1`, [catId]);
  if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // Set children's parent to null
  await query(`UPDATE ${T.categories} SET parent_id = NULL WHERE parent_id = $1`, [catId]);
  await query(`DELETE FROM ${T.categories} WHERE id = $1`, [catId]);

  return NextResponse.json({ message: "Category deleted" });
}
