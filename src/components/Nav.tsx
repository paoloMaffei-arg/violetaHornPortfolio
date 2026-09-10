"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LangSwitcher from "./LangSwitcher";
import { profile } from "@/content/profile";

const NAV_ITEMS = ["reel", "about", "portfolio", "acting", "contact"] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = usePathname() === "/";

  const close = () => setOpen(false);

  // Contract the floating capsule once the page has been scrolled a touch —
  // it sits a little tighter and turns more opaque so it stays legible over
  // busy sections.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape-to-close, while the mobile overlay is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Close if keyboard focus moves outside the overlay (e.g. Tab past the last link).
  const handleMenuBlur = (e: FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !menuRef.current?.contains(next)) {
      close();
    }
  };

  const Wordmark = (
    <span className="font-display text-xl leading-none tracking-widest text-fg">
      VH
    </span>
  );

  return (
    <>
      {/* Floating shell — no full-bleed bar; the capsule hovers over the page. */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <div
          className={`relative flex w-full max-w-3xl items-center rounded-full border border-line-strong bg-bg/55 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-[padding,background-color] duration-500 ease-out supports-[backdrop-filter]:bg-bg/45 ${
            scrolled ? "px-4 py-2 sm:px-5" : "px-5 py-2.5 sm:px-6 sm:py-3"
          }`}
        >
          {/* Brand mark — home link on mobile only; desktop menu drops it. */}
          {isHome ? (
            <a
              href="#top"
              onClick={close}
              aria-label={profile.name}
              className="shrink-0 rounded-full px-1 transition-opacity hover:opacity-80 md:hidden"
            >
              {Wordmark}
            </a>
          ) : (
            <Link
              href="/"
              onClick={close}
              aria-label={profile.name}
              className="shrink-0 rounded-full px-1 transition-opacity hover:opacity-80 md:hidden"
            >
              {Wordmark}
            </Link>
          )}

          {/* Sections — centered across the full capsule width (wrapper spans
              edge-to-edge so the right-hand language switcher never pulls them
              off-center). pointer-events are restored only on the links. */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
            <nav
              aria-label="Primary"
              className="pointer-events-auto flex items-center gap-1"
            >
              {NAV_ITEMS.map((key) => {
                const cls =
                  "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-fg/70 transition-colors duration-300 hover:bg-fg/10 hover:text-fg";
                return isHome ? (
                  <a key={key} href={`#${key}`} className={cls}>
                    {t(key)}
                  </a>
                ) : (
                  <Link key={key} href={`/#${key}`} className={cls}>
                    {t(key)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Language switcher pinned to the right on desktop. */}
          <div className="ml-auto hidden md:block">
            <LangSwitcher />
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto flex flex-col items-end gap-1.5 px-1 md:hidden"
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
        ref={menuRef}
        aria-hidden={!open}
        onBlur={handleMenuBlur}
        className={`fixed inset-x-0 top-0 bottom-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-xl transition-opacity duration-200 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_ITEMS.map((key) =>
          isHome ? (
            <a
              key={key}
              href={`#${key}`}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="font-display text-2xl tracking-widest text-fg"
            >
              {t(key)}
            </a>
          ) : (
            <Link
              key={key}
              href={`/#${key}`}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="font-display text-2xl tracking-widest text-fg"
            >
              {t(key)}
            </Link>
          )
        )}
        <LangSwitcher tabIndex={open ? 0 : -1} />
      </div>
    </>
  );
}
