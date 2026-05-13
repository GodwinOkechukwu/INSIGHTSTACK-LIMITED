"use client";
import React, { useEffect } from "react";
import { GrFormCheckmark, GrFormClose } from "react-icons/gr";
import { BuyPaylaterModalFormModel2 } from "../config/models";
import BuyPaylaterModal2Form from "../Form/BuyPaylaterModal2Form";
import BuyPaylaterModal3Form from "../Form/BuyPaylaterModal3Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/store";
import { togglePaylaterModal3 } from "../config/features/paylaterModal3";
import { togglePaylaterModal2 } from "../config/features/paylaterModal2";
import { MarkUpIconSvg } from "../SvgIcons";
import { togglePaylaterModal4 } from "../config/features/paylaterModal4";

const BuyNowPayLaterSuccessModal = () => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state: RootState) => state.paylaterModal4);

	if (!isOpen) {
		return null;
	}

	const handleOpenModalClick = () => {
		dispatch(togglePaylaterModal4());
		window.location.reload(); // Reload the page
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center z-40 px-3 md:px-0'>
			<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
			<div className='bg-white flex flex-col px-2 p-6 md:p-8 md:w-[24rem] gap-2 md:gap-4 justify-center items-center rounded-lg drop-shadow-lg'>
				<div className='bg-[#0596691F] rounded-full p-3'>
					<MarkUpIconSvg className='w-6 h-6 md:w-full md:h-full' />
				</div>
				<h4 className='text-base md:text-2xl font-[500] text-primary-300'>
					Application
				</h4>
				<span className='text-center text-xs md:text-sm leading-[178%]'>
					Your pay-later application request has been sent and will be reviews
					shortly
				</span>
				<button
					onClick={handleOpenModalClick}
					className='bg-primary px-8 md:px-0 md:w-4/5 py-2 text-white rounded-md hover:bg-primaryColor-100 text-xs md:text-base'
				>
					OK Continue
				</button>
			</div>
		</div>
	);
};

export default BuyNowPayLaterSuccessModal;
