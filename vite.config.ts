import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  return {
    base: "/sector-igeniza-o-aurora/", // ✅ pou GitHub Pages
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist", // 📦 Folder final la
      sourcemap: mode === "development", // ✅ Kreye sourcemap sèlman nan dev
    },
    define: {
      __APP_VERSION__: JSON.stringify("1.0.0"), // 🌐 Ou ka itilize sa nenpòt kote
    },
  };
});

