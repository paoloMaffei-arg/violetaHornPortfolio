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
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-fg/70 transition-colors hover:border-fg/40 hover:text-fg"
    >
      <span className="text-fg">{locale.toUpperCase()}</span>
      <span className="text-fg/30">/</span>
      <span>{other.toUpperCase()}</span>
    </button>
  );
}
