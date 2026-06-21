import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Eyebrow,
  GradientText,
  Heading,
  Input,
  Label,
  Lead,
  Section,
  Textarea,
} from "@/components/ui";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "The Snaper Digital design system - brand tokens, typography, color, and reusable UI primitives for the website.",
  robots: { index: false, follow: false },
};

const semanticTokens = [
  { name: "background", className: "bg-background" },
  { name: "background-subtle", className: "bg-background-subtle" },
  { name: "card", className: "bg-card" },
  { name: "muted", className: "bg-muted" },
  { name: "foreground", className: "bg-foreground" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "border", className: "bg-border" },
  { name: "accent", className: "bg-accent" },
];

const brandScale = [
  "bg-brand-50",
  "bg-brand-100",
  "bg-brand-200",
  "bg-brand-300",
  "bg-brand-400",
  "bg-brand-500",
  "bg-brand-600",
  "bg-brand-700",
  "bg-brand-800",
  "bg-brand-900",
  "bg-brand-950",
];

function Subsection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <div className="mb-7 max-w-2xl">
        <Heading as={2} size="md">
          {title}
        </Heading>
        {description ? (
          <p className="mt-2 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border glass">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={28}
              height={26}
              className="h-7 w-auto"
            />
            <span className="text-sm font-semibold tracking-tight">
              {siteConfig.name}
              <span className="text-muted-foreground"> / Design System</span>
            </span>
          </Link>
          <ThemeToggle />
        </Container>
      </header>

      {/* Intro */}
      <Section spacing="md" className="relative overflow-hidden bg-grid">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-radial-glow"
        />
        <Container className="relative">
          <Eyebrow>Foundations</Eyebrow>
          <Heading as={1} size="xl" className="mt-4">
            The <GradientText>Snaper Digital</GradientText> design system
          </Heading>
          <Lead className="mt-5">
            Brand tokens, typography, color and the reusable primitives that
            everything on the site is built from. Toggle the theme - dark is the
            primary brand experience, light stays premium.
          </Lead>
        </Container>
      </Section>

      <Container className="pb-28">
        {/* Color */}
        <Subsection
          title="Color"
          description="Semantic tokens swap automatically per theme. The brand accent (#754dec) ships as a full scale, plus the cyan → violet → blue gradient from the logo."
        >
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Semantic tokens
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {semanticTokens.map((t) => (
              <div key={t.name}>
                <div
                  className={`h-16 rounded-xl border border-border ${t.className}`}
                />
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {t.name}
                </p>
              </div>
            ))}
          </div>

          <p className="mb-3 mt-8 text-sm font-medium text-muted-foreground">
            Brand accent scale
          </p>
          <div className="flex overflow-hidden rounded-xl border border-border">
            {brandScale.map((c) => (
              <div key={c} className={`h-14 flex-1 ${c}`} title={c} />
            ))}
          </div>

          <p className="mb-3 mt-8 text-sm font-medium text-muted-foreground">
            Brand gradient
          </p>
          <div className="flex h-20 items-center justify-center rounded-xl [background-image:linear-gradient(110deg,var(--color-brand-cyan),var(--color-brand-violet)_52%,var(--color-brand-blue))]">
            <span className="font-mono text-sm text-white/90">
              cyan → violet → blue
            </span>
          </div>
        </Subsection>

        {/* Typography */}
        <Subsection
          title="Typography"
          description="Poppins for UI and headings, mono only for code. Headings decouple semantic level from visual size."
        >
          <div className="space-y-5">
            <Heading as={2} size="display">
              Display heading
            </Heading>
            <Heading as={2} size="xl">
              Extra-large heading
            </Heading>
            <Heading as={2} size="lg">
              Large heading
            </Heading>
            <Heading as={3} size="md">
              Medium heading
            </Heading>
            <Heading as={4} size="sm">
              Small heading
            </Heading>
            <Lead>
              Lead paragraph - the intro line that sits under a heading and sets
              context with comfortable, readable rhythm.
            </Lead>
            <p className="max-w-2xl text-muted-foreground">
              Body copy uses the muted-foreground token for calm hierarchy. You
              can highlight a <GradientText>key phrase</GradientText> with the
              brand gradient, or a{" "}
              <span className="font-medium text-accent">single accent word</span>{" "}
              for emphasis.
            </p>
          </div>
        </Subsection>

        {/* Buttons */}
        <Subsection
          title="Buttons"
          description="Five variants, four sizes. buttonVariants() styles links as buttons for CTAs."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Link
              href="/"
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              Link as button
            </Link>
          </div>
        </Subsection>

        {/* Badges */}
        <Subsection
          title="Badges & eyebrows"
          description="Small labels for status and section intros."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">Accent</Badge>
            <Badge variant="solid">Solid</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="muted">Muted</Badge>
            <span className="ml-2">
              <Eyebrow>Section eyebrow</Eyebrow>
            </span>
          </div>
        </Subsection>

        {/* Cards */}
        <Subsection
          title="Cards"
          description="Default, interactive (hover lift + glow) and gradient-border variants."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Default card</CardTitle>
                <CardDescription>
                  A calm surface with a hairline border and soft shadow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use for content blocks, services and feature grids.
                </p>
              </CardContent>
            </Card>

            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive</CardTitle>
                <CardDescription>
                  Lifts and glows on hover - for clickable items.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hover me to see the brand glow effect.
                </p>
              </CardContent>
            </Card>

            <Card gradientBorder>
              <CardHeader>
                <CardTitle>Gradient border</CardTitle>
                <CardDescription>
                  A premium edge using the brand gradient hairline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Good for highlighting a featured plan or case study.
                </p>
              </CardContent>
            </Card>
          </div>
        </Subsection>

        {/* Forms */}
        <Subsection
          title="Form fields"
          description="Inputs, textarea and labels with accent focus states."
        >
          <div className="grid max-w-xl gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="ds-name">Name</Label>
              <Input id="ds-name" placeholder="Jane Doe" />
            </div>
            <div>
              <Label htmlFor="ds-email">Email</Label>
              <Input id="ds-email" type="email" placeholder="jane@company.com" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="ds-message">Message</Label>
              <Textarea
                id="ds-message"
                placeholder="Tell us about your project…"
              />
            </div>
          </div>
        </Subsection>

        {/* Effects */}
        <Subsection
          title="Effects & utilities"
          description="Ambient glow, blueprint grid, frosted glass and shadow tokens for the 'wow' factor."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex h-32 items-center justify-center rounded-card border border-border bg-card shadow-glow">
              <span className="text-sm text-muted-foreground">shadow-glow</span>
            </div>
            <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-card border border-border bg-grid">
              <span className="text-sm text-muted-foreground">bg-grid</span>
            </div>
            <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-card border border-border bg-card">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-radial-glow"
              />
              <span className="relative text-sm text-muted-foreground">
                bg-radial-glow
              </span>
            </div>
          </div>
        </Subsection>
      </Container>
    </main>
  );
}
