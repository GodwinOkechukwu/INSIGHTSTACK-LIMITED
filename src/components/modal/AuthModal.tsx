"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/store";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	content: React.ReactNode;
	buttonText?: string;
	isButton?: boolean;
}

const AuthModal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	content,
	buttonText,
	isButton,
}) => {
	// console.log(isOpen)
	const handleOpenModalClick = () => {
		onClose();
	};

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-40 px-4 xs:px-16 md:px-0 ${
				isOpen ? "" : "hidden"
			}`}
		>
			<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
			<div className='bg-white flex flex-col w-full md:w-[35rem] gap-2 md:gap-4 px-2 sm:px-0 justify-center items-center rounded-lg drop-shadow-lg relative'>
				<IoCloseSharp
					className='text-black absolute right-4 top-4 hover:scale-105 transition-[.4] text-xl cursor-pointer'
					onClick={handleOpenModalClick}
				/>
				{content}
				{isButton && (
					<button
						onClick={handleOpenModalClick}
						className='bg-primary px-8 md:px-0 md:w-4/5 py-2 text-white rounded-md hover:bg-primaryColor-100 text-xs md:text-base'
					>
						{buttonText ? buttonText : "Cancel"}
					</button>
				)}
			</div>
		</div>
	);
};

export default AuthModal;
