import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { hydrateProducts } from "@src/lib/productHelpers";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const product = await queryOne<any>(`SELECT * FROM ${T.products} WHERE id = $1`, [parseInt(id, 10)]);
  if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const [hydrated] = await hydrateProducts([product]);
  return NextResponse.json(hydrated);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const productId = parseInt(id, 10);

  try {
    const body = await req.json();
    const {
      name,
      slug,
      sku,
      description,
      short_description,
      price,
      regular_price,
      sale_price,
      stock_status,
      stock_quantity,
      status,
      type,
      categories,
      images,
      attributes,
    } = body;

    const existing = await queryOne<any>(`SELECT id FROM ${T.products} WHERE id = $1`, [productId]);
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const finalSlug = slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined);

    await query(
      `UPDATE ${T.products} SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        sku = COALESCE($3, sku),
        description = COALESCE($4, description),
        short_description = COALESCE($5, short_description),
        price = COALESCE($6, price),
        regular_price = COALESCE($7, regular_price),
        sale_price = $8,
        stock_status = COALESCE($9, stock_status),
        stock_quantity = COALESCE($10, stock_quantity),
        status = COALESCE($11, status),
        type = COALESCE($12, type),
        updated_at = NOW()
       WHERE id = $13`,
      [name, finalSlug, sku, description, short_description, price, regular_price, sale_price ?? null, stock_status, stock_quantity, status, type, productId],
    );

    if (images !== undefined) {
      await query(`DELETE FROM ${T.productImages} WHERE product_id = $1`, [productId]);
      if (images.length > 0) {
        await Promise.all(
          images.map((src: string, i: number) =>
            query(
              `INSERT INTO ${T.productImages} (product_id, src, name, alt, position) VALUES ($1,$2,$3,$4,$5)`,
              [productId, src, name || "", name || "", i],
            ),
          ),
        );
      }
    }

    if (categories !== undefined) {
      await query(`DELETE FROM ${T.productCategories} WHERE product_id = $1`, [productId]);
      if (categories.length > 0) {
        await Promise.all(
          categories.map((catId: number) =>
            query(
              `INSERT INTO ${T.productCategories} (product_id, category_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
              [productId, catId],
            ),
          ),
        );
      }
    }

    if (attributes !== undefined) {
      await query(`DELETE FROM ${T.productAttributes} WHERE product_id = $1`, [productId]);
      if (attributes.length > 0) {
        await Promise.all(
          attributes.map((attr: { name: string; options: string[] }, i: number) =>
            query(
              `INSERT INTO ${T.productAttributes} (product_id, name, options, position) VALUES ($1,$2,$3,$4)`,
              [productId, attr.name, attr.options, i],
            ),
          ),
        );
      }
    }

    const updated = await queryOne<any>(`SELECT * FROM ${T.products} WHERE id = $1`, [productId]);
    const [hydrated] = await hydrateProducts([updated]);
    return NextResponse.json(hydrated);
  } catch (error) {
    console.error("Admin update product error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const productId = parseInt(id, 10);

  const existing = await queryOne<any>(`SELECT id FROM ${T.products} WHERE id = $1`, [productId]);
  if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

  await query(`UPDATE ${T.products} SET status = 'trash', updated_at = NOW() WHERE id = $1`, [productId]);
  return NextResponse.json({ message: "Product deleted" });
}
