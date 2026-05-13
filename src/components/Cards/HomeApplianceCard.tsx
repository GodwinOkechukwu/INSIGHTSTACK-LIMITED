"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillBagPlusFill } from "react-icons/bs";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Picture from "../picture/Picture";
import Link from "next/link";

interface HomeApplianceCardProps {
	id: string;
	image: string;
	name: string;
	oldAmount?: number;
	newAmount: number;
}

const HomeApplianceCard = ({
	id,
	image,
	name,
	oldAmount,
	newAmount,
}: HomeApplianceCardProps) => {
	const router = useRouter();
	const { addItem, removeItem, updateItem, getItem } = useCart();
	const [count, setCount] = useState(0);
	const cartItem = getItem(id);

	const cartItemCount = cartItem ? cartItem.quantity : 0;
	const handleClick = () => {
		router.push(`/home-item/product/${name}-${id}`);
	};

	const handleCartClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCount(count + 1);
		// Adding the first product from the `products` array to the cart
		addItem({
			id: id,
			name: name,
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
			name: name,
			price: newAmount,
			quantity: newCount,
			image: image,
		});

		setCount(newCount);
	};

	return (
		<Link
			href={`/home-item/product/${name}-${id}`}
			className='flex gap-1 xs:w-[323px] h-[132px] border-[1px] border-[#bfbfbf4f] bg-white pl-3 cursor-pointer'
		>
			<div className='flex-[.8] flex w-full relative justify-center items-center'>
				<Picture
					src={image}
					alt={`home-appliance-product-img-${id}`}
					className='h-24 w-32 object-contain'
				/>
			</div>
			<div className='flex flex-1'>
				<div className='flex-1 flex flex-col w-full justify-between border-[#bfbfbf4f] border-l-[1px] px-2 py-3'>
					<h4
						title={name}
						className='truncate text-sm text-text_color font-semibold w-40'
					>
						{name}
					</h4>
					<hr className='border-t-2 border-dashed border-[#bfbfbf4f] my-2 w-[35%]' />
					<div className='flex items-center justify-between'>
						<h4 className='text-base text-primary font-semibold leading-[1.5]'>
							<FormatMoney2 value={newAmount} />
						</h4>
						<div
							className={`flex items-center gap-1 rounded-md text-white p-1 text-sm transition ${
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
				</div>
			</div>
		</Link>
	);
};

export default HomeApplianceCard;
