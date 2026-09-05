"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import VideoFacade from "@/components/VideoFacade";

export default function Reel() {
  const t = useTranslations("reel");

  return (
    <section id="reel" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <h2 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 aspect-video w-full overflow-hidden border border-fg/10 bg-carbon">
            <VideoFacade
              src="/reel/reel.mp4"
              poster="/reel/reel-poster.jpg"
              title={t("play")}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
