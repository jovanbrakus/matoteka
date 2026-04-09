import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; preload" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "kadino-software-agency",
  project: "matoteka",
  // Auth token is read from SENTRY_AUTH_TOKEN env var at build time.
  // Suppress build-time logs from the Sentry plugin (still surfaces errors).
  silent: !process.env.CI,
  // Upload a larger set of source maps for better stack traces, including hidden ones.
  widenClientFileUpload: true,
  // Tunnel Sentry events through this Next.js route to bypass ad blockers.
  tunnelRoute: "/monitoring",
  // Hide source maps from production client bundles after upload.
  sourcemaps: { disable: false },
  // Automatically tree-shake Sentry logger statements to reduce bundle size.
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
