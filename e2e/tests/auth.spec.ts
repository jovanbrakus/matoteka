import { test, expect } from "@playwright/test";
import { TEST_STUDENT } from "../fixtures/test-data";

test.describe("Authentication", () => {
  // All auth tests start without a session
  test.use({ storageState: { cookies: [], origins: [] } });

  test("successful login redirects to /vezba", async ({ page }) => {
    await page.goto("/prijava");
    await page.waitForSelector("input#email", { timeout: 15_000 });

    await page.fill("input#email", TEST_STUDENT.email);
    await page.fill("input#password", TEST_STUDENT.password);
    await page.click('button[type="submit"]');

    await page.waitForURL("**/vezba", { timeout: 30_000 });
    await expect(page).toHaveURL(/\/vezba/);
  });

  test("invalid credentials shows error message", async ({ page }) => {
    await page.goto("/prijava");
    await page.waitForSelector("input#email", { timeout: 15_000 });

    await page.fill("input#email", TEST_STUDENT.email);
    await page.fill("input#password", "WrongPassword123!");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Pogrešan email ili lozinka.")).toBeVisible({
      timeout: 10_000,
    });
    // Should stay on login page
    await expect(page).toHaveURL(/\/prijava/);
  });

  test("unauthenticated user is redirected to /prijava from protected route", async ({
    page,
  }) => {
    await page.goto("/vezba");
    await page.waitForURL("**/prijava**", { timeout: 15_000 });
    await expect(page).toHaveURL(/\/prijava/);
  });

  test("authenticated user sees dashboard on /", async ({ page }) => {
    // Log in first
    await page.goto("/prijava");
    await page.waitForSelector("input#email", { timeout: 15_000 });
    await page.fill("input#email", TEST_STUDENT.email);
    await page.fill("input#password", TEST_STUDENT.password);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/vezba", { timeout: 30_000 });

    // Now visit root — should see dashboard, not landing
    await page.goto("/");
    await expect(page.locator("text=E2E Student")).toBeVisible({
      timeout: 15_000,
    });
  });
});
