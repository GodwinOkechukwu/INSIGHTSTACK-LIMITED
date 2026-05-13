import {
	Banner,
	ForgotPasswordPayLoad,
	ForgotPasswordResponse,
	GeneralResponse,
	GlobalSettingResponse,
	LoginResponse,
	MainCategoryResponse,
	Order,
	OrdersByIdPayload,
	ProductCategoryQuery,
	ProductCategoryResponse,
	ProductIdPayload,
	ProductIdResponse,
	ProductPayload,
	ProductResponse,
	RequestPayload,
	SubCategoryQuery,
	SubCategoryResponse,
	UserAccountQuery,
	UserAccountResponse,
	UserOrdersPayload,
	addRequestPayLoad,
	changePasswordPayLoad,
	changePasswordResponse,
	createOrderPayLoad,
	createOrderResponse,
	deliveryPaymentPayLoad,
	deliveryPaymentResponse,
	initializeOrderPaymentPayLoad,
	initializeOrderPaymentResponse,
	paylaterPaymentPayLoad,
	registerPayLoad,
	registerResponse,
	requestResponse,
	resetPasswordPayLoad,
	resetPasswordResponse,
	updateAccountPayLoad,
	updateAccountResponse,
	updateUserKycPayLoad,
	userOrderResponse,
	verifyEmailPayLoad,
	verifyEmailResponse,
	verifyPaymentPayLoad,
	verifyPaymentResponse,
} from "@constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { loadingBarRef } from "@src/app/layout";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "",
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		verifyEmail: builder.mutation<verifyEmailResponse, verifyEmailPayLoad>({
			query: (payload) => ({
				url: "/api/customer/verify-email",
				method: "POST",
				body: payload,
			}),
		}),

		resetPassword: builder.mutation<
			resetPasswordResponse,
			resetPasswordPayLoad
		>({
			query: (payload) => ({
				url: "/api/customer/reset-password",
				headers: { Authorization: `Bearer ${payload.token}` },
				method: "PUT",
				body: payload,
			}),
		}),
		updateAccount: builder.mutation<
			updateAccountResponse,
			updateAccountPayLoad
		>({
			query: (payload) => ({
				url: "/api/customer",
				headers: { Authorization: `Bearer ${payload.token}` },
				method: "PUT",
				body: payload,
			}),
		}),
		updateUserKyc: builder.mutation<any, updateUserKycPayLoad>({
			query: (payload) => ({
				url: "/api/customer/user/kyc",
				headers: { Authorization: `Bearer ${payload.token}` },
				method: "PUT",
				body: payload,
			}),
		}),
		changePassword: builder.mutation<
			changePasswordResponse,
			changePasswordPayLoad
		>({
			query: (payload) => ({
				url: "/api/customer/change-password",
				headers: { Authorization: `Bearer` },
				method: "POST",
				body: payload,
			}),
		}),
		register: builder.mutation<registerResponse, registerPayLoad>({
			query: ({ token }) => ({
				url: `/api/customer/register/${token}`,
				method: "POST",
			}),
		}),
		createOrder: builder.mutation<createOrderResponse, createOrderPayLoad>({
			query: (payload) => ({
				headers: { Authorization: `Bearer ${payload.token}` },
				url: `/api/order/add`,
				method: "POST",
				body: payload,
			}),
		}),
		addRequest: builder.mutation<any, addRequestPayLoad>({
			query: ({ token, id }) => ({
				headers: { Authorization: `Bearer ${token}` },
				url: `/api/requests/add/${id}`,
				method: "POST",
			}),
		}),
		verifyPayment: builder.mutation<
			verifyPaymentResponse,
			verifyPaymentPayLoad
		>({
			query: (payload) => ({
				headers: { Authorization: `Bearer ${payload.token}` },
				url: `/api/order/verify-payment/${payload.ref}/${payload?.type}`,
				method: "POST",
				body: payload,
			}),
		}),
		// paylaterPayment: builder.mutation<
		// 	any,
		// 	paylaterPaymentPayLoad
		// >({
		// 	query: (payload) => ({
		// 		headers: { Authorization: `Bearer ${payload.token}` },
		// 		url: `/api/order/verify-payment/${payload.ref}/later`,
		// 		method: "POST",
		// 		body: payload,
		// 	}),
		// }),
		initializeOrderPayment: builder.mutation<
			initializeOrderPaymentResponse,
			initializeOrderPaymentPayLoad
		>({
			query: (payload) => ({
				headers: { Authorization: `Bearer ${payload.token}` },
				url: `/api/order/initialize-payment`,
				method: "POST",
				body: payload,
			}),
		}),
		onDeliveryPayment: builder.mutation<
			deliveryPaymentResponse,
			deliveryPaymentPayLoad
		>({
			query: (payload) => ({
				headers: { Authorization: `Bearer ${payload.token}` },
				url: `/api/order/add`,
				method: "POST",
				body: payload,
			}),
		}),
		getUserAccount: builder.query<UserAccountResponse, UserAccountQuery>({
			query: ({ token }) => ({
				url: `/api/customer/userinfo`,
				headers: { Authorization: `Bearer ${token}` },
			}),
			providesTags: ["Users"],
		}),

		getProductCategory: builder.query<
			ProductCategoryResponse[],
			ProductCategoryQuery
		>({
			query: ({ search }) => ({
				url: `/api/category/${search}`,
			}),
		}),
		getMainCategory: builder.query<MainCategoryResponse[], any>({
			query: () => ({
				url: `/api/category`,
			}),
		}),
		getGeneralInfo: builder.query<GeneralResponse, any>({
			query: () => ({
				url: `/api/setting/global/all`,
			}),
		}),
		getBanners: builder.query<Banner[], any>({
			query: () => ({
				url: `/api/setting/banners`,
			}),
		}),
		getSubCategory: builder.query<SubCategoryResponse[], SubCategoryQuery>({
			query: (payload) => ({
				url: `/api/category/sub`,
				params: payload,
			}),
		}),

		getProduct: builder.query<ProductResponse, ProductPayload>({
			query: (payload) => ({
				url: `/api/products`,
				params: payload,
			}),
		}),
		getHomePageProduct: builder.query({
			query: () => ({
				url: `/api/products/home/page`,
			}),
		}),
		getProductById: builder.query<ProductIdResponse, ProductIdPayload>({
			query: ({ id }) => ({
				url: `/api/products/${id}`,
			}),
		}),
		getUserOrders: builder.query<userOrderResponse, UserOrdersPayload>({
			query: (payload) => ({
				url: `/api/order`,
				headers: { Authorization: `Bearer ${payload.token}` },
				params: payload,
			}),
		}),
		getRequest: builder.query<requestResponse, RequestPayload>({
			query: (payload) => ({
				url: `/api/requests`,
				headers: { Authorization: `Bearer ${payload.token}` },
				params: payload,
			}),
		}),
		getUserOrdersById: builder.query<Order, OrdersByIdPayload>({
			query: ({ id, token }) => ({
				url: `/api/order/${id}`,
				headers: { Authorization: `Bearer ${token}` },
			}),
		}),
		getGlobalSetting: builder.query<GlobalSettingResponse, any>({
			query: () => ({
				url: `/api/setting/global/all`,
			}),
		}),
	}),
});

export const {
	useVerifyEmailMutation,
	useResetPasswordMutation,
	useRegisterMutation,
	useChangePasswordMutation,
	useUpdateAccountMutation,
	useInitializeOrderPaymentMutation,
	useOnDeliveryPaymentMutation,
	useVerifyPaymentMutation,
	useUpdateUserKycMutation,
	useAddRequestMutation,
	useGetUserAccountQuery,
	useGetProductCategoryQuery,
	useGetProductQuery,
	useGetProductByIdQuery,
	useCreateOrderMutation,
	useGetHomePageProductQuery,
	useGetUserOrdersQuery,
	useGetGeneralInfoQuery,
	useGetMainCategoryQuery,
	useGetBannersQuery,
	useGetSubCategoryQuery,
	useGetUserOrdersByIdQuery,
	useGetGlobalSettingQuery,
	useGetRequestQuery,
} = api;
