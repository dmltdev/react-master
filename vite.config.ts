import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["lib"], insertTypesEntry: true })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"), // Adjust based on your folder structure
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
});
