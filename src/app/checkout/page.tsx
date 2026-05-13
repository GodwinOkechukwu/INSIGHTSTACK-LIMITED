import AppLayout from "@src/components/AppLayout";
import React from "react";
import CheckoutInfoForm from "./component/CheckoutInfoForm";
import AppMenu from "@src/components/Navbars/AppMenu";

const Page = () => {
	return (
		<AppLayout>
			<div className='px-2 sm:px-6 mt-16 slg:mt-32 max-w-[1440px] mx-auto pb-20'>
				<section className='bg-white mt-3 flex justify-center w-full px-8 rounded-md'>
					<h4 className='text-dark font-black text-center sm:text-start capitalize text-base sm:text-2xl leading-[1.5] py-2 sm:py-3'>
						Checkout
					</h4>
				</section>
				<CheckoutInfoForm />
			</div>
			<AppMenu />
		</AppLayout>
	);
};

export default Page;
