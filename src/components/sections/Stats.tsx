import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import RevealHeading from "@/components/RevealHeading";
import { profile } from "@/content/profile";

function formatHeight(heightCm: number): string {
  const meters = (heightCm / 100).toFixed(2).replace(".", ",");
  return `${meters} m`;
}

export default function Stats() {
  const t = useTranslations("stats");
  const { stats, representation } = profile;

  const rows: { label: string; value: string }[] = [
    { label: t("height"), value: formatHeight(stats.heightCm) },
    {
      label: t("measures"),
      value: `${stats.bust} · ${stats.waist} · ${stats.hips}`,
    },
    { label: t("top"), value: stats.top },
    { label: t("pants"), value: stats.pants },
    { label: t("shoes"), value: stats.shoes },
    { label: t("hair"), value: t("hairValue") },
    { label: t("eyes"), value: t("eyesValue") },
    { label: t("representation"), value: representation.audiovisual },
  ];

  return (
    <section id="stats" className="w-full bg-bg py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end gap-6">
            <h2 className="shrink-0 text-4xl text-fg sm:text-5xl">
              <RevealHeading>{t("title")}</RevealHeading>
            </h2>
            <span className="mb-2 h-px flex-1 bg-line" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((row) => (
              <div key={row.label} className="border-b border-line pb-4">
                <dt className="section-label">{row.label}</dt>
                <dd className="mt-3 font-display text-xl tabular-nums text-fg">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
