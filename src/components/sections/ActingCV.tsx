import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import RevealHeading from "@/components/RevealHeading";
import { profile } from "@/content/profile";

export default function ActingCV() {
  const t = useTranslations("acting");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="acting" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end gap-6">
            <h2 className="shrink-0 text-4xl text-fg sm:text-5xl">
              <RevealHeading>{t("title")}</RevealHeading>
            </h2>
            <span className="mb-2 h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <h3 className="section-label">{t("creditsTitle")}</h3>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              {t("credits")}
            </p>

            {/* Experience / training as a clean table box */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-carbon/40 ring-1 ring-line">
              {profile.training.map((entry) => (
                <div
                  key={`${entry.period}-${entry.place}`}
                  className="grid grid-cols-1 gap-1 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-8 sm:py-6"
                >
                  <p className="font-display text-lg text-fg sm:col-span-5">
                    {entry.role[locale]}
                  </p>
                  <p className="text-sm text-muted sm:col-span-4">
                    {entry.place}
                  </p>
                  <p className="section-label sm:col-span-3 sm:text-right">
                    {entry.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 border-t border-line pt-8">
            <h3 className="section-label">{t("skillsTitle")}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg sm:text-lg">
              {t("skills")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
