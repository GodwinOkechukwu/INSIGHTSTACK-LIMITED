import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { hashPassword } from "@src/lib/auth";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const admins = await query(
      `SELECT id, username, email, first_name, last_name, created_at FROM ${T.users}
       WHERE role = 'admin' ORDER BY created_at DESC`,
    );
    return NextResponse.json({ admins });
  } catch (error) {
    console.error("Admin list error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { username, email, password, first_name = "", last_name = "" } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existing = await queryOne<any>(
      `SELECT id FROM ${T.users} WHERE username = $1 OR email = $2`,
      [username, email],
    );
    if (existing) {
      return NextResponse.json({ message: "Username or email already exists" }, { status: 409 });
    }

    const hash = await hashPassword(password);
    const newAdmin = await queryOne<any>(
      `INSERT INTO ${T.users} (username, email, password_hash, first_name, last_name, role, is_verified, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,'admin',true,NOW(),NOW()) RETURNING id, username, email, first_name, last_name, created_at`,
      [username, email, hash, first_name, last_name],
    );

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "Username or email already exists" }, { status: 409 });
    }
    console.error("Admin create error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
