"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const promos = [
  {
    badge: "🔥 Deal of the Day",
    title: "Fresh Organic Fruits",
    subtitle: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    button: "Shop Now",
    href: "/products",
    gradient:
      "bg-linear-to-br from-[#00855C] to-[#00BB7C]",
    buttonText: "text-green-600",
    direction: -150,
  },
  {
    badge: "✨ New Arrivals",
    title: "Exotic Vegetables",
    subtitle: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    button: "Explore Now",
    href: "/products",
    gradient:
      "bg-linear-to-br from-[#FF2A55] to-[#FF8611]",
    buttonText: "text-orange-600",
    direction: 150,
  },
];

export default function PromoCards() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 0.2,
  });

  return (
    <section
      ref={ref}
      className="container mx-auto overflow-x-clip px-10 py-10"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {promos.map((promo) => (
          <motion.div
            key={promo.title}
            initial={{
              opacity: 0,
              x: promo.direction,
            }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: promo.direction }
            }
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className={`${promo.gradient} relative flex flex-col items-start justify-center gap-5 overflow-hidden rounded-3xl p-8 text-white`}
          >
            {/* Decorative circles */}
            <span className="absolute -top-16 -right-16 size-45 rounded-full bg-white/15" />
            <span className="absolute -bottom-12 -left-12 size-40 rounded-full bg-white/15" />

            <span className="relative rounded-full bg-white/20 px-4 text-sm font-medium">
              {promo.badge}
            </span>

            <h3 className="relative text-3xl font-bold">
              {promo.title}
            </h3>

            <p className="relative text-lg text-white/90">
              {promo.subtitle}
            </p>

            <p className="relative flex flex-wrap items-baseline gap-4">
              <span className="text-3xl font-bold">
                {promo.discount}
              </span>

              <span className="text-md text-white/90">
                Use code:{" "}
                <strong className="font-bold text-white">
                  {promo.code}
                </strong>
              </span>
            </p>

            <Link
              href={promo.href}
              className={`relative mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[17px] font-semibold transition hover:scale-105 ${promo.buttonText}`}
            >
              {promo.button}
              <ArrowRight className="size-5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
