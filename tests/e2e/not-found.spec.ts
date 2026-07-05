import { test, expect } from "@playwright/test";

test("unknown routes show the on-brand 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("404")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
