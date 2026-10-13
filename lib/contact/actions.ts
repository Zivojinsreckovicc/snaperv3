"use server";

import { headers } from "next/headers";
import {
  CONTACT_LIMITS,
  CONTACT_TURNSTILE_ACTION,
  TURNSTILE_RESPONSE_FIELD,
  validateContactFields,
  type ContactResult,
} from "./form";
import { verifyTurnstileToken } from "./turnstile";
import { notifyMake, sendContactEmail } from "./deliver";

function field(formData: FormData, name: string, max?: number): string {
  const value = formData.get(name);
  const text = typeof value === "string" ? value.trim() : "";
  return max ? text.slice(0, max) : text;
}

/**
 * Server Action behind every contact form. Server Actions are reachable by
 * direct POST, so nothing is delivered until Cloudflare confirms the
 * Turnstile token here.
 */
export async function submitContactForm(
  formData: FormData,
  options: { subject?: string; notifyMake?: boolean } = {},
): Promise<ContactResult> {
  // Bots that fill the hidden honeypot get a fake success; nothing is sent.
  if (field(formData, "botcheck")) return { ok: true };

  const fields = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };
  const fieldErrors = validateContactFields(fields);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "invalid", fieldErrors };
  }

  const requestHeaders = await headers();
  const remoteIp =
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();

  const verified = await verifyTurnstileToken(
    field(formData, TURNSTILE_RESPONSE_FIELD),
    { action: CONTACT_TURNSTILE_ACTION, remoteIp },
  );
  if (!verified) return { ok: false, error: "captcha" };

  const submission = {
    ...fields,
    company: field(formData, "company", CONTACT_LIMITS.optional),
    service: field(formData, "service", CONTACT_LIMITS.optional),
    budget: field(formData, "budget", CONTACT_LIMITS.optional),
    subject: options.subject?.trim().slice(0, CONTACT_LIMITS.optional),
    page: requestHeaders.get("referer") ?? undefined,
  };

  if (options.notifyMake) await notifyMake(submission);
  const sent = await sendContactEmail(submission);
  return sent ? { ok: true } : { ok: false, error: "server" };
}
