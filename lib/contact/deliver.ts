import "server-only";

import { siteConfig } from "@/lib/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// Must be an address on a domain verified in Resend.
const FROM_ADDRESS = "Snaper Digital Website <forms@snaperdigital.com>";
const DEFAULT_SUBJECT = "New inquiry from snaperdigital.com";

const MAKE_CONTACT_WEBHOOK =
  "https://hook.eu2.make.com/pypwr0dwma9qk39wt72jjnmh7n0j6ddj";

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  company: string;
  service: string;
  budget: string;
  subject?: string;
  /** Page the form was sent from. */
  page?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRows(s: ContactSubmission): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Name", s.name],
    ["Email", s.email],
    ["Company / website", s.company],
    ["Service", s.service],
    ["Budget", s.budget],
    ["Sent from", s.page],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

function renderText(s: ContactSubmission): string {
  const details = detailRows(s)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  return `${details}\n\nMessage:\n${s.message}\n`;
}

function renderHtml(s: ContactSubmission): string {
  const details = detailRows(s)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111">
<table style="border-collapse:collapse">${details}</table>
<p style="margin:20px 0 6px;color:#666">Message</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(s.message)}</p>
</div>`;
}

/** Emails the submission to the team inbox; replies go to the sender. */
export async function sendContactEmail(s: ContactSubmission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return false;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [siteConfig.email],
        reply_to: s.email,
        subject: `${s.subject || DEFAULT_SUBJECT}: ${s.name}`,
        text: renderText(s),
        html: renderHtml(s),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[contact] Resend responded ${res.status}:`, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Resend request failed:", error);
    return false;
  }
}

/** Contact page only: hands the lead to the Make.com follow-up workflow. */
export async function notifyMake(s: ContactSubmission): Promise<void> {
  try {
    await fetch(MAKE_CONTACT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: s.name,
        email: s.email,
        company: s.company,
        budget: s.budget,
        service: s.service,
        message: s.message,
      }),
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    // Best effort: the email still goes out if the webhook is down.
  }
}
