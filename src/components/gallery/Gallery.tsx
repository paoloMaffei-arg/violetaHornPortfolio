"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/content/gallery";
import Lightbox from "./Lightbox";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openAt = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(i);
  };

  const close = () => {
    setOpenIndex(null);
    // Return keyboard focus to the thumbnail that opened the lightbox, so a
    // keyboard user doesn't lose their place in the grid.
    triggerRef.current?.focus();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={(e) => openAt(i, e.currentTarget)}
            aria-label={photo.alt}
            className="group relative aspect-[3/4] w-full overflow-hidden border border-fg/10 bg-carbon"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 [@media(hover:hover)]:group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} onClose={close} />
      )}
    </>
  );
}
