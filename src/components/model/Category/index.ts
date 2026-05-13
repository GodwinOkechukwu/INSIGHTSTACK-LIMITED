interface CategoryImage {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
}

interface CategoryLinksItem {
	href: string;
}

interface CategoryLinks {
	self: CategoryLinksItem[];
	collection: CategoryLinksItem[];
}

interface CategoryType {
	id: number;
	name: string;
	slug: string;
	parent: number;
	description: string;
	display: string;
	image: CategoryImage;
	menu_order: number;
	count: number;
	_links: CategoryLinks;
}
