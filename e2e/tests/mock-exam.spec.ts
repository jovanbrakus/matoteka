import { test, expect } from "@playwright/test";

test.describe("Mock exam", () => {
  test("simulation setup page loads", async ({ page }) => {
    await page.goto("/simulacija");

    await expect(
      page.locator("h1", { hasText: "Započni simulaciju" })
    ).toBeVisible({ timeout: 15_000 });

    // Should show test size options
    await expect(page.locator("text=Kompletan test")).toBeVisible();
    await expect(page.locator("text=Brzi test")).toBeVisible();
  });

  test("can create, answer, and submit a quick exam", async ({ page }) => {
    await page.goto("/simulacija");

    await expect(
      page.locator("h1", { hasText: "Započni simulaciju" })
    ).toBeVisible({ timeout: 15_000 });

    // Select "Brzi test" (8 problems)
    await page.locator("button", { hasText: "Brzi test" }).click();

    // Select "Bez ograničenja" (untimed)
    await page.locator("button", { hasText: "Bez ograničenja" }).click();

    // Click "ZAPOČNI TEST"
    await page.locator('button:has-text("ZAPOČNI TEST")').click();

    // Wait for exam page to load — should show "Zadatak 1"
    await expect(page.locator("text=Zadatak 1 /")).toBeVisible({
      timeout: 30_000,
    });

    // Select an answer for the first problem — click first answer option
    // In exam mode, answer buttons contain letter spans like "A", "B" etc.
    await page.locator("button", { hasText: /^A/ }).first().click({
      timeout: 15_000,
    });

    // Click "Završi Simulaciju" to submit
    await page.locator('button:has-text("Završi Simulaciju")').click();

    // Confirmation dialog appears — click "Završi"
    await expect(page.locator("text=Završi simulaciju?")).toBeVisible({
      timeout: 5_000,
    });
    // Click the "Završi" button inside the confirmation dialog
    await page
      .locator(".fixed button", { hasText: "Završi" })
      .click();

    // Should redirect to results page
    await page.waitForURL("**/rezultati", { timeout: 30_000 });
    await expect(page.locator("text=Rezultati simulacije")).toBeVisible({
      timeout: 15_000,
    });
  });
});
