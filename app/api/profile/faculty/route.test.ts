import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockUser: any = null;

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
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    }),
  },
}));

const { PATCH, GET } = await import("./route");

function makePatchRequest(body: any): Request {
  return new Request("http://localhost/api/profile/faculty", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

// --- Tests ---

describe("PATCH /api/profile/faculty", () => {
  beforeEach(() => {
    mockSession = null;
  });

  it("returns 401 when not authenticated", async () => {
    const res = await PATCH(makePatchRequest({ targetFaculties: ["etf"] }));
    expect(res.status).toBe(401);
  });

  it("returns 400 for empty array", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makePatchRequest({ targetFaculties: [] }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for non-array", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makePatchRequest({ targetFaculties: "etf" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for more than 4 faculties", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makePatchRequest({
      targetFaculties: ["a", "b", "c", "d", "e"],
    }));
    expect(res.status).toBe(400);
  });

  it("accepts 1 faculty", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makePatchRequest({ targetFaculties: ["etf"] }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.targetFaculties).toEqual(["etf"]);
  });

  it("accepts 3 faculties", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makePatchRequest({
      targetFaculties: ["etf", "fon", "rgf"],
    }));
    expect(res.status).toBe(200);
  });
});

describe("GET /api/profile/faculty", () => {
  beforeEach(() => {
    mockSession = null;
    mockUser = null;
  });

  it("returns 401 when not authenticated", async () => {
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns user's target faculties", async () => {
    mockSession = { user: { id: "u1" } };
    mockUser = { targetFaculties: ["etf", "fon"] };
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.targetFaculties).toEqual(["etf", "fon"]);
  });

  it("returns empty array when user has no faculties set", async () => {
    mockSession = { user: { id: "u1" } };
    mockUser = { targetFaculties: null };
    const res = await GET();
    const body = await res.json();
    expect(body.targetFaculties).toEqual([]);
  });
});
