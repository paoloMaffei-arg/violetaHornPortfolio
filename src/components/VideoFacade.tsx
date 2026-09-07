"use client";

import Image from "next/image";
import { useState } from "react";

export default function VideoFacade({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        preload="none"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title}
      className="group relative h-full w-full cursor-pointer"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors duration-500 group-hover:bg-black/30">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-fg/70 bg-black/20 text-fg backdrop-blur-sm transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-fg group-hover:bg-fg group-hover:text-bg sm:h-24 sm:w-24">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
