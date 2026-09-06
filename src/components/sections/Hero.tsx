"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Hero() {
  const tHero = useTranslations("hero");
  const tContact = useTranslations("contact");
  const reduceMotion = useReducedMotion();

  const whatsappUrl = buildWhatsAppUrl(profile.whatsapp, tContact("prefill"));

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden pb-24 sm:items-center sm:pb-0"
    >
      {/* Background photo with a slow settle (focal load moment) */}
      <div className="hero-img absolute inset-0">
        <Image
          src="/portfolio/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_30%]"
        />
      </div>

      {/* Cinematic grade: darken left for text, vignette, and a fade into the page below */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_30%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <p className="section-label hero-rise" style={{ animationDelay: "0.1s" }}>
          {tHero("tagline")}
        </p>

        {/* Name — the authored reveal: a mask wipe up */}
        <div className="mt-5 overflow-hidden pb-[0.1em]">
          <h1
            className="hero-wipe text-[3.25rem] leading-[0.95] text-fg sm:text-7xl md:text-8xl"
            style={{ animationDelay: "0.25s" }}
          >
            {profile.name}
          </h1>
        </div>

        <div
          className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: "0.6s" }}
        >
          <a href="#reel" className="btn-solid">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {tHero("watchReel")}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-cta"
          >
            {tHero("whatsapp")}
            <span aria-hidden="true" className="arrow">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      >
        <motion.svg
          className="h-6 w-6 text-fg/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 2.4 }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
    </section>
  );
}
