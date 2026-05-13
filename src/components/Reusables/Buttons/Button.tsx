interface ButtonProps {
	className?: string;
	text: string;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	handleClick?: () => void;
}

const Button = ({
	className,
	text,
	type = "button",
	handleClick,
	disabled,
}: ButtonProps) => {
	return (
		<button type={type} className={className} onClick={handleClick} disabled>
			{text}
		</button>
	);
};

export default Button;
