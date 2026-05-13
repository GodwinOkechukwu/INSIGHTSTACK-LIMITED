import { SEODATA } from "@constants/seoContants";
import AppLayout from "@src/components/AppLayout";
import RegisterForm from "@src/components/Form/RegisterForm";
import AppMenu from "@src/components/Navbars/AppMenu";
import { Metadata } from "next";
import React from "react";

const { description, title, ogImage, keywords } = SEODATA.register;
export const metadata: Metadata = {
	title: title,
	description: description,
	keywords: keywords,
	icons: ogImage,
	openGraph: {
		images: [
			{
				url: ogImage ?? "",
			},
		],
	},
};

const page = () => {
	return (
		<AppLayout>
			<main className='grid place-items-center min-h-screen px-3 md:px-0 mt-16 mb-3 lg:mt-8 lg:mb-10'>
				<RegisterForm />
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
