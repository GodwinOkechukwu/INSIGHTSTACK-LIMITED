"use client";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "@constants";

function getAuthToken(): string {
  return Cookies.get(AUTH_TOKEN_KEY) ?? "";
}

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ─────────────────────────────────────────────
   Persistent client-side cache (localStorage)
   with a configurable TTL (default: 1 hour)
───────────────────────────────────────────── */
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms
const CACHE_PREFIX = "__wc_cache_";

export function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, expires } = JSON.parse(raw) as { data: T; expires: number };
    if (Date.now() > expires) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function cacheSet(key: string, data: unknown, ttl = CACHE_TTL) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, expires: Date.now() + ttl }),
    );
  } catch {
    // Ignore (storage quota exceeded, SSR, etc.)
  }
}

/* ─────────────────────────────────────────────
   Internal API client replacing WooCommerce SDK
───────────────────────────────────────────── */
export const WooCommerce = {
  async get(
    endpoint: string,
    params?: Record<string, any>,
    withAuth = false,
  ): Promise<{ data: any; headers: Record<string, string> }> {
    const url = buildInternalUrl(endpoint, params);
    const res = await fetch(url, {
      cache: "no-store",
      headers: withAuth ? authHeaders() : {},
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw Object.assign(new Error(body.message || "API error"), {
        response: { status: res.status, data: body },
      });
    }
    const data = await res.json();
    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return { data, headers };
  },

  async post(
    endpoint: string,
    body: any,
    withAuth = false,
  ): Promise<{ data: any }> {
    const url = buildInternalUrl(endpoint);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(withAuth ? authHeaders() : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw Object.assign(new Error(errBody.message || "API error"), {
        response: { status: res.status },
      });
    }
    return { data: await res.json() };
  },

  async put(
    endpoint: string,
    body: any,
    withAuth = false,
  ): Promise<{ data: any }> {
    const url = buildInternalUrl(endpoint);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(withAuth ? authHeaders() : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw Object.assign(new Error(errBody.message || "API error"), {
        response: { status: res.status },
      });
    }
    return { data: await res.json() };
  },
};

/**
 * Maps a WooCommerce REST endpoint string to our internal Next.js API route.
 * Examples:
 *   "products"                   → /api/products
 *   "products/123"               → /api/products/123
 *   "products/categories"        → /api/category
 *   "products/categories/5"      → /api/category/5
 *   "products?category=3&per_page=10" → /api/products?category=3&per_page=10
 *   "orders"                     → /api/order
 *   "orders/7"                   → /api/order/7
 *   "customers/9"                → /api/customer/9
 *   "settings/general"           → /api/setting/global/all
 */
function buildInternalUrl(
  endpoint: string,
  extraParams?: Record<string, any>,
): string {
  // Split path from query string
  const [pathPart, qs] = endpoint.split("?");
  const segments = pathPart.trim().split("/").filter(Boolean);

  let internalPath = "/api";

  if (segments[0] === "products" && segments[1] === "categories") {
    // products/categories or products/categories/:id
    internalPath += "/category" + (segments[2] ? `/${segments[2]}` : "");
  } else if (segments[0] === "products") {
    internalPath += "/products" + (segments[1] ? `/${segments[1]}` : "");
  } else if (segments[0] === "orders") {
    internalPath += "/order" + (segments[1] ? `/${segments[1]}` : "");
  } else if (segments[0] === "customers") {
    // customers/me or customers/:id → /api/customer/userinfo
    internalPath += "/customer/userinfo";
  } else if (segments[0] === "settings") {
    internalPath += "/setting/global/all";
  } else {
    internalPath += "/" + segments.join("/");
  }

  // Merge inline query string with extraParams
  const params = new URLSearchParams(qs ?? "");
  if (extraParams) {
    Object.entries(extraParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.set(k, String(v));
    });
  }

  const queryString = params.toString();
  return internalPath + (queryString ? `?${queryString}` : "");
}

/* ─────────────────────────────────────────────
React-Query hooks (same API as before)
───────────────────────────────────────────── */

