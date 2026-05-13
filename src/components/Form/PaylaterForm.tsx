"use client";
import React, { useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { PayLaterFormModel } from "../config/models";
import PaylaterDiscountRange from "../PaylaterDiscountRange";

interface FormValues {
	paymentRange: string;
	plan: string;
	selectDuration: string;
}

const planOptions = [
	{ value: "payIn2", label: "Pay in 2" },
	{ value: "payIn3", label: "Pay in 3" },
	{ value: "flexiblePayment", label: "Flexible payment" },
];
const durationOptions = [
	{ value: "oneMonth", label: "1 month ( 4.2% fee )" },
	{ value: "twoMonth", label: "2 months 6.4% fee )" },
	{ value: "threeMonth", label: "3 months (8.6% fee )" },
];
const PaylaterForm = () => {
	const initialValues: FormValues = {
		paymentRange: "₦6,000",
		plan: "",
		selectDuration: "",
	};

	const handleFormSubmit = async (values: FormValues) => {
		console.log(values);
	};

	const [currentPrice, setCurrentPrice] = useState(25); // Set the initial current price

	const handlePriceChange = (newPrice: number) => {
		setCurrentPrice(newPrice);
		// Add any additional logic you want to perform when the price changes
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: PayLaterFormModel,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	return (
		<div className='flex flex-col bg-white mt-2 pb-24'>
			<FormikProvider value={formik}>
				<Form className='flex flex-col gap-4 px-4'>
					<div>
						<label
							htmlFor='paymentRange'
							className='block font-[400] text-base text-primary-300 mt-4 mb-2'
						>
							How much is the product?
						</label>

						<Field
							type='text'
							id='paymentRange'
							name='paymentRange'
							readOnly
							className='w-full px-2 py-3 font-[400] text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
						<label className='block font-[400] text-[10px] text-primary-300 mt-4 mb-2'>
							It should be between ₦5,000 and ₦2,000,000
						</label>
					</div>
					<div>
						<label
							htmlFor='plan'
							className='block font-[400] text-base text-primary-300 mb-2'
						>
							What plan would you like to use?
						</label>
						<div className='relative'>
							<Field
								as='select'
								id='plan'
								name='plan'
								className='w-full px-2 py-3 font-[400] text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
							>
								<option value=''>Select Plan</option>
								{planOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Field>
							<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
								<SlArrowDown />
							</span>
						</div>
					</div>
					<div className='mt-2'>
						<label
							htmlFor='plan'
							className='block font-[400] text-base text-primary-300 mb-2'
						>
							How much do you want to pay?
						</label>
						<PaylaterDiscountRange
							minPrice={25}
							maxPrice={100}
							currentPrice={currentPrice}
							onPriceChange={handlePriceChange}
						/>
					</div>
					<div>
						<label
							htmlFor='plan'
							className='block font-[400] text-base text-primary-300 mb-2'
						>
							Select duration
						</label>
						<div className='relative'>
							<Field
								as='select'
								id='duration'
								name='duration'
								className='w-full px-2 py-3 font-[400] text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
							>
								<option value=''>Select Duration</option>
								{durationOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Field>
							<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
								<SlArrowDown />
							</span>
						</div>
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default PaylaterForm;
