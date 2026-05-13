import { configureStore } from "@reduxjs/toolkit";
import paylaterModal2 from "../features/paylaterModal2";
import paylaterModal3 from "../features/paylaterModal3";
import paylaterModal4 from "../features/paylaterModal4";
import payLaterDataState from "../features/payLaterDataState";
import searchDataState from "../features/searchDataState";
import userDetails from "../features/userDetails";
import paylaterPlanModal from "../features/paylaterPlanModal";
import cartSlice from "../features/cartSlice";
import { api } from "../features/api";

const rootReducer = {
	// Add your reducers here
	[api.reducerPath]: api.reducer,
	payLaterDataState,
	userDetails,
	paylaterModal2,
	paylaterModal3,
	paylaterModal4,
	paylaterPlanModal,
	cartSlice,
	searchDataState,
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
