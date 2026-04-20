"use client";

import { useEffect } from "react";

// MathJax typesetting is async. When the user navigates between /znanje and
// /znanje/[slug] mid-typeset, the lesson's DOM ref becomes null and MathJax
// rejects with "Typesetting failed: ... 'contains'". The rejection fires
// after the lesson component has unmounted, so the listener must live on a
// parent that spans both routes — otherwise it's torn down before the
// rejection surfaces.
export function MathJaxRejectionSuppressor() {
  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      if (e.reason?.message?.includes("Typesetting failed")) {
        e.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);
  return null;
}
