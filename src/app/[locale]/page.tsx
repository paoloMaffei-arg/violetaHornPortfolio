import { setRequestLocale } from "next-intl/server";
import About from "@/components/sections/About";
import ActingCV from "@/components/sections/ActingCV";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import Reel from "@/components/sections/Reel";
import Stats from "@/components/sections/Stats";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Reel />
      <About />
      <Stats />
      <PortfolioPreview />
      <ActingCV />
      <Contact />
    </main>
  );
}
