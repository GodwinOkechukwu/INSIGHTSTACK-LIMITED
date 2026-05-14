export const BASE_URI = process.env.NEXT_PUBLIC_BASE_URI;
export const AUTH_TOKEN_KEY = "LOGIN_ACCESS";
export const AUTH_EMAIL = "E_ACCESS";

import {
	IoGridOutline,
	IoListOutline,
	IoSettingsOutline,
} from "react-icons/io5";
import { StaticImageData } from "next/image";
import { v4 as uuidv4 } from "uuid"; // Import uuid if using UUID approach
import { IconType } from "react-icons/lib";
import { FiShoppingCart } from "react-icons/fi";
import { LockIconSvg } from "@src/components/SvgIcons";
import { AiOutlineUnlock } from "react-icons/ai";
import { BsTags } from "react-icons/bs";
import { BiSolidUserAccount } from "react-icons/bi";

export const convertToSlug2 = (input: string): string => {
	// Remove HTML entities like &amp; and convert to plain text
	const decodedString = input?.replace(/&amp;/g, "and");

	// Remove any character that is not a letter, number, or space (except for dashes)
	const cleanString = decodedString.replace(/[^\w\s-]/g, "");

	// Convert spaces to hyphens and make it lowercase
	const slug = cleanString.trim().toLowerCase().replace(/\s+/g, "-");

	return slug;
};

export interface linksProps {
	id: number;
	href: string;
	text: string;
}

export const filterCustomersByEmail = (
	customers: Woo_Customer_Type[],
	email?: string,
): Woo_Customer_Type | undefined => {
	return customers?.find((customer) => customer?.email === email);
};

export const generateUniqueReference = () => {
	// Method 1: Using UUID
	return `Jolly_${uuidv4()}`;

	// Method 2: Using timestamp and random number
	// return `Jolly_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export const splitText = (text: string) => {
	return text.split(/(?=[A-Z])/).join(" ");
};

export const CompanyName = "insightstack innovations";

export const statusStyles: { [key: string]: string } = {
	completed: "text-emerald-500",
	"on-hold": "text-yellow-500",
	cancelled: "text-red-500",
	pending: "text-orange",
	processing: "text-indigo-500",
	draft: "text-gray-500",
	failed: "text-red-700",
	refunded: "text-gray-700",
};

export const headerNavLinks: linksProps[] = [
  { id: 1, href: "/", text: "Home" },
  { id: 2, href: "/category", text: "Categories" },
  { id: 3, href: "/contact-us", text: "Contact" },
];

export interface SectionProps {
	sectionTitle: string;
	listItems: string[];
}

export const aboutData: SectionProps[] = [
	{
		sectionTitle: "About",
		listItems: ["About us", "Features", "Blog", "Pricing"],
	},
	{
		sectionTitle: "Company",
		listItems: ["How we work", "Press Room", "Jobs", "Community"],
	},
	{
		sectionTitle: "Legal",
		listItems: [
			"Terms of use",
			"Privacy Policy",
			"Security Policy",
			"Cookie Settings",
		],
	},
];

export interface productCategoriesProps {
	id: number;
	name: string;
	route: string;
}

export const productCategories: productCategoriesProps[] = [
	{ id: 1, name: "Automobile", route: "/category" },
	{ id: 2, name: "Electronics", route: "/category" },
	{ id: 3, name: "Beddings", route: "/category" },
	{ id: 4, name: "Corporate Gifts", route: "/category" },
	{ id: 5, name: "Fashion", route: "/category" },
	{ id: 6, name: "Home Appliances", route: "/category" },
	{ id: 7, name: "Office and Computing", route: "/category" },
	{ id: 8, name: "Phones & Tablets", route: "/category" },
	{ id: 9, name: "Sporting Goods", route: "/category" },
];

export interface homeCardDataProps {
	id: number;
	name: string;
	image: string;
	route: string;
}

export const homeCardData: homeCardDataProps[] = [
	{
		id: 1,
		name: "Home Appliance",
		image: "/images/home-img-1.png",
		route: "/category",
	},
	{
		id: 2,
		name: "Generators",
		image: "/images/home-img-2.png",
		route: "/category",
	},
	{
		id: 3,
		name: "Fashion",
		image: "/images/home-img-3.png",
		route: "/category",
	},
	{
		id: 4,
		name: "Electronics",
		image: "/images/home-img-4.png",
		route: "/category",
	},
	{
		id: 5,
		name: "Phone & Tablet",
		image: "/images/home-img-5.png",
		route: "/category",
	},
	{
		id: 6,
		name: "Office & Computing",
		image: "/images/home-img-6.png",
		route: "/category",
	},
];

