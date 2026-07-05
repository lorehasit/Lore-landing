import { test, expect } from "@playwright/test";

test.describe("docs page", () => {
  test("shows the sidebar grouped sections and jumps to an anchor", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByRole("heading", { name: "Documentation" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Quick start" })).toBeVisible();
    await page.getByRole("link", { name: "GitHub App" }).click();
    await expect(page.locator("#github")).toBeInViewport();
  });

  test("links back to the homepage", async ({ page }) => {
    await page.goto("/docs");
    await page.getByRole("link", { name: "← Back to site" }).click();
    await expect(page).toHaveURL("/");
  });
});
