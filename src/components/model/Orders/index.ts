interface AddressType {
	first_name: string;
	last_name: string;
	address_1: string;
	address_2?: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
	email?: string;
	phone?: string;
}

interface LineItemType {
	product_id: number;
	variation_id?: number;
	quantity: number;
}

interface ShippingLineType {
	method_id: string;
	method_title: string;
	total: string;
}

interface OrderDataType {
	payment_method: string;
	payment_method_title: string;
	set_paid: boolean;
	billing: AddressType;
	shipping: AddressType;
	line_items: LineItemType[];
	shipping_lines: ShippingLineType[];
}
