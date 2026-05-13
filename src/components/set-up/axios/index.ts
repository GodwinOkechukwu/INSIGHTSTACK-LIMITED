"use client";

import { signOut } from "@utils/lib";
import { Alliancepay_Public_key } from "@utils/lib/data";
import { AxiosError, AxiosStatic, InternalAxiosRequestConfig } from "axios";

export default function setupAxios(axios: AxiosStatic, store: any) {
	const ecommmerceAPI = process.env.NEXT_PUBLIC_WP_SERVER_URL || "";
	axios.defaults.headers.common["Accept"] = "application/json";
	axios.interceptors.request.use(
		(config: any) => {
			const { auth } = store.getState(); // Destructure auth from state
			if (auth && auth.token) {
				// Check if auth and auth.token are defined
				if (config.headers && config.url.includes(ecommmerceAPI)) {
					config.headers.Authorization = `Bearer ${auth.token}`;
				}
			}
			// Set the Alliancepay Public Key if available
			return config;
		},
		(err: any) => Promise.reject(err),
	);

	axios.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config as InternalAxiosRequestConfig & {
				_retry?: boolean;
			};
			const { auth } = store.getState();

			if (
				auth?.token &&
				error.response?.status === 401 &&
				!originalRequest._retry
			) {
				// signOut();
			}

			return Promise.reject(error);
		},
	);
}
