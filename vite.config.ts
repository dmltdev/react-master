/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ["lib"], insertTypesEntry: true }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~src": resolve(__dirname, "./src"),
      "~lib": resolve(__dirname, "./lib"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      fileName: (format) => `react-hooks.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    include: ["**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    coverage: {
      include: ["lib/utils/**/*.{js,ts,jsx,tsx}"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
