import React from "react";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";

const { description, title, ogImage, keywords } = SEODATA.user_dashboard;
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
			<Dashboard />
		</AppLayout>
	);
};

export default page;
