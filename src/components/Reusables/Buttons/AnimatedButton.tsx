"use client";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
	className: string;
	handleClick: () => void;
	text?: string;
}

const AnimatedButton = ({
	className,
	handleClick,
	text = "Get Started",
}: AnimatedButtonProps) => {
	const variants = {
		initial: { y: 40, opacity: 0 },
		animate: { y: 0, opacity: 1 },
	};

	const transition = {
		type: "spring",
		damping: 12,
		stiffness: 100,
	} as const; // Fixes the TS error

	return (
		<motion.button
			type='button'
			onClick={handleClick}
			className={className}
			// --- Modern Framer Motion logic replaces IntersectionObserver ---
			initial='initial'
			whileInView='animate'
			viewport={{ once: false, amount: 0.5 }} // threshold: 0.5
			// ----------------------------------------------------------------
			variants={variants}
			transition={transition}
			whileHover={{
				scale: 1.05,
				backgroundColor: "#B1976B", // Switches to Gold on hover
				color: "#FFFFFF",
			}}
			whileTap={{ scale: 0.95 }}
		>
			{text}
		</motion.button>
	);
};

export default AnimatedButton;
