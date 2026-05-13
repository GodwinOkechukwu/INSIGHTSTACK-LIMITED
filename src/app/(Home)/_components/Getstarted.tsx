import Link from "next/link";

export default function GetStarted() {
  return (
    <section className="w-full bg-black">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          {/* Heading */}
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Get started for free in 10 minutes
          </h2>

          {/* Sub text */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Get all the best technology services for your business growth for
            free. Open the last current account you will ever need for your
            business
          </p>

          {/* Button */}
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center bg-[#F59E0B] text-black font-semibold px-6 py-3 rounded-md text-sm hover:bg-[#d88a05] transition-all active:scale-95"
          >
            Get started in minutes
          </Link>
        </div>
      </div>
    </section>
  );
}
