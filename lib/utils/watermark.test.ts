import { describe, it, expect } from "vitest";
import { generateFingerprint, injectWatermark } from "./watermark";

const SAMPLE_HTML = `<!DOCTYPE html>
<html><head><style>.test{}</style></head>
<body>
<div class="container">
  <p>First paragraph</p>
  <div class="card">
    <p>Second paragraph</p>
    <p>Third paragraph</p>
  </div>
</div>
</body></html>`;

describe("watermark", () => {
  describe("generateFingerprint", () => {
    it("returns a 16-character hex string", () => {
      const fp = generateFingerprint("user-1", "prob-1");
      expect(fp).toMatch(/^[0-9a-f]{16}$/);
    });

    it("is deterministic for same inputs", () => {
      const a = generateFingerprint("user-1", "prob-1");
      const b = generateFingerprint("user-1", "prob-1");
      expect(a).toBe(b);
    });

    it("differs for different users", () => {
      const a = generateFingerprint("user-1", "prob-1");
      const b = generateFingerprint("user-2", "prob-1");
      expect(a).not.toBe(b);
    });

    it("differs for different problems", () => {
      const a = generateFingerprint("user-1", "prob-1");
      const b = generateFingerprint("user-1", "prob-2");
      expect(a).not.toBe(b);
    });
  });

  describe("injectWatermark", () => {
    it("injects CSS custom property", () => {
      const result = injectWatermark(SAMPLE_HTML, "user-1", "prob-1");
      const fp = generateFingerprint("user-1", "prob-1");
      expect(result).toContain(`--wm:"${fp}"`);
    });

    it("injects zero-width characters after block elements", () => {
      const result = injectWatermark(SAMPLE_HTML, "user-1", "prob-1");
      // Zero-width chars: U+200B and U+200C
      const zwcCount = (result.match(/[\u200B\u200C]/g) || []).length;
      // 16 hex chars = 64 bits, but limited by number of closing tags
      expect(zwcCount).toBeGreaterThan(0);
      expect(zwcCount).toBeLessThanOrEqual(64);
    });

    it("injects invisible spans before </body>", () => {
      const result = injectWatermark(SAMPLE_HTML, "user-1", "prob-1");
      const fp = generateFingerprint("user-1", "prob-1");
      const chunks = fp.match(/.{4}/g)!;
      for (const chunk of chunks) {
        expect(result).toContain(`data-m="${chunk}"`);
      }
    });

    it("produces different watermarks for different users", () => {
      const a = injectWatermark(SAMPLE_HTML, "user-1", "prob-1");
      const b = injectWatermark(SAMPLE_HTML, "user-2", "prob-1");
      // CSS property values should differ
      const fpA = generateFingerprint("user-1", "prob-1");
      const fpB = generateFingerprint("user-2", "prob-1");
      expect(a).toContain(fpA);
      expect(b).toContain(fpB);
      expect(a).not.toContain(fpB);
    });
  });
});
