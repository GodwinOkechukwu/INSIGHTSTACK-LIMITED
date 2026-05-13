import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@src/lib/db";
import { hashPassword, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// PUT /api/customer/reset-password
export async function PUT(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const body = await req.json();
		const resetToken = token || body.token;
		const newPassword = body.newPassword || body.password;

		if (!resetToken || !newPassword) {
			return NextResponse.json(
				{ message: "Token and new password are required" },
				{ status: 400 },
			);
		}

		const user = await queryOne(
			`SELECT id FROM ${T.users} WHERE reset_token = $1 AND reset_token_expires > NOW()`,
			[resetToken],
		);

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid or expired reset token" },
				{ status: 400 },
			);
		}

		const passwordHash = await hashPassword(newPassword.toString());
		await query(
			`UPDATE ${T.users} SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL, updated_at = NOW()
       WHERE id = $2`,
			[passwordHash, user.id],
		);

		return NextResponse.json({ message: "Password reset successfully" });
	} catch (error) {
		console.error("Reset password error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
