import crypto from "crypto";

export default class EncryptionHelper {
	constructor() {
		this.publicXml = "";
		this.merchantEncKey = "";
		this.keySize = 0;
	}

	// Method to encrypt plaintext
	async encrypt(plaintext, kess) {
		try {
			this.merchantEncKey = kess;
			const { keySize, publicXml } = this.getKeyFromEncryptionString(kess);
			this.keySize = keySize;
			this.publicXml = publicXml;

			if (!plaintext) throw new Error("Data sent for encryption is empty");
			const data = Buffer.from(plaintext, "utf-8");
			const maxLength = this.getMaximumDataLength(keySize);
			if (data.length > maxLength)
				throw new Error(`Max data length is ${maxLength}`);
			if (!this.isKeySizeValid(keySize)) throw new Error("Key size is invalid");
			if (!publicXml) throw new Error("Key is either null or invalid");

			// Create and configure the RSA key
			const publicKey = this.convertXmlToPem(publicXml);
			const encryptedData = crypto.publicEncrypt(publicKey, data);
			return encryptedData.toString("base64");
		} catch (error) {
			if (error.message.includes("Value cannot be null"))
				throw new Error("ENCRPTNULL");
			throw new Error("ENCRYPT001");
		}
	}

	// Retrieve RSA public key from the merchant encryption key
	getKeyFromEncryptionString(rawkey) {
		let keySize = 0;
		let xmlKey = "";
		if (rawkey) {
			const keyBytes = Buffer.from(rawkey, "base64");
			const stringKey = keyBytes.toString("utf-8");
			if (stringKey.includes("!")) {
				const splitValues = stringKey.split("!", 2);
				try {
					keySize = parseInt(splitValues[0], 10);
					xmlKey = splitValues[1];
				} catch (error) {
					// Handle parsing error if necessary
				}
			}
		}
		return { keySize, publicXml: xmlKey };
	}

	// Convert XML key to PEM format
	convertXmlToPem(xmlKey) {
		// Conversion logic depends on your XML key structure.
		// Example: Use libraries like `xml2js` if needed.
		// Here we simply return a mock PEM format
		return `-----BEGIN PUBLIC KEY-----\n${xmlKey}\n-----END PUBLIC KEY-----`;
	}

	// Calculate the maximum data length
	getMaximumDataLength(keySize) {
		return Math.floor(((keySize - 384) / 8) * 37);
	}

	// Check if the key size is valid
	isKeySizeValid(keySize) {
		return keySize >= 384 && keySize <= 32768 && keySize % 8 === 0;
	}
}
