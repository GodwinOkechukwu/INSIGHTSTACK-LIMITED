"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiShoppingBagFill } from "react-icons/ri";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  boxShadow?: boolean;
}

const ProductCard2 = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  boxShadow = true,
}: ProductCard2Props) => {
  const { addItem, removeItem, updateItem, getItem } = useCart();

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

  // Calculate Discount Percentage
  const discount = oldAmount
    ? Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
    : 0;

  const addToCart = () => {
    addItem({ id: ID, name: description, price, quantity: 1, image });
  };

  const increase = () => updateItem(ID, { quantity: quantity + 1 });
  const decrease = () => {
    if (quantity <= 1) removeItem(ID);
    else updateItem(ID, { quantity: quantity - 1 });
  };

  return (
    <div
      className={`group relative flex flex-col w-[340px]  lg:w-[220px] rounded-xl bg-white overflow-hidden ${
        boxShadow ? "shadow-sm" : "border border-gray-200"
      }`}
    >
      {/* Image */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative aspect-square w-full bg-gray-100 flex items-center justify-center"
      >
        <Picture
          src={image}
          alt={description}
          className="object-contain w-[90%] h-[90%]"
        />

        {/* Discount Badge (UNCHANGED) */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col p-3 gap-2">
        {/* Title */}
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="text-sm font-medium text-gray-800 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Price + Buy row */}
        {price > 0 && (
          <div className="flex items-center justify-between gap-2 mt-1">
            {/* Price */}
            <div className="flex flex-col">
              {oldAmount && (
                <span className="text-xs line-through text-gray-400">
                  <FormatMoney2 value={parseInt(oldAmount)} />
                </span>
              )}
              <span className="text-black font-bold text-sm">
                {price ? <FormatMoney2 value={price} /> : "N/A"}
              </span>
            </div>

            {/* Buy / Quantity */}
            {quantity === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart();
                }}
                className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-900 transition"
              >
                Buy
              </button>
            ) : (
              <div className="flex items-center gap-2 border rounded-md px-1 py-0.5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    decrease();
                  }}
                  className="size-6 flex items-center justify-center rounded bg-gray-100"
                >
                  <AiOutlineMinus size={12} />
                </button>

                <span className="text-xs font-bold">{quantity}</span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    increase();
                  }}
                  className="size-6 flex items-center justify-center rounded bg-black text-white"
                >
                  <AiOutlinePlus size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none" />
    </div>
  );
};

export default ProductCard2;
