"use client";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useAppSelector } from "../hooks";
import { logoImage } from "@public/images";

interface SubCategoryCardProps {
	id?: string;
	image?: string;
	name: string;
}
const SubCategoryCard = ({ id, image, name }: SubCategoryCardProps) => {
	const { data } = useAppSelector((state) => state.subCategoryId);

	return (
		<Link
			href={`${"/category/" + convertToSlug(name) + "-" + id}`}
			className={`flex flex-col items-center group cursor-pointer rounded-lg bg-white border-2 border-gray-100 hover:border-primary-100/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md w-full sm:w-[210px] h-fit ${
				data === id ? "border-primary-100 !shadow-md" : ""
			}`}
		>
			{/* Image Container */}
			<div className='relative w-full aspect-square p-2 sm:p-4'>
				{image ? (
					<Picture
						src={image || logoImage}
						alt={`${name} category`}
						className='w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110 aspect-square'
					/>
				) : (
					<div className='w-full h-full bg-gradient-to-br from-primary-100/60 to-primary-400 flex items-center justify-center rounded-lg'>
						<h4
							dangerouslySetInnerHTML={{ __html: name }}
							className='text-white font-bold text-xs sm:text-lg md:text-xl text-center px-2 leading-tight'
						/>
					</div>
				)}
			</div>

			{/* Category Name */}
			<div className='w-full p-1 sm:p-3 text-center border-t border-gray-50'>
				<h4
					dangerouslySetInnerHTML={{ __html: name }}
					className='text-gray-800 font-semibold text-xs sm:text-base group-hover:text-primary-100 transition-colors line-clamp-2'
				/>
			</div>
		</Link>
	);
};

export default SubCategoryCard;
