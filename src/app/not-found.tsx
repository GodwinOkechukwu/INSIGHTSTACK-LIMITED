import AppLayout from "@src/components/AppLayout";
import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
	return (
		<AppLayout>
			<div className='h-[80vh] grid place-items-center'>
				<div className='flex flex-col justify-center items-center'>
					<TbError404 className='animate-bounce text-primary text-4xl' />
					<h3 className='text-base font-semibold text-primary'>
						Page not found
					</h3>
				</div>
			</div>
		</AppLayout>
	);
};

export default NotFound;
