"use client";
import React, { useState } from "react";
import PriceRangeSlider from "../PriceRangeSlider";

interface PriceRangeSectionProps {
	selectedOption: string;
	setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const PriceRangeSection = ({
	selectedOption,
	setSelectedOption,
}: PriceRangeSectionProps) => {
	// const [currentPrice, setCurrentPrice] = useState(100);

	const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(e.target.value);
	};
	// const handlePriceChange = (newPrice: number) => {
	// 	setCurrentPrice(newPrice);
	// };

	return (
		<section className='flex flex-col bg-white border-[1px] border-[#E9E9E9]'>
			<h4 className='text-center py-3 slg:py-6 text-sm slg:text-base font-[400] leading-[1.3] text-secondary-200 bg-[#FAFAFA] border-b-[1px] border-[#E9E9E9]'>
				Price range
			</h4>
			{/* Replace minPrice and maxPrice with your desired minimum and maximum values */}
			<div className='flex justify-center gap-6 px-6 pt-3 slg:pt-8 pb-2 slg:pb-4'>
				<label
					htmlFor='all'
					className='flex gap-2 items-center text-base font-[500] cursor-pointer'
				>
					All
					<input
						type='radio'
						name='priceRange'
						className='custom-radio cursor-pointer'
						value='all'
						checked={selectedOption === "all"}
						onChange={handleOptionChange}
					/>
				</label>
				<label
					htmlFor='high'
					className='flex gap-2 items-center text-base font-[500] cursor-pointer'
				>
					High
					<input
						type='radio'
						name='priceRange'
						className='custom-radio cursor-pointer'
						value='high'
						checked={selectedOption === "high"}
						onChange={handleOptionChange}
					/>
				</label>
				<label
					htmlFor='low'
					className='flex gap-2 items-center text-base font-[500] cursor-pointer'
				>
					Low
					<input
						type='radio'
						name='priceRange'
						className='custom-radio cursor-pointer'
						value='low'
						checked={selectedOption === "low"}
						onChange={handleOptionChange}
					/>
				</label>
				{/* <PriceRangeSlider
					minPrice={0}
					maxPrice={200}
					currentPrice={currentPrice}
					onPriceChange={handlePriceChange}
				/>

				<div className='flex justify-between text-sm slg:text-base'>
					<span>₦0</span>
					<span>₦{currentPrice.toLocaleString("en-US")}</span>
				</div> */}
			</div>
		</section>
	);
};

export default PriceRangeSection;
