// "use client";

// import React from "react";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import { RiShoppingCart2Fill } from "react-icons/ri";
// import { useCart } from "react-use-cart";
// import Link from "next/link";
// import Picture from "../picture/Picture";
// import { FormatMoney2 } from "../Reusables/FormatMoney";
// import { convertToSlug } from "@constants";

// /* ─────────────────────────────────────────────────────────────────────────────
//    Props
// ───────────────────────────────────────────────────────────────────────────── */
// interface PopularProductCardProps {
//   id: string | number;
//   image: string;
//   oldAmount?: string;
//   newAmount: string;
//   description: string;
//   isNew?: boolean;
//   /** Small muted category label shown below the product name  e.g. "WIRELESS AUDIO" */
//   category?: string;
//   /** Star rating value  e.g. 4.0 */
//   rating?: number;
//   /** Number of reviews  e.g. 120 */
//   ratingCount?: number;
// }

// /* ─────────────────────────────────────────────────────────────────────────────
//    Component
// ───────────────────────────────────────────────────────────────────────────── */
// const PopularProductCard = ({
//   id,
//   image,
//   oldAmount,
//   newAmount,
//   description,
//   isNew,
//   category,
//   rating,
//   ratingCount,
// }: PopularProductCardProps) => {
//   const { addItem, removeItem, updateItem, getItem } = useCart();

//   /* ── Derived values ──────────────────────────────────────────────────────── */
//   const ID = id.toString();
//   const cartItem = getItem(ID);
//   const quantity = cartItem?.quantity || 0;
//   const price = parseInt(newAmount);
//   const slugDesc = convertToSlug(description);

//   /* ── Cart handlers ───────────────────────────────────────────────────────── */
//   const addToCart = () =>
//     addItem({ id: ID, name: description, price, quantity: 1, image });

//   const increase = () => updateItem(ID, { quantity: quantity + 1 });
//   const decrease = () => {
//     if (quantity <= 1) removeItem(ID);
//     else updateItem(ID, { quantity: quantity - 1 });
//   };

//   /* ── Render ──────────────────────────────────────────────────────────────── */
//   return (
//     <div
//       className="group relative flex flex-col w-full bg-[#0e0e0e] overflow-hidden"
//       style={{ borderRadius: "2px" }}
//     >
//       {/* ═══════════════════════════════════════════════════════════════════
//           IMAGE AREA — full-bleed, fixed aspect ratio
//           Dark background lets product photography breathe.
//       ═══════════════════════════════════════════════════════════════════ */}
//       <Link
//         href={`/home-item/product/${slugDesc}-${id}`}
//         className="relative block w-full overflow-hidden"
//         style={{ paddingBottom: "75%" /* 4:3 ratio */ }}
//         aria-label={description}
//       >
//         {/* Product image */}
//         <Picture
//           src={image}
//           alt={description}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//         />

//         {/* Subtle gradient overlay at the bottom — helps text pop */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 50%)",
//           }}
//         />

//         {/* NEW RELEASE badge — top right, matching the Figma pill */}
//         {isNew && (
//           <span
//             className="absolute top-3 right-3 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1"
//             style={{
//               background: "#F2CA50",
//               color: "#0e0e0e",
//               letterSpacing: "0.12em",
//             }}
//           >
//             New Release
//           </span>
//         )}
//       </Link>

//       {/* ═══════════════════════════════════════════════════════════════════
//           CONTENT AREA
//           Editorial: generous left-aligned text, gold accent price.
//       ═══════════════════════════════════════════════════════════════════ */}
//       <div className="flex flex-col px-4 pt-3 pb-4 gap-0.5">
//         {/* ── Product name ──────────────────────────────────────────────── */}
//         <Link
//           href={`/home-item/product/${slugDesc}-${id}`}
//           className="block text-[15px] font-semibold leading-snug line-clamp-2 transition-opacity duration-200 group-hover:opacity-80"
//           style={{
//             color: "#E8E6E0",
//             fontFamily: "'Playfair Display', Georgia, serif",
//             letterSpacing: "-0.01em",
//           }}
//           dangerouslySetInnerHTML={{ __html: description }}
//         />

//         {/* ── Category + price row ──────────────────────────────────────── */}
//         <div className="flex items-center gap-1.5 mt-0.5">
//           {category && (
//             <>
//               <span
//                 className="text-[10px] font-medium uppercase tracking-[0.12em]"
//                 style={{ color: "#6b6b6b" }}
//               >
//                 {category}
//               </span>
//               <span style={{ color: "#3a3a3a", fontSize: "10px" }}>—</span>
//             </>
//           )}
//           {/* Gold price — matching Figma */}
//           <span
//             className="text-[11px] font-semibold tracking-wide"
//             style={{ color: "#F2CA50" }}
//           >
//             {price ? <FormatMoney2 value={price} /> : "N/A"}
//           </span>
//           {oldAmount && (
//             <span
//               className="text-[10px] line-through"
//               style={{ color: "#4a4a4a" }}
//             >
//               <FormatMoney2 value={parseInt(oldAmount)} />
//             </span>
//           )}
//         </div>

//         {/* ── Star rating (optional) ────────────────────────────────────── */}
//         {rating !== undefined && (
//           <div className="flex items-center gap-1 mt-0.5">
//             <svg
//               className="w-3 h-3 shrink-0"
//               viewBox="0 0 20 20"
//               aria-hidden="true"
//               style={{ fill: "#F2CA50" }}
//             >
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
//             </svg>
//             <span
//               className="text-[10px] font-medium leading-none"
//               style={{ color: "#6b6b6b" }}
//             >
//               {rating.toFixed(1)}
//               {ratingCount !== undefined && (
//                 <span className="ml-0.5">({ratingCount})</span>
//               )}
//             </span>
//           </div>
//         )}

