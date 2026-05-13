interface WooCommerceSetting {
	id: string;
	label: string;
	description: string;
	type: string;
	default: string | number | boolean; // Adjust based on possible types of `default`
	tip: string;
	value: string | number | boolean; // Adjust based on possible types of `value`
	_links: {
		self: Array<{
			href: string;
		}>;
		collection: Array<{
			href: string;
		}>;
	};
}
