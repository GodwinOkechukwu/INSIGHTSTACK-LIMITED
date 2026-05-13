import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { comparePassword, signToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 },
			);
		}

		const user = await queryOne(
			`SELECT id, email, first_name, last_name, username, password_hash, role, is_verified
       FROM ${T.users} WHERE email = $1`,
			[email.toLowerCase()],
		);

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 },
			);
		}

		const valid = await comparePassword(password, user.password_hash);
		if (!valid) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 },
			);
		}

		const token = signToken({ id: user.id, email: user.email, role: user.role });

		return NextResponse.json({
			message: "Login successful",
			data: {
				token,
				user: {
					id: user.id,
					email: user.email,
					email_verified_at: user.is_verified ? new Date().toISOString() : null,
					roles: [user.role],
					created_at: user.created_at,
					updated_at: user.updated_at,
				},
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
