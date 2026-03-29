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

let mockRateLimit = { allowed: true, used: 0, limit: 30 };

vi.mock("@/lib/utils/solution-rate-limit", () => ({
  checkSolutionRateLimit: vi.fn(() => Promise.resolve(mockRateLimit)),
  recordSolutionView: vi.fn(() => Promise.resolve({ isNewToday: true })),
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
    mockRateLimit = { allowed: true, used: 0, limit: 30 };
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

  describe("rate limiting", () => {
    it("returns 429 when daily limit exceeded", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      mockRateLimit = { allowed: false, used: 30, limit: 30 };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      expect(res.status).toBe(429);
      const body = await res.text();
      expect(body).toContain("Dnevni limit dostignut");
      expect(body).toContain("30/30");
    });

    it("admin bypasses rate limit", async () => {
      mockSession = { user: { id: "admin-1", email: "admin@test.com", role: "admin" } };
      mockRateLimit = { allowed: false, used: 30, limit: 30 };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      expect(res.status).toBe(200);
    });

    it("does not rate limit statements", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      mockRateLimit = { allowed: false, used: 30, limit: 30 };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      expect(res.status).toBe(200);
    });
  });

  describe("watermarking", () => {
    it("watermarks full solution HTML", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      const body = await res.text();
      expect(body).toMatch(/--wm:"[0-9a-f]{16}"/);
      expect(body).toMatch(/data-m="[0-9a-f]{4}"/);
    });

    it("does not watermark statements", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      const body = await res.text();
      expect(body).not.toMatch(/--wm:/);
      expect(body).not.toMatch(/data-m=/);
    });
  });

  describe("content obfuscation", () => {
    it("injects postMessage resize script into full solutions", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      const body = await res.text();
      expect(body).toContain("matoteka-resize");
      expect(body).toContain("matoteka-theme");
    });

    it("injects postMessage resize script into statements", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      const body = await res.text();
      expect(body).toContain("matoteka-resize");
    });

    it("injects anti-copy CSS into full solutions", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?theme=dark"),
        { params }
      );
      const body = await res.text();
      expect(body).toContain("user-select:none");
      expect(body).toContain("contextmenu");
    });

    it("does not inject anti-copy CSS into statements", async () => {
      mockSession = { user: { id: "user-1", email: "test@test.com" } };
      const res = await GET(
        makeRequest("http://localhost/api/problems/etf-2024-1/html?section=statement&theme=light"),
        { params }
      );
      const body = await res.text();
      expect(body).not.toContain("user-select:none");
      expect(body).not.toContain("contextmenu");
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
