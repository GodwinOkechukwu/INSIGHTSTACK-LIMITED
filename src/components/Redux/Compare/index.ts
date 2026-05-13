"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MAX_COMPARE = 4;

interface CompareState {
	items: ProductType[];
	isOpen: boolean;
}

const initialState: CompareState = {
	items: [],
	isOpen: false,
};

const compareSlice = createSlice({
	name: "compare",
	initialState,
	reducers: {
		toggleCompare: (state, action: PayloadAction<ProductType>) => {
			const idx = state.items.findIndex((i) => i.id === action.payload.id);
			if (idx >= 0) {
				state.items.splice(idx, 1);
			} else if (state.items.length < MAX_COMPARE) {
				state.items.push(action.payload);
			}
		},
		removeFromCompare: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		clearCompare: (state) => {
			state.items = [];
			state.isOpen = false;
		},
		setCompareOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { toggleCompare, removeFromCompare, clearCompare, setCompareOpen } =
	compareSlice.actions;

export default compareSlice.reducer;
