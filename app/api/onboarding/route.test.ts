import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockExistingUsers: any[] = [];
let capturedUpdates: any = null;

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
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockImplementation((updates: any) => {
        capturedUpdates = updates;
        return {
          where: vi.fn().mockResolvedValue(undefined),
        };
      }),
    }),
  },
}));

const { POST } = await import("./route");

function makeRequest(body: any): Request {
  return new Request("http://localhost/api/onboarding", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

// --- Tests ---

describe("POST /api/onboarding", () => {
  beforeEach(() => {
    mockSession = null;
    mockExistingUsers = [];
    capturedUpdates = null;
  });

  it("returns 401 when not authenticated", async () => {
    const res = await POST(makeRequest({ displayName: "Test", targetFaculties: ["etf"] }));
    expect(res.status).toBe(401);
  });

  describe("displayName validation (when provided)", () => {
    beforeEach(() => {
      mockSession = { user: { id: "u1" } };
    });

    it("returns 400 for too-short displayName", async () => {
      const res = await POST(makeRequest({ displayName: "AB", targetFaculties: ["etf"] }));
      expect(res.status).toBe(400);
    });

    it("returns 400 for too-long displayName", async () => {
      const res = await POST(makeRequest({
        displayName: "A".repeat(21),
        targetFaculties: ["etf"],
      }));
      expect(res.status).toBe(400);
    });

    it("returns 400 for special characters (no spaces allowed in onboarding)", async () => {
      const res = await POST(makeRequest({
        displayName: "test user",
        targetFaculties: ["etf"],
      }));
      expect(res.status).toBe(400);
    });

    it("returns 409 when displayName is taken", async () => {
      mockExistingUsers = [{ id: "u2", displayName: "Taken" }];
      const res = await POST(makeRequest({
        displayName: "Taken",
        targetFaculties: ["etf"],
      }));
      expect(res.status).toBe(409);
    });
  });

  describe("targetFaculties validation (when provided)", () => {
    beforeEach(() => {
      mockSession = { user: { id: "u1" } };
    });

    it("returns 400 for empty array", async () => {
      const res = await POST(makeRequest({ targetFaculties: [] }));
      expect(res.status).toBe(400);
    });

    it("returns 400 for too many faculties", async () => {
      const res = await POST(makeRequest({
        targetFaculties: ["a", "b", "c", "d"],
      }));
      expect(res.status).toBe(400);
    });
  });

  describe("successful onboarding", () => {
    it("returns ok and sets onboardedAt for full input", async () => {
      mockSession = { user: { id: "u1" } };
      const res = await POST(makeRequest({
        displayName: "ValidUser",
        targetFaculties: ["etf", "fon"],
      }));
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(capturedUpdates.onboardedAt).toBeInstanceOf(Date);
      expect(capturedUpdates.displayName).toBe("ValidUser");
      expect(capturedUpdates.targetFaculties).toEqual(["etf", "fon"]);
    });

    it("allows own name during re-onboarding", async () => {
      mockSession = { user: { id: "u1" } };
      mockExistingUsers = [{ id: "u1", displayName: "MyName" }];
      const res = await POST(makeRequest({
        displayName: "MyName",
        targetFaculties: ["etf"],
      }));
      expect(res.status).toBe(200);
    });

    it("skip path: empty body still sets onboardedAt", async () => {
      mockSession = { user: { id: "u1" } };
      const res = await POST(makeRequest({}));
      expect(res.status).toBe(200);
      expect(capturedUpdates.onboardedAt).toBeInstanceOf(Date);
      expect(capturedUpdates.displayName).toBeUndefined();
      expect(capturedUpdates.targetFaculties).toBeUndefined();
    });

    it("targetFaculties only: sets faculties and onboardedAt", async () => {
      mockSession = { user: { id: "u1" } };
      const res = await POST(makeRequest({ targetFaculties: ["etf", "fon"] }));
      expect(res.status).toBe(200);
      expect(capturedUpdates.targetFaculties).toEqual(["etf", "fon"]);
      expect(capturedUpdates.onboardedAt).toBeInstanceOf(Date);
      expect(capturedUpdates.displayName).toBeUndefined();
    });

    it("displayName only: sets name and onboardedAt", async () => {
      mockSession = { user: { id: "u1" } };
      const res = await POST(makeRequest({ displayName: "JustName" }));
      expect(res.status).toBe(200);
      expect(capturedUpdates.displayName).toBe("JustName");
      expect(capturedUpdates.onboardedAt).toBeInstanceOf(Date);
      expect(capturedUpdates.targetFaculties).toBeUndefined();
    });
  });
});
