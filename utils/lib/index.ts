import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";

export const signOut = () => {
	Cookies.remove(AUTH_TOKEN_KEY);
	Cookies.remove(AUTH_EMAIL);
	window.location.pathname = "/user/login";
};

export const getFirstCharacter = (str: string | undefined) => {
	return str?.charAt(0);
};
