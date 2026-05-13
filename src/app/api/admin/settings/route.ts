import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const rows = await query(`SELECT key, value FROM ${T.globalSettings} ORDER BY key`);
  const settings = rows.reduce((acc: any, row: any) => {
    acc[row.key] = row.value;
    return acc;
  }, {} as Record<string, string>);

  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const entries = Object.entries(body) as [string, string][];

    if (!entries.length) {
      return NextResponse.json({ message: "No settings provided" }, { status: 400 });
    }

    await Promise.all(
      entries.map(([key, value]) =>
        query(
          `INSERT INTO ${T.globalSettings} (key, value, created_at, updated_at)
           VALUES ($1, $2, NOW(), NOW())
           ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
          [key, String(value)],
        ),
      ),
    );

    return NextResponse.json({ message: "Settings saved" });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
