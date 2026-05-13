import React from "react";
import HomeApplianceCard from "../Cards/HomeApplianceCard";
import { Product, ProductCategoryResponse } from "@constants";
import CustomSwiper from "../CustomSwiper";
import {
	useGetProductCategoryQuery,
	useGetProductQuery,
} from "../config/features/api";
import { ScaleLoader } from "react-spinners";

interface HomeApplianceSectionProps {
	data: any;
	isloading: boolean;
}

const HomeApplianceSection = ({
	data,
	isloading,
}: HomeApplianceSectionProps) => {
	const homeApplianceProductData = data?.products;

	const itemsPerSlide = 8;
	const totalSlides = Math.ceil(
		(homeApplianceProductData?.length || 0) / itemsPerSlide,
	);

	// Split the data into two arrays if it exceeds 6 items
	const firstHalf = homeApplianceProductData?.slice(0, itemsPerSlide);
	const secondHalf = homeApplianceProductData?.slice(itemsPerSlide);

	const renderProductCards = (data: Product[]) =>
		data?.map((product, index) => (
			<HomeApplianceCard
				key={product._id}
				id={product._id}
				image={product.image[0]}
				name={product.title.en}
				oldAmount={product.prices.discount}
				newAmount={product.prices.originalPrice}
			/>
		));

	return (
		<section className='flex flex-col w-full bg-white slg:mt-16'>
			<div className='bg-secondary-200 flex w-full justify-center py-3'>
				<span className='text-white'>Home Appliance</span>
			</div>
			{isloading && (
				<div className='flex overflow-hidden pt-6 pb-4 px-8 xs:px-0 slg:min-h-[30vh]'>
					<div className='flex w-full justify-center'>
						<ScaleLoader color='#2A19D4' />
					</div>
				</div>
			)}
			<>
				{firstHalf && (
					<div className='flex xs:gap-4 overflow-x-hidden pt-6 pb-4 md:pl-8 px-2 sm:px-1'>
						<CustomSwiper
							slidesPerView={3}
							navigate={false}
							items={renderProductCards(firstHalf)}
						/>
					</div>
				)}

				{totalSlides > 1 && secondHalf && (
					<div className='flex xs:gap-4 overflow-x-hidden pt-6 pb-4 md:pl-8 px-2 sm:px-1'>
						<CustomSwiper
							slidesPerView={3}
							navigate={false}
							items={renderProductCards(secondHalf)}
						/>
					</div>
				)}
			</>
		</section>
	);
};

export default HomeApplianceSection;
