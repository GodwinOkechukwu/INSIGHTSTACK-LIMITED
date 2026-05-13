"use client";
import { changePasswordPayLoad, filterCustomersByEmail } from "@constants";
import { changePasswordFormModel } from "@src/components/config/models";
import useToken from "@src/components/hooks/useToken";
import { useCustomer } from "@src/components/lib/woocommerce";
import { APICall } from "@utils";
import { changeWpPassword } from "@utils/endpoints";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";

interface FormValues {
	email?: string;
	old_password: string;
	new_password: string;
}

const ChangePasswordForm = () => {
	const { token, email: customerEmail } = useToken();
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const { data: customer, isLoading, isError } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer ?? [];
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, customerEmail);

	const initialValues: FormValues = {
		email: wc_customer_info?.email,
		old_password: "",
		new_password: "",
	};

	const changePasswordMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(changeWpPassword, value, true, true);
			return response?.data;
		},
		{
			onSuccess: async (data, variable: FormValues) => {
				formik.resetForm();
			},
			onError: (error: any) => {},
		},
	);

	const toggleOldPasswordVisibility = () => {
		setShowOldPassword((prevShowPassword) => !prevShowPassword);
	};

	const toggleNewPasswordVisibility = () => {
		setShowNewPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleFormSubmit = async (
		values: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		if (values.email) {
			const payload: changePasswordPayLoad = {
				email: values.email,
				old_password: values.old_password,
				new_password: values.new_password,
			};
		}
		try {
			setSubmitting(true);
			await changePasswordMutation.mutateAsync(values);
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: changePasswordFormModel,
		onSubmit: (values, { setSubmitting }) => {
			handleFormSubmit(values, setSubmitting);
		},
	});

	return (
		<>
			<h2 className='text-xl font-semibold mb-5'>Change Password</h2>
			<FormikProvider value={formik}>
				<Form className='md:grid-cols-6 md:gap-6'>
					<div className='md:mt-0 md:col-span-2'>
						<div className='lg:mt-6 bg-white'>
							<div className='grid grid-cols-6 gap-6'>
								<div className='col-span-6 sm:col-span-6 max-w-[400px]'>
									<label
										htmlFor='email'
										className='block font-[400] text-xs md:text-base text-primary-300 mt-4 mb-1'
									>
										Email address <span className='text-red-500'>*</span>
									</label>

									<Field
										type='text'
										id='email'
										name='email'
										disabled
										placeholder='Enter your email address'
										className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in cursor-not-allowed bg-slate-100 ${
											formik.touched.email && formik.errors.email
												? "border-red-500"
												: "border-gray-300"
										}`}
									/>
									{formik.touched.email && formik.errors.email && (
										<div className='text-red-500 mt-1 text-xs sm:text-base'>
											{formik.errors.email}
										</div>
									)}
								</div>
								<div className='col-span-6 sm:col-span-6 max-w-[400px]'>
									<label
										htmlFor='old_password'
										className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
									>
										Current Password <span className='text-red-500'>*</span>
									</label>

									<div className='relative'>
										<Field
											type={showOldPassword ? "text" : "password"}
											id='old_password'
											name='old_password'
											placeholder='Enter your password'
											className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-transparent transition-[.5] ease-in focus:ring-1 focus:ring-primaryColor-100 ${
												formik.touched.old_password &&
												formik.errors.old_password
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{formik.touched.old_password &&
											formik.errors.old_password && (
												<div className='text-red-500 mt-1 text-xs sm:text-sm'>
													{formik.errors.old_password}
												</div>
											)}
										<span
											className='absolute top-4 md:top-6 right-2 transform -translate-y-1/2 cursor-pointer transition'
											onClick={toggleOldPasswordVisibility}
										>
											{showOldPassword ? (
												<FaEye className='text-primary' />
											) : (
												<FaEyeSlash className='text-primary' />
											)}
										</span>
									</div>
								</div>
								<div className='col-span-6 sm:col-span-6 max-w-[400px]'>
									<label
										htmlFor='new_password'
										className='block font-[400] text-xs md:text-base text-primary-300 mb-1'
									>
										New Password <span className='text-red-500'>*</span>
									</label>

									<div className='relative'>
										<Field
											type={showNewPassword ? "text" : "password"}
											id='new_password'
											name='new_password'
											placeholder='Enter your password'
											className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-transparent transition-[.5] ease-in focus:ring-1 focus:ring-primaryColor-100 ${
												formik.touched.new_password &&
												formik.errors.new_password
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{formik.touched.new_password &&
											formik.errors.new_password && (
												<div className='text-red-500 mt-1 text-xs sm:text-sm'>
													{formik.errors.new_password}
												</div>
											)}
										<span
											className='absolute top-4 md:top-6 right-2 transform -translate-y-1/2 cursor-pointer transition'
											onClick={toggleNewPasswordVisibility}
										>
											{showNewPassword ? (
												<FaEye className='text-primary' />
											) : (
												<FaEyeSlash className='text-primary' />
											)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-5 text-right max-w-[400px]'>
						<button
							type='submit'
							className={`md:text-sm leading-5 inline-flex items-center cursor-not-allowed transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none text-white py-2 md:py-3 lg:py-3 hover:text-white hover:bg-primaryColor-100 h-12 mt-1 text-sm lg:text-sm w-full sm:w-[10rem] ${
								formik.isValid
									? "bg-primary-100 cursor-pointer"
									: "bg-primary-100/60"
							}`}
							disabled={!formik.isValid || formik.isSubmitting}
						>
							{formik.isSubmitting ? (
								<ImSpinner2 className='text-xl animate-spin' />
							) : (
								"Change Password"
							)}
						</button>
					</div>
				</Form>
			</FormikProvider>
		</>
	);
};

export default ChangePasswordForm;
