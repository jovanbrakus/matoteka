import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

// --- Index types (lightweight, from problems-index.json) ---

export interface ProblemMeta {
  id: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  extra: string | null;
  category: string | null;
  difficulty: number | null;
  solutionPath: string;
}

export interface CategoryGroup {
  id: string;
  en: string;
  sr: string;
  categories: string[];
}

export interface Category {
  id: string;
  en: string;
  sr: string;
}

interface ProblemsIndex {
  generatedAt: string;
  totalProblems: number;
  problems: Record<string, ProblemMeta>;
  byFaculty: Record<string, string[]>;
  byCategory: Record<string, string[]>;
  byYear: Record<string, string[]>;
  categories: Category[];
  categoryGroups: CategoryGroup[];
}

// --- On-the-fly parsed data ---

export interface ParsedProblem extends ProblemMeta {
  title: string;
  correctAnswer: string;
  answerOptions: string[];
  numOptions: number;
  problemText: string;
}

// --- Singleton index ---

let _index: ProblemsIndex | null = null;
let _allMeta: ProblemMeta[] | null = null;

function getIndex(): ProblemsIndex {
  if (!_index) {
    const indexPath = path.join(process.cwd(), "database", "problems-index.json");
    _index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  }
  return _index!;
}

// --- HTML parsing (on-the-fly) ---

export function parseHtml(htmlContent: string) {
  const $ = cheerio.load(htmlContent);

  const title = $("title").text().trim() || "Zadatak";

  // Find correct answer — many class patterns exist across generated files.
  // Match any element whose class contains "correct" but not "incorrect".
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
  // Fallback: look for "Tačan odgovor je (X)" text pattern
  if (!correctAnswer) {
    const bodyText = $.text();
    const tacanMatch = bodyText.match(/[Tt]a[čc]an\s+odgovor[^)]*\(?([A-Za-zА-Яа-я])\)/);
    if (tacanMatch) {
      correctAnswer = tacanMatch[1].toUpperCase();
    }
  }

  const answerOptions: string[] = [];
  const originalLabels: string[] = []; // track original labels (A, B, V, G, D, etc.)
  const LABEL_STRIP_RE = /^\(?([A-Za-zА-ЯЂЉЊЋЏа-яђљњћџ])\)\s*/;

  $(".answer-option[data-option]").each((_, el) => {
    const valueEl = $(el).find(".value");
    // Fall back to element's own content when .value div is missing or empty
    const value = (valueEl.html() || valueEl.text() || "").trim();
    if (value) {
      answerOptions.push(value);
    } else {
      // No .value div — extract from element text, strip label prefix
      const html = ($(el).html() || $(el).text() || "").trim();
      const stripped = html.replace(LABEL_STRIP_RE, "").replace(/<div[^>]*class="label"[^>]*>.*?<\/div>/i, "").trim();
      answerOptions.push(stripped || html);
    }
    originalLabels.push(($(el).attr("data-option") || "").toUpperCase());
  });

  // Fallback 1: .answer-chip
  if (answerOptions.length === 0) {
    $(".answer-chip").each((_, el) => {
      const text = $(el).text().trim();
      const labelMatch = text.match(LABEL_STRIP_RE);
      if (labelMatch) originalLabels.push(labelMatch[1].toUpperCase());
      const stripped = text.replace(/^\([A-Za-zА-Яа-яĐŽĆČŠđžćčš]\)\s*/, "");
      answerOptions.push(stripped || text);
    });
  }

  // Fallback 2: extract from final answer section or inline options —
  // covers .final-option, .option-btn, .option-card, .option, .opt, etc.
  if (answerOptions.length === 0) {
    const OPTION_SELECTORS = ".final-option, .option-btn, .option-card, .option-chip, .option-item, .option-box, .answer-opt, .option-final, .option-pill, .final-opt, .answer-option-final, .opt, .option";
    $(OPTION_SELECTORS).each((_, el) => {
      const text = $(el).text().trim();
      if (/ne\s+znam/i.test(text)) return; // skip "Ne znam" option
      const cls = $(el).attr("class") || "";
      if (cls.includes("incorrect")) return; // skip wrong-answer markers
      const labelMatch = text.match(LABEL_STRIP_RE);
      if (labelMatch) {
        originalLabels.push(labelMatch[1].toUpperCase());
        const html = ($(el).html() || text).trim();
        const stripped = html.replace(LABEL_STRIP_RE, "");
        answerOptions.push(stripped);
      }
    });
  }

  // Map correct answer from original label (e.g. "G") to index-based letter (e.g. "D")
  // since AnswerOptions component uses sequential A, B, C, D, E labels.
  // Some HTML files use Cyrillic letters (А, Б, В, Г, Д) as option labels.
  // Normalize both correctAnswer and originalLabels from Cyrillic to positional Latin.
  const CYRILLIC_TO_POSITION: Record<string, string> = {
    "А": "A", "Б": "B", "В": "C", "Г": "D", "Д": "E",
    "Ђ": "F", "Е": "G", "Ж": "H", "З": "I",
  };
  if (correctAnswer && CYRILLIC_TO_POSITION[correctAnswer]) {
    correctAnswer = CYRILLIC_TO_POSITION[correctAnswer];
  }
  const normalizedLabels = originalLabels.map((l) => CYRILLIC_TO_POSITION[l] || l);
  if (correctAnswer && normalizedLabels.length > 0) {
    const idx = normalizedLabels.indexOf(correctAnswer);
    if (idx !== -1) {
      correctAnswer = String.fromCharCode(65 + idx); // A=0, B=1, C=2, ...
    }
  }

  if (!correctAnswer && answerOptions.length > 0) {
    correctAnswer = "A";
  }

  let problemText = "";
  const problemStatement = $(".problem-statement").first();
  if (problemStatement.length) {
    problemText = problemStatement.text().replace(/\s+/g, " ").trim().slice(0, 2000);
  }

  return {
    title,
    correctAnswer: correctAnswer || "A",
    answerOptions,
    numOptions: answerOptions.length || 5,
    problemText,
  };
}

