import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.e2e") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["html", { open: "never" }], ["list"]],
  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15_000,
  },
  timeout: 60_000,
  expect: { timeout: 15_000 },
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, ".auth/student.json"),
      },
      dependencies: ["setup"],
      testIgnore: /admin\.spec\.ts/,
    },
    {
      name: "admin",
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, ".auth/admin.json"),
      },
      dependencies: ["setup"],
      testMatch: /admin\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npx next dev --port 3000",
    cwd: path.resolve(__dirname, ".."),
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      DATABASE_URL: process.env.DATABASE_URL!,
      AUTH_SECRET: process.env.AUTH_SECRET || "e2e-test-auth-secret-minimum-32-characters-long",
      AUTH_URL: "http://localhost:3000",
      NEXTAUTH_URL: "http://localhost:3000",
      WATERMARK_SECRET: process.env.WATERMARK_SECRET || "e2e-watermark-secret",
      AUTH_PASSWORD_ENABLED: "true",
    },
  },
});
