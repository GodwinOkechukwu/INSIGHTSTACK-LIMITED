import React from "react";
import * as Iconbs from "react-icons/bs";
import * as Iconbi from "react-icons/bi";
import { toast } from "react-toastify";

interface signInProps {
	message: string | undefined;
	success: boolean;
}

const FormToast = ({ message, success }: signInProps) => {
	const iconComponent = success ? (
		<div className='p-2 rounded-full mr-2 bg-green-500'>
			<Iconbs.BsCheckCircle className='text-xl text-white' />
		</div>
	) : (
		<div className='p-2 rounded-full mr-2 bg-red-500'>
			<Iconbi.BiErrorCircle className='text-xl text-white' />
		</div>
	);

	toast[success ? "success" : "error"](
		<div className='text-sm font-semibold ml-5'>{message}</div>,
		{
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			autoClose: 7000, // Delay of 7 seconds before closing
			icon: iconComponent,
		},
	);

	return null; // Render nothing in the component's output
};

export default FormToast;
