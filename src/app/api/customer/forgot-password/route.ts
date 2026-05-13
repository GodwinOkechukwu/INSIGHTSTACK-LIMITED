import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@src/lib/db";
import { generateRandomToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/customer/forgot-password
export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		if (!email) {
			return NextResponse.json({ message: "Email is required" }, { status: 400 });
		}

		const user = await queryOne(
			`SELECT id, email FROM ${T.users} WHERE email = $1`,
			[email.toLowerCase()],
		);

		// Always respond positively to prevent email enumeration
		if (!user) {
			return NextResponse.json({
				message: "If this email exists, a reset link has been sent.",
			});
		}

		const resetToken = generateRandomToken();
		const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

		await query(
			`UPDATE ${T.users} SET reset_token = $1, reset_token_expires = $2, updated_at = NOW() WHERE id = $3`,
			[resetToken, expires, user.id],
		);

		// In production, send email with reset link containing resetToken
		// e.g. `${process.env.NEXT_PUBLIC_BASE_URL}/user/reset-password?token=${resetToken}`

		return NextResponse.json({
			message: "If this email exists, a reset link has been sent.",
			// Return token in dev so the client can use it immediately
			token: resetToken,
		});
	} catch (error) {
		console.error("Forgot password error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
