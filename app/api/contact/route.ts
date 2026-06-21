import { NextResponse } from "next/server";

/**
 * Contact form endpoint (stub). Validates the payload and returns success so
 * the form has real loading / success / error states.
 *
 * TODO: wire up actual delivery (email provider, CRM, or Sanity) before
 * launch — this currently only logs server-side and does not send anything.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please complete all fields with a valid email." },
      { status: 422 }
    );
  }

  // Placeholder for real delivery.
  console.log("[contact] new enquiry", { name, email });

  return NextResponse.json({ ok: true });
}
