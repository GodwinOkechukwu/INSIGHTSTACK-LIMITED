import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import { WooCommerceServer } from "@utils/endpoints";

export async function generateStaticParams() {
	try {
		// Fetch categories from WooCommerce
		const response = await WooCommerceServer.get("products/categories");
		const categories = response.data;

		const categoriesSorted: string[] = categories?.map(
			(category: { id: number; slug: string }) =>
				`${category?.slug}-${category?.id}`,
		);

		return categoriesSorted?.map((id) => ({ id }));
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}

// export async function generateStaticParams() {
// 	try {
// 		// Generate static paths using the slug and ID
// 		const paths = [{ id: "id" }];

// 		return paths; // Return the hardcoded paths
// 	} catch (error) {
// 		console.error("Error fetching products in generateStaticParams:", error);
// 		// Return an empty array to avoid breaking the build process
// 		return [];
// 	}
// }

const page = async () => {
	return (
		<AppLayout>
			<main className='flex flex-col slg:flex-row gap-4 w-full mt-36 slg:mt-44 px-2 sm:px-6 mx-auto'>
				<MainCategorySection />
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
