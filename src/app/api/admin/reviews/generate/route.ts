import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { requireAdmin } from "../../_lib/requireAdmin";
import { T } from "@src/lib/tables";

const FIRST_NAMES = [
  "Chidi", "Ngozi", "Emeka", "Amina", "Tunde", "Funke", "Seun", "Ade",
  "Blessing", "Victor", "Grace", "Samuel", "Chioma", "Uche", "Taiwo",
  "Kemi", "Bola", "Femi", "Yemi", "Sola", "Tobi", "Nkem", "Obinna",
  "James", "Sarah", "Michael", "Jennifer", "David", "Lisa", "Daniel",
  "Fatima", "Ibrahim", "Musa", "Aisha", "Hauwa", "Zainab", "Abdullahi",
  "Oluwaseun", "Adaeze", "Chinonso", "Uchenna", "Ifeoma", "Chukwuemeka",
];

const LAST_NAMES = [
  "Okafor", "Adeyemi", "Nwosu", "Ibrahim", "Bello", "Okonkwo", "Adesanya",
  "Chukwu", "Eze", "Obi", "Nwachukwu", "Adeleke", "Abubakar", "Musa",
  "Olatunji", "Taiwo", "Bakare", "Ola", "Dada", "Olawale", "Akintola",
  "Johnson", "Williams", "Brown", "Davis", "Wilson", "Moore", "Taylor",
  "Uzoma", "Ikenna", "Obiora", "Nnamdi", "Chibuike", "Ekwueme",
];

const REVIEW_TEMPLATES = [
  // 5-star comments
  { rating: 5, comments: [
    "Absolutely love this product! Exceeded my expectations completely.",
    "Best purchase I've made in a long time. Quality is top-notch.",
    "Delivered exactly as described. Will definitely order again!",
    "Outstanding quality. My family loves it. Highly recommended!",
    "Perfect! Exactly what I needed. Fast delivery too.",
    "This is amazing. Worth every kobo. Very satisfied customer.",
    "Excellent product, great value for money. 100% satisfied.",
    "Superb quality! I've already recommended it to my friends.",
    "Truly impressed by the quality. Will be a repeat customer.",
    "Wonderful product. Works perfectly and looks great too!",
  ]},
  // 4-star comments
  { rating: 4, comments: [
    "Very good product. Minor packaging issue but overall great.",
    "Really happy with this purchase. Does exactly what it promises.",
    "Great quality, fast delivery. Slightly different from pictures but still good.",
    "Good value for money. Would recommend to others.",
    "Happy with the purchase. Small improvements could be made but solid overall.",
    "Nice product, works well. Delivery was prompt.",
    "Quality is good and it does the job well. Worth buying.",
    "Pretty satisfied with this. The product quality is solid.",
  ]},
  // 3-star comments
  { rating: 3, comments: [
    "Average product. Does the job but nothing spectacular.",
    "Decent quality for the price. Expected a little more.",
    "OK product. Not bad, not great. Delivery was fast though.",
    "It's fine. Works as expected but not exceptional.",
    "Acceptable quality. Might consider other options next time.",
  ]},
  // 2-star comments
  { rating: 2, comments: [
    "Below expectations. Product is okay but quality could be better.",
    "Not very impressed. Packaging was poor and quality average.",
    "Expected better for the price. Somewhat disappointed.",
  ]},
  // 1-star comments
  { rating: 1, comments: [
    "Very disappointed. Product does not match the description.",
    "Poor quality. Would not recommend.",
  ]},
];

// Weighted random rating: mostly 4s and 5s
function getWeightedRating(): number {
  const rand = Math.random();
  if (rand < 0.45) return 5;
  if (rand < 0.75) return 4;
  if (rand < 0.90) return 3;
  if (rand < 0.97) return 2;
  return 1;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReview() {
  const rating = getWeightedRating();
  const template = REVIEW_TEMPLATES.find((t) => t.rating === rating)!;
  const comment = randomItem(template.comments);
  const firstName = randomItem(FIRST_NAMES);
  const lastName = randomItem(LAST_NAMES);
  const reviewer = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}@gmail.com`;
  const verified = Math.random() > 0.3;

  // Random date within last 12 months
  const daysAgo = Math.floor(Math.random() * 365);
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

  return { reviewer, email, rating, comment, verified, createdAt };
}

// POST /api/admin/reviews/generate
export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const { product_ids, count = 5 } = body as { product_ids: number[]; count: number };

    if (!Array.isArray(product_ids) || product_ids.length === 0) {
      return NextResponse.json({ message: "product_ids array is required" }, { status: 400 });
    }

    const clampedCount = Math.min(200, Math.max(1, parseInt(count as any, 10)));
    let totalInserted = 0;

    for (const productId of product_ids) {
      const insertValues: any[][] = [];
      for (let i = 0; i < clampedCount; i++) {
        const r = generateReview();
        insertValues.push([productId, r.reviewer, r.email, r.rating, r.comment, r.verified, r.createdAt]);
      }

      // Batch insert
      for (const vals of insertValues) {
        await query(
          `INSERT INTO ${T.reviews} (product_id, reviewer, email, rating, comment, verified, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          vals,
        );
      }

      // Update product rating_count and average_rating
      await query(
        `UPDATE ${T.products}
         SET rating_count = (SELECT COUNT(*) FROM ${T.reviews} WHERE product_id = $1),
             average_rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM ${T.reviews} WHERE product_id = $1), 0),
             updated_at = NOW()
         WHERE id = $1`,
        [productId],
      );

      totalInserted += clampedCount;
    }

    return NextResponse.json({
      message: `Generated ${totalInserted} reviews across ${product_ids.length} product(s)`,
      total: totalInserted,
    });
  } catch (error) {
    console.error("Generate reviews error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
