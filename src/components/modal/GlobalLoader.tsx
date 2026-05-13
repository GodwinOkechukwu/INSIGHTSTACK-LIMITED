import { logoImage } from "@public/images";
import React from "react";
import { RiLoader2Line } from "react-icons/ri";
import Picture from "../picture/Picture";

interface GlobalLoaderProps {
	classname?: string;
	size?: "sm" | "md" | "lg" | "xl";
	fullScreen?: boolean;
	isPending: boolean;
}

const GlobalLoader = ({
	classname,
	size = "lg",
	fullScreen = true,
	isPending,
}: GlobalLoaderProps) => {
	// Size configuration
	const sizeConfig = {
		sm: "h-6 w-6",
		md: "h-8 w-8",
		lg: "h-12 w-12",
		xl: "h-16 w-16",
	};

	// Container classes based on fullScreen prop
	const containerClasses = fullScreen
		? "fixed inset-0 z-50 flex items-center justify-center bg-black-100/10 backdrop-blur-sm"
		: "absolute inset-0 z-50 flex items-center justify-center";

	return (
		<>
			{isPending && (
				<div className={`${containerClasses} ${classname || ""}`}>
					<div className='relative flex items-center justify-center p-4'>
						{/* Outer Ring - Clockwise */}
						<div className='absolute w-24 h-24 rounded-full border-b-2 border-primary-100/30 animate-spin'></div>
					</div>
				</div>
			)}
		</>
	);
};

export default GlobalLoader;
