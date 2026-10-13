import "server-only";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare caps tokens at 2048 characters.
const MAX_TOKEN_LENGTH = 2048;

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  action?: string;
  hostname?: string;
};

/**
 * Validates a Turnstile token with Cloudflare. Tokens are single-use and
 * expire after five minutes. Fails closed: a missing secret, network error or
 * unexpected response all count as a failed check.
 */
export async function verifyTurnstileToken(
  token: string,
  { action, remoteIp }: { action: string; remoteIp?: string | null },
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not set; rejecting.");
    return false;
  }
  if (!token || token.length > MAX_TOKEN_LENGTH) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[turnstile] siteverify responded ${res.status}`);
      return false;
    }

    const result = (await res.json()) as SiteverifyResponse;
    if (!result.success) {
      console.warn("[turnstile] rejected:", result["error-codes"]);
      return false;
    }
    // Cloudflare's testing keys omit `action`; real tokens always carry it.
    if (result.action !== undefined && result.action !== action) {
      console.warn(`[turnstile] unexpected action "${result.action}"`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[turnstile] siteverify request failed:", error);
    return false;
  }
}
