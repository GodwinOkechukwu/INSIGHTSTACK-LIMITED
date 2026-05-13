"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ProductPageBottomHeader = () => {
	const pathname = usePathname();
	function extractAndCapitalize(path: string) {
		const match = pathname.match(/\/[^/]+\/([^/]+)-/);
		if (match && match[1]) {
			const extractedText = match[1].replace(/-/g, " ");
			return extractedText.charAt(0).toUpperCase() + extractedText.slice(1);
		}
		return null;
	}

	const capitalizeFirstLetter = (word: string | null) => {
		if (word) {
			// Decode the URL-encoded characters
			const decodedWord = decodeURIComponent(word);

			// Capitalize the first letter and convert the rest to lowercase
			return decodedWord.charAt(0) + decodedWord.slice(1);
		}
		return "";
	};

	const formattedLastWord = extractAndCapitalize(pathname);
	const extractedText = capitalizeFirstLetter(formattedLastWord);

	return (
		<nav className='hidden slg:flex gap-24 justify-center items-center w-full pt-1 pb-4 bg-dark px-32'>
			<div className='flex w-full justify-center max-w-[1156px] gap-2 text-sm capitalize leading-[1.4]'>
				<Link href='/' className='text-gray-100 hover:text-gray-200 transition'>
					Home
				</Link>
				<MdKeyboardDoubleArrowRight className='text-xl' />
				<h4 className='text-gray-100'>Product</h4>
				<MdKeyboardDoubleArrowRight className='text-xl' />
				<h4 className='truncate font-semibold text-gray-100'>
					{extractedText}
				</h4>
			</div>
		</nav>
	);
};

export default ProductPageBottomHeader;
