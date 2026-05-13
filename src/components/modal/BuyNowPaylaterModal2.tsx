"use client";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { BuyPaylaterModalFormModel2 } from "../config/models";
import BuyPaylaterModal2Form from "../Form/BuyPaylaterModal2Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/store";
import { togglePaylaterModal3 } from "../config/features/paylaterModal3";
import BuyNowPaylaterModal3 from "./BuyNowPaylaterModal3";
import { togglePaylaterModal2 } from "../config/features/paylaterModal2";
import { togglePaylaterModal4 } from "../config/features/paylaterModal4";

const BuyNowPaylaterModal2 = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state: RootState) => state.paylaterModal3);

	if (!isOpen) {
		return null;
	}

	const handleOpenModalClick = () => {
		dispatch(togglePaylaterModal3());
		dispatch(togglePaylaterModal4());
	};
	const handleCloseModalClick = () => {
		dispatch(togglePaylaterModal3());
	};
	const handleBackClick = () => {
		dispatch(togglePaylaterModal3());
		dispatch(togglePaylaterModal2());
	};
	return (
		<>
			<div className='fixed inset-0 flex items-center justify-center z-50 px-2 md:px-0'>
				<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
				<div className='bg-white flex flex-col px-4 md:px-10 pt-8 pb-5 w-[43rem] rounded-lg drop-shadow-lg overflow-y-auto max-h-[100vh]'>
					<div className='flex w-full justify-between items-center'>
						<h4 className='text-base md:text-2xl font-semibold text-primary-300/80'>
							Verification
						</h4>
						<GrFormClose
							className='text-2xl md:text-3xl text-primary-300/80 cursor-pointer transition hover:scale-125'
							onClick={handleCloseModalClick}
						/>
					</div>
					<BuyPaylaterModal2Form
						handleClick={handleOpenModalClick}
						handleClick2={handleBackClick}
					/>
				</div>
			</div>
			<BuyNowPaylaterModal3 />
		</>
	);
};

export default BuyNowPaylaterModal2;
