import { test, expect } from "@playwright/test";

test.describe("Card comments", () => {
  // Helper: clean up all comments this user has on any problem before each test
  // so tests don't pollute each other. Uses the /api/admin/comments moderation
  // queue via the student's session — the student isn't admin, so we instead
  // rely on deleting by ID after creating them in-test.
  //
  // For now we keep it simple: each test creates + cleans up its own comments.

  async function openProblemAndShowSolution(
    page: import("@playwright/test").Page
  ) {
    // Navigate to a topic solver to load a problem.
    await page.goto("/zadaci?topic=percent_proportion");

    // Wait for the problem view to render.
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });

    // Skip the answer and show the full solution.
    await page
      .locator('button:has-text("Preskoči i vidi rešenje")')
      .first()
      .click();

    // The full solution is rendered in a second iframe. Wait for the
    // "Kompletno rešenje" header to appear.
    await expect(page.locator("text=Kompletno rešenje")).toBeVisible({
      timeout: 20_000,
    });
  }

  test("comment button is injected into every solution card", async ({
    page,
  }) => {
    await openProblemAndShowSolution(page);

    // The full-solution iframe is the second ProblemStatement on the page.
    // Both iframes serve from /api/problems/*/html, so target by the `section`
    // we expect in the src.
    const solutionFrame = page.frameLocator(
      "iframe[src*='/api/problems/'][src*='theme']:not([src*='section=statement'])"
    );

    // At least one comment button should be present in the full solution.
    const btns = solutionFrame.locator(".matoteka-comment-btn");
    await expect(btns.first()).toBeAttached({ timeout: 20_000 });

    const count = await btns.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("clicking a card comment button opens the panel with the correct anchor", async ({
    page,
  }) => {
    await openProblemAndShowSolution(page);

    const solutionFrame = page.frameLocator(
      "iframe[src*='/api/problems/'][src*='theme']:not([src*='section=statement'])"
    );

    // Click the first card-level button (no data-anchor-step).
    const cardBtn = solutionFrame
      .locator(".matoteka-comment-btn:not([data-anchor-step])")
      .first();
    await expect(cardBtn).toBeAttached({ timeout: 20_000 });
    // Buttons have opacity: 0.55 until hovered; Playwright's .click() still
    // dispatches a trusted click so the in-iframe handler fires.
    await cardBtn.click({ force: true });

    // Panel should be visible.
    await expect(
      page.locator("aside[role='dialog'][aria-label='Komentari']")
    ).toBeVisible({ timeout: 5_000 });

    // Empty state message for a fresh anchor.
    await expect(page.locator("text=Još nema komentara")).toBeVisible();
  });

  test("submits a comment, shows it in the panel, and updates the badge", async ({
    page,
  }) => {
    await openProblemAndShowSolution(page);

    const solutionFrame = page.frameLocator(
      "iframe[src*='/api/problems/'][src*='theme']:not([src*='section=statement'])"
    );

    // Pick a step-level button (inside step-solution card) so we exercise
    // both the data-card and data-step attributes at once.
    const stepBtn = solutionFrame
      .locator(".matoteka-comment-btn[data-anchor-step]")
      .first();
    await expect(stepBtn).toBeAttached({ timeout: 20_000 });
    await stepBtn.click({ force: true });

    // Panel opens with the "Korak N · Rešenje korak po korak" header.
    const panel = page.locator("aside[role='dialog'][aria-label='Komentari']");
    await expect(panel).toBeVisible({ timeout: 5_000 });
    await expect(panel.locator("text=/Korak\\s+\\d+/")).toBeVisible();

    // Select the Question kind (it's the default, but click it to be explicit).
    await panel.locator("button", { hasText: "Pitanje" }).first().click();

    // Type a unique body and submit.
    const marker = `e2e-test-${Date.now()}`;
    await panel.locator("textarea").fill(`Ovo je test komentar ${marker}`);
    await panel.locator("button", { hasText: "Pošalji" }).click();

    // Comment appears in the panel.
    await expect(panel.locator(`text=${marker}`)).toBeVisible({
      timeout: 10_000,
    });

    // Close the panel.
    await panel.locator("button[aria-label='Zatvori']").click();
    await expect(panel).not.toBeVisible({ timeout: 3_000 });

    // The step button badge should now read "1". Counter span is initially
    // hidden; once counts arrive, the .matoteka-comment-count span is shown.
    const badge = stepBtn.locator(".matoteka-comment-count");
    await expect(badge).toHaveText("1", { timeout: 10_000 });

    // Clean up: delete the comment via API so the DB stays clean for other tests.
    await page.evaluate(async (m: string) => {
      // Grab the problemId from the first iframe src.
      const iframe = document.querySelector(
        "iframe[src*='/api/problems/']"
      ) as HTMLIFrameElement | null;
      if (!iframe) return;
      const match = iframe.src.match(/\/api\/problems\/([^/]+)\//);
      if (!match) return;
      const problemId = match[1];
      const res = await fetch(`/api/problems/${problemId}/comments`);
      if (!res.ok) return;
      const data = await res.json();
      for (const threads of Object.values(data.anchors) as any[]) {
        for (const t of threads as any[]) {
          if (t.comment.body.includes(m)) {
            await fetch(`/api/comments/${t.comment.id}`, { method: "DELETE" });
          }
        }
      }
    }, marker);
  });

  test("comment persists across navigation", async ({ page }) => {
    // This test verifies comments survive a full server roundtrip: post a
    // comment, navigate away + back to the SAME problem via a stable URL,
    // and confirm the badge count + thread contents are restored.
    //
    // Note: /zadaci?topic=... randomly picks a problem per visit, so
    // page.reload() would show a different problem. The student-facing
    // stable URL for a specific problem is /sacuvano/<token>, which requires
    // bookmarking first. We use that path here.
    await openProblemAndShowSolution(page);

    // Bookmark the current problem so we can revisit it via a stable URL.
    // The bookmark button lives outside the iframe in the problem header.
    await page.locator("button", { hasText: "Sačuvaj" }).first().click();
    await expect(
      page.locator("button", { hasText: "Sačuvano" })
    ).toBeVisible({ timeout: 5_000 });

    // Capture the problem ID from the iframe src for later cleanup + assertions.
    const problemId = await page.evaluate(() => {
      const iframe = document.querySelector(
        "iframe[src*='/api/problems/']"
      ) as HTMLIFrameElement | null;
      const match = iframe?.src.match(/\/api\/problems\/([^/]+)\//);
      return match ? match[1] : null;
    });
    expect(problemId).toBeTruthy();

    const solutionFrame = page.frameLocator(
      "iframe[src*='/api/problems/'][src*='theme']:not([src*='section=statement'])"
    );

    const stepBtn = solutionFrame
      .locator(".matoteka-comment-btn[data-anchor-step]")
      .first();
    await expect(stepBtn).toBeAttached({ timeout: 20_000 });
    await stepBtn.click({ force: true });

    const panel = page.locator("aside[role='dialog'][aria-label='Komentari']");
    const marker = `persist-${Date.now()}`;
    await panel.locator("textarea").fill(`Test ${marker}`);
    await panel.locator("button", { hasText: "Pošalji" }).click();
    await expect(panel.locator(`text=${marker}`)).toBeVisible({
      timeout: 10_000,
    });

    // Navigate away, then back to the bookmarked problem via /sacuvano.
    // /sacuvano redirects to /sacuvano/<token> — a stable URL for this
    // bookmark, backed by the same problem ID.
    await page.goto("/sacuvano");
    await page.waitForURL("**/sacuvano/**", { timeout: 15_000 });
    await expect(page.locator("text=Tvoj odgovor")).toBeVisible({
      timeout: 20_000,
    });
    await page
      .locator('button:has-text("Preskoči i vidi rešenje")')
      .first()
      .click();
    await expect(page.locator("text=Kompletno rešenje")).toBeVisible({
      timeout: 20_000,
    });

    // Badge should still be 1 on the step button.
    const solutionFrame2 = page.frameLocator(
      "iframe[src*='/api/problems/'][src*='theme']:not([src*='section=statement'])"
    );
    const stepBtn2 = solutionFrame2
      .locator(".matoteka-comment-btn[data-anchor-step]")
      .first();
    await expect(stepBtn2.locator(".matoteka-comment-count")).toHaveText("1", {
      timeout: 10_000,
    });

    // Open the panel again — the comment is still there.
    await stepBtn2.click({ force: true });
    await expect(page.locator(`text=${marker}`)).toBeVisible({
      timeout: 5_000,
    });

    // Cleanup: delete the comment and remove the bookmark.
    await page.evaluate(
      async ({ pid, m }: { pid: string; m: string }) => {
        const res = await fetch(`/api/problems/${pid}/comments`);
        if (res.ok) {
          const data = await res.json();
          for (const threads of Object.values(data.anchors) as any[]) {
            for (const t of threads as any[]) {
              if (t.comment.body.includes(m)) {
                await fetch(`/api/comments/${t.comment.id}`, { method: "DELETE" });
              }
            }
          }
        }
        await fetch(`/api/bookmarks/${pid}`, { method: "POST" });
      },
      { pid: problemId!, m: marker }
    );
  });
});
