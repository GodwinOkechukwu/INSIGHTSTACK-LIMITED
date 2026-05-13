import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

function buildOrderShape(order: any, items: any[]) {
	return {
		id: order.id,
		status: order.status,
		currency: order.currency,
		total: order.total?.toString() ?? "0",
		subtotal: order.subtotal?.toString() ?? "0",
		discount: order.discount?.toString() ?? "0",
		shipping_cost: order.shipping_cost?.toString() ?? "0",
		payment_method: order.payment_method ?? "",
		payment_method_title: order.payment_method_title ?? "",
		transaction_id: order.transaction_id ?? "",
		billing: order.billing ?? {},
		order_notes: order.order_notes ?? "",
		receipt_url: order.receipt_url ?? "",
		date_created: order.created_at,
		date_modified: order.updated_at,
		line_items: items.map((i: any) => ({
			id: i.id,
			name: i.name,
			product_id: i.product_id,
			quantity: i.quantity,
			price: i.price?.toString() ?? "0",
			total: i.total?.toString() ?? "0",
			image: i.image_url ? { src: i.image_url } : null,
		})),
		// Legacy compat fields used by the frontend
		_id: order.id.toString(),
		invoice: order.id,
		paymentMethod: order.payment_method ?? "",
		subTotal: order.subtotal,
		cart: items.map((i: any) => ({
			id: i.product_id?.toString(),
			name: i.name,
			price: i.price,
			quantity: i.quantity,
			image: i.image_url,
		})),
		user_info: order.billing,
		createdAt: order.created_at,
		updatedAt: order.updated_at,
	};
}

// GET /api/order — list orders for authenticated user
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
			`SELECT COUNT(*) AS total FROM ${T.orders} WHERE customer_id = $1`,
			[decoded.id],
		);
		const totalDoc = parseInt(countResult.total, 10);
		const pages = Math.ceil(totalDoc / limit);

		const orders = await query(
			`SELECT * FROM ${T.orders} WHERE customer_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
			[decoded.id, limit, offset],
		);

		const orderIds = orders.map((o: any) => o.id);
		const allItems =
			orderIds.length > 0
				? await query(
						`SELECT * FROM ${T.orderItems} WHERE order_id = ANY($1::int[])`,
						[orderIds],
					)
				: [];

		const itemsByOrder = allItems.reduce((acc: any, item: any) => {
			if (!acc[item.order_id]) acc[item.order_id] = [];
			acc[item.order_id].push(item);
			return acc;
		}, {} as Record<number, any[]>);

		const statusCounts = orders.reduce(
			(acc: any, o: any) => {
				acc[o.status] = (acc[o.status] || 0) + 1;
				return acc;
			},
			{ delivered: 0, pending: 0, processing: 0 },
		);

		return NextResponse.json({
			orders: orders.map((o: any) => buildOrderShape(o, itemsByOrder[o.id] || [])),
			totalDoc,
			pages,
			limits: limit,
			delivered: statusCounts.delivered ?? 0,
			pending: statusCounts.pending ?? 0,
			processing: statusCounts.processing ?? 0,
		});
	} catch (error) {
		console.error("Orders list error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
