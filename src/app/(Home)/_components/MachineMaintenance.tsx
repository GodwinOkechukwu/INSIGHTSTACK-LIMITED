import Picture from "@src/components/picture/Picture";
import { speaker } from "@public/images";
import { ArrowRight } from "lucide-react";
import { journalbg } from "@public/images";
import Link from "@node_modules/next/link";

export default function MachineMaintenance() {
  return (
    <section className="bg-[#F5F3F1] font-syne py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl  px-5 sm:px-8 lg:px-12 ">
        <div className="grid  w-full grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <Picture
                src={speaker}
                alt="Research Laboratory"
                className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#031b1c]/50 via-transparent to-[#0b6b73]/20" />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="max-w-[620px]">
            {/* Heading */}
            <h2 className="font-playfair text-[2.3rem] sm:text-[3rem] lg:text-[4rem] leading-[1.05] tracking-[-0.04em] text-[#151515]">
              Pioneering <span className="text-[#C8263A]">Human Evolution</span>
            </h2>

            {/* Description */}
            <p className="mt-7 text-[#5E5E5E] text-[15px] sm:text-[17px] leading-[1.9] font-light">
              Our Research &amp; Development laboratory is currently running 14
              clinical trials for Gen-IV neural interfaces and metabolic
              optimizers. Join the vanguard of biological enhancement.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              {[
                "FDA Clinical Phase III Enrollment",
                "Ethical Enhancement Protocols",
                "Global Data Sovereignty",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-7 h-7 rounded-full border border-[#E25767] flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[#E25767]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <p className="text-[#242424] font-semibold tracking-[-0.02em] text-[15px] sm:text-[17px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link href="/user/register">
                <button
                  className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                bg-[#1B1C1C]
                hover:bg-black
                text-white
                text-sm
                sm:text-[15px]
                font-semibold
                tracking-[-0.01em]
                px-8
                sm:px-10
                h-[58px]
                rounded-full
                transition-all
                duration-300
                shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                "
                >
                  Explore Active Trials
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
