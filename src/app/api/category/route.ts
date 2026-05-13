import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";

// GET /api/category — returns all root-level categories
export async function GET(_req: NextRequest) {
	try {
		const rows = await query(
			`SELECT c.id, c.name, c.slug, c.description, c.parent_id, c.image_url, c.count
       FROM ${T.categories} c
       ORDER BY c.name ASC`,
		);

		const categories = rows.map((c) => ({
			id: c.id,
			name: c.name,
			slug: c.slug,
			description: c.description ?? "",
			parent: c.parent_id ?? 0,
			count: c.count,
			image: c.image_url ? { id: 0, src: c.image_url, name: "", alt: "" } : null,
		}));

		return NextResponse.json(categories);
	} catch (error: any) {
		console.error("Categories list error:", error);
		return NextResponse.json({ message: "Server error", detail: error?.message }, { status: 500 });
	}
}
