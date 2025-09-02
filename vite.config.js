import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
  server: {
    host: true, // allow external access
    cors: true, // enable cross origin
    allowedHosts: [
      "https://ce1d5bf992fc.ngrok-free.app", // <--- paste your ngrok domain here
    ],
  },
});