//         {/* ── Cart CTA ──────────────────────────────────────────────────── */}
//         <div className="flex items-center justify-end mt-3">
//           {quantity === 0 ? (
//             /*
//              * ADD BUTTON
//              * Ghost outline pill that fills on hover — refined, not noisy.
//              */
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 addToCart();
//               }}
//               className="flex bg-black shadow-lg   text-white items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase px-4 py-2 transition-all duration-200"
//               style={{
//                 color: "#fff",
//                 letterSpacing: "0.1em",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLButtonElement).style.background =
//                   "#fff";
//                 (e.currentTarget as HTMLButtonElement).style.color = "#0e0e0e";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLButtonElement).style.background =
//                   "transparent";
//                 (e.currentTarget as HTMLButtonElement).style.color = "#fff";
//               }}
//               aria-label="Add to cart"
//             >
//               <RiShoppingCart2Fill fill="white" size={12} />
//               Add to cart
//             </button>
//           ) : (
//             /*
//              * INLINE QUANTITY STEPPER
//              * Dark pill stepper that matches the card's dark theme.
//              */
//             <div
//               className="flex items-center gap-1 px-1 py-1"
//               style={{ border: "1px solid #2a2a2a", background: "#1a1a1a" }}
//             >
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   decrease();
//                 }}
//                 className="w-7 h-7 flex items-center justify-center transition-colors duration-150"
//                 style={{ background: "#222", color: "#999" }}
//                 onMouseEnter={(e) =>
//                   ((e.currentTarget as HTMLButtonElement).style.background =
//                     "#2a2a2a")
//                 }
//                 onMouseLeave={(e) =>
//                   ((e.currentTarget as HTMLButtonElement).style.background =
//                     "#222")
//                 }
//                 aria-label="Decrease quantity"
//               >
//                 <AiOutlineMinus size={11} />
//               </button>

//               <span
//                 className="w-6 text-center text-xs font-bold select-none"
//                 style={{ color: "#E8E6E0" }}
//               >
//                 {quantity}
//               </span>

//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   increase();
//                 }}
//                 className="w-7 h-7 flex items-center justify-center transition-colors duration-150"
//                 style={{ background: "#F2CA50", color: "#0e0e0e" }}
//                 onMouseEnter={(e) =>
//                   ((e.currentTarget as HTMLButtonElement).style.background =
//                     "#d4ae40")
//                 }
//                 onMouseLeave={(e) =>
//                   ((e.currentTarget as HTMLButtonElement).style.background =
//                     "#F2CA50")
//                 }
//                 aria-label="Increase quantity"
//               >
//                 <AiOutlinePlus size={11} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularProductCard;

"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface PopularProductCardProps {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  category?: string;
  rating?: number;
  ratingCount?: number;
}

const PopularProductCard = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  category,
}: PopularProductCardProps) => {
  const { addItem, removeItem, updateItem, getItem } = useCart();

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;

  const price = parseInt(newAmount || "0");

  const slugDesc = convertToSlug(description);

  const addToCart = () => {
    addItem({
      id: ID,
      name: description,
      price,
      image,
      quantity: 1,
    });
  };

  const increase = () => {
    updateItem(ID, {
      quantity: quantity + 1,
    });
  };

  const decrease = () => {
    if (quantity <= 1) {
      removeItem(ID);
    } else {
      updateItem(ID, {
        quantity: quantity - 1,
      });
    }
  };

  return (
    <div className="group bg-[#F4F4F2] rounded-[28px] p-3 md:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* IMAGE */}
      <Link href={`/home-item/product/${slugDesc}-${id}`} className="block">
        <div className="relative overflow-hidden rounded-[24px] bg-white aspect-[1/0.9]">
          <Picture
            src={image}
            alt={description}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="pt-4 px-1">
        {/* CATEGORY */}
        {category && (
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#C64B57] font-semibold mb-1">
            {category}
          </p>
        )}

        {/* TITLE */}
        <Link href={`/home-item/product/${slugDesc}-${id}`}>
          <h3 className="font-semibold text-[#1B1B1B] text-lg md:text-xl leading-tight line-clamp-2 hover:opacity-70 transition-opacity">
            {description}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-[#777] text-sm leading-relaxed mt-2 line-clamp-2">
          Premium engineered product designed for modern performance and
          reliability.
        </p>

        {/* PRICE + ACTION */}
        <div className="flex items-end justify-between mt-5">
          <div className="flex flex-col">
            <span className="text-[#D83A52] font-bold text-xl">
              {price ? <FormatMoney2 value={price} /> : "N/A"}
            </span>

            {oldAmount && (
              <span className="text-gray-400 text-sm line-through">
                <FormatMoney2 value={parseInt(oldAmount)} />
              </span>
            )}
          </div>

          {/* CART */}
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="w-11 h-11 rounded-full bg-[#C61F3A] hover:bg-[#a81930] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <RiShoppingCart2Line size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-sm border border-gray-200">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  decrease();
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <AiOutlineMinus size={12} />
              </button>

              <span className="text-sm font-semibold min-w-[20px] text-center">
                {quantity}
              </span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  increase();
                }}
                className="w-8 h-8 rounded-full bg-[#C61F3A] hover:bg-[#a81930] text-white flex items-center justify-center transition"
              >
                <AiOutlinePlus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularProductCard;
