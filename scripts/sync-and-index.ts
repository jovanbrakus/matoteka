import fs from "fs";
import path from "path";

const FACULTY_MAP: Record<string, string> = {
  elektrotehnicki_fakultet: "etf",
  fakultet_organizacionih_nauka: "fon",
  rudarsko_geoloski_fakultet: "rgf",
  matematicki_fakultet: "matf",
  masinski_fakultet: "masf",
  gradevinski_fakultet: "grf",
  tehnolosko_metalurski_fakultet: "tmf",
  saobracajni_fakultet: "sf",
  fizicki_fakultet: "ff",
};

interface ProblemRaw {
  id: string;
  document: string;
  order: number;
  solution_path: string;
  category: string | null;
  difficulty: number | null;
}

interface DocumentMeta {
  filename: string;
  university: string;
  faculty: string;
  year: number | null;
  extra: string | null;
}

function main() {
  const rootDir = path.resolve(__dirname, "..");
  const dbDir = path.join(rootDir, "database");
  const dbV1Dir = path.join(dbDir, "v1");
  const dbV2Dir = path.join(dbDir, "v2");

  const v1Problems: ProblemRaw[] = JSON.parse(
    fs.readFileSync(path.join(dbV1Dir, "problems.json"), "utf-8")
  );
  const documents: DocumentMeta[] = JSON.parse(
    fs.readFileSync(path.join(dbV1Dir, "documents.json"), "utf-8")
  );
  const categories = JSON.parse(
    fs.readFileSync(path.join(dbV1Dir, "categories.json"), "utf-8")
  );
  const categoryGroups = JSON.parse(
    fs.readFileSync(path.join(dbV1Dir, "category_groups.json"), "utf-8")
  );

  // Load v2 problems if available
  const v2Path = path.join(dbV2Dir, "problems.json");
  const v2Problems: ProblemRaw[] = fs.existsSync(v2Path)
    ? JSON.parse(fs.readFileSync(v2Path, "utf-8"))
    : [];

  // Build v2 lookup by document+order for preference matching
  const v2Lookup = new Map<string, ProblemRaw>();
  for (const p of v2Problems) {
    v2Lookup.set(`${p.document}:${p.order}`, p);
  }

  const docLookup = new Map<string, DocumentMeta>();
  for (const doc of documents) {
    docLookup.set(doc.filename, doc);
  }

  const problemsMap: Record<string, any> = {};
  const byFaculty: Record<string, string[]> = {};
  const byCategory: Record<string, string[]> = {};
  const byYear: Record<string, string[]> = {};

  let processed = 0;
  let errors = 0;
  let skipped = 0;
  let v2Count = 0;

  for (const meta of v1Problems) {
    const doc = docLookup.get(meta.document);
    if (!doc) {
      console.error(`  Missing document: ${meta.document}`);
      errors++;
      continue;
    }

    const facultyId = FACULTY_MAP[doc.faculty];
    if (!facultyId) {
      console.error(`  Unknown faculty: ${doc.faculty}`);
      errors++;
      continue;
    }

    let year = doc.year;
    if (!year && meta.document.includes("zbirka_zadataka")) {
      year = 2026;
    }
    if (!year) {
      skipped++;
      continue;
    }

    // Prefer v2 if available
    const v2Key = `${meta.document}:${meta.order}`;
    const v2Entry = v2Lookup.get(v2Key);
    const useV2 = !!v2Entry;

    // Remap source paths to local structure: problems/ → problems/v1/, problems_v2/ → problems/v2/
    const rawPath = useV2 ? v2Entry!.solution_path : meta.solution_path;
    const solutionPath = rawPath.replace(/^problems_v2\//, "problems/v2/").replace(/^problems\/(?!v[12]\/)/, "problems/v1/");
    const category = useV2 ? (v2Entry!.category ?? meta.category) : meta.category;
    const difficulty = useV2 ? (v2Entry!.difficulty ?? meta.difficulty) : meta.difficulty;

    // Verify HTML file exists
    const htmlPath = path.join(rootDir, solutionPath);
    if (!fs.existsSync(htmlPath)) {
      console.error(`  Missing HTML: ${solutionPath}`);
      errors++;
      continue;
    }

    if (useV2) v2Count++;

    problemsMap[meta.id] = {
      id: meta.id,
      facultyId,
      year,
      problemNumber: meta.order,
      extra: doc.extra || null,
      category,
      difficulty,
      solutionPath,
      format: useV2 ? "v2" : "v1",
    };

    if (!byFaculty[facultyId]) byFaculty[facultyId] = [];
    byFaculty[facultyId].push(meta.id);

    if (category) {
      if (!byCategory[category]) byCategory[category] = [];
      byCategory[category].push(meta.id);
    }

    const yearKey = `${facultyId}-${doc.year}`;
    if (!byYear[yearKey]) byYear[yearKey] = [];
    byYear[yearKey].push(meta.id);

    processed++;
    if (processed % 500 === 0) console.log(`  Processed ${processed} problems...`);
  }

  for (const arr of Object.values(byFaculty)) arr.sort();
  for (const arr of Object.values(byCategory)) arr.sort();
  for (const arr of Object.values(byYear)) arr.sort();

  const index = {
    generatedAt: new Date().toISOString(),
    totalProblems: processed,
    v2Problems: v2Count,
    problems: problemsMap,
    byFaculty,
    byCategory,
    byYear,
    categories,
    categoryGroups,
  };

  const outputPath = path.join(dbDir, "problems-index.json");
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

  const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`\nDone!`);
  console.log(`  Processed: ${processed} (${v2Count} v2, ${processed - v2Count} v1)`);
  console.log(`  Skipped: ${skipped} (no year)`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Index size: ${fileSizeKB} KB`);
  console.log(`  Output: ${outputPath}`);

  console.log(`\nFaculty distribution:`);
  for (const [fac, ids] of Object.entries(byFaculty).sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${fac}: ${ids.length}`);
  }
}

main();
