import React from "react";
import ShoopingCartReview from "../PageFragments/ShoopingCartReview";
import DiscountCode from "@src/app/cart/_components/DiscountCode";

const CartContent = () => {
	return (
		<div>
			<div className='flex-1'>
				<ShoopingCartReview />
			</div>
			{/* <div className='flex-[.5]'>
				<DiscountCode />
			</div> */}
		</div>
	);
};

export default CartContent;
