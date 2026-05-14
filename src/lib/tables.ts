/**
 * Centralised table-name registry.
 *
 * The prefix is read from the TABLE_PREFIX environment variable (default: "insightstack_").
 * Set TABLE_PREFIX in your .env file to change it for every table at once.
 *
 * Example .env entry:
 *   TABLE_PREFIX=insightstack_
 */
const prefix = process.env.TABLE_PREFIX ?? "insightstack_";

export const T = {
	users:              `${prefix}users`,
	categories:         `${prefix}categories`,
	products:           `${prefix}products`,
	productImages:      `${prefix}product_images`,
	productCategories:  `${prefix}product_categories`,
	productAttributes:  `${prefix}product_attributes`,
	orders:             `${prefix}orders`,
	orderItems:         `${prefix}order_items`,
	paylaterRequests:   `${prefix}paylater_requests`,
	banners:            `${prefix}banners`,
	globalSettings:     `${prefix}global_settings`,
	reviews:            `${prefix}reviews`,
} as const;
