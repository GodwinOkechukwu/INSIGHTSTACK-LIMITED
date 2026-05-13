"use client";
import React, { useState } from "react";
import { Select, SelectItem, Button } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import { useMutation } from "react-query";
import { ImSpinner2 } from "@node_modules/react-icons/im";
import { APICall } from "@utils";
import { currencyOptions } from "@constants";
import { fetchExchangeRate } from "@utils/endpoints";

interface BaseCurrencyProps {
	onClose: () => void;
}

const BaseCurrency = ({ onClose }: BaseCurrencyProps) => {
	const dispatch = useAppDispatch();
	const { baseCurrency } = useAppSelector((state) => state.currency);
	const [isLoadingFX, setIsLoadingFX] = useState(false);
	const [selectedCurrency, setSelectedCurrency] = useState<string>(
		baseCurrency.code || "NGN",
	);

	// Handle currency change
	const handleCurrencyChange = (keys: "all" | Set<React.Key>) => {
		const selectedValue = Array.from(keys)[0] as string;
		setSelectedCurrency(selectedValue);
	};

	const ConvertExample = async () => {
		try {
			setIsLoadingFX(true); // Set loading to true before fetching
			const rate = await fetchExchangeRate("NGN", selectedCurrency);

			if (rate) {
				dispatch(setExchangeRate(rate)); // Assuming you have an action for this
				onClose();
			}
		} catch (error) {
			console.error("Error fetching exchange rate:", error);
		} finally {
			setIsLoadingFX(false); // Set loading to false after fetching
		}
	};

	return (
		<div className='space-y-4 pt-8 pb-6 px-4'>
			<h4 className='text-lg font-semibold text-black'>
				Switch Product Currency from{" "}
				<span className='text-primary'>{baseCurrency.code}</span>
			</h4>
			<p className='text-gray-700 text-sm'>
				Select your preferred currency. All prices will be displayed in the
				chosen currency.
			</p>
			{/* <Select
				selectedKeys={new Set([selectedCurrency])} // Keep this to reflect the selected value
				onSelectionChange={handleCurrencyChange} // Update selected currency on change
				label='Select your preferred currency'
				className='w-full'
				variant='underlined'
				aria-label='Select Base Currency'
			>
				{currencyOptions.map((currency) => (
					<SelectItem key={currency.code} value={currency.code}>
						{currency.label}
					</SelectItem>
				))}
			</Select> */}

			<div className='flex justify-end gap-4'>
				<Button
					onClick={onClose}
					className='bg-gray-200 text-gray-900 px-4 py-2 rounded-md'
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						if (selectedCurrency) {
							const selected = currencyOptions.find(
								(c) => c.code === selectedCurrency,
							);
							if (selected) {
								dispatch(
									setBaseCurrency({
										code: selected.code,
										symbol: selected.symbol,
										countryCode: selected.countryCode,
									}),
								);
							}
						}
						ConvertExample();
					}}
					className='bg-green-600 text-white px-4 py-2 rounded-md'
				>
					{isLoadingFX ? (
						<ImSpinner2 className='text-xl animate-spin' />
					) : (
						"Save"
					)}
				</Button>
			</div>
		</div>
	);
};

export default BaseCurrency;
