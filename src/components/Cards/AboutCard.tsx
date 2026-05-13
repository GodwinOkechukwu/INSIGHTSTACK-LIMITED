import React, { ReactNode } from "react";

interface AboutCardProps {
	rating: string;
	title: string;
	description: string;
}

const AboutCard = ({ rating, title, description }: AboutCardProps) => {
	return (
		<div className='flex flex-col w-[20rem] border-[1px] bg-background shadow-md rounded-md py-10 items-center justify-center text-center gap-4 px-1'>
			<h3 className='text-3xl font-bold'>{rating}</h3>
			<h3 className='text-xl font-semibold'>{title}</h3>
			<h4 className='text-base leading-[150%]'>{description}</h4>
		</div>
	);
};

export default AboutCard;
