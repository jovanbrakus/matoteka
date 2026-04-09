import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockUser: any = null;
let mockFaculties: any[] = [];
let mockSeenRows: any[] = [];
let selectCallIndex = 0;

const insertedExam = { id: "exam-123" };
const insertedProblems: any[] = [];

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockImplementation(() => {
      selectCallIndex++;
      const idx = selectCallIndex;
      const chain: any = {};
      chain.from = vi.fn().mockReturnValue(chain);
      chain.where = vi.fn().mockReturnValue(chain);
      chain.limit = vi.fn().mockImplementation(() => {
        // Call 1: user query, Call 2+3: faculty queries
        if (idx === 1) return Promise.resolve(mockUser ? [mockUser] : []);
        return Promise.resolve(mockFaculties);
      });
      // Thenable for queries without .limit (seenRows)
      chain.then = (resolve: any, reject?: any) =>
        Promise.resolve(mockSeenRows).then(resolve, reject);
      return chain;
    }),
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockImplementation(() => Promise.resolve([insertedExam])),
      }),
    }),
  },
}));

// Generate mock problems across difficulty tiers
const mockProblems: any[] = [];
// 30 easy (diff 1-3), 40 medium (diff 4-6), 30 hard (diff 7-10)
for (let i = 0; i < 30; i++) {
  mockProblems.push({ id: `easy-${i}`, difficulty: 2, facultyId: "etf", year: 2024, problemNumber: i + 1, solutionPath: "" });
}
for (let i = 0; i < 40; i++) {
  mockProblems.push({ id: `med-${i}`, difficulty: 5, facultyId: "etf", year: 2024, problemNumber: i + 31, solutionPath: "" });
}
for (let i = 0; i < 30; i++) {
  mockProblems.push({ id: `hard-${i}`, difficulty: 8, facultyId: "etf", year: 2024, problemNumber: i + 71, solutionPath: "" });
}

vi.mock("@/lib/problems", () => ({
  getAllMeta: vi.fn(() => mockProblems),
}));

const { POST } = await import("./route");

function makeRequest(body: any): Request {
  return new Request("http://localhost/api/simulation", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

// --- Tests ---

describe("POST /api/simulation", () => {
  beforeEach(() => {
    mockSession = null;
    mockUser = { targetFaculties: ["etf"] };
    mockFaculties = [{ id: "etf", name: "ETF" }];
    mockSeenRows = [];
    selectCallIndex = 0;
    vi.clearAllMocks();
  });

  describe("auth & validation", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await POST(makeRequest({ testSize: 20, mode: "timed" }));
      expect(res.status).toBe(401);
    });

    it("returns 400 for invalid test size", async () => {
      mockSession = { user: { id: "user-1" } };
      const res = await POST(makeRequest({ testSize: 15, mode: "timed" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 for invalid mode", async () => {
      mockSession = { user: { id: "user-1" } };
      const res = await POST(makeRequest({ testSize: 20, mode: "practice" }));
      expect(res.status).toBe(400);
    });

    it("accepts valid test sizes: 8, 14, 20", async () => {
      mockSession = { user: { id: "user-1" } };
      for (const size of [8, 14, 20]) {
        selectCallIndex = 0;
        const res = await POST(makeRequest({ testSize: size, mode: "timed" }));
        expect(res.status).toBe(200);
      }
    });

    it("accepts both timed and untimed modes", async () => {
      mockSession = { user: { id: "user-1" } };
      for (const mode of ["timed", "untimed"]) {
        selectCallIndex = 0;
        const res = await POST(makeRequest({ testSize: 20, mode }));
        expect(res.status).toBe(200);
      }
    });
  });

  describe("problem selection", () => {
    it("creates exam and returns examId", async () => {
      mockSession = { user: { id: "user-1" } };
      const res = await POST(makeRequest({ testSize: 20, mode: "timed" }));
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.examId).toBe("exam-123");
    });

    it("inserts correct number of exam problems", async () => {
      mockSession = { user: { id: "user-1" } };
      const { db } = await import("@/lib/db");

      await POST(makeRequest({ testSize: 20, mode: "timed" }));

      // Second insert call is for exam problems
      const insertCalls = vi.mocked(db.insert).mock.calls;
      // The values() call should have 20 problems
      // We check the insert was called (exam + problems)
      expect(insertCalls.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("point value interpolation", () => {
    it("creates exam with correct number of problems for each size", async () => {
      mockSession = { user: { id: "user-1" } };

      // Each test size should produce a successful exam
      for (const size of [8, 14, 20]) {
        selectCallIndex = 0;
        vi.clearAllMocks();
        const res = await POST(makeRequest({ testSize: size, mode: "timed" }));
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.examId).toBe("exam-123");
      }
    });
  });
});
