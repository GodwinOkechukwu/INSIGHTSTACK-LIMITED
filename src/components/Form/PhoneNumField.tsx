import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumFieldProps {
	value: string | null;
	onChange: (value: string) => void;
}

const PhoneNumField: React.FC<PhoneNumFieldProps> = ({ value, onChange }) => {
	return (
		<div>
			<PhoneInput
				country={"ng"}
				value={value}
				onChange={onChange}
				inputClass='!w-full p-2 sm:py-3 md:py-6 font-[400] text-xs md:text-base rounded-md !bg-transparent border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
			/>
		</div>
	);
};

export default PhoneNumField;
