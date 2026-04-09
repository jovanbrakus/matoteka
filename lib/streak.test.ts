import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// --- Mocks ---

let mockUser: any = null;
const mockWhere = vi.fn().mockResolvedValue(undefined);
const mockUpdateSet = vi.fn().mockReturnValue({ where: mockWhere });
const mockUpdate = vi.fn().mockReturnValue({ set: mockUpdateSet });

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockImplementation(() =>
            Promise.resolve(mockUser ? [mockUser] : [])
          ),
        }),
      }),
    }),
    update: mockUpdate,
  },
}));

const { updateStreakOnCorrectSolve } = await import("./streak");

// --- Tests ---

describe("updateStreakOnCorrectSolve", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-15T14:00:00Z")); // Sunday
    mockUser = null;
    mockUpdate.mockClear();
    mockUpdateSet.mockClear();
    mockWhere.mockClear();
    mockUpdateSet.mockReturnValue({ where: mockWhere });
    mockUpdate.mockReturnValue({ set: mockUpdateSet });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does nothing if user not found", async () => {
    mockUser = null;
    await updateStreakOnCorrectSolve("nonexistent");
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("does nothing if user already active today", async () => {
    mockUser = {
      lastActiveDate: "2026-03-15",
      streakCurrent: 5,
      streakBest: 10,
    };
    await updateStreakOnCorrectSolve("user-1");
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("extends streak on consecutive day", async () => {
    mockUser = {
      lastActiveDate: "2026-03-14", // yesterday
      streakCurrent: 3,
      streakBest: 5,
    };
    await updateStreakOnCorrectSolve("user-1");
    expect(mockUpdateSet).toHaveBeenCalledWith({
      streakCurrent: 4,
      streakBest: 5, // best unchanged (4 < 5)
      lastActiveDate: "2026-03-15",
    });
  });

  it("updates best streak when current exceeds it", async () => {
    mockUser = {
      lastActiveDate: "2026-03-14",
      streakCurrent: 5,
      streakBest: 5,
    };
    await updateStreakOnCorrectSolve("user-1");
    expect(mockUpdateSet).toHaveBeenCalledWith({
      streakCurrent: 6,
      streakBest: 6, // new best
      lastActiveDate: "2026-03-15",
    });
  });

  it("resets streak to 1 after missed day", async () => {
    mockUser = {
      lastActiveDate: "2026-03-13", // 2 days ago
      streakCurrent: 10,
      streakBest: 15,
    };
    await updateStreakOnCorrectSolve("user-1");
    expect(mockUpdateSet).toHaveBeenCalledWith({
      streakCurrent: 1,
      streakBest: 15,
      lastActiveDate: "2026-03-15",
    });
  });

  it("starts streak at 1 for first-time user (null lastActiveDate)", async () => {
    mockUser = {
      lastActiveDate: null,
      streakCurrent: 0,
      streakBest: 0,
    };
    await updateStreakOnCorrectSolve("user-1");
    expect(mockUpdateSet).toHaveBeenCalledWith({
      streakCurrent: 1,
      streakBest: 1,
      lastActiveDate: "2026-03-15",
    });
  });

  it("resets streak after long absence", async () => {
    mockUser = {
      lastActiveDate: "2026-01-01", // months ago
      streakCurrent: 50,
      streakBest: 50,
    };
    await updateStreakOnCorrectSolve("user-1");
    expect(mockUpdateSet).toHaveBeenCalledWith({
      streakCurrent: 1,
      streakBest: 50,
      lastActiveDate: "2026-03-15",
    });
  });

  it("works with a custom transaction object", async () => {
    mockUser = {
      lastActiveDate: "2026-03-14",
      streakCurrent: 2,
      streakBest: 2,
    };
    const txSetFn = vi.fn().mockReturnValue({
      where: vi.fn().mockResolvedValue(undefined),
    });
    const txUpdate = vi.fn().mockReturnValue({ set: txSetFn });
    const tx = {
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([mockUser]),
          }),
        }),
      }),
      update: txUpdate,
    };
    await updateStreakOnCorrectSolve("user-1", tx as any);
    // Should use the tx, not the global db
    expect(txUpdate).toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(txSetFn).toHaveBeenCalledWith({
      streakCurrent: 3,
      streakBest: 3,
      lastActiveDate: "2026-03-15",
    });
  });
});
