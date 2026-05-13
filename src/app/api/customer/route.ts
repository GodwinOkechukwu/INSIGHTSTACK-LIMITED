import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// PUT /api/customer — update account details
export async function PUT(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { name, email, address, phone, image } = body;

		let firstName = "", lastName = "";
		if (name) {
			const parts = name.trim().split(" ");
			firstName = parts[0] || "";
			lastName = parts.slice(1).join(" ") || "";
		}

		const updates: string[] = [];
		const values: any[] = [];
		let idx = 1;

		if (name) {
			updates.push(`first_name = $${idx++}`, `last_name = $${idx++}`);
			values.push(firstName, lastName);
		}
		if (email) { updates.push(`email = $${idx++}`); values.push(email); }
		if (address) { updates.push(`address = $${idx++}`); values.push(address); }
		if (phone) { updates.push(`phone = $${idx++}`); values.push(phone); }
		if (image) { updates.push(`avatar_url = $${idx++}`); values.push(image); }

		updates.push(`updated_at = NOW()`);

		if (values.length === 0) {
			return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
		}

		values.push(decoded.id);
		const [updated] = await query(
			`UPDATE ${T.users} SET ${updates.join(", ")} WHERE id = $${idx} RETURNING id, first_name, last_name, email, address, phone, avatar_url`,
			values,
		);

		return NextResponse.json({
			message: "Account updated",
			_id: updated.id.toString(),
			name: `${updated.first_name} ${updated.last_name}`.trim(),
			email: updated.email,
			address: updated.address ?? "",
			phone: updated.phone ?? "",
			image: updated.avatar_url ?? "",
		});
	} catch (error) {
		console.error("Update account error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
