import AppLayout from "@src/components/AppLayout";
import ContactCards from "./_components/ContactCards";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import AppMenu from "@src/components/Navbars/AppMenu";

// const { description, title, ogImage, keywords } = SEODATA.contact_us;
// export const metadata: Metadata = {
// 	title: title,
// 	description: description,
// 	keywords: keywords,
// 	icons: ogImage,
// 	openGraph: {
// 		images: [
// 			{
// 				url: ogImage ?? "",
// 			},
// 		],
// 	},
// };

const page = () => {
	return (
		<AppLayout>
			<main className='bg-white mx-auto w-full mt-32 md:mt-36 min-h-screen pt-4'>
				<h3 className='font-semibold text-xl sm:text-2xl slg:text-3xl tracking-tighter text-center mt-10'>
					Contact Us
				</h3>

				<div className='flex flex-wrap w-full justify-center gap-8 mt-10 px-4 slg:px-0'>
					<ContactCards />
				</div>
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
