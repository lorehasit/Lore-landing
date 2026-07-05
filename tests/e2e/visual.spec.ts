import { test, expect } from "@playwright/test";

// Reduced motion forces the site's static, fully-visible fallback (see
// html.no-motion in globals.css), which keeps these snapshots deterministic
// instead of racing GSAP/Lenis scroll-triggered animations. This is the
// Chromatic/Percy substitute mentioned in the plan: Playwright's own
// screenshot baselines, no third-party visual-regression account needed.
test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("visual baselines", () => {
  test("home hero", async ({ page }) => {
    await page.goto("/");
    // next/font uses font-display: swap, so the fallback font is visible
    // briefly before the real webfont swaps in and reflows text — wait for
    // that to finish so the screenshot isn't racing the swap.
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".hero")).toHaveScreenshot("home-hero.png", {
      timeout: 15_000,
      maxDiffPixelRatio: 0.02,
    });
  });

  test("docs page", async ({ page }) => {
    await page.goto("/docs");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".docs-layout")).toHaveScreenshot("docs-layout.png", {
      timeout: 15_000,
      maxDiffPixelRatio: 0.02,
    });
  });
});
