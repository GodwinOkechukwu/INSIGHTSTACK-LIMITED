import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { T } from "@src/lib/tables";

// GET /api/category/:id — returns a single category or a search list
// When id is '' or 'all' the route returns all categories
export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const search = id?.trim();

		if (!search || search === "all" || search === "") {
			const rows = await query(
				`SELECT id, name, slug, description, parent_id, image_url, count
         FROM ${T.categories} ORDER BY name ASC`,
			);
			return NextResponse.json(
				rows.map((c) => ({
					id: c.id,
					name: c.name,
					slug: c.slug,
					description: c.description ?? "",
					parent: c.parent_id ?? 0,
					count: c.count,
					image: c.image_url ? { id: 0, src: c.image_url, name: "", alt: "" } : null,
				})),
			);
		}

		// Try numeric ID first
		const numericId = parseInt(search, 10);
		let cat: any = null;

		if (!isNaN(numericId)) {
			cat = await queryOne(
				`SELECT * FROM ${T.categories} WHERE id = $1`,
				[numericId],
			);
		}

		// Fall back to slug / search
		if (!cat) {
			const rows = await query(
				`SELECT id, name, slug, description, parent_id, image_url, count
         FROM ${T.categories} WHERE slug ILIKE $1 OR name ILIKE $1 ORDER BY name ASC`,
				[`%${search}%`],
			);
			return NextResponse.json(
				rows.map((c) => ({
					id: c.id,
					name: c.name,
					slug: c.slug,
					description: c.description ?? "",
					parent: c.parent_id ?? 0,
					count: c.count,
					image: c.image_url ? { id: 0, src: c.image_url, name: "", alt: "" } : null,
				})),
			);
		}

		return NextResponse.json({
			id: cat.id,
			name: cat.name,
			slug: cat.slug,
			description: cat.description ?? "",
			parent: cat.parent_id ?? 0,
			count: cat.count,
			image: cat.image_url ? { id: 0, src: cat.image_url, name: "", alt: "" } : null,
		});
	} catch (error) {
		console.error("Category by ID error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
