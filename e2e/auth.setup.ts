import { test as setup, expect } from "@playwright/test";
import { TEST_STUDENT, TEST_ADMIN } from "./fixtures/test-data";
import path from "path";

setup("authenticate as student", async ({ page }) => {
  await page.goto("/prijava");
  await page.waitForSelector("input#email", { timeout: 15_000 });

  await page.fill("input#email", TEST_STUDENT.email);
  await page.fill("input#password", TEST_STUDENT.password);
  await page.click('button[type="submit"]');

  await page.waitForURL("**/vezba", { timeout: 30_000 });
  await expect(page).toHaveURL(/\/vezba/);

  await page.context().storageState({
    path: path.resolve(__dirname, ".auth/student.json"),
  });
});

setup("authenticate as admin", async ({ page }) => {
  await page.goto("/prijava");
  await page.waitForSelector("input#email", { timeout: 15_000 });

  await page.fill("input#email", TEST_ADMIN.email);
  await page.fill("input#password", TEST_ADMIN.password);
  await page.click('button[type="submit"]');

  await page.waitForURL("**/vezba", { timeout: 30_000 });
  await expect(page).toHaveURL(/\/vezba/);

  await page.context().storageState({
    path: path.resolve(__dirname, ".auth/admin.json"),
  });
});
