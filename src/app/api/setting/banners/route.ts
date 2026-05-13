import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";

// GET /api/setting/banners
export async function GET(_req: NextRequest) {
	try {
		const rows = await query(
			`SELECT * FROM ${T.banners} WHERE show = true ORDER BY created_at DESC`,
		);

		const banners = rows.map((b: any) => ({
			_id: b.id.toString(),
			name: b.name ?? "",
			image: b.image_url,
			url: b.url ?? "",
			show: b.show,
			createdAt: b.created_at,
			updatedAt: b.updated_at,
		}));

		return NextResponse.json(banners);
	} catch (error) {
		console.error("Banners error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