interface footerDataProps {
	title: string;
	links: {
		label: string;
		href: string;
	}[];
}

export interface specialDiscountDataProps {
	id: string;
	image: string;
	oldAmount?: number;
	newAmount: number;
	description: string;
}

export const specialDiscountData: specialDiscountDataProps[] = [
	{
		id: "1",
		image: "/images/super-product-img.png",
		oldAmount: 109000,
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "2",
		image: "/images/computer-office-img.png",
		// oldAmount: "₦299,000",
		newAmount: 229000,
		description: "itel 14” (HD) Intel® Celeron™ N3350 4GB RAM 1TB",
	},
	{
		id: "3",
		image: "/images/super-product-img.png",
		// oldAmount: "₦299,000",
		newAmount: 229000,
		description: "itel 14” (HD) Intel® Celeron™ N3350 4GB RAM 1TB",
	},
	{
		id: "4",
		image: "/images/super-product-img.png",
		// oldAmount: "₦299,000",
		newAmount: 229000,
		description: "itel 14” (HD) Intel® Celeron™ N3350 4GB RAM 1TB",
	},
	{
		id: "5",
		image: "/images/super-product-img.png",
		// oldAmount: "₦299,000",
		newAmount: 229000,
		description: "itel 14” (HD) Intel® Celeron™ N3350 4GB RAM 1TB",
	},
	{
		id: "6",
		image: "/images/super-product-img.png",
		// oldAmount: "₦299,000",
		newAmount: 229000,
		description: "itel 14” (HD) Intel® Celeron™ N3350 4GB RAM 1TB",
	},
	{
		id: "7",
		image: "/images/super-product-img.png",
		// oldAmount: "₦299,000",
		newAmount: 229000,
		description: "itel 14” (HD) Intel® Celeron™ N3350 4GB RAM 1TB",
	},
	// Add more product data as needed
];
export interface computerDisplayCardDataProps {
	id: string;
	image: string;
	oldAmount?: string;
	newAmount: number;
	description: string;
}

