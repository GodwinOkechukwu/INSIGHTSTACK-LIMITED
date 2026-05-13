"use client";
import { convertToSlug } from "@constants";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import {
  useCategories,
  useProduct,
  useProductsByCategory,
  WooCommerce,
} from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useDispatch } from "react-redux";

export const Loader = () => (
  <div className="flex gap-2 w-full items-center">
    {/* Add more loader divs if you want more placeholders */}
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
  </div>
);

const SortedProducts = () => {
  // Create a Map to store refs for each category
  const sliderRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");
  console.log(categories);
  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});

  useEffect(() => {
    // Fetch products for each filtered category
    const fetchCategoryProducts = async () => {
      try {
        // Set loading to true when starting the fetch
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
              return { [category?.id]: response?.data }; // Return products mapped by category id
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with products mapped by category
          const productsMap = productsResults.reduce(
            (acc, result) => ({ ...acc, ...result }),
            {},
          );
          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        // Set loading to false when fetching is done
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Callback ref setter
  const setSliderRef = (categoryId: string) => (el: HTMLDivElement | null) => {
    if (el) {
      sliderRefs.current.set(categoryId, el);
    }
  };

  const handleNext = (categoryId?: string) => {
    if (!categoryId) return;
    const sliderRef = sliderRefs.current.get(categoryId);
    if (sliderRef) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      sliderRef.scrollLeft += 600;
    }
  };

  const handlePrev = (categoryId?: string) => {
    if (!categoryId) return;
    const sliderRef = sliderRefs.current.get(categoryId);
    if (sliderRef) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      if (scrollLeft > 0) {
        sliderRef.scrollLeft -= 600;
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  const handleCategoryClick = (name: string, id: number) => {
    const categorySlugId = `${convertToSlug(name) + "-" + id}`;
    dispatch(updateCategorySlugId({ categorySlugId }));
    startTransition(() => {
      router.push(`/category/${convertToSlug(name) + "-" + id}`);
    });
  };

  return (
    <>
      <div className="mb-8 lg:mb-16 border">
        <div className="space-y-5 md:space-y-10">
          {categories
            ?.filter((category: CategoryType) => category?.count > 0)
            ?.slice(0, 5)
            ?.map((category: CategoryType) => (
              <div key={category?.id} className="space-y-4 overflow-visible">
                <div className="w-full max-w-[1350px] mx-auto mb-10 mt-20 items-center flex justify-between pr-2 lg:pr-2">
                  <Link
                    href={`${
                      "/category/" +
                      convertToSlug(category?.name) +
                      "-" +
                      category?.id
                    }`}
                    onClick={() =>
                      handleCategoryClick(category?.name, category?.id)
                    }
                    dangerouslySetInnerHTML={{
                      __html: category?.name,
                    }}
                    className=" text-lg sm:text-xl md:text-2xl w-4/5 font-medium tracking-tight text-black line-clamp-2"
                  />
                  <Link
                    href={`${
                      "/category/" +
                      convertToSlug(category?.name) +
                      "-" +
                      category?.id
                    }`}
                    onClick={() =>
                      handleCategoryClick(category?.name, category?.id)
                    }
                    className="pr-text-sm font-medium tracking-tight text-black hover:text-primary transition hover:underline"
                  >
                    See all
                  </Link>
                </div>
                {/* Show loader when category products are loading */}
                <div className="max-w-[1350px] mx-auto pr-8">
                  <Carousel
                    totalDataNumber={
                      categoryProductsMap[category?.id]?.length || 0
                    }
                    maxScrollTotal={maxScrollTotal}
                    scrollLeftTotal={scrollLeftTotal}
                    handleNext={() => handleNext(category?.id?.toString())}
                    handlePrev={() => handlePrev(category?.id?.toString())}
                  >
                    <div
                      ref={setSliderRef(category?.id?.toString())}
                      className="w-full max-w-[1350px] mx-auto flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4"
                      style={{
                        scrollbarWidth: "none" /* Firefox */,
                        msOverflowStyle: "none" /* IE/Edge */,
                      }}
                    >
                      {isLoading ? (
                        <Loader />
                      ) : (
                        categoryProductsMap[category?.id]?.map(
                          (product: ProductType) => (
                            <div
                              key={product.id}
                              className="flex-shrink-0 snap-start"
                            >
                              <ProductCard2
                                id={product?.id}
                                image={product?.images[0]?.src}
                                oldAmount={product?.regular_price}
                                newAmount={product?.price}
                                description={product?.name}
                              />
                            </div>
                          ),
                        )
                      )}
                    </div>
                  </Carousel>
                </div>
              </div>
            ))}
        </div>
      </div>

      <GlobalLoader isPending={categoryWpIsLoading || isPending} />
    </>
  );
};

export default SortedProducts;
