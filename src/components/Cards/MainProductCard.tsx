"use client";
import { electonicImageNameImg1 } from "@public/images";
import React, { useState } from "react";
import Rating from "../Rating";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setPayLaterDataState } from "../config/features/payLaterDataState";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { Product, mainProductCardData } from "@constants";
import { useCart } from "react-use-cart";
import { BsFillBagPlusFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RootState } from "../config/store";
import Picture from "../picture/Picture";

interface MainProductCardProps {
	items: ProductType;
}

const MainProductCard = ({ items }: MainProductCardProps) => {
	const { addItem, removeItem, updateItem, getItem } = useCart();
	const [count, setCount] = useState(0);
	const cartItem = getItem(items?.id?.toString());
	const router = useRouter();
	const cartItemCount = cartItem ? cartItem?.quantity : 0;

	const handleClick = () => {
		router.push(`/home-item/product/${items?.name}-${items?.id}`);
	};

	const handleCartClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCount(count + 1);
		// Adding the first product from the `products` array to the cart
		addItem({
			id: items?.id.toString(),
			name: items?.name,
			price: parseInt(items?.sale_price),
			quantity: count,
			image: items?.images[0]?.src,
		});
	};

	const handleMinusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = Math.max(count - 1, 0);

		if (newCount === 0) {
			// If count becomes 0, remove the item from the cart
			removeItem(items?.id?.toString());
		} else {
			// Update the cart item with the new quantity
			updateItem(items?.id?.toString(), {
				quantity: newCount,
			});
		}

		setCount(newCount);
	};

	const handlePlusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = count + 1;

		// Adding the product to the cart with the updated quantity
		addItem({
			id: items?.id?.toString(),
			name: items?.name,
			price: parseInt(items?.sale_price),
			quantity: count,
			image: items?.images[0]?.src,
		});

		setCount(newCount);
	};

	// console.log(isPaylaterProduct, "Paylater Product");
	return (
		<div
			onClick={handleClick}
			className={`flex flex-col gap-2 justify-center items-center pt-4 sm:pt-9 pb-3 cursor-pointer transition 
			border-[2px] border-[#bfbfbf1b] ring-[#bfbfbf2b] ring-opacity-50`}
		>
			<div className='w-full flex-1 relative flex items-center justify-center px-8'>
				<Picture
					src={items?.images[0]?.src}
					alt={`${items?.name}`}
					className='object-contain h-28 w-28 slg:h-36 slg:w-36'
				/>
			</div>
			<div className='flex flex-col gap-2 sm:gap-4 mt-4 px-2 pb-4 w-full'>
				<div className='flex justify-between items-center'>
					<div className=''>
						<h4 className='stroke-black text-xs text-start line-through text-[#ccc]'>
							<FormatMoney2 value={parseInt(items?.regular_price)} />
						</h4>

						<h4 className='text-sm sm:text-base text-primary font-semibold leading-[1.8]'>
							<FormatMoney2 value={parseInt(items?.regular_price)} />
						</h4>
					</div>

					<div
						className={`flex items-center gap-1 rounded-md text-white p-1 text-xs sm:text-sm transition ${
							cartItemCount !== 0 && "bg-primary"
						}`}
					>
						{cartItemCount === 0 ? (
							<BsFillBagPlusFill
								className='fill-primary text-2xl'
								onClick={handleCartClick}
							/>
						) : (
							<>
								<AiOutlineMinus onClick={handleMinusCartClick} />
								<span className=''>{cartItemCount}</span>
								<AiOutlinePlus onClick={handlePlusCartClick} />
							</>
						)}
					</div>
				</div>
				<h4
					className='truncate text-xs sm:text-sm text-text_color font-semibold leading-[1.3] w-[150px]'
					title={items?.name}
				>
					{items?.name}
				</h4>
			</div>
		</div>
	);
};

export default MainProductCard;
