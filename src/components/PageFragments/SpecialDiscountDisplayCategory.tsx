"use client";
import {
	specialDiscountResponsive,
	superDiscountImg,
	superDiscountNameImg,
	superProductNameImg,
} from "@public/images";
import Image from "next/image";
import React from "react";
import ProductCard from "../Cards/ProductCard";
import { Product, ProductCategoryResponse } from "@constants";
import CustomSwiper from "../CustomSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
	useGetProductCategoryQuery,
	useGetProductQuery,
} from "../config/features/api";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Picture from "../picture/Picture";
import Link from "next/link";

interface SpecialDiscountDisplayCategoryProps {
	data: any;
	isloading: boolean;
}

const SpecialDiscountDisplayCategory = ({
	data,
	isloading,
}: SpecialDiscountDisplayCategoryProps) => {
	const router = useRouter();
	const specialDiscountData: any = data?.product;
	// console.log(data, "data");

	// SwiperCore.Navigation;
	const productCards = specialDiscountData?.map((product: any) => {
		if (data && data?.banner?.length > 0) {
			return (
				<ProductCard
					key={product._id}
					id={product._id}
					image={product.image?.[0]}
					oldAmount={product.prices.discount}
					newAmount={product.prices.price}
					description={product.title.en}
				/>
			);

			// else if (data && data?.title !== "Discounted Offers") {
			// 	return (
			// 		<ProductCard
			// 			key={product._id}
			// 			id={product._id}
			// 			image={product.image?.[0]}
			// 			oldAmount={product.prices.discount}
			// 			newAmount={product.prices.originalPrice}
			// 			description={product.title.en}
			// 		/>
			// 	);
		} else {
			return null;
		}
	});
	// console.log(specialDiscountData);
	const filledItems = [...productCards];
	while (filledItems.length < 4) {
		filledItems.push(null); // Add null placeholder for empty slides
	}
	return (
		<section className='flex flex-col slg:flex-row w-full bg-white slg:mt-6 slg:h-[352px]'>
			<Link href={`${"/category/" + data?.title + "-" + data?.category}`}>
				<Picture
					src={data?.banner || ""}
					alt={`${data?.title}-img`}
					className='mr-3 hidden slg:block cursor-pointer w-[14rem] h-full object-contain'
					loading='lazy'
				/>
			</Link>
			<Link href={`${"/category/" + data?.title + "-" + data?.category}`}>
				<Picture
					src={data?.mobileBanner || ""}
					alt={`${data?.title}-img`}
					className='block slg:hidden cursor-pointer'
					loading='lazy'
				/>
			</Link>

			<section className='flex bg-white slg:h-full overflow-hidden'>
				<div className='flex-1 hidden slg:flex gap-2 items-center justify-center relative overflow-hidden pt-1'>
					{isloading && (
						<div className='flex w-full justify-center'>
							<ScaleLoader color='#2A19D4' />
						</div>
					)}
					{data && (
						<Swiper
							spaceBetween={15}
							slidesPerView={4}
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
							{filledItems?.map((item: any) => (
								<SwiperSlide key={item?.key}>{item}</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
				<div className='flex flex-wrap gap-3 justify-center w-full slg:hidden mt-5'>
					{productCards}
				</div>
			</section>
			{isloading && (
				<div className='flex w-full justify-center slg:hidden'>
					<ScaleLoader color='#2A19D4' />
				</div>
			)}
		</section>
	);
};

export default SpecialDiscountDisplayCategory;
