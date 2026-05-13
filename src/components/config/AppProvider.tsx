"use client";
import { Provider } from "react-redux";
import React, { ReactNode, useEffect } from "react";
import { CartProvider } from "react-use-cart";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import * as _redux from "../../components/set-up";
import axios from "axios";
import { HeroUIProvider } from "@heroui/react";
import newStore from "../set-up/redux/store";

_redux.setupAxios(axios, newStore);
export const loadingBarRef = React.createRef<LoadingBarRef | null>();

const queryClient = new QueryClient();

interface AppProviderProps {
	children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<LoadingBar
					color='#2A19D4'
					ref={loadingBarRef as React.RefObject<LoadingBarRef>}
					height={5}
				/>
				<ToastContainer />
				<CartProvider>
					<HeroUIProvider>
						<Provider store={newStore}>{children}</Provider>
					</HeroUIProvider>
				</CartProvider>
			</QueryClientProvider>
		</>
	);
};

export default AppProvider;
