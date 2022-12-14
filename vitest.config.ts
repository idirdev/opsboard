import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Map next/server to the CJS-compatible internal module so Vitest can load
      // Next.js route handlers without requiring the full Next.js build pipeline.
      "next/server": path.resolve(
        __dirname,
        "node_modules/next/dist/server/web/exports/index.js"
      ),
    },
  },
});
