import Image from "next/image";
import { Container, Section } from "@/components/ui";

// Real client logos (white, transparent). Inverted in light mode for contrast.
const logos = [
  "logo1.webp",
  "logo-2.webp",
  "logo-3.webp",
  "logo-4.webp",
  "logo-5.webp",
  "logo-6.webp",
  "logo-7.webp",
];

export function ClientMarquee() {
  // Two identical halves so the -50% keyframe loops seamlessly.
  const track = [...logos, ...logos];

  return (
    <Section spacing="sm" surface="subtle" className="border-b border-border">
      <Container>
        <p className="text-center text-sm text-muted-foreground">
          Trusted by growing businesses across industries
        </p>
      </Container>

      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {track.map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="flex shrink-0 items-center justify-center px-10"
            >
              <Image
                src={`/imgs/portfolioimages/client-logos/${file}`}
                alt="Client logo"
                width={150}
                height={36}
                className="h-7 w-auto object-contain opacity-60 invert transition-opacity duration-300 hover:opacity-100 dark:invert-0"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
