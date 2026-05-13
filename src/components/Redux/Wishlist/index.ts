"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
	items: ProductType[];
	isOpen: boolean;
}

const initialState: WishlistState = {
	items: [],
	isOpen: false,
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		toggleWishlist: (state, action: PayloadAction<ProductType>) => {
			const idx = state.items.findIndex((i) => i.id === action.payload.id);
			if (idx >= 0) {
				state.items.splice(idx, 1);
			} else {
				state.items.push(action.payload);
			}
		},
		removeFromWishlist: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		clearWishlist: (state) => {
			state.items = [];
		},
		setWishlistOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { toggleWishlist, removeFromWishlist, clearWishlist, setWishlistOpen } =
	wishlistSlice.actions;

export default wishlistSlice.reducer;
