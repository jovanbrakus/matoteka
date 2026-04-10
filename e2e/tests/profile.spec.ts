import { test, expect } from "@playwright/test";
import { TEST_STUDENT } from "../fixtures/test-data";

test.describe("Profile", () => {
  test("profile page loads with user info", async ({ page }) => {
    await page.goto("/profil");

    await expect(page.locator("text=Podešavanja profila")).toBeVisible({
      timeout: 15_000,
    });

    // Should show email
    await expect(page.locator(`text=${TEST_STUDENT.email}`)).toBeVisible();
  });

  test("can update display name", async ({ page }) => {
    await page.goto("/profil");

    await expect(page.locator("text=Podešavanja profila")).toBeVisible({
      timeout: 15_000,
    });

    // Clear and type a new display name
    const nameInput = page.locator('input[type="text"]').first();
    await nameInput.fill("E2E Tester");

    // Click "Sačuvaj" for the name section
    await page.locator('button:has-text("Sačuvaj")').first().click();

    // Should show "Sačuvano" confirmation
    await expect(
      page.locator('button:has-text("Sačuvano")').first()
    ).toBeVisible({ timeout: 5_000 });

    // Restore original name
    await nameInput.fill(TEST_STUDENT.displayName);
    await page.locator('button:has-text("Sačuvaj")').first().click();
    await expect(
      page.locator('button:has-text("Sačuvano")').first()
    ).toBeVisible({ timeout: 5_000 });
  });
});
