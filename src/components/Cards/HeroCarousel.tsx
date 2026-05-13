"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Picture from "../picture/Picture";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = ({ heroImage, heroImage2 }: any) => {
	// 1. Initialize Embla first so the API is available for subsequent hooks
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: 5000, stopOnInteraction: false }),
	]);

	const [selectedIndex, setSelectedIndex] = useState(0);

	// 2. Logic to track the active index and reset the progress bar
	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi, onSelect]);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi],
	);

	const slides = [
		{ src: heroImage2, alt: "New Season Arrivals", href: "/category" },
		{ src: heroImage, alt: "Exclusive Import Deals", href: "/category" },
	];

	return (
		<div className='col-span-8 relative group overflow-hidden rounded-md lg:rounded-r-none lg:rounded-l-2xl border border-gray-100 h-fit lg:h-[300px] shadow-sm'>
			{/* Viewport */}
			<div className='overflow-hidden h-fit lg:h-[300px]' ref={emblaRef}>
				<div className='flex'>
					{slides.map((slide, index) => (
						<div className='flex-[0_0_100%] min-w-0 relative' key={index}>
							<Link href={slide.href}>
								<Picture
									src={slide.src}
									alt={slide.alt}
									className='w-full h-fit lg:h-[300px] object-contain lg:object-fill transition-transform duration-1000 group-hover:scale-105'
								/>
								{/* Subtle Vignette Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-background/80 sm:from-background/50 via-transparent to-transparent pointer-events-none' />
							</Link>
						</div>
					))}
				</div>
			</div>

			{/* Navigation Arrows (Sleek Glassmorphism) */}
			<button
				onClick={scrollPrev}
				className='absolute left-4 top-1/2 -translate-y-1/2 size-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white text-white hover:text-black z-20'
			>
				<ChevronLeft size={20} strokeWidth={3} />
			</button>
			<button
				onClick={scrollNext}
				className='absolute right-4 top-1/2 -translate-y-1/2 size-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white text-white hover:text-black z-20'
			>
				<ChevronRight size={20} strokeWidth={3} />
			</button>

			{/* Single Progress Bar Indicator */}
			<div className='absolute bottom-3 lg:bottom-6 left-1/2 -translate-x-1/2 z-20'>
				<div className='h-1 w-12 lg:w-24 rounded-full bg-black/20 backdrop-blur-md overflow-hidden border border-white/10'>
					<div
						key={selectedIndex}
						className='h-full bg-background w-full origin-left animate-carousel-progress'
					/>
				</div>
			</div>

			<style jsx>{`
				@keyframes carousel-progress {
					from {
						transform: scaleX(0);
					}
					to {
						transform: scaleX(1);
					}
				}
				.animate-carousel-progress {
					/* Time must match the Autoplay delay (5000ms = 5s) */
					animation: carousel-progress 5s linear forwards;
				}
			`}</style>
		</div>
	);
};

export default HeroCarousel;
