/**
 * MobileNav.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium dark mobile navigation drawer.
 *
 * Design direction: Dark luxury / editorial retail
 *  • Deep charcoal panel slides in from the left over a frosted backdrop.
 *  • Staggered list reveals give the panel a choreographed feel on open.
 *  • Active category / nav items highlighted with a left accent bar.
 *  • Pill-style tab switcher with an animated sliding indicator.
 *  • Gradient accent line at the top of the panel (brand colour continuity).
 *
 * Functional parity with original:
 *  ✔ "All Category" tab → WooCommerce categories (filters "uncategorized")
 *  ✔ "Others" tab       → headerNavLinks with pathname-based active state
 *  ✔ Category click     → router.push to /category/<slug>-<id>
 *  ✔ Close on backdrop click OR close button
 *  ✔ AnimatePresence exit animation (slides back out left)
 *
 * rc-drawer removed — Framer Motion handles the entire drawer lifecycle,
 * giving us complete styling control with zero third-party CSS overrides.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";
import { TbLayoutGrid } from "react-icons/tb";
import { RiMenuUnfoldLine } from "react-icons/ri";
import Link from "next/link";
import { convertToSlug, headerNavLinks } from "@constants";
import { usePathname, useRouter } from "next/navigation";
import { useCategories } from "../lib/woocommerce";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface MobileNavProps {
  closeDrawer: () => void;
  drawerVisible: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────────────────────────────────────── */

/** Drawer panel: slides in/out from the left */
const panelVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] } },
  exit: {
    x: "-100%",
    transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
  },
};

/** Backdrop: fades in/out */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.28 } },
};

/**
 * Staggered list container — each child gets a cascading reveal.
 * `staggerChildren` applies only when the panel is opening.
 */
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
  exit: {},
};

