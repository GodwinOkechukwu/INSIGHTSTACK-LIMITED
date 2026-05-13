"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	content: React.ReactNode;
	buttonText?: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupModal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	content,
	buttonText,
	setIsOpen,
}) => {
	const router = useRouter();
	const handleOpenModalClick = () => {
		onClose();
		// !isOpen;
		// router.push("/user/login");
	};
	const handleCloseModalClick = () => {
		setIsOpen(false)
	};

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-40 px-4 xs:px-16 md:px-0 ${
				isOpen ? "" : "hidden"
			}`}
		>
			<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
			<div className='bg-white flex flex-col w-full md:w-[35rem] gap-2 md:gap-4 py-4 md:py-8 px-2 sm:px-0 justify-center items-center rounded-lg drop-shadow-lg'>
				{content}
				<div className='flex w-full justify-center gap-4 mt-3'>
					<button
						onClick={handleCloseModalClick}
						className='bg-primaryColor-300 w-fit px-8 md:px-12 py-2 text-white rounded-md hover:bg-primaryColor-100 text-xs md:text-base transition'
					>
						Cancel
					</button>
					<button
						onClick={onClose}
						className='bg-primary px-8 md:px-12 py-2 text-white rounded-md hover:bg-primaryColor-100 text-xs md:text-base transition'
					>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignupModal;
