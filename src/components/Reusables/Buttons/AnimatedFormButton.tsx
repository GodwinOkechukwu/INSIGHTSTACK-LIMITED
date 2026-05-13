"use client";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

interface CustomButtonProps {
	type?: "button" | "submit" | "reset";
	isLoading?: boolean;
	label: string;
	className?: string;
	disabled?: boolean;
}

const AnimatedFormButton = ({
	type = "button",
	isLoading = false,
	label,
	className = "",
	disabled = false,
}: CustomButtonProps) => {
	const variants = {
		initial: { y: -20, opacity: 0 },
		animate: { y: 0, opacity: 1 },
	};

	return (
		<motion.button
			type={type}
			disabled={disabled || isLoading}
			className={className}
			// --- MODERN APPROACH ---
			initial='initial'
			whileInView='animate'
			viewport={{ once: false, amount: 0.5 }} // threshold: 0.5
			variants={variants}
			transition={{
				type: "spring",
				damping: 12, // Increased slightly for a more "expensive" feel
				stiffness: 200,
			}}
			// Micro-interactions for the betting UI
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 0.97 }}
		>
			{isLoading ? (
				<div className='flex items-center justify-center gap-2'>
					<ClipLoader size={20} color='#d4d3d3' />
					<span>Processing...</span>
				</div>
			) : (
				label
			)}
		</motion.button>
	);
};

export default AnimatedFormButton;
