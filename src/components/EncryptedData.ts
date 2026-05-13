import crypto from "crypto";

type KeyInfo = {
	keySize: number;
	publicXml: string;
};

export const useEncryptionHelper = () => {
	const getKeyFromEncryptionString = (rawKey: string): KeyInfo => {
		let keySize = 0;
		let xmlKey = "";

		if (rawKey) {
			const keyBytes = Buffer.from(rawKey, "base64");
			const stringKey = keyBytes.toString("utf-8");

			if (stringKey.includes("!")) {
				const splitValues = stringKey.split("!", 2);
				try {
					keySize = parseInt(splitValues[0], 10);
					xmlKey = splitValues[1];
				} catch {
					// Parsing error handling can be added here if needed
				}
			}
		}

		return { keySize, publicXml: xmlKey };
	};

	const convertXmlToPem = (xmlKey: string): string => {
		return `-----BEGIN PUBLIC KEY-----\n${xmlKey}\n-----END PUBLIC KEY-----`;
	};

	const getMaximumDataLength = (keySize: number): number => {
		return Math.floor(((keySize - 384) / 8) * 37);
	};

	const isKeySizeValid = (keySize: number): boolean => {
		return keySize >= 384 && keySize <= 32768 && keySize % 8 === 0;
	};

	const encrypt = async (plaintext: string, kess: string): Promise<string> => {
		try {
			if (!plaintext) throw new Error("Data sent for encryption is empty");

			const { keySize, publicXml } = getKeyFromEncryptionString(kess);

			if (!isKeySizeValid(keySize)) throw new Error("Key size is invalid");
			if (!publicXml) throw new Error("Key is either null or invalid");

			const data: any = Buffer.from(plaintext, "utf-8");
			const maxLength = getMaximumDataLength(keySize);

			if (data.length > maxLength)
				throw new Error(`Max data length is ${maxLength}`);

			const publicKey = convertXmlToPem(publicXml);
			const encryptedData = crypto.publicEncrypt(publicKey, data);

			return encryptedData.toString("base64");
		} catch (error: any) {
			if (error.message.includes("Value cannot be null"))
				throw new Error("ENCRPTNULL");
			throw new Error("ENCRYPT001");
		}
	};

	return {
		encrypt,
		getKeyFromEncryptionString,
		convertXmlToPem,
		getMaximumDataLength,
		isKeySizeValid,
	};
};
