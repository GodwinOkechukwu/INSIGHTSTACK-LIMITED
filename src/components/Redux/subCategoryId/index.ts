import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubCategoryIdState {
	data: string;
}

const initialState: SubCategoryIdState = {
	data: "",
};

const subCategoryIdSlice = createSlice({
	name: "subCategory",
	initialState,
	reducers: {
		setSubCategoryId: (state, action: PayloadAction<string>) => {
			state.data = action.payload;
		},
		resetSubCategoryId: () => initialState, // Resets state to initial
	},
});

export const { setSubCategoryId, resetSubCategoryId } =
	subCategoryIdSlice.actions;
export default subCategoryIdSlice.reducer;
