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

interface ProblemMeta {
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

  const problemsMeta: ProblemMeta[] = JSON.parse(
    fs.readFileSync(path.join(dbDir, "problems.json"), "utf-8")
  );
  const documents: DocumentMeta[] = JSON.parse(
    fs.readFileSync(path.join(dbDir, "documents.json"), "utf-8")
  );
  const categories = JSON.parse(
    fs.readFileSync(path.join(dbDir, "categories.json"), "utf-8")
  );
  const categoryGroups = JSON.parse(
    fs.readFileSync(path.join(dbDir, "category_groups.json"), "utf-8")
  );

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

  for (const meta of problemsMeta) {
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

    // Verify HTML file exists
    const htmlPath = path.join(rootDir, meta.solution_path);
    if (!fs.existsSync(htmlPath)) {
      console.error(`  Missing HTML: ${meta.solution_path}`);
      errors++;
      continue;
    }

    problemsMap[meta.id] = {
      id: meta.id,
      facultyId,
      year,
      problemNumber: meta.order,
      extra: doc.extra || null,
      category: meta.category,
      difficulty: meta.difficulty,
      solutionPath: meta.solution_path,
    };

    if (!byFaculty[facultyId]) byFaculty[facultyId] = [];
    byFaculty[facultyId].push(meta.id);

    if (meta.category) {
      if (!byCategory[meta.category]) byCategory[meta.category] = [];
      byCategory[meta.category].push(meta.id);
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
  console.log(`  Processed: ${processed}`);
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
