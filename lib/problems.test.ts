import { describe, it, expect } from "vitest";
import { parseHtml } from "./problems";

// --- parseHtml tests ---
// This is the function that extracts correct answers from problem HTML.
// If it parses incorrectly, every answer check and exam score is wrong.

describe("parseHtml", () => {
  describe("title extraction", () => {
    it("extracts title from data-card=problem-title", () => {
      const html = `<div data-card="problem-title">Zadatak 5</div>
        <div class="correct">(B)</div>`;
      expect(parseHtml(html).title).toBe("Zadatak 5");
    });

    it("defaults to 'Zadatak' when no title element exists", () => {
      const html = `<div class="correct">(A)</div>`;
      expect(parseHtml(html).title).toBe("Zadatak");
    });
  });

  describe("correct answer extraction via class=correct", () => {
    it("finds answer from element with class 'correct'", () => {
      const html = `<span class="answer-chip correct">(B)</span>`;
      expect(parseHtml(html).correctAnswer).toBe("B");
    });

    it("finds answer with parenthesized letter", () => {
      const html = `<span class="correct">Odgovor (Г)</span>`;
      expect(parseHtml(html).correctAnswer).toBe("Г");
    });

    it("uppercases lowercase answers", () => {
      const html = `<span class="correct">(c)</span>`;
      expect(parseHtml(html).correctAnswer).toBe("C");
    });

    it("skips elements with class containing 'incorrect'", () => {
      const html = `
        <span class="incorrect">(A)</span>
        <span class="correct">(D)</span>`;
      expect(parseHtml(html).correctAnswer).toBe("D");
    });

    it("takes the first correct element found", () => {
      const html = `
        <span class="correct">(A)</span>
        <span class="correct">(B)</span>`;
      expect(parseHtml(html).correctAnswer).toBe("A");
    });

    it("handles class with extra words like 'answer-chip correct'", () => {
      const html = `<div class="answer-chip correct active">(Б)</div>`;
      expect(parseHtml(html).correctAnswer).toBe("Б");
    });
  });

  describe("fallback: Tačan odgovor text pattern", () => {
    it("finds answer from 'Tačan odgovor je (X)' text", () => {
      const html = `<p>Tačan odgovor je (B)</p>`;
      expect(parseHtml(html).correctAnswer).toBe("B");
    });

    it("handles 'Tacan' without diacritics", () => {
      const html = `<p>Tacan odgovor je (C)</p>`;
      expect(parseHtml(html).correctAnswer).toBe("C");
    });

    it("handles lowercase 'tačan'", () => {
      const html = `<p>tačan odgovor je (A)</p>`;
      expect(parseHtml(html).correctAnswer).toBe("A");
    });

    it("prefers class=correct over text fallback", () => {
      const html = `
        <span class="correct">(B)</span>
        <p>Tačan odgovor je (D)</p>`;
      expect(parseHtml(html).correctAnswer).toBe("B");
    });
  });

  describe("default answer", () => {
    it("defaults to A when answer options exist but no correct marker", () => {
      const html = `
        <div data-card="problem-statement">
          <div class="answer-option" data-option="A"><span class="answer-value">x=1</span></div>
          <div class="answer-option" data-option="B"><span class="answer-value">x=2</span></div>
        </div>`;
      expect(parseHtml(html).correctAnswer).toBe("A");
    });

    it("defaults to A when no correct marker and no answer options", () => {
      const html = `<p>Some problem text with no answers</p>`;
      expect(parseHtml(html).correctAnswer).toBe("A");
    });
  });

  describe("answer options extraction", () => {
    it("extracts answer options from .answer-value elements", () => {
      const html = `
        <div data-card="problem-statement">
          <div class="answer-option" data-option="A"><span class="answer-value">x = 1</span></div>
          <div class="answer-option" data-option="B"><span class="answer-value">x = 2</span></div>
          <div class="answer-option" data-option="C"><span class="answer-value">x = 3</span></div>
        </div>`;
      const result = parseHtml(html);
      expect(result.answerOptions).toEqual(["x = 1", "x = 2", "x = 3"]);
      expect(result.numOptions).toBe(3);
    });

    it("falls back to option innerHTML when no .answer-value", () => {
      const html = `
        <div data-card="problem-statement">
          <div class="answer-option" data-option="A">Option A content</div>
          <div class="answer-option" data-option="B">Option B content</div>
        </div>`;
      const result = parseHtml(html);
      expect(result.answerOptions).toHaveLength(2);
      expect(result.answerOptions[0]).toContain("Option A content");
    });

    it("defaults numOptions to 5 when no options found", () => {
      const html = `<p>Just text</p>`;
      expect(parseHtml(html).numOptions).toBe(5);
    });

    it("ignores answer-option elements outside problem-statement", () => {
      const html = `
        <div data-card="solution-step">
          <div class="answer-option" data-option="A"><span class="answer-value">wrong scope</span></div>
        </div>`;
      expect(parseHtml(html).answerOptions).toEqual([]);
    });
  });

  describe("problem text extraction", () => {
    it("extracts text from problem-statement card", () => {
      const html = `
        <div data-card="problem-statement">
          <p>Koliko je 2 + 2?</p>
        </div>`;
      expect(parseHtml(html).problemText).toContain("Koliko je 2 + 2?");
    });

    it("truncates to 2000 chars", () => {
      const longText = "A".repeat(3000);
      const html = `<div data-card="problem-statement"><p>${longText}</p></div>`;
      expect(parseHtml(html).problemText.length).toBeLessThanOrEqual(2000);
    });

    it("returns empty string when no problem-statement card", () => {
      const html = `<p>Not inside a card</p>`;
      expect(parseHtml(html).problemText).toBe("");
    });
  });

  describe("Cyrillic answer support", () => {
    it("handles Serbian Cyrillic letters А-Ж", () => {
      const html = `<span class="correct">(В)</span>`;
      expect(parseHtml(html).correctAnswer).toBe("В");
    });

    it("handles Cyrillic Д via text fallback", () => {
      const html = `<p>Tačan odgovor je (Д)</p>`;
      expect(parseHtml(html).correctAnswer).toBe("Д");
    });
  });
});
