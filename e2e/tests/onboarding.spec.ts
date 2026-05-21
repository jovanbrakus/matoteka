import { test, expect } from "@playwright/test";
import { neon } from "@neondatabase/serverless";
import { TEST_STUDENT } from "../fixtures/test-data";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.e2e") });

const sql = neon(process.env.DATABASE_URL!);

async function resetOnboarding() {
  await sql`
    UPDATE users
    SET onboarded_at = NULL, target_faculties = '[]'::jsonb
    WHERE email = ${TEST_STUDENT.email}
  `;
}

async function readOnboardingState() {
  const rows = await sql`
    SELECT onboarded_at, target_faculties
    FROM users
    WHERE email = ${TEST_STUDENT.email}
  ` as Array<{ onboarded_at: string | null; target_faculties: string[] }>;
  return rows[0];
}

async function loginFresh(page: import("@playwright/test").Page) {
  await page.goto("/prijava");
  await page.waitForSelector("input#email", { timeout: 15_000 });
  await page.fill("input#email", TEST_STUDENT.email);
  await page.fill("input#password", TEST_STUDENT.password);
  await page.click('button[type="submit"]');
}

test.describe("Onboarding", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async () => {
    await resetOnboarding();
  });

  test("redirects new user to /onboarding and completes flow with faculties", async ({ page }) => {
    await loginFresh(page);

    // Proxy redirects authed user with NULL onboarded_at to /onboarding
    await page.waitForURL("**/onboarding", { timeout: 30_000 });
    await expect(page).toHaveURL(/\/onboarding/);

    // Slide 1 — welcome
    await expect(page.getByRole("heading", { name: /Drago nam je/ })).toBeVisible({ timeout: 10_000 });
    await page.getByRole("button", { name: /Krenimo/ }).click();

    // Slide 2 — categories
    await expect(page.getByRole("heading", { name: /Cela matematika/ })).toBeVisible({ timeout: 5_000 });
    await page.locator('footer button:has-text("Dalje")').click();

    // Slide 3 — practice
    await expect(page.getByRole("heading", { name: /Izaberi kategoriju/ })).toBeVisible({ timeout: 5_000 });
    await page.locator('footer button:has-text("Dalje")').click();

    // Slide 4 — simulation
    await expect(page.getByRole("heading", { name: /Spremnost koju možeš/ })).toBeVisible({ timeout: 5_000 });
    await page.locator('footer button:has-text("Dalje")').click();

    // Slide 5 — faculties
    await expect(page.getByRole("heading", { name: /Za koji prijemni/ })).toBeVisible({ timeout: 5_000 });
    await page.getByRole("button", { name: /Elektrotehnički/ }).click();
    await page.getByRole("button", { name: /Fakultet organizacionih/ }).click();

    // Finish
    await page.getByRole("button", { name: /Počni/ }).click();
    await page.waitForURL("**/vezba", { timeout: 15_000 });
    await expect(page).toHaveURL(/\/vezba/);

    // DB persisted
    const state = await readOnboardingState();
    expect(state.onboarded_at).not.toBeNull();
    expect(state.target_faculties).toEqual(expect.arrayContaining(["etf", "fon"]));

    // Reload — should NOT redirect back to /onboarding
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/vezba/);
  });

  test("skip path completes onboarding without faculties", async ({ page }) => {
    await loginFresh(page);
    await page.waitForURL("**/onboarding", { timeout: 30_000 });

    await page.getByRole("button", { name: /Preskoči/ }).click();
    await page.waitForURL("**/vezba", { timeout: 15_000 });

    const state = await readOnboardingState();
    expect(state.onboarded_at).not.toBeNull();
    expect(state.target_faculties).toEqual([]);
  });
});
