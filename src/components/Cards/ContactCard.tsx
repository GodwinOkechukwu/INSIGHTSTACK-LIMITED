import { Skeleton } from "@heroui/react";
import React, { ReactNode } from "react";

interface ContactCardProps {
  title: string;
  type?: string;
  isLoading: boolean;
  icon: ReactNode;
  additionalText?: string | number | boolean;
  description?: string | number | boolean;
}

const ContactCard = ({
  title,
  type,
  icon,
  isLoading,
  additionalText,
  description,
}: ContactCardProps) => {
  const renderValue = () => {
    if (isLoading && additionalText) {
      return (
        <Skeleton className="h-4 w-32 rounded bg-gray-200 mx-auto animate-pulse" />
      );
    }
    if (type === "tel") {
      return (
        <a
          href={`tel:${additionalText}`}
          className="text-[#B5182E] font-medium text-sm hover:underline underline-offset-4 transition-colors hover:text-blue-700 break-all"
        >
          {additionalText as string}
        </a>
      );
    }
    if (type === "email") {
      return (
        <a
          href={`mailto:${additionalText}`}
          className="text-[#B5182E] font-medium text-sm hover:underline underline-offset-4 transition-colors hover:text-blue-700 break-all"
        >
          {additionalText as string}
        </a>
      );
    }
    return (
      <span className="text-gray-500 text-sm">{additionalText as string}</span>
    );
  };

  const renderDescription = () => {
    if (isLoading && description) {
      return (
        <Skeleton className="h-4 w-40 rounded bg-gray-200 mx-auto mt-1 animate-pulse" />
      );
    }
    return description ? (
      <span className="text-gray-400 text-xs leading-relaxed">
        {description as string}
      </span>
    ) : null;
  };

  return (
    <div className="group relative flex flex-col items-center text-center bg-white border border-black/[0.07] rounded-2xl p-7 gap-4 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(.22,.68,0,1.2)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] hover:border-black/[0.12]">
      {/* Top accent slide-in line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B5182E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-[#B5182E] transition-all duration-300 group-hover:bg-[#B5182E] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-[0_2px_8px_rgba(37,99,235,0.12)]">
        <span className="text-xl [&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold tracking-tight text-gray-900 leading-none">
        {title}
      </h3>

      {/* Divider */}
      <div className="w-6 h-px bg-gray-100" />

      {/* Values */}
      <div className="flex flex-col items-center gap-1 min-h-[2.25rem] justify-center">
        {renderValue()}
        {renderDescription()}
      </div>
    </div>
  );
};

export default ContactCard;
