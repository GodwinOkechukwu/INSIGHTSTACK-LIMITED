import React from "react";
import SubCategoryCard from "../Cards/SubCategoryCard";
import { ProductCategoryResponse, homeCardData } from "@constants";

interface SearchNSortSectionProps {
	subCategory: ProductCategoryResponse[] | undefined;
}

const SearchNSortSection = ({ subCategory }: SearchNSortSectionProps) => {
	return (
		<div
			className={`flex flex-wrap justify-center xs:justify-start gap-3 bg-transparent ${
				subCategory && "mb-6 slg:mb-6"
			}`}
		>
			{subCategory?.map((item) => (
				<SubCategoryCard
					key={item.__v}
					id={item._id}
					name={item.name.en}
					image={item.icon}
				/>
			))}
		</div>
	);
};

export default SearchNSortSection;
