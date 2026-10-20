"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import carouselImage from "@/assets/carousel.png"
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: carouselImage,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primary: { label: "Shop Now", href: "/products" },
    secondary: { label: "View Deals", href: "/deals" },
  },
  {
    image: carouselImage,
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primary: { label: "Shop Now", href: "/products" },
    secondary: { label: "Learn More", href: "/about" },
  },
  {
    image: carouselImage,
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    primary: { label: "Order Now", href: "/products" },
    secondary: { label: "Delivery Info", href: "/delivery" },
  },
]

export default function CarouselWithPagination() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto w-full mb-2">
      <Carousel
        className="w-full overflow-hidden"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-100 w-full  overflow-hidden ">
                <Image
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  src={slide.image}
                  priority={index === 0}
                />
                {/* green overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-green-600/90 via-green-500/75 to-green-400/50" />

                {/* content */}
                <div className="absolute inset-0 flex flex-col justify-center gap-3 px-6 text-white sm:gap-4 sm:px-16 md:px-24">
                  <div className="overflow-hidden">
                    <h2
                      className={cn(
                        "max-w-sm text-2xl font-bold leading-tight transition-all delay-100 duration-700 sm:text-3xl",
                        current === index + 1
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      )}
                    >
                      {slide.title}
                    </h2>
                  </div>

                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "text-base transition-all delay-400 duration-700 sm:text-lg",
                        current === index + 1
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      )}
                    >
                      {slide.subtitle}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "mt-2 flex gap-3 transition-all delay-700 duration-700",
                      current === index + 1
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    )}
                  >
                    <Link
                      href={slide.primary.href}
                      className="whitespace-nowrap rounded-lg bg-white px-4 py-2.5 text-base font-semibold text-green-500 transition-transform hover:scale-105 hover:bg-green-50 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      {slide.primary.label}
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className="whitespace-nowrap rounded-lg border border-white/70 px-4 py-2.5 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-white/10 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex inset-s-4 size-10 border-0 bg-white text-green-600 hover:bg-green-50 hover:text-green-700" />
        <CarouselNext className="hidden sm:flex inset-e-4 size-10 border-0  bg-white text-green-600 hover:bg-green-50 hover:text-green-700" />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2.5 rounded-full bg-green-200 transition-all",
              current === index + 1 ? "w-8 bg-green-600" : "w-2.5"
            )}
            key={index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}