"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Hero() {
  const tHero = useTranslations("hero");
  const tContact = useTranslations("contact");

  const whatsappUrl = buildWhatsAppUrl(profile.whatsapp, tContact("prefill"));

  // Split "Actriz & Modelo · Buenos Aires" into corner metadata labels.
  const [roleLabel, placeLabel] = tHero("tagline")
    .split("·")
    .map((s) => s.trim());

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden"
    >
      {/* Background photo with a slow settle (focal load moment) */}
      <div className="hero-img absolute inset-0">
        <Image
          src="/portfolio/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_28%]"
        />
      </div>

      {/* Cinematic grade: vignette, bottom weight for the title, fade into the page */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_65%_25%,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-bg via-black/55 to-transparent" />

      {/* Corner metadata labels */}
      <div
        className="hero-rise absolute left-6 top-24 max-w-[9rem] sm:top-28"
        style={{ animationDelay: "0.2s" }}
      >
        <p className="section-label hero-label">{roleLabel}</p>
      </div>
      {placeLabel && (
        <div
          className="hero-rise absolute right-6 top-24 max-w-[9rem] text-right sm:top-28"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="section-label hero-label">{placeLabel}</p>
        </div>
      )}

      {/* Bottom block: oversized name overlapping the photo */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 sm:pb-16">
        <div className="overflow-hidden pb-[0.12em]">
          <h1
            className="hero-wipe font-display font-light leading-[0.86] tracking-[-0.03em] text-fg"
            style={{
              animationDelay: "0.25s",
              fontSize: "clamp(3rem, 12.5vw, 11rem)",
            }}
          >
            {profile.name}
          </h1>
        </div>

        <div
          className="hero-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: "0.55s" }}
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

    </section>
  );
}
