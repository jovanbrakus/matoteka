import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

vi.mock("@/lib/db", () => ({
  db: {
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    }),
  },
}));

const { PATCH } = await import("./route");

function makeRequest(body: any): Request {
  return new Request("http://localhost/api/profile/daily-goal", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

// --- Tests ---

describe("PATCH /api/profile/daily-goal", () => {
  beforeEach(() => {
    mockSession = null;
  });

  it("returns 401 when not authenticated", async () => {
    const res = await PATCH(makeRequest({ dailyGoal: 5 }));
    expect(res.status).toBe(401);
  });

  it("returns 400 for non-number dailyGoal", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ dailyGoal: "five" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for dailyGoal < 1", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ dailyGoal: 0 }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for dailyGoal > 50", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ dailyGoal: 51 }));
    expect(res.status).toBe(400);
  });

  it("accepts dailyGoal = 1 (lower boundary)", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ dailyGoal: 1 }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.dailyGoal).toBe(1);
  });

  it("accepts dailyGoal = 50 (upper boundary)", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ dailyGoal: 50 }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.dailyGoal).toBe(50);
  });

  it("accepts typical value in range", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ dailyGoal: 10 }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});
