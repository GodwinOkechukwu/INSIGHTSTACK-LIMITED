import { Field, ErrorMessage } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { RxEnvelopeClosed } from "react-icons/rx";
import { MdTextFields } from "react-icons/md";

interface Props {
	id: string;
	label?: string;
	value?: string | number; // Allow number for phone_number
	className?: string;
	labelClassName?: string;
	passwordIconClassname?: string;
	type?: string;
	required?: boolean;
	showPassword?: boolean;
	showPasswordIcon?: boolean;
	showEmailIcon?: boolean;
	showUserIcon?: boolean;
	showTextIcon?: boolean;
	showLockedIcon?: boolean;
	isDisabled?: boolean;
	readonly?: boolean;
	placeholder?: string;
	togglePasswordVisibility?: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Explicitly typed
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Explicitly typed
	maxLength?: number; // For date inputs
	min?: number; // For date inputs
	max?: number; // Optional for future use
	labelRequired?: string;
	labelRequiredClassName?: string;
}

const TextInput = ({
	id,
	label,
	value,
	className,
	labelClassName,
	type = "text",
	required,
	passwordIconClassname,
	showPassword,
	showPasswordIcon,
	showLockedIcon,
	showEmailIcon,
	showUserIcon,
	isDisabled = false,
	readonly,
	showTextIcon,
	togglePasswordVisibility,
	onChange,
	onBlur,
	placeholder,
	maxLength,
	min,
	max,
	labelRequired,
	labelRequiredClassName,
}: Props) => {
	const getIOSOptimizedProps = () => {
		const baseProps = {
			autoComplete: "off",
			autoCorrect: "off",
			autoCapitalize: "off",
			spellCheck: false,
		};

		// Type-specific optimizations for iOS
		switch (type) {
			case "email":
				return {
					...baseProps,
					inputMode: "email" as const,
					autoComplete: "email",
					autoCapitalize: "none",
				};
			case "tel":
				return {
					...baseProps,
					inputMode: "tel" as const,
					autoComplete: "tel",
				};
			case "number":
				return {
					...baseProps,
					inputMode: "numeric" as const,
					pattern: "[0-9]*", // Forces numeric keypad on iOS
				};
			case "password":
				return {
					...baseProps,
					autoComplete: "current-password",
				};
			case "url":
				return {
					...baseProps,
					inputMode: "url" as const,
					autoComplete: "url",
					autoCapitalize: "none",
				};
			case "search":
				return {
					...baseProps,
					inputMode: "search" as const,
					autoComplete: "off",
				};
			default:
				return baseProps;
		}
	};

	const iosProps = getIOSOptimizedProps();

	return (
		<div className='flex flex-col gap-1'>
			{label && (
				<label
					className={`flex items-center gap-2 text-xs sm:text-sm font-medium text-black-100 ${labelClassName}`}
					htmlFor={id}
				>
					{label}{" "}
					{required ? (
						<span
							className={`text-red-500 text-xs bg-red-100 border border-red-600 px-3 py-0.5 rounded-3xl ${labelRequiredClassName}`}
						>
							{labelRequired}
						</span>
					) : (
						""
					)}
				</label>
			)}
			<div className='relative'>
				{/* Left Icons - Fixed alignment */}
				{showUserIcon && (
					<HiOutlineUser className='text-bg-700/70 text-sm sm:text-base' />
				)}

				{showEmailIcon && (
					<RxEnvelopeClosed className='fill-white/80 absolute top-5 lg:top-[1.2rem] right-4' />
				)}
				{showTextIcon && (
					<MdTextFields className='fill-white/80 absolute top-4 lg:top-[1.2rem] left-2' />
				)}

				<Field
					type={type}
					name={id}
					onBlur={onBlur}
					maxLength={maxLength}
					className={`${className} focus:ring-1 focus:ring-primary-100 pl-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield`}
					placeholder={placeholder}
					required={required}
					readOnly={readonly}
					disabled={isDisabled}
					// onChange={onChange} // Custom onChange for manual Formik updates
					value={value} // Controlled value from Formik
					min={min}
					max={max}
					{...iosProps}
					// Prevent zoom on iOS when focusing inputs
					style={{
						fontSize: "16px", // Prevents zoom on iOS Safari
						...((type === "date" || type === "time") && {
							WebkitAppearance: "none",
							MozAppearance: "textfield",
						}),
					}}
				/>
				{showPasswordIcon && (
					<span
						className={`absolute top-7 right-4 transform -translate-y-1/2 cursor-pointer transition-[.3] ${passwordIconClassname}`}
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<FaEye className='text-black-100 text-sm' />
						) : (
							<FaEyeSlash className='text-black-100 text-sm' />
						)}
					</span>
				)}
				{(showLockedIcon || isDisabled) && (
					<IoLockClosed className='fill-black-200 text-lg sm:text-xl absolute top-6 lg:top-7 right-4 transform -translate-y-1/2 cursor-not-allowed transition-[.3]' />
				)}
				<ErrorMessage
					name={id}
					component='div'
					className='text-red-600 text-xs text-left'
				/>
			</div>
		</div>
	);
};

export default TextInput;
