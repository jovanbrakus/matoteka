/**
 * Forensic watermark decoder.
 * Extracts user fingerprints from leaked HTML files.
 *
 * Usage: npx tsx scripts/decode-watermark.ts <file.html>
 */

import fs from "fs";

const ZWSP = "\u200B"; // 0
const ZWNJ = "\u200C"; // 1

function extractCssFingerprint(html: string): string | null {
  const match = html.match(/--wm:\s*"([0-9a-f]{16})"/);
  return match ? match[1] : null;
}

function extractZwcFingerprint(html: string): string | null {
  const bits: number[] = [];
  for (const ch of html) {
    if (ch === ZWSP) bits.push(0);
    else if (ch === ZWNJ) bits.push(1);
  }
  if (bits.length < 4) return null;

  // Convert bits to hex (groups of 4)
  const usable = bits.slice(0, Math.floor(bits.length / 4) * 4);
  let hex = "";
  for (let i = 0; i < usable.length; i += 4) {
    const nibble = (usable[i] << 3) | (usable[i + 1] << 2) | (usable[i + 2] << 1) | usable[i + 3];
    hex += nibble.toString(16);
  }
  return hex.length >= 16 ? hex.slice(0, 16) : hex || null;
}

function extractSpanFingerprint(html: string): string | null {
  const matches = html.match(/data-m="([0-9a-f]{4})"/g);
  if (!matches || matches.length === 0) return null;
  const chunks = matches.map((m) => m.match(/"([0-9a-f]{4})"/)![1]);
  const fp = chunks.join("");
  return fp.length === 16 ? fp : fp || null;
}

// --- Main ---

const file = process.argv[2];
if (!file) {
  console.error("Usage: npx tsx scripts/decode-watermark.ts <file.html>");
  process.exit(1);
}

const html = fs.readFileSync(file, "utf-8");

const cssResult = extractCssFingerprint(html);
const zwcResult = extractZwcFingerprint(html);
const spanResult = extractSpanFingerprint(html);

console.log("=== Watermark Extraction Results ===\n");
console.log(`CSS custom property (--wm):  ${cssResult ?? "NOT FOUND"}`);
console.log(`Zero-width characters:       ${zwcResult ?? "NOT FOUND"}`);
console.log(`Invisible spans (data-m):    ${spanResult ?? "NOT FOUND"}`);

const results = [cssResult, zwcResult, spanResult].filter(Boolean);
const unique = new Set(results);

console.log("");
if (unique.size === 1 && results.length >= 2) {
  console.log(`MATCH: All methods agree — fingerprint is ${results[0]}`);
} else if (unique.size > 1) {
  console.log("WARNING: Methods disagree — some markers may have been tampered with");
} else if (results.length === 1) {
  console.log(`PARTIAL: Only one method found a fingerprint: ${results[0]}`);
} else {
  console.log("NONE: No watermark found in this file");
}
