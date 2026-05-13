"use client";
import {
	initializeOrderPaymentPayLoad,
	myPaylaterDataProps,
	requestOrder,
	requestResponse,
} from "@constants";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { togglePaylaterPlanModal } from "./config/features/paylaterPlanModal";
import dayjs from "dayjs";
import BuyNowPaylaterPlanModal from "./modal/BuyNowPaylaterPlanModal";
import { FormatMoney2 } from "./Reusables/FormatMoney";
import {
	useGetUserAccountQuery,
	useInitializeOrderPaymentMutation,
} from "./config/features/api";
import useToken from "./hooks/useToken";
import FormToast from "./Reusables/Toast/SigninToast";
import { ClipLoader } from "react-spinners";

interface PaylaterHistoryProps {
	itemData: requestResponse | undefined;
}

const PaylaterHistory = ({ itemData }: PaylaterHistoryProps) => {
	const dispatch = useDispatch();
	const { token } = useToken();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
	const storedOrderDataString =
		typeof localStorage !== "undefined" ? localStorage.getItem("order") : null;
	let retrievedOrderData: any = [];
	let currentPayment: any;
	let pendingPaymentIndex: any;
	let totalAmount: any;
	const [Item, setItem] = useState<requestOrder>();

	function checkPaymentStatus(item: requestOrder) {
		// Iterate through the item.payment array
		for (const payment of item?.payment) {
			// If any payment status includes "Pending", return "Pending"
			// console.log(item, "item?.payment");
			if (payment?.status.toLowerCase().includes("pending")) {
				return "Pending";
			}
		}
		// If no payment status includes "Pending", return "Paid"
		return "Paid";
	}

	// console.log(item, "item");
	// if (storedOrderDataString) {
	// 	const storedOrderData = JSON.parse(storedOrderDataString);
	// 	retrievedOrderData = storedOrderData;
	// }
	const [
		initializeOrderPayment,
		{ isLoading, isError, error, data: initializeOrderPaymentData },
	] = useInitializeOrderPaymentMutation();
	const { data: userAccount } = useGetUserAccountQuery({ token: token });
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsModalPaymentOpen(true);
		// router.push("/");
	};
	const handleClose2Modal = () => {
		setIsModalOpen(false);
		// router.push("/");
	};
	const handlePaymentClose2Modal = () => {
		setIsModalPaymentOpen(false);
		// router.push("/");
	};
	currentPayment = Item?.payment.find(
		(payment: any) => payment.status === "Pending",
	);
	let CurrentPayment = currentPayment?.amount;
	let AvailablePayment = currentPayment;

	let payableAmount: number;

	if (CurrentPayment) {
		payableAmount = Math.ceil(CurrentPayment);
	}
	// console.log(payableAmount, "payableAmount");
	let paylaterPaymentData: any;

	// Convert the orderData object to a JSON string
	let paylaterPaymentDataString: any;

	const handlePaymentCloseModal = () => {
		// setIsModalPaymentOpen(false);

		// const userDetails: UserInfo = {
		// 	name: savedFirstName + " " + savedLastName,
		// 	address: userDetailsData?.address,
		// 	city: userDetailsData?.city,
		// 	phone: userDetailsData?.phone,
		// 	contact: userDetailsData?.phone,
		// 	country: "Nigeria",
		// 	email: userDetailsData?.email,
		// };
		// const paylaterPaymentData = {
		// 	type: "pay-later",
		// 	cart: Item,
		// 	discount: 0,
		// 	token: token,
		// 	paymentMethod: "Paystack",
		// 	subTotal: payableAmount,
		// 	total: payableAmount,
		// 	user_info: userDetails,
		// };
		// setIsModalPaymentOpen(false);

		const payload: initializeOrderPaymentPayLoad = {
			amount: payableAmount,
			email: userAccount?.email,
			token: token,
		};

		localStorage.setItem("order", paylaterPaymentDataString);
		initializeOrderPayment(payload);
		// console.log(paylaterPaymentDataString, "paylaterPaymentDataString");
	};
	// console.log(status);

	const handleOpenModalClick = () => {
		// dispatch(togglePaylaterPlanModal());

		setIsModalOpen(true);
	};

	const handleinItializeOrderPaymentData = (data: any) => {
		// console.log(data);
		FormToast({
			message: "You will be redirected to make payment",
			success: true,
		});
		window.location.href = data.authorization_url;
	};

	useEffect(() => {
		if (initializeOrderPaymentData) {
			handleinItializeOrderPaymentData(initializeOrderPaymentData);
		}
	}, [initializeOrderPaymentData]);

	useEffect(() => {
		if (error) {
			if (error) {
				if ("data" in error) {
					const res: any = error.data;
					if ("message" in res) {
						const message = res.message;
						FormToast({
							message: message,
							success: false,
						});
					}
				}
			}
		}
	}, [isError, error]);

	const BuyNowPaylaterPlanModalContent = () => {
		// console.log(Item, "Item");
		return (
			<>
				<div className='flex justify-between mb-2'>
					<h4 className='text-sm font-[400] leading-[1.3] text-secondary-200'>
						Available Plan
					</h4>
					<h4 className='text-base font-[400] leading-[1.3] text-secondary-200'>
						{Item?.productId?.months} Months
					</h4>
				</div>
				<div>
					{Item?.payment?.map((paymentItem: any, index: any) => {
						const nextDate = dayjs(Item?.createdAt)
							.add(index, "month")
							.format("MMM D, YYYY");
						// console.log(paymentItem, "paymentItem");
						return (
							<div className='flex justify-between my-3' key={paymentItem?._id}>
								<div className='flex flex-col gap-4'>
									<h4 className='text-sm leading-[1.3] text-secondary-200'>
										{paymentItem?.name} - Month
									</h4>
									<h4 className='text-base font-[500] leading-[1.3] text-secondary-200'>
										{FormatMoney2(paymentItem?.amount)}
									</h4>
								</div>
								<div className='flex flex-col gap-3'>
									{paymentItem?.status === "Pending" && (
										<div className='bg-[#E010201F] text-xs font-[400] px-4 py-1 rounded-3xl flex items-center justify-center'>
											<span className='text-[#E01020]'>
												{paymentItem?.status}
											</span>
										</div>
									)}
									{paymentItem?.status === "Paid" && (
										<div className='bg-[#32A0711F] text-xs font-[400] px-4 py-1 rounded-3xl flex items-center justify-center'>
											<span className='text-[#32A071]'>
												{paymentItem?.status}
											</span>
										</div>
									)}
									<h4 className='text-xs font-[400] leading-[1.3] text-secondary-200 flex items-end'>
										{nextDate}
									</h4>
								</div>
							</div>
						);
					})}
				</div>

				<div className='flex gap-10 bg-[#D1FAE5] px-5 py-2 my-3'>
					<h4>Total</h4>
					<h4 className='text-base text-primary-300 font-bold'>
						{FormatMoney2(totalAmount)}
					</h4>
				</div>

				<span className='text-xs mt-1 mb-8'>
					You are required to make the first deposit of{" "}
					{Item && FormatMoney2(Item?.payment[0]?.amount)}
				</span>
				<button
					onClick={handleCloseModal}
					className='w-full font-semibold py-3 text-white mb-6 rounded-md cursor-pointer bg-primary hover:bg-primaryColor-100'
				>
					Pay Now
				</button>
			</>
		);
	};

	const PayementModalContent = () => {
		// console.log(AvailablePayment, AvailablePayment);
		// Find the first payment with "Pending" status
		if (AvailablePayment) {
			return (
				<div className='w-[22rem] shadow-xl mx-auto rounded-md p-4 mb-12'>
					<div className='flex justify-between my-3'>
						<div className='flex flex-col gap-2'>
							<h4 className='text-lg leading-[1.3] text-primary-100'>
								{AvailablePayment?.name} Payment
							</h4>
							<h4 className='text-base font-semibold leading-[1.3] text-secondary-200'>
								{FormatMoney2(Math.ceil(AvailablePayment?.amount))}
							</h4>
						</div>

						<div className='flex flex-col justify-end gap-3'>
							<h4 className='text-sm font-[400] leading-[1.3] text-secondary-200 flex items-end'>
								{dayjs().format("MMM D YYYY")}
							</h4>
						</div>
					</div>
					<div className='flex gap-6'>
						<img
							src={Item?.productId?.image[0]}
							alt='product-image'
							className='w-16 h-16 object-contain'
						/>
						<div className='flex flex-col gap-3 justify-center'>
							<h4
								title={Item?.productId?.title.en}
								className='text-sm leading-[1.3] text-secondary-200 truncate w-56'
							>
								{Item?.productId?.title.en}
							</h4>

							<div className='flex gap-4'>
								<h4 className='text-sm font-[400] leading-[1.3] text-secondary-200 flex items-end'>
									{Item?.productId?.months} Months
								</h4>
								<h4 className='text-sm font-[400] leading-[1.3] text-secondary-200 flex items-end'>
									{FormatMoney2(totalAmount)}
								</h4>
							</div>
						</div>
					</div>
					<div className='flex justify-between items-center py-2 my-3'>
						<h4 className='text-primary-100 text-sm'>Total</h4>
						<h4 className='text-lg text-primary font-bold'>
							{FormatMoney2(Math.ceil(AvailablePayment?.amount))}
						</h4>
					</div>
					<button
						onClick={handlePaymentCloseModal}
						className='w-full font-semibold py-3 text-white mb-6 rounded-md cursor-pointer bg-primary hover:bg-primaryColor-100'
					>
						{isLoading ? (
							<ClipLoader color='#d4d3d3' size={20} />
						) : (
							"Proceed to Payment"
						)}
					</button>
				</div>
			);
		} else {
			// Handle the case when there are no pending payments
			return (
				<>
					<div className='flex justify-between mb-2'>
						<h4 className='text-sm font-[400] leading-[1.3] text-secondary-200'>
							Available Plan
						</h4>
						<h4 className='text-base font-[400] leading-[1.3] text-secondary-200'>
							{Item?.productId?.months} Months
						</h4>
					</div>
					<div>
						{Item?.payment?.map((paymentItem: any, index: any) => {
							const nextDate = dayjs(Item?.createdAt)
								.add(index, "month")
								.format("MMM D, YYYY");

							return (
								<div
									className='flex justify-between my-3'
									key={paymentItem?._id}
								>
									<div className='flex flex-col gap-4'>
										<h4 className='text-sm leading-[1.3] text-secondary-200'>
											{paymentItem?.name} - Month
										</h4>
										<h4 className='text-base font-[500] leading-[1.3] text-secondary-200'>
											{FormatMoney2(paymentItem?.amount)}
										</h4>
									</div>
									<div className='flex flex-col gap-3'>
										{paymentItem?.status === "Pending" && (
											<div className='bg-[#E010201F] text-xs font-[400] px-4 py-1 rounded-3xl flex items-center justify-center'>
												<span className='text-[#E01020]'>
													{paymentItem?.status}
												</span>
											</div>
										)}
										{paymentItem?.status === "Paid" && (
											<div className='bg-[#32A0711F] text-xs font-[400] px-4 py-1 rounded-3xl flex items-center justify-center'>
												<span className='text-[#32A071]'>
													{paymentItem?.status}
												</span>
											</div>
										)}
										<h4 className='text-xs font-[400] leading-[1.3] text-secondary-200 flex items-end'>
											{nextDate}
										</h4>
									</div>
								</div>
							);
						})}
					</div>

					<div className='flex gap-10 bg-[#D1FAE5] px-5 py-2 mt-3 mb-10'>
						<h4>Total</h4>
						<h4 className='text-base text-primary-300 font-bold'>
							{FormatMoney2(totalAmount)}
						</h4>
					</div>

					<button
						onClick={handlePaymentClose2Modal}
						className='w-full font-semibold py-3 text-white mb-6 rounded-md cursor-pointer bg-primary hover:bg-primaryColor-100'
					>
						Payment Completed
					</button>
				</>
			);
		}
	};
	return (
		<>
			<table className='table-auto min-w-full'>
				<thead className='bg-gray-50'>
					<tr className='bg-gray-100'>
						<th
							scope='col'
							className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
						>
							PRODUCT
						</th>

						<th
							scope='col'
							className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
						>
							PRICE
						</th>
						<th
							scope='col'
							className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
						>
							months
						</th>
						<th
							scope='col'
							className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
						>
							Date
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
						></th>
					</tr>
				</thead>
				<tbody className='bg-white border-none'>
					{itemData &&
						itemData?.totalDoc > 0 &&
						itemData?.orders.map((item, i) => {
							currentPayment = item?.payment.find(
								(payment: any) => payment?.status === "Pending",
							);
							pendingPaymentIndex = item?.payment?.findIndex(
								(payment: any) => payment?.status === "Pending",
							);
							totalAmount = item?.payment.reduce(
								(total: any, paymentItem: any) => total + paymentItem?.amount,
								0,
							);
							if (pendingPaymentIndex !== -1) {
								let CurrentPaymentAmount;
								const currentPayment = item?.payment[pendingPaymentIndex];
								if (currentPayment) {
									CurrentPaymentAmount = currentPayment?.amount;
								}
								paylaterPaymentData = {
									type: "later",
									token: token,
									requestId: item?._id,
									amount: CurrentPaymentAmount,
									paymonth: pendingPaymentIndex,
								};
								paylaterPaymentDataString = JSON.stringify(paylaterPaymentData);
								// console.log(paylaterPaymentData, "pendingPaymentIndex");
							}
							return (
								<tr
									key={i}
									className={i % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"}
								>
									<td className='px-5 py-3 flex items-center gap-2 pl-2 justify-center leading-6 text-center whitespace-nowrap'>
										<img
											src={item?.productId?.image[0]}
											alt='product-image'
											className='w-12 h-12 object-contain'
										/>
										<span className='text-sm truncate w-64'>
											{item?.productId?.title.en}
										</span>
									</td>

									<td className='px-5 py-3 leading-6 text-center whitespace-nowrap'>
										<span className='text-sm'>
											{item?.productId?.prices?.originalPrice}
										</span>
									</td>
									<td className='px-5 py-3 leading-6 text-center whitespace-nowrap'>
										<span className='text-sm'>{item?.productId?.months}</span>
									</td>
									<td className='px-5 py-3 leading-6 text-center whitespace-nowrap'>
										<span className='text-sm'>
											{dayjs(item?.createdAt).format("MMMM D, YYYY")}
										</span>
									</td>

									<td className='px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm'>
										{item?.status === "Delivered" && (
											<span className='text-emerald-500'>{item?.status}</span>
										)}
										{item?.status === "Pending" && (
											<div className='bg-[#FFBD001F] px-4 py-1 rounded-3xl'>
												<span className='text-[#FFBD00]'>{item?.status}</span>
											</div>
										)}
										{item?.status === "Accept" && (
											<div className='bg-[#32A0711F] px-4 py-1 rounded-3xl'>
												<span className='text-[#32A071]'>{item?.status}</span>
											</div>
										)}
										{item?.status === "Rejected" && (
											<div className='bg-[#E010201F] px-4 py-1 rounded-3xl'>
												<span className='text-[#E01020]'>{item?.status}</span>
											</div>
										)}
									</td>

									{/* {item?.status === "Accept" && (
										<td className='px-5 py-3 leading-6 text-center whitespace-nowrap'>
											<span
												onClick={() => {
													handleOpenModalClick();
													setItem(item);
												}}
												className='text-[#CB287F] hover:underline cursor-pointer text-sm'
											>
												Pay Now
											</span>
										</td>
									)} */}
									{item?.status === "Accept" &&
										checkPaymentStatus(item) === "Pending" && (
											<td className='px-5 py-3 leading-6 text-center whitespace-nowrap'>
												<span
													onClick={() => {
														handleOpenModalClick();
														setItem(item);
													}}
													className='text-[#CB287F] hover:underline cursor-pointer text-sm'
												>
													Pay Now
												</span>
											</td>
										)}
									{item?.status === "Accept" &&
										checkPaymentStatus(item) === "Paid" && (
											<td className='px-5 py-3 leading-6 text-center whitespace-nowrap'>
												<span className='text-[#32A071] cursor-not-allowed text-sm'>
													Paid
												</span>
											</td>
										)}
								</tr>
							);
						})}
				</tbody>
			</table>
			<BuyNowPaylaterPlanModal
				isOpen={isModalOpen ? true : false}
				onClose={handleCloseModal}
				onClose2={handleClose2Modal}
				content={<BuyNowPaylaterPlanModalContent />}
				buttonText='Pay Now'
			/>
			<BuyNowPaylaterPlanModal
				isOpen={isModalPaymentOpen ? true : false}
				onClose={handlePaymentCloseModal}
				onClose2={handlePaymentClose2Modal}
				content={<PayementModalContent />}
				buttonText={
					isLoading ? (
						<ClipLoader color='#d4d3d3' size={20} />
					) : (
						"Proceed to Payment"
					)
				}
			/>
		</>
	);
};

export default PaylaterHistory;
