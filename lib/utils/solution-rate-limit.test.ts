import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// --- Mocks ---

let mockSelectResult: any[] = [];
const mockOnConflictDoUpdate = vi.fn().mockResolvedValue(undefined);
const mockInsertValues = vi.fn().mockReturnValue({
  onConflictDoUpdate: mockOnConflictDoUpdate,
});
const mockInsert = vi.fn().mockReturnValue({
  values: mockInsertValues,
});

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockImplementation(() => {
      const chain: any = {};
      chain.from = vi.fn().mockReturnValue(chain);
      chain.where = vi.fn().mockReturnValue(chain);
      chain.orderBy = vi.fn().mockReturnValue(chain);
      chain.limit = vi.fn().mockImplementation(() =>
        Promise.resolve(mockSelectResult)
      );
      return chain;
    }),
    insert: mockInsert,
  },
}));

const { checkSolutionRateLimit, recordSolutionView } = await import("./solution-rate-limit");

// --- Tests ---

describe("checkSolutionRateLimit", () => {
  beforeEach(() => {
    mockSelectResult = [];
  });

  it("allows when no usage exists today", async () => {
    const result = await checkSolutionRateLimit("user-1");
    expect(result.allowed).toBe(true);
    expect(result.used).toBe(0);
    expect(result.limit).toBe(30);
  });

  it("allows when usage is below limit", async () => {
    mockSelectResult = [{ count: 15 }];
    const result = await checkSolutionRateLimit("user-1");
    expect(result.allowed).toBe(true);
    expect(result.used).toBe(15);
  });

  it("denies when usage equals limit", async () => {
    mockSelectResult = [{ count: 30 }];
    const result = await checkSolutionRateLimit("user-1");
    expect(result.allowed).toBe(false);
    expect(result.used).toBe(30);
  });

  it("denies when usage exceeds limit", async () => {
    mockSelectResult = [{ count: 50 }];
    const result = await checkSolutionRateLimit("user-1");
    expect(result.allowed).toBe(false);
    expect(result.used).toBe(50);
  });

  it("allows at limit - 1", async () => {
    mockSelectResult = [{ count: 29 }];
    const result = await checkSolutionRateLimit("user-1");
    expect(result.allowed).toBe(true);
    expect(result.used).toBe(29);
  });
});

describe("recordSolutionView", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-15T14:00:00Z"));
    mockSelectResult = [];
    mockInsert.mockClear();
    mockInsertValues.mockClear();
    mockOnConflictDoUpdate.mockClear();
    // Re-wire the chain after clear
    mockInsertValues.mockReturnValue({
      onConflictDoUpdate: mockOnConflictDoUpdate,
    });
    mockInsert.mockReturnValue({
      values: mockInsertValues,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("inserts audit row and increments daily counter for first view today", async () => {
    // No prior views today
    mockSelectResult = [];
    const result = await recordSolutionView("user-1", "p1", "1.2.3.4", "Mozilla");
    expect(result.isNewToday).toBe(true);
    // Should call insert twice: audit row + daily counter upsert
    expect(mockInsert).toHaveBeenCalledTimes(2);
  });

  it("skips audit row for duplicate within 60-second window", async () => {
    // Last view was 30 seconds ago (within dedup window, still today)
    const thirtySecsAgo = new Date(Date.now() - 30_000);
    mockSelectResult = [{ viewedAt: thirtySecsAgo }];
    const result = await recordSolutionView("user-1", "p1", "1.2.3.4", "Mozilla");
    expect(result.isNewToday).toBe(false);
    // Should skip audit insert (recent duplicate) AND daily counter (not new today)
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("inserts audit row but skips daily counter for revisit after 60s", async () => {
    // Last view was 2 minutes ago (outside dedup window, but still today)
    const twoMinsAgo = new Date(Date.now() - 120_000);
    mockSelectResult = [{ viewedAt: twoMinsAgo }];
    const result = await recordSolutionView("user-1", "p1", "1.2.3.4", "Mozilla");
    expect(result.isNewToday).toBe(false);
    // Should insert audit row (outside dedup window) but NOT daily counter (not new today)
    expect(mockInsert).toHaveBeenCalledTimes(1);
  });
});
