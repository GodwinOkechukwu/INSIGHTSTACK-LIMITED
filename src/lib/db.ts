import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
	connectionString
		? { connectionString, ssl: { rejectUnauthorized: false } }
		: {
				host: process.env.DB_HOST || "108.181.153.87",
				database: process.env.DB_NAME || "store_db",
				user: process.env.DB_USER || "postgres",
				password: process.env.DB_PASSWORD || "Retail@1234",
				port: Number(process.env.DB_PORT) || 5432,
				// Only use SSL when explicitly requested (e.g. on cloud-hosted DBs)
				...(process.env.DB_SSL === "true"
					? { ssl: { rejectUnauthorized: false } }
					: {}),
			},
);

export async function query<T = any>(
	text: string,
	params?: any[],
): Promise<T[]> {
	const client = await pool.connect();
	try {
		const result = await client.query(text, params);
		return result.rows as T[];
	} finally {
		client.release();
	}
}

export async function queryOne<T = any>(
	text: string,
	params?: any[],
): Promise<T | null> {
	const rows = await query<T>(text, params);
	return rows[0] ?? null;
}

export default pool;
