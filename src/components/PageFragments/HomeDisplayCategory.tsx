"use client";
import React from "react";
import HomeCard from "../Cards/HomeCard";
import {
	MainCategoryChildCategory,
	MainCategoryResponse,
	ProductCategoryResponse,
	homeCardData,
} from "@constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetProductCategoryQuery } from "../config/features/api";

interface HomeDisplayCategoryProps {
	data?: MainCategoryResponse[];
	isLoading: boolean;
}

const shuffleArray = (array: any) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const HomeDisplayCategory = ({ data, isLoading }: HomeDisplayCategoryProps) => {
	if (data?.[0]?.children) {
		const shuffledChildren = shuffleArray([...data[0].children]);
		return (
			<section className='flex w-full bg-white py-5 slg:px-16 slg:mt-6'>
				<Swiper
					spaceBetween={3}
					pagination={{ clickable: true }}
					breakpoints={{
						0: {
							slidesPerView: 4,
							spaceBetween: -8,
						},
						768: {
							slidesPerView: 6,
							spaceBetween: -80,
						},
						1024: {
							slidesPerView: 6,
						},
					}}
				>
					{shuffledChildren.map((item: MainCategoryResponse) => (
						<SwiperSlide key={item._id}>
							<HomeCard id={item._id} name={item.name.en} image={item.icon} />
						</SwiperSlide>
					))}
				</Swiper>
			</section>
		);
	}
	return null; // If no data or children, render nothing
};

export default HomeDisplayCategory;
