/**
 * Test all problem HTML files for parsing correctness.
 *
 * Checks:
 * 1. HTML file exists and can be read
 * 2. Has a <title> tag
 * 3. Has a .problem-statement or .card.problem-statement div
 * 4. Has answer options (.answer-option[data-option] or .answer-chip)
 * 5. Answer options have non-empty values
 * 6. Has a correct answer marker (.answer-chip.correct or correct answer identifiable)
 * 7. Statement extraction works (the startMarker is found)
 * 8. No body styles that break iframe embedding (min-height: 100vh handled by sanitizer)
 *
 * Usage: npx tsx scripts/test-problem-parsing.ts
 */

import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

interface ProblemIndex {
  problems: Record<string, { id: string; solutionPath: string; category: string | null; difficulty: number | null }>;
}

interface Issue {
  id: string;
  file: string;
  problems: string[];
}

function loadIndex(): ProblemIndex {
  const indexPath = path.join(process.cwd(), "database", "problems-index.json");
  return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
}

function testProblem(id: string, solutionPath: string): string[] {
  const issues: string[] = [];
  const fullPath = path.join(process.cwd(), solutionPath);

  // 1. File exists
  if (!fs.existsSync(fullPath)) {
    issues.push("FILE_MISSING: HTML file does not exist");
    return issues;
  }

  const html = fs.readFileSync(fullPath, "utf-8");
  const $ = cheerio.load(html);

  // 2. Title
  const title = $("title").text().trim();
  if (!title) {
    issues.push("NO_TITLE: Missing <title> tag");
  }

  // 3. Problem statement
  const hasStatementCard = $(".problem-statement").length > 0 || $(".card.problem-statement").length > 0;
  const statementMarkerMatch = html.match(/<div\s+class="[^"]*problem-statement[^"]*">/) || html.match(/<div\s+class="card">/);
  if (!hasStatementCard && !html.match(/<div\s+class="card">/)) {
    issues.push("NO_STATEMENT: Missing .problem-statement or .card element");
  }
  if (!statementMarkerMatch) {
    issues.push("NO_STATEMENT_MARKER: Statement marker div not found");
  }

  // 4. Answer options — check all patterns the parser handles
  const OPTION_SELECTORS = ".answer-option[data-option], .answer-chip, .final-option, .option-btn, .option-card, .option-chip, .option-item, .option-box, .answer-opt, .option-final, .option-pill, .final-opt, .answer-option-final, .opt, .option";
  const answerOptionEls = $(".answer-option[data-option]");
  const answerChipEls = $(".answer-chip");
  const allAnswerEls = $(OPTION_SELECTORS);
  const hasAnswerOptions = answerOptionEls.length > 0;
  const hasAnswerChips = answerChipEls.length > 0;
  const hasAnyAnswers = allAnswerEls.length > 0;

  if (!hasAnyAnswers) {
    issues.push("NO_ANSWERS: No answer elements found in any known pattern");
  }

  // 5. Answer option attributes (data-option)
  if (hasAnswerOptions) {
    const optionLetters: string[] = [];
    answerOptionEls.each((_, el) => {
      const opt = $(el).attr("data-option") || "";
      optionLetters.push(opt);
    });
    if (optionLetters.some(l => !l)) {
      issues.push("MISSING_DATA_OPTION: Some answer-option elements missing data-option attribute");
    }
  }

  if (hasAnswerChips) {
    let emptyChips = 0;
    answerChipEls.each((_, el) => {
      const text = $(el).text().trim();
      if (!text) emptyChips++;
    });
    if (emptyChips > 0) {
      issues.push(`EMPTY_CHIPS: ${emptyChips} answer-chip(s) have empty text`);
    }
  }

  // 6. Correct answer — match any element with "correct" in class
  const LETTER_RE = /\(?([A-Za-zА-ЯЂЉЊЋЏа-яђљњћџ])\)/;
  let correctAnswer = "";
  $("[class*=correct]").each((_, el) => {
    if (correctAnswer) return;
    const cls = $(el).attr("class") || "";
    if (cls.includes("incorrect")) return;
    const text = $(el).text().trim();
    const letterMatch = text.match(LETTER_RE);
    if (letterMatch) {
      correctAnswer = letterMatch[1].toUpperCase();
    }
  });
  if (!correctAnswer) {
    const bodyText = $.text();
    const tacanMatch = bodyText.match(/[Tt]a[čc]an\s+odgovor[^)]*\(?([A-Za-zА-Яа-я])\)/);
    if (tacanMatch) {
      correctAnswer = tacanMatch[1].toUpperCase();
    }
  }
  if (!correctAnswer) {
    issues.push("NO_CORRECT_ANSWER: Cannot determine correct answer from HTML");
  }

  // 7. Answer count
  const optionCount = hasAnswerOptions ? answerOptionEls.length : answerChipEls.length;
  if (optionCount > 0 && (optionCount < 2 || optionCount > 8)) {
    issues.push(`UNUSUAL_OPTION_COUNT: ${optionCount} options (expected 2-8)`);
  }

  // 8. Check for body styles that would break iframe
  const bodyStyleMatch = html.match(/body\s*\{[^}]*\}/g);
  if (bodyStyleMatch) {
    for (const rule of bodyStyleMatch) {
      if (/max-width:\s*\d+px/.test(rule)) {
        // This is handled by sanitizeForIframe, just note it
      }
      if (/min-height:\s*100vh/.test(rule)) {
        // This is handled by sanitizeForIframe, just note it
      }
    }
  }

  // 9. Check for answer-option format consistency
  if (hasAnswerOptions) {
    const containerClass = answerOptionEls.first().parent().attr("class") || "";
    if (!containerClass.includes("given-grid")) {
      issues.push(`UNEXPECTED_CONTAINER: answer-options are in .${containerClass} instead of .given-grid`);
    }
  }

  if (hasAnswerChips) {
    const containerClass = answerChipEls.first().parent().attr("class") || "";
    if (!containerClass.includes("answer-options-row") && !containerClass.includes("answer-options")) {
      issues.push(`UNEXPECTED_CHIP_CONTAINER: answer-chips are in .${containerClass}`);
    }
  }

  return issues;
}

