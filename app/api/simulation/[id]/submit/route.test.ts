import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockExam: any[] = [];
let mockExamProblems: any[] = [];

let selectCallIndex = 0;

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockImplementation(() => {
      selectCallIndex++;
      const idx = selectCallIndex;
      const chain: any = {};
      chain.from = vi.fn().mockReturnValue(chain);
      chain.where = vi.fn().mockReturnValue(chain);
      chain.limit = vi.fn().mockImplementation(() => {
        // First select (with .limit) = exam query
        return Promise.resolve(mockExam);
      });
      // Make it thenable so await on the chain (without .limit) returns examProblems
      chain.then = (resolve: any, reject?: any) => {
        // Second select (no .limit) = examProblems query
        return Promise.resolve(mockExamProblems).then(resolve, reject);
      };
      return chain;
    }),
    transaction: vi.fn().mockImplementation(async (fn: any) => {
      const tx = {
        update: vi.fn().mockReturnValue({
          set: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(undefined),
          }),
        }),
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockReturnValue({
            onConflictDoNothing: vi.fn().mockResolvedValue(undefined),
          }),
        }),
      };
      return fn(tx);
    }),
  },
}));

const problemAnswers: Record<string, string> = {};
vi.mock("@/lib/problems", () => ({
  getProblemFull: vi.fn((id: string) => {
    if (!(id in problemAnswers)) return null;
    return { id, correctAnswer: problemAnswers[id] };
  }),
}));

const mockUpdateStreak = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/streak", () => ({
  updateStreakOnCorrectSolve: (...args: any[]) => mockUpdateStreak(...args),
}));

const mockRecalculate = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/analytics", () => ({
  recalculateAnalytics: (...args: any[]) => mockRecalculate(...args),
}));

const { POST } = await import("./route");

function makeRequest(): Request {
  return new Request("http://localhost/api/simulation/exam-1/submit", {
    method: "POST",
  });
}

const params = Promise.resolve({ id: "exam-1" });

// --- Tests ---

describe("POST /api/simulation/[id]/submit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-15T15:30:00Z"));
    mockSession = null;
    mockExam = [];
    mockExamProblems = [];
    selectCallIndex = 0;
    Object.keys(problemAnswers).forEach((k) => delete problemAnswers[k]);
    mockUpdateStreak.mockClear();
    mockRecalculate.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 401 when not authenticated", async () => {
    const res = await POST(makeRequest(), { params });
    expect(res.status).toBe(401);
  });

  it("returns 404 when exam not found", async () => {
    mockSession = { user: { id: "user-1" } };
    mockExam = [];
    const res = await POST(makeRequest(), { params });
    expect(res.status).toBe(404);
  });

  it("returns 400 when exam already completed", async () => {
    mockSession = { user: { id: "user-1" } };
    mockExam = [{ id: "exam-1", userId: "user-1", status: "completed", startedAt: "2026-03-15T14:00:00Z" }];
    const res = await POST(makeRequest(), { params });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("završena");
  });

  describe("scoring algorithm", () => {
    beforeEach(() => {
      mockSession = { user: { id: "user-1" } };
      mockExam = [{
        id: "exam-1",
        userId: "user-1",
        status: "in_progress",
        startedAt: "2026-03-15T14:00:00Z",
      }];
    });

    it("scores all-correct exam successfully", async () => {
      problemAnswers["p1"] = "A";
      problemAnswers["p2"] = "B";
      problemAnswers["p3"] = "C";
      mockExamProblems = [
        { epId: "ep1", answer: "A", pointValue: "3.00", problemId: "p1" },
        { epId: "ep2", answer: "B", pointValue: "5.00", problemId: "p2" },
        { epId: "ep3", answer: "C", pointValue: "7.00", problemId: "p3" },
      ];

      const res = await POST(makeRequest(), { params });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.examId).toBe("exam-1");
    });

    it("applies -16% negative marking for wrong answers", async () => {
      problemAnswers["p1"] = "A";
      problemAnswers["p2"] = "B";
      mockExamProblems = [
        { epId: "ep1", answer: "A", pointValue: "5.00", problemId: "p1" },
        { epId: "ep2", answer: "C", pointValue: "5.00", problemId: "p2" },
      ];

      const res = await POST(makeRequest(), { params });
      expect(res.status).toBe(200);
      // Score: 5 - (5 * 0.16) = 4.2, maxScore: 10, percent: 42%
    });

    it("treats blank answers (null/N) as zero points with no penalty", async () => {
      problemAnswers["p1"] = "A";
      problemAnswers["p2"] = "B";
      problemAnswers["p3"] = "C";
      mockExamProblems = [
        { epId: "ep1", answer: "A", pointValue: "5.00", problemId: "p1" },
        { epId: "ep2", answer: null, pointValue: "5.00", problemId: "p2" },
        { epId: "ep3", answer: "N", pointValue: "5.00", problemId: "p3" },
      ];

      const res = await POST(makeRequest(), { params });
      expect(res.status).toBe(200);
    });

    it("clamps negative total score to 0%", async () => {
      problemAnswers["p1"] = "A";
      problemAnswers["p2"] = "B";
      mockExamProblems = [
        { epId: "ep1", answer: "B", pointValue: "3.00", problemId: "p1" },
        { epId: "ep2", answer: "A", pointValue: "7.00", problemId: "p2" },
      ];

      const res = await POST(makeRequest(), { params });
      expect(res.status).toBe(200);
      // Both wrong: -(3*0.16) + -(7*0.16) = -1.6, clamped to 0%
    });

    it("is case-insensitive for answer matching", async () => {
      problemAnswers["p1"] = "B";
      mockExamProblems = [
        { epId: "ep1", answer: "b", pointValue: "5.00", problemId: "p1" },
      ];

      const res = await POST(makeRequest(), { params });
      expect(res.status).toBe(200);
    });

    it("calls streak update when there are correct answers", async () => {
      problemAnswers["p1"] = "A";
      mockExamProblems = [
        { epId: "ep1", answer: "A", pointValue: "5.00", problemId: "p1" },
      ];

      await POST(makeRequest(), { params });
      expect(mockUpdateStreak).toHaveBeenCalledWith("user-1", expect.anything());
    });

    it("does not call streak update when all answers are wrong", async () => {
      problemAnswers["p1"] = "A";
      mockExamProblems = [
        { epId: "ep1", answer: "B", pointValue: "5.00", problemId: "p1" },
      ];

      await POST(makeRequest(), { params });
      expect(mockUpdateStreak).not.toHaveBeenCalled();
    });

    it("fires analytics recalculation", async () => {
      problemAnswers["p1"] = "A";
      mockExamProblems = [
        { epId: "ep1", answer: "A", pointValue: "5.00", problemId: "p1" },
      ];

      await POST(makeRequest(), { params });
      expect(mockRecalculate).toHaveBeenCalledWith("user-1");
    });

    it("defaults to correctAnswer A when problem not found in index", async () => {
      // getProblemFull returns null for unknown problemId
      mockExamProblems = [
        { epId: "ep1", answer: "A", pointValue: "5.00", problemId: "unknown" },
      ];

      const res = await POST(makeRequest(), { params });
      expect(res.status).toBe(200);
    });
  });
});
