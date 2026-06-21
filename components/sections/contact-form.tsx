"use client";

import { useState } from "react";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { submitWeb3Form } from "@/lib/web3forms";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormProps = {
  subject?: string;
};

export function ContactForm({ subject }: ContactFormProps) {
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
    if (!data.message?.trim()) next.message = "Tell us a little about the project.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const ok = await submitWeb3Form(data, { subject });
      if (!ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
        <div>
          <Label htmlFor="message">What can we help with?</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="A few lines about your business and what you need."
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
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
          className="w-full"
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
      </div>
    </form>
  );
}
