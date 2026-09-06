import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal>
          <div className="group relative aspect-[4/5] w-full overflow-hidden border border-fg/10 bg-carbon">
            <Image
              src="/portfolio/about.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <h2 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {t("body")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
