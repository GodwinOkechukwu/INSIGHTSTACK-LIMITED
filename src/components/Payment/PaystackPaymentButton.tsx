"use client";

import FormToast from "../Reusables/Toast/SigninToast";
import { PAYSTACK_PUBLIC_KEY } from "@utils/lib/data";
import { useCart } from "react-use-cart";
import { useCreateOrder, useCustomer } from "../lib/woocommerce";
import { useRouter } from "next/navigation";
import { filterCustomersByEmail } from "@constants";
import useToken from "../hooks/useToken";
import { useAppSelector } from "../hooks";
import { FormikProps } from "formik";
import { SITE_NAME } from "../../../constants/seoContants";

interface PaystackPaymentButtonProps {
	formik: FormikProps<any>;
}

const PaystackPaymentButton = ({ formik }: PaystackPaymentButtonProps) => {
	const { items, emptyCart } = useCart();
	const { email } = useToken();
	const router = useRouter();

	const { baseCurrency, exchangeRate } = useAppSelector(
		(state) => state.currency,
	);

	const { data: customer } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;

	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);

	const { mutate: createOrder } = useCreateOrder();

	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item.price * item.quantity,
			0,
		);
	};

	const convertedValue = calculateSubtotal() * exchangeRate;

	const handlePayment = () => {
		if (!(window as any).PaystackPop) {
			alert("Payment service not available");
			return;
		}

		const handler = (window as any).PaystackPop.setup({
			key: PAYSTACK_PUBLIC_KEY,
			email: formik.values?.email ?? "",
			amount: Math.round(convertedValue * 100),
			currency: baseCurrency.code,
			reference: `txn-${Date.now()}`,

			callback: function (response: any) {
				if (response.status === "success") {
					const orderData = {
						customer_id: wc_customer_info?.id,
						payment_method: "paystack-method",
						payment_method_title: "paystack",
						set_paid: true,
						billing: {
							first_name: wc_customer_info?.first_name,
							last_name: wc_customer_info?.last_name,
							address_1: wc_customer_info?.billing?.address_1,
							city: wc_customer_info?.billing?.city,
							state: wc_customer_info?.billing?.state,
							postcode: wc_customer_info?.billing?.postcode,
							country: wc_customer_info?.billing?.country,
							email: wc_customer_info?.email,
							phone: wc_customer_info?.billing?.phone,
						},
						line_items: items.map((item) => ({
							product_id: item.id,
							quantity: item.quantity,
							price: item.price,
						})),
					};

					createOrder(orderData);

					FormToast({
						message: "Payment successful!",
						success: true,
					});

					emptyCart();
					router.push("/");
				}
			},

			onClose: function () {
				FormToast({
					message: "Payment was canceled",
					success: false,
				});
			},
		});

		handler.openIframe();
	};

	return (
		<button
			onClick={handlePayment}
			disabled={!formik.isValid}
			className={`flex w-full justify-center items-center py-2 sm:py-3 px-14 mt-2 sm:mt-4 rounded-md text-white transition font-bold text-base ${
				formik.isValid
					? "bg-primary-100 cursor-pointer"
					: "cursor-not-allowed bg-red-500/60"
			}`}
		>
			Pay Now
		</button>
	);
};

export default PaystackPaymentButton;
