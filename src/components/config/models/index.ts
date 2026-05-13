import * as Yup from "yup";

export const checkoutFormModel = Yup.object({
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	houseAddress: Yup.string().required("House Address is required"),
	phone: Yup.string()
		.matches(/^[0-9]{8,}$/, "must be a number of at least 5 digits")
		.required("Phone number is required"),
	// orderNotes: Yup.string().required("Order Note is required"),
	city: Yup.string().required("Your city is required"),
	state: Yup.string().required("Your state is required"),
});

export const cardPaymentFormModel = Yup.object({
	cardNumber: Yup.string()
		.required("Card number is required")
		.matches(/^[0-9]{16}$/, "Card number must be 16 digits"),

	expiryMonth: Yup.string()
		.required("Expiry month is required")
		.matches(/^(0[1-9]|1[0-2])$/, "Expiry month must be a valid month (01-12)"),

	expiryYear: Yup.string()
		.required("Expiry year is required")
		.matches(/^\d{2}$/, "Expiry year must be 2 digits"),

	cvv: Yup.string()
		.required("CVV is required")
		.matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
});

export const PayLaterFormModel = Yup.object({
	paymentRange: Yup.string(),
	plan: Yup.string(),
	duration: Yup.string(),
});

export const BuyPayLaterModalFormModel = Yup.object({
	fullName: Yup.string().required("Full name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	bvnPhone: Yup.string()
		.matches(/^[0-9]{8,}$/, "must be a number of at least 5 digits")
		.required("Phone number is required"),
	state: Yup.string().required("Your state is required"),
	city: Yup.string().required("Your city is required"),
	homeAddress: Yup.string().required("This is required"),
});

export const BuyPaylaterModalFormModel2 = Yup.object({
	bvn: Yup.string().required("Bvn is required"),
	checked: Yup.boolean(),
	uploadValidId: Yup.mixed().nullable(),
	uploadBankStatement: Yup.mixed().nullable(),
	uploadUtilityBill: Yup.mixed().nullable(),
	uploadPassport: Yup.mixed().nullable(),
});

export const BuyPaylaterModalFormModel3 = Yup.object({
	nameofEmployer: Yup.string().required("Bvn is required"),
	phone: Yup.string()
		.matches(/^[0-9]{8,}$/, "must be a number of at least 5 digits")
		.required("Phone number is required"),
	nin: Yup.string().email("Provide your nin").required("Email is required"),
	officeAddress: Yup.string().required("This is required"),
	checked: Yup.boolean(),
	uploadBankStatment: Yup.mixed().nullable(),
	paymentPlan: Yup.mixed().nullable(),
});

export const RegisterFormModel = Yup.object({
	first_name: Yup.string().required("First name is required"),
	last_name: Yup.string().required("Last name is required"),
	// username: Yup.string().required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(5, "Password should be at least 6 characters")
		.required("Password is required"),
});

export const LoginFormModel = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(5, "Password should be at least 6 characters")
		.required("Password is required"),
});

export const AccountDetailFormModel = Yup.object({
	photoUrl: Yup.string(),
	fullName: Yup.string().required("Full name is required"),
	homeAddress: Yup.string().required("This is required"),
	phone: Yup.string()
		.matches(/^[0-9]{8,}$/, "must be a number of at least 5 digits")
		.required("Phone number is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export const changePasswordFormModel = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	old_password: Yup.string().required("Old password is required"),
	new_password: Yup.string()
		.min(5, "Password should be at least 6 characters")
		.required("New password is required"),
});

export const ContactFormModel = Yup.object({
	fullName: Yup.string().required("Full name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	subject: Yup.string().required("Subject is required"),
	message: Yup.string().required("Message is required"),
});

export const ForgetPasswordFormModel = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export const resetPasswordFormModel = Yup.object({
	password: Yup.string()
		.min(5, "Password should be at least 6 characters")
		.required("Password is required"),
});
