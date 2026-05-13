"use client";
import React, { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CustomSwiperProps {
	items: ReactNode[];
	slidesPerView: number;
	navigate?: boolean;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
	items,
	slidesPerView,
	navigate = false,
}) => {
	// Ensure that there are at least 4 slides to display
	const filledItems = [...items];
	while (filledItems.length < 4) {
		filledItems.push(null); // Add null placeholder for empty slides
	}

	// Generate unique class names for navigation buttons
	const nextButtonClassName = `swiper-button-next-${Math.random().toString(36).substr(2, 9)}`;
	const prevButtonClassName = `swiper-button-prev-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<Swiper
			slidesPerView={slidesPerView}
			centeredSlides={false}
			spaceBetween={2}
			breakpoints={{
				0: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				650: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 3,
				},
				// 1120: {	
				// 	slidesPerView: 4,
				// },
				// 1440: {
				// 	slidesPerView: 5,
				// },
			}}
			navigation={{
				nextEl: `.${nextButtonClassName}`,
				prevEl: `.${prevButtonClassName}`,
			}}
			modules={[Navigation]}
		>
			{filledItems.map((item, index) => (
				<SwiperSlide key={index}>{item}</SwiperSlide>
			))}
			{navigate && (
				<>
					<div className={`swiper-button-next !text-primary ${nextButtonClassName}`} />
					<div className={`swiper-button-prev !text-primary ${prevButtonClassName}`} />
				</>
			)}
		</Swiper>
	);
};

export default CustomSwiper;