"use server";

import { headers } from "next/headers";
import { waitlistSchema, type WaitlistState } from "@/lib/validation";
import { checkWaitlistRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { getWriteClient } from "@/sanity/lib/client";

export async function submitWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = waitlistSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    // A non-empty honeypot fails validation (company must be empty) the
    // same way a bad email does — bots get a generic error either way.
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check your email address.",
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  const { success: withinLimit } = await checkWaitlistRateLimit(ip);
  if (!withinLimit) {
    return {
      status: "error",
      message: "Too many requests — please try again in a few minutes.",
    };
  }

  const turnstileToken = formData.get("cf-turnstile-response");
  const turnstileOk = await verifyTurnstile(
    typeof turnstileToken === "string" ? turnstileToken : null,
  );
  if (!turnstileOk) {
    return { status: "error", message: "We couldn't verify you're human. Please retry." };
  }

  const writeClient = getWriteClient();
  if (writeClient) {
    try {
      await writeClient.create({
        _type: "waitlistLead",
        email: parsed.data.email,
        createdAt: new Date().toISOString(),
        source: "landing-final-cta",
      });
    } catch (error) {
      console.error("[waitlist] failed to persist lead to Sanity", error);
      // Don't fail the user-facing submission over a downstream storage
      // hiccup — log it server-side and still confirm to the visitor.
    }
  } else {
    console.info(
      `[waitlist] new signup: ${parsed.data.email} (SANITY_API_TOKEN not set — not persisted, see SETUP.md)`,
    );
  }

  return {
    status: "success",
    message: `You're on the list — we'll reach out at ${parsed.data.email}.`,
  };
}
