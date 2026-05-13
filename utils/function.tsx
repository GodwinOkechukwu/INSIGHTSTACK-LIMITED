"use client";
import { logoImage } from "@public/images";
import Picture from "@src/components/picture/Picture";
import Link from "next/link";

interface LogoImageProps {
	className?: string;
}

import { Nunito, Pacifico } from "next/font/google";

const pacifico = Pacifico({
	subsets: ["latin-ext"],
	weight: ["400"],
	style: ["normal"],
});

export const LogoImage = ({ className }: LogoImageProps) => {
	return (
		<Link href='/' className='flex items-end'>
			<Picture
				src={logoImage}
				alt='logo'
				priority
				loading='lazy'
				className={`w-[20px] lg:w-[30px] duration-300 hover:scale-105 transition-[.3] hover:animate-pulse ${className}`}
			/>
		</Link>
	);
};

export const extractCurrencySymbol = (html: string) => {
	if (!html) return "";
	const doc = new DOMParser().parseFromString(html, "text/html");
	return doc.body.textContent?.match(/[\u20A6]/)?.[0] || "";
};

export const getFriendlyStatus = (status: string, cargoStatus?: string) => {
	const map: Record<string, { label: string; color: string }> = {
		"on-hold": {
			label: "Awaiting Payment Verification",
			color: "bg-orange-100 text-orange-700",
		},
		processing: {
			label: "Procurement in Progress (China)",
			color: "bg-blue-100 text-blue-700",
		},
		"import-in-transit": {
			label: "In Transit to Nigeria",
			color: "bg-indigo-100 text-indigo-700",
		},
		"awaiting-shipping-payment": {
			label: "Arrived Lagos - Awaiting Clearing",
			color: "bg-purple-100 text-purple-700",
		},
		"shipping-paid": {
			label: "Clearing Payment Verified",
			color: "bg-teal-100 text-teal-700",
		},
		completed: {
			label: "Order Delivered",
			color: "bg-green-100 text-green-700",
		},
		cancelled: {
			label: "Order Cancelled",
			color: "bg-red-100 text-red-700",
		},
		refunded: {
			label: "Funds Refunded",
			color: "bg-slate-100 text-slate-700",
		},
		failed: {
			label: "Payment Failed / Rejected",
			color: "bg-red-50 text-red-600 border border-red-100",
		},
	};

	return map[status] || { label: status, color: "bg-gray-100 text-gray-700" };
};
