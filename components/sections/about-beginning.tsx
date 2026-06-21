import Image from "next/image";
import { Badge, Container, Heading, Section } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

export function AboutBeginning() {
  return (
    <Section id="beginning" surface="subtle" className="overflow-hidden">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <Reveal>
          <Badge variant="muted">Our beginning</Badge>
          <Heading as={2} size="lg" className="mt-5">
            How it all started.
          </Heading>
          <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-muted-foreground">
            <p>
              It all started in a quiet apartment in a small town in Serbia. No
              investors. No big team. Just a laptop, a few ideas, and a
              restlessness that wouldn&apos;t let us stop. We worked late into
              the night while the world slept, rewriting code like we were
              rewriting our own path, learning not from books, but from
              mistakes.
            </p>
            <p>
              We weren&apos;t chasing success. We were chasing a feeling, that
              something made sense. That a client, somewhere far away, would
              click their new site and say: &ldquo;This is me.&rdquo; And
              that&apos;s still how we work. Now with more knowledge, more tools,
              but the same mindset.
            </p>
            <p className="text-foreground">
              Snaper isn&apos;t just a company. Snaper is the belief that you can
              build something out of nothing, if you care enough.
            </p>
          </div>
        </Reveal>

        {/* Image */}
        <Reveal delay={0.1}>
          <figure className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-radial-glow opacity-70 blur-2xl"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border shadow-glow lg:aspect-[5/4]">
              <Image
                src="/imgs/sava-river.webp"
                alt="Sava River in Novi Sad, Serbia, where Snaper Digital began"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              Novi Sad, Serbia, where Snaper Digital began.
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
