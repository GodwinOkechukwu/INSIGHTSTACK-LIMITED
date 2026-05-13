"use client";
import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { RegisterFormModel } from "../config/models";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN_KEY, AUTH_EMAIL } from "@constants";
import Cookies from "js-cookie";
import FormToast from "../Reusables/Toast/SigninToast";
import { ImSpinner2 } from "react-icons/im";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import TextInput from "../Reusables/TextInput";
import axios from "axios";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

/* ── tiny field wrapper to keep JSX clean ── */
const Field = ({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-[11px] text-red-500 flex items-center gap-1">
        <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const inputBase =
  "w-full px-4 py-3 text-sm rounded-xl border bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-blue-500/15";
const inputNormal = "border-gray-200 focus:border-blue-500";
const inputError =
  "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400/10";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    } as FormValues,
    validationSchema: RegisterFormModel,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const step1 = await axios.post("/api/customer/verify-email", {
          name: `${values.first_name.trim()} ${values.last_name.trim()}`,
          email: values.email,
          password: values.password,
        });

        const verificationToken = step1.data?.token;
        if (!verificationToken) {
          FormToast({
            message: "Registration failed. Please try again.",
            success: false,
          });
          return;
        }

        const step2 = await axios.post(
          `/api/customer/register/${verificationToken}`,
        );
        const jwtToken = step2.data?.token;

        if (jwtToken) {
          Cookies.set(AUTH_TOKEN_KEY, jwtToken);
          Cookies.set(AUTH_EMAIL, values.email);
          FormToast({
            message: "Account created successfully!",
            success: true,
          });
          resetForm();
          router.push("/");
        } else {
          FormToast({
            message: "Account activation failed. Please try again.",
            success: false,
          });
        }
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong. Please try again.";
        FormToast({ message, success: false });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const err = formik.errors;
  const touched = formik.touched;

  return (
    <div className="w-full max-w-[50rem] mx-auto">
      {/* Card */}
      <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.07)] overflow-hidden">
        {/* ── Top accent bar ── */}
        <div className="h-1 w-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-900" />

        <div className="px-7 pt-8 pb-9 sm:px-9">
          {/* ── Header ── */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 mb-4">
              <svg
                className="w-5 h-5 text-gray-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
              Create an account
            </h1>
            <p className="text-sm text-gray-500">
              Join us today — it only takes a minute
            </p>
          </div>

          {/* ── Form ── */}
          <FormikProvider value={formik}>
            <Form className="flex flex-col gap-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="First Name"
                  required
                  error={
                    touched.first_name && err.first_name
                      ? err.first_name
                      : undefined
                  }
                >
                  <TextInput
                    id="first_name"
                    placeholder="John"
                    type="text"
                    className={`${inputBase} ${touched.first_name && err.first_name ? inputError : inputNormal}`}
                  />
                </Field>

                <Field
                  label="Last Name"
                  required
                  error={
                    touched.last_name && err.last_name
                      ? err.last_name
                      : undefined
                  }
                >
                  <TextInput
                    id="last_name"
                    placeholder="Doe"
                    type="text"
                    className={`${inputBase} ${touched.last_name && err.last_name ? inputError : inputNormal}`}
                  />
                </Field>
              </div>

              {/* Email */}
              <Field
                label="Email Address"
                required
                error={touched.email && err.email ? err.email : undefined}
              >
                <TextInput
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  className={`${inputBase} ${touched.email && err.email ? inputError : inputNormal}`}
                />
              </Field>

              {/* Password */}
              <Field
                label="Password"
                required
                error={
                  touched.password && err.password ? err.password : undefined
                }
              >
                <TextInput
                  id="password"
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  showPasswordIcon
                  showPassword={showPassword}
                  togglePasswordVisibility={() => setShowPassword((p) => !p)}
                  passwordIconClassname="text-gray-400 hover:text-gray-600 text-base transition-colors"
                  className={`${inputBase} ${touched.password && err.password ? inputError : inputNormal}`}
                />
              </Field>

              {/* Password strength hint */}
              <p className="text-[11px] text-gray-400 -mt-2 leading-relaxed">
                Use 8+ characters with a mix of letters, numbers & symbols.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={!formik.isValid || isLoading}
                className={`
                  relative mt-1 flex items-center justify-center gap-2
                  w-full py-3 rounded-xl text-sm font-semibold tracking-wide text-white
                  transition-all duration-200
                  ${
                    formik.isValid && !isLoading
                      ? "bg-gray-900 hover:bg-gray-700 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(37,99,235,0.35)] active:translate-y-0 cursor-pointer"
                      : "bg-gray-900 cursor-not-allowed"
                  }
                `}
              >
                {isLoading ? (
                  <ImSpinner2 className="text-lg animate-spin" />
                ) : (
                  <>
                    Create Account
                    <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Login redirect */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/user/login")}
                  className="text-gray-900 font-semibold hover:underline underline-offset-4 transition-colors hover:text-blue-700"
                >
                  Sign in
                </button>
              </p>
            </Form>
          </FormikProvider>
        </div>
      </div>

      {/* Below-card note */}
      <p className="text-center text-[11px] text-gray-400 mt-5 leading-relaxed px-4">
        By creating an account you agree to our{" "}
        <a
          href="/terms"
          className="underline underline-offset-4 hover:text-gray-600 transition-colors"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="underline underline-offset-4 hover:text-gray-600 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default RegisterForm;
