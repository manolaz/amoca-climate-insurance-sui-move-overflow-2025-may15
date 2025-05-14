import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relax TypeScript strictness for Vite
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        strict: false,
        skipLibCheck: true,
        noImplicitAny: false,
        suppressImplicitAnyIndexErrors: true,
        noImplicitThis: false,
        noUnusedLocals: false,
        noUnusedParameters: false,
        allowJs: true,
        allowSyntheticDefaultImports: true,
        isolatedModules: false,
        noEmit: true,
        jsx: "react-jsx"
      }
    }
  }
});
