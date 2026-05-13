"use client";
import {
	computerOfficeImageNameImg,
	computerOfficeResponsive,
	computerOfficeResponsive2,
} from "@public/images";
import React from "react";
import ProductCard2 from "../Cards/ProductCard2";
import { ProductCategoryResponse } from "@constants";
import CustomSwiper from "../CustomSwiper";
import ProductCard from "../Cards/ProductCard";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
	useGetProductCategoryQuery,
	useGetProductQuery,
} from "../config/features/api";
import { ScaleLoader } from "react-spinners";

interface CompOfficeDisplayCategoryProps {
	data: any;
	isloading: boolean;
}

const CompOfficeDisplayCategory = ({
	data,
	isloading,
}: CompOfficeDisplayCategoryProps) => {
	const computerDisplayCardData = data?.products;

	const productCards = computerDisplayCardData?.map((product: any) => (
		<ProductCard2
			key={product._id}
			id={product._id}
			image={product.image[0]}
			oldAmount={product.prices.discount}
			newAmount={product.prices.originalPrice}
			description={product.title.en}
		/>
	));

	return (
		<section className='flex flex-col slg:flex-row w-full bg-white py-8 slg:py-0 slg:mt-6 slg:h-[352px]'>
			<img
				src={computerOfficeImageNameImg.src}
				alt='computer-office-img'
				className='mr-3 hidden slg:block'
			/>
			<img
				src={computerOfficeResponsive.src}
				alt='computer-office-img'
				className='block slg:hidden'
			/>
			{/* <Image
				src={computerOfficeResponsive2}
				alt='super-discount-img'
				className='block slg:hidden h-32 w-full mt-10 object-cover'
				width={300}
				height={200}
			/> */}
			<div className='flex w-full bg-white slg:h-[352px] overflow-hidden'>
				<div className='flex-1 hidden slg:flex gap-2 items-center justify-center overflow-hidden pt-1'>
					{isloading && (
						<div className='flex w-full justify-center'>
							<ScaleLoader color='#2A19D4' />
						</div>
					)}
					{data && (
						<Swiper
							spaceBetween={15} // Adjust as needed
							slidesPerView={4}
							// navigation={{
							// 	nextEl: ".swiper-button-next",
							// 	prevEl: ".swiper-button-prev",
							// }}
							// modules={[Navigation]}
							pagination={{ clickable: true }}
							breakpoints={{
								0: {
									slidesPerView: 2,
									spaceBetween: 10,
								},
								400: {
									slidesPerView: 2,
									spaceBetween: 10,
								},
								768: {
									slidesPerView: 3,
									spaceBetween: 10,
								},
								1024: {
									slidesPerView: 4,
								},
								1120: {
									slidesPerView: 4,
								},
							}}
						>
							{productCards?.map((item: any) => (
								<SwiperSlide key={item.key}>{item}</SwiperSlide>
							))}
						</Swiper>
					)}
					{/* <CustomSwiper slidesPerView={4} items={productCards} /> */}
				</div>
				<div className='grid w-full slg:hidden xs:grid-cols-2 sm:grid-cols-3 gap-8 xs:gap-4 items-center justify-center pt-12 px-12 xs:px-6 sm:px-10 md:px-8'>
					{productCards}
				</div>
			</div>
			{isloading && (
				<div className='flex w-full justify-center slg:hidden'>
					<ScaleLoader color='#2A19D4' />
				</div>
			)}
		</section>
	);
};

export default CompOfficeDisplayCategory;
