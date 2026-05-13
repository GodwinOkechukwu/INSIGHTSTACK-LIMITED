import React from "react";

const HomePageInfoTextSection = () => {
	return (
		<section className='flex w-full bg-white mt-6 py-4 px-5 sm:px-8 pb-12 slg:pb-0 slg:mb-20'>
			<div className='flex flex-col w-full py-3'>
				{/* <h3 className='text-lg sm:text-xl slg:text-2xl font-[500] leading-[1.4] text-center slg:text-start'>
					An online store that offers ...Buy and pay in installments
				</h3> */}
				<div className='flex flex-col gap-4 text-xs slg:text-sm font-light sm:font-[400] !leading-[1.7]'>
					Duply is a distributor in Nigeria. We offer a wide range of
					high-quality appliances designed to meet the diverse needs of our
					customers. Our products include; <br /> Kitchen Appliances, Laundry
					Appliances, office Equipment, Home Comforts such as Air conditioners,
					heaters, fans e.t.c and Home Entertainment Equipment such as TVs,
					Sound Systems, and multimedia devices.
				</div>
			</div>
		</section>
	);
};

export default HomePageInfoTextSection;
