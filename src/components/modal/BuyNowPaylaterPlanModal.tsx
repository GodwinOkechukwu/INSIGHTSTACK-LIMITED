"use client";
import React, { useEffect, useRef } from "react";

interface BuyNowPaylaterPlanModalProps {
	isOpen: boolean;
	onClose: () => void;
	onClose2: () => void;
	content: React.ReactNode;
	buttonText?: any;
}

const BuyNowPaylaterPlanModal = ({
	isOpen,
	content,
	onClose,
	onClose2,
	buttonText
}: BuyNowPaylaterPlanModalProps) => {
	const modalRef = useRef<any>(null);
	const handleCloseModalClick = () => {
		onClose();
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose2();
		}
	};

	useEffect(() => {
		if (isOpen) {
			// Add an event listener to the document to handle outside clicks
			document.addEventListener("mousedown", handleOutsideClick);
		} else {
			// Remove the event listener when the modal is closed
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		// Clean up the event listener on unmount
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-40 ${
				isOpen ? "" : "hidden"
			}`}
		>
			<div className='bg-secondary-200 bg-opacity-75 absolute inset-0' />
			<div
				className='bg-white mt-36 flex flex-col px-6 pt-2 w-[30rem] gap-2 justify-center items-center rounded-lg drop-shadow-lg overflow-y-auto max-h-[70vh]'
				ref={modalRef}
			>
				<div className='flex flex-col bg-white pt-16 transition w-full'>
					<>{content}</>
				
				</div>
			</div>
		</div>
	);
};

export default BuyNowPaylaterPlanModal;