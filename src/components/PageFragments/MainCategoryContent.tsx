"use client";
import React, { useEffect, useState } from "react";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import Link from "next/link";
import { convertToSlug } from "@constants";

/* ─────────────────────────────────────────────
   Add these keyframes to your global CSS /
   tailwind.config.js once:

   @keyframes shimmer {
     0%   { background-position: -200% 0; }
     100% { background-position:  200% 0; }
   }
   @keyframes orbPulse {
     0%,100% { opacity:0.8; transform:scale(1) translateX(-50%); }
     50%      { opacity:1;   transform:scale(1.15) translateX(-50%); }
   }
   @keyframes orbPulse2 {
     0%,100% { opacity:0.7; transform:scale(1); }
     50%      { opacity:1;   transform:scale(1.2); }
   }
   @keyframes blink {
     0%,100% { opacity:1; }
     50%      { opacity:0.2; }
   }
   @keyframes fadeInUp {
     from { opacity:0; transform:translateY(24px); }
     to   { opacity:1; transform:translateY(0); }
   }

   // tailwind.config.js → theme.extend.animation
   animation: {
     shimmer:   'shimmer 1.8s infinite',
     shimmerSlow:'shimmer 2.5s infinite',
     orbPulse:  'orbPulse 8s ease-in-out infinite',
     orbPulse2: 'orbPulse2 11s ease-in-out infinite reverse',
     blink:     'blink 2s ease-in-out infinite',
     fadeInUp:  'fadeInUp 0.5s ease both',
   }
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: "✦", label: "Free Returns" },
  { icon: "⬡", label: "Secure Payments" },
  { icon: "◈", label: "Worldwide Shipping" },
  { icon: "◉", label: "24/7 Support" },
];

const STATS = [
  { value: "500+", label: "Products" },
  { value: "40+", label: "Categories" },
  { value: "10k+", label: "Happy Clients" },
];

/* ─────────────────────────────────────────────
   Arrow icon
───────────────────────────────────────────── */
const ArrowIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

/* ─────────────────────────────────────────────
   Skeleton loading grid
───────────────────────────────────────────── */
const SkeletonGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 px-4 sm:px-6 pb-20 max-w-[1200px] mx-auto relative z-[1]">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#16161a] to-[#111114] overflow-hidden relative"
        style={{ aspectRatio: "3/4" }}
      >
        <div
          className="absolute inset-0 animate-shimmer bg-[length:200%_100%]"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
          }}
        />
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Category card
───────────────────────────────────────────── */
interface CardProps {
  id: string;
  name: string;
  image?: string | null;
  count?: number;
  delay?: number;
}

