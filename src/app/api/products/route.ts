import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { hydrateProducts } from "@src/lib/productHelpers";
import { T } from "@src/lib/tables";

// GET /api/products
// Query params: category, search, page, per_page, status
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl;
		const category = searchParams.get("category");
		const search = searchParams.get("search");
		const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
		const perPage = Math.min(
			100,
			Math.max(1, parseInt(searchParams.get("per_page") || "20", 10)),
		);
		const offset = (page - 1) * perPage;

		const conditions: string[] = ["p.status = 'publish'"];
		const values: any[] = [];
		let idx = 1;

		if (category) {
			conditions.push(
				`p.id IN (SELECT product_id FROM ${T.productCategories} WHERE category_id = $${idx++})`,
			);
			values.push(parseInt(category, 10));
		}

		if (search) {
			conditions.push(
				`(p.name ILIKE $${idx} OR p.sku ILIKE $${idx} OR p.description ILIKE $${idx})`,
			);
			values.push(`%${search}%`);
			idx++;
		}

		const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

		const [countResult] = await query(
			`SELECT COUNT(*) AS total FROM ${T.products} p ${where}`,
			values,
		);
		const total = parseInt(countResult.total, 10);
		const totalPages = Math.ceil(total / perPage);

		const rows = await query(
			`SELECT p.* FROM ${T.products} p ${where} ORDER BY p.created_at DESC LIMIT $${idx++} OFFSET $${idx++}`,
			[...values, perPage, offset],
		);

		const products = await hydrateProducts(rows);

		// Add X-WP-Total headers to maintain WooCommerce API compatibility
		const res = NextResponse.json(products);
		res.headers.set("x-wp-total", total.toString());
		res.headers.set("x-wp-totalpages", totalPages.toString());
		return res;
	} catch (error) {
		console.error("Products list error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