// --- Main ---
const index = loadIndex();
const allIds = Object.keys(index.problems);

console.log(`Testing ${allIds.length} problems...\n`);

const allIssues: Issue[] = [];
const issueCounts: Record<string, number> = {};

for (const id of allIds) {
  const meta = index.problems[id];
  const problems = testProblem(id, meta.solutionPath);
  if (problems.length > 0) {
    allIssues.push({ id, file: meta.solutionPath, problems });
    for (const p of problems) {
      const code = p.split(":")[0];
      issueCounts[code] = (issueCounts[code] || 0) + 1;
    }
  }
}

// --- Report ---
const passed = allIds.length - allIssues.length;

console.log("=".repeat(70));
console.log(`RESULTS: ${passed}/${allIds.length} passed, ${allIssues.length} with issues`);
console.log("=".repeat(70));

if (Object.keys(issueCounts).length > 0) {
  console.log("\nIssue Summary:");
  const sorted = Object.entries(issueCounts).sort((a, b) => b[1] - a[1]);
  for (const [code, count] of sorted) {
    console.log(`  ${code}: ${count} files`);
  }
}

if (allIssues.length > 0) {
  console.log(`\nDetailed Issues (showing first 30):\n`);
  for (const issue of allIssues.slice(0, 30)) {
    console.log(`  ${issue.id} (${path.basename(issue.file)}):`);
    for (const p of issue.problems) {
      console.log(`    - ${p}`);
    }
  }
  if (allIssues.length > 30) {
    console.log(`\n  ... and ${allIssues.length - 30} more`);
  }
} else {
  console.log("\nAll problems parsed successfully!");
}

// Export failing IDs as JSON if --report flag is passed
if (process.argv.includes("--report")) {
  const reportPath = path.join(process.cwd(), "..", "prijemni", "database", "reports.json");
  const existing = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  const newReports = allIssues.map((issue) => ({
    problemId: issue.id,
    file: issue.file,
    issues: issue.problems,
    description: "problematic HTML files (no correct answer marker, no answers at all, etc.)",
  }));
  const merged = [...existing, ...newReports];
  fs.writeFileSync(reportPath, JSON.stringify(merged, null, 2) + "\n");
  console.log(`\nWrote ${newReports.length} reports to ${reportPath}`);
}
