import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@src/lib/db";
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
		payment_method: order.payment_method ?? "",
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

// GET /api/order/:id
export async function GET(
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
		const orderId = parseInt(id, 10);

		if (isNaN(orderId)) {
			return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
		}

		const order = await queryOne(
			`SELECT * FROM ${T.orders} WHERE id = $1 AND customer_id = $2`,
			[orderId, decoded.id],
		);

		if (!order) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 });
		}

		const items = await query(
			`SELECT * FROM ${T.orderItems} WHERE order_id = $1`,
			[orderId],
		);

		return NextResponse.json(buildOrderShape(order, items));
	} catch (error) {
		console.error("Order by ID error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
