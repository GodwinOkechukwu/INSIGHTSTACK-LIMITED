import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
	baseCurrency: { code: string; symbol: string; countryCode: string };
	exchangeRate: number;
}

const initialState: CurrencyState = {
	baseCurrency: { code: "NGN", symbol: "₦", countryCode: "NG" },
	exchangeRate: 1,
};

const currencySlice = createSlice({
	name: "currency",
	initialState,
	reducers: {
		setBaseCurrency: (
			state,
			action: PayloadAction<{
				code: string;
				symbol: string;
				countryCode: string;
			}>,
		) => {
			state.baseCurrency = action.payload;
		},
		setExchangeRate: (state, action: PayloadAction<number>) => {
			state.exchangeRate = action.payload;
		},
		resetCurrency: () => {
			return initialState;
		},
	},
});

export const { setBaseCurrency, setExchangeRate, resetCurrency } =
	currencySlice.actions;
export default currencySlice.reducer;
