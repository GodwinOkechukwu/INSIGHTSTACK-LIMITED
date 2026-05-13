import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
	region: process.env.S3_REGION || "us-east-1",
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY || "",
		secretAccessKey:
			process.env.S3_SECRET_KEY ||
			"",
	},
});

const BUCKET = process.env.S3_BUCKET_NAME || "mondu-test";

export async function uploadFileToS3(
	file: Buffer,
	fileName: string,
	contentType: string,
): Promise<string> {
	const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, "_")}`;

	await s3.send(
		new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			Body: file,
			ContentType: contentType,
		}),
	);

	return `https://${BUCKET}.s3.amazonaws.com/${key}`;
}

export async function deleteFileFromS3(url: string): Promise<void> {
	const key = url.replace(`https://${BUCKET}.s3.amazonaws.com/`, "");
	await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export async function getPresignedUploadUrl(
	fileName: string,
	contentType: string,
	expiresIn = 300,
): Promise<{ uploadUrl: string; publicUrl: string }> {
	const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, "_")}`;
	const command = new PutObjectCommand({
		Bucket: BUCKET,
		Key: key,
		ContentType: contentType,
	});
	const uploadUrl = await getSignedUrl(s3, command, { expiresIn });
	const publicUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`;
	return { uploadUrl, publicUrl };
}
