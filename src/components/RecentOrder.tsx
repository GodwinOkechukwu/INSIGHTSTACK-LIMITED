import React from "react";
import ReactPaginate from "react-paginate";
import OrderHistory from "./OrderHistory";
import { recentOrderData, userOrderResponse } from "@constants";
import { ScaleLoader } from "react-spinners";
import PaginationComponent from "./Reusables/PaginationComponent";
import { Skeleton } from "@heroui/react";

interface RecentOrderProps {
	data?: OrderGetType[];
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	isLoading: boolean;
	pageCount: number;
	ItemsPerPage: number;
	CurrentPage: number;
}

const RecentOrder = ({
	data,
	isLoading,
	pageCount,
	CurrentPage,
	ItemsPerPage,
	setCurrentPage,
}: RecentOrderProps) => {
	// console.log(data, "dataDashbord");

	const handlePageChange = (selected: number) => {
		setCurrentPage(selected);
	};
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='align-middle inline-block rounded-md min-w-full pb-2 sm:px-6 lg:px-8'>
					<div className='overflow-hidden rounded-md'>
						<table className='table-auto min-w-full'>
							<thead className='bg-gray-50'>
								<tr className='bg-gray-100'>
									<th
										scope='col'
										className='text-left text-xs font-semibold px-3 py-2 text-gray-700 uppercase tracking-wider'
									>
										NO
									</th>
									<th
										scope='col'
										className='text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
									>
										ID
									</th>
									<th
										scope='col'
										className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
									>
										Order Time
									</th>

									<th
										scope='col'
										className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
									>
										Method
									</th>
									<th
										scope='col'
										className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
									>
										Status
									</th>
									<th
										scope='col'
										className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody className='bg-white border-none overflow-y-auto'>
								{data &&
									data?.length > 0 &&
									data?.map((order, i) => (
										<tr
											key={order.id}
											className={i % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"}
										>
											<OrderHistory
												index={(CurrentPage - 1) * ItemsPerPage + i + 1}
												_id={order?.id}
												pageCount={pageCount}
												createdAt={order?.date_created}
												paymentMethod={order?.payment_method}
												status={order?.status}
												total={parseInt(order?.total)}
												currency={"₦"}
											/>
										</tr>
									))}
							</tbody>
						</table>

						{data && data?.length === 0 && (
							<div className='flex w-full justify-center mt-6'>
								<h4 className='text-base slg:text-2xl text-black'>
									No order has been made yet
								</h4>
							</div>
						)}

						{isLoading && (
							<div className='grid w-full place-items-center gap-2 mt-2'>
								<Skeleton className='h-9 w-full rounded-full bg-gray-200 animate-pulse' />
								<Skeleton className='h-9 my-5 w-full rounded-full bg-gray-200 animate-pulse' />
								<Skeleton className='h-9 w-full rounded-full bg-gray-200 animate-pulse' />
								<Skeleton className='h-9 my-5 w-full rounded-xl bg-gray-200 animate-pulse' />
								<Skeleton className='h-9 w-full rounded-full bg-gray-200 animate-pulse' />
								<Skeleton className='h-9 my-5 w-full rounded-full bg-gray-200 animate-pulse' />
							</div>
						)}
						{pageCount > 1 && (
							<PaginationComponent
								pageCount={pageCount}
								onPageChange={handlePageChange}
								forcePage={0}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentOrder;
