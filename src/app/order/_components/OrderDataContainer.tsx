"use client";
import React, { useRef } from "react";
import Invoice from "@src/components/invoice/Invoice";
import { useOrders } from "@src/components/lib/woocommerce";
import { useParams, useRouter } from "next/navigation";
import {
	FiCheckCircle,
	FiPrinter,
	FiArrowLeft,
	FiPackage,
	FiHelpCircle,
} from "react-icons/fi";

const OrderDataContainer = () => {
	const param = useParams();
	const router = useRouter();
	const printRef = useRef<HTMLDivElement>(null);

	const {
		data: orderData,
		isLoading: isLoadingOrder,
		isError: isErrorOrder,
	} = useOrders(`${param.id}`);

	const OrderData = orderData?.data;

	// Helper to handle printing only the invoice section if needed
	const handlePrint = () => {
		window.print();
	};

	// --- SKELETON LOADING VIEW ---
	if (isLoadingOrder) {
		return (
			<div className='w-full mx-auto pt-2 lg:pt-14 lg:w-[80%] px-4 space-y-6 animate-pulse'>
				<div className='h-12 w-40 bg-gray-200 rounded-lg' />
				<div className='h-24 w-full bg-gray-100 rounded-2xl' />
				<div className='bg-white h-[500px] rounded-2xl border border-gray-100 shadow-sm' />
			</div>
		);
	}

	// --- ERROR / NOT FOUND VIEW ---
	if (isErrorOrder || (!isLoadingOrder && !OrderData)) {
		return (
			<div className='max-w-xl mx-auto mt-20 text-center px-6 py-12 bg-white rounded-3xl shadow-sm border'>
				<div className='bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
					<FiPackage className='text-4xl text-red-500' />
				</div>
				<h3 className='text-2xl font-bold text-gray-900 mb-2'>
					Order details not found
				</h3>
				<p className='text-gray-500 mb-8'>
					We couldn't retrieve the information for order{" "}
					<span className='font-mono'>#{param.id}</span>. It might be processing
					or the link has expired.
				</p>
				<button
					onClick={() => router.push("/shop")}
					className='bg-primary-100 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-primary-100/20'
				>
					Return to Shop
				</button>
			</div>
		);
	}

	return (
		<div className='max-w-5xl mx-auto px-4 lg:px-0 pt-6 lg:pt-10 pb-20'>
			{/* Top Navigation & Actions */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 print:hidden'>
				<button
					onClick={() => router.push("/user/dashboard")}
					className='flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition'
				>
					<FiArrowLeft /> Dashboard
				</button>

				<div className='flex items-center gap-3 w-full sm:w-auto'>
					<button
						onClick={handlePrint}
						className='flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition'
					>
						<FiPrinter /> Print Invoice
					</button>
				</div>
			</div>

			{/* Success / Status Notification */}
			<div className='flex items-start gap-4 w-full bg-green-50 border border-green-100 rounded-2xl mb-8 px-2 py-5 shadow-sm'>
				<div className='bg-green-500 p-2.5 rounded-full text-white shadow-sm'>
					<FiCheckCircle size={22} />
				</div>
				<div>
					<h2 className='text-gray-900 text-lg font-bold'>
						Order Successfully Placed!
					</h2>
					<p className='text-sm text-green-800/70'>
						Thank you for your purchase,{" "}
						<span className='font-bold text-green-900'>
							{OrderData?.billing?.first_name}
						</span>
						. Your order{" "}
						<span className='font-bold text-gray-900'>#{OrderData?.id}</span> is
						currently <span className='lowercase'>{OrderData?.status}</span>.
					</p>
				</div>
			</div>

			{/* Main Invoice Component */}
			<div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
				<Invoice data={OrderData} printRef={printRef} />
			</div>
		</div>
	);
};

export default OrderDataContainer;
