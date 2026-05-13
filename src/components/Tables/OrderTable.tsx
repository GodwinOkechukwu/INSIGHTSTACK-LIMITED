import { Order, formatAmountToCurrency } from "@constants";
import React from "react";

interface OrderTableProps {
	data: Order;
	currency: string;
}

const OrderTable = ({ data, currency }: OrderTableProps) => {
	return (
		<tbody className='bg-white divide-y divide-gray-100/10 text-serif text-sm'>
			{data.cart.map((item, i) => (
				<tr key={i}>
					<th className='px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left'>
						{i + 1}
					</th>
					<td className='px-6 py-1 whitespace-nowrap font-normal text-gray-500'>
						{item.name}
					</td>
					<td className='px-6 py-1 whitespace-nowrap font-bold text-center'>
						{item.quantity}{" "}
					</td>
					<td className='px-6 py-1 whitespace-nowrap font-bold text-center font-DejaVu'>
						{/* {parseFloat(item.price).toFixed(2)} */}
						{formatAmountToCurrency(item?.price)}
					</td>

					<td className='px-6 py-1 whitespace-nowrap text-right font-bold font-DejaVu k-grid text-red-500'>
						{formatAmountToCurrency(item?.itemTotal)}
						{/* {parseFloat(item.itemTotal).toFixed(2)} */}
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default OrderTable;
