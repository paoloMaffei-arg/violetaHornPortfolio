import { profile } from "@/content/profile";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.7 3.8 3.8 4.2v3.1c-1.4 0-2.7-.4-3.8-1.2v6.4c0 3.3-2.7 5.8-5.9 5.5-2.8-.3-5-2.6-5.1-5.4-.2-3.3 2.4-6 5.6-6 .3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.2-2.4 2.6.1 1.2 1.1 2.2 2.3 2.3 1.5.1 2.7-1.1 2.7-2.5V3h2.8z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2c-.2-1.4-1.3-2.5-2.7-2.7C17 4.1 12 4.1 12 4.1s-5 0-6.9.4c-1.4.2-2.5 1.3-2.7 2.7C2 9.1 2 12 2 12s0 2.9.4 4.8c.2 1.4 1.3 2.5 2.7 2.7 1.9.4 6.9.4 6.9.4s5 0 6.9-.4c1.4-.2 2.5-1.3 2.7-2.7.4-1.9.4-4.8.4-4.8s0-2.9-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 6h5.3c1.7 0 3 1.2 3 2.8 0 1-.5 1.8-1.3 2.2.9.4 1.6 1.3 1.6 2.5 0 1.9-1.5 3.3-3.5 3.3H4V6zm2.2 1.9v2.6h2.9c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3H6.2zm0 4.4v2.8h3.1c.8 0 1.5-.6 1.5-1.4 0-.8-.7-1.4-1.5-1.4H6.2z" />
      <path d="M14 5.5h5v1.3h-5z" />
      <path d="M20.7 13.2c0-2.6-1.7-4.4-4.1-4.4-2.5 0-4.2 1.9-4.2 4.5 0 2.7 1.8 4.5 4.3 4.5 1.9 0 3.3-1 3.8-2.6h-2c-.3.6-.9.9-1.7.9-1.1 0-1.9-.7-2.1-1.9h6c0-.1 0-.3 0-1zm-6-.6c.2-1.1 1-1.8 2-1.8s1.7.7 1.8 1.8h-3.8z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { key: "instagram", href: profile.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { key: "tiktok", href: profile.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
  { key: "youtube", href: profile.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
  { key: "behance", href: profile.socials.behance, label: "Behance", Icon: BehanceIcon },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {SOCIAL_LINKS.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-fg/70 transition-colors hover:text-fg"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
