import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main>
      <h1>{t("tagline")}</h1>
    </main>
  );
}
