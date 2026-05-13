import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@src/lib/db";
import { hashPassword } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// GET /api/admin/bootstrap?secret=warespire-admin-2024
// One-time endpoint to create the super admin account.
// Safe to run multiple times — uses ON CONFLICT DO NOTHING.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== "warespire-admin-2024") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const existing = await queryOne<any>(
      `SELECT id FROM ${T.users} WHERE email = $1`,
      ["admin@gmail.com"],
    );

    if (existing) {
      return NextResponse.json({
        message: "Super admin already exists",
        id: existing.id,
      });
    }

    const hash = await hashPassword("admin");
    const admin = await queryOne<any>(
      `INSERT INTO ${T.users}
       (username, email, password_hash, first_name, last_name, role, is_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'admin', true, NOW(), NOW())
       RETURNING id, username, email, role`,
      ["superadmin", "admin@gmail.com", hash, "Super", "Admin"],
    );

    return NextResponse.json({
      message: "Super admin created successfully",
      admin,
    });
  } catch (error: any) {
    console.error("Bootstrap error:", error);
    return NextResponse.json(
      { message: "Failed", error: error.message },
      { status: 500 },
    );
  }
}
