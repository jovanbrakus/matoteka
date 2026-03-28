import { describe, it, expect, vi, beforeEach } from "vitest";

// --- Mocks ---

let mockSession: any = null;

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(() => Promise.resolve(mockSession)),
}));

let mockHtml: string | null = null;

vi.mock("@/lib/problems", () => ({
  getProblemHtml: vi.fn(() => mockHtml),
}));

// Import the handler after mocks are set up
const { GET } = await import("./route");

function makeRequest(url: string): Request {
  return new Request(url);
}

const params = Promise.resolve({ problemId: "etf-2024-1" });

// --- Tests ---

describe("GET /api/problems/[problemId]/html", () => {
  beforeEach(() => {
    mockSession = null;
    mockHtml = `<!DOCTYPE html><html><head><style>.test{}</style></head><body><div class="card problem-statement">Problem text</div></body></html>`;
  });

  describe("full solution (no section param)", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      expect(res.status).toBe(401);
      const body = await res.text();
      expect(body).toContain("Potrebna prijava");
    });

    it("returns solution HTML when authenticated", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain("Problem text");
    });

    it("returns 404 when problem does not exist", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      mockHtml = null;
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      expect(res.status).toBe(404);
    });
  });

  describe("statement section", () => {
    it("returns 401 when not authenticated", async () => {
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      expect(res.status).toBe(401);
      const body = await res.text();
      expect(body).toContain("Potrebna prijava");
    });

    it("returns statement when authenticated", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain("Problem text");
    });

    it("returns 404 when problem HTML is missing", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      mockHtml = null;
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      expect(res.status).toBe(404);
    });
  });

  describe("security headers", () => {
    it("includes Cache-Control no-store on solution responses", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      expect(res.headers.get("Cache-Control")).toBe("no-store, no-cache, must-revalidate, private");
      expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    });

    it("includes Cache-Control no-store on statement responses", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      expect(res.headers.get("Cache-Control")).toBe("no-store, no-cache, must-revalidate, private");
    });
  });
});
