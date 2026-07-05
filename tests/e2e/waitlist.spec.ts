import { test, expect } from "@playwright/test";

test.describe("waitlist form", () => {
  test("happy path: valid email shows the success message", async ({ page }) => {
    await page.goto("/#cta");
    const email = `e2e-${Date.now()}@example.com`;
    await page.locator("#cta input[name=email]").fill(email);
    await page.locator("#cta button[type=submit]").click();
    await expect(page.locator("#cta .final-note")).toContainText(
      `we'll reach out at ${email}`,
      { timeout: 10_000 },
    );
  });

  test("validation error: malformed email is rejected server-side", async ({ page }) => {
    await page.goto("/#cta");
    // Disable the form's native HTML5 constraint validation so an
    // obviously-malformed value actually reaches the server action —
    // this test is specifically about the Zod guard, not the browser's.
    await page.locator("#cta form").evaluate((form) => form.setAttribute("novalidate", ""));
    await page.locator("#cta input[name=email]").fill("not-an-email");
    await page.locator("#cta button[type=submit]").click();
    await expect(page.locator("#cta .final-note")).toContainText(/valid email/i, {
      timeout: 10_000,
    });
  });

  test("honeypot: a filled hidden field silently rejects the submission", async ({ page }) => {
    await page.goto("/#cta");
    const email = `e2e-honeypot-${Date.now()}@example.com`;
    await page.locator("#cta input[name=email]").fill(email);
    // A real visitor never sees or fills this; simulate a bot that fills
    // every field it can find in the DOM.
    await page.locator('#cta input[name="company"]').evaluate((el) => {
      (el as HTMLInputElement).value = "Bot Co";
    });
    await page.locator("#cta button[type=submit]").click();
    await expect(page.locator("#cta .final-note")).not.toContainText(
      `we'll reach out at ${email}`,
      { timeout: 10_000 },
    );
  });
});
