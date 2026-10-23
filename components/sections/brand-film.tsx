import { Container, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { InViewVideo } from "@/components/visuals/in-view-video";
import { brandFilm } from "@/lib/site";

/**
 * Home page brand film, framed as a double-bezel "screen" on a soft violet
 * glow. Playback rules (autoplay in view, pause out of view) live in
 * InViewVideo.
 */
export function BrandFilm() {
  return (
    <Section
      aria-label="Snaper Digital brand film"
      spacing="md"
      surface="default"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <Container size="lg" className="relative">
        <Reveal y={32}>
          <figure>
            <InViewVideo
              youtubeId={brandFilm.youtubeId}
              title={brandFilm.title}
              poster={brandFilm.thumbnail}
            />
            <figcaption className="mt-5 flex items-baseline justify-between gap-6 px-2 text-sm">
              <span className="font-medium text-foreground">
                {brandFilm.title}
              </span>
              <span className="shrink-0 text-muted-foreground">
                Brand film · {brandFilm.durationLabel}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
