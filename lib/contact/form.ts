/**
 * Contact form rules shared by the client forms and the server action, so
 * both sides validate the same way.
 */

/** Turnstile `action` set on the widget and checked during siteverify. */
export const CONTACT_TURNSTILE_ACTION = "contact";

/** Hidden input Turnstile injects into the form with its token. */
export const TURNSTILE_RESPONSE_FIELD = "cf-turnstile-response";

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
  /** Optional fields: company, service, budget, subject. */
  optional: 200,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      error: "invalid" | "captcha" | "server";
      fieldErrors?: ContactFieldErrors;
    };

export function validateContactFields(fields: {
  name?: string;
  email?: string;
  message?: string;
}): ContactFieldErrors {
  const name = fields.name?.trim() ?? "";
  const email = fields.email?.trim() ?? "";
  const message = fields.message?.trim() ?? "";
  const errors: ContactFieldErrors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name)
    errors.name = `Keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(email))
    errors.email = "Enter a valid email.";

  if (!message) errors.message = "Tell us a little about the project.";
  else if (message.length > CONTACT_LIMITS.message)
    errors.message = `Keep it under ${CONTACT_LIMITS.message} characters.`;

  return errors;
}
