import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="w-full border-t border-line bg-bg py-28 sm:py-40"
    >
      <div className="mx-auto w-full max-w-4xl px-6 text-center">
        <Reveal>
          <p className="section-label">{t("title")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 font-display text-[1.6rem] font-light leading-[1.4] tracking-[-0.01em] text-fg sm:text-[2.35rem] sm:leading-[1.32]">
            <span className="mr-3 inline-block h-12 w-16 translate-y-[0.15em] overflow-hidden rounded-xl align-baseline ring-1 ring-line sm:mr-4 sm:h-16 sm:w-24 sm:rounded-2xl">
              <span className="relative block h-full w-full">
                <Image
                  src="/portfolio/about.jpg"
                  alt={t("imageAlt")}
                  fill
                  sizes="96px"
                  className="object-cover grayscale"
                />
              </span>
            </span>
            {t("body")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
