"use client";
import { filterCustomersByEmail, generateUniqueReference } from "@constants";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import {
  cardPaymentFormModel,
  checkoutFormModel,
} from "@src/components/config/models";
import { RadioGroup } from "@headlessui/react";
import { useAppSelector } from "@src/components/hooks";
import useToken from "@src/components/hooks/useToken";
import { useCreateOrder, useCustomer } from "@src/components/lib/woocommerce";
import AuthModal from "@src/components/modal/AuthModal";
import SignupModal from "@src/components/modal/SignupModal";
import { APICall } from "@utils";
import {
  cardPaymentRedirect,
  createOrderData,
  encryptOrderData,
  payOrder,
} from "@utils/endpoints";
import { City, ICity, State } from "country-state-city";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";
import { useCart } from "react-use-cart";
import { PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY } from "@utils/lib/data";
import PaystackPaymentButton from "@src/components/Payment/PaystackPaymentButton";
import {
  RiShieldCheckFill,
  RiTruckLine,
  RiWallet3Line,
} from "@node_modules/react-icons/ri";
import { FiChevronRight, FiPackage, FiCreditCard } from "react-icons/fi";

/* ─────────────────────────────────────────────────────────────
   TYPE INTERFACES  (unchanged from original)
───────────────────────────────────────────────────────────── */
interface SelectOption {
  label: string;
  value: string;
}

interface PaymentFormValues {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email?: string;
  houseAddress?: string;
  phone?: string;
  orderNotes: string;
  city?: string;
  state?: string;
}

/* ─────────────────────────────────────────────────────────────
   SMALL REUSABLE PIECES
───────────────────────────────────────────────────────────── */

/** Uniform label used across every form field */
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2">
    {children}
  </label>
);

/** Thin red error line rendered below a field */
const FieldError = ({ name }: { name: string }) => (
  <ErrorMessage
    name={name}
    component="p"
    className="text-[11px] text-red-500 font-semibold mt-1.5 ml-1 flex items-center gap-1"
  />
);

