import { AUTH_EMAIL } from "@constants";
import Cookies from "js-cookie";

export const AUTH_TOKEN_KEY = "insightstack_LOGIN_ACCESS";
export const signOut = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
  Cookies.remove(AUTH_EMAIL);
  window.location.pathname = "/user/login";
};
export const Alliancepay_Checkout_Url =
  process.env.NEXT_PUBLIC_CHECKOUT_API || "";

export const Encryption_Checkout_Url =
  process.env.NEXT_PUBLIC_ENCRYPTION_BASE_URL || "";

export const CurrencySwap_Url = process.env.NEXT_PUBLIC_CURRENCY || "";

export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
export const Alliancepay_Public_key =
  process.env.NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY_API || "";
export const WP_API_URL = process.env.NEXT_PUBLIC_WP_SERVER_URL || "";
export const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
export const WC_URL = process.env.NEXT_PUBLIC_WC_API_URL || "";
export const WC_ConsumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || "";
export const WC_consumerSecret =
  process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || "";
export const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
export const PAYSTACK_SECRET_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY || "";
