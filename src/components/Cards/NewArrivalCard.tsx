"use client";

import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiShoppingBagFill } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface NewArrivalCardProps {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  isNew?: boolean;
}

const NewArrivalCard = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  isNew,
}: NewArrivalCardProps) => {
  const { addItem, removeItem, updateItem, getItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

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
    <div className="group relative flex flex-col w-full bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* ================= IMAGE SECTION ================= */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative w-full aspect-square bg-gray-50 overflow-hidden"
      >
        {/* Product Image */}
        <Picture
          src={image}
          alt={description}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded">
            -{discount}%
          </div>
        )}

        {isNew && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase">
            New
          </div>
        )}

        {/* Wishlist Icon - Shows on hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
          aria-label="Add to wishlist"
        >
          <FiHeart
            className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>

        {/* Quick View Overlay - Shows on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </Link>

      {/* ================= CONTENT SECTION ================= */}
      <div className="flex flex-col flex-1 p-4">
        {/* Product Name */}
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 min-h-[44px] mb-2 hover:text-gray-700 transition-colors uppercase tracking-wide"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg md:text-xl font-bold text-gray-900">
            {price ? <FormatMoney2 value={price} /> : "N/A"}
          </span>
          {oldAmount && (
            <span className="text-sm text-gray-400 line-through">
              <FormatMoney2 value={parseInt(oldAmount)} />
            </span>
          )}
        </div>

        {/* Add to Cart / Quantity Controls */}
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-lg
                         flex items-center justify-center gap-2
                         hover:bg-gray-800 transition-all duration-300
                         transform hover:-translate-y-0.5
                         shadow-sm hover:shadow-md"
            >
              <RiShoppingBagFill size={16} />
              Add to Cart
            </button>
          ) : (
            <div className="w-full flex items-center justify-between border-2 border-gray-900 rounded-lg px-4 py-2.5 bg-white">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  decrease();
                }}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <AiOutlineMinus size={14} className="text-gray-700" />
              </button>

              <span className="text-base font-bold text-gray-900">
                {quantity}
              </span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  increase();
                }}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                aria-label="Increase quantity"
              >
                <AiOutlinePlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Border */}
      <div className="absolute inset-0 rounded-lg border border-gray-200 pointer-events-none group-hover:border-gray-300 transition-colors" />
    </div>
  );
};

export default NewArrivalCard;
