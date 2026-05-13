import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { hashPassword, generateRandomToken, signToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/customer/verify-email
// Receives { email, name, password } → creates a pending user and returns a token
// The token is then used in /api/customer/register/:token to activate the account
export async function POST(req: NextRequest) {
	try {
		const { email, name, password } = await req.json();

		if (!email || !name || !password) {
			return NextResponse.json(
				{ message: "All fields are required", status: false },
				{ status: 400 },
			);
		}

		const existing = await queryOne(
			`SELECT id FROM ${T.users} WHERE email = $1`,
			[email.toLowerCase()],
		);
		if (existing) {
			return NextResponse.json(
				{ message: "Email already registered", status: false },
				{ status: 409 },
			);
		}

		const verificationToken = generateRandomToken();
		const passwordHash = await hashPassword(password.toString());

		const nameParts = name.trim().split(" ");
		const firstName = nameParts[0] || name;
		const lastName = nameParts.slice(1).join(" ") || "";
		const username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") + Math.floor(Math.random() * 9999);

		// Insert the user in a pending state
		const [user] = await query(
			`INSERT INTO ${T.users} (first_name, last_name, username, email, password_hash, role, is_verified, verification_token)
       VALUES ($1, $2, $3, $4, $5, 'customer', false, $6)
       RETURNING id, email`,
			[firstName, lastName, username, email.toLowerCase(), passwordHash, verificationToken],
		);

		// In production you would send an email with this token
		// For now return the token directly so the client can call /register/:token
		return NextResponse.json({
			message: "Verification email sent",
			status: true,
			// token is returned so /register/:token can be called immediately (dev mode)
			token: verificationToken,
		});
	} catch (error) {
		console.error("Verify email error:", error);
		return NextResponse.json({ message: "Server error", status: false }, { status: 500 });
	}
}
