import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
   server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'spiral-fructose-molecular.ngrok-free.dev'
    ]
  }
});
