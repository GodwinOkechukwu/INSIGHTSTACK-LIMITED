import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import ProductDisplaySection from "@src/components/PageFragments/ProductDisplaySection";
import { Back } from "@src/components/Reusables";
import { WooCommerceServer } from "@utils/endpoints";

export async function generateStaticParams() {
	try {
		// Fetch products from WooCommerce
		const response = await WooCommerceServer.get("products");
		const products = response?.data || [];

		// Generate static paths using the slug and ID
		const paths = products.map((product: { id: number; slug: string }) => ({
			id: `${product.slug}-${product.id}`,
		}));

		return paths;
	} catch (error) {
		console.error("Error fetching products in generateStaticParams:", error);
		// Return an empty array to avoid breaking the build process
		return [];
	}
}

// const page = async ({ params: { id } }: ProductIdProps) => {
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const lastPart = id.split("/").pop();
	const formatedId = lastPart?.match(/-(\w+)$/)?.[1];

	return (
		<AppLayout className='pt-32 slg:pt-40 mx-auto max-w-[1156px]'>
			<Back />
			<ProductDisplaySection FormatedId={formatedId} />
			{/* <AppMenu /> */}
		</AppLayout>
	);
};

export default page;
