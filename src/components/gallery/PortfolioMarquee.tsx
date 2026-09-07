"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/content/gallery";
import Lightbox from "./Lightbox";

export default function PortfolioMarquee({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openAt = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(i);
  };
  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  // Two copies of the set so the marquee can loop seamlessly.
  const loop = [...photos, ...photos];

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6">
          {loop.map((photo, i) => {
            const realIndex = i % photos.length;
            const isClone = i >= photos.length;
            return (
              <button
                key={i}
                type="button"
                aria-hidden={isClone}
                tabIndex={isClone ? -1 : 0}
                onClick={(e) => openAt(realIndex, e.currentTarget)}
                aria-label={photo.alt}
                className="group relative aspect-[3/4] h-[52vh] max-h-[560px] min-h-[320px] shrink-0 overflow-hidden rounded-2xl bg-carbon ring-1 ring-line"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 42vw, 75vw"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              </button>
            );
          })}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} onClose={close} />
      )}
    </>
  );
}
