import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  // Provided by the consuming app — never bundle React into the package.
  external: ["react", "react-dom", "react/jsx-runtime"],
});
