import { test, expect } from "@playwright/test";

test.describe("Admin dashboard", () => {
  test("admin can access admin dashboard", async ({ page }) => {
    await page.goto("/admin");

    await expect(
      page.locator("h1", { hasText: "Admin kontrolna tabla" })
    ).toBeVisible({ timeout: 15_000 });
  });

  test("admin dashboard shows user list", async ({ page }) => {
    await page.goto("/admin");

    await expect(
      page.locator("h1", { hasText: "Admin kontrolna tabla" })
    ).toBeVisible({ timeout: 15_000 });

    // Should show the seeded test users in the list
    await expect(page.locator("text=e2e-admin@test.matoteka.com")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("non-admin is redirected away from admin page", async ({ browser }) => {
    // Create a new context with student storageState
    const context = await browser.newContext({
      storageState: "e2e/.auth/student.json",
    });
    const page = await context.newPage();

    await page.goto("http://localhost:3000/admin");

    // Should be redirected to "/" (non-admin redirect)
    await page.waitForURL("http://localhost:3000/", { timeout: 15_000 });
    await expect(page).not.toHaveURL(/\/admin/);

    await context.close();
  });
});
