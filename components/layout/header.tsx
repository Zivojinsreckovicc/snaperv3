"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, X } from "@phosphor-icons/react";
import { primaryNav, contactCta, siteConfig, type NavItem } from "@/lib/site";
import { CtaLink } from "@/components/ui/cta-link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2.5"
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={siteConfig.logo}
        alt=""
        width={30}
        height={28}
        className="h-7 w-auto"
      />
      <span className="font-display text-base font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </Link>
  );
}

/** Desktop nav item with a dropdown (opens on hover / keyboard focus). */
function NavDropdown({ item }: { item: NavItem }) {
  const children = item.children ?? [];
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground group-hover:text-foreground"
      >
        {item.label}
        <CaretDown
          weight="bold"
          aria-hidden="true"
          className="h-3 w-3 transition-transform duration-200 group-hover:-rotate-180"
        />
      </button>
      {/* pt-2 keeps the gap hoverable so the panel doesn't close in transit */}
      <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="liquid-glass rounded-2xl border border-border/70 p-2">
          {children.map((child, i) => (
            <Link
              key={child.label}
              href={child.href}
              className={cn(
                "block rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                i === children.length - 1 &&
                  "mt-2 border-t border-border pt-3.5"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between gap-4 rounded-full border border-border/70 px-4 py-2 pl-5 liquid-glass">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden lg:block">
            <CtaLink href={contactCta.href} size="md">
              {contactCta.label}
            </CtaLink>
          </div>

          {/* Mobile hamburger -> X morph */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ease-[var(--ease-spring)]",
                  open && "top-1/2 -translate-y-1/2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-1 left-0 block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ease-[var(--ease-spring)]",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            {/* Explicit close — the header's hamburger sits behind this overlay,
                so the menu needs its own reachable close button. */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-border-strong hover:bg-muted"
            >
              <X weight="bold" className="h-5 w-5" />
            </button>

            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-4 font-display text-2xl font-medium text-foreground",
                      !item.children && "border-b border-border"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="flex flex-col border-b border-border pb-3 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="py-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-auto"
            >
              <CtaLink
                href={contactCta.href}
                size="lg"
                className="w-full justify-between"
              >
                {contactCta.label}
              </CtaLink>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
