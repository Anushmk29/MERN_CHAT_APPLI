import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600, minify: false },
  server: {
    proxy: {
      "/api/chat": "http://localhost:5000", // your backend server URL
    },
  },
});
