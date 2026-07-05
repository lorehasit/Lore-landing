import { describe, expect, it } from "vitest";
import { waitlistSchema } from "@/lib/validation";

describe("waitlistSchema", () => {
  it("accepts a valid work email with an empty honeypot", () => {
    const result = waitlistSchema.safeParse({ email: "you@yourteam.com", company: "" });
    expect(result.success).toBe(true);
  });

  it("trims whitespace around the email", () => {
    const result = waitlistSchema.safeParse({ email: "  you@yourteam.com  ", company: "" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("you@yourteam.com");
  });

  it("rejects an empty email", () => {
    const result = waitlistSchema.safeParse({ email: "", company: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = waitlistSchema.safeParse({ email: "not-an-email", company: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a filled-in honeypot field (bot signal)", () => {
    const result = waitlistSchema.safeParse({
      email: "you@yourteam.com",
      company: "Definitely A Bot Inc",
    });
    expect(result.success).toBe(false);
  });

  it("defaults the honeypot to empty when omitted", () => {
    const result = waitlistSchema.safeParse({ email: "you@yourteam.com" });
    expect(result.success).toBe(true);
  });
});
