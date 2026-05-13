import React from "react";
import { IconType } from "react-icons/lib";

interface DashboardCardProps {
	title: string;
	Icon: IconType;
	quantity?: number;
	className: string;
}

const DashboardCard = ({
	title,
	Icon,
	quantity,
	className,
}: DashboardCardProps) => {
	return (
		<div className='flex w-fit border border-[#E4E7EC] gap-2 min-w-[12rem] rounded-lg px-4 py-2.5'>
			<div
				className={`flex items-center justify-center p-2 rounded-full h-12 w-12 text-xl text-center ${className}`}
			>
				<Icon />
			</div>
			<div>
				<h5 className='leading-none text-xs slg:text-base text-primary-100'>
					{title}
				</h5>
				<p className='text-sm slg:text-lg font-semibold leading-none text-black'>
					{quantity}
				</p>
			</div>
		</div>
	);
};

export default DashboardCard;
