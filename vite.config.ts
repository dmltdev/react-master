import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./lib"), // Adjust based on your folder structure
    },
  },
});
