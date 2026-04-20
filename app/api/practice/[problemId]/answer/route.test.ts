import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockProblem: any = null;
vi.mock("@/lib/problems", () => ({
  getProblemFull: vi.fn(() => mockProblem),
}));

let mockExistingProgress: any[] = [];
const mockInsert = vi.fn();
const mockOnConflictDoUpdate = vi.fn();
const mockTransaction = vi.fn();

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockImplementation(() =>
            Promise.resolve(mockExistingProgress)
          ),
        }),
      }),
    }),
  },
  withTransaction: vi.fn().mockImplementation((fn: any) => {
    const tx = {
      insert: vi.fn().mockReturnValue({
        values: vi.fn().mockReturnValue({
          onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
        }),
      }),
    };
    mockTransaction.mockImplementation(() => tx);
    return fn(tx);
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

function makeRequest(body: any): Request {
  return new Request("http://localhost/api/practice/etf-2024-1/answer", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const params = Promise.resolve({ problemId: "etf-2024-1" });

// --- Tests ---

describe("POST /api/practice/[problemId]/answer", () => {
  beforeEach(() => {
    mockSession = null;
    mockProblem = {
      id: "etf-2024-1",
      correctAnswer: "B",
      title: "Test Problem",
    };
    mockExistingProgress = [];
    vi.clearAllMocks();
  });

  describe("auth & validation", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await POST(makeRequest({ answer: "A" }), { params });
      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body.error).toBe("Unauthorized");
    });

    it("returns 400 when answer is missing", async () => {
      mockSession = { user: { id: "user-1" } };
      const res = await POST(makeRequest({}), { params });
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("Answer is required");
    });

    it("returns 404 when problem does not exist", async () => {
      mockSession = { user: { id: "user-1" } };
      mockProblem = null;
      const res = await POST(makeRequest({ answer: "A" }), { params });
      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toBe("Problem not found");
    });
  });

  describe("correct answer", () => {
    it("returns isCorrect true and status solved", async () => {
      mockSession = { user: { id: "user-1" } };
      const res = await POST(makeRequest({ answer: "B" }), { params });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isCorrect).toBe(true);
      expect(body.correctAnswer).toBe("B");
      expect(body.status).toBe("solved");
    });

    it("calls updateStreakOnCorrectSolve for correct answers", async () => {
      mockSession = { user: { id: "user-1" } };
      await POST(makeRequest({ answer: "B" }), { params });
      expect(mockUpdateStreak).toHaveBeenCalledWith("user-1", expect.anything());
    });

    it("fires analytics recalculation", async () => {
      mockSession = { user: { id: "user-1" } };
      await POST(makeRequest({ answer: "B" }), { params });
      expect(mockRecalculate).toHaveBeenCalledWith("user-1");
    });
  });

  describe("incorrect answer", () => {
    it("returns isCorrect false and status attempted", async () => {
      mockSession = { user: { id: "user-1" } };
      const res = await POST(makeRequest({ answer: "A" }), { params });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isCorrect).toBe(false);
      expect(body.correctAnswer).toBe("B");
      expect(body.status).toBe("attempted");
    });

    it("does not update streak for incorrect answers", async () => {
      mockSession = { user: { id: "user-1" } };
      await POST(makeRequest({ answer: "A" }), { params });
      expect(mockUpdateStreak).not.toHaveBeenCalled();
    });
  });

  describe("duplicate detection", () => {
    it("same answer re-submission returns existing status without DB write", async () => {
      mockSession = { user: { id: "user-1" } };
      mockExistingProgress = [{ status: "attempted", lastAnswer: "A" }];
      const res = await POST(makeRequest({ answer: "A" }), { params });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isCorrect).toBe(false);
      expect(body.status).toBe("attempted");
      // Should not have called transaction (no DB write)
      const { withTransaction } = await import("@/lib/db");
      expect(withTransaction).not.toHaveBeenCalled();
    });

    it("already solved problem returns solved status regardless of new answer", async () => {
      mockSession = { user: { id: "user-1" } };
      mockExistingProgress = [{ status: "solved", lastAnswer: "B" }];
      // User submits a different (wrong) answer
      const res = await POST(makeRequest({ answer: "C" }), { params });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isCorrect).toBe(true);
      expect(body.status).toBe("solved");
      // Should not have called transaction (no downgrade)
      const { withTransaction } = await import("@/lib/db");
      expect(withTransaction).not.toHaveBeenCalled();
    });

    it("attempted problem with different answer proceeds normally", async () => {
      mockSession = { user: { id: "user-1" } };
      mockExistingProgress = [{ status: "attempted", lastAnswer: "A" }];
      // Submit correct answer this time
      const res = await POST(makeRequest({ answer: "B" }), { params });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isCorrect).toBe(true);
      expect(body.status).toBe("solved");
      const { withTransaction } = await import("@/lib/db");
      expect(withTransaction).toHaveBeenCalled();
    });
  });
});
