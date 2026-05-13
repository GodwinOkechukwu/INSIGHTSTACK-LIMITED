"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { FormatMoney, FormatMoney2 } from "../Reusables/FormatMoney";
import Link from "next/link";

const CheckoutSummarySection = () => {
	const { items } = useCart();
	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item.price * item.quantity,
			0,
		);
	};
	const router = useRouter();

	const handleCheckoutClick = () => {
		router.push("/checkout");
	};

	return (
		<section className='w-full flex flex-col px-2 sm:px-6 py-6 sm:py-12'>
			<h5 className='text-base sm:text-2xl font-semibold'>Summary</h5>
			<div className='flex justify-between items-center text-sm sm:text-base mt-6 pb-4 border border-secondary-100 border-t-0 border-r-0 border-l-0'>
				<h4 className='font-semibold'>Subtotal</h4>
				<h4>
					<FormatMoney2 value={calculateSubtotal()} />
				</h4>
			</div>

			<div className='flex justify-between items-center mt-6 pb-4'>
				<h4 className='text-sm sm:text-base font-bold text-primary-100'>
					Total
				</h4>
				<h4 className='text-sm sm:text-xl font-bold text-primary-100'>
					<FormatMoney2 value={calculateSubtotal()} />
				</h4>
			</div>
			<Link
				// onClick={handleCheckoutClick}
				href={calculateSubtotal() === 0 ? "/" : "/checkout"}
				className={`flex w-full justify-center items-center py-3 mt-4 rounded-md text-white ${
					calculateSubtotal() === 0
						? "bg-red-500/50"
						: "hover:bg-primary-100 bg-primary-100/70"
				} transition font-bold text-sm sm:text-base`}
			>
				{calculateSubtotal() === 0
					? "Please select a product"
					: "Proceed to Checkout"}
			</Link>
		</section>
	);
};

export default CheckoutSummarySection;
