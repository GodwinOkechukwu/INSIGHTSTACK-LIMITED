import React from "react";
import dayjs from "dayjs";
import { FormatMoney2 } from "./Reusables/FormatMoney";
import { statusStyles } from "@constants";

interface OrderHistoryProps {
	index: number;
	_id: number;
	pageCount: number;
	createdAt: string;
	paymentMethod: string;
	status: string;
	total: number;
	currency: string;
}

const OrderHistory = ({
	index,
	_id,
	pageCount,
	createdAt,
	paymentMethod,
	status,
	total,
	currency,
}: OrderHistoryProps) => {
	// console.log(_id)

	return (
		<>
			<td className='pl-6 py-3 leading-6 whitespace-nowrap'>
				<span className='uppercase text-sm text-gray-500'>{index}</span>
			</td>
			<td className='pl-6 py-3 leading-6 whitespace-nowrap'>
				<span className='uppercase text-sm'>{_id}</span>
			</td>
			<td className='pl-2 py-3 leading-6 text-center whitespace-nowrap'>
				<span className='text-sm'>
					{dayjs(createdAt).format("MMMM D, YYYY")}
				</span>
			</td>

			<td className='py-3 leading-6 text-center whitespace-nowrap '>
				<span className='text-sm'>{paymentMethod}</span>
			</td>

			<td className='py-3 leading-6 text-center capitalize whitespace-nowrap font-medium text-sm'>
				{status && <span className={`${statusStyles[status]}`}>{status}</span>}
			</td>

			<td className=' py-3 leading-6 text-center whitespace-nowrap text-sm'>
				<FormatMoney2 value={total} />
			</td>
		</>
	);
};

export default OrderHistory;
