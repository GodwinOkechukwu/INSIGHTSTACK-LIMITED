import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/order/add — create a new order
export async function POST(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const {
			cart = [],
			user_info = {},
			subTotal,
			shippingCost,
			discount,
			total,
			shippingOption,
			paymentMethod,
			type,
		} = body;

		// Insert the order
		const [order] = await query(
			`INSERT INTO ${T.orders}
        (customer_id, status, total, subtotal, discount, shipping_cost,
         payment_method, shipping_option, billing)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
			[
				decoded.id,
				type === "delivery" ? "pending" : "pending",
				parseFloat(total) || 0,
				parseFloat(subTotal) || 0,
				parseFloat(discount) || 0,
				parseFloat(shippingCost) || 0,
				paymentMethod || "",
				shippingOption || "",
				JSON.stringify(user_info),
			],
		);

		// Insert line items
		if (cart.length > 0) {
			for (const item of cart) {
				await query(
					`INSERT INTO ${T.orderItems} (order_id, product_id, name, quantity, price, total, image_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
					[
						order.id,
						item.id ? parseInt(item.id, 10) : null,
						item.name || "Unknown",
						item.quantity || 1,
						parseFloat(item.price) || 0,
						parseFloat(item.price) * (item.quantity || 1),
						item.image || null,
					],
				);
			}
		}

		return NextResponse.json({
			message: "Order created successfully",
			order: {
				_id: order.id.toString(),
				id: order.id,
				status: order.status,
				total: order.total,
			},
		});
	} catch (error) {
		console.error("Create order error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
