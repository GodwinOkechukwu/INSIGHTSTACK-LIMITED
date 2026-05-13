"use client";
import React, { useEffect, useState } from "react";
import AppLayout from "@src/components/AppLayout";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useToken from "@src/components/hooks/useToken";
import { useVerifyPaymentMutation } from "@src/components/config/features/api";
import {
	UserInfo,
	verifyPaymentPayLoad,
	verifyPaymentResponse,
} from "@constants";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import { ClipLoader } from "react-spinners";
import { useCart } from "react-use-cart";
import AuthModal from "@src/components/modal/AuthModal";
import Picture from "@src/components/picture/Picture";
import { confetti } from "@public/images";

const Page = () => {
	const { token } = useToken();
	const { emptyCart } = useCart();
	const router = useRouter();
	const searchParams = useSearchParams().toString();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const referenceMatch = searchParams.match(/reference=(.*?)(?:&|$)/);
	const storedOrderDataString =
		typeof localStorage !== "undefined" ? localStorage.getItem("order") : null;
	const [
		verifyPayment,
		{ isLoading, isError, error, data: verifyPaymentData },
	] = useVerifyPaymentMutation();
	let referenceValue = "";
	let retrievedOrderData: any = [];
	if (referenceMatch) {
		referenceValue = referenceMatch[1];
	}

	if (storedOrderDataString) {
		const storedOrderData = JSON.parse(storedOrderDataString);
		retrievedOrderData = storedOrderData;
	}
	// console.log(retrievedOrderData);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
		router.push("/user/my-orders");
	};

	const handleSubmit = async () => {
		const userDetails: UserInfo = {
			name: retrievedOrderData?.user_info?.name,
			address: retrievedOrderData?.user_info?.address,
			city: retrievedOrderData?.user_info?.city,
			contact: retrievedOrderData?.user_info?.phone,
			phone: retrievedOrderData?.user_info?.phone,
			country: retrievedOrderData?.user_info?.country,
			email: retrievedOrderData?.user_info?.email,
		};
		// console.log(retrievedOrderData?.type);
		const payload: verifyPaymentPayLoad = {
			type: retrievedOrderData?.type,
			cart: retrievedOrderData?.cart,
			discount: retrievedOrderData?.discount,
			paymentMethod: retrievedOrderData?.paymentMethod,
			ref: referenceValue,
			subTotal: retrievedOrderData?.subTotal,
			token: retrievedOrderData?.token,
			total: retrievedOrderData?.total,
			user_info: userDetails,
			requestId: retrievedOrderData?.requestId,
			paymonth: retrievedOrderData?.paymonth,
			amount: retrievedOrderData?.amount,
		};
		verifyPayment(payload);
	};

	const handleVerifyPaymentData = async (data: verifyPaymentResponse) => {
		// console.log(data);
		if (data.status === true) {
			emptyCart();
			FormToast({
				message: data.message,
				success: true,
			});
			handleOpenModal();
		} else {
			FormToast({
				message: data.message,
				success: false,
			});
		}
	};

	useEffect(() => {
		if (verifyPaymentData) {
			handleVerifyPaymentData(verifyPaymentData);
		}
	}, [verifyPaymentData]);

	useEffect(() => {
		if (error) {
			if (error) {
				// console.log(error)
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

	const AuthModalContent = () => (
		<>
			<h3 className='text-sm sm:text-base md:text-2xl text-black text-center'>
				Your order has been placed successfully
			</h3>
			<h3 className='hover:underline text-xs sm:text-sm md:text-base cursor-pointer hover:text-primary slg:px-6'>
				Thanks for patronizing us
			</h3>
		</>
	);

	return (
		<AppLayout className='px-16 sm:px-8'>
			<main className='bg-white flex flex-col items-center relative justify-center w-full sm:py-10 mt-44 sm:mt-40 xl:mt-44 xl:py-5 mx-auto max-w-[1156px] min-h-[50vh] mb-20 px-8 lg:px-2'>
				<div className='w-full sm:w-[24rem] flex flex-col gap-3 items-center'>
					<Picture src={confetti} alt='confetti' className='w-16 sm:w-24' />
					<div className='px-2 flex items-center gap-2 sm:gap-3 flex-col'>
						<h4 className='font-bold text-lg sm:text-xl text-center lg:text-2xl leading-[1.4]'>
							Order placed successfully
						</h4>
						<p className='text-center text-xs sm:text-sm leading-[1.4]'>
							Your Order #{referenceValue} was placed successfully. Please
							verify your payment
						</p>
					</div>
					<button
						onClick={handleSubmit}
						className={`bg-primary text-white text-sm sm:text-base w-full ${
							isLoading ? "px-20" : "px-3 sm:px-6"
						} py-2 sm:py-3 rounded-md hover:bg-primaryColor-100`}
					>
						{isLoading ? (
							<ClipLoader color='#d4d3d3' size={20} />
						) : (
							"Verify Payment"
						)}
					</button>
				</div>
			</main>
			<AuthModal
				isOpen={isModalOpen ? true : false}
				onClose={handleCloseModal}
				content={<AuthModalContent />}
				buttonText='Ok'
			/>
		</AppLayout>
	);
};

export default Page;
