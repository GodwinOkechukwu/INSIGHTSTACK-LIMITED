"use client";
import AppLayout from "@src/components/AppLayout";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()

	return (
		<AppLayout>
			<main className='mt-5 md:mt-10 mb-20 md:mb-44 flex items-center justify-center px-3 sm:px-8 md:px-0'>
				<div className='flex flex-col items-center justify-center text-center bg-white w-full md:w-[32rem] py-8 md:py-16 px-2 shadow-lg rounded-xl gap-2 md:gap-5'>
                    <h3 className='text-xs sm:text-base md:text-3xl text-primary text-center'>Email was sent to your mail to continue registration</h3>
                    <h3
						className='hover:underline text-sm md:text-base cursor-pointer hover:text-primary'
						onClick={() => router.push("/user/register")}
					>
						Click here to go back to registration page
					</h3>
				</div>
			</main>
		</AppLayout>
	);
};

export default Page;
