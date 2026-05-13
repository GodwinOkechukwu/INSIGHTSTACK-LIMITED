"use client";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";

interface HomeCardProps {
	id: string;
	image: string | undefined;
	name: string;
}

const HomeCard = ({ id, image, name }: HomeCardProps) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleCategoryClick = (name: string, id: number) => {
		const categorySlugId = `${convertToSlug(name) + "-" + id}`;
		dispatch(updateCategorySlugId({ categorySlugId }));
		router.push(`/category/${convertToSlug(name) + "-" + id}`);
	};
	return (
		<Link
			href={`${"/category/" + convertToSlug(name) + "-" + id}`}
			onClick={() => handleCategoryClick(name, Number(id))}
			className='flex flex-col gap-2 items-center min-w-[120px] max-w-[120px] cursor-pointer'
		>
			<Picture
				src={image || "/images/home-img-2.png"}
				alt={`${name}-img`}
				className='h-20 min-w-[80px] sm:min-w-[120px] slg:h-24 object-contain object-center'
				loading='lazy'
			/>

			<h4
				dangerouslySetInnerHTML={{ __html: name }}
				className='text-xs sm:text-sm text-text_color leading-[1.3] text-center font-semibold'
			/>
		</Link>
	);
};

export default HomeCard;
