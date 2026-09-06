import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import RevealHeading from "@/components/RevealHeading";
import PortfolioMarquee from "@/components/gallery/PortfolioMarquee";
import { photos } from "@/content/gallery";
import { Link } from "@/i18n/routing";

export default function PortfolioPreview() {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl text-fg sm:text-5xl">
              <RevealHeading>{t("title")}</RevealHeading>
            </h2>
            <Link
              href="/portfolio"
              className="link-underline text-xs font-medium uppercase tracking-[0.22em] text-fg/80 transition-colors hover:text-fg"
            >
              {t("viewAll")}
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <PortfolioMarquee photos={photos} />
      </div>
    </section>
  );
}
