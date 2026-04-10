import { test, expect } from "@playwright/test";

test.describe("Bookmarks", () => {
  test("can bookmark and unbookmark a problem", async ({ page }) => {
    // Go to a topic solver to load a problem
    await page.goto("/zadaci?topic=percent_proportion");

    // Wait for problem to load — "Tvoj odgovor" section means ProblemView rendered
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Click the bookmark button — shows "Sačuvaj" text
    const bookmarkBtn = page.locator("button", { hasText: "Sačuvaj" });
    await expect(bookmarkBtn).toBeVisible({ timeout: 5_000 });
    await bookmarkBtn.click();

    // Should now show "Sačuvano" (bookmarked state)
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });

    // Click again to unbookmark
    await page.locator("button", { hasText: "Sačuvano" }).click();

    // Should revert to "Sačuvaj"
    await expect(
      page.locator("button", { hasText: "Sačuvaj" })
    ).toBeVisible({ timeout: 5_000 });
  });
});
