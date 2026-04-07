"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

// Catches errors thrown in the root layout. Must render its own <html>/<body>
// because the root layout has crashed and won't be available.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="sr">
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Nešto je pošlo naopako
          </h1>
          <p style={{ color: "#64748b", maxWidth: "28rem" }}>
            Došlo je do neočekivane greške. Pokušaj ponovo ili se vrati na
            početnu stranicu.
          </p>
          <a
            href="/"
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "0.5rem",
              backgroundColor: "#ec5b13",
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Početna
          </a>
        </div>
      </body>
    </html>
  );
}
