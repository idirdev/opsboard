import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema, projectSchema, webhookSchema } from "../src/lib/validations";

describe("loginSchema", () => {
  it("validates correct input", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "12345678" }).success).toBe(true);
  });
  it("rejects invalid email", () => {
    expect(loginSchema.safeParse({ email: "bad", password: "12345678" }).success).toBe(false);
  });
  it("rejects short password", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "short" }).success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("validates correct input", () => {
    expect(registerSchema.safeParse({ name: "John", email: "a@b.com", password: "Pass1234" }).success).toBe(true);
  });
  it("rejects no uppercase", () => {
    expect(registerSchema.safeParse({ name: "John", email: "a@b.com", password: "pass1234" }).success).toBe(false);
  });
  it("rejects no number", () => {
    expect(registerSchema.safeParse({ name: "John", email: "a@b.com", password: "Password" }).success).toBe(false);
  });
});

describe("projectSchema", () => {
  it("validates minimal", () => {
    expect(projectSchema.safeParse({ name: "P" }).success).toBe(true);
  });
  it("rejects empty name", () => {
    expect(projectSchema.safeParse({ name: "" }).success).toBe(false);
  });
  it("rejects invalid status", () => {
    expect(projectSchema.safeParse({ name: "P", status: "bad" }).success).toBe(false);
  });
  it("rejects negative budget", () => {
    expect(projectSchema.safeParse({ name: "P", budget: -1 }).success).toBe(false);
  });
});

describe("webhookSchema", () => {
  it("validates correct input", () => {
    expect(webhookSchema.safeParse({ name: "W", url: "https://x.com", events: ["e"] }).success).toBe(true);
  });
  it("rejects empty events", () => {
    expect(webhookSchema.safeParse({ name: "W", url: "https://x.com", events: [] }).success).toBe(false);
  });
  it("rejects invalid URL", () => {
    expect(webhookSchema.safeParse({ name: "W", url: "bad", events: ["e"] }).success).toBe(false);
  });
});
