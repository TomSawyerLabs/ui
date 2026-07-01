// The wordmark ships as an .svg (single source of truth) and is imported as raw
// markup via Vite's `?raw` suffix. Consumers therefore need a Vite-compatible
// bundler — true for all current TSL sites.
import logoMarkup from "./logo.svg?raw";

export const logoSvg: string = logoMarkup;
