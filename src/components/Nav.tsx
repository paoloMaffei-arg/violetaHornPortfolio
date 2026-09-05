"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LangSwitcher from "./LangSwitcher";
import { profile } from "@/content/profile";

const NAV_ITEMS = ["reel", "about", "portfolio", "acting", "contact"] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-fg/10 bg-bg/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            onClick={close}
            aria-label={profile.name}
            className="font-display text-xl tracking-widest text-fg"
          >
            VH
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-sm uppercase tracking-widest text-fg/80 transition-colors hover:text-fg"
              >
                {t(key)}
              </a>
            ))}
            <LangSwitcher />
          </nav>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col items-end gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-6 bg-fg transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-fg transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-fg transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg transition-opacity duration-200 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_ITEMS.map((key) => (
          <a
            key={key}
            href={`#${key}`}
            onClick={close}
            className="font-display text-2xl tracking-widest text-fg"
          >
            {t(key)}
          </a>
        ))}
        <LangSwitcher />
      </div>
    </>
  );
}
