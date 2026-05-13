"use client";
import { superProductNameImg } from "@public/images";
import React from "react";
import ProductCard from "../Cards/ProductCard";
import CustomSwiper from "../CustomSwiper";
import { ProductCategoryResponse } from "@constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
	useGetProductCategoryQuery,
	useGetProductQuery,
} from "../config/features/api";
import { ScaleLoader } from "react-spinners";

const CorporateGiftsSection = () => {
	const { data: productCategory, isLoading: productCategoryIsLoading } =
		useGetProductCategoryQuery({
			search: "all",
		});
	const filteredCategories = productCategory?.filter(
		(item) => item.parentName === "Drink",
	);

	const { data: productsData, isLoading: productIsLoading } =
		useGetProductQuery({
			type: "direct",
			limit: "20",
			category: filteredCategories?.[0]?.parentId,
			page: "1",
		});

	const corporateGiftCardData = productsData?.products;

	const productCards = corporateGiftCardData?.map((product, index) => (
		<ProductCard
			key={product._id}
			id={product._id}
			image={product.image[0]}
			oldAmount={product.prices.discount}
			newAmount={product.prices.originalPrice}
			description={product.title.en}
		/>
	));

	return (
		<section className='flex flex-col w-full bg-[#FDF7FD] mt-6'>
			<div className={`bg-primaryColor-300 flex w-full justify-center py-3`}>
				<span className='text-white'>Corporate Gifts</span>
			</div>
			<div className='flex overflow-hidden pt-6 pb-4 px-8 xs:px-0'>
				{productIsLoading && (
					<div className='flex w-full justify-center slg:min-h-[30vh]'>
						<ScaleLoader color='#2A19D4' />
					</div>
				)}
				{productsData && (
					<Swiper
						spaceBetween={15} // Adjust as needed
						slidesPerView={5}
						pagination={{ clickable: true }}
						breakpoints={{
							0: {
								slidesPerView: 1,
								spaceBetween: 2,
							},
							400: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							600: {
								slidesPerView: 3,
								spaceBetween: 10,
							},
							1024: {
								slidesPerView: 4,
							},
							1120: {
								slidesPerView: 5,
							},
						}}
					>
						{productCards?.map((item) => (
							<SwiperSlide key={item.key}>{item}</SwiperSlide>
						))}
						{/* <>
						<div className={`swiper-button-next !text-primary`} />

						<div className={`swiper-button-prev !text-primary`} />
					</> */}
					</Swiper>
				)}
			</div>
		</section>
	);
};

export default CorporateGiftsSection;
