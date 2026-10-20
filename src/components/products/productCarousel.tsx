"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

export default function ProductCarousel({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelected(index);
    thumbApi?.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="overflow-hidden rounded-xl" ref={mainRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="min-w-0 flex-[0_0_100%]">
              <Image
                src={src}
                alt={`Product image ${index + 1}`}
                width={600}
                height={600}
                priority={index === 0}
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 overflow-hidden" ref={thumbRef}>
        <div className="flex gap-2">
          {images.map((src, index) => (
            <button
              key={`thumb-${src}-${index}`}
              type="button"
              onClick={() => mainApi?.scrollTo(index)}
              className={cn(
                "relative aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition",
                index === selected
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}