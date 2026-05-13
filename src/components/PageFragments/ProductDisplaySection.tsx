"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiCheckCircle,
  FiX,
  FiShoppingCart,
  FiTag,
  FiZoomIn,
} from "react-icons/fi";
import { useCart } from "react-use-cart";
import Picture from "../picture/Picture";
import { useProduct } from "../lib/woocommerce";
import RelatedProductsSection from "./RelatedProductsSection";
import { Skeleton } from "@heroui/react";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Image from "next/image";
import ProductTable from "../Tables/ProductTable";

interface ProductDisplaySectionProps {
  FormatedId?: string;
}

/* ═══════════════════════════════════════════════════════════
   CART PANEL
   • Desktop (md+) → centred scale-in modal
   • Mobile        → bottom sheet slides up from screen edge
   Portal-rendered; Tailwind-only; no rc-drawer.
═══════════════════════════════════════════════════════════ */
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Header shared by both the mobile sheet and the desktop modal */
const CartPanelHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
        <FiShoppingCart className="w-4 h-4 text-white" />
      </div>
      <div>
        <h2 className="text-base font-black text-slate-900 tracking-tight">
          Your Cart
        </h2>
        <p className="text-[11px] text-slate-400 font-medium">
          Review your items before checkout
        </p>
      </div>
    </div>
    <button
      onClick={onClose}
      aria-label="Close cart"
      className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 active:scale-90"
    >
      <FiX className="w-4 h-4" />
    </button>
  </div>
);

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Hydration guard — portal needs the DOM */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scroll-lock on open; delayed unmount so exit animation completes */
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const t = setTimeout(() => setVisible(false), 350);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!mounted || !visible) return null;

  return createPortal(
    <>
      {/* ── Shared backdrop ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm transition-opacity duration-350 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── MOBILE: bottom sheet ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        md:hidden fixed bottom-0 left-0 right-0 z-[999]
        flex flex-col bg-white rounded-t-3xl
        shadow-[0_-8px_40px_rgba(0,0,0,0.18)]
        max-h-[90dvh]
        transform-gpu will-change-transform
        transition-all duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isOpen ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"}
    `}
      >
        {/* Drag handle pill */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-slate-800 via-primary-100 to-slate-800 flex-shrink-0" />
        <CartPanelHeader onClose={onClose} />
        <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
          <ProductTable onClose={onClose} />
        </div>
      </div>

      {/* ── DESKTOP: centred modal ── */}
      <div className="hidden md:flex fixed inset-0 z-[999] items-center justify-center p-6 pointer-events-none">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            pointer-events-auto
            relative w-full max-w-2xl max-h-[88vh]
            flex flex-col bg-white rounded-3xl
            shadow-[0_32px_80px_rgba(0,0,0,0.24)]
            overflow-hidden
            transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)]
            ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
          `}
        >
          <div className="h-1 w-full bg-gradient-to-r from-slate-800 via-primary-100 to-slate-800 flex-shrink-0" />
          <CartPanelHeader onClose={onClose} />
          <div className="flex-1 overflow-y-auto min-h-0">
            <ProductTable onClose={onClose} />
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

/* ═══════════════════════════════════════════════════════════
   LOADING SKELETON
   Mirrors the two-column layout so there's no layout shift.
═══════════════════════════════════════════════════════════ */
const ProductSkeleton = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left — image stack */}
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-3xl bg-gray-100 animate-pulse" />
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="w-20 h-20 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
      {/* Right — text blocks */}
      <div className="space-y-5 pt-2">
        <Skeleton className="h-3.5 w-24 rounded-full bg-gray-100 animate-pulse" />
        <Skeleton className="h-10 w-4/5 rounded-xl bg-gray-100 animate-pulse" />
        <Skeleton className="h-10 w-2/5 rounded-xl bg-gray-100 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-16 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
        <Skeleton className="h-14 w-full rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   TRUST BADGE
   Small icon + label tile used in the 3-column badge strip.
═══════════════════════════════════════════════════════════ */
const TrustBadge = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="group flex flex-col items-center justify-center gap-2.5 py-5 px-3 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 text-center cursor-default">
    <span className="text-xl text-slate-700 group-hover:scale-110 transition-transform duration-200">
      {icon}
    </span>
    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 leading-tight">
      {label}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SPEC PILL
   Renders a single product attribute as a pill chip.
═══════════════════════════════════════════════════════════ */
const SpecPill = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-col gap-1 px-4 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-100/60 transition-all duration-200">
    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
      {name}
    </span>
    <span className="text-sm font-bold text-slate-800 leading-snug">
      {value}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT — ProductDisplaySection
   All state, hooks, cart logic, and data fetching are
   identical to the original. Only JSX / Tailwind changed.
═══════════════════════════════════════════════════════════ */
const ProductDisplaySection = ({ FormatedId }: ProductDisplaySectionProps) => {
  /* ── State ── */
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoadingMainImage, setIsLoadingMainImage] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );

  /* ── Data ── */
  const { data: product, isLoading } = useProduct(FormatedId);
  const Product: ProductType = product;
  const pathname = usePathname();
  const { addItem, removeItem, updateItem, getItem } = useCart();

  /* ── Stable callbacks ── */
  const onOpenCart = useCallback(() => setIsCartOpen(true), []);
  const onCloseCart = useCallback(() => setIsCartOpen(false), []);

  /* ── Base URL (for share links, etc.) ── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  /* ── Discount % calculation ── */
  const discount = useMemo(() => {
    if (!Product?.regular_price || !Product?.price) return 0;
    const reg = parseInt(Product.regular_price);
    const sale = parseInt(Product.price);
    if (reg <= sale) return 0;
    return Math.round(((reg - sale) / reg) * 100);
  }, [Product]);

  /* ── Guards ── */
  if (isLoading) return <ProductSkeleton />;
  if (!Product) return null;

  /* ── Cart helpers (unchanged logic) ── */
  const ID = Product.id.toString();
  const price = parseInt(Product.price);
  const cartItem = getItem(ID);
  const qty = cartItem?.quantity || 0;
  const inStock = Product.stock_status === "instock";

  const increase = () =>
    addItem({
      id: ID,
      name: Product.name,
      price,
      quantity: qty + 1,
      image: Product.images[0]?.src,
    });

  const decrease = () =>
    qty <= 1 ? removeItem(ID) : updateItem(ID, { quantity: qty - 1 });

  /* ────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────── */
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
        {/* ══════════════════════════════════════════════════
            TOP GRID  —  Image gallery   |   Product info
        ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
          {/* ────────────────────────────
              LEFT — Sticky image gallery
          ──────────────────────────── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-8">
            {/* Main image container */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-[2rem] overflow-hidden border border-gray-100 group shadow-[0_4px_32px_rgba(0,0,0,0.07)]">
              {/* Discount badge — top left */}
              {discount > 0 && (
                <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-wide shadow-lg">
                  <FiTag className="w-3 h-3" />
                  SAVE {discount}%
                </div>
              )}

              {/* Stock status badge — top right */}
              <div
                className={`absolute top-5 right-5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-sm ${
                  inStock
                    ? "bg-green-50/90 text-green-700 border-green-100"
                    : "bg-red-50/90 text-red-500 border-red-100"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${inStock ? "bg-green-500 animate-pulse" : "bg-red-400"}`}
                />
                {inStock ? "In Stock" : "Out of Stock"}
              </div>

              {/* Zoom hint on hover */}
              <div className="absolute bottom-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                <FiZoomIn className="w-3 h-3" />
                Hover to zoom
              </div>

              {/* Product image */}
              <Image
                src={Product.images[selectedImage]?.src}
                alt={Product.name}
                width={1000}
                height={1000}
                priority
                onLoad={() => setIsLoadingMainImage(false)}
                className={`w-full h-full object-contain p-8 lg:p-12 transition-all duration-500 group-hover:scale-[1.05] ${
                  isLoadingMainImage
                    ? "opacity-30 scale-95"
                    : "opacity-100 scale-100"
                }`}
              />

              {/* Inner vignette ring */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/[0.04] pointer-events-none" />
            </div>

            {/* Thumbnail strip */}
            {Product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {Product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => {
                      setSelectedImage(index);
                      setIsLoadingMainImage(true);
                    }}
                    className={`relative flex-shrink-0 w-[70px] h-[70px] rounded-2xl border-2 overflow-hidden bg-white p-1.5 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-slate-900 shadow-md scale-105"
                        : "border-gray-100 hover:border-gray-300 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Picture
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ────────────────────────────
              RIGHT — Product information
          ──────────────────────────── */}
          <div className="flex flex-col">
            {/* ── Category breadcrumb + name + price ── */}
            <div className="pb-7 border-b border-gray-100">
              {/* Category chip */}
              {Product.categories[0]?.name && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: Product.categories[0].name,
                  }}
                  className="inline-block text-[10px] font-black uppercase tracking-[0.22em] text-slate-500 bg-gray-100 px-3 py-1.5 rounded-full mb-4"
                />
              )}

              {/* Product name */}
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight mb-5">
                {Product.name}
              </h1>

              {/* Price row */}
              <div className="flex items-end flex-wrap gap-3">
                <div className="flex flex-col">
                  {/* Strikethrough regular price */}
                  {Product.regular_price &&
                    parseInt(Product.regular_price) > price && (
                      <span className="text-sm text-gray-400 line-through font-medium mb-1">
                        <FormatMoney2 value={parseInt(Product.regular_price)} />
                      </span>
                    )}
                  {/* Sale / current price */}
                  <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    <FormatMoney2 value={price} />
                  </span>
                </div>

                {/* Discount % pill */}
                {discount > 0 && (
                  <span className="mb-1 text-xs font-black text-white bg-slate-900 px-3 py-1.5 rounded-full">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* ── Specifications grid ── */}
            {Product.attributes.length > 0 && (
              <div className="py-7 border-b border-gray-100">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400 mb-4">
                  Specifications
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {Product.attributes.map((attr) => (
                    <SpecPill
                      key={attr.id}
                      name={attr.name}
                      value={attr.options.join(", ")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Quantity selector + Add to Cart CTA ── */}
            <div className="py-7 border-b border-gray-100">
              {/* Qty label + stepper */}
              <div className="flex flex-wrap items-end gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400">
                    Quantity
                  </span>
                  {/* Stepper control */}
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-1 gap-1">
                    {/* Decrease */}
                    <button
                      onClick={decrease}
                      disabled={qty === 0}
                      className="w-11 h-11 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-500 hover:text-red-500 hover:shadow-md transition-all duration-150 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <AiOutlineMinus className="w-3.5 h-3.5" />
                    </button>

                    {/* Current qty */}
                    <span className="w-12 text-center text-base font-black text-slate-900 select-none">
                      {qty}
                    </span>

                    {/* Increase */}
                    <button
                      onClick={increase}
                      disabled={!inStock}
                      className="w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-xl shadow-md hover:bg-slate-700 transition-all duration-150 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <AiOutlinePlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={onOpenCart}
                  disabled={!inStock}
                  className={`
                    flex-1 min-w-[180px] h-[50px]
                    flex items-center justify-center gap-2.5
                    rounded-2xl font-black uppercase text-[11px] tracking-[0.18em]
                    transition-all duration-200
                    ${
                      inStock
                        ? "bg-slate-900 text-white hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-none"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                  {qty > 0 ? "View in Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Out-of-stock notice */}
              {!inStock && (
                <p className="text-[11px] text-red-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 animate-pulse" />
                  This product is currently unavailable
                </p>
              )}
            </div>

            {/* ── Trust badge strip ── */}
            <div className="pt-7 grid grid-cols-3 gap-3">
              <TrustBadge icon={<FiShield />} label="Secure Payment" />
              <TrustBadge icon={<FiTruck />} label="Fast Shipping" />
              <TrustBadge icon={<FiRefreshCw />} label="Easy Returns" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            DESCRIPTION / REVIEWS — Tab section
        ══════════════════════════════════════════════════ */}
        <div className="mt-20 lg:mt-28">
          {/* Tab bar */}
          <div className="flex items-end gap-1 border-b border-gray-100 mb-10">
            {(["description", "reviews"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative pb-4 px-1 mr-7
                    text-[11px] font-black uppercase tracking-[0.18em]
                    transition-colors duration-200
                    ${isActive ? "text-slate-900" : "text-gray-400 hover:text-gray-600"}
                  `}
                >
                  {tab === "reviews"
                    ? `Reviews (${Product.rating_count})`
                    : tab}

                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === "description" ? (
            <div
              className="text-sm sm:text-base text-slate-600 leading-[1.85] max-w-4xl prose prose-slate"
              dangerouslySetInnerHTML={{ __html: Product.description }}
            />
          ) : (
            <div className="max-w-4xl">
              {Product.rating_count > 0 ? (
                <p className="text-sm text-slate-500">
                  This product has {Product.rating_count} review
                  {Product.rating_count !== 1 ? "s" : ""}.
                </p>
              ) : (
                /* Empty reviews state */
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                  <span className="text-5xl opacity-10 select-none">★</span>
                  <p className="text-sm font-black uppercase tracking-widest text-gray-300">
                    No reviews yet
                  </p>
                  <p className="text-xs text-gray-300">
                    Be the first to share your experience.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        <RelatedProductsSection
          productCategoryId={Product.categories[0]?.id.toString()}
        />
      </section>

      {/* ── Cart modal: desktop = centred modal, mobile = bottom sheet ── */}
      <CartModal isOpen={isCartOpen} onClose={onCloseCart} />
    </>
  );
};

export default ProductDisplaySection;