export const useCustomer = (_customerId?: string) => {
  return useQuery(
    ["customer"],
    async () => {
      // Returns current authenticated user's info from our internal API
      const response = await WooCommerce.get("customers/me", undefined, true);
      // Wrap in array to keep backwards-compatible with filterCustomersByEmail usage
      return response.data ? [response.data] : [];
    },
    {
      staleTime: Infinity,
      retry: false,
    },
  );
};

export const useProduct = (productId: string | undefined) => {
  return useQuery(
    ["product", productId],
    async () => {
      const response = await WooCommerce.get(`products/${productId}`);
      return response.data;
    },
    {
      enabled: !!productId,
      staleTime: Infinity,
    },
  );
};

export const useCustomerOrders = (_customerId?: number | string) => {
  return useQuery(
    ["customer-orders"],
    async () => {
      const token = getAuthToken();
      if (!token) return [];
      const response = await WooCommerce.get("orders", { per_page: 100 }, true);
      return Array.isArray(response.data?.orders)
        ? response.data.orders
        : Array.isArray(response.data)
          ? response.data
          : [];
    },
    {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  );
};

export const useOrders = (
  id?: string,
  page: number = 1,
  perPage: number = 10,
) => {
  return useQuery(
    ["order", id, page, perPage],
    async () => {
      const endpoint = id
        ? `orders/${id}`
        : `orders?page=${page}&per_page=${perPage}`;
      const response = await WooCommerce.get(endpoint, undefined, true);

      const totalItems = parseInt(response.headers["x-wp-total"] ?? "0", 10);
      const totalPages = parseInt(
        response.headers["x-wp-totalpages"] ?? "1",
        10,
      );

      // Our /api/order returns { orders: [], totalDoc, ... }
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.orders)
          ? response.data.orders
          : response.data;

      return { data, totalItems, totalPages };
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      staleTime: Infinity,
    },
  );
};

export const useMediaUpload = () => {
  return useMutation(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Media upload failed");
    return await res.json();
  });
};

export const useUpdateOrder = () => {
  return useMutation(
    async ({ orderId, data }: { orderId: number; data: any }) => {
      const response = await WooCommerce.put(`orders/${orderId}`, data);
      return response.data;
    },
  );
};

export const useProductSearch = (query: string | undefined) => {
  return useQuery(
    ["product-search", query],
    async () => {
      const response = await WooCommerce.get(`products?search=${query}`);
      return response.data;
    },
    {
      enabled: !!query,
      staleTime: Infinity,
    },
  );
};

export const useGeneralSettings = () => {
  return useQuery("general-settings", async () => {
    const response = await WooCommerce.get("settings/general");
    return response.data;
  });
};

export const useCategories = (categoryId: string | undefined) => {
  const cacheKey = `categories_${categoryId ?? "all"}`;
  return useQuery(
    ["categories", categoryId],
    async () => {
      const cached = cacheGet<CategoryType[]>(cacheKey);
      if (cached) return cached;
      const response = await WooCommerce.get(
        `products/categories/${categoryId ?? ""}`,
      );
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      cacheSet(cacheKey, data);
      return data;
    },
    {
      staleTime: Infinity,
    },
  );
};

export const useCreateOrder = () => {
  return useMutation(async (orderData: any) => {
    const response = await WooCommerce.post("orders/add", orderData, true);
    return response.data;
  });
};

export const useProductsByCategory = (categoryId: string) => {
  const cacheKey = `products_cat_${categoryId}`;
  return useQuery(["category-products", categoryId], async () => {
    const cached = cacheGet<ProductType[]>(cacheKey);
    if (cached) return cached;
    const response = await WooCommerce.get(`products?category=${categoryId}`);
    const data = response.data;
    cacheSet(cacheKey, data);
    return data;
  });
};

export const useUpdateCustomer = () => {
  return useMutation(async (updatedCustomerData: any) => {
    const { id, ...data } = updatedCustomerData;
    const response = await WooCommerce.put(`customers/${id}`, data, true);
    return response.data;
  });
};
