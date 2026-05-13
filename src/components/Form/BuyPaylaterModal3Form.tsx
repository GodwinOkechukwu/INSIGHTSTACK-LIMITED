"use client";
import React, { useRef } from "react";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { BuyPaylaterModalFormModel2 } from "../config/models";
import { FaCheck } from "react-icons/fa";
import PhoneNumField from "./PhoneNumField";

interface FormValues {
	bvn: string;
	phone: string;
	nin: string;
	uploadNinSlip: any;
	uploadPassport: any;
	checked: boolean;
}

interface BuyPaylaterModal3FormProps {
	handleClick: () => void;
}

const BuyPaylaterModal3Form = ({ handleClick }: BuyPaylaterModal3FormProps) => {
	const initialValues: FormValues = {
		bvn: "",
		phone: "",
		nin: "",
		uploadNinSlip: null,
		uploadPassport: null,
		checked: false,
	};

	const handleFormSubmit = async (values: FormValues) => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: BuyPaylaterModalFormModel2,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const showFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className='flex flex-col bg-white mt-2 pb-2'>
			<FormikProvider value={formik}>
				<Form className='flex flex-col gap-2'>
					<div>
						<label
							htmlFor='nameofEmployer'
							className='block font-[400] text-base text-primary-300 mt-4 mb-1'
						>
							Name of Employer
						</label>

						<Field
							type='text'
							id='nameofEmployer'
							name='nameofEmployer'
							placeholder='Full name'
							className='w-full px-2 py-3 font-[400] text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div className=''>
						<label
							htmlFor='phone'
							className='block text-base text-primary-300 mb-2'
						>
							Phone Number
						</label>

						<PhoneNumField
							value={formik.values.phone}
							onChange={(phone) => formik.setFieldValue("phone", phone)}
						/>
					</div>
					<div>
						<label
							htmlFor='officeAddress'
							className='block font-[400] text-base text-primary-300 mb-1'
						>
							Office Address
						</label>

						<Field
							id='officeAddress'
							name='officeAddress'
							placeholder='Email Address'
							type='text'
							className='w-full px-2 py-3 font-[400] text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div>
						<label
							htmlFor='uploadBankStatment'
							className='block font-[400] text-base text-primary-300 mb-1'
						>
							Upload Bank Statment
						</label>

						<Field
							id='uploadBankStatment'
							name='uploadBankStatment'
							type='file'
							className='w-full px-2 py-3 font-[400] text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div>
						<label
							htmlFor='paymentPlan'
							className='block font-[400] text-base text-primary-300 mb-1'
						>
							Payment plan
						</label>

						<Field
							id='paymentPlan'
							name='paymentPlan'
							type='file'
							className='w-full px-2 py-3 font-[400] text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div className='flex items-center mt-5 px-2'>
						<div className='flex flex-1 items-center'>
							<Field
								type='checkbox'
								id='dataSharingCheckbox'
								name='dataSharingCheckbox'
								className='h-4 w-4 border border-secondary-800 checked:bg-primary checked:border-primary mr-2 cursor-pointer'
							/>
							{/* {formik.values.checked && <FaCheck className='text-primary' />} */}
							<label htmlFor='dataSharingCheckbox' className='text-sm'>
								I agree to share my data with the company
							</label>
						</div>
						<button
							type='button'
							onClick={handleClick}
							className='flex flex-[.3] w-full justify-center items-center py-3 px-12 rounded-md text-white bg-primary transition font-semibold text-base'
						>
							Finish Order
						</button>
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default BuyPaylaterModal3Form;
