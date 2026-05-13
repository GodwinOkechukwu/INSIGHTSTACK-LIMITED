interface MetaDataType {
	id: number;
	key: string;
	value: string;
}

interface TaxType {
	id: number;
	total: string;
	subtotal: string;
}

interface LineItem {
	id: number;
	name: string;
	product_id: number;
	variation_id: number;
	quantity: number;
	tax_class: string;
	subtotal: string;
	subtotal_tax: string;
	total: string;
	total_tax: string;
	taxes: TaxType[];
	meta_data: MetaDataType[];
	sku: string;
	price: number;
}

interface TaxLine {
	id: number;
	rate_code: string;
	rate_id: number;
	label: string;
	compound: boolean;
	tax_total: string;
	shipping_tax_total: string;
	meta_data: MetaDataType[];
}

interface ShippingLine {
	id: number;
	method_title: string;
	method_id: string;
	total: string;
	total_tax: string;
	taxes: TaxType[];
	meta_data: MetaDataType[];
}

interface BillingOrShipping {
	first_name: string;
	last_name: string;
	company: string;
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
	email?: string;
	phone?: string;
}

interface Link {
	href: string;
}

interface Links {
	self: Link[];
	collection: Link[];
}

interface OrderGetType {
	id: number;
	parent_id: number;
	number: string;
	order_key: string;
	created_via: string;
	version: string;
	status:
		| "completed"
		| "on-hold"
		| "cancelled"
		| "processing"
		| "draft"
		| "failed"
		| "refunded"
		| "pending";
	currency: string;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	discount_total: string;
	discount_tax: string;
	shipping_total: string;
	shipping_tax: string;
	cart_tax: string;
	total: string;
	total_tax: string;
	prices_include_tax: boolean;
	customer_id: number;
	customer_ip_address: string;
	customer_user_agent: string;
	customer_note: string;
	billing: BillingOrShipping;
	shipping: BillingOrShipping;
	payment_method: string;
	payment_method_title: string;
	transaction_id: string;
	date_paid: string | null;
	date_paid_gmt: string | null;
	date_completed: string | null;
	date_completed_gmt: string | null;
	cart_hash: string;
	meta_data: MetaDataType[];
	line_items: LineItem[];
	tax_lines: TaxLine[];
	shipping_lines: ShippingLine[];
	fee_lines: any[];
	coupon_lines: any[];
	refunds: any[];
	_links: Links;
}
