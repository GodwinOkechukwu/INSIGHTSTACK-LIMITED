"use client";
import React from "react";
import ProductCard2 from "../Cards/ProductCard2";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScaleLoader } from "react-spinners";
import Link from "next/link";
interface PhonesAndTableSectionProps {
	data: any;
	isloading: boolean;
	title?: string;
}

const PhonesAndTableSection = ({
	data,
	isloading,
	title,
}: PhonesAndTableSectionProps) => {
	const phoneAndTabletCardData: any = data?.product;

	const productCards = phoneAndTabletCardData?.map((product: any) => {
		if (data) {
			return (
				<ProductCard2
					key={product._id}
					id={product._id}
					image={product.image[0]}
					oldAmount={product.prices.discount}
					newAmount={product.prices.originalPrice}
					description={product.title.en}
				/>
			);
		} else {
			return null;
		}
	});

	const filledItems = [...productCards];
	while (filledItems.length < 6) {
		filledItems.push(null); // Add null placeholder for empty slides
	}
	// Corporate Gifts
	// Phones & Tablets
	return (
		<section className='flex flex-col w-full bg-[#FDF7FD] slg:mt-6'>
			<div
				className={`${
					title === "Phones & Tablets" ? " bg-primary" : " bg-primaryColor-300"
				} flex w-full justify-between text-xs lg:text-sm px-8 py-3`}
			>
				<span className='text-white'>{title}</span>
				<Link
					href={`${"/category/" + data?.title + "-" + data?.category}`}
					className='text-white uppercase hover:underline transition cursor-pointer'
				>
					See all
				</Link>
			</div>
			<div className='flex overflow-hidden pt-6 pb-4 px-8 xs:px-0'>
				{isloading && (
					<div className='flex w-full justify-center slg:min-h-[30vh]'>
						<ScaleLoader color='#2A19D4' />
					</div>
				)}
				{phoneAndTabletCardData && (
					<Swiper
						spaceBetween={15} // Adjust as needed
						slidesPerView={5}
						// navigation={{
						// 	nextEl: ".swiper-button-next",
						// 	prevEl: ".swiper-button-prev",
						// }}
						// modules={[Navigation]}
						pagination={{ clickable: true }}
						breakpoints={{
							0: {
								slidesPerView: 2,
								spaceBetween: 15,
							},
							400: {
								slidesPerView: 2,
								spaceBetween: 15,
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
						{filledItems?.map((item: any) => (
							<SwiperSlide key={item?.key}>{item}</SwiperSlide>
						))}
					</Swiper>
				)}
				{/* <CustomSwiper slidesPerView={5} items={productCards} /> */}
			</div>
		</section>
	);
};

export default PhonesAndTableSection;
