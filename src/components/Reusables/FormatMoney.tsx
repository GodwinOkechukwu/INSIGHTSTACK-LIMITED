"use client";

import { useAppSelector } from "../hooks";

export const FormatMoney = (value: number) => {
	const formattedValue = value.toLocaleString("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	const [mainPart, decimalPart] = formattedValue.split(".");

	return (
		<span>
			<span className='text-base sm:text-xl'>{mainPart}</span>
			<span className='text-xs'>{`.${decimalPart}`}</span>
		</span>
	);
};

export const FormatMoney2 = ({ value }: any) => {
	const { exchangeRate, baseCurrency } = useAppSelector(
		(state) => state.currency,
	);
	if (!value) return null;

	// Convert the value based on the exchange rate
	const convertedValue = value * exchangeRate;

	// Format the converted value
	const formattedValue = convertedValue.toLocaleString("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return (
		<span>
			{baseCurrency.symbol} {formattedValue}
		</span>
	);
};