// --- Core accessors ---

export function getProblemMeta(id: string): ProblemMeta | null {
  return getIndex().problems[id] ?? null;
}

export function getProblemHtml(id: string): string | null {
  const meta = getProblemMeta(id);
  if (!meta) return null;
  const htmlPath = path.join(process.cwd(), meta.solutionPath);
  if (!fs.existsSync(htmlPath)) return null;
  return fs.readFileSync(htmlPath, "utf-8");
}

/** Load meta + parse HTML on-the-fly. Use when you need title/answers/correctAnswer. */
export function getProblemFull(id: string): ParsedProblem | null {
  const meta = getProblemMeta(id);
  if (!meta) return null;
  const html = getProblemHtml(id);
  if (!html) return null;
  const parsed = parseHtml(html);
  return { ...meta, ...parsed };
}

export function getAllMeta(): ProblemMeta[] {
  if (!_allMeta) {
    _allMeta = Object.values(getIndex().problems);
  }
  return _allMeta;
}

export function getProblemsCount(): number {
  return getIndex().totalProblems;
}

export function getCategories(): Category[] {
  return getIndex().categories;
}

export function getCategoryGroups(): CategoryGroup[] {
  return getIndex().categoryGroups;
}

// --- Query ---

export interface QueryOptions {
  faculty?: string;
  year?: number;
  category?: string;
  categories?: string[];
  diffMin?: number;
  diffMax?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export function queryProblems(opts: QueryOptions): { problems: ProblemMeta[]; total: number } {
  const index = getIndex();
  let ids: string[] | null = null;

  if (opts.faculty && opts.year) {
    const yearKey = `${opts.faculty}-${opts.year}`;
    ids = index.byYear[yearKey] ?? [];
  } else if (opts.faculty) {
    ids = index.byFaculty[opts.faculty] ?? [];
  }

  // Single category filter
  if (opts.category) {
    const catIds = new Set(index.byCategory[opts.category] ?? []);
    if (ids) {
      ids = ids.filter((id) => catIds.has(id));
    } else {
      ids = [...catIds];
    }
  }

  // Multiple categories filter (union)
  if (opts.categories && opts.categories.length > 0) {
    const catIds = new Set<string>();
    for (const cat of opts.categories) {
      for (const id of (index.byCategory[cat] ?? [])) catIds.add(id);
    }
    if (ids) {
      ids = ids.filter((id) => catIds.has(id));
    } else {
      ids = [...catIds];
    }
  }

  let results: ProblemMeta[];
  if (ids !== null) {
    results = ids.map((id) => index.problems[id]).filter(Boolean);
  } else {
    results = getAllMeta();
  }

  if (opts.year && !opts.faculty) {
    results = results.filter((p) => p.year === opts.year);
  }

  // Difficulty range filter
  if (opts.diffMin != null || opts.diffMax != null) {
    const min = opts.diffMin ?? 1;
    const max = opts.diffMax ?? 10;
    results = results.filter((p) => {
      const d = p.difficulty ?? 5;
      return d >= min && d <= max;
    });
  }

  // Search by id or faculty
  if (opts.search) {
    const q = opts.search.toLowerCase();
    results = results.filter((p) => p.id.toLowerCase().includes(q) || p.facultyId.toLowerCase().includes(q));
  }

  // Sort: faculty ASC, year DESC, problemNumber ASC
  results.sort((a, b) => {
    if (a.facultyId !== b.facultyId) return a.facultyId.localeCompare(b.facultyId);
    if (a.year !== b.year) return b.year - a.year;
    return a.problemNumber - b.problemNumber;
  });

  const total = results.length;
  const page = opts.page ?? 1;
  const limit = opts.limit ?? 30;
  const offset = (page - 1) * limit;

  return {
    problems: results.slice(offset, offset + limit),
    total,
  };
}

// --- Category group counts ---

export function getCategoryGroupsWithCounts(solvedIds?: Set<string>): Array<{
  id: string;
  name: string;
  total: number;
  solved: number;
  categories: Array<{ id: string; name: string; total: number; solved: number }>;
}> {
  const index = getIndex();
  return index.categoryGroups.map((group) => {
    let total = 0;
    let solved = 0;
    const categories: Array<{ id: string; name: string; total: number; solved: number }> = [];
    for (const cat of group.categories) {
      const catIds = index.byCategory[cat] ?? [];
      let catSolved = 0;
      if (solvedIds) {
        for (const id of catIds) {
          if (solvedIds.has(id)) catSolved++;
        }
      }
      total += catIds.length;
      solved += catSolved;
      const catMeta = index.categories.find((c: any) => c.id === cat);
      categories.push({
        id: cat,
        name: catMeta?.sr || catMeta?.en || cat,
        total: catIds.length,
        solved: catSolved,
      });
    }
    return { id: group.id, name: group.sr, total, solved, categories };
  });
}
