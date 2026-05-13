import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { hydrateProducts } from "@src/lib/productHelpers";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") || "20", 10)));
    const offset = (page - 1) * perPage;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const category = searchParams.get("category") || "";

    const conditions: string[] = [];
    const params: any[] = [];
    let pi = 1;

    if (search) {
      conditions.push(`(p.name ILIKE $${pi} OR p.sku ILIKE $${pi})`);
      params.push(`%${search}%`);
      pi++;
    }
    if (status) {
      conditions.push(`p.status = $${pi}`);
      params.push(status);
      pi++;
    }

    let joinClause = "";
    if (category) {
      joinClause = `JOIN ${T.productCategories} pc ON pc.product_id = p.id`;
      conditions.push(`pc.category_id = $${pi}`);
      params.push(parseInt(category, 10));
      pi++;
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countResult = await query(
      `SELECT COUNT(DISTINCT p.id) AS total FROM ${T.products} p ${joinClause} ${where}`,
      params,
    );
    const total = parseInt(countResult[0].total, 10);

    const rows = await query(
      `SELECT DISTINCT p.* FROM ${T.products} p ${joinClause} ${where}
       ORDER BY p.created_at DESC LIMIT $${pi} OFFSET $${pi + 1}`,
      [...params, perPage, offset],
    );

    const products = await hydrateProducts(rows);

    return NextResponse.json({
      products,
      total,
      page,
      pages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.error("Admin products list error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const {
      name,
      slug,
      sku = "",
      description = "",
      short_description = "",
      price,
      regular_price,
      sale_price = null,
      stock_status = "instock",
      stock_quantity = null,
      status = "publish",
      type = "simple",
      categories = [],
      images = [],
      attributes = [],
    } = body;

    if (!name || !price) {
      return NextResponse.json({ message: "Name and price are required" }, { status: 400 });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const product = await queryOne<any>(
      `INSERT INTO ${T.products}
       (name, slug, sku, description, short_description, price, regular_price, sale_price,
        stock_status, stock_quantity, status, type, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())
       RETURNING *`,
      [name, finalSlug, sku, description, short_description, price, regular_price || price, sale_price, stock_status, stock_quantity, status, type],
    );

    if (!product) throw new Error("Insert failed");

    if (images.length > 0) {
      await Promise.all(
        images.map((src: string, i: number) =>
          query(
            `INSERT INTO ${T.productImages} (product_id, src, name, alt, position) VALUES ($1,$2,$3,$4,$5)`,
            [product.id, src, name, name, i],
          ),
        ),
      );
    }

    if (categories.length > 0) {
      await Promise.all(
        categories.map((catId: number) =>
          query(
            `INSERT INTO ${T.productCategories} (product_id, category_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
            [product.id, catId],
          ),
        ),
      );
    }

    if (attributes.length > 0) {
      await Promise.all(
        attributes.map((attr: { name: string; options: string[] }, i: number) =>
          query(
            `INSERT INTO ${T.productAttributes} (product_id, name, options, position) VALUES ($1,$2,$3,$4)`,
            [product.id, attr.name, attr.options, i],
          ),
        ),
      );
    }

    const [hydrated] = await hydrateProducts([product]);
    return NextResponse.json(hydrated, { status: 201 });
  } catch (error) {
    console.error("Admin create product error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
