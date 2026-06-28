import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container, GradientText, Heading, Lead } from "@/components/ui";
import { CtaLink } from "@/components/ui/cta-link";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Snaper Digital" },
  description:
    "The page you're looking for doesn't exist or has moved. Head back to the Snaper Digital homepage or explore our work and services.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-grid pb-24 pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-radial-glow"
          />
          <Container className="relative text-center">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Error 404
            </p>
            <Heading as={1} size="display" className="mx-auto mt-4 max-w-2xl">
              This page went <GradientText>off the map</GradientText>.
            </Heading>
            <Lead className="mx-auto mt-6 max-w-xl">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
              Let&rsquo;s get you back on track.
            </Lead>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <CtaLink href="/" size="md">
                Back to home
              </CtaLink>
              <Link
                href="/work"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                See our work
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Start a project
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
