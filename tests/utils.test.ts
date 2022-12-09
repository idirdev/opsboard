import { describe, it, expect } from "vitest";
import { truncate, getInitials, getStatusColor, getPriorityColor } from "../src/lib/utils";

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
