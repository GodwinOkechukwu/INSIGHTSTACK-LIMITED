import axios from "axios";
import {
  Alliancepay_Checkout_Url,
  Alliancepay_Public_key,
  Encryption_Checkout_Url,
  ENCRYPTION_KEY,
} from "./lib/data";

export const getCountriesApi = async () => {
  return axios.get(`/countries`);
};

// ── Auth endpoints now served by our internal Next.js API ────────────────────
export const login = async (data: any) =>
  axios.post(`/api/customer/login`, data);

export const getBankAccounts = async () => axios.get(`/api/setting/global/all`);

export const forgotPassword = async (data: any) =>
  axios.post(`/api/customer/forgot-password`, data);

export const register = async (data: any) =>
  axios.post(`/api/customer/verify-email`, data);

export const changeWpPassword = async (data: any) =>
  axios.post(`/api/customer/change-password`, data);

// Test encryption
// export const encryptOrderData = async (data: any) =>
// 	axios.post(`${Alliancepay_Checkout_Url}/checkout/data/encrypt`, data, {
// 		headers: {
// 			"API-Key": Alliancepay_Public_key, // Add API-Key header
// 			"Content-Type": "application/json", // Optionally specify content type
// 		},
// 	});

export const encryptOrderData = async (data: any) =>
  axios.post(
    `${Encryption_Checkout_Url}/Payment/encrypt-data-for-create-order`,
    data,
    {
      headers: {
        "Content-Type": "application/json", // Optionally specify content type
        "api-key": Alliancepay_Public_key, // Add API-Key header
        "encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
      },
    },
  );

export const createOrderData = async (data: any) =>
  axios.post(`${Alliancepay_Checkout_Url}/checkout/order/create`, data, {
    headers: {
      "api-key": Alliancepay_Public_key, // Add API-Key header
      "encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
      "Content-Type": "application/json", // Optionally specify content type
    },
  });

export const cardPaymentRedirect = async (data: any) =>
  axios.post(
    `${Encryption_Checkout_Url}/Payment/encrypt-data-for-pay-order`,
    data,
    {
      // axios.post(`${Alliancepay_Checkout_Url}/checkout/data/encrypt`, data, {
      headers: {
        "api-key": Alliancepay_Public_key, // Add API-Key header
        "encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
        "Content-Type": "application/json", // Optionally specify content type
      },
    },
  );

export const payOrder = async (data: any) =>
  axios.post(`${Alliancepay_Checkout_Url}/checkout/order/pay`, data, {
    headers: {
      "api-key": Alliancepay_Public_key, // Add API-Key header
      "encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
      "Content-Type": "application/json", // Optionally specify content type
    },
  });

// ── WooCommerceServer replaced by internal API calls ────────────────────────
// Used in generateStaticParams at build time (server-side)
export const WooCommerceServer = {
  async get(endpoint: string): Promise<{ data: any }> {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL ||
      `http://localhost:${process.env.PORT || 3000}`;

    let path = "/api/products";
    if (endpoint.includes("categories")) path = "/api/category";

    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) return { data: [] };
      return { data: await res.json() };
    } catch {
      return { data: [] };
    }
  },
};

export async function fetchExchangeRate(from: string, to: string) {
  const res = await fetch(
    `${Encryption_Checkout_Url}/Payment/get-exchange-rate?baseCurrencyCode=${from}&destinationCurrencyCode=${to}`,
  );
  const data = await res.json();
  return data.rate;
}
