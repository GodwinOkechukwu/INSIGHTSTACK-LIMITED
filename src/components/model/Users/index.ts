interface UserModel {
	id: number;
	role_id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	profile_image_url: string;
	role: {
		id: number;
		name: string;
		created_at: string;
		updated_at: string;
	};
}

interface Woo_Customer_Type {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	email: string;
	first_name: string;
	last_name: string;
	role: string;
	username: string;
	billing: {
		first_name: string;
		last_name: string;
		company: string;
		address_1: string;
		address_2: string;
		city: string;
		postcode: string;
		country: string;
		state: string;
		email: string;
		phone: string;
	};
	shipping: {
		first_name: string;
		last_name: string;
		company: string;
		address_1: string;
		address_2: string;
		city: string;
		postcode: string;
		country: string;
		state: string;
		phone: string;
	};
	is_paying_customer: boolean;
	avatar_url: string;
	meta_data: {
		id: number;
		key: string;
		value: string;
	}[];
	_links: {
		self: { href: string }[];
		collection: { href: string }[];
	};
}
