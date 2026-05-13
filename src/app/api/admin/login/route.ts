import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@src/lib/db";
import { comparePassword, signToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password required" }, { status: 400 });
    }

    const user = await queryOne<any>(
      `SELECT id, username, email, password_hash, role, first_name, last_name
       FROM ${T.users}
       WHERE (username = $1 OR email = $1) AND role = 'admin'`,
      [username],
    );

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        role: user.role,
      },
    });

    res.cookies.set("ADMIN_ACCESS", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
