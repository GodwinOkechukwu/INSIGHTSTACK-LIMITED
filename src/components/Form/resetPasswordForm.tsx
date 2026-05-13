"use client";
import React, { useEffect, useState } from "react";
import { Form, Field, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useResetPasswordMutation } from "../config/features/api";
import { resetPasswordPayLoad, resetPasswordResponse } from "@constants";
import FormToast from "../Reusables/Toast/SigninToast";
import { resetPasswordFormModel } from "../config/models";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthModal from "../modal/AuthModal";

interface FormValues {
	password: string;
}

interface ResetPasswordFormProps {
	token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const [
		resetPassword,
		{ isLoading, isError, error, data: resetPasswordData },
	] = useResetPasswordMutation();
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const initialValues: FormValues = {
		password: "",
	};

	const handleFormSubmit = async (values: FormValues) => {
		const payload: resetPasswordPayLoad = {
			token: token,
			newPassword: values.password,
		};
		resetPassword(payload);
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: resetPasswordFormModel,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	const handleResetPasswordData = (data: resetPasswordResponse) => {
		// router.push("/user/password-change-success")
		handleOpenModal();
		FormToast({
			message: data.message,
			success: true,
		});
	};

	useEffect(() => {
		if (resetPasswordData) {
			handleResetPasswordData(resetPasswordData);
		}
	}, [resetPasswordData]);

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

	const AuthModalContent = () => (
		<>
			<h3 className='text-xs sm:text-base md:text-3xl text-primary text-center'>
				Your password changed successfully, you can login now!
			</h3>
			<h3
				className='hover:underline text-sm md:text-base cursor-pointer hover:text-primary'
				onClick={() => router.push("/user/login")}
			>
				Click here to Login
			</h3>
		</>
	);

	return (
		<>
			<div className='flex flex-col bg-white w-full max-w-[32rem] pt-5 pb-6 md:pb-10 px-3 md:px-10 shadow-lg rounded-xl'>
				<h4 className='text-base md:text-2xl uppercase font-[500]'>
					Reset Password
				</h4>
				<FormikProvider value={formik}>
					<Form className='flex flex-col gap-2 md:gap-4 mt-3'>
						<div>
							<label
								htmlFor='password'
								className='block font-[400] text-xs md:text-base text-primary-300 mb-2'
							>
								New Password <span className='text-red-500'>*</span>
							</label>

							<div className='relative'>
								<Field
									type={showPassword ? "text" : "password"}
									id='password'
									name='password'
									placeholder='Enter your new password'
									className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
										formik.touched.password && formik.errors.password
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{formik.touched.password && formik.errors.password && (
									<div className='text-red-500 mt-1 text-xs sm:text-base'>
										{formik.errors.password}
									</div>
								)}
								<span
									className='absolute top-6 right-2 transform -translate-y-1/2 cursor-pointer transition'
									onClick={togglePasswordVisibility}
								>
									{showPassword ? (
										<FaEyeSlash className='text-primary' />
									) : (
										<FaEye className='text-primary' />
									)}
								</span>
							</div>
						</div>

						<button
							type='submit'
							className={`w-full py-2 md:py-3 text-sm md:text-base mt-3 md:mt-0 transition text-white rounded-sm mb-2 hover:bg-primaryColor-100 ${
								formik.isValid
									? "bg-primary cursor-pointer"
									: "bg-primary/60 cursor-not-allowed"
							}`}
							disabled={!formik.isValid || isLoading}
						>
							{isLoading ? <ClipLoader color='#d4d3d3' size={20} /> : "Reset"}
						</button>

						<div className='flex justify-end text-xs md:text-base mt-2 md:mt-0'>
							<span>Already Have account?&nbsp;</span>
							<span
								onClick={() => router.push("/login")}
								className='text-primary font-semibold hover:underline cursor-pointer transition'
							>
								Login Here
							</span>
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

export default ResetPasswordForm;
