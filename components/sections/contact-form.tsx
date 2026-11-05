"use client";

import { useRef, useState } from "react";
import { CaretDown, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Turnstile, type TurnstileHandle } from "@/components/ui/turnstile";
import { submitContactForm } from "@/lib/contact/actions";
import {
  CONTACT_TURNSTILE_ACTION,
  TURNSTILE_RESPONSE_FIELD,
  validateContactFields,
  type ContactFieldErrors,
} from "@/lib/contact/form";

type Status = "idle" | "submitting" | "success";

const GENERIC_ERROR = "Something went wrong. Please try again or email us directly.";
const CAPTCHA_PENDING = "Please complete the security check above.";
const CAPTCHA_FAILED = "The security check failed or expired. Please try again.";

type ContactFormProps = {
  subject?: string;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  detailed?: boolean;
};

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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
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

export function ContactForm({
  subject,
  submitLabel = "Send message",
  messageLabel = "What can we help with?",
  messagePlaceholder = "A few lines about your business and what you need.",
  detailed = false,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Record<string, string>;

    if (data.botcheck) return;

    const next = validateContactFields(data);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (!data[TURNSTILE_RESPONSE_FIELD]) {
      setFormError(CAPTCHA_PENDING);
      return;
    }

    setStatus("submitting");
    setFormError(null);
    try {
      const result = await submitContactForm(formData, { subject });
      if (result.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setFormError(result.error === "captcha" ? CAPTCHA_FAILED : GENERIC_ERROR);
    } catch {
      setFormError(GENERIC_ERROR);
    }
    // Tokens are single-use, so every failed attempt needs a fresh one.
    turnstileRef.current?.reset();
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-card border border-border bg-card p-10 text-center shadow-soft">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/12 text-accent">
          <CheckCircle weight="fill" className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
          Message sent
        </h3>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you within one business
          day.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
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
      className="rounded-card border border-border bg-card p-6 shadow-soft sm:p-8"
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
        {detailed ? (
          <div className="mb-1 flex items-start justify-between gap-5 border-b border-border pb-5">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                Tell us about your project
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A few details help us give you a useful first reply.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
              About 2 min
            </span>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Marko Jovanovic" aria-invalid={!!errors.name} />
            {errors.name ? (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
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
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            ) : null}
          </div>
        </div>

        {detailed ? (
          <>
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
                <Label htmlFor="budget">Approximate budget</Label>
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
          </>
        ) : null}

        <div>
          <Label htmlFor="message">
            {detailed ? "Project details" : messageLabel}
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder={
              detailed
                ? "Tell us about your business, goals, timeline and what you’re looking to build."
                : messagePlaceholder
            }
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          ) : null}
        </div>

        <Turnstile ref={turnstileRef} action={CONTACT_TURNSTILE_ACTION} />

        {formError ? (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {formError}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={status === "submitting"}
          className="w-full"
        >
          {status === "submitting" ? (
            <>
              <CircleNotch weight="bold" className="h-5 w-5 animate-spin" />
              Sending
            </>
          ) : (
            submitLabel
          )}
        </Button>

        {detailed ? (
          <p className="text-center text-xs text-muted-foreground">
            We&apos;ll only use your details to reply about your project.
          </p>
        ) : null}
      </div>
    </form>
  );
}
