"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ForgetPasswordFormModel } from "../config/models";
import AuthModal from "../modal/AuthModal";
import { forgotPassword } from "@utils/endpoints";
import { useMutation } from "react-query";
import { APICall } from "@utils";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import TextInput from "../Reusables/TextInput";

interface FormValues {
	email: string;
}

const ForgotPasswordForm = () => {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const initialValues: FormValues = {
		email: "",
	};

	const forgotPasswordMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(forgotPassword, value, true, true);
			return response;
		},
		{
			onSuccess: async (data, variable: FormValues) => {
				if (data?.data?.message === "Password reset email sent successfully.") {
					handleOpenModal();
					formik.resetForm();
				}
			},
			onError: (error: any) => {},
		},
	);

	const handleForgotPassword = async (
		value: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		try {
			await forgotPasswordMutation.mutateAsync(value);
		} catch (error) {}
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: ForgetPasswordFormModel,
		onSubmit: async (values) => {
			await forgotPasswordMutation.mutateAsync(values);
		},
	});

	const AuthModalContent = () => (
		<div className='py-8 space-y-6'>
			<h3 className='text-xs sm:text-base md:text-3xl text-primary text-center'>
				Please check your email to reset password!
			</h3>
			<h3
				className='hover:underline text-sm md:text-base cursor-pointer text-center hover:text-primary'
				onClick={() => router.push("/user/login")}
			>
				Click here to go back to Login page
			</h3>
		</div>
	);

	return (
		<>
			<div className='flex flex-col w-full md:w-[32rem] pt-8 pb-6 md:pb-10 px-3 md:px-10 sm:shadow-lg sm:rounded-xl'>
				<h4 className='text-xl text-primary-100 font-semibold text-center md:text-2xl uppercase'>
					Forget Password
				</h4>
				<FormikProvider value={formik}>
					<Form className='flex flex-col gap-2 md:gap-4'>
						<div>
							<label
								htmlFor='email'
								className='block font-medium text-xs md:text-base text-accent mt-4 mb-1'
							>
								Email address <span className='text-red-500'>*</span>
							</label>

							<TextInput
								id='email'
								placeholder='Enter your email address'
								type='email'
								className={`w-full px-2 py-4 text-base rounded-md border bg-transparent border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primary-100 ${
									formik.touched.email && formik.errors.email
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
						</div>

						<button
							type='submit'
							className={`flex items-center justify-center border relative text-white border-transparent hover:border-primary-100 hover:border-transparent text-base leading-[1.4] font-semibold py-2.5 sm:py-3 w-full rounded-md gap-1.5 transition ${
								formik.isValid && !forgotPasswordMutation.isLoading
									? "bg-primary-100 cursor-pointer"
									: "bg-primary-100/60 cursor-not-allowed"
							} `}
							disabled={!formik.isValid || forgotPasswordMutation.isLoading}
						>
							{forgotPasswordMutation.isLoading ? (
								<ImSpinner2 className='text-xl animate-spin' />
							) : (
								"Send Mail"
							)}
						</button>

						<div className='flex justify-center text-sm md:text-base mt-2 md:mt-0'>
							<span>Already Have account?&nbsp;</span>
							<Link
								href='/user/login'
								className='text-primary-100 font-semibold hover:underline underline-offset-4 cursor-pointer transition'
							>
								Log in
							</Link>
						</div>
					</Form>
				</FormikProvider>
			</div>
			<AuthModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				content={<AuthModalContent />}
			/>
		</>
	);
};

export default ForgotPasswordForm;
