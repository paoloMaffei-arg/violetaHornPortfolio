import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <span className="font-display text-lg tracking-widest text-fg">
          {profile.name}
        </span>
        <p>
          © {year} · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
