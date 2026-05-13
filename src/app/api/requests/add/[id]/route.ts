import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/requests/add/:id  (id = product_id)
export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const productId = parseInt(id, 10);

		const [request] = await query(
			`INSERT INTO ${T.paylaterRequests} (customer_id, product_id, status)
       VALUES ($1, $2, 'pending') RETURNING id`,
			[decoded.id, isNaN(productId) ? null : productId],
		);

		return NextResponse.json({
			message: "Request submitted",
			_id: request.id.toString(),
		});
	} catch (error) {
		console.error("Add request error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
