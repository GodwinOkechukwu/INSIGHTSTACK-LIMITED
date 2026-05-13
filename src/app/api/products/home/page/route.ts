import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { hydrateProducts } from "@src/lib/productHelpers";
import { T } from "@src/lib/tables";

// GET /api/products/home/page
// Returns featured / latest products grouped for the home page
export async function GET(_req: NextRequest) {
	try {
		const rows = await query(
			`SELECT * FROM ${T.products} WHERE status = 'publish' ORDER BY created_at DESC LIMIT 20`,
		);

		const products = await hydrateProducts(rows);
		return NextResponse.json(products);
	} catch (error) {
		console.error("Home page products error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
