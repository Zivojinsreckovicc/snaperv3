"use client";

import { useState } from "react";
import { CaretDown, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { submitWeb3Form } from "@/lib/web3forms";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type FieldKey = "name" | "email" | "message";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const projectTypes = [
  "Website design & development",
  "AI automation",
  "Branding & creative direction",
  "Consulting",
  "Something else",
];

const budgets = [
  "Under €2k",
  "€2k – €5k",
  "€5k – €10k",
  "€10k+",
  "Not sure yet",
];

// Shared field styling, mirrored from the Input primitive so the native
// <select> elements visually match the text inputs.
const selectClass =
  "h-11 w-full appearance-none rounded-xl border border-input bg-card px-4 pr-10 text-sm " +
  "text-foreground transition-colors duration-200 focus-visible:outline-none " +
  "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";

function Select({
  id,
  name,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select id={id} name={name} defaultValue="" className={selectClass}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <CaretDown
        weight="bold"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export function ContactPageForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (data.botcheck) return;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!data.email?.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(data.email)) next.email = "Enter a valid email.";
    if (!data.message?.trim())
      next.message = "Tell us a little about the project.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const ok = await submitWeb3Form(data, { notifyMakeFirst: true });
      if (!ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="ring-gradient flex min-h-[24rem] flex-col items-center justify-center rounded-card p-10 text-center shadow-glow">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/12 text-accent">
          <CheckCircle weight="fill" className="h-9 w-9" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
          Message sent
        </h2>
        <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. We&apos;ll review your project and get back to
          you within one business day.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="ring-gradient rounded-card p-6 shadow-glow sm:p-8"
    >
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Marko Jovanovic"
              aria-invalid={!!errors.name}
            />
            {errors.name ? (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
            />
            {errors.email ? (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="company">Company / website</Label>
            <Input
              id="company"
              name="company"
              placeholder="acme.com (optional)"
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Select
              id="budget"
              name="budget"
              placeholder="Select a range"
              options={budgets}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="projectType">What do you need?</Label>
          <Select
            id="projectType"
            name="service"
            placeholder="Choose a service"
            options={projectTypes}
          />
        </div>

        <div>
          <Label htmlFor="message">Project details</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="A few lines about your business, goals and what you're looking to build."
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.message}
            </p>
          ) : null}
        </div>

        {status === "error" ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            Something went wrong. Please try again or email us directly.
          </p>
        ) : null}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={status === "submitting"}
          className={cn("w-full", status === "submitting" && "cursor-wait")}
        >
          {status === "submitting" ? (
            <>
              <CircleNotch weight="bold" className="h-5 w-5 animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          We&apos;ll only use your details to reply about your project.
        </p>
      </div>
    </form>
  );
}
