"use client";
import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import SearchDataOutput from "@src/components/PageFragments/SearchDataOutput";
import { useProductSearch } from "@src/components/lib/woocommerce";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Page = () => {
	const searchParams = useSearchParams().toString();
	const search = searchParams.replace(/=$/, "").toLowerCase();
	const {
		data: products,
		isLoading: ProductWpIsLoading,
		isError: ProductIsError,
	} = useProductSearch(search);

	const Products: ProductType[] = products;
	const ProductsTotal = Products?.length;

	return (
		<AppLayout className=''>
			<main className='bg-white flex flex-col items-center relative justify-center w-full pt-10 mt-28 slg:mt-32 xl:pt-5 mx-auto max-w-[1156px] min-h-[50vh] mb-20 px-4 lg:px-2'>
				{ProductsTotal === 0 ? (
					<div className=''>
						<h3 className='text-2xl text-center tracking-tight text-secondary-200'>
							Sorry, we can not find this product 😞
						</h3>
					</div>
				) : (
					<>
						<div className='flex w-full py-3 px-5 bg-primary-100/30 text-base mb-4'>
							Total&nbsp;
							<span className='font-black text-primary-100'>
								{ProductsTotal}
							</span>
							&nbsp;items Found
						</div>
						<SearchDataOutput data={Products} isloading={ProductWpIsLoading} />
					</>
				)}
				{ProductWpIsLoading && <ScaleLoader color='#2A19D4' />}
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default Page;
