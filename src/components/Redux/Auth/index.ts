import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string;
	user: UserType | null;

	profile: ProfileModel | null;
}

const initialState: AuthState = {
	token: "",

	user: null,
	profile: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuth: () => {
			return initialState;
		},
		authLogin: (
			state,
			action: PayloadAction<{ token: string; user: UserType }>,
		) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		updateProfile: (
			state,
			action: PayloadAction<{ profile: ProfileModel }>,
		) => {
			state.profile = action.payload.profile;
		},
		authLogout: () => {
			return initialState;
		},
	},
});

export const { resetAuth, authLogin, updateProfile, authLogout } =
	authSlice.actions;
export default authSlice.reducer;
