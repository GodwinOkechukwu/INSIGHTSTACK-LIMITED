import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const verifyCookieToken = req.cookies.get(AUTH_TOKEN_KEY);
	const verifyCookieEmail = req.cookies.get(AUTH_EMAIL);

	// Pages that require user verification
	const protectedPages = [
		"/user/dashboard",
		"/user/account-details",
		"/user/my-orders",
		"/user/change-password",
		"/checkout",
		"/complete-order",
	];

	// If the user is not authenticated and is trying to access a protected page
	const isUnverifiedUserAccessingPage =
		!verifyCookieToken &&
		!verifyCookieEmail &&
		protectedPages.some((page) => pathname.startsWith(page));

	// if (isUnverifiedUserAccessingPage) {
	// 	req.nextUrl.pathname = "/user/login";
	// 	return NextResponse.redirect(req.nextUrl);
	// }

	// Allow access to all other requests including Next.js internal routes
	if (pathname.startsWith("/_next")) return NextResponse.next();

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/user/dashboard",
		"/user/account-details",
		"/user/my-orders",
		"/user/change-password",
		"/checkout",
		"/complete-order",
	],
};
