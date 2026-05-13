"use client";
import React, { useEffect, useState } from "react";
import AppLayout from "@src/components/AppLayout";
import { useSearchParams } from "next/navigation";
import { CompanyName } from "@constants";
import RefundPolicy from "./_components/RefundPolicy";
import DeliveryReturn from "./_components/DeliveryReturn";
import AppMenu from "@src/components/Navbars/AppMenu";

const Page = () => {
  const searchParams = useSearchParams().toString();
  const search = searchParams.replace(/=$/, "");
  const [activeTab, setActiveTab] = useState<string>("termsOfUse");

  useEffect(() => {
    if (search === "terms-of-use") {
      setActiveTab("termsOfUse");
    } else if (search === "privacy-policy") {
      setActiveTab("privacyPolicy");
    } else if (search === "delivery-return") {
      setActiveTab("deliveryReturn");
    } else if (search === "refund-policy") {
      setActiveTab("refundPolicy");
    }
  }, [search]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <AppLayout>
      <main className="bg-white mx-auto mt-32 pb-24">
        <section className="flex w-full flex-col items-center pt-8 xl:pt-16 gap-2 sm:gap-3 px-2 sm:px-8 md:px-16 text-center">
          <h4 className="text-black text-base sm:text-xl font-semibold leading-[120%]">
            Our Policies
          </h4>
          <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl leading-[150%]">
            {CompanyName} Policies
          </h3>
          <span className="text-xs sm:text-sm xl:text-base leading-[150%] text-gray-400 sm:max-w-3xl slg:max-w-2xl">
            Your privacy is important to us at {CompanyName}. We respect your
            privacy regarding any information we may collect from you across our
            website.
          </span>
          <div className="flex gap-2 mt-3 xl:mt-8 text-[10px] xs:text-xs sm:text-sm slg:text-base leading-[140%] bg-[#F5F5F5] p-1 rounded-md transition">
            <button
              className={`px-2 xl:px-4 py-2 rounded-md ${
                activeTab === "termsOfUse"
                  ? "bg-white text-black"
                  : "bg-[#F5F5F5] text-gray-600"
              }`}
              onClick={() => handleTabClick("termsOfUse")}
            >
              Terms of use
            </button>
            <button
              className={`px-2 xl:px-4 py-2 rounded-md ${
                activeTab === "privacyPolicy"
                  ? "bg-white text-black"
                  : "bg-[#F5F5F5] text-gray-600"
              }`}
              onClick={() => handleTabClick("privacyPolicy")}
            >
              Privacy Policy
            </button>
            <button
              className={`px-2 xl:px-4 py-2 rounded-md ${
                activeTab === "deliveryReturn"
                  ? "bg-white text-black"
                  : "bg-[#F5F5F5] text-gray-600"
              }`}
              onClick={() => handleTabClick("deliveryReturn")}
            >
              Delivery & Return
            </button>
            <button
              className={`px-2 xl:px-4 py-2 rounded-md ${
                activeTab === "refundPolicy"
                  ? "bg-white text-black"
                  : "bg-[#F5F5F5] text-gray-600"
              }`}
              onClick={() => handleTabClick("refundPolicy")}
            >
              Refund Policy
            </button>
          </div>
        </section>
        <div className="flex mx-auto w-full mt-4 md:mt-8 text-base leading-[155%] px-2 sm:px-0 sm:max-w-xl slg:max-w-2xl pb-20">
          {activeTab === "termsOfUse" && (
            <div id="termsOfUse" className="text-gray-600 space-y-6">
              <div>
                <h4 className="text-base sm:text-xl xl:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Terms of Service & Procurement Agreement
                </h4>
                <p className="mt-3 leading-[1.8] text-xs md:text-sm xl:text-base">
                  By accessing the Warespire Innovations platform and initiating
                  a procurement request, you agree to be bound by the following
                  operational terms and conditions:
                </p>
              </div>

              <ul className="list-none space-y-5 text-xs md:text-sm xl:text-base">
                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    01. Phased Payment Structure
                  </span>
                  Warespire Innovations operates on a two-phase payment model.{" "}
                  <strong>Phase 1 (Procurement):</strong> Covers the cost of
                  goods and must be verified before items are purchased from
                  international vendors. <strong>Phase 2 (Logistics):</strong>{" "}
                  Covers international freight and customs clearing, payable
                  upon the cargo's arrival at our Lagos warehouse.
                </li>

                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    02. Verification of Manual Transfers
                  </span>
                  For all bank transfers, customers are required to upload a
                  valid transaction receipt and provide a Session ID/Reference
                  via the platform. Procurement will only commence once our
                  accounts department has successfully reconciled the funds.
                </li>

                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    03. Logistics & Timelines
                  </span>
                  While we strive for precision, all delivery timelines (Air:
                  7-14 days; Sea: 45-60 days) are estimates. Warespire Digital
                  Innovations is not liable for delays caused by international
                  carrier schedules, weather conditions, or Nigerian Customs
                  Service inspections.
                </li>

                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    04. Exchange Rate Fluctuations
                  </span>
                  Prices for international procurement are subject to global
                  market volatility. Warespire Innovations reserves the right to
                  adjust invoices if there is a significant shift in the
                  exchange rate between the time of order placement and the time
                  of actual procurement.
                </li>

                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    05. Customs & Prohibited Items
                  </span>
                  Customers are responsible for ensuring that their requested
                  items are not on the Nigerian Customs Service prohibition
                  list. Warespire Innovations reserves the right to cancel
                  procurement for items deemed illegal or restricted.
                </li>

                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    06. Storage & Demurrage
                  </span>
                  Once cargo arrives in Lagos and the shipping invoice is
                  issued, customers have 7 business days to complete payment and
                  pick up items. Beyond this period, a daily storage fee
                  (demurrage) may be applied.
                </li>

                <li>
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wider mb-1">
                    07. Cancellation & Refunds
                  </span>
                  Once procurement has been finalized with an international
                  vendor, the Phase 1 payment becomes non-refundable. Refunds
                  are only applicable if the vendor fails to fulfill the order
                  or if the item is out of stock.
                </li>
              </ul>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-6">
                <p className="leading-[1.6] text-xs md:text-sm italic">
                  <span className="font-bold text-slate-800 not-italic uppercase text-[10px] block mb-1">
                    Limitation of Liability:
                  </span>
                  Warespire Innovations acts as a procurement and logistics
                  facilitator. We are not the manufacturers of the goods
                  purchased. Any product warranty claims must be directed to the
                  original manufacturer, though we will provide reasonable
                  assistance in facilitating such claims.
                </p>
              </div>
            </div>
          )}
          {activeTab === "privacyPolicy" && (
            <div id="privacyPolicy" className="text-slate-600 space-y-8">
              {/* --- SECTION 1: DATA COLLECTION --- */}
              <div>
                <h4 className="text-sm sm:text-xl xl:text-2xl font-black text-slate-900 uppercase tracking-tighter">
                  01. Data Intelligence & Collection
                </h4>
                <p className="mt-3 leading-[1.8] text-xs md:text-sm xl:text-base">
                  Warespire Innovations collects personal information to provide
                  a secure, seamless international procurement and logistics
                  experience. We act as a data controller under the Nigeria Data
                  Protection Regulation (NDPR). By using our services, you
                  entrust us with:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-900 text-xs uppercase block mb-2 tracking-widest">
                      Logistics Data
                    </span>
                    <p className="text-xs leading-relaxed">
                      Delivery addresses, geolocation data, and recipient
                      contact details to facilitate international shipping and
                      last-mile delivery.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-900 text-xs uppercase block mb-2 tracking-widest">
                      Financial Records
                    </span>
                    <p className="text-xs leading-relaxed">
                      Transaction references, payment receipts, and bank account
                      details for automated reconciliation and withdrawal
                      processing.
                    </p>
                  </div>
                </div>
              </div>

              {/* --- SECTION 2: USAGE --- */}
              <div>
                <h4 className="text-sm sm:text-base lg:text-lg font-black text-slate-900 uppercase tracking-widest">
                  02. Strategic Use of Information
                </h4>
                <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
                  We utilize your data to facilitate complex international trade
                  operations, including:
                </p>
                <ul className="mt-4 space-y-3 text-xs md:text-sm xl:text-base list-none pl-0">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 rounded-full bg-primary-100 shrink-0" />
                    <span>
                      <strong>Procurement Fulfillment:</strong> Sharing
                      necessary data with international vendors and clearing
                      agents to secure your goods.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 rounded-full bg-primary-100 shrink-0" />
                    <span>
                      <strong>Fraud Mitigation:</strong> Running AML (Anti-Money
                      Laundering) checks and identity cross-referencing to
                      protect the Warespire Innovations ecosystem.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 rounded-full bg-primary-100 shrink-0" />
                    <span>
                      <strong>Operational Updates:</strong> Sending real-time
                      tracking milestones via SMS, Email, or WhatsApp.
                    </span>
                  </li>
                </ul>
              </div>

              {/* --- SECTION 3: SECURITY --- */}
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 font-black text-4xl">
                  SECURE
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-widest text-primary-100">
                    03. Data Security & Encryption
                  </h4>
                  <p className="mt-4 leading-[1.8] text-xs md:text-sm xl:text-base opacity-80">
                    Warespire Innovations employs bank-grade AES-256 encryption
                    to protect your sensitive identifiers (BVN/NIN). Your data
                    is stored in secure, siloed environments and is never sold
                    to third-party advertisers.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                      SSL Secured
                    </div>
                    <div className="px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                      NDPR Compliant
                    </div>
                    <div className="px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                      Encrypted Storage
                    </div>
                  </div>
                </div>
              </div>

              {/* --- SECTION 4: RIGHTS --- */}
              <div>
                <h4 className="text-sm sm:text-base lg:text-lg font-black text-slate-900 uppercase tracking-widest">
                  04. Your Privacy Rights
                </h4>
                <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
                  You have the right to access, rectify, or request the deletion
                  of your personal data. To exercise these rights or to opt-out
                  of non-essential communications, please contact our Data
                  Protection Officer at
                  <a
                    href="mailto:support@Warespire.com"
                    className="text-primary-100 font-bold ml-1 hover:underline"
                  >
                    privacy@Warespire.com
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
          {activeTab === "deliveryReturn" && <DeliveryReturn />}
          {activeTab === "refundPolicy" && <RefundPolicy />}
        </div>
      </main>
      <AppMenu />
    </AppLayout>
  );
};

export default Page;
