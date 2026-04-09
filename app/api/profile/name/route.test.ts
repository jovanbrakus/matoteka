import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockExistingUsers: any[] = [];
const mockUpdateSet = vi.fn().mockReturnValue({
  where: vi.fn().mockResolvedValue(undefined),
});

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockImplementation(() =>
            Promise.resolve(mockExistingUsers)
          ),
        }),
      }),
    }),
    update: vi.fn().mockReturnValue({ set: mockUpdateSet }),
  },
}));

const { PATCH } = await import("./route");

function makeRequest(body: any): Request {
  return new Request("http://localhost/api/profile/name", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

// --- Tests ---

describe("PATCH /api/profile/name", () => {
  beforeEach(() => {
    mockSession = null;
    mockExistingUsers = [];
  });

  it("returns 401 when not authenticated", async () => {
    const res = await PATCH(makeRequest({ displayName: "Test" }));
    expect(res.status).toBe(401);
  });

  it("returns 400 when displayName is missing", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 when displayName is too short (< 3)", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ displayName: "AB" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("3");
  });

  it("returns 400 when displayName is too long (> 20)", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ displayName: "A".repeat(21) }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for special characters in name", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ displayName: "test@name!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("slova");
  });

  it("allows alphanumeric, spaces, and underscores", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ displayName: "Test_User 1" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.displayName).toBe("Test_User 1");
  });

  it("returns 409 when name is taken by another user", async () => {
    mockSession = { user: { id: "u1" } };
    mockExistingUsers = [{ id: "u2", displayName: "TakenName" }];
    const res = await PATCH(makeRequest({ displayName: "TakenName" }));
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.error).toContain("zauzeto");
  });

  it("allows updating to own current name", async () => {
    mockSession = { user: { id: "u1" } };
    mockExistingUsers = [{ id: "u1", displayName: "MyName" }];
    const res = await PATCH(makeRequest({ displayName: "MyName" }));
    expect(res.status).toBe(200);
  });

  it("accepts exactly 3-char name (boundary)", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ displayName: "ABC" }));
    expect(res.status).toBe(200);
  });

  it("accepts exactly 20-char name (boundary)", async () => {
    mockSession = { user: { id: "u1" } };
    const res = await PATCH(makeRequest({ displayName: "A".repeat(20) }));
    expect(res.status).toBe(200);
  });
});
