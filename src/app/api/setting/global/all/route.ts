import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";

// GET /api/setting/global/all
export async function GET(_req: NextRequest) {
	try {
		const rows = await query(`SELECT key, value FROM ${T.globalSettings}`);

		const settings = rows.reduce((acc: any, row: any) => {
			acc[row.key] = row.value ?? "";
			return acc;
		}, {} as Record<string, string>);

		return NextResponse.json(settings);
	} catch (error) {
		console.error("Global settings error:", error);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
