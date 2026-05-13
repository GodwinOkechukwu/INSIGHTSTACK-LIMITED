import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { name, image_url, url, show } = body;

    const existing = await queryOne<any>(`SELECT id FROM ${T.banners} WHERE id = $1`, [parseInt(id, 10)]);
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const updated = await queryOne<any>(
      `UPDATE ${T.banners} SET
        name = COALESCE($1, name),
        image_url = COALESCE($2, image_url),
        url = COALESCE($3, url),
        show = COALESCE($4, show),
        updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [name, image_url, url, show ?? null, parseInt(id, 10)],
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin update banner error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const existing = await queryOne<any>(`SELECT id FROM ${T.banners} WHERE id = $1`, [parseInt(id, 10)]);
  if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

  await query(`DELETE FROM ${T.banners} WHERE id = $1`, [parseInt(id, 10)]);
  return NextResponse.json({ message: "Banner deleted" });
}