/** Individual list item reveal */
const variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const MobileNav: React.FC<MobileNavProps> = ({
  closeDrawer,
  drawerVisible,
}) => {
  /* ── Data ─────────────────────────────────────────────────────────────── */
  const { data: categories, isLoading: categoryWpIsLoading } =
    useCategories("");
  const Categories: CategoryType[] = categories || [];

  /* ── State ────────────────────────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState<"allCategory" | "others">(
    "allCategory",
  );
  const pathname = usePathname();
  const router = useRouter();

  /* ── Lock body scroll while drawer is open ────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = drawerVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerVisible]);

  /* ── Handlers ─────────────────────────────────────────────────────────── */
  const handleCategoryClick = (item: CategoryType) => {
    router.push(`/category/${convertToSlug(item.name)}-${item.id}`);
    closeDrawer();
  };

  /* ── Filtered categories (no "uncategorized") ─────────────────────────── */
  const filteredCategories = Categories.filter(
    (item) => item.name.toLowerCase() !== "uncategorized",
  );

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {drawerVisible && (
        /*
         * Portal layer — fixed, full-screen, z-[999] ensures it sits above
         * the header and all page content.
         */
        <div className="fixed inset-0 z-[999] flex">
          {/* ── Backdrop ─────────────────────────────────────────────────
              Semi-transparent dark overlay; clicking it closes the drawer.
          ────────────────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* ── Drawer Panel ──────────────────────────────────────────────
              Dark charcoal panel, max-w-[320px] keeps it feeling native
              on phones while leaving content visible on the right.
          ────────────────────────────────────────────────────────────── */}
          <motion.aside
            key="panel"
            //@ts-ignore
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex flex-col w-[85vw] max-w-[320px] h-full bg-[#111317] shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* ── Top gradient accent line ──────────────────────────────
                Matches the brand colour continuity seen across the project.
            ────────────────────────────────────────────────────────── */}
            <div
              className="absolute top-0 left-0 w-full h-[3px] z-10"
              style={{
                background:
                  "linear-gradient(to right, #E8201A, #ff6b35, #E8201A)",
              }}
              aria-hidden="true"
            />

            {/* ── Panel Header ─────────────────────────────────────────
                Brand wordmark on the left, close button on the right.
            ────────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 pt-8 pb-6">
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-black text-xl tracking-tight leading-none">
                  SHOP
                </span>
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#E8201A" }}
                >
                  Navigate
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={closeDrawer}
                className="
                  w-9 h-9 rounded-full
                  flex items-center justify-center
                  bg-white/10 hover:bg-white/20
                  text-white
                  transition-colors duration-200
                "
                aria-label="Close navigation"
              >
                <IoMdClose size={18} />
              </button>
            </div>

            {/* ── Tab Switcher ──────────────────────────────────────────
                Pill-style tabs with a sliding white indicator behind the
                active label. Pure Framer Motion layoutId handles the slide.
            ────────────────────────────────────────────────────────── */}
            <div className="px-6 mb-6">
              <div className="relative flex items-center bg-white/[0.07] rounded-xl p-1 gap-1">
                {(["allCategory", "others"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative flex-1 flex items-center justify-center gap-1.5 z-10 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-200"
                    style={{
                      color:
                        activeTab === tab ? "#111317" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {/* Animated pill indicator */}
                    {activeTab === tab && (
                      <motion.span
                        layoutId="tabIndicator"
                        className="absolute inset-0 bg-white rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}

                    {/* Tab icon + label */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {tab === "allCategory" ? (
                        <TbLayoutGrid size={13} />
                      ) : (
                        <RiMenuUnfoldLine size={13} />
                      )}
                      {tab === "allCategory" ? "Categories" : "Navigation"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Scrollable content area ───────────────────────────────
                `overflow-y-auto` + `flex-1` lets the list scroll when
                it overflows on short devices, without the header moving.
            ────────────────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-none">
              {/* ══════════════════════════════════════════════════════
                  TAB 1 · All Categories
              ══════════════════════════════════════════════════════ */}
              <AnimatePresence mode="wait">
                {activeTab === "allCategory" && (
                  <motion.ul
                    key="categories"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-1"
                    role="list"
                  >
                    {/* Section label */}
                    <motion.li variants={{variants}}>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 px-3 mb-3">
                        All Categories
                      </p>
                    </motion.li>
                    {/* Loading skeleton */}
                    {categoryWpIsLoading && (
                      <>
                        {[1, 2, 3, 4].map((i) => (
                          <motion.li key={i} variants={{variants}}>
                            <div className="h-12 rounded-xl bg-white/[0.05] animate-pulse mx-1" />
                          </motion.li>
                        ))}
                      </>
                    )}
                    {/* Category items */}
                    {!categoryWpIsLoading &&
                      filteredCategories.map((item, index) => (
                        //@ts-ignore
                        <motion.li key={item.id} variants={variants}>
                          <button
                            onClick={() => handleCategoryClick(item)}
                            className="
                              group w-full flex items-center justify-between
                              px-3 py-3.5 rounded-xl
                              text-left
                              hover:bg-white/[0.07]
                              transition-colors duration-150
                            "
                          >
                            {/* Index number + name */}
                            <div className="flex items-center gap-3">
                              <span
                                className="text-[10px] font-bold tabular-nums w-5 text-right shrink-0"
                                style={{ color: "#E8201A" }}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span
                                className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors"
                                dangerouslySetInnerHTML={{ __html: item.name }}
                              />
                            </div>

                            {/* Chevron */}
                            <HiChevronRight
                              size={15}
                              className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-150 shrink-0"
                            />
                          </button>
                        </motion.li>
                      ))}
                    {/* Empty state */}
                    {!categoryWpIsLoading &&
                      filteredCategories.length === 0 && (
                        //@ts-ignore
                        <motion.li variants={variants}>
                          <p className="text-sm text-white/30 text-center py-8">
                            No categories found
                          </p>
                        </motion.li>
                      )}
                  </motion.ul>
                )}

                {/* ══════════════════════════════════════════════════════
                    TAB 2 · Navigation Links  (Others)
                ══════════════════════════════════════════════════════ */}
                {activeTab === "others" && (
                  <motion.ul
                    key="navlinks"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-1"
                    role="list"
                  >
                    {/* Section label */}
                    
                    <motion.li variants={{variants}}>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 px-3 mb-3">
                        Pages
                      </p>
                    </motion.li>
                    {headerNavLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        //@ts-ignore
                        <motion.li key={link.id} variants={variants}>
                          <Link
                            href={link.href}
                            onClick={closeDrawer}
                            className={`
                              group flex items-center justify-between
                              px-3 py-3.5 rounded-xl
                              transition-colors duration-150
                              ${
                                isActive
                                  ? "bg-white/[0.08]"
                                  : "hover:bg-white/[0.05]"
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              {/*
                               * Active indicator bar — left red bar replaces the
                               * underline from the original design, which doesn't
                               * work well inside a dark panel.
                               */}
                              <span
                                className="w-1 h-5 rounded-full shrink-0 transition-colors duration-150"
                                style={{
                                  background: isActive
                                    ? "#E8201A"
                                    : "rgba(255,255,255,0.1)",
                                }}
                              />
                              <span
                                className={`
                                  text-sm font-semibold transition-colors duration-150
                                  ${isActive ? "text-white" : "text-white/60 group-hover:text-white/90"}
                                `}
                              >
                                {link.text}
                              </span>
                            </div>

                            <HiChevronRight
                              size={15}
                              className={`
                                transition-all duration-150 shrink-0
                                ${
                                  isActive
                                    ? "text-white/50"
                                    : "text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5"
                                }
                              `}
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* ── Panel Footer ──────────────────────────────────────────
                Subtle version / brand note at the bottom of the drawer.
            ────────────────────────────────────────────────────────── */}
            <div className="px-6 py-4 border-t border-white/[0.06]">
              <p className="text-[10px] text-white/20 font-medium tracking-wider uppercase text-center">
                Top Notch Accessories
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
