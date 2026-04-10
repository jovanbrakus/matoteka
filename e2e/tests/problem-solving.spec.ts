import { test, expect } from "@playwright/test";

test.describe("Problem solving", () => {
  test("practice hub loads with category groups", async ({ page }) => {
    await page.goto("/vezba");

    // Should show category group headings
    await expect(
      page.getByRole("heading", { name: "Algebra" })
    ).toBeVisible({ timeout: 15_000 });
  });

  test("can open a topic and see a problem", async ({ page }) => {
    // Navigate directly to the practice solver with a specific topic
    await page.goto("/zadaci?topic=percent_proportion");

    // Wait for the PracticeSolver to load and show a problem
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });
  });

  test("can submit an answer to a problem", async ({ page }) => {
    await page.goto("/zadaci?topic=percent_proportion");

    // Wait for problem to load
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Click the first answer option — (A)
    await page.locator("button", { hasText: "(A)" }).first().click();

    // Click "Proveri odgovor"
    await page.locator('button:has-text("Proveri odgovor")').click();

    // Should show result — either correct or incorrect
    await expect(
      page.locator("text=/tačan odgovor|Netačno/").first()
    ).toBeVisible({ timeout: 10_000 });
  });
});
