"use client";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCaretBackOutline } from "react-icons/io5";

export const isTokenValid = (token: string) => {
	try {
		const decoded = jwtDecode(token);

		// Check if decoded token has required JWT claims
		if (
			decoded &&
			decoded.hasOwnProperty("exp") &&
			decoded.hasOwnProperty("iat")
		) {
			return true; // Token is valid JWT format
		}

		return false;
	} catch (error) {
		return false; // Token is not valid JWT format
	}
};

export const Back = () => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className='flex items-center gap-1 bg-transparent text-primary-100 w-fit py-1 pl-1 pr-2 rounded-md group cursor-pointer'
		>
			<IoCaretBackOutline className='group-hover:-translate-x-1' />
			<h4>Back</h4>
		</button>
	);
};