const CategoryCard: React.FC<CardProps> = ({
  id,
  name,
  image,
  count,
  delay = 0,
}) => (
  <Link
    href={`${"/category/" + convertToSlug(name) + "-" + id}`}
    className="
      group relative flex flex-col no-underline
      rounded-2xl overflow-hidden
      bg-[#16161a] border border-white/[0.07]
      cursor-pointer
      transition-[transform,border-color,box-shadow]
      duration-[350ms] ease-[cubic-bezier(.22,.68,0,1.2)]
      hover:-translate-y-1.5 hover:scale-[1.01]
      hover:border-[rgba(201,169,110,0.35)]
      hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,169,110,0.12),0_0_40px_rgba(201,169,110,0.18)]
      animate-fadeInUp
    "
    style={{ animationDelay: `${delay}s`, aspectRatio: "3/4" }}
  >
    {/* ── Image area ── */}
    <div className="flex-1 relative overflow-hidden">
      {image ? (
        <>
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(.22,.68,0,1.1)] group-hover:scale-[1.08]"
          />
          {/* gradient fade to card footer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,11,0.7)]" />
        </>
      ) : (
        /* placeholder */
        <div className="w-full h-full bg-gradient-to-br from-[#1a1a20] to-[#111114] flex items-center justify-center relative overflow-hidden">
          <span className="text-5xl opacity-[0.15] select-none">◈</span>
          <div
            className="absolute inset-0 animate-shimmerSlow bg-[length:200%_100%]"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, rgba(201,169,110,0.04) 50%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* item count badge */}
      {count !== undefined && (
        <span className="absolute top-3.5 left-3.5 z-[1] bg-[rgba(10,10,11,0.75)] backdrop-blur-sm border border-white/[0.07] rounded-full px-2.5 py-1 text-[11px] font-medium text-[#888480] tracking-[0.05em]">
          {count} items
        </span>
      )}
    </div>

    {/* ── Footer ── */}
    <div className="flex items-center justify-between gap-2 px-5 py-[18px] bg-[#16161a] border-t border-white/[0.07]">
      <span className="text-sm font-medium text-[#f0ece4] tracking-[0.01em] truncate">
        {name}
      </span>
      {/* animated arrow circle */}
      <span className="w-7 h-7 rounded-full border border-white/[0.07] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#B5182E] group-hover:border-[#B5182E] group-hover:rotate-45">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3 h-3 stroke-[#888480] transition-all duration-300 group-hover:stroke-[#0a0a0b]"
        >
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </span>
    </div>
  </Link>
);

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const MainCategoryContent = () => {
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: any = categories;

  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const filtered = categories
          ?.filter((c: CategoryType) => c?.count > 0)
          ?.slice(0, 5);

        if (!filtered?.length) return;

        const results = await Promise.all(
          filtered.map(async (category: CategoryType) => {
            const response = await WooCommerce.get(
              `products?category=${category.id}`,
            );
            return {
              categoryId: category.id,
              firstProductImage:
                response?.data.length > 0
                  ? (response.data[0]?.images[0]?.src ?? null)
                  : null,
            };
          }),
        );

        setCategoryProductsMap(
          results.reduce(
            (acc, r) => ({ ...acc, [r.categoryId]: r.firstProductImage }),
            {},
          ),
        );
      } catch (err) {
        console.error("Error fetching category products:", err);
      }
    };

    if (categories?.length) fetchCategoryProducts();
  }, [categories]);

  return (
    <div className="relative bg-[#fff] min-h-screen text-[#000] overflow-x-hidden w-[100%]">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative z-[1] px-6 pt-40 pb-[20px] text-center overflow-hidden">
        {/* Glowing orb — centre */}
        <div
          className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[90px] pointer-events-none animate-orbPulse"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22) 0%, transparent 70%)",
          }}
        />
        {/* Glowing orb — bottom right */}
        <div
          className="absolute -bottom-[60px] right-[10%] w-[300px] h-[300px] rounded-full blur-[90px] pointer-events-none animate-orbPulse2"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow pill */}
        <div className="relative z-[2] inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-[rgba(201,169,110,0.2)] bg-[rgba(201,169,110,0.08)] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B5182E]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B5182E] animate-blink" />
          Curated Collection
        </div>

        {/* Headline */}
        <h1 className="relative z-[2] font-serif text-[clamp(42px,7vw,88px)] font-semibold leading-[1.0] tracking-[-0.02em] mb-5">
          Shop by
          <br />
          <span
            className="not-italic text-[#B5182E]"
            
          >
            Category
          </span>
        </h1>

        {/* Subheading */}
        {/* <p className="relative z-[2] text-base font-light text-[#888480] max-w-[440px] mx-auto leading-[1.7]">
          Explore our carefully curated selection — from timeless essentials to
          the latest arrivals, there's something for every taste.
        </p> */}
      </section>

      {/* ══════════════════════════════════════
          TRUST BADGES
      ══════════════════════════════════════ */}
      <div className="relative z-[1] max-w-[1200px] mx-auto mb-8 px-4 sm:px-6 flex flex-wrap justify-center gap-3">
        {TRUST_ITEMS.map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-2 px-[18px] py-2 rounded-full border border-white/[0.07] bg-white/[0.025] text-[13px] text-[#888480] transition-all duration-300 hover:text-[#f0ece4] hover:border-[rgba(201,169,110,0.2)] cursor-default"
          >
            <span className="text-[#B5182E] text-[15px]">{t.icon}</span>
            {t.label}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════ */}
      <div className="relative z-[1] flex items-center gap-5 max-w-[900px] mx-auto mb-12 px-4 sm:px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#888480] whitespace-nowrap">
          All Categories
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      {/* ══════════════════════════════════════
          SKELETON LOADER
      ══════════════════════════════════════ */}
      {categoryWpIsLoading && <SkeletonGrid />}

      {/* ══════════════════════════════════════
          ERROR
      ══════════════════════════════════════ */}
      {categoryIsError && (
        <div className="relative z-[1] text-center px-6 py-16">
          <div className="text-[40px] mb-4 text-[#888480]">◈</div>
          <p className="text-base text-[#f0ece4] mb-2">
            Could not load categories
          </p>
          <p className="text-sm text-[#888480]">Please try again later.</p>
        </div>
      )}

      {/* ══════════════════════════════════════
          CATEGORY GRID
      ══════════════════════════════════════ */}
      {Categories && !categoryWpIsLoading && (
        <section className="relative z-[1] px-4 sm:px-6 pb-20 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Categories.map((data: any, i: any) => (
              <CategoryCard
                key={data.id}
                id={data.id.toString()}
                name={data.name}
                image={categoryProductsMap[data.id]}
                count={data.count}
                delay={i * 0.06}
              />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <div
        className="relative z-[1] max-w-[1152px] mx-4 sm:mx-auto mb-20 rounded-3xl border border-[rgba(201,169,110,0.2)] px-6 sm:px-10 py-14 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1610 0%, #16161a 60%)",
        }}
      >
        {/* glow blob */}
        <div
          className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
          }}
        />

        <p className="relative z-[1] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B5182E] mb-4">
          New Arrivals
        </p>
        <h2 className="relative z-[1] font-serif text-[clamp(28px,4vw,48px)] font-semibold leading-[1.1] text-[#f0ece4] mb-3">
          Discover What's
          <br />
          Trending Right Now
        </h2>
        <p className="relative z-[1] text-[15px] font-light text-[#888480] mb-8">
          Stay ahead of the curve with our freshest drops and seasonal picks.
        </p>
        <Link
          href="/new-arrivals"
          className="relative z-[1] inline-flex items-center gap-2 no-underline bg-[#B5182E] text-[#0a0a0b] font-semibold text-[14px] tracking-[0.04em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-[#B5182E]/80 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.4)]"
        >
          Shop New Arrivals
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
};

export default MainCategoryContent;
