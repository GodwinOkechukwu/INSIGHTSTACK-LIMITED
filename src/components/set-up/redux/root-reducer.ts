"use client";
import { combineReducers } from "redux";
import authReducer from "../../Redux/Auth";
import currencyReducer from "../../Redux/Currency";
import subCategoryIdReducer from "../../Redux/subCategoryId";
import wishlistReducer from "../../Redux/Wishlist";
import compareReducer from "../../Redux/Compare";

export const rootReducer = combineReducers({
	auth: authReducer,
	currency: currencyReducer,
	subCategoryId: subCategoryIdReducer,
	wishlist: wishlistReducer,
	compare: compareReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
