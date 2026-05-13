import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface subCategoryIdStateProps {
	data?: string;
	productSlugId?: string;
	categorySlugId?: string;
	orderSlugId?: string;
}

const initialState: subCategoryIdStateProps = {
	data: "",
	productSlugId: "",
	categorySlugId: "",
	orderSlugId: "",
};

export const subCategoryIdState = createSlice({
	name: "subCategoryIdStateType",
	initialState,
	reducers: {
		setSubCategoryIdState: (
			state,
			action: PayloadAction<subCategoryIdStateProps>,
		) => {
			state.data = action?.payload?.data;
		},
		updateProductSlugId: (
			state,
			action: PayloadAction<{ productSlugId: string }>,
		) => {
			state.productSlugId = action.payload.productSlugId;
		},
		updateCategorySlugId: (
			state,
			action: PayloadAction<{ categorySlugId: string }>,
		) => {
			state.categorySlugId = action.payload.categorySlugId;
		},
		updateOrderSlugId: (
			state,
			action: PayloadAction<{ orderSlugId: string }>,
		) => {
			state.orderSlugId = action.payload.orderSlugId;
		},
	},
});

export const {
	setSubCategoryIdState,
	updateProductSlugId,
	updateOrderSlugId,
	updateCategorySlugId,
} = subCategoryIdState.actions;

export default subCategoryIdState.reducer;
