import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractBearerToken } from "@src/lib/auth";

// POST /api/order/initialize-payment
// Initializes a Paystack payment session
export async function POST(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number; email: string }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const { amount, email } = await req.json();
		const paystackSecret = process.env.PAYSTACK_SECRET_KEY || "";

		const response = await fetch("https://api.paystack.co/transaction/initialize", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${paystackSecret}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email || decoded.email,
				amount: Math.round(parseFloat(amount) * 100), // Paystack uses kobo
			}),
		});

		const data = await response.json();

		if (!data.status) {
			return NextResponse.json(
				{ message: data.message || "Payment initialization failed" },
				{ status: 400 },
			);
		}

		return NextResponse.json({
			authorization_url: data.data.authorization_url,
			access_code: data.data.access_code,
			reference: data.data.reference,
		});
	} catch (error) {
		console.error("Initialize payment error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
