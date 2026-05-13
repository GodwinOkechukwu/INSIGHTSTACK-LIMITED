import { SetStateAction } from "react";

interface PaymentOptButtonProps {
	onClick?: () => void;
	icon?: React.ReactNode;
	text: string;
	isRadioButtonSelected?: boolean;
	num?: string;
	setRadioButtonSelected?: React.Dispatch<SetStateAction<string>>; // Corrected the type
}

export const PaymentOptButton: React.FC<PaymentOptButtonProps> = ({
	onClick,
	icon,
	text,
	num,
	isRadioButtonSelected,
	setRadioButtonSelected,
}) => {
	return (
		<label
			className='text-sm font-medium py-1 px-3 rounded-lg text-black flex items-center gap-2 leading-[1.5] cursor-pointer'
			onClick={onClick} // Pass onClick handler to the button
			htmlFor={text}
		>
			{setRadioButtonSelected && ( // Check if isRadioButtonSelected and setRadioButtonSelected are defined
				<DefaultRadioButton
					isChecked={isRadioButtonSelected!}
					onChange={() => setRadioButtonSelected(num!)} // Invert the current value
					id={text}
				/>
			)}
			{text}
			{icon} {/* Render the icon */}
		</label>
	);
};

interface CheckboxProps {
	id?: string;
	isChecked: boolean;
	onChange: (value: any) => void;
}

export const DefaultRadioButton = ({
	id,
	isChecked,
	onChange,
}: CheckboxProps) => {
	return (
		<label
			htmlFor={id}
			className='flex items-center relative w-fit justify-center cursor-pointer'
		>
			<input
				type='checkbox'
				id={id}
				checked={isChecked}
				onChange={(e) => onChange(e.target.checked)}
				className={`appearance-none h-3 w-3 lg:h-3 lg:w-3 ring-1 ring-primary border-2 checked:border-white rounded-full cursor-pointer transition checked:border-transparent checked:bg-primary focus:outline-none`}
			/>
		</label>
	);
};
