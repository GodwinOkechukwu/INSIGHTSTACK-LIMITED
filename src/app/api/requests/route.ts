import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// GET /api/requests — get paylater requests for user
export async function GET(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") || "1", 10));
		const limit = Math.min(50, Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "10", 10)));
		const offset = (page - 1) * limit;

		const [countResult] = await query(
			`SELECT COUNT(*) AS total FROM ${T.paylaterRequests} WHERE customer_id = $1`,
			[decoded.id],
		);
		const totalDoc = parseInt(countResult.total, 10);
		const pages = Math.ceil(totalDoc / limit);

		const requests = await query(
			`SELECT r.*, p.id AS p_id, p.name AS p_name, p.price AS p_price
       FROM ${T.paylaterRequests} r
       LEFT JOIN ${T.products} p ON p.id = r.product_id
       WHERE r.customer_id = $1
       ORDER BY r.created_at DESC LIMIT $2 OFFSET $3`,
			[decoded.id, limit, offset],
		);

		const statusCount = requests.reduce(
			(acc: any, r: any) => {
				acc[r.status] = (acc[r.status] || 0) + 1;
				return acc;
			},
			{ pending: 0, accept: 0, decline: 0 },
		);

		return NextResponse.json({
			orders: requests.map((r: any) => ({
				_id: r.id.toString(),
				status: r.status,
				customerId: r.customer_id?.toString(),
				productId: r.product_id
					? { _id: r.p_id?.toString(), title: { en: r.p_name }, prices: { price: r.p_price } }
					: null,
				payment: r.payment ?? [],
				createdAt: r.created_at,
				updatedAt: r.updated_at,
			})),
			totalDoc,
			pages,
			limits: limit,
			pending: statusCount.pending ?? 0,
			accept: statusCount.accept ?? 0,
			decline: statusCount.decline ?? 0,
		});
	} catch (error) {
		console.error("Requests list error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
