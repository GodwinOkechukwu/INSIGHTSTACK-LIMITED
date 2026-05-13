"use client";
import React, { useState, useTransition } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoginFormModel } from "../config/models";
import { useRouter } from "next/navigation";
import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";
import { GoUnlock } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { HiArrowRight } from "react-icons/hi2";
import { useMutation, useQueryClient } from "react-query";
import { login } from "@utils/endpoints";
import { APICall } from "@utils";
import { useAppDispatch } from "../hooks";
import { authLogin } from "../Redux/Auth";
import Link from "next/link";
import TextInput from "../Reusables/TextInput";
import GlobalLoader from "../modal/GlobalLoader";

interface FormValues {
  email: string;
  password: string;
}

/* ── shared input style constants ── */
const inputBase =
  "w-full px-4 py-3 text-sm rounded-xl border bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-blue-500/15";
const inputNormal = "border-gray-200 focus:border-blue-500";
const inputError =
  "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400/10";

/* ── field wrapper ── */
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

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const initialValues: FormValues = { email: "", password: "" };

  const loginMutation = useMutation(
    async (value: FormValues) => {
      const response = await APICall(login, [value], true, true);
      return response?.data;
    },
    {
      onSuccess: async (data, variable: FormValues) => {
        const accessToken = data?.data?.token;
        const userData: UserType = data?.data?.user;
        if (accessToken && userData?.roles[0] === "customer") {
          Cookies.set(AUTH_TOKEN_KEY, accessToken);
          Cookies.set(AUTH_EMAIL, userData?.email);
          dispatch(authLogin({ token: accessToken, user: userData }));
          queryClient.invalidateQueries("customer");
          startTransition(() => router.push("/"));
        }
      },
      onError: (error: any) => {
        console.error("Login Error:", error);
      },
    },
  );

  const formik = useFormik({
    initialValues,
    validationSchema: LoginFormModel,
    onSubmit: async (values) => {
      loginMutation.mutateAsync(values);
    },
  });

  const err = formik.errors;
  const touched = formik.touched;
  const isSubmitting = loginMutation.isLoading;

  return (
    <>
      <div className="w-full max-w-[50rem] mx-auto">
        {/* Card */}
        <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.07)] overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900" />

          <div className="px-7 pt-8 pb-9 sm:px-9">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 mb-4">
                <GoUnlock className="w-5 h-5 text-gray-900" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <FormikProvider value={formik}>
              <Form className="flex flex-col gap-4">
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
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    showPasswordIcon
                    showPassword={showPassword}
                    togglePasswordVisibility={() => setShowPassword((p) => !p)}
                    passwordIconClassname="text-gray-400 hover:text-gray-600 text-base transition-colors"
                    className={`${inputBase} ${touched.password && err.password ? inputError : inputNormal}`}
                  />
                </Field>

                {/* Forgot password */}
                <div className="flex justify-end -mt-1">
                  <Link
                    href="/user/forget-password"
                    className="text-[12px] font-semibold text-gray-900 hover:text-blue-700 hover:underline underline-offset-4 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!formik.isValid || isSubmitting}
                  className={`
                    mt-1 flex items-center justify-center gap-2
                    w-full py-3 rounded-xl text-sm font-semibold tracking-wide text-white
                    transition-all duration-200
                    ${
                      formik.isValid && !isSubmitting
                        ? "bg-gray-900 hover:bg-gray-700 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(37,99,235,0.35)] active:translate-y-0 cursor-pointer"
                        : "bg-gray-700 cursor-not-allowed"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <ImSpinner2 className="text-lg animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <HiArrowRight className="w-4 h-4" />
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

                {/* Register redirect */}
                <p className="text-center text-sm text-gray-500">
                  Don&rsquo;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      startTransition(() => router.push("/user/register"))
                    }
                    className="text-gray-900 font-semibold hover:underline underline-offset-4 transition-colors hover:text-blue-700"
                  >
                    Create one
                  </button>
                </p>
              </Form>
            </FormikProvider>
          </div>
        </div>

        {/* Below-card note */}
        <p className="text-center text-[11px] text-gray-400 mt-5 leading-relaxed px-4">
          By signing in you agree to our{" "}
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

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default LoginForm;
