import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { verifyToken, extractBearerToken } from "@src/lib/auth";
import { T } from "@src/lib/tables";

// POST /api/order/verify-payment/:ref/:type
export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ ref: string; type: string }> },
) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { ref, type } = await params;
		const body = await req.json();

		// Verify with Paystack
		const paystackSecret = process.env.PAYSTACK_SECRET_KEY || "";
		const verifyRes = await fetch(
			`https://api.paystack.co/transaction/verify/${ref}`,
			{
				headers: { Authorization: `Bearer ${paystackSecret}` },
			},
		);
		const verifyData = await verifyRes.json();

		if (!verifyData.status || verifyData.data?.status !== "success") {
			return NextResponse.json(
				{ message: "Payment verification failed", status: false },
				{ status: 400 },
			);
		}

		// Create the order with the verified payment
		const {
			cart = [],
			user_info = {},
			subTotal,
			shippingCost,
			discount,
			total,
			shippingOption,
			paymentMethod,
		} = body;

		const [order] = await query(
			`INSERT INTO ${T.orders}
        (customer_id, status, total, subtotal, discount, shipping_cost,
         payment_method, payment_method_title, transaction_id, shipping_option, billing)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
			[
				decoded.id,
				"processing",
				parseFloat(total) || verifyData.data.amount / 100,
				parseFloat(subTotal) || 0,
				parseFloat(discount) || 0,
				parseFloat(shippingCost) || 0,
				paymentMethod || "paystack",
				"Paystack",
				ref,
				shippingOption || "",
				JSON.stringify(user_info),
			],
		);

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

		return NextResponse.json({
			message: "Payment verified and order created",
			status: true,
			data: {
				order_id: order.id,
				reference: ref,
			},
		});
	} catch (error) {
		console.error("Verify payment error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
