"use client";

import { InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/site";

const links = [
  { href: siteConfig.socials.x, label: "X (Twitter)", Icon: XLogo },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramLogo },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
        >
          <Icon weight="regular" className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
