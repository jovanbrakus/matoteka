import { test, expect } from "@playwright/test";

test.describe("Saved problems", () => {
  // Helper: bookmark a problem from the topic solver and return the page
  async function bookmarkFromTopic(page: import("@playwright/test").Page) {
    await page.goto("/zadaci?topic=percent_proportion");

    // Wait for problem to load
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Click "Sačuvaj" to bookmark
    const bookmarkBtn = page.locator("button", { hasText: "Sačuvaj" });
    await expect(bookmarkBtn).toBeVisible({ timeout: 5_000 });
    await bookmarkBtn.click();

    // Confirm it switched to "Sačuvano"
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });
  }

  // Helper: clean up all bookmarks via API
  async function clearAllBookmarks(page: import("@playwright/test").Page) {
    const saved = await page.evaluate(async () => {
      const res = await fetch("/api/bookmarks/saved");
      return res.ok ? res.json() : [];
    });
    for (const entry of saved) {
      await page.evaluate(async (token: string) => {
        await fetch("/api/bookmarks/remove-by-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }, entry.token);
    }
  }

  test.beforeEach(async ({ page }) => {
    // Clean up any stale bookmarks from previous test runs.
    // Wait for the /vezba page heading specifically — the old `text=Slobodna`
    // matcher now hits a strict-mode violation because the sidebar also
    // contains "Slobodna vežba".
    await page.goto("/vezba");
    await expect(
      page.getByRole("heading", { name: /Slobodna Vežba/i }),
    ).toBeVisible({ timeout: 15_000 });
    await clearAllBookmarks(page);
  });

  test("empty state shows when no bookmarks exist", async ({ page }) => {
    await page.goto("/sacuvano");

    // Should show the empty state message
    await expect(
      page.locator("text=Nema sačuvanih zadataka")
    ).toBeVisible({ timeout: 15_000 });

    // Should show the CTA link to start practicing
    await expect(
      page.locator("a", { hasText: "Kreni da vežbaš" })
    ).toBeVisible();
  });

  test("bookmarking a problem and navigating to /sacuvano", async ({
    page,
  }) => {
    // Bookmark a problem
    await bookmarkFromTopic(page);

    // Navigate to /sacuvano — should redirect to /sacuvano/[token]
    await page.goto("/sacuvano");
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });

    // URL should contain a 12-char hex token, not a numeric problem ID
    const url = page.url();
    const tokenMatch = url.match(/\/sacuvano\/([a-f0-9]{12})$/);
    expect(tokenMatch).toBeTruthy();

    // The viewer should show the navigation bar with counter "1 / 1"
    await expect(page.locator("text=/ 1")).toBeVisible({ timeout: 15_000 });

    // The problem should render — "Tvoj odgovor" section
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Bookmark button should show "Sačuvano" (pre-set via initialBookmarked)
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });
  });

  test("prev/next navigation between saved problems", async ({ page }) => {
    // Bookmark two different problems by visiting different topics
    await page.goto("/zadaci?topic=percent_proportion");
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });
    await page.locator("button", { hasText: "Sačuvaj" }).click();
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });

    await page.goto("/zadaci?topic=linear_equations");
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });
    await page.locator("button", { hasText: "Sačuvaj" }).click();
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });

    // Go to saved problems
    await page.goto("/sacuvano");
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });

    // Should show "1 / 2"
    await expect(page.locator("text=/ 2")).toBeVisible({ timeout: 15_000 });

    // Problem should be loaded
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Click "Sledeći" to go to next problem
    const nextBtn = page.locator("a", { hasText: "Sledeći" });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // URL should change to a different token
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });

    // Should now show "2 / 2" in the sticky nav counter. The old plain
    // `text=2` matcher now hits dozens of unrelated "2"s on the page
    // (MathJax <mn>2</mn> in answer options, the problem year, etc).
    await expect(
      page.locator(".sticky span.text-sm.font-bold.text-heading"),
    ).toContainText("2 / 2", { timeout: 10_000 });

    // Problem should still render
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Click "Prethodni" to go back
    const prevBtn = page.locator("a", { hasText: "Prethodni" });
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();

    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });
  });

  test("problem picker dialog opens and lists saved problems", async ({
    page,
  }) => {
    // Bookmark a problem first
    await bookmarkFromTopic(page);

    // Navigate to saved viewer
    await page.goto("/sacuvano");
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Click "Izaberi zadatak" to open the picker dialog
    await page.locator("button", { hasText: "Izaberi zadatak" }).click();

    // Dialog should appear with heading "Sačuvani zadaci"
    await expect(
      page.locator("text=Sačuvani zadaci").first()
    ).toBeVisible({ timeout: 5_000 });

    // Should show the counter "/ 30 sačuvano"
    await expect(page.locator("text=/ 30 sačuvano")).toBeVisible();

    // Should show "Trenutni" badge on the active problem
    await expect(page.locator("text=Trenutni")).toBeVisible();

    // Close the dialog by clicking the X button. Scope to `.max-w-lg`
    // (the dialog box's unique class) so we don't accidentally pick up
    // the mobile hamburger button in `authenticated-layout.tsx`, which
    // also lives inside a `.fixed` container and comes first in DOM order.
    const closeBtn = page.locator(".max-w-lg").locator("button").first();
    await closeBtn.click();

    // Dialog should be gone
    await expect(
      page.locator(".fixed .bg-black\\/60")
    ).not.toBeVisible({ timeout: 3_000 });
  });

  test("can remove a bookmark from the picker dialog", async ({ page }) => {
    // Bookmark a problem
    await bookmarkFromTopic(page);

    // Navigate to saved viewer
    await page.goto("/sacuvano");
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Open picker dialog
    await page.locator("button", { hasText: "Izaberi zadatak" }).click();
    await expect(
      page.locator("text=Sačuvani zadaci").first()
    ).toBeVisible({ timeout: 5_000 });

    // Click the trash/remove button
    const removeBtn = page.locator('.fixed button[title="Ukloni iz sačuvanih"]');
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();

    // Should redirect to the empty state since that was the only bookmark
    await page.waitForURL("**/sacuvano", { timeout: 15_000 });
    await expect(
      page.locator("text=Nema sačuvanih zadataka")
    ).toBeVisible({ timeout: 15_000 });
  });

  test("saved card appears in practice hub", async ({ page }) => {
    await page.goto("/vezba");

    // The "Sačuvani zadaci" card should be visible in the recommendations strip
    await expect(
      page.locator("a", { hasText: "Sačuvani zadaci" })
    ).toBeVisible({ timeout: 15_000 });

    // Should show the "Sačuvano" label
    await expect(page.locator("text=Sačuvano").first()).toBeVisible();
  });

  test("saved card in practice hub links to /sacuvano", async ({ page }) => {
    await page.goto("/vezba");

    const savedCard = page.locator("a", { hasText: "Sačuvani zadaci" });
    await expect(savedCard).toBeVisible({ timeout: 15_000 });

    // Verify the link href points to /sacuvano
    await expect(savedCard).toHaveAttribute("href", "/sacuvano");
  });

  test("sidebar shows Sačuvani zadaci link", async ({ page }) => {
    await page.goto("/vezba");

    // The sidebar should have a "Sačuvani zadaci" navigation item
    await expect(
      page.locator("nav a", { hasText: /Sačuvan/ })
    ).toBeVisible({ timeout: 15_000 });
  });

  test("token URLs do not expose problem IDs", async ({ page }) => {
    // Bookmark a problem and capture what problem ID was loaded
    await page.goto("/zadaci?topic=percent_proportion");
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });
    await page.locator("button", { hasText: "Sačuvaj" }).click();
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });

    // Navigate to saved
    await page.goto("/sacuvano");
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });

    // The URL should contain only a hex token, not a numeric problem ID
    const url = page.url();
    expect(url).toMatch(/\/sacuvano\/[a-f0-9]{12}$/);
    // Should NOT contain patterns like /sacuvano/12345678 (8+ digit numeric ID)
    expect(url).not.toMatch(/\/sacuvano\/\d{6,}$/);
  });
});
