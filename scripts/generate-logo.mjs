// Inlines src/logo.svg into src/logo.generated.ts as a string constant so the
// Logo component can render it without relying on a consumer's bundler having a
// `?raw` SVG loader. Regenerated on every build (see the `generate` script).
import { readFileSync, writeFileSync } from "node:fs";

const svgUrl = new URL("../src/logo.svg", import.meta.url);
const outUrl = new URL("../src/logo.generated.ts", import.meta.url);

const svg = readFileSync(svgUrl, "utf8").trim();

const out = `// AUTO-GENERATED from logo.svg by scripts/generate-logo.mjs. Do not edit.
export const logoSvg = ${JSON.stringify(svg)};
`;

writeFileSync(outUrl, out);
