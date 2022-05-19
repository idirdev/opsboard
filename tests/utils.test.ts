import { describe, it, expect } from "vitest";

function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    planning: "bg-slate-100 text-slate-700",
    active: "bg-blue-100 text-blue-700",
    on_hold: "bg-amber-100 text-amber-700",
    completed: "bg-emerald-100 text-emerald-700",
    archived: "bg-gray-100 text-gray-500",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: "text-slate-500", medium: "text-blue-500",
    high: "text-amber-500", critical: "text-red-500",
  };
  return colors[priority] || "text-gray-500";
}

describe("truncate", () => {
  it("returns string as-is when shorter than limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });
  it("truncates and adds ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });
  it("handles exact length", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});

describe("getInitials", () => {
  it("extracts initials from full name", () => {
    expect(getInitials("John Doe")).toBe("JD");
  });
  it("handles single name", () => {
    expect(getInitials("Alice")).toBe("A");
  });
  it("limits to 2 characters", () => {
    expect(getInitials("John Michael Doe")).toBe("JM");
  });
});

describe("getStatusColor", () => {
  it("returns correct colors", () => {
    expect(getStatusColor("active")).toBe("bg-blue-100 text-blue-700");
    expect(getStatusColor("completed")).toBe("bg-emerald-100 text-emerald-700");
  });
  it("returns default for unknown", () => {
    expect(getStatusColor("xxx")).toBe("bg-gray-100 text-gray-700");
  });
});

describe("getPriorityColor", () => {
  it("returns correct colors", () => {
    expect(getPriorityColor("critical")).toBe("text-red-500");
    expect(getPriorityColor("high")).toBe("text-amber-500");
  });
  it("returns default for unknown", () => {
    expect(getPriorityColor("xxx")).toBe("text-gray-500");
  });
});
