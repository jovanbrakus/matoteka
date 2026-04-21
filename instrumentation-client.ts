import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    // Session Replay is off — flip these on if you decide you want it later.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    // MathJax rejects with "Typesetting failed: ..." when a lesson unmounts
    // mid-typeset (navigation away from /znanje/[slug]). The DOM node its
    // internal batch was about to touch becomes null, so it throws from a
    // detached Promise chain. It's not a real bug — the user has already left
    // the page — but the rejection surfaces after the in-page suppressor's
    // listener is torn down or fires too late to beat Sentry's global handler.
    ignoreErrors: [/Typesetting failed/],
  });
}

// Capture client-side navigations as transactions.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
