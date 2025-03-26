import { test, expect } from "@playwright/test";

test.describe("Login flow", () => {
  test("Should display the login auth page", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible();
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(
      page.getByRole("heading", { name: "Sign In Page" })
    ).toBeVisible();
  });
});
