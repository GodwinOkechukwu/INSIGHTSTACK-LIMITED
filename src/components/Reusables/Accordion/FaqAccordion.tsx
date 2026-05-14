"use client";
import React, { useState } from "react";
import * as Icons1 from "react-icons/sl";
import { SITE_NAME, SITE_EMAIL } from "@constants/seoContants";

interface FaqAccordionItemProps {
  id?: number;
  title: string;
  description: string;
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  title,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-[#263646] bg-[#fff] shadow-md transition">
      <div
        className="flex justify-between items-center shadow-sm py-5 px-4 sm:px-8 text-xs xs:text-sm sm:text-base font-[500] cursor-pointer"
        onClick={handleAccordionToggle}
      >
        <span className="text-left">{title}</span>
        <div
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
          className="transition"
        >
          {isExpanded ? (
            <Icons1.SlArrowUp className="text-sm sm:text-xl transition" />
          ) : (
            <Icons1.SlArrowRight className="text-sm sm:text-xl transition" />
          )}
        </div>
      </div>
      <div
        className="px-4 sm:px-8 text-sm sm:text-base text-start"
        style={{
          paddingTop: isExpanded ? "10px" : "0",
          height: isExpanded ? "8rem" : 0,
          opacity: isExpanded ? 1 : 0,
          transition: "height 0.3s, opacity 0.3s",
          overflow: "hidden",
        }}
      >
        {description}
      </div>
    </div>
  );
};

const faqItems: FaqAccordionItemProps[] = [
  {
    id: 1,
    title: `How does the ${SITE_NAME} importation process work?`,
    description:
      "We operate a seamless two-phase system: First, you pay for the cost of the goods to initiate procurement in China/Overseas. Once your cargo arrives in Nigeria, a second invoice is generated for shipping and customs clearing fees.",
  },
  {
    id: 2,
    title: "How long does it take to receive my imported items?",
    description:
      "Procurement typically takes 24-48 hours. International air freight usually arrives within 7 to 14 business days, while sea freight takes 45 to 60 days. You can track every milestone via your 'Logistics Journey' dashboard.",
  },
  {
    id: 3,
    title: "What is the required initial deposit for procurement?",
    description:
      "Our flexible payment plan requires a down payment of 20% to 40% of the goods' value. For items below ₦200,000, a 40% deposit is required. For premium items valued at ₦500,000 and above, we offer a reduced commitment of 20-30%.",
  },
  {
    id: 4,
    title: "Do you handle nationwide delivery within Nigeria?",
    description:
      "Yes, we provide secure nationwide delivery. Once your shipping and clearing fees are settled at our Lagos warehouse, we can dispatch your items to any state via our trusted local logistics partners.",
  },

  {
    id: 5,
    title: "How do I verify my manual bank transfer?",
    description:
      `After making a transfer to the ${SITE_NAME} corporate account, simply upload your transaction receipt and Session ID/Reference via the 'Verify Payment' button on your order page for instant admin reconciliation.`,
  },

  {
    id: 6,
    title: "When exactly are my goods released for pickup or delivery?",
    description:
      "Goods are released immediately after the final balance of the goods and the total cost of shipping/clearing have been verified by our accounts department.",
  },
  {
    id: 7,
    title: "Are my imports covered by a warranty?",
    description:
      `Yes. All electronic and mechanical products procured through ${SITE_NAME} carry a standard manufacturer’s warranty, which we help you facilitate in the event of a technical issue.`,
  },
  {
    id: 8,
    title: "Is there a benefit to paying off my balance early?",
    description:
      `Yes, ${SITE_NAME} rewards financial discipline. Customers who complete their payments ahead of schedule may be eligible for discounts on future shipping fees or interest-free credit extensions.`,
  },
  {
    id: 9,
    title: "How do I get help if my shipment is delayed?",
    description:
      "Our support team is available 24/7. You can use the 'Support Hub' link on your invoice or contact your designated account officer directly for real-time updates on customs or weather-related delays.",
  },
];
 
const FaqAccordion: React.FC = () => {
  return (
    <section className="min-h-screen px-2 xs:px-8 sm:px-16 md:px-32 pt-6 sm:pt-8 pb-6 sm:pb-8 xl:pb-0 xl:pt-10 overflow-hidden">
      <div className="grid gap-6 mb-12 lg:px-16">
        {faqItems.map((item) => (
          <FaqAccordionItem
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FaqAccordion;
