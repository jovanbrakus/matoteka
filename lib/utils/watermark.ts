import crypto from "crypto";

const SECRET = process.env.WATERMARK_SECRET || "dev-watermark-secret";

/**
 * Generate a 16-hex-char fingerprint unique to a (userId, problemId) pair.
 */
export function generateFingerprint(userId: string, problemId: string): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(`${userId}|${problemId}`)
    .digest("hex")
    .slice(0, 16);
}

function hexToBits(hex: string): number[] {
  const bits: number[] = [];
  for (const ch of hex) {
    const n = parseInt(ch, 16);
    for (let i = 3; i >= 0; i--) {
      bits.push((n >> i) & 1);
    }
  }
  return bits;
}

/**
 * Inject invisible, user-specific watermarks into HTML using three independent methods.
 */
export function injectWatermark(html: string, userId: string, problemId: string): string {
  const fp = generateFingerprint(userId, problemId);

  // Method 1: CSS custom property (invisible in rendering, present in source)
  html = html.replace(/<\/head>/i, `<style>:root{--wm:"${fp}";}</style>\n</head>`);

  // Method 2: Zero-width characters between block elements
  const bits = hexToBits(fp);
  const ZWC = ["\u200B", "\u200C"]; // 0 = ZWSP, 1 = ZWNJ
  let bitIndex = 0;
  html = html.replace(/<\/(p|div|h[1-6]|li|tr)>/gi, (match) => {
    if (bitIndex < bits.length) {
      return match + ZWC[bits[bitIndex++]];
    }
    return match;
  });

  // Method 3: Invisible spans with fingerprint chunks
  const chunks = fp.match(/.{4}/g) || [];
  const spans = chunks
    .map(
      (chunk) =>
        `<span style="position:absolute;left:-9999px;font-size:0;line-height:0;width:0;height:0;overflow:hidden" data-m="${chunk}"></span>`
    )
    .join("");
  html = html.replace(/<\/body>/i, `${spans}\n</body>`);

  return html;
}
