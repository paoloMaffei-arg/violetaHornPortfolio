import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
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
          <h2 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-fg/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((row) => (
              <div
                key={row.label}
                className="border-b border-fg/10 pb-4"
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                  {row.label}
                </dt>
                <dd className="mt-2 font-display text-xl text-fg">
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
