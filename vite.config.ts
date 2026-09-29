import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

const PORT = parseInt(process.env.PORT || "8443")
const HOST = process.env.HOST || "0.0.0.0"

export default defineConfig({
  base: process.env.PUBLIC_URL
    ? `${process.env.PUBLIC_URL}/`
    : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: HOST,
    port: PORT,
    strictPort: true,
  },
  preview: {
    host: HOST,
    port: PORT,
    strictPort: true,
  },
})
