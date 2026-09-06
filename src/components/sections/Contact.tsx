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
          <h2 className="text-4xl text-fg sm:text-6xl">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
            {t("lead")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid mt-12"
          >
            {t("whatsapp")}
            <span aria-hidden="true" className="arrow">
              ↗
            </span>
          </a>
        </Reveal>
        <Reveal delay={0.4}>
          <SocialLinks className="mt-12" />
        </Reveal>
      </div>
    </section>
  );
}
