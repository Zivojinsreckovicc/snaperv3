import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { CheckCircle, Info, Lightbulb, Warning } from "@phosphor-icons/react/ssr";
import { simpleTextComponents } from "./simple-text";
import { cn } from "@/lib/utils";

export type CalloutValue = {
  tone?: "info" | "tip" | "warning" | "success";
  title?: string;
  body?: PortableTextBlock[];
};

const tones = {
  info: {
    Icon: Info,
    wrapper: "border-accent/30 bg-accent/[0.06]",
    icon: "bg-accent/15 text-accent",
    fallbackTitle: "Note",
  },
  tip: {
    Icon: Lightbulb,
    wrapper: "border-brand-cyan/35 bg-brand-cyan/[0.06]",
    icon: "bg-brand-cyan/15 text-brand-cyan",
    fallbackTitle: "Tip",
  },
  warning: {
    Icon: Warning,
    wrapper: "border-amber-500/35 bg-amber-500/[0.06]",
    icon: "bg-amber-500/15 text-amber-500",
    fallbackTitle: "Heads up",
  },
  success: {
    Icon: CheckCircle,
    wrapper: "border-emerald-500/35 bg-emerald-500/[0.06]",
    icon: "bg-emerald-500/15 text-emerald-500",
    fallbackTitle: "Good to know",
  },
} as const;

const bodyComponents: PortableTextComponents = simpleTextComponents;

/** Highlighted note box: an icon rail, optional title, and short rich text. */
export function BlogCallout({ value }: { value: CalloutValue }) {
  if (!value?.body?.length) return null;
  const tone = tones[value.tone ?? "info"] ?? tones.info;
  const { Icon } = tone;

  return (
    <aside
      role="note"
      className={cn(
        "my-8 flex gap-4 rounded-card border p-5 sm:p-6",
        tone.wrapper
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          tone.icon
        )}
      >
        <Icon weight="fill" className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <p className="mb-1.5 font-display text-base font-semibold text-foreground">
          {value.title || tone.fallbackTitle}
        </p>
        <PortableText value={value.body} components={bodyComponents} />
      </div>
    </aside>
  );
}
