import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@src/lib/db";
import { hydrateProducts } from "@src/lib/productHelpers";
import { T } from "@src/lib/tables";

// GET /api/products/:id
export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const productId = parseInt(id, 10);

		if (isNaN(productId)) {
			return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
		}

		const row = await queryOne(
			`SELECT * FROM ${T.products} WHERE id = $1`,
			[productId],
		);

		if (!row) {
			return NextResponse.json({ message: "Product not found" }, { status: 404 });
		}

		const [product] = await hydrateProducts([row]);
		return NextResponse.json(product);
	} catch (error) {
		console.error("Product by ID error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