/** Section card wrapper — white rounded card with subtle border */
const SectionCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-3xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden ${className}`}
  >
    {children}
  </div>
);

/** Coloured top accent bar that sits at the very top of a card */
const CardAccentBar = () => (
  <div className="h-[3px] w-full bg-gradient-to-r from-gray-900 via-primaryColor-100 to-gray-900" />
);

/** Section header row with an icon, title, and optional step number */
const SectionHeader = ({
  icon,
  title,
  step,
}: {
  icon: React.ReactNode;
  title: string;
  step?: number;
}) => (
  <div className="flex items-center gap-3 px-7 py-6 border-b border-gray-50">
    {step !== undefined && (
      <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">
        {step}
      </span>
    )}
    <span className="text-gray-400 text-lg flex-shrink-0">{icon}</span>
    <h2 className="text-base font-black text-gray-900 tracking-tight">
      {title}
    </h2>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   SHARED react-select STYLES  (identical logic, just extracted)
───────────────────────────────────────────────────────────── */
const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    background: "#F9FAFB",
    border: "none",
    borderRadius: "0.875rem",
    padding: "0.35rem 0.25rem",
    boxShadow: "none",
    "&:hover": { border: "none" },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#9CA3AF",
    fontSize: "14px",
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isSelected
      ? "#111827"
      : state.isFocused
        ? "#F3F4F6"
        : "transparent",
    color: state.isSelected ? "#fff" : "#374151",
    fontSize: "14px",
  }),
};

/** Shared Tailwind classes for every plain <Field> text input */
const fieldClass = (hasError: boolean) =>
  `w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none transition-all duration-200
   focus:ring-2 focus:bg-white border border-transparent
   ${
     hasError
       ? "border-red-400 bg-red-50/40 focus:ring-red-400/10"
       : "focus:ring-primaryColor-100/20 focus:border-primaryColor-100/30"
   }`;

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const CheckoutInfoForm = () => {
  /* ── All hooks and state are unchanged from original ── */
  const { token, email } = useToken();
  const router = useRouter();
  const [paystackLoading, setPaystackLoading] = useState(false);

  const states: SelectOption[] = State.getStatesOfCountry("NG").map((s) => ({
    label: s.name,
    value: s.isoCode,
  }));

  const [selectedPaymentChannel, setSelectedPaymentChannel] =
    useState("alliance_pay");
  const [citiesForSelectedState, setCitiesForSelectedState] = useState<
    SelectOption[]
  >([]);
  const [state, setState] = useState("");
  const [iframeUrl, setIframeUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { baseCurrency, exchangeRate } = useAppSelector((s) => s.currency);

  const {
    mutate: createOrder,
    isLoading: isLoadingCreateOrder,
    isError: isErrorCreateOrder,
    data: CreateOrderData,
  } = useCreateOrder();

  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
  } = useCustomer("");
  //@ts-ignore
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);

  const handleClosePaymentModal = () => setIsPaymentModalOpen(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/user/login");
  };

  const handleStateChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      const cities: ICity[] = City.getCitiesOfState("NG", selectedOption.value);
      setCitiesForSelectedState(
        cities.map((city) => ({ label: city.name, value: city.name })),
      );
      formik.setFieldValue("state", selectedOption.label);
      formik.setFieldValue("city", "");
    }
  };

  const { items, emptyCart } = useCart();

  const calculateSubtotal = () =>
    items.reduce((total, item: any) => total + item?.price * item?.quantity, 0);

  const convertedValue = calculateSubtotal() * exchangeRate;
  const calculateTotal = () => convertedValue;

  useEffect(() => {
    if (calculateSubtotal() <= 0) router.push("/");
  }, [calculateSubtotal]);

  /* ── Auth modal content ── */
  const AuthModalContent = () => (
    <h3 className="text-sm sm:text-base md:text-2xl md:px-12 text-black text-center">
      Sorry! You have to login to make a request.
    </h3>
  );

  /* ── WooCommerce order payload (unchanged) ── */
  const orderData = {
    customer_id: wc_customer_info?.id,
    payment_method: "alliance-payment-card",
    payment_method_title: "alliance-payment",
    set_paid: true,
    billing: {
      first_name: wc_customer_info?.first_name,
      last_name: wc_customer_info?.last_name,
      address_1: wc_customer_info?.billing?.address_1,
      city: wc_customer_info?.billing?.city,
      state: wc_customer_info?.billing?.state,
      postcode: wc_customer_info?.billing?.postcode,
      country: wc_customer_info?.billing?.country,
      email: wc_customer_info?.email,
      phone: wc_customer_info?.billing?.phone,
    },
    line_items: items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  /* ── All mutations are unchanged ── */
  const payOrderMutation = useMutation(
    async (encryptedPaymentOrder: any) => {
      const response = await APICall(
        payOrder,
        encryptedPaymentOrder,
        true,
        true,
      );
      return response?.data;
    },
    {
      onSuccess: async (data) => {
        const redirectUrl = data?.data?.payment_detail?.redirect_url;
        createOrder(orderData);
        if (redirectUrl) setIframeUrl(redirectUrl);
      },
      onError: (error) => console.error("Payment failed:", error),
    },
  );

  const cardPaymentOrderMutation = useMutation(
    async (orderReferenceData: any) => {
      const response = await APICall(
        cardPaymentRedirect,
        orderReferenceData,
        false,
        true,
      );
      return response?.data;
    },
    {
      onSuccess: async (data) => {
        await payOrderMutation.mutateAsync({ data });
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred.";
        FormToast({ message: msg, success: false });
      },
    },
  );

  const createdOrderMutation = useMutation(
    async (encrytedData: any) => {
      const response = await APICall(
        createOrderData,
        encrytedData,
        false,
        true,
      );
      return response?.data;
    },
    {
      onSuccess: async (data: OrderPaymentResponse) => {
        setPaymentRef(data?.data?.order?.reference);
        setIsPaymentModalOpen(true);
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred.";
        FormToast({ message: msg, success: false });
      },
    },
  );

  const encryptedMutation = useMutation(
    async (data: any) => {
      const response = await APICall(encryptOrderData, data, false, true);
      return response?.data;
    },
    {
      onSuccess: async (data) => {
        await createdOrderMutation.mutateAsync({ data });
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred.";
        FormToast({ message: msg, success: false });
      },
    },
  );

  const handleFormSubmit = async (value: FormValues) => {
    const dataPayload = {
      Customer: {
        first_name: value?.firstName,
        last_name: value?.lastName,
        mobile: value?.phone?.toString(),
        country: baseCurrency.countryCode,
        email: value?.email,
      },
      Order: {
        amount: convertedValue,
        reference: generateUniqueReference(),
        description: value?.orderNotes,
        currency: baseCurrency.code,
      },
    };
    token
      ? await encryptedMutation.mutateAsync(dataPayload)
      : setIsModalOpen(true);
  };

  const handleCreateOrder = async (
    value: PaymentFormValues,
    setSubmitting: (val: boolean) => void,
  ) => {
    await cardPaymentOrderMutation.mutateAsync({
      reference: paymentRef,
      payment_option: "C",
      country: baseCurrency.countryCode,
      card: {
        cvv: value.cvv,
        card_number: value.cardNumber,
        expiry_month: value.expiryMonth,
        expiry_year: value.expiryYear,
      },
    });
  };

  /* ── Formik setup (unchanged) ── */
  const initialValues: FormValues = {
    firstName: wc_customer_info?.first_name || "",
    lastName: wc_customer_info?.last_name || "",
    email: wc_customer_info?.email || "",
    houseAddress: wc_customer_info?.billing?.address_1 || "",
    phone: wc_customer_info?.billing?.phone || "",
    orderNotes: "",
    city: wc_customer_info?.billing?.city || "",
    state: wc_customer_info?.billing?.state || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: checkoutFormModel,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (selectedPaymentChannel === "alliance_pay")
        await handleFormSubmit(values);
    },
  });

  const paymentInitialValues: PaymentFormValues = {
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  };

  const paymentFormik = useFormik({
    initialValues: paymentInitialValues,
    validationSchema: cardPaymentFormModel,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values, { setSubmitting }) =>
      handleCreateOrder(values, setSubmitting),
  });

  /* ────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────── */
  return (
    <>
      <FormikProvider value={formik}>
        <Form className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ════════════════════════════════════════
              LEFT COLUMN — Delivery details (8 cols)
          ════════════════════════════════════════ */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* ── Step 1: Delivery Details ── */}
            <SectionCard>
              <CardAccentBar />
              <SectionHeader
                icon={<RiTruckLine />}
                title="Delivery Details"
                step={1}
              />

              <div className="px-7 py-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <FieldLabel>
                    First Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Field
                    name="firstName"
                    placeholder="e.g. John"
                    className={fieldClass(
                      !!(formik.touched.firstName && formik.errors.firstName),
                    )}
                  />
                  <FieldError name="firstName" />
                </div>

                {/* Last Name */}
                <div>
                  <FieldLabel>
                    Last Name <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Field
                    name="lastName"
                    placeholder="e.g. Doe"
                    className={fieldClass(
                      !!(formik.touched.lastName && formik.errors.lastName),
                    )}
                  />
                  <FieldError name="lastName" />
                </div>

                {/* Email — full width */}
                <div className="md:col-span-2">
                  <FieldLabel>
                    Email Address <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Field
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={fieldClass(
                      !!(formik.touched.email && formik.errors.email),
                    )}
                  />
                  <FieldError name="email" />
                </div>

                {/* State */}
                <div>
                  <FieldLabel>
                    State <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    options={states}
                    value={states.find((o) => o.label === formik.values.state)}
                    onChange={handleStateChange}
                    placeholder="Select State"
                    styles={customSelectStyles}
                  />
                  <FieldError name="state" />
                </div>

                {/* City */}
                <div>
                  <FieldLabel>
                    City <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    options={citiesForSelectedState}
                    value={citiesForSelectedState.find(
                      (o) => o.label === formik.values.city,
                    )}
                    onChange={(opt) => formik.setFieldValue("city", opt?.label)}
                    isDisabled={citiesForSelectedState.length === 0}
                    placeholder="Select City"
                    styles={customSelectStyles}
                  />
                  <FieldError name="city" />
                </div>

                {/* Street Address — full width */}
                <div className="md:col-span-2">
                  <FieldLabel>
                    Street Address <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Field
                    name="houseAddress"
                    placeholder="House number and street name"
                    className={fieldClass(
                      !!(
                        formik.touched.houseAddress &&
                        formik.errors.houseAddress
                      ),
                    )}
                  />
                  <FieldError name="houseAddress" />
                </div>

                {/* Phone */}
                <div>
                  <FieldLabel>
                    Phone Number <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Field
                    name="phone"
                    className={fieldClass(
                      !!(formik.touched.phone && formik.errors.phone),
                    )}
                  />
                  <FieldError name="phone" />
                </div>

                {/* Order Notes — full width */}
                <div className="md:col-span-2">
                  <FieldLabel>
                    Order Notes{" "}
                    <span className="text-gray-400 normal-case tracking-normal font-medium">
                      (Optional)
                    </span>
                  </FieldLabel>
                  <Field
                    as="textarea"
                    name="orderNotes"
                    rows={3}
                    placeholder="Any special instructions for your delivery..."
                    className={`${fieldClass(false)} resize-none`}
                  />
                </div>
              </div>
            </SectionCard>

            {/* ── Delivery assurance strip ── */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <RiTruckLine />, label: "Fast Delivery" },
                { icon: <RiShieldCheckFill />, label: "Secure Checkout" },
                { icon: <FiPackage />, label: "Easy Returns" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-100 rounded-2xl py-4 px-2 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-gray-200 transition-colors"
                >
                  <span className="text-primaryColor-100 text-xl">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT COLUMN — Order summary (4 cols)
          ════════════════════════════════════════ */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-5">
              {/* ── Order Summary ── */}
              <SectionCard>
                <CardAccentBar />
                <SectionHeader
                  icon={<FiPackage />}
                  title="Order Summary"
                  step={2}
                />

                <div className="px-6 py-5">
                  {/* Line items */}
                  <div className="space-y-3 mb-5">
                    {items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-50 last:border-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Item image if available */}
                          {item.image && (
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                          <FormatMoney2 value={item.price * item.quantity} />
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                      <span>Subtotal</span>
                      <span>
                        <FormatMoney2 value={calculateSubtotal()} />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-primaryColor-100 font-semibold text-xs">
                        Calculated later
                      </span>
                    </div>
                    {/* Divider */}
                    <div className="h-px w-full bg-gray-100 my-1" />
                    {/* Grand total */}
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                        Total Payable
                      </span>
                      <span className="text-2xl font-black text-gray-900 tracking-tight">
                        <FormatMoney2 value={calculateSubtotal()} />
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* ── Payment Method ── */}
              <SectionCard>
                <CardAccentBar />
                <SectionHeader
                  icon={<FiCreditCard />}
                  title="Payment Method"
                  step={3}
                />

                <div className="px-6 py-5 space-y-5">
                  {/* Radio payment selector */}
                  <RadioGroup
                    value={selectedPaymentChannel}
                    onChange={setSelectedPaymentChannel}
                    className="flex flex-col gap-3"
                  >
                    {[
                      {
                        id: "alliance_pay",
                        label: "Alliance Pay",
                        sub: "Secure card payment",
                      },
                      {
                        id: "paystack",
                        label: "Paystack",
                        sub: "Fast & reliable",
                      },
                    ].map((method) => (
                      <RadioGroup.Option
                        key={method.id}
                        value={method.id}
                        className={({ checked }) =>
                          `relative flex cursor-pointer items-center justify-between rounded-2xl px-5 py-4 border-2 transition-all outline-none
                           ${
                             checked
                               ? "border-gray-900 bg-gray-900 text-white"
                               : "border-gray-100 bg-white hover:border-gray-200"
                           }`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <div>
                              <p
                                className={`text-sm font-bold ${checked ? "text-white" : "text-gray-700"}`}
                              >
                                {method.label}
                              </p>
                              <p
                                className={`text-[11px] font-medium mt-0.5 ${checked ? "text-gray-300" : "text-gray-400"}`}
                              >
                                {method.sub}
                              </p>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                checked ? "border-white" : "border-gray-300"
                              }`}
                            >
                              {checked && (
                                <span className="w-2.5 h-2.5 rounded-full bg-white block" />
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>

                  {/* Inline validation summary — same names as original */}
                  <div className="space-y-0.5">
                    {[
                      "firstName",
                      "lastName",
                      "email",
                      "houseAddress",
                      "phone",
                      "city",
                      "state",
                    ].map((name) => (
                      <ErrorMessage
                        key={name}
                        name={name}
                        component="p"
                        className="text-[11px] text-red-500 font-semibold"
                      />
                    ))}
                  </div>

                  {/* ── Pay button / Paystack button ── */}
                  {selectedPaymentChannel === "alliance_pay" ? (
                    <button
                      type="button"
                      onClick={() => formik.handleSubmit()}
                      disabled={encryptedMutation?.isLoading || !formik.isValid}
                      className="w-full flex items-center justify-center gap-2.5 py-4 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-200 hover:bg-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {encryptedMutation?.isLoading ? (
                        <ClipLoader color="#fff" size={18} />
                      ) : (
                        <>
                          Pay Now
                          <FiChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    /* Paystack button — your existing component, unstyled here */
                    <div className="w-full">
                      <PaystackPaymentButton formik={formik} />
                    </div>
                  )}

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
                    <RiShieldCheckFill className="text-green-500" size={14} />
                    <span>Encrypted &amp; Secure Payment</span>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </Form>
      </FormikProvider>

      {/* ══════════════════════════════════════════
          MODALS  (completely unchanged)
      ══════════════════════════════════════════ */}

      {/* Auth redirect modal */}
      <SignupModal
        isOpen={isModalOpen ? true : false}
        onClose={handleCloseModal}
        setIsOpen={setIsModalOpen}
        content={<AuthModalContent />}
        buttonText="Login"
      />

      {/* Card details modal */}
      <AuthModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        content={
          <FormikProvider value={paymentFormik}>
            <Form className="flex flex-col xl:flex-row w-full gap-4 mt-3 max-w-[1440px] mx-auto mb-3">
              <div className="px-2 py-4 slg:p-5 flex-1 flex flex-col gap-4 rounded-xl">
                <h3 className="text-xs sm:text-base md:text-lg text-primary text-center">
                  Please input card information
                </h3>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-8">
                  {/* Card Number */}
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block font-[500] text-xs sm:text-base text-primary-300 mb-2"
                    >
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="tel"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="Enter card number"
                      required
                      maxLength={16}
                      className="w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in"
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component="div"
                      className="text-red-600 text-xs text-left"
                    />
                  </div>

                  {/* Expiry Month */}
                  <div>
                    <label
                      htmlFor="expiryMonth"
                      className="block font-[500] text-xs sm:text-base text-primary-300 mb-2"
                    >
                      Expiry Month <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      id="expiryMonth"
                      name="expiryMonth"
                      placeholder="MM"
                      required
                      maxLength={2}
                      className="w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in"
                    />
                    <ErrorMessage
                      name="expiryMonth"
                      component="div"
                      className="text-red-600 text-xs text-left"
                    />
                  </div>

                  {/* Expiry Year */}
                  <div>
                    <label
                      htmlFor="expiryYear"
                      className="block font-[500] text-xs sm:text-base text-primary-300 mb-2"
                    >
                      Expiry Year <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      id="expiryYear"
                      name="expiryYear"
                      placeholder="YY"
                      required
                      maxLength={2}
                      className="w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in"
                    />
                    <ErrorMessage
                      name="expiryYear"
                      component="div"
                      className="text-red-600 text-xs text-left"
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block font-[500] text-xs sm:text-base text-primary-300 mb-2"
                    >
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="password"
                      id="cvv"
                      name="cvv"
                      placeholder="Enter CVV"
                      required
                      maxLength={4}
                      className="w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="text-red-600 text-xs text-left"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-primary px-8 mt-4 md:px-0 md:w-4/5 max-w-[11rem] py-2 mx-auto text-white rounded-md hover:bg-primaryColor-100 text-xs md:text-base"
                >
                  {payOrderMutation.isLoading ? (
                    <ImSpinner2 className="text-xl animate-spin mx-auto" />
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </Form>
          </FormikProvider>
        }
      />

      {/* iFrame payment modal (unchanged) */}
      {iframeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-11/12 max-w-2xl p-4">
            <iframe
              src={iframeUrl}
              width="100%"
              height="600px"
              title="Payment"
              className="rounded-md"
            />
            <button
              onClick={() => {
                emptyCart();
                setIframeUrl(null);
                setIsPaymentModalOpen(false);
              }}
              className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutInfoForm;
