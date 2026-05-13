import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// GET /api/customer/userinfo
export async function GET(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const user = await queryOne(
			`SELECT id, first_name, last_name, email, phone, address, city, state, country,
              avatar_url, is_verified, created_at, updated_at
       FROM ${T.users} WHERE id = $1`,
			[decoded.id],
		);

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		// Return both our internal shape AND the WooCommerce-compatible shape
		// so that filterCustomersByEmail() and all existing components work
		return NextResponse.json({
			// Internal fields
			_id: user.id.toString(),
			name: `${user.first_name} ${user.last_name}`.trim(),
			image: user.avatar_url ?? "",
			createdAt: user.created_at,
			updatedAt: user.updated_at,
			kyc: { bankStatement: "", bvn: "", nationalId: "", passport: "", utilityBill: "" },
			isKyced: "false",
			// Woo_Customer_Type compatible fields
			id: user.id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.email,
			role: "customer",
			avatar_url: user.avatar_url ?? "",
			date_created: user.created_at,
			date_modified: user.updated_at,
			billing: {
				first_name: user.first_name,
				last_name: user.last_name,
				company: "",
				address_1: user.address ?? "",
				address_2: "",
				city: user.city ?? "",
				postcode: "",
				country: user.country ?? "",
				state: user.state ?? "",
				email: user.email,
				phone: user.phone ?? "",
			},
			shipping: {
				first_name: user.first_name,
				last_name: user.last_name,
				company: "",
				address_1: user.address ?? "",
				address_2: "",
				city: user.city ?? "",
				postcode: "",
				country: user.country ?? "",
				state: user.state ?? "",
				phone: user.phone ?? "",
			},
			is_paying_customer: false,
			meta_data: [],
		});
	} catch (error) {
		console.error("Userinfo error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
