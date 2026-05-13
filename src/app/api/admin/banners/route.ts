import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const banners = await query(`SELECT * FROM ${T.banners} ORDER BY created_at DESC`);
  return NextResponse.json({ banners });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { name, image_url, url = "", show = true } = await req.json();
    if (!name || !image_url) {
      return NextResponse.json({ message: "Name and image are required" }, { status: 400 });
    }

    const banner = await queryOne<any>(
      `INSERT INTO ${T.banners} (name, image_url, url, show, created_at, updated_at)
       VALUES ($1,$2,$3,$4,NOW(),NOW()) RETURNING *`,
      [name, image_url, url, show],
    );

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Admin create banner error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
