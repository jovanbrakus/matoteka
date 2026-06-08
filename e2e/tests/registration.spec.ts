import { test, expect } from "@playwright/test";
import { getUser, markVerified, deleteUser, seedToken } from "../fixtures/db";

// These flows start without a session.
test.use({ storageState: { cookies: [], origins: [] } });

const PASSWORD = "NewPassword123!";

// Distinct email per test keeps them independent (one shared DB, workers: 1).
const EMAILS = {
  validation: "e2e-reg-validation@test.matoteka.com",
  signup: "e2e-reg-signup@test.matoteka.com",
  gate: "e2e-reg-gate@test.matoteka.com",
  verify: "e2e-reg-verify@test.matoteka.com",
  reset: "e2e-reg-reset@test.matoteka.com",
};

test.describe("Email registration, verification & password reset", () => {
  test.beforeEach(async () => {
    // Clean slate for each test's email (tokens cascade with the user).
    await Promise.all(Object.values(EMAILS).map((e) => deleteUser(e)));
  });

  test("registration form validates mismatched passwords", async ({ page }) => {
    await page.goto("/registracija");
    await page.fill("input#displayName", "Test Korisnik");
    await page.fill("input#email", EMAILS.validation);
    await page.fill("input#password", PASSWORD);
    await page.fill("input#confirm", "DifferentPass123!");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Lozinke se ne poklapaju.")).toBeVisible();
    await expect(page).toHaveURL(/\/registracija/);
    // No account should have been created.
    expect(await getUser(EMAILS.validation)).toBeUndefined();
  });

  test("signup creates an unverified account and shows the check-email screen", async ({ page }) => {
    await page.goto("/registracija");
    await page.fill("input#displayName", "Novi Korisnik");
    await page.fill("input#email", EMAILS.signup);
    await page.fill("input#password", PASSWORD);
    await page.fill("input#confirm", PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page.getByRole("heading", { name: "Proveri svoj mejl" })).toBeVisible({
      timeout: 15_000,
    });

    const user = await getUser(EMAILS.signup);
    expect(user).toBeDefined();
    expect(user?.password_hash).toBeTruthy();
    expect(user?.email_verified).toBeNull(); // unverified
  });

  test("login is blocked before verification and offers a resend link", async ({ page }) => {
    // Seed an unverified account via the register API (no email is sent in e2e).
    const res = await page.request.post("/api/register", {
      data: { displayName: "Gate Test", email: EMAILS.gate, password: PASSWORD },
    });
    expect(res.ok()).toBeTruthy();

    await page.goto("/prijava");
    await page.fill("input#email", EMAILS.gate);
    await page.fill("input#password", PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Potvrdi svoj mejl pre prijave.")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/\/prijava/);

    // Resend affordance works.
    await page.click("text=Pošalji link za potvrdu ponovo");
    await expect(page.locator("text=Poslali smo novi link za potvrdu")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("magic-link verification unblocks login (new user lands on onboarding)", async ({ page }) => {
    const res = await page.request.post("/api/register", {
      data: { displayName: "Verify Test", email: EMAILS.verify, password: PASSWORD },
    });
    expect(res.ok()).toBeTruthy();

    const user = await getUser(EMAILS.verify);
    expect(user?.email_verified).toBeNull();

    // Drive the verification link (raw token seeded the way the email would carry it).
    const token = await seedToken(user!.id, "email_verify");
    await page.goto(`/verifikacija?token=${token}`);

    // Success state, then auto-redirect to the login page with the verified banner.
    await expect(page.getByRole("heading", { name: /Email je potvrđen/ })).toBeVisible({
      timeout: 15_000,
    });
    await page.waitForURL(/\/prijava\?verified=1/, { timeout: 15_000 });
    await expect(page.locator("text=Email je potvrđen.")).toBeVisible();

    expect((await getUser(EMAILS.verify))?.email_verified).not.toBeNull();

    // Now login succeeds; a freshly verified new user is routed to onboarding.
    await page.fill("input#email", EMAILS.verify);
    await page.fill("input#password", PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/onboarding", { timeout: 30_000 });
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test("password reset sets a new password the user can log in with", async ({ page }) => {
    // Existing verified account.
    const res = await page.request.post("/api/register", {
      data: { displayName: "Reset Test", email: EMAILS.reset, password: PASSWORD },
    });
    expect(res.ok()).toBeTruthy();
    await markVerified(EMAILS.reset);

    // Forgot-password request → generic confirmation.
    await page.goto("/zaboravljena-lozinka");
    await page.fill("input#email", EMAILS.reset);
    await page.click('button[type="submit"]');
    await expect(page.getByRole("heading", { name: "Proveri svoj mejl" })).toBeVisible({
      timeout: 15_000,
    });

    // Drive the reset link with a seeded token and set a new password.
    const user = await getUser(EMAILS.reset);
    const token = await seedToken(user!.id, "password_reset");
    const newPassword = "ResetPass456!";
    await page.goto(`/reset-lozinke?token=${token}`);
    await page.fill("input#password", newPassword);
    await page.fill("input#confirm", newPassword);
    await page.click('button[type="submit"]');

    // Redirected to login with the reset banner.
    await page.waitForURL(/\/prijava\?reset=1/, { timeout: 15_000 });
    await expect(page.locator("text=Lozinka je promenjena.")).toBeVisible();

    // The new password works (old one no longer does is implied by the hash change).
    await page.fill("input#email", EMAILS.reset);
    await page.fill("input#password", newPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL("**/onboarding", { timeout: 30_000 });
    await expect(page).toHaveURL(/\/onboarding/);
  });
});
