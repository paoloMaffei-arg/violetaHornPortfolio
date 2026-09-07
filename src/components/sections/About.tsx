import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden border-t border-line py-28 sm:py-44"
    >
      {/* Portrait as a graded background, hero-style */}
      <div className="absolute inset-0">
        <Image
          src="/portfolio/about.jpg"
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          className="object-cover object-[50%_22%] grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_45%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="section-label hero-label">{t("title")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-3xl font-display text-[1.55rem] font-light leading-[1.42] tracking-[-0.01em] text-fg [text-shadow:0_1px_24px_rgba(0,0,0,0.7)] sm:text-[2.3rem] sm:leading-[1.34]">
            {t("body")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
