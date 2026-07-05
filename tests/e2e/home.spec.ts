import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("renders the hero and primary nav", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Your engineering decisions,",
    );
    await expect(page.getByRole("link", { name: "Request access" }).first()).toBeVisible();
    await expect(page.locator(".nav-links a[href='/docs']")).toHaveText("Docs");
  });

  test("navigates to the docs page", async ({ page }) => {
    await page.goto("/");
    await page.locator(".nav-links a[href='/docs']").click();
    await expect(page).toHaveURL(/\/docs$/);
    await expect(page.getByRole("heading", { name: "Documentation" })).toBeVisible();
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
