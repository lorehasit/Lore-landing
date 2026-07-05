import { z } from "zod";

/**
 * Shared client+server schema for the waitlist form, so the same rule set
 * runs instantly in the browser and is re-checked (never trusted from the
 * client alone) on the server action.
 */
export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .max(320, "That email is too long.")
    .email("Enter a valid email address."),
  // Honeypot: real users never see or fill this field (see .honeypot-field
  // in globals.css). Any non-empty value here means a bot filled every
  // field it could find.
  company: z.string().max(0, "Spam detected.").optional().default(""),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialWaitlistState: WaitlistState = { status: "idle", message: "" };
