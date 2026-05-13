"use client";
import React, { useRef, useState } from "react";
import styles from "../../styles/price-range.module.css";

interface PaylaterDiscountRangeProps {
	minPrice: number;
	maxPrice: number;
	currentPrice: number;
	onPriceChange: (newPrice: number) => void;
}

const PaylaterDiscountRange: React.FC<PaylaterDiscountRangeProps> = ({
	minPrice,
	maxPrice,
	currentPrice,
	onPriceChange,
}) => {
	const [sliderValue, setSliderValue] = useState(currentPrice);
	const rangeRef = useRef<HTMLInputElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPrice = Number(event.target.value);
		setSliderValue(newPrice);
		onPriceChange(newPrice);
		updateSpanPosition();
	};

	const getBackgroundSize = () => {
		return ((sliderValue - minPrice) / (maxPrice - minPrice)) * 100;
	};

	const updateSpanPosition = () => {
		if (rangeRef.current && spanRef.current) {
			const rangeRect = rangeRef.current.getBoundingClientRect();
			const spanWidth = spanRef.current.offsetWidth;
			const percentage = (sliderValue - minPrice) / (maxPrice - minPrice);
			const left =
				rangeRect.left + rangeRect.width * percentage - spanWidth / 2;
			spanRef.current.style.left = `${left - 20}px`;
		}
	};

	return (
		<div className='pb-4 w-full relative px-2 mt-10'>
			<input
				ref={rangeRef}
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
			<span
				ref={spanRef}
				className='border border-primary p-1 text-sm absolute top-[-30px] text-primary left-4 transform -translate-x-1/2'
			>
				{currentPrice}%
			</span>
			<div className='flex w-full text-[13px] font-[400] justify-between'>
				<span>{minPrice}</span>
				<span>{maxPrice}</span>
			</div>
		</div>
	);
};

export default PaylaterDiscountRange;
