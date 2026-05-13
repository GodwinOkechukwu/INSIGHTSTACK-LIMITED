import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const targetId = parseInt(id, 10);

  if (targetId === admin.id) {
    return NextResponse.json({ message: "Cannot delete your own account" }, { status: 400 });
  }

  const existing = await queryOne<any>(
    `SELECT id FROM ${T.users} WHERE id = $1 AND role = 'admin'`,
    [targetId],
  );
  if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

  await query(`DELETE FROM ${T.users} WHERE id = $1`, [targetId]);
  return NextResponse.json({ message: "Admin deleted" });
}
