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
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-fg/60 bg-black/40 backdrop-blur-sm transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 h-6 w-6 text-fg sm:h-7 sm:w-7"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
