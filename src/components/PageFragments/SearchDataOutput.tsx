import React from "react";
import ProductCard2 from "../Cards/ProductCard2";
import { ScaleLoader } from "react-spinners";

interface SearchDataOutputProps {
	data: ProductType[];
	isloading: boolean;
}

const SearchDataOutput = ({ data, isloading }: SearchDataOutputProps) => {
	// SwiperCore.Navigation;
	const productCards = data?.map((product) => (
		<ProductCard2
			key={product?.id}
			id={product?.id}
			image={product?.images[0]?.src}
			oldAmount={product?.regular_price}
			newAmount={product?.price}
			description={product?.name}
		/>
	));

	return (
		<div className='flex gap-4 flex-wrap justify-center sm:justify-start'>
			{productCards}
		</div>
	);
};

export default SearchDataOutput;
