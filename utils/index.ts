import { loadingBarRef } from "@src/components/config/AppProvider";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import { toast } from "react-toastify";

type voidFn = () => void;
let resetState: voidFn = () => {};

export const APICall = async (
	fn: (...args: any) => Promise<any>,
	args?: any,
	showSuccessToast: boolean = false,
	showLoadingBar: boolean = false,
) => {
	try {
		showLoadingBar && loadingBarRef.current?.continuousStart();

		const response =
			args &&
			typeof args?.[Symbol.iterator] === "function" &&
			typeof args !== "string"
				? await fn(...args)
				: await fn(args);

		if (showSuccessToast && response?.data?.message) {
			// toast(response.data.message, { type: "success" });

			FormToast({
				message: response.data.message,
				success: true,
			});
		}

		showLoadingBar && loadingBarRef.current?.complete();
		return response;
	} catch (error: any) {
		showLoadingBar && loadingBarRef.current?.complete();

		const status = error?.response?.status;
		const message =
			error?.response?.data?.message ||
			error?.response?.message ||
			"Something went wrong";

		// Validation errors (user mistake, not system crash)
		// toast(message, { type: "error" });

		FormToast({
			message: message,
			success: false,
		});
		if (status === 400 || status === 404) {
			return {
				ok: false,
				status,
				message,
			};
		}

		return Promise.reject(error);
	}
};

export function formatDate(dateString: string): string {
	const [year, month, day] = dateString.split("-");
	return `${day}-${month}-${year}`;
}
export function formatDate2(dateString: string): string {
	const [year, month, day] = dateString.split("-");
	return `${year}-${month}-${day}`;
}

export function getDateFromTimestamp(timestamp: string | number | Date) {
	const date = new Date(timestamp);
	return date.toISOString().split("T")[0];
}
