"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import RevealHeading from "@/components/RevealHeading";
import VideoFacade from "@/components/VideoFacade";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reel() {
  const t = useTranslations("reel");
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const frame = (
    <>
      <VideoFacade
        src="/reel/reel.mp4"
        poster="/reel/reel-poster.jpg"
        title={t("play")}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(135%_135%_at_50%_45%,transparent_66%,rgba(0,0,0,0.32)_100%)]"
      />
    </>
  );

  const frameClass =
    "group relative mt-10 aspect-video w-full overflow-hidden bg-carbon ring-1 ring-line";

  return (
    <section id="reel" className="w-full bg-bg pb-24 pt-8 sm:pb-32 sm:pt-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-end gap-6">
          <h2 className="shrink-0 text-4xl text-fg sm:text-5xl">
            <RevealHeading>{t("title")}</RevealHeading>
          </h2>
          <span className="mb-2 h-px flex-1 bg-line" />
        </div>

        {!mounted || reduce ? (
          <div className={frameClass}>{frame}</div>
        ) : (
          <motion.div
            className={frameClass}
            initial={{ opacity: 0, scale: 0.965 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {frame}
          </motion.div>
        )}
      </div>
    </section>
  );
}
