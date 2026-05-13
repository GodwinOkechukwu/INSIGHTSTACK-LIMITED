import { officeImg1 } from "@public/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PhoneTabletCard = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/home-item/product/${1}`);
	};

	return (
		<div
			onClick={handleClick}
			className='flex flex-col gap-2 items-center cursor-pointer w-[212px] h-[327px] shadow-lg bg-white'>
			<div className='flex-[.8] w-full relative'>
				<Image
					src={officeImg1}
					alt={`team-member-image`}
					fill
					quality={100}
					layout='fixed'
					priority
					className='object-contain absolute'
				/>
			</div>
			<div className='flex-[.2] flex flex-col gap-2 px-1 pb-5'>
				<h4 className='text-base text-primary font-semibold'>₦69,000</h4>
				<h4 className='text-sm text-text_color font-semibold leading-[1.6]'>
					UMIDIGI Power 7S 4GB,64GB 6.7&quot; HD+ 6150mAh
				</h4>
			</div>
		</div>
	);
};

export default PhoneTabletCard;
