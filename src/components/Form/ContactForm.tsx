"use client";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { ContactFormModel } from "../config/models";
import { ClipLoader } from "react-spinners";
import FormToast from "../Reusables/Toast/SigninToast";

interface FormValues {
	fullName: string;
	email: string;
	subject: string;
	message: string;
}

const ContactForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const initialValues: FormValues = {
		fullName: "",
		email: "",
		subject: "",
		message: "",
	};

	const handleFormSubmit = async (values: FormValues) => {
		setIsLoading(true);
		const params = {
			from_name: values.fullName,
			user_email: values.email,
			message: `${values.subject} - ${values.message} `,
		};
		// Create a hidden form element
		const form = document.createElement("form");
		form.style.display = "none";
		// Create and set properties for each input element
		const fromNameInput = document.createElement("input");
		fromNameInput.type = "text";
		fromNameInput.name = "from_name";
		fromNameInput.value = params.from_name;

		const userEmailInput = document.createElement("input");
		userEmailInput.type = "email";
		userEmailInput.name = "user_email";
		userEmailInput.value = params.user_email;

		const messageTextarea = document.createElement("textarea");
		messageTextarea.name = "message";
		messageTextarea.value = params.message;

		// Add CSS classes to the form elements for styling
		fromNameInput.className = "form-input";
		userEmailInput.className = "form-input";
		messageTextarea.className = "form-textarea";

		// Append the input elements to the form element
		form.appendChild(fromNameInput);
		form.appendChild(userEmailInput);
		form.appendChild(messageTextarea);

		document.body.appendChild(form); // Append the form to the document body

		emailjs
			.sendForm("mail_service", "template_84orhgd", form, "7ZmItk0ETameADS5w")
			.then((res) => {
				// console.log("success! " + res.status);
				formik.resetForm();
				FormToast({
					message: "Your message was sent Successfully!",
					success: true,
				});
				setIsLoading(false);
			})
			.catch((error) => {
				FormToast({
					message: "Oops, something went wrong couldn't send your message!",
					success: false,
				});
				setIsLoading(false);
			});

		document.body.removeChild(form); // Remove the form from the document body after submission
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: ContactFormModel,
		onSubmit: (values) => {
			handleFormSubmit(values);
		},
	});

	return (
		<div className='flex flex-col mt-20 items-center px-4 xs:px-5 md:px-20 slg:px-44 pb-16'>
			<h4 className='text-lg sm:text-2xl slg:text-3xl tracking-tighter text-center uppercase font-[500]'>
				For any support just send your query
			</h4>
			<p className='sm:px-8 xl:px-32 text-center mt-2 md:mt-5 text-xs sm:text-sm slg:text-base text-secondary-200 !leading-[180%]'>
				Collaboratively promote client-focused convergence vis-a-vis customer
				directed alignments via plagiarize strategic users and standardized
				infrastructures.
			</p>
			<FormikProvider value={formik}>
				<Form className='flex w-full flex-col gap-2 md:gap-4 xl:px-20 mt-2 sm:mt-8'>
					<div className='grid md:grid-cols-2 gap-2 md:gap-8'>
						<div>
							<label
								htmlFor='fullName'
								className='block font-[400] text-sm sm:text-base text-primary-300 mt-4 mb-2'
							>
								Full Name
							</label>

							<Field
								type='text'
								id='fullName'
								name='fullName'
								placeholder='Enter your full name'
								className='w-full px-2 py-3 font-[400] text-xs sm:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
							/>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block font-[400] text-sm sm:text-base text-primary-300 mt-4 mb-2'
							>
								Email address
							</label>

							<Field
								type='text'
								id='email'
								name='email'
								placeholder='Enter your email address'
								className='w-full px-2 py-3 font-[400] text-xs sm:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='subject'
							className='block font-[400] text-sm sm:text-base text-primary-300 mt-4 mb-2'
						>
							Subject
						</label>

						<Field
							type='text'
							id='subject'
							name='subject'
							placeholder='Enter your subject'
							className='w-full px-2 py-3 font-[400] text-xs sm:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>
					<div>
						<label
							htmlFor='message'
							className='block font-[400] text-sm sm:text-base text-primary-300 mt-4 mb-2'
						>
							Message
						</label>

						<textarea
							id='message'
							name='message'
							rows={12}
							placeholder='Enter your message'
							value={formik.values.message}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className='w-full px-2 py-3 font-[400] text-xs sm:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in'
						/>
					</div>

					<button className='w-fit min-w-[10rem] px-5 py-3 bg-primary hover:bg-primaryColor-100 transition text-white rounded-md mb-2 mt-5'>
						{isLoading ? (
							<ClipLoader color='#d4d3d3' size={20} />
						) : (
							"Send Message"
						)}
					</button>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default ContactForm;
