import React from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  totalDataNumber: number;
  maxScrollTotal?: number;
  scrollLeftTotal?: number;
  children: React.ReactNode;
  handlePrev: (categoryId?: string) => void;
  handleNext: (categoryId?: string) => void;
}

const Carousel = ({
  totalDataNumber,
  maxScrollTotal,
  scrollLeftTotal,
  children,
  handlePrev,
  handleNext,
}: CarouselProps) => {
  return (
    <div className="relative">
      {totalDataNumber > 3 && (
        <div className="hidden sm:flex w-[2.5rem] sm:w-[4rem] justify-between  px-1 sm:px-2 py-1.5 sm:py-2 rounded-lg absolute -top-10 -right-1 lg:-right-9 drop-shadow-sm z-10">
          <BiSolidLeftArrow
            onClick={() => handlePrev()}
            className={`text-xl cursor-pointer hover:scale-105 transition ${
              scrollLeftTotal! >= 5 ? "text-[#000]" : "text-gray-400"
            }`}
          />
          <BiSolidRightArrow
            onClick={() => handleNext()}
            className={`text-xl cursor-pointer hover:scale-105 transition ${
              scrollLeftTotal! >= maxScrollTotal!
                ? "text-[#000]"
                : "text-[gray-400]"
            }`}
          />
        </div>
      )}

      {children}
    </div>
  );
};

export default Carousel;
