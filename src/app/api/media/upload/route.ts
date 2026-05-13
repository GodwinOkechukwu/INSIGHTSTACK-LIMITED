import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3 } from "@src/lib/s3";
import { verifyToken, extractBearerToken } from "@src/lib/auth";

// POST /api/media/upload — upload a file to S3
export async function POST(req: NextRequest) {
	try {
		const token = extractBearerToken(req.headers.get("authorization"));
		const decoded = token ? verifyToken<{ id: number }>(token) : null;

		if (!decoded?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const formData = await req.formData();
		const file = formData.get("file") as File | null;

		if (!file) {
			return NextResponse.json({ message: "No file provided" }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const url = await uploadFileToS3(buffer, file.name, file.type);

		return NextResponse.json({
			source_url: url,
			url,
			media_details: { file: file.name },
		});
	} catch (error) {
		console.error("Media upload error:", error);
		return NextResponse.json({ message: "Upload failed" }, { status: 500 });
	}
}
