import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/gallery/Gallery";
import { photos } from "@/content/gallery";
import { Link } from "@/i18n/routing";

const PREVIEW_COUNT = 6;

export default function PortfolioPreview() {
  const t = useTranslations("portfolio");
  const preview = photos.slice(0, PREVIEW_COUNT);

  return (
    <section id="portfolio" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
              {t("title")}
            </h2>
            <Link
              href="/portfolio"
              className="text-sm uppercase tracking-widest text-fg/80 underline underline-offset-4 transition-colors hover:text-fg"
            >
              {t("viewAll")}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <Gallery photos={preview} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
