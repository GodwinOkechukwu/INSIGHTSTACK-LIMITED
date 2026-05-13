import { query } from "./db";
import { T } from "@src/lib/tables";

/**
 * Fetch product rows with their images, categories, and attributes
 * and return them in a WooCommerce-compatible shape.
 */
export async function hydrateProducts(productRows: any[]): Promise<any[]> {
	if (!productRows.length) return [];

	const ids = productRows.map((p) => p.id);
	const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");

	const [images, cats, attrs] = await Promise.all([
		query(
			`SELECT product_id, id, src, name, alt, position
       FROM ${T.productImages} WHERE product_id = ANY($1::int[]) ORDER BY position`,
			[ids],
		),
		query(
			`SELECT pc.product_id, c.id, c.name, c.slug
       FROM ${T.productCategories} pc
       JOIN ${T.categories} c ON c.id = pc.category_id
       WHERE pc.product_id = ANY($1::int[])`,
			[ids],
		),
		query(
			`SELECT product_id, id, name, options, position
       FROM ${T.productAttributes} WHERE product_id = ANY($1::int[]) ORDER BY position`,
			[ids],
		),
	]);

	const imgMap = groupBy(images, "product_id");
	const catMap = groupBy(cats, "product_id");
	const attrMap = groupBy(attrs, "product_id");

	return productRows.map((p) => ({
		id: p.id,
		name: p.name,
		slug: p.slug,
		sku: p.sku ?? "",
		description: p.description ?? "",
		short_description: p.short_description ?? "",
		price: p.price?.toString() ?? "0",
		regular_price: p.regular_price?.toString() ?? "0",
		sale_price: p.sale_price?.toString() ?? "",
		stock_status: p.stock_status,
		stock_quantity: p.stock_quantity,
		rating_count: p.rating_count,
		average_rating: p.average_rating?.toString() ?? "0",
		status: p.status,
		type: p.type,
		images: (imgMap[p.id] || []).map((img: any) => ({
			id: img.id,
			src: img.src,
			name: img.name ?? "",
			alt: img.alt ?? "",
		})),
		categories: (catMap[p.id] || []).map((c: any) => ({
			id: c.id,
			name: c.name,
			slug: c.slug,
		})),
		attributes: (attrMap[p.id] || []).map((a: any) => ({
			id: a.id,
			name: a.name,
			options: a.options,
		})),
		date_created: p.created_at,
		date_modified: p.updated_at,
	}));
}

function groupBy(arr: any[], key: string): Record<string | number, any[]> {
	return arr.reduce((acc, item) => {
		const k = item[key];
		if (!acc[k]) acc[k] = [];
		acc[k].push(item);
		return acc;
	}, {} as Record<string | number, any[]>);
}
