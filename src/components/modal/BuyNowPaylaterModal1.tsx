"use client";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import BuyPaylaterModalForm from "../Form/BuyPaylaterModalForm";
import { useDispatch, useSelector } from "react-redux";
import { togglePaylaterModal2 } from "../config/features/paylaterModal2";
import { RootState } from "../config/store";
import BuyNowPaylaterModal2 from "./BuyNowPaylaterModal2";
import { togglePaylaterModal3 } from "../config/features/paylaterModal3";

const BuyNowPaylaterModal1 = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state: RootState) => state.paylaterModal2);

	if (!isOpen) {
		return null;
	}

	const handleOpenNextModal = () => {
		dispatch(togglePaylaterModal2());
		dispatch(togglePaylaterModal3());
	};
	const handleCloseModal = () => {
		dispatch(togglePaylaterModal2());
	};

	return (
		<>
			<div className='fixed inset-0 flex items-center justify-center z-50 px-2 md:px-0'>
				<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
				<div className='bg-white flex flex-col mt-5 px-4 md:px-10 pt-4 pb-5 w-[43rem] rounded-lg drop-shadow-lg overflow-y-auto max-h-[100vh]'>
					<div className='flex w-full justify-between items-center mb-4 md:mb-2'>
						<h4 className='text-base md:text-2xl font-semibold text-primary-300/80'>
							Personal Information
						</h4>
						<GrFormClose
							className='text-xl md:text-3xl text-primary-300/80 cursor-pointer transition hover:scale-125'
							onClick={handleCloseModal}
						/>
					</div>

					<BuyPaylaterModalForm handleClick={handleOpenNextModal} />
				</div>
			</div>
		</>
	);
};

export default BuyNowPaylaterModal1;
