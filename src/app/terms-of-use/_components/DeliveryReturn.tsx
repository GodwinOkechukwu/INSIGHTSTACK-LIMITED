"use client";
import React from "react";

const DeliveryReturn = () => {
  return (
    <div className="text-slate-600 space-y-12 pb-10">
      {/* --- HEADER SECTION --- */}
      <div>
        <h3 className="font-black text-xl md:text-2xl xl:text-3xl text-slate-900 uppercase tracking-tighter mb-4">
          Logistics & Fulfillment Policy
        </h3>
        <p className="text-sm md:text-base leading-relaxed max-w-4xl">
          At{" "}
          <span className="font-bold text-slate-900">
            Warespire Innovations
          </span>
          , we prioritize the integrity of your cargo. From international
          arrival to last-mile delivery, we utilize a strictly monitored courier
          network to ensure your procurement reaches you in pristine condition.
        </p>
      </div>

      {/* --- PRICING TIERS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tier 1 */}
        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
          <h4 className="font-black text-xs uppercase tracking-[2px] text-primary-100 mb-6 flex items-center gap-2">
            Standard Orders
          </h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-4">
            Orders Below ₦2,000,000
          </p>

          <ul className="space-y-4 text-xs md:text-sm">
            <li className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="font-medium">Lagos Standard</span>
              <span className="font-black text-slate-900">₦7,000.00*</span>
            </li>
            <li className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="font-medium">Lagos Onforwarding</span>
              <span className="font-black text-slate-900">₦10,000.00</span>
            </li>
            <li className="flex justify-between border-b border-slate-200/60 pb-2">
              <span className="font-medium">Outside Lagos</span>
              <span className="font-bold text-primary-100 uppercase text-[10px]">
                Negotiable
              </span>
            </li>
            <li className="flex items-center gap-2 pt-2 text-slate-500 italic text-[11px]">
              *Rates may vary based on item dimensions.
            </li>
          </ul>
        </div>

        {/* Tier 2 */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-100/10 relative overflow-hidden">
          <h4 className="font-black text-xs uppercase tracking-[2px] text-primary-100 mb-6 flex items-center gap-2">
            Premium Fulfillment
          </h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-4">
            Orders Above ₦2,000,000
          </p>

          <ul className="space-y-4 text-xs md:text-sm">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-medium opacity-80">Lagos Standard</span>
              <span className="font-black text-primary-100 uppercase">
                Free
              </span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-medium opacity-80">Lagos Onforwarding</span>
              <span className="font-black text-primary-100 uppercase">
                Free
              </span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="font-medium opacity-80">Outside Lagos</span>
              <span className="font-bold text-slate-400 uppercase text-[10px]">
                Negotiable
              </span>
            </li>
            <li className="flex items-center gap-2 pt-2 text-slate-400 text-[11px]">
              Priority dispatch from Lagos Warehouse.
            </li>
          </ul>
        </div>
      </div>

      {/* --- DELIVERY TIMELINES & REQS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h5 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
            Processing Time
          </h5>
          <p className="text-sm font-bold text-slate-900">
            Orders placed after 12:00 PM are logged for the next business day.
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
            Lagos Arrival
          </h5>
          <p className="text-sm font-bold text-slate-900">
            2 — 4 Business Days post-clearing.
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
            Interstate Arrival
          </h5>
          <p className="text-sm font-bold text-slate-900">
            5 — 7 Business Days post-clearing.
          </p>
        </div>
      </div>

      {/* --- TERMS BOX --- */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
        <h4 className="font-black text-sm uppercase tracking-widest text-slate-900">
          Critical Delivery Terms
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs md:text-sm">
          <p>
            •{" "}
            <span className="font-bold text-slate-800">
              Identity Verification:
            </span>{" "}
            Goods must be signed for by the account holder. Alternative
            recipients must be pre-authorized.
          </p>
          <p>
            •{" "}
            <span className="font-bold text-slate-800">Transfer of Risk:</span>{" "}
            Warespire Innovations bears no responsibility for items signed for
            by unauthorized third parties.
          </p>
          <p>
            •{" "}
            <span className="font-bold text-slate-800">Reporting Window:</span>{" "}
            Shortages or external damages must be reported to support on the{" "}
            <span className="underline">day of delivery</span>.
          </p>
          <p>
            • <span className="font-bold text-slate-800">No Redirection:</span>{" "}
            For security, we cannot redirect cargo once it has departed our
            Lagos hub.
          </p>
        </div>

        <div className="pt-4 flex items-center gap-3 text-xs font-bold text-primary-100">
          Queries:{" "}
          <a
            href="mailto:IgweBlessing@Warespire.com.ng"
            className="hover:underline"
          >
            IgweBlessing@Warespire.com.ng
          </a>
        </div>
      </div>

      {/* --- RETURN POLICY --- */}
      <div className="bg-red-50 border border-red-100 rounded-3xl p-8">
        <h4 className="font-black text-sm uppercase tracking-widest text-red-900 mb-4 flex items-center gap-2">
          Return & Replacement Policy
        </h4>
        <p className="text-xs md:text-sm text-red-800 leading-relaxed mb-6">
          Our commitment to quality includes the{" "}
          <span className="font-bold">direct replacement</span> of
          factory-defective products. To maintain this standard, we enforce the
          following boundaries:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/60 p-4 rounded-2xl text-xs text-red-900 font-medium">
            We do not assume responsibility for physical damages caused by
            improper use or handling after delivery.
          </div>
          <div className="bg-white/60 p-4 rounded-2xl text-xs text-red-900 font-medium">
            Return claims are void once delivery confirmation is signed and the
            inspection window has closed.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryReturn;
