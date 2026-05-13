"use client";
import React, { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { countries } from "countries-list";
import { Country, State, City, IState, ICity } from "country-state-city";
import PhoneNumField from "./PhoneNumField";
import {
	maestroImageNameImg1,
	mastercardImageNameImg1,
	visaImg1,
} from "@public/images";
import { useCart } from "react-use-cart";
import { FormatMoney, FormatMoney2 } from "../Reusables/FormatMoney";
import {
	useGetUserAccountQuery,
	useInitializeOrderPaymentMutation,
} from "../config/features/api";
import {
	UserInfo,
	initializeOrderPaymentPayLoad,
	initializeOrderPaymentResponse,
} from "@constants";
import useToken from "../hooks/useToken";
import FormToast from "../Reusables/Toast/SigninToast";
import { ClipLoader } from "react-spinners";
import SignupModal from "../modal/SignupModal";
import { useRouter } from "next/navigation";
import { checkoutFormModel } from "../config/models";

interface FormValues {
	firstName: string;
	lastName: string;
	state: string;
	city: string;
	email: string;
	houseAddress: string;
	phone: string;
	orderNotes: string;
	paymentOption: string;
	// document: any;
}

const BillInfoForm = () => {
	const { token } = useToken();
	const router = useRouter();
	const states = State.getStatesOfCountry("NG");
	const [selectedState, setSelectedState] = useState("");
	let storedDiscount: any;
	const [citiesForSelectedCountry, setCitiesForSelectedCountry] = useState<
		ICity[]
	>([]);
	if (typeof localStorage !== "undefined") {
		// localStorage is available
		storedDiscount = localStorage.getItem("discount");
		// Rest of your code here
	}
	const [selectedOption, setSelectedOption] = useState("Paystack");
	const [isModalOpen, setIsModalOpen] = useState(false);
	let discount = 0;

	// const [createOrder, { isLoading, isError, error, data: createOrderData }] =
	// 	useCreateOrderMutation();
	const [
		initializeOrderPayment,
		{ isLoading, isError, error, data: initializeOrderPaymentData },
	] = useInitializeOrderPaymentMutation();
	const { data: userAccount } = useGetUserAccountQuery({ token: token });
	if (storedDiscount) {
		const storedOrderData = JSON.parse(storedDiscount);
		discount = storedOrderData;
	}

	const fullName = userAccount?.name || ""; // Handle possible null value

	const [firstName, lastName] = fullName.split(" ");

	const handleCloseModal = () => {
		setIsModalOpen(false);
		router.push("/user/login");
	};
	const handleOptionChange = (e: any) => {
		setSelectedOption("Paystack");
	};
	const { items } = useCart();
	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item.price * item.quantity,
			0,
		);
	};
	// console.log(token);
	const calculateTotal = () => {
		if (discount) {
			return calculateSubtotal() - discount;
		}
		return calculateSubtotal();
		// You can add any additional charges or discounts here if needed.
	};

	const AuthModalContent = () => (
		<>
			<h3 className='text-sm sm:text-base md:text-2xl md:px-12 text-black text-center'>
				Sorry! You have to login to make a request.
			</h3>
		</>
	);

	const handleStateChange = (stateCode: string) => {
		setSelectedState("");
		const cities = City.getCitiesOfState("NG", stateCode);
		setCitiesForSelectedCountry(cities);
	};

	const initialValues: FormValues = {
		firstName: firstName,
		lastName: "",
		email: "",
		houseAddress: "",
		phone: "",
		orderNotes: "",
		state: "",
		city: "",
		paymentOption: "",
		// document: null,
	};

	const handleFormSubmit = async (values: FormValues) => {
		// console.log(values);

		const userDetails: UserInfo = {
			name: values.firstName + " " + values.lastName,
			address: values.houseAddress,
			city: values.city,
			phone: values.phone,
			contact: values.phone,
			country: "Nigeria",
			email: values.email,
		};
		const payload: initializeOrderPaymentPayLoad = {
			amount: calculateTotal(),
			email: values.email,
			token: token,
		};

		const orderData = {
			type: "direct",
			cart: items,
			discount: storedDiscount,
			token: token,
			paymentMethod: values.paymentOption,
			subTotal: calculateSubtotal().toString(),
			total: calculateTotal().toString(),
			user_info: userDetails,
		};
		// Convert the orderData object to a JSON string
		const orderDataString = JSON.stringify(orderData);

		// Store the JSON string in local storage under a key, e.g., "order"
		if (token) {
			localStorage.setItem("order", orderDataString);
			initializeOrderPayment(payload);
		} else {
			setIsModalOpen(true);
		}
	};

	const countryNames = Country.getAllCountries();
	// console.log(countryNames)

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: checkoutFormModel,
		onSubmit: (values) => {
			values.paymentOption = selectedOption;
			handleFormSubmit(values);
		},
	});

	const handleinItializeOrderPaymentData = (
		data: initializeOrderPaymentResponse,
	) => {
		formik.resetForm();
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

	return (
		<>
			<FormikProvider value={formik}>
				<Form className='flex flex-col xl:flex-row w-full gap-4 mt-3 max-w-[1440px] mx-auto mb-16 slg:mb-64'>
					<div className='flex-1 flex flex-col gap-4'>
						<div className='mt-2 bg-white px-2 py-4 slg:p-8 rounded-xl'>
							<h3 className='text-base sm:text-2xl font-[500] text-primary-300 mb-5'>
								Delivery Information
							</h3>
							<div className='grid md:grid-cols-2 gap-3 sm:gap-8'>
								<div>
									<label
										htmlFor='firstName'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										First Name <span className='text-red-500'>*</span>
									</label>

									<Field
										type='text'
										id='firstName'
										name='firstName'
										placeholder='Enter first name'
										className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
											formik.touched.firstName && formik.errors.firstName
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{formik.touched.firstName && formik.errors.firstName && (
										<div className='text-red-500 mt-1'>
											{formik.errors.firstName}
										</div>
									)}
								</div>
								<div>
									<label
										htmlFor='lastName'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										Last Name <span className='text-red-500'>*</span>
									</label>

									<Field
										type='text'
										id='lastName'
										placeholder='Enter last name'
										name='lastName'
										className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
											formik.touched.lastName && formik.errors.lastName
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{formik.touched.lastName && formik.errors.lastName && (
										<div className='text-red-500 mt-1'>
											{formik.errors.lastName}
										</div>
									)}
								</div>
							</div>

							<div className='grid mt-4 gap-4'>
								<div>
									<label
										htmlFor='state'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										State
									</label>
									<div className='relative'>
										<Field
											as='select'
											name='state'
											className='w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
											onChange={(event: any) => {
												handleStateChange(
													event.target.selectedOptions[0].dataset.isocode,
												);
												const selectedValue = event.target.value;
												formik.values.state = selectedValue;
											}}
										>
											<option value='' data-isocode=''>
												Select State
											</option>
											{states.map((stateName, index) => (
												<option
													key={index}
													value={stateName.name}
													data-isocode={stateName.isoCode}
												>
													{stateName.name}
												</option>
											))}
										</Field>
										<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
											<SlArrowDown className='cursor-pointer z-4' />
										</span>
									</div>
								</div>
								<div>
									<label
										htmlFor='city'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										Select City
									</label>
									<div className='relative'>
										<Field
											as='select'
											name='city'
											className='w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
										>
											<option value=''>Select your city</option>
											{citiesForSelectedCountry.map((cityName, index) => (
												<option key={index} value={cityName.name}>
													{cityName.name}
												</option>
											))}
										</Field>
										<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
											<SlArrowDown className='cursor-pointer z-4' />
										</span>
									</div>
								</div>
								<div>
									<label
										htmlFor='email'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										Email Address <span className='text-red-500'>*</span>
									</label>

									<Field
										type='text'
										id='email'
										name='email'
										placeholder='Enter email address'
										className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
											formik.touched.email && formik.errors.email
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{formik.touched.email && formik.errors.email && (
										<div className='text-red-500 mt-1'>
											{formik.errors.email}
										</div>
									)}
								</div>
								<div>
									<label
										htmlFor='houseAddress'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										House Address <span className='text-red-500'>*</span>
									</label>

									<Field
										type='text'
										id='houseAddress'
										name='houseAddress'
										placeholder='Enter street address'
										className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
											formik.touched.houseAddress && formik.errors.houseAddress
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{formik.touched.houseAddress &&
										formik.errors.houseAddress && (
											<div className='text-red-500 mt-1'>
												{formik.errors.houseAddress}
											</div>
										)}
								</div>
								<div>
									<label
										htmlFor='phone'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										Phone
									</label>

									<PhoneNumField
										value={formik.values.phone}
										onChange={(phone) => formik.setFieldValue("phone", phone)}
									/>
									{formik.touched.phone && formik.errors.phone && (
										<div className='text-red-500 mt-1'>
											{formik.errors.phone}
										</div>
									)}
								</div>

								<div>
									<label
										htmlFor='orderNotes'
										className='block font-[500] text-xs sm:text-base text-primary-300 mb-2'
									>
										Order notes (optional)
									</label>
									<textarea
										id='orderNotes'
										name='orderNotes'
										placeholder='Notes about your order, e.g. special notes for delivery.'
										value={formik.values.orderNotes}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border ${
											formik.touched.orderNotes && formik.errors.orderNotes
												? "border-red-500"
												: "border-gray-300"
										} focus:border-secondary-800 outline-none transition-[.5] ease-in`}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='flex-[.4] flex flex-col'>
						{/* <div className='slg:mt-2 bg-white px-3 sm:px-8 slg:py-10 rounded-xl'>
						<div>
							<label
								htmlFor='discountCode'
								className='block font-semibold text-base sm:text-xl text-primary-300 mb-2 sm:mb-5 mt-5 sm:mt-12'
							>
								Discount Code
							</label>

							<Field
								type='text'
								id='discountCode'
								name='discountCode'
								className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
							/>

							<button className='flex w-full justify-center mt-3 sm:mt-6 text-sm sm:text-base font-[500] items-center py-2 sm:py-3 px-14 border border-primary text-primary rounded-md hover:text-white hover:bg-primary transition hover:border-transparent'>
								Apply Coupon
							</button>
						</div>
					</div> */}
						<div className='mt-2 bg-white px-3 sm:px-8 py-5 rounded-xl'>
							<h4 className='font-semibold text-base sm:text-xl text-primary-300'>
								Payment Method
							</h4>
							<div className='mt-3 sm:mt-5 flex gap-5 sm:gap-8'>
								<label className='flex items-center text-xs sm:text-sm font-semibold gap-3 cursor-pointer'>
									<Field
										id='paymentOption'
										type='radio'
										name='paymentOption'
										value='Paystack'
										checked={selectedOption === "Paystack"}
										onChange={handleOptionChange}
									/>
									Paystack
								</label>
								<div className='flex gap-4'>
									<img src={visaImg1.src} alt='visa-img' />
									<img src={mastercardImageNameImg1.src} alt='visa-img' />
									<img src={maestroImageNameImg1.src} alt='visa-img' />
								</div>
							</div>
							{/* <label className='flex items-center text-xs sm:text-sm font-semibold gap-3'>
								<Field
									id='paymentOption'
									type='radio'
									name='paymentOption'
									value='Pay on Delivery'
									checked={selectedOption === "Pay on Delivery"}
									onChange={handleOptionChange}
								/>
								Pay on Delivery
							</label> */}
						</div>
						<div className='mt-2 bg-white px-4 py-6 sm:py-12 rounded-xl'>
							<h5 className='text-base sm:text-2xl font-semibold mb-3 sm:mb-6'>
								Your Order
							</h5>
							<div className='flex justify-between items-center text-sm sm:text-base font-[400] pb-4'>
								<h4>Subtotal</h4>
								<h4>
									<FormatMoney2 value={calculateSubtotal()} />
								</h4>
							</div>
							<div className='flex justify-between items-center text-sm sm:text-base font-[400] mt-3 pb-4 border border-secondary-700 border-t-0 border-r-0 border-l-0'>
								<h4>Discounted Amount</h4>
								<h4>{discount ? <FormatMoney2 value={discount} /> : 0}</h4>
							</div>
							<div className='flex justify-between items-center mt-3 pb-4'>
								<h4 className='text-sm sm:text-base font-bold text-primary-300'>
									Total
								</h4>
								<h4 className='text-base sm:text-xl font-bold text-primary-300'>
									{FormatMoney(calculateTotal())}
								</h4>
							</div>
							<button
								type='submit'
								className={`flex w-full justify-center items-center py-2 sm:py-3 px-14 mt-2 sm:mt-4 rounded-md text-white transition font-bold text-base hover:bg-primaryColor-100 ${
									formik.isValid
										? "bg-primary cursor-pointer"
										: "bg-primary/60 cursor-not-allowed"
								}`}
								disabled={!formik.isValid || isLoading}
							>
								{isLoading ? (
									<ClipLoader color='#d4d3d3' size={20} />
								) : (
									"Place Order"
								)}
							</button>
						</div>
					</div>
				</Form>
			</FormikProvider>
			<SignupModal
				isOpen={isModalOpen ? true : false}
				onClose={handleCloseModal}
				setIsOpen={setIsModalOpen}
				content={<AuthModalContent />}
				buttonText='Login'
			/>
		</>
	);
};

export default BillInfoForm;
