"use client";
import { WooCommerce } from "@src/components/lib/woocommerce";
import NewArrivalCard from "../Cards/NewArrivalCard";
import React, { useEffect, useState } from "react";
import Footer from "@src/components/Footers/Footer";
import Header from "@src/components/Navbars/Header";

export const NewArrivalsLoader = () => (
  <div className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
    <div className="max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 animate-pulse rounded-lg w-48 md:w-64" />
          <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-32 md:w-48" />
        </div>
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
              <div className="h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function NewArrivals() {
  const [newProducts, setNewProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=50",
        );
        setNewProducts(response?.data || []);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <NewArrivalsLoader />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-24 bg-white mt-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {/* Page Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Discover our latest products ({newProducts.length} items)
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
            {newProducts.map((product: ProductType) => (
              <NewArrivalCard
                key={product.id}
                id={product.id}
                image={product.images[0]?.src}
                oldAmount={product.regular_price}
                newAmount={product.price}
                description={product.name}
                isNew={true}
              />
            ))}
          </div>

          {/* Empty State */}
          {!newProducts.length && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No new products available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
