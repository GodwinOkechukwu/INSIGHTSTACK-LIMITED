import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { T } from "@src/lib/tables";

// GET /api/products/[id]/reviews
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("per_page") || "10", 10)));
    const offset = (page - 1) * perPage;

    const countRows = await query(
      `SELECT COUNT(*) AS total FROM ${T.reviews} WHERE product_id = $1`,
      [productId],
    );
    const total = parseInt(countRows[0].total, 10);

    const reviews = await query(
      `SELECT id, reviewer, rating, comment, verified, created_at
       FROM ${T.reviews}
       WHERE product_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [productId, perPage, offset],
    );

    const statsRows = await query(
      `SELECT
         ROUND(AVG(rating)::numeric, 2) AS average,
         COUNT(*) AS total,
         SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS five,
         SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) AS four,
         SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS three,
         SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) AS two,
         SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) AS one
       FROM ${T.reviews}
       WHERE product_id = $1`,
      [productId],
    );

    const stats = statsRows[0];

    return NextResponse.json({
      reviews,
      total,
      page,
      pages: Math.ceil(total / perPage),
      stats: {
        average: parseFloat(stats.average) || 0,
        total: parseInt(stats.total, 10),
        distribution: {
          5: parseInt(stats.five, 10),
          4: parseInt(stats.four, 10),
          3: parseInt(stats.three, 10),
          2: parseInt(stats.two, 10),
          1: parseInt(stats.one, 10),
        },
      },
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
