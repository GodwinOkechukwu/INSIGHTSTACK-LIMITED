"use client";
import { statusStyles } from "@constants";
import dayjs from "dayjs";
import { LogoImage } from "@utils/function";
import { FormatMoney2 } from "../Reusables/FormatMoney";

interface InvoiceProps {
	data: any; // OrderGetType
	printRef: any;
}

const Invoice = ({ data, printRef }: InvoiceProps) => {
	const status = data?.status;

	return (
		<div
			ref={printRef}
			className='bg-white p-2 sm:p-5 text-slate-800 mx-auto shadow-sm'
		>
			{/* 1. Header: Branding & Invoice Metadata */}
			<div className='flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-100 pb-10 mb-10'>
				<div className='space-y-4'>
					<LogoImage className='w-12 h-auto' />
					<div>
						<h1 className='text-4xl font-black tracking-tighter text-slate-900 uppercase'>
							Invoice
						</h1>
						<p className='text-sm font-medium text-slate-500'>
							#{data?.id || "N/A"}
						</p>
					</div>
				</div>

				<div className='mt-6 sm:mt-0 text-left sm:text-right space-y-2'>
					<div className='inline-block'>
						<span
							className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusStyles[status]}`}
						>
							{status}
						</span>
					</div>
					<div className='pt-4'>
						<p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
							Date Issued
						</p>
						<p className='text-sm font-bold'>
							{dayjs(data?.date_created).format("MMMM D, YYYY")}
						</p>
					</div>
				</div>
			</div>

			{/* 2. Addresses Section */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'>
				<div>
					<h6 className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4'>
						Billed To
					</h6>
					<div className='space-y-1'>
						<p className='text-base font-bold text-slate-900'>
							{data?.billing?.first_name} {data?.billing?.last_name}
						</p>
						<p className='text-sm text-slate-600 leading-relaxed max-w-[240px]'>
							{data?.billing?.address_1}
							<br />
							{data?.billing?.city}, {data?.billing?.country}
							<br />
							{data?.billing?.phone}
						</p>
						<p className='text-sm text-blue-600 font-medium'>
							{data?.billing?.email}
						</p>
					</div>
				</div>

				<div className='md:text-right'>
					<h6 className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4'>
						Payment Method
					</h6>
					<p className='text-sm font-bold text-slate-900 uppercase'>
						{data?.payment_method_title || data?.payment_method || "N/A"}
					</p>
					<div className='mt-6'>
						<h6 className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
							Customer ID
						</h6>
						<p className='text-sm font-bold'>
							CUST-{data?.customer_id || "000"}
						</p>
					</div>
				</div>
			</div>

			{/* 3. Itemized Table (The key to a professional look) */}
			<div className='mb-10'>
				<table className='w-full text-left'>
					<thead>
						<tr className='border-b border-slate-200'>
							<th className='py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest'>
								Description
							</th>
							<th className='py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center'>
								Qty
							</th>
							<th className='py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right'>
								Unit Price
							</th>
							<th className='py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right'>
								Total
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-slate-100'>
						{data?.line_items?.map((item: any, idx: number) => (
							<tr key={idx}>
								<td className='py-5'>
									<p className='text-sm font-bold text-slate-900'>
										{item.name}
									</p>
									<p className='text-xs text-slate-400 mt-0.5'>
										Product ID: {item.product_id}
									</p>
								</td>
								<td className='py-5 text-sm text-slate-600 text-center'>
									{item.quantity}
								</td>
								<td className='py-5 text-sm text-slate-600 text-right'>
									<FormatMoney2 value={Number(item.price)} />
								</td>
								<td className='py-5 text-sm font-bold text-slate-900 text-right'>
									<FormatMoney2 value={Number(item.total)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* 4. Totals Summary */}
			<div className='flex justify-end pt-6'>
				<div className='w-full sm:w-64 space-y-3'>
					<div className='flex justify-between text-sm'>
						<span className='text-slate-500 font-medium'>Subtotal</span>
						<span className='text-slate-900 font-bold'>
							<FormatMoney2 value={Number(data?.total)} />
						</span>
					</div>
					<div className='flex justify-between text-sm'>
						<span className='text-slate-500 font-medium'>Shipping</span>
						<span className='text-slate-400 italic'>Free</span>
					</div>
					<div className='pt-4 border-t-2 border-slate-900 flex justify-between items-end'>
						<span className='text-[10px] font-black text-slate-900 uppercase tracking-widest'>
							Total Amount
						</span>
						<span className='text-2xl font-black text-slate-900'>
							<FormatMoney2 value={Number(data?.total)} />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Invoice;
