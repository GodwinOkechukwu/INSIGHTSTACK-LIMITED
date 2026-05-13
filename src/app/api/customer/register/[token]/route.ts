import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@src/lib/db";
import { signToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/customer/register/:token
// Activates an account created by /api/customer/verify-email
export async function POST(
	_req: NextRequest,
	{ params }: { params: Promise<{ token: string }> },
) {
	try {
		const { token } = await params;

		const user = await queryOne(
			`SELECT id, email, first_name, last_name, role
       FROM ${T.users} WHERE verification_token = $1 AND is_verified = false`,
			[token],
		);

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 400 },
			);
		}

		await query(
			`UPDATE ${T.users} SET is_verified = true, verification_token = NULL, updated_at = NOW()
       WHERE id = $1`,
			[user.id],
		);

		const jwtToken = signToken({ id: user.id, email: user.email, role: user.role });

		return NextResponse.json({
			message: "Account activated successfully",
			token: jwtToken,
			_id: user.id.toString(),
			name: `${user.first_name} ${user.last_name}`.trim(),
			email: user.email,
		});
	} catch (error) {
		console.error("Register token error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
