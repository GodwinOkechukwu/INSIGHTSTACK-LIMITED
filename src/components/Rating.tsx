import React from "react";
import { AiFillStar } from "react-icons/ai";

interface RatingProps {
	rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
	const maxRating = 5; // Maximum rating value (5 stars)
	const filledStars = Math.floor(rating); // Number of filled stars
	const hasHalfStar = rating - filledStars >= 0.5; // Check if there's a half-filled star

	return (
		<div className='flex gap-1'>
			{/* Render the filled stars */}
			{Array.from({ length: filledStars }, (_, index) => (
				<AiFillStar key={index} className='text-yellow-500 text-sm' />
			))}

			{/* Render the half-filled star */}
			{hasHalfStar && <AiHalfStar className='text-yellow-500 text-sm' />}

			{/* Render the unfilled stars */}
			{Array.from(
				{ length: maxRating - filledStars - (hasHalfStar ? 1 : 0) },
				(_, index) => (
					<AiFillStar key={index} className='text-secondary-600 text-sm' />
				),
			)}
		</div>
	);
};

// Custom half-filled star icon
const AiHalfStar: React.FC<React.ComponentProps<typeof AiFillStar>> = (
	props,
) => (
	<div className='relative'>
		<AiFillStar {...props} />
		<AiFillStar
			className='absolute top-0 right-0 text-secondary-600 text-sm'
			style={{ clipPath: "inset(0 0 0 50%)" }}
		/>
	</div>
);

export default Rating;
