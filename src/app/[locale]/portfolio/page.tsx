import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Gallery from "@/components/gallery/Gallery";
import { photos } from "@/content/gallery";
import { profile } from "@/content/profile";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: `${t("title")} — ${profile.name}`,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <main className="w-full bg-bg pt-32 pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h1 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
          {t("title")}
        </h1>
        <div className="mt-10">
          <Gallery photos={photos} />
        </div>
      </div>
    </main>
  );
}
