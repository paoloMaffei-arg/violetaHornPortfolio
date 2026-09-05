import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fg/10 px-6 py-12 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <span className="font-display text-lg tracking-widest text-fg">
          {profile.name}
        </span>

        <SocialLinks />

        <p>
          © {year} · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
