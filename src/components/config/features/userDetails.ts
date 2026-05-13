import { UserAccountResponse } from "@constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userDetailsProps {
	data: UserAccountResponse | undefined;
}

const initialState: userDetailsProps = {
	data: undefined,
};

export const userDetails = createSlice({
	name: "userDetailsType",
	initialState,
	reducers: {
		setUserDetails: (state, action: PayloadAction<userDetailsProps>) => {
			state.data = action?.payload?.data;
		},
	},
});

export const { setUserDetails } = userDetails.actions;

export default userDetails.reducer;
