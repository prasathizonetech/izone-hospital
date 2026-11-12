import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain client-side Vite + React + Tailwind app (no SSR, no nitro/cloudflare).
// @tanstack/router-plugin still generates src/routeTree.gen.ts from the
// file-based routes in src/routes, it just runs in pure client/SPA mode here.
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: false,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  server: {
    port: 3000,
  },
  build: {
    // Build output lands in <project-root>/dist — plain static files, no
    // wrangler/.output/.vinxi folders, ready to upload to any static host.
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-framer": ["framer-motion"],
          "vendor-tanstack": ["@tanstack/react-router", "@tanstack/react-query"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
});
