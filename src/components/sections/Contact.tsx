import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/content/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Contact() {
  const t = useTranslations("contact");
  const whatsappUrl = buildWhatsAppUrl(profile.whatsapp, t("prefill"));

  return (
    <section id="contact" className="w-full bg-carbon py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl tracking-wide text-fg sm:text-4xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
            {t("lead")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-fg/40 px-10 py-4 text-sm uppercase tracking-widest text-fg transition-colors hover:border-fg hover:bg-fg hover:text-bg"
          >
            {t("whatsapp")}
          </a>
        </Reveal>
        <Reveal delay={0.4}>
          <SocialLinks className="mt-12" />
        </Reveal>
      </div>
    </section>
  );
}
