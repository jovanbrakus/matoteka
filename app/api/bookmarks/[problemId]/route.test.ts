import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockExistingBookmark: any[] = [];
const mockDelete = vi.fn().mockReturnValue({
  where: vi.fn().mockResolvedValue(undefined),
});
const mockInsert = vi.fn().mockReturnValue({
  values: vi.fn().mockResolvedValue(undefined),
});

vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockImplementation(() =>
            Promise.resolve(mockExistingBookmark)
          ),
        }),
      }),
    }),
    delete: mockDelete,
    insert: mockInsert,
  },
}));

const { POST } = await import("./route");

function makeRequest(): Request {
  return new Request("http://localhost/api/bookmarks/etf-2024-1", {
    method: "POST",
  });
}

const params = Promise.resolve({ problemId: "etf-2024-1" });

// --- Tests ---

describe("POST /api/bookmarks/[problemId]", () => {
  beforeEach(() => {
    mockSession = null;
    mockExistingBookmark = [];
    mockDelete.mockClear();
    mockInsert.mockClear();
    mockDelete.mockReturnValue({ where: vi.fn().mockResolvedValue(undefined) });
    mockInsert.mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) });
  });

  it("returns 401 when not authenticated", async () => {
    const res = await POST(makeRequest(), { params });
    expect(res.status).toBe(401);
  });

  it("adds bookmark when not bookmarked", async () => {
    mockSession = { user: { id: "u1" } };
    mockExistingBookmark = [];
    const res = await POST(makeRequest(), { params });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.bookmarked).toBe(true);
    expect(mockInsert).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("removes bookmark when already bookmarked", async () => {
    mockSession = { user: { id: "u1" } };
    mockExistingBookmark = [{ userId: "u1", problemId: "etf-2024-1" }];
    const res = await POST(makeRequest(), { params });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.bookmarked).toBe(false);
    expect(mockDelete).toHaveBeenCalled();
    expect(mockInsert).not.toHaveBeenCalled();
  });
});
