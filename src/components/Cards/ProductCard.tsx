"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillBagPlusFill } from "react-icons/bs";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";

interface ProductCardProps {
	id: string;
	image: string;
	oldAmount?: number;
	newAmount: number;
	description: string;
}

const ProductCard = ({
	id,
	image,
	oldAmount,
	newAmount,
	description,
}: ProductCardProps) => {
	const router = useRouter();
	const { addItem, removeItem, updateItem, getItem } = useCart();
	const [count, setCount] = useState(0);
	const cartItem = getItem(id);

	const cartItemCount = cartItem ? cartItem.quantity : 0;
	// const handleClick = () => {
	// 	router.push(`/home-item/product/${description}-${id}`);
	// };

	const handleCartClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCount(count + 1);
		// Adding the first product from the `products` array to the cart
		addItem({
			id: id,
			name: description,
			price: newAmount,
			quantity: count,
			image: image,
		});
	};
	const handleMinusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = Math.max(count - 1, 0);

		if (newCount === 0) {
			// If count becomes 0, remove the item from the cart
			removeItem(id);
		} else {
			// Update the cart item with the new quantity
			updateItem(id, {
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
			id: id,
			name: description,
			price: newAmount,
			quantity: newCount,
			image: image,
		});

		setCount(newCount);
	};

	const slugDesc = convertToSlug(description);

	return (
		<Link
			href={`/home-item/product/${slugDesc}-${id}`}
			className='flex flex-col gap-2 cursor-pointer items-center slg:w-[207px] w-[150px] xs:w-fit h-[230px] sm:h-[260px] bg-white pb-2 hover:shadow-xl hover:scale-105 transition'
		>
			<div className='flex-[.8] w-full relative flex items-center justify-center overflow-hidden'>
				<Picture
					src={image || ""}
					alt={`special-image-${id}`}
					className='absolute top-0 object-contain h-full'
					loading='lazy'
				/>
			</div>
			<div className='sm:flex-[.2] flex flex-col gap-2 px-2'>
				<div className='flex items-center justify-between'>
					<h4 className='text-xs sm:text-base text-primary font-[400] leading-[1.8]'>
						<FormatMoney2 value={newAmount} />
					</h4>
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
					{/* <h4 className='text-xs text-[#00000071] font-[400] line-through leading-[1.8]'>
						{oldAmount}
					</h4> */}
				</div>
				<h4
					className='truncate text-xs sm:text-sm text-text_color font-[400] leading-[1.3] w-[130px] sm:w-[180px]'
					title={description}
				>
					{description}
				</h4>
			</div>
		</Link>
	);
};

export default ProductCard;
