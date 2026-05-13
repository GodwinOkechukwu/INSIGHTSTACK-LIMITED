import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// PUT /api/customer/user/kyc
export async function PUT(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { country, state, city, address } = body;

		const updates: string[] = [];
		const values: any[] = [];
		let idx = 1;

		if (country) { updates.push(`country = $${idx++}`); values.push(country); }
		if (state) { updates.push(`state = $${idx++}`); values.push(state); }
		if (city) { updates.push(`city = $${idx++}`); values.push(city); }
		if (address) { updates.push(`address = $${idx++}`); values.push(address); }
		updates.push(`updated_at = NOW()`);

		values.push(decoded.id);
		await query(
			`UPDATE ${T.users} SET ${updates.join(", ")} WHERE id = $${idx}`,
			values,
		);

		return NextResponse.json({ message: "KYC updated successfully" });
	} catch (error) {
		console.error("KYC update error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
