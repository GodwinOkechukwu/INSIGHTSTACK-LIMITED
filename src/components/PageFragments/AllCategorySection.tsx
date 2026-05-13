"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import HeroCarousel from "../Cards/HeroCarousel";
import Image from "next/image";
import {
  speedImage,
  securityImage,
  supportImage,
  heroBg,
} from "@public/images";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      <section className="relative min-h-[70dvh] pt-32 pb-8 md:top-20 sm:min-h-screen overflow-hidden flex items-center">
        {/* ── Light base ── */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: "#f5f3f0", fontFamily: "'Syne', sans-serif" }}
        />

        {/* ── Background image — right half only ── */}
        <div
          className="absolute inset-y-0 right-0 z-0"
          style={{ width: "62%" }}
        >
          <Picture
            src={heroBg}
            alt="Apex Neural Implant"
            className="w-full h-full object-cover"
          />
          {/* Fade left edge so image blends into light bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #f5f3f0 0%, rgba(245,243,240,0.3) 30%, transparent 60%)",
            }}
          />
        </div>

        {/* ── Large decorative circle behind image ── */}
        {/* <div
          className="absolute z-0 rounded-full pointer-events-none"
          style={{
            width: "clamp(300px, 48vw, 680px)",
            height: "clamp(300px, 48vw, 680px)",
            background: "rgba(210,210,210,0.35)",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          aria-hidden="true"
        /> */}

        {/* ── Foreground content — left aligned ── */}
        <div className="relative z-20 w-full px-8 sm:px-12 md:px-16 lg:px-24 mt-16 md:mt-0">
          <div className="flex flex-col items-start text-left max-w-lg space-y-5">
            {/* Pill badge */}
            <span
              className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(216, 53, 67, 0.1)",
                color: "#B5182E",
                border: "1px solid rgba(180,30,30,0.25)",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Gen III Neural Interface
            </span>

            {/* Headline — black + red split */}
            <h1
              className="font-black leading-[1.0] tracking-tight
          text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                fontFamily: "'Syne', sans-serif",
              }}
            >
              <span style={{ color: "#1B1C1C" }}>The Future, </span>
              <br />
              <span style={{ color: "#B5182E" }}>Within</span>
              <br />
              <span style={{ color: "#B5182E" }}>Reach.</span>
            </h1>

            {/* Sub-copy */}
            <p
              className="leading-relaxed max-w-sm text-sm sm:text-[15px]"
              style={{ color: "#5F5E5E", fontFamily: "'Syne', sans-serif" }}
            >
              We presents the Apex Neural Implant. Medical-grade, biological
              integration with zero rejection rate. Monitor every pulse, every
              thought, every vital sign in real-time.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <Link
                href="/category"
                className="
            inline-block px-8 py-3.5
            text-white text-sm font-semibold tracking-wide
            rounded-full transition-all duration-200 hover:opacity-90 hover:scale-105
          "
                style={{
                  background: "#B5182E",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Pre-order Now
              </Link>

              <Link
                href="/category"
                className="
            inline-block px-8 py-3.5
            text-sm font-semibold tracking-wide
            rounded-full transition-all duration-200 hover:scale-105
          "
                style={{
                  border: "1.5px solid #c0bcb8",
                  color: "#333330",
                  background: "transparent",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Technical Specs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section Styling Idea */}
      {/* <h5 className="max-w-[1350px] mx-auto mt-[50px] pl-2 md:pl-0 text-#181818 font-bold text-[30px] lg:text-[48px]">
        Popular Products
      </h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-auto max-w-[1350px] px-2 lg:px-0  mt-6 gap-10">
        {Categories?.slice(0, 5).map((cat) => {
          const productImage = categoryProductsMap[cat?.id];
          return (
            <Link
              key={cat.id}
              href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
              className="group relative h-40 sm:h-48 bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all"
            >
              <Picture
                src={cat.image?.src ?? productImage}
                alt={cat.image?.name}
                className="w-full h-full object-contain opacity-60 group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute bottom-4 left-4">
                <h3 className="text-sm sm:text-lg font-bold text-white uppercase">
                  {cat.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div> */}
      {/* </Carousel> */}
    </>
  );
};

export default AllCategorySection;