export const computerDisplayCardData: computerDisplayCardDataProps[] = [
	{
		id: "1",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "2",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "3",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "4",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "5",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "6",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
	{
		id: "7",
		image: "/images/office-img.png",
		oldAmount: "75,000",
		newAmount: 69000,
		description: 'UMIDIGI Power 7S 4GB, 64GB 6.7" HD+ 6150mAh',
	},
];

export interface homeApplianceProductDataProps {
	id: string;
	image: string;
	name: string;
	oldAmount?: string;
	newAmount: number;
}

export const homeApplianceProductData: homeApplianceProductDataProps[] = [
	{
		id: "1",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "2",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "3",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "4",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "5",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "6",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "7",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "8",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "9",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
	{
		id: "10",
		image: "/images/home-appliance-img.png",
		name: "Cooking Pot - Set of 3 (18n)",
		oldAmount: "9,500",
		newAmount: 6500,
	},
];

export interface userSidebarProps {
	title: string;
	href: string;
	icon: IconType;
}

export const userSidebar: userSidebarProps[] = [
	{
		title: "Dashboard",
		href: "/user/dashboard",
		icon: IoGridOutline,
	},
	{
		title: "My Orders",
		href: "/user/my-orders",
		icon: FiShoppingCart,
	},
	{
		title: "Account Details",
		href: "/user/account-details",
		icon: IoSettingsOutline,
	},
	{
		title: "Change Password",
		href: "/user/change-password",
		icon: AiOutlineUnlock,
	},
];

export interface recentOrderDataProps {
	_id: string;
	createdAt: string;
	paymentMethod: string;
	status: string;
	total: number;
	currency: string;
}

export const recentOrderData: recentOrderDataProps[] = [
	{
		_id: "123456789012345678901234",
		createdAt: "2023-07-25T12:34:56.789Z",
		paymentMethod: "Credit Card",
		status: "Delivered",
		total: 123.45,
		currency: "₦",
	},
	{
		_id: "987654321098765432109876",
		createdAt: "2023-07-24T10:20:30.456Z",
		paymentMethod: "PayPal",
		status: "Pending",
		total: 56.78,
		currency: "₦",
	},
	{
		_id: "456789012345678901234567",
		createdAt: "2023-07-23T08:15:25.123Z",
		paymentMethod: "Bank Transfer",
		status: "Delivered",
		total: 99.99,
		currency: "₦",
	},
	{
		_id: "234567890123456789012345",
		createdAt: "2023-07-22T06:10:15.789Z",
		paymentMethod: "Credit Card",
		status: "Delivered",
		total: 78.9,
		currency: "₦",
	},
	{
		_id: "901234567890123456789012",
		createdAt: "2023-07-21T04:05:06.012Z",
		paymentMethod: "Cash on Delivery",
		status: "Processing",
		total: 45.67,
		currency: "₦",
	},
	{
		_id: "678901234567890123456789",
		createdAt: "2023-07-20T02:03:04.345Z",
		paymentMethod: "Credit Card",
		status: "Delivered",
		total: 32.1,
		currency: "₦",
	},
];

export interface myOrderOrderDataProps {
	_id: string;
	createdAt: string;
	paymentMethod: string;
	status: string;
	total: string;
	currency: string;
}

export const myOrderOrderData: myOrderOrderDataProps[] = [
	{
		_id: "123456789012345678901234",
		createdAt: "2023-07-25T12:34:56.789Z",
		paymentMethod: "Credit Card",
		status: "Delivered",
		total: "123.45",
		currency: "₦",
	},
	{
		_id: "987654321098765432109876",
		createdAt: "2023-07-24T10:20:30.456Z",
		paymentMethod: "PayPal",
		status: "Pending",
		total: "56.78",
		currency: "₦",
	},
	{
		_id: "456789012345678901234567",
		createdAt: "2023-07-23T08:15:25.123Z",
		paymentMethod: "Bank Transfer",
		status: "Delivered",
		total: "99.99",
		currency: "₦",
	},
	{
		_id: "234567890123456789012345",
		createdAt: "2023-07-22T06:10:15.789Z",
		paymentMethod: "Credit Card",
		status: "Delivered",
		total: "78.90",
		currency: "₦",
	},
	{
		_id: "901234567890123456789012",
		createdAt: "2023-07-21T04:05:06.012Z",
		paymentMethod: "Cash on Delivery",
		status: "Processing",
		total: "45.67",
		currency: "₦",
	},
	{
		_id: "678901234567890123456789",
		createdAt: "2023-07-20T02:03:04.345Z",
		paymentMethod: "Credit Card",
		status: "Delivered",
		total: "32.10",
		currency: "₦",
	},
];

export interface myPaylaterDataProps {
	id: number;
	// name: string;
	product: string;
	price: string;
	month: string;
	date: string;
	status: string;
	image: string;
	view?: boolean;
}

export const myPaylaterData: myPaylaterDataProps[] = [
	{
		id: 1,
		// name: "Allen Francis",
		product: "Premium T-Shirt",
		price: "₦213,000",
		month: "3 Months",
		date: "July 23 2023",
		status: "Pending",
		image: "/images/paylater-image.png",
	},
	{
		id: 2,
		// name: "Allen Francis",
		product: "Premium T-Shirt",
		price: "₦313,000",
		month: "3 Months",
		date: "July 23 2023",
		status: "Approved",
		view: true,
		image: "/images/paylater-image.png",
	},
];

export interface aboutCardDataProps {
	rating: string;
	title: string;
	description: string;
}

export const aboutCardData: aboutCardDataProps[] = [
	{
		rating: "10K",
		title: "Listed Products",
		description: "Dynamically morph team driven partnerships after vertical.",
	},
	{
		rating: "30K",
		title: "Listed Products",
		description: "Dynamically morph team driven partnerships after vertical.",
	},
];

interface mainProductCardDataProps {
	id: string;
	image: string;
	newAmount: number;
	description: string;
}

export const mainProductCardData: mainProductCardDataProps[] = [
	{
		id: "1",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "2",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "3",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "4",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "5",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "6",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "7",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
	{
		id: "8",
		image: "/images/electronic-img.png",
		newAmount: 751900,
		description: "Toshiba Side By Side Door Inv",
	},
];

export interface ForgotPasswordPayLoad {
	email: any;
}
export interface resetPasswordPayLoad {
	token: string;
	newPassword: any;
}
export interface updateAccountPayLoad {
	token: string;
	name?: string;
	email?: string;
	address?: string;
	phone?: string;
	image?: string;
}
export interface updateUserKycPayLoad {
	token: string;
	country?: string;
	state?: string;
	city?: string;
	bvn?: string;
	address?: string;
	dob?: string;
	nationalId?: string;
	passport?: string;
	utilityBill?: string;
	bankStatement?: string;
}
export interface UserAccountQuery {
	token: string;
}
export interface ProductCategoryQuery {
	search?: string;
}
export interface SubCategoryQuery {
	parentId: string;
}
export interface ProductPayload {
	type?: string;
	title?: string;
	category?: string;
	price?: string;
	page?: string;
	limit?: string;
	id?: string;
}
export interface ProductIdPayload {
	id?: string;
}
export interface UserOrdersPayload {
	token: string;
	page?: string | number;
	limit?: string | number;
}
export interface RequestPayload {
	token: string;
	page?: string | number;
	limit?: string | number;
}
export interface OrdersByIdPayload {
	id: string;
	token: string;
}
export interface changePasswordPayLoad {
	email: string;
	old_password: string;
	new_password: any;
}
export interface registerPayLoad {
	token: any;
}

export interface UserInfo {
	name?: string;
	email?: string;
	contact?: string;
	address?: string;
	country?: string;
	city?: string;
	phone?: string;
}

interface CartItem {}
export interface createOrderPayLoad {
	token: string;
	cart: CartItem[];
	user_info: UserInfo;
	subTotal: string;
	shippingCost?: string;
	discount: string;
	total: string;
	shippingOption?: string;
	paymentMethod: string;
}
export interface addRequestPayLoad {
	token: string;
	id: string;
}
export interface verifyPaymentPayLoad {
	type: string;
	ref: string;
	token: string;
	cart?: CartItem[];
	user_info?: UserInfo;
	subTotal?: string;
	shippingCost?: string;
	discount?: number;
	total?: string;
	shippingOption?: string;
	paymentMethod?: string;
	requestId: string;
	amount: string;
	paymonth: string;
}
export interface paylaterPaymentPayLoad {
	token: string;
}
export interface initializeOrderPaymentPayLoad {
	token: string;
	amount?: string | number;
	email?: string;
}

export interface deliveryPaymentPayLoad {
	type: string;
	cart: any[];
	discount: any;
	token: string;
	paymentMethod: string;
	subTotal: string;
	total: string;
	user_info: UserInfo;
}
export interface verifyEmailPayLoad {
	email: any;
	name: string;
	password: string | number;
}

// Responses
export interface ForgotPasswordResponse {
	message: string;
}
export interface LoginResponse {
	token: string;
	_id: string;
	name: string;
	email: string;
}
interface KYC {
	bankStatement: string;
	bvn: string;
	nationalId: string;
	passport: string;
	utilityBill: string;
}
export interface UserAccountResponse {
	_id: string;
	kyc: KYC;
	isKyced: string;
	name: string;
	city: string;
	country: string;
	dob: string;
	state: string;
	email: string;
	password: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	address: string;
	image: string;
	phone: string;
}
export interface ProductCategoryResponse {
	status: string;
	_id: string;
	name: {
		en: string;
	};
	description: {
		en: string;
	};
	parentId: string;
	parentName: string;
	icon?: string;
	__v: number;
	createdAt: string;
	updatedAt: string;
}
interface LanguageName {
	en: string;
	// You can add more language properties if needed
}

export interface MainCategoryChildCategory {
	_id: string;
	name: LanguageName;
	parentId: string;
	parentName: string;
	description: LanguageName;
	icon: string;
	status: string;
	children: MainCategoryChildCategory[];
	// Add other properties if available
}
export interface MainCategoryResponse {
	_id: string;
	icon: string;
	name: LanguageName;
	parentName: string;
	parentId: string;
	description: LanguageName;
	status: string;
	children: MainCategoryChildCategory[];
}

export interface GeneralResponse {
	number_of_image_per_product: string;
	shop_name: string;
	address: string;
	company_name: string;
	vat_number: string;
	post_code: string;
	contact: string;
	email: string;
	website: string;
	receipt_size: string;
	default_currency: string;
	default_time_zone: string;
	default_date_format: string;
	percentage: string;
}

export interface Banner {
	createdAt: string;
	image: string;
	name: string;
	show: boolean;
	updatedAt: string;
	url: string;
	__v: number;
	_id: string;
}

export interface SubCategoryResponse {
	status: string;
	_id: string;
	name: LanguageName;
	description: LanguageName;
	parentId: string;
	parentName: string;
	icon: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface ProductPrice {
	discount: number;
	originalPrice: number;
	price: number;
}

interface Category {
	_id: string;
	name: {
		en: string;
	};
}

export interface Product {
	prices: ProductPrice;
	categories: Category[];
	months: string;
	deposit: string;
	image: string[];
	tag: string[];
	variants: any[]; // You can define a proper interface for variants
	status: string;
	type: string;
	_id: string;
	slug: string;
	sku: string;
	barcode: string;
	processFee: string;
	productId: string;
	title: {
		en: string;
	};
	description: {
		en: string;
	};
	category: Category;
	stock: number;
	isCombination: boolean;
	__v: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductResponse {
	products: Product[];
	totalDoc: number;
	limits: number;
	pages: number;
}

export interface ProductIdResponse {
	data: {
		prices: ProductPrice;
		categories: Category[];
		image: string[];
		tag: string[];
		variants: any[]; // You can replace 'any' with a more specific type if needed
		status: string;
		type: string;
		_id: string;
		productId: string;
		sku: string;
		months: number;
		processFee: number;
		deposit: number;
		barcode: string;
		title: {
			en: string;
		};
		description: {
			en: string;
		};
		slug: string;
		category: {
			_id: string;
			name: {
				en: string;
			};
		};
		stock: number;
		isCombination: boolean;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
	message: string;
	status: boolean;
}

export interface verifyEmailResponse {
	message: string;
	status: boolean;
}
export interface Order {
	cart: any[]; // You can replace 'any' with the actual type for the 'cart' array
	createdAt: string;
	discount: any;
	invoice: number;
	paymentMethod: string;
	status: string;
	subTotal: number;
	total: any;
	updatedAt: string;
	user: string;
	user_info: UserInfo;
	__v: number;
	_id: string;
	// Add other properties if available
}

export interface userOrderResponse {
	delivered: number;
	limits: number;
	orders: Order[];
	pages: number;
	pending: number;
	processing: number;
	totalDoc: number;
}

interface requestProduct {
	prices: {
		price: number;
		originalPrice: number;
		discount: number;
	};
	categories: string[];
	image: string[];
	tag: string[];
	variants: any[]; // You can replace 'any' with the actual type if known
	status: string;
	type: string;
	_id: string;
	productId: string;
	sku: string;
	months: number;
	processFee: number;
	deposit: number;
	barcode: string;
	title: {
		en: string;
	};
	description: {
		en: string;
	};
	slug: string;
	stock: number;
	isCombination: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface Payment {
	status: string;
	_id: string;
	name: string;
	amount: number;
}

export interface requestOrder {
	status: string;
	_id: string;
	productId: requestProduct | null;
	payment: Payment[];
	customerId: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface requestResponse {
	orders: requestOrder[];
	limits: number;
	pages: number;
	pending: number;
	accept: number;
	decline: number;
	totalDoc: number;
}

export interface resetPasswordResponse {
	message: string;
}
export interface updateAccountResponse {
	_id: string;
	name: string;
	email: string;
	address: string;
	phone: string;
	image: string;
}

export interface changePasswordResponse {
	message: string;
}
export interface registerResponse {
	token: string;
	_id: string;
	name: string;
	email: string;
	message: string;
}
export interface createOrderResponse {
	message: string;
}
export interface verifyPaymentResponse {
	message: string;
	status: boolean;
	data: any;
}
export interface initializeOrderPaymentResponse {
	authorization_url: string;
	access_code: string;
	reference: string;
}

interface CartItem {
	// Define properties of cart items here
}
export interface deliveryPaymentResponse {
	message: string;
	order: Order;
	status: boolean;
}

export interface GlobalSettingResponse {
	number_of_image_per_product: string;
	shop_name: string;
	address: string;
	company_name: string;
	vat_number: string;
	post_code: string;
	contact: string;
	email: string;
	website: string;
	receipt_size: string;
	default_currency: string;
	default_time_zone: string;
	default_date_format: string;
}

export const isValidEmail = (email: string) => {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const convertToSlug = (text: string, separator = "-") => {
	return text
		?.toLowerCase()
		.replace(/&amp;/g, "and")
		.replace(/[^\w\s]/g, "") // Remove special characters and punctuation
		.replace(/\s+/g, separator); // Replace spaces with separator
};

export const formatAmountToCurrency = (amount: number) => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	}).format(amount);
};

export const ReturnPolicyDay = "5";

export const currencyOptions: {
	code: string;
	label: string;
	symbol: string;
	country: string;
	countryCode: string; // Added country code
}[] = [
	{
		code: "NGN",
		label: "Nigerian Naira (₦)",
		symbol: "₦",
		country: "Nigeria",
		countryCode: "NG", // Added country code for Nigeria
	},
	{
		code: "USD",
		label: "US Dollar ($)",
		symbol: "$",
		country: "United States",
		countryCode: "US", // Added country code for United States
	},
	// { code: "GBP", label: "British Pound (£)", symbol: "£", country: "United Kingdom", countryCode: "GB" },
	// { code: "EUR", label: "Euro (€)", symbol: "€", country: "Eurozone", countryCode: "EU" },
	// { code: "JPY", label: "Japanese Yen (¥)", symbol: "¥", country: "Japan", countryCode: "JP" },
];
