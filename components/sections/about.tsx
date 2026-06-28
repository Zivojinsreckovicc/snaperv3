"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { Badge, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

const highlights = [
  "Direct access to the people building your project",
  "Conversion-first design, not decoration",
  "Automation that removes repetitive work",
];

export function About() {
  return (
    <Section id="about" surface="default" className="overflow-hidden">
      {/* Full-bleed grid (no Container) so the portrait can run to the left
          edge of the screen. */}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Founder portrait — bleeds to the left edge of the viewport */}
        <Reveal className="order-1">
          <figure className="relative">
            <div className="relative aspect-square w-full overflow-hidden lg:aspect-[4/5] lg:max-h-[42rem] lg:rounded-r-[2.5rem]">
              <Image
                src="/imgs/zivojin-sreckovic.webp"
                alt="Zivojin Sreckovic, founder of Snaper Digital"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 px-6 py-5 text-sm text-center text-muted-foreground sm:px-8 lg:px-0">
              <span className="font-medium text-foreground">
                Zivojin Sreckovic
              </span>
              , Founder
            </figcaption>
          </figure>
        </Reveal>

        {/* Copy */}
        <Reveal
          delay={0.1}
          className="order-2 px-6 sm:px-8 lg:max-w-xl lg:pr-10"
        >
          <Badge variant="muted">About Snaper Digital</Badge>
          <Heading as={2} size="lg" className="mt-5">
            Your senior digital partner.
          </Heading>
          <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-muted-foreground">
            <p>
              Snaper Digital is a focused studio that builds the websites and
              automation systems businesses actually rely on to win customers.
            </p>
            <p>
              No bloated retainers and no template factories. You work directly
              with the people building your project, from the first call through
              launch and beyond.
            </p>
          </div>

          <ul className="mt-7 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <Check weight="bold" className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Read our story
            <ArrowRight
              weight="bold"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
