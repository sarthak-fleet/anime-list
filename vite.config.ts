import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: { customMedia: true },
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
}));