"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Hero() {
  const tHero = useTranslations("hero");
  const tContact = useTranslations("contact");

  const whatsappUrl = buildWhatsAppUrl(profile.whatsapp, tContact("prefill"));

  return (
    <section
      id="top"
      className="relative flex h-svh min-h-[640px] w-full items-center overflow-hidden"
    >
      <Image
        src="/portfolio/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <h1 className="font-display text-5xl tracking-wide text-fg sm:text-6xl md:text-7xl">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-md text-sm uppercase tracking-[0.25em] text-fg/80 sm:text-base">
            {tHero("tagline")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#reel"
              className="border border-fg/40 px-6 py-3 text-sm uppercase tracking-widest text-fg transition-colors hover:border-fg hover:bg-fg hover:text-bg"
            >
              {tHero("watchReel")}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm uppercase tracking-widest text-fg/80 underline underline-offset-4 transition-colors hover:text-fg"
            >
              {tHero("whatsapp")}
            </a>
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <svg
          className="h-6 w-6 animate-bounce text-fg/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
