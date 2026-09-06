import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
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
              {t("title")}
            </h2>
            <span className="mb-2 h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="section-label">{t("creditsTitle")}</h3>
            <p className="mt-4 max-w-xl text-base text-fg sm:text-lg">
              {t("credits")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="section-label">{t("trainingTitle")}</h3>
            <ol className="mt-8 space-y-8 border-l border-line pl-6">
              {profile.training.map((entry) => (
                <li key={`${entry.period}-${entry.place}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[calc(1.5rem+0.5px)] top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-fg/70 ring-4 ring-bg"
                  />
                  <p className="section-label !tracking-[0.18em]">
                    {entry.period}
                  </p>
                  <p className="mt-2 font-display text-lg text-fg sm:text-xl">
                    {entry.role[locale]}
                  </p>
                  <p className="mt-1 text-sm text-muted">{entry.place}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 border-t border-line pt-8">
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
