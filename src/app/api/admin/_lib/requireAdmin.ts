import { NextRequest } from "next/server";
import { verifyToken } from "@src/lib/auth";

interface AdminPayload {
  id: number;
  role: string;
  email: string;
  username: string;
}

export async function requireAdmin(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get("ADMIN_ACCESS")?.value;
  if (!token) return null;
  const decoded = verifyToken<AdminPayload>(token);
  if (!decoded || decoded.role !== "admin") return null;
  return decoded;
}
