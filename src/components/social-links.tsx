import linkedinIcon from "@/assets/social/linkedin.jpg";
import facebookIcon from "@/assets/social/facebook.jpg";
import instagramIcon from "@/assets/social/instagram.jpg";
import xIcon from "@/assets/social/x.jpg";
import { SOCIALS } from "@/lib/site";

const ICONS: Record<string, string> = {
  linkedin: linkedinIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
  x: xIcon,
};

export function SocialLinks({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Social media">
      {SOCIALS.map((s) => {
        const img = (
          <img
            src={ICONS[s.icon]}
            alt={`${s.name} icon`}
            width={size}
            height={size}
            loading="lazy"
            className="rounded-lg object-cover transition-transform group-hover:scale-110"
            style={{ width: size, height: size }}
          />
        );
        const tooltip = s.live ? `Visit ${s.name}` : `${s.name} — coming soon`;
        return (
          <li key={s.name}>
            {s.live ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={tooltip}
                aria-label={tooltip}
                className="group inline-flex rounded-lg ring-1 ring-border/60 hover:ring-brand"
              >
                {img}
              </a>
            ) : (
              <span
                title={tooltip}
                aria-label={tooltip}
                aria-disabled="true"
                className="group inline-flex cursor-not-allowed rounded-lg opacity-60 ring-1 ring-border/60"
              >
                {img}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}