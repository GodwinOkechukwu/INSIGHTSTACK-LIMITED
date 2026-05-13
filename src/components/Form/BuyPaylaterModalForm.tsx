"use client";
import React, { useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { BuyPayLaterModalFormModel } from "../config/models";
import { FaCheck } from "react-icons/fa";
import PhoneNumField from "./PhoneNumField";
import { City, ICity, State } from "country-state-city";

interface FormValues {
	fullName: string;
	email: string;
	bvnPhone: string | null;
	homeAddress: string;
	state: string;
	city: string;
}

interface BuyPaylaterModalFormProps {
	handleClick: () => void;
}

const BuyPaylaterModalForm = ({ handleClick }: BuyPaylaterModalFormProps) => {
	const states = State.getStatesOfCountry("NG");

	const [selectedState, setSelectedState] = useState("");
	const [citiesForSelectedCountry, setCitiesForSelectedCountry] = useState<
		ICity[]
	>([]);

	const handleStateChange = (stateCode: string) => {
		setSelectedState("");
		const cities = City.getCitiesOfState("NG", stateCode);
		setCitiesForSelectedCountry(cities);
	};
	// console.log(citiesForSelectedCountry)
	const initialValues: FormValues = {
		fullName: "Allen Francis",
		email: "",
		bvnPhone: "",
		homeAddress: "",
		state: "",
		city: "",
	};

	const handleFormSubmit = async (values: FormValues) => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: BuyPayLaterModalFormModel,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	return (
		<div className='flex flex-col bg-white'>
			<FormikProvider value={formik}>
				<Form className='flex flex-col gap-2 sm:gap-3'>
					<div>
						<Field
							type='text'
							id='fullName'
							name='fullName'
							className='w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-[#4D4D4D]outline-none focus:border-secondary-800 transition-[.5] ease-in bg-gray'
						/>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
						>
							Email Address
						</label>

						<Field
							type='text'
							id='email'
							name='email'
							placeholder='Email Address'
							className='w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>

					<div className=''>
						<label
							htmlFor='phone'
							className='block text-xs md:text-base text-primary-300 mb-2'
						>
							Bvn Phone Number
						</label>

						<PhoneNumField
							value={formik.values.bvnPhone}
							onChange={(bvnPhone) =>
								formik.setFieldValue("bvnPhone", bvnPhone)
							}
						/>
					</div>

					<div>
						<label
							htmlFor='state'
							className='block font-[500] text-xs md:text-base text-primary-300 mb-2'
						>
							State
						</label>
						<div className='relative'>
							<Field
								as='select'
								name='state'
								className='w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
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
								<SlArrowDown className='cursor-pointer z-4 text-xs md:text-base' />
							</span>
						</div>
					</div>

					<div>
						<label
							htmlFor='city'
							className='block font-[500] text-xs md:text-base text-primary-300 mb-2'
						>
							Select City
						</label>
						<div className='relative'>
							<Field
								as='select'
								name='city'
								className='w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
							>
								<option value=''>Select your city</option>
								{citiesForSelectedCountry.map((cityName, index) => (
									<option key={index} value={cityName.name}>
										{cityName.name}
									</option>
								))}
							</Field>
							<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
								<SlArrowDown className='cursor-pointer z-4 text-xs md:text-base' />
							</span>
						</div>
					</div>

					<div>
						<label
							htmlFor='email'
							className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
						>
							House Address
						</label>

						<Field
							type='text'
							id='homeAddress'
							name='homeAddress'
							placeholder='Enter your house address'
							className='w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div className='flex items-center mt-5 justify-end'>
						<button
							type='button'
							onClick={handleClick}
							// disabled
							className='flex flex-[.3] w-full justify-center items-center py-2 px-4 md:px-8 rounded-md text-white bg-primary transition font-semibold text-xs md:text-base'
						>
							Next
						</button>
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default BuyPaylaterModalForm;
