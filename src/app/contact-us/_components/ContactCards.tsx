"use client";
import { Skeleton } from "@heroui/react";
import ContactCard from "@src/components/Cards/ContactCard";
import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";
import { FiPhoneCall, FiClock, FiMessageSquare } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";

/* ─────────────────────────────────────────────
   Card skeleton
───────────────────────────────────────────── */
const CardSkeleton = () => (
  <div className="flex flex-col items-center text-center bg-white border border-black/[0.07] rounded-2xl p-7 gap-4 shadow-sm animate-pulse">
    <div className="w-12 h-12 rounded-xl bg-gray-100" />
    <div className="h-3.5 w-20 rounded-full bg-gray-100" />
    <div className="w-6 h-px bg-gray-100" />
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="h-3.5 w-32 rounded-full bg-gray-100" />
      <div className="h-3 w-24 rounded-full bg-gray-100" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const ContactCards = () => {
  const { data: generalSettings, isLoading, isError } = useGeneralSettings();
  const GeneralSettings: WooCommerceSetting[] = generalSettings;

  const contactCardData = [
    {
      id: 1,
      title: "Email Us",
      type: "email",
      icon: <RxEnvelopeClosed />,
      additionalText: "support@warespire.com",
      // additionalText: GeneralSettings ? GeneralSettings[0]?.value : "N/A",
    },
    {
      id: 2,
      title: "Call Us",
      type: "tel",
      icon: <FiPhoneCall />,
      additionalText: "08034802011",
      // additionalText: GeneralSettings ? GeneralSettings[1]?.value : "N/A",
    },
    {
      id: 3,
      title: "Our Location",
      type: "text",
      icon: <IoLocationOutline />,
      description: "28, Adekunle Fajuyi Way, Ikeja GRA, Lagos",
      // description: GeneralSettings ? GeneralSettings[2]?.value : "N/A",
    },
    {
      id: 4,
      title: "Business Hours",
      type: "text",
      icon: <FiClock />,
      additionalText: "Mon – Fri",
      description: "9:00 AM – 6:00 PM WAT",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gray-950 text-white px-6 py-20 sm:py-28 text-center">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ghost heading watermark */}
        <span
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(80px,18vw,200px)] font-black tracking-tighter leading-none text-white/[0.03] pointer-events-none select-none uppercase"
          aria-hidden
        >
          Contact
        </span>

        {/* Subtle blue glow behind content */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-[1] max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse" />
            We'd love to hear from you
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(38px,6vw,72px)] font-bold tracking-tight leading-[1.05] mb-5">
            Get in{" "}
            <span className="italic font-light text-[#B5182E]">Touch</span>
          </h1>

          <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-lg mx-auto">
            Have a question, feedback, or just want to say hello? Our team is
            ready and happy to help.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CARDS  (pulls up over hero)
      ══════════════════════════════════════ */}
      <div className="relative z-[1] max-w-5xl mx-auto px-4 sm:px-6 -mt-10 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            contactCardData.map((card) => (
              <ContactCard
                key={card.id}
                isLoading={isLoading}
                type={card.type}
                title={card.title}
                icon={card.icon}
                additionalText={card.additionalText}
                description={card.description}
              />
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTACT FORM  +  MAP — side by side
      ══════════════════════════════════════ */}
      <div className="w-[100%] mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 lg:grid-cols-[1fr] gap-6">
        {/* ── FORM ── */}
        <div className="bg-white rounded-2xl border border-black/[0.07] p-8 sm:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="mb-7">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-600 mb-1.5">
              Send a Message
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Send an email to support@warespire.com. We'll get back to you
              shortly
            </h2>
          </div>

          {/* <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>

           
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us a little more about your enquiry…"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 resize-none"
              />
            </div>

            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gray-950 text-white font-semibold text-sm tracking-wide py-3.5 px-6 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-none"
            >
              <FiMessageSquare className="w-4 h-4" />
              Send Message
            </button>

            <p className="text-[11px] text-center text-gray-400">
              We typically respond within 24 hours on business days.
            </p>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
