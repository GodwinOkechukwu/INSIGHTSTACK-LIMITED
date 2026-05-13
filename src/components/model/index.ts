import { PassThrough } from "stream";
import * as Yup from "yup";

export const loginFormModel = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});
export const registerFormModel = Yup.object({
	first_name: Yup.string().required("First name is required"),
	last_name: Yup.string().required("Last name is required"),
	username: Yup.string().required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

export const forgotPasswordFormModel = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});
