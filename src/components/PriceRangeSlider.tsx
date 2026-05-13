"use client";
import React, { useState } from "react";
import styles from "../../styles/price-range.module.css";

interface PriceRangeSliderProps {
	minPrice: number;
	maxPrice: number;
	currentPrice: number;
	onPriceChange: (newPrice: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
	minPrice,
	maxPrice,
	currentPrice,
	onPriceChange,
}) => {
	const [sliderValue, setSliderValue] = useState(currentPrice);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPrice = Number(event.target.value);
		setSliderValue(newPrice);
		onPriceChange(newPrice);
	};

	const getBackgroundSize = () => {
		return ((sliderValue - minPrice) / (maxPrice - minPrice)) * 100;
	};

	return (
		<div className='pb-2 slg:pb-4 w-full relative'>
			<input
				type='range'
				min={minPrice}
				max={maxPrice}
				value={sliderValue}
				onChange={handleChange}
				className='w-full bg-[#E9E9E9] appearance-none h-1 rounded-full outline-none cursor-grab slider-thumb'
				style={{
					background: `linear-gradient(90deg, #d53f8c ${getBackgroundSize()}%, #E9E9E9 ${getBackgroundSize()}%)`,
				}}
			/>
		</div>
	);
};

export default PriceRangeSlider;
