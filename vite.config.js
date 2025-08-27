import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access
    cors: true, // enable cross origin
    allowedHosts: [
      "d81a9aa55c0c.ngrok-free.app", // <--- paste your ngrok domain here
    ],
  },
});
