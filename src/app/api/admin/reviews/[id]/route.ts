import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

// DELETE /api/admin/reviews/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    const review = await queryOne<any>(
      `DELETE FROM ${T.reviews} WHERE id = $1 RETURNING product_id`,
      [id],
    );

    if (!review) return NextResponse.json({ message: "Review not found" }, { status: 404 });

    // Recalculate product rating_count and average_rating
    await query(
      `UPDATE ${T.products}
       SET rating_count = (SELECT COUNT(*) FROM ${T.reviews} WHERE product_id = $1),
           average_rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM ${T.reviews} WHERE product_id = $1), 0),
           updated_at = NOW()
       WHERE id = $1`,
      [review.product_id],
    );

    return NextResponse.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Delete review error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
