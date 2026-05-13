"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Picture from "./Picture";

interface productPicSlider1Props {
	images: string[];
	pictureClassName: string;
	mainProductImage: string;
	setMainProductImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProductPicSlider1 = ({
	images,
	pictureClassName,
	mainProductImage,
	setMainProductImage,
}: productPicSlider1Props) => {
	const Images = [
		"https://res.cloudinary.com/dj6poinc7/image/upload/v1702374994/trendhive/MAXITV32Inch.webp",
		"https://res.cloudinary.com/dj6poinc7/image/upload/v1702374994/trendhive/MAXITV32Inch.webp",
		"https://res.cloudinary.com/dj6poinc7/image/upload/v1702374994/trendhive/MAXITV32Inch.webp",
		"https://res.cloudinary.com/dj6poinc7/image/upload/v1702375017/trendhive/Maxi32inchAndriodTV.jpg",
		"https://res.cloudinary.com/dj6poinc7/image/upload/v1702375017/trendhive/Maxi32inchAndriodTV.jpg",
		"https://res.cloudinary.com/dj6poinc7/image/upload/v1702375017/trendhive/Maxi32inchAndriodTV.jpg",
	];
	return (
		<Swiper
			className='flex flex-col w-full sm:w-[400px] sm:h-[6rem] mx-auto justify-center py-5'
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={5}
			slidesPerView={4}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log("slide change")}
		>
			{images.map((image, index) => (
				<SwiperSlide
					key={index}
					className='w-fit relative cursor-pointer'
					onClick={() => setMainProductImage(image)}
				>
					<Picture
						src={image}
						width={4000}
						height={4000}
						alt={`advertisement-image-${index}`}
						loading='lazy'
						className={`${pictureClassName} ${
							mainProductImage === image && "border-2 border-primaryColor-100"
						} hover:border-2 hover:border-primaryColor-100 w-[90px] h-[80px] mx-auto p-2`}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ProductPicSlider1;
