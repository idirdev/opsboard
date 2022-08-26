import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn(),
  where: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
};

vi.mock("@/lib/db", () => ({ db: mockDb }));
vi.mock("next-auth", () => ({
  getServerSession: vi.fn().mockResolvedValue({
    user: { id: "user-1", email: "test@example.com", role: "admin" },
  }),
}));

const mockProjects = [
  {
    id: "proj-1",
    name: "Dashboard Redesign",
    status: "active",
    priority: "high",
    ownerId: "user-1",
    createdAt: new Date("2024-10-20"),
  },
  {
    id: "proj-2",
    name: "API Migration",
    status: "planning",
    priority: "medium",
    ownerId: "user-1",
    createdAt: new Date("2024-10-18"),
  },
];

describe("Projects API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/projects", () => {
    it("returns paginated project list", async () => {
      mockDb.offset.mockResolvedValueOnce(mockProjects);

      const request = new NextRequest("http://localhost:3000/api/projects?page=1&limit=20");
      const { GET } = await import("@/app/api/projects/route");
      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.data).toHaveLength(2);
      expect(body.pagination.page).toBe(1);
    });

    it("defaults to page 1 with limit 20 when no params", async () => {
      mockDb.offset.mockResolvedValueOnce([]);

      const request = new NextRequest("http://localhost:3000/api/projects");
      const { GET } = await import("@/app/api/projects/route");
      const response = await GET(request);
      const body = await response.json();

      expect(body.data).toEqual([]);
      expect(body.pagination.page).toBe(1);
      expect(body.pagination.limit).toBe(20);
    });
  });

  describe("POST /api/projects", () => {
    it("creates a new project with valid data", async () => {
      const created = { id: "proj-3", name: "New Project", status: "planning", priority: "low" };
      mockDb.returning.mockResolvedValueOnce([created]);

      const request = new NextRequest("http://localhost:3000/api/projects", {
        method: "POST",
        body: JSON.stringify({ name: "New Project", status: "planning", priority: "low" }),
      });

      const { POST } = await import("@/app/api/projects/route");
      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body.name).toBe("New Project");
    });

    it("rejects project with empty name", async () => {
      const request = new NextRequest("http://localhost:3000/api/projects", {
        method: "POST",
        body: JSON.stringify({ name: "", status: "planning" }),
      });

      const { POST } = await import("@/app/api/projects/route");
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("rejects project with invalid status", async () => {
      const request = new NextRequest("http://localhost:3000/api/projects", {
        method: "POST",
        body: JSON.stringify({ name: "Test", status: "invalid_status" }),
      });

      const { POST } = await import("@/app/api/projects/route");
      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });
});
