"use client";
import React, { useEffect } from "react";
import { GrFormClose } from "react-icons/gr";
import { BuyPaylaterModalFormModel2 } from "../config/models";
import BuyPaylaterModal2Form from "../Form/BuyPaylaterModal2Form";
import BuyPaylaterModal3Form from "../Form/BuyPaylaterModal3Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/store";
import { togglePaylaterModal3 } from "../config/features/paylaterModal3";
import { togglePaylaterModal2 } from "../config/features/paylaterModal2";

const BuyNowPaylaterModal3 = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state: RootState) => state.paylaterModal3);

	if (!isOpen) {
		return null;
	}

	const handleLoginClick = () => {
		// useEffect(() => {
		if (typeof window !== "undefined") {
			window.location.reload();
		}
		// }, []);
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center z-40'>
			<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
			<div className='bg-white flex flex-col px-10 pt-8 pb-10 w-[43rem] rounded-lg drop-shadow-lg'>
				<div className='flex w-full justify-between items-center'>
					<h4 className='text-2xl font-semibold text-primary-300'>
						Buy Now Pay Later
					</h4>
					<GrFormClose className='text-3xl text-primary-300/80' />
				</div>
				<BuyPaylaterModal3Form handleClick={handleLoginClick} />
			</div>
		</div>
	);
};

export default BuyNowPaylaterModal3;
