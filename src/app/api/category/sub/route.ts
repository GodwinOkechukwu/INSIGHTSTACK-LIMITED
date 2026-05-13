import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";

// GET /api/category/sub?parentId=:id
export async function GET(req: NextRequest) {
	try {
		const parentId = req.nextUrl.searchParams.get("parentId");

		if (!parentId) {
			return NextResponse.json(
				{ message: "parentId query param is required" },
				{ status: 400 },
			);
		}

		const rows = await query(
			`SELECT id, name, slug, description, parent_id, image_url, count
       FROM ${T.categories} WHERE parent_id = $1 ORDER BY name ASC`,
			[parseInt(parentId, 10)],
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
	} catch (error) {
		console.error("Sub-categories error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
