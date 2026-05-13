import React, { useRef, useState } from "react";
import CustomSwiper from "../CustomSwiper";
import HomeApplianceCard from "../Cards/HomeApplianceCard";
import { Product, homeApplianceProductData } from "@constants";
import { useGetProductQuery } from "../config/features/api";
import { useCategories, useProductsByCategory } from "../lib/woocommerce";
import ProductCard2 from "../Cards/ProductCard2";
import { Loader } from "@src/app/(Home)/_components/SortedProducts";
import Carousel from "../Reusables/Carousel";

interface RelatedProductsSectionProps {
	productCategoryId: string;
}

const RelatedProductsSection = ({
	productCategoryId,
}: RelatedProductsSectionProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	// Woo commerce API Product
	const {
		data: categoryProducts,
		isLoading: categoryProductsWpIsLoading,
		isError: categoryProductsIsError,
	} = useProductsByCategory(productCategoryId);

	const CategoryProducts: ProductType[] = categoryProducts;
	const TotalCategoryProducts = CategoryProducts?.length;

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCategoryProducts - 1 ? prevIndex + 1 : prevIndex,
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
		<div className='bg-white mt-1 slg:mt-3 w-full pt-2 pb-8 px-3 slg:px-6 mb-24'>
			<h4 className='text-accent uppercase text-xs slg:text-sm font-bold leading-[1.5] pt-6 pb-3'>
				Related products
			</h4>
			<div className=''>
				<hr className='text-[#E0E0E0]' />
				<hr className='text-primary-100 font-bold w-2/12' />
			</div>
			<div className='mt-6'>
				<Carousel
					totalDataNumber={TotalCategoryProducts}
					maxScrollTotal={maxScrollTotal}
					scrollLeftTotal={scrollLeftTotal}
					handleNext={handleNext}
					handlePrev={handlePrev}
				>
					<div
						ref={sliderRef}
						className='flex space-x-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar'
					>
						<>
							{categoryProductsWpIsLoading ? (
								<Loader />
							) : (
								<>
									{CategoryProducts?.map((product) => (
										<div key={product?.id} className='w-full slg:w-[300px] shrink-0'>
											<ProductCard2
												key={product?.id}
												id={product?.id}
												image={product?.images[0]?.src}
												oldAmount={product?.regular_price}
												newAmount={product?.price}
												description={product?.name}
											/>
										</div>
									))}
								</>
							)}
						</>
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default RelatedProductsSection;
