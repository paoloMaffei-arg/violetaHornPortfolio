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
          <h2 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 border-t border-fg/10 pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
              {t("creditsTitle")}
            </h3>
            <p className="mt-3 max-w-xl text-base text-fg sm:text-lg">
              {t("credits")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-fg/10 pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
              {t("trainingTitle")}
            </h3>
            <ol className="mt-6 space-y-8 border-l border-fg/15 pl-6">
              {profile.training.map((entry) => (
                <li key={`${entry.period}-${entry.place}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.65rem] top-1.5 h-2 w-2 rounded-full bg-fg/60"
                  />
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    {entry.period}
                  </p>
                  <p className="mt-1 font-display text-lg text-fg sm:text-xl">
                    {entry.role[locale]}
                  </p>
                  <p className="mt-1 text-sm text-muted">{entry.place}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 border-t border-fg/10 pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
              {t("skillsTitle")}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg sm:text-lg">
              {t("skills")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
