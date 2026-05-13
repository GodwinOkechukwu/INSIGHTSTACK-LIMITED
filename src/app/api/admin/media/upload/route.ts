import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3 } from "@src/lib/s3";
import { requireAdmin } from "../../_lib/requireAdmin";

// POST /api/admin/media/upload — upload a file to S3 (admin auth via cookie)
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadFileToS3(buffer, file.name, file.type);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Admin media upload error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
