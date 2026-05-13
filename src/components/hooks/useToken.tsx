"use client";
import { useState, useEffect } from "react";
import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";

const useToken = () => {
	const [token, setToken] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		const storedToken = Cookies.get(AUTH_TOKEN_KEY);
		if (storedToken) setToken(storedToken);
		// else {
		//   window.location.pathname = "/login";
		// }
	}, [AUTH_TOKEN_KEY]);
	useEffect(() => {
		const storedEmail = Cookies.get(AUTH_EMAIL);
		if (storedEmail) setEmail(storedEmail);
		// else {
		//   window.location.pathname = "/login";
		// }
	}, [AUTH_EMAIL]);

	return { token, email };
};

export default useToken;
