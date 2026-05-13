"use client";
import {
	filterCustomersByEmail,
	updateAccountPayLoad,
	updateAccountResponse,
} from "@constants";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import Label from "@src/components/Form/Label";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import {
	useGetUserAccountQuery,
	useUpdateAccountMutation,
} from "@src/components/config/features/api";
import { RootState } from "@src/components/config/store";
import useToken from "@src/components/hooks/useToken";
import Uploader from "@src/components/image-uploader/Uploader";
import {
	useCustomer,
	useUpdateCustomer,
} from "@src/components/lib/woocommerce";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Page = () => {
	const { token, email: customerEmail } = useToken();
	const [imageUrl, setImageUrl] = useState<string | undefined>("");
	const [uploadImage, setUploadImage] = useState<string | undefined>("");
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data: customer, isLoading, isError } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer ?? [];
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, customerEmail);

	const [firstName, setFirstname] = useState<string | undefined>("");
	const [lastName, setLastName] = useState<string | undefined>("");
	const [username, setUsername] = useState<string | undefined>("");
	const [homeAddres, setHomeAddres] = useState<string | undefined>("");
	const [phoneNum, setPhoneNum] = useState<string | undefined>("");
	const [email, setEmail] = useState<string | undefined>("");

	useEffect(() => {
		if (wc_customer_info) {
			setImageUrl(wc_customer_info?.shipping?.address_2);
			setFirstname(wc_customer_info?.first_name);
			setLastName(wc_customer_info?.last_name);
			setUsername(wc_customer_info?.username);
			setHomeAddres(wc_customer_info?.billing?.address_1);
			setPhoneNum(wc_customer_info?.billing?.phone);
			setEmail(wc_customer_info?.email);
		}
	}, [wc_customer_info, imageUrl]);

	const {
		mutate: updateCustomer,
		isLoading: updateCustomerIsLoading,
		isError: updateCustomerIsError,
	} = useUpdateCustomer();
	const handleFormSubmit = async () => {
		// Prepare payload for customer update
		let payload;
		if (uploadImage) {
			payload = {
				id: wc_customer_info?.id,
				email: email,
				first_name: firstName,
				last_name: lastName,
				username: username,
				billing: {
					first_name: firstName,
					last_name: lastName,
					address_1: homeAddres,
					email: email,
					phone: phoneNum,
				},
				shipping: {
					first_name: firstName,
					last_name: lastName,
					address_2: uploadImage ?? imageUrl,
				},
			};
		} else {
			payload = {
				id: wc_customer_info?.id,
				email: email,
				first_name: firstName,
				last_name: lastName,
				username: username,
				billing: {
					first_name: firstName,
					last_name: lastName,
					address_1: homeAddres,
					email: email,
					phone: phoneNum,
				},
				shipping: {
					first_name: firstName,
					last_name: lastName,
					address_2: imageUrl,
				},
			};
		}

		// Call the update customer mutation
		updateCustomer(payload, {
			onSuccess: (data, variable) => {
				queryClient.invalidateQueries("customer");
				toast.success("Customer profile updated successfully");
				// window.location.reload();
				router.push("/user/dashboard");
			},
			onError: (error) => {
				toast.error("Failed to update customer profile");
			},
		});
	};

	return (
		<AppLayout>
			<Dashboard>
				<div className='max-w-screen-2xl'>
					<div className='md:grid md:grid-cols-3 md:gap-6'>
						<div className='md:col-span-1'>
							<div className='px-4 sm:px-0'>
								<h2 className='text-xl font-semibold mb-5 text-primary-300'>
									Account Details
								</h2>
							</div>
						</div>
					</div>
					<form className='mt-8 md:mt-0 md:col-span-2'>
						<div className='bg-white space-y-6'>
							<div>
								<Label label='User Photo' />
								<div className='mt-1 flex items-center'>
									<Uploader
										imageUrl={imageUrl}
										setUploadImage={setUploadImage}
									/>
								</div>
							</div>
						</div>

						<div className='mt-10 sm:mt-0'>
							<div className='md:grid-cols-6 md:gap-6'>
								<div className='mt-5 md:mt-0 md:col-span-2'>
									<div className='lg:mt-6 mt-4 bg-white'>
										<div className='grid grid-cols-6 gap-6'>
											<div className='col-span-6 sm:col-span-3 text-primary-300'>
												<label
													htmlFor='firstName'
													className='block font-[400] text-xs md:text-base text-primary-200 mt-4 mb-1'
												>
													First Name
												</label>

												<input
													type='text'
													id='firstName'
													name='firstName'
													value={firstName}
													onChange={(e) => setFirstname(e.target.value)}
													className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in text-black`}
												/>
											</div>
											<div className='col-span-6 sm:col-span-3 text-primary-300'>
												<label
													htmlFor='lastName'
													className='block font-[400] text-xs md:text-base text-primary-200 mt-4 mb-1'
												>
													Last Name
												</label>

												<input
													type='text'
													id='lastName'
													name='lastName'
													value={lastName}
													onChange={(e) => setLastName(e.target.value)}
													className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in text-black`}
												/>
											</div>
											<div className='col-span-6 sm:col-span-3 text-primary-300'>
												<label
													htmlFor='username'
													className='block font-[400] text-xs md:text-base text-primary-200 mt-4 mb-1'
												>
													Username
												</label>

												<input
													type='text'
													id='Username'
													name='Username'
													value={username}
													onChange={(e) => setUsername(e.target.value)}
													className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in text-black`}
												/>
											</div>

											<div className='col-span-6 sm:col-span-3 text-primary-300'>
												<label
													htmlFor='homeAddress'
													className='block font-[400] text-xs md:text-base text-primary-200 mt-4 mb-1'
												>
													Home Address
												</label>

												<input
													type='text'
													id='homeAddress'
													name='homeAddress'
													value={homeAddres}
													onChange={(e) => setHomeAddres(e.target.value)}
													className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in text-black`}
												/>
											</div>

											<div className='col-span-6 sm:col-span-3 text-primary-300'>
												<label
													htmlFor='phone'
													className='block font-[400] text-xs md:text-base text-primary-200 mt-4 mb-1'
												>
													Phone Number
												</label>

												<input
													type='number'
													id='phone'
													name='phone'
													value={phoneNum}
													onChange={(e) => setPhoneNum(e.target.value)}
													className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in text-black`}
												/>
											</div>

											<div className='col-span-6 sm:col-span-3 text-primary-300'>
												<label
													htmlFor='email'
													className='block font-[400] text-xs md:text-base text-primary-200 mt-4 mb-1'
												>
													Email Address
												</label>

												<input
													type='text'
													id='email'
													name='email'
													value={email}
													disabled
													onChange={(e) => setEmail(e.target.value)}
													className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in bg-slate-100 cursor-not-allowed text-black`}
												/>
											</div>
										</div>
										<div className='col-span-6 sm:col-span-3 mt-5 text-right text-primary-300'>
											<button
												type='button'
												onClick={handleFormSubmit}
												className={`md:text-sm leading-5 inline-flex items-center cursor-pointer hover:bg-primary-300 bg-primary-100 transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white h-12 mt-1 text-sm lg:text-sm w-full sm:w-[10rem] `}
												disabled={updateCustomerIsLoading}
											>
												{updateCustomerIsLoading ? (
													<ImSpinner2 className='text-xl animate-spin' />
												) : (
													"Update Profile"
												)}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Dashboard>
		</AppLayout>
	);
};

export default Page;
