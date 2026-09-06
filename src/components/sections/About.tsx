import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import RevealHeading from "@/components/RevealHeading";
import RevealImage from "@/components/RevealImage";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center md:gap-16">
        <RevealImage className="group relative aspect-[4/5] w-full overflow-hidden bg-carbon ring-1 ring-line">
          <Image
            src="/portfolio/about.jpg"
            alt={t("imageAlt")}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        </RevealImage>
        <Reveal delay={0.15}>
          <div>
            <h2 className="text-4xl text-fg sm:text-5xl">
              <RevealHeading>{t("title")}</RevealHeading>
            </h2>
            <span className="mt-6 block h-px w-16 bg-line-strong" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {t("body")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
