"use client";
import React, { useRef } from "react";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { BuyPaylaterModalFormModel2 } from "../config/models";
import { FaCheck } from "react-icons/fa";
import PhoneNumField from "./PhoneNumField";
import { BiCloudUpload, BiLeftArrowAlt } from "react-icons/bi";
import { UploadIconSvg } from "../SvgIcons";

interface FormValues {
	bvn: string;
	uploadValidId: any;
	uploadBankStatement: any;
	uploadPassport: any;
	uploadUtilityBill: any;
}

interface BuyPaylaterModal2FormProps {
	handleClick: () => void;
	handleClick2: () => void;
}

const BuyPaylaterModal2Form = ({
	handleClick,
	handleClick2,
}: BuyPaylaterModal2FormProps) => {
	const fileInputRef1 = useRef<HTMLInputElement | null>(null);
	const fileInputRef2 = useRef<HTMLInputElement | null>(null);
	const fileInputRef3 = useRef<HTMLInputElement | null>(null);
	const fileInputRef4 = useRef<HTMLInputElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleUploadClick1 = () => {
		if (fileInputRef1.current) {
			fileInputRef1.current.click();
		}
	};
	const handleUploadClick2 = () => {
		if (fileInputRef2.current) {
			fileInputRef2.current.click();
		}
	};
	const handleUploadClick3 = () => {
		if (fileInputRef3.current) {
			fileInputRef3.current.click();
		}
	};
	const handleUploadClick4 = () => {
		if (fileInputRef4.current) {
			fileInputRef4.current.click();
		}
	};

	const initialValues: FormValues = {
		bvn: "",
		uploadValidId: null,
		uploadBankStatement: null,
		uploadUtilityBill: null,
		uploadPassport: null,
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

	const showFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className='flex flex-col bg-white md:mt-2 pb-2'>
			<FormikProvider value={formik}>
				<Form className='flex flex-col gap-2'>
					<div>
						<label
							htmlFor='bvn'
							className='block font-[400] text-xs md:text-base text-primary-300 mt-4 mb-1'
						>
							Bvn
						</label>

						<Field
							type='number'
							id='bvn'
							name='bvn'
							placeholder='Enter Bvn'
							className='w-full px-2 py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div>
						<label
							htmlFor='uploadValidId'
							className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
						>
							Upload valid ID
						</label>

						<div
							onClick={handleUploadClick1}
							className='w-full flex justify-center gap-3 items-center text-xs md:text-base px-2 py-2 md:py-3 rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in cursor-pointer'
						>
							<UploadIconSvg />
							<span>Upload Image</span>
							<Field
								id='uploadValidId'
								name='uploadValidId'
								type='file'
								className='hidden'
								innerRef={fileInputRef1}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='uploadBankStatement'
							className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
						>
							Upload 6 months bank statement
						</label>

						<div
							onClick={handleUploadClick2}
							className='w-full flex justify-center gap-3 items-center text-xs md:text-base px-2 py-2 md:py-3 rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in cursor-pointer'
						>
							<UploadIconSvg />
							<span>Upload Image</span>
							<Field
								id='uploadBankStatement'
								name='uploadBankStatement'
								type='file'
								className='hidden'
								innerRef={fileInputRef2}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='uploadUtilityBill'
							className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
						>
							Upload Utility Bill
						</label>

						<div
							onClick={handleUploadClick3}
							className='w-full flex justify-center gap-3 items-center text-xs md:text-base px-2 py-2 md:py-3 rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in cursor-pointer'
						>
							<UploadIconSvg />
							<span>Upload Image</span>
							<Field
								id='uploadUtilityBill'
								name='uploadUtilityBill'
								type='file'
								className='hidden'
								innerRef={fileInputRef3}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='uploadPassport'
							className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
						>
							Upload photo-passport
						</label>

						<div
							onClick={handleUploadClick4}
							className='w-full flex justify-center gap-3 items-center text-xs md:text-base px-2 py-2 md:py-3 rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in cursor-pointer'
						>
							<UploadIconSvg />
							<span>Upload Image</span>
							<Field
								id='uploadPassport'
								name='uploadPassport'
								type='file'
								className='hidden'
								innerRef={fileInputRef4}
							/>
						</div>
					</div>
					<div className='flex items-center mt-5 md:px-2'>
						<div
							onClick={handleClick2}
							className='flex flex-1 gap-2 text-sm md:text-base items-center group'
						>
							<BiLeftArrowAlt className='group-hover:-translate-x-1 transition cursor-pointer' />
							<span className='group-hover:underline cursor-pointer transition'>
								Back
							</span>
						</div>

						<button
							onClick={handleClick}
							type='button'
							className='flex flex-[.3] w-full justify-center items-center py-2 px-4 md:px-12 rounded-md text-white bg-primary transition font-semibold text-xs md:text-base'
						>
							Finish
						</button>
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default BuyPaylaterModal2Form;
