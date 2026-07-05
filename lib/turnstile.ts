/**
 * Cloudflare Turnstile server-side verification. Skipped (with a console
 * warning) when TURNSTILE_SECRET_KEY isn't configured, so the form still
 * works in local/dev without an account — see SETUP.md to make this a real
 * bot check in production.
 */
export async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY not set — skipping bot verification in production. " +
          "See SETUP.md to provision Cloudflare Turnstile.",
      );
    }
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      },
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[turnstile] verification request failed", error);
    return false;
  }
}
