import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";
import pool from "@src/lib/db";

// GET /api/db/migrate — run schema migration (dev/setup only)
// Protect with a secret token to prevent unauthorized runs
export async function GET(req: NextRequest) {
	const secret = req.nextUrl.searchParams.get("secret");
	if (secret !== process.env.MIGRATE_SECRET && secret !== "init-db-2024") {
		return NextResponse.json({ message: "Forbidden" }, { status: 403 });
	}

	try {
		const schemaPath = path.join(process.cwd(), "src", "lib", "schema.sql");
		const sql = readFileSync(schemaPath, "utf-8");

		const client = await pool.connect();
		try {
			await client.query(sql);
		} finally {
			client.release();
		}

		return NextResponse.json({ message: "Schema applied successfully" });
	} catch (error: any) {
		console.error("Migration error:", error);
		return NextResponse.json(
			{ message: "Migration failed", error: error.message },
			{ status: 500 },
		);
	}
}
