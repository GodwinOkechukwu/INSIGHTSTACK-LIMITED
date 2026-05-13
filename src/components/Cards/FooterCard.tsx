import { RocketIconSvg } from "../SvgIcons";

interface FooterCardProps {
	icon: React.ReactNode;
	name: string;
	description: string;
	borderRight: boolean;
}

const FooterCard = ({ icon, name, description, borderRight }: FooterCardProps) => {
	return (
		<div className={`flex flex-col xl:flex-row items-center w-full gap-2 xl:gap-0 xl:w-fit pl-3 xl:pr-8 ${borderRight && 'border-r border-[#0000003d]'}`}>
			<div className=''>
				{icon}
			</div>
			<div className='flex-1 flex flex-col items-center xl:items-start text-center xl:text-start px-4 gap-2'>
				<h4 className='text-xs xl:text-base font-semibold leading-[1.4]'>
					{name}
				</h4>
				<span className='text-xs hidden xl:block xl:text-sm font-[400] leading-[1.4]'>
					{description}
				</span>
			</div>
		</div>
	);
};

export default FooterCard;
