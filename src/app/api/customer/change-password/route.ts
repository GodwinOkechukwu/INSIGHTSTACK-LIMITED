import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@src/lib/db";
import { comparePassword, hashPassword } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/customer/change-password
export async function POST(req: NextRequest) {
	try {
		const { email, old_password, new_password } = await req.json();

		if (!email || !old_password || !new_password) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 },
			);
		}

		const user = await queryOne(
			`SELECT id, password_hash FROM ${T.users} WHERE email = $1`,
			[email.toLowerCase()],
		);

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const valid = await comparePassword(old_password, user.password_hash);
		if (!valid) {
			return NextResponse.json(
				{ message: "Old password is incorrect" },
				{ status: 400 },
			);
		}

		const newHash = await hashPassword(new_password.toString());
		await query(
			`UPDATE ${T.users} SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
			[newHash, user.id],
		);

		return NextResponse.json({ message: "Password changed successfully" });
	} catch (error) {
		console.error("Change password error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
