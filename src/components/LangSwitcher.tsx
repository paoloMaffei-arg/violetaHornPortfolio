"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LangSwitcher({
  tabIndex,
}: {
  tabIndex?: number;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-label="Change language"
      onClick={() => router.replace(pathname, { locale: other })}
      className="text-sm tracking-widest uppercase text-fg/80 transition-colors hover:text-fg"
    >
      {locale.toUpperCase()} / {other.toUpperCase()}
    </button>
  );
}
