import { test, expect } from "@playwright/test";

// Public page tests run without auth
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Public pages", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Tvoja ulaznica");
  });

  test("login page loads with credentials form", async ({ page }) => {
    await page.goto("/prijava");
    await page.waitForSelector("input#email", { timeout: 15_000 });

    await expect(page.locator("input#email")).toBeVisible();
    await expect(page.locator("input#password")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText("Matoteka");
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("h1")).toContainText("Uslovi korišćenja");
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toContainText("Politika privatnosti");
  });
});
