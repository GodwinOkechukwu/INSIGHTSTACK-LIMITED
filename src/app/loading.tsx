import React from "react";
import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";
import { logoImage } from "@public/images";

const page = () => {
	return (
		<AppLayout>
			<div className='grid place-items-center sm:px-6 lg:px-12 pt-32 lg:pt-44 pb-5 lg:py-32 lg:pb-20'>
				<div className='relative flex items-center justify-center p-4'>
					{/* Outer Ring - Clockwise */}
					<div className='absolute w-24 h-24 rounded-full border-b-2 border-primary-100/30 animate-spin'></div>
				</div>
			</div>
		</AppLayout>
	);
};

export default page;
