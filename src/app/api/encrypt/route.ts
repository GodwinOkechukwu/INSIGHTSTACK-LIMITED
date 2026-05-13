import crypto from "crypto";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { plaintext, kess } = await request.json();
	try {
		// Validate input
		if (!plaintext || !kess) {
			return NextResponse.json(
				{ error: "Missing plaintext or encryption key." },
				{ status: 400 },
			);
		}

		// Parse key size and public XML from the encryption string
		const { keySize, publicXml } = getKeyFromEncryptionString(kess);

		console.log(keySize);
		if (!keySize || !isKeySizeValid(keySize)) {
			return NextResponse.json(
				{ error: "Invalid or unsupported key size." },
				{ status: 400 },
			);
		}

		if (!publicXml) {
			return NextResponse.json(
				{ error: "Public XML key is missing or invalid." },
				{ status: 400 },
			);
		}

		// Validate plaintext length
		const data: any = Buffer.from(plaintext, "utf-8");
		const maxLength = getMaximumDataLength(keySize);

		if (data.length > maxLength) {
			return NextResponse.json(
				{ error: `Max data length is ${maxLength} bytes.` },
				{ status: 400 },
			);
		}

		// Convert XML to PEM format and encrypt data
		const publicKey = convertXmlToPem(publicXml);
		const encryptedData = crypto.publicEncrypt(publicKey, data);
		const encryptedText = encryptedData.toString("base64");

		// Return the encrypted text
		return NextResponse.json({ encryptedText }, { status: 200 });
	} catch (err: any) {
		console.error("Encryption Error:", err);
		return NextResponse.json(
			{ error: err.message || "An unexpected error occurred." },
			{ status: 500 },
		);
	}
}

// Extract the key size and public XML from the encryption string
function getKeyFromEncryptionString(rawKey: string) {
	let keySize = 0;
	let xmlKey = "";

	try {
		// Validate rawKey
		if (!rawKey || typeof rawKey !== "string") {
			throw new Error("Invalid rawKey. Must be a non-empty base64 string.");
		}

		// Decode base64
		const keyBytes = Buffer.from(rawKey, "base64");
		const stringKey = keyBytes.toString("utf-8");

		// console.log("Decoded stringKey:", stringKey); // Debug output

		// Validate and parse the string
		if (stringKey.includes("!")) {
			const [size, xml] = stringKey.split("!", 2);

			// Ensure size contains only digits
			// if (!/^\d+$/.test(size.trim())) {
			// 	throw new Error(`Invalid key size parsed: "${size}".`);
			// }

			// keySize = parseInt(size.trim(), 10);
			// if (isNaN(keySize) || keySize <= 0) {
			// 	throw new Error(`Invalid key size parsed: "${size}".`);
			// }

			if (!xml || xml.trim() === "") {
				throw new Error("Missing or empty public XML part.");
			}

			xmlKey = xml.trim();
		} else {
			throw new Error(
				"Invalid encryption string format. Expected 'size!xml' format.",
			);
		}
	} catch (error) {
		console.error("Error parsing encryption string:", error);
		throw error; // Optional: return default values or rethrow
	}

	return { keySize, publicXml: xmlKey };
}

// Convert XML key to PEM format
function convertXmlToPem(xmlKey: string): string {
	return `-----BEGIN PUBLIC KEY-----\n${xmlKey}\n-----END PUBLIC KEY-----`;
}

// Calculate the maximum allowed plaintext length
function getMaximumDataLength(keySize: number): number {
	return Math.floor(((keySize - 384) / 8) * 37);
}

// Validate the RSA key size
function isKeySizeValid(keySize: number): boolean {
	return keySize >= 384 && keySize <= 32768 && keySize % 8 === 0;
}
