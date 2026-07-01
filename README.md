# @tomsawyerlabs/ui

The shared Tom Sawyer Labs design system: the interactive gradient background,
base styling, wordmark, and layout shell used across TSL web properties
(public and internal).

It ships **TypeScript source** (no build step, no published artifacts) — the
consuming app's bundler compiles it. This keeps distribution dead simple: a plain
git dependency with nothing to build on install.

## Install

Consumed as a git dependency (no registry, no publish):

```bash
bun add github:TomSawyerLabs/ui#v0.2.0
```

Pin to a tag (or commit) for reproducibility. Because the package ships source,
there's **no `prepare`/build, no committed `dist/`, and no `trustedDependencies`**
to configure — install just clones the source and the consumer transpiles it.

### Requirements for consumers

- **A bundler that compiles TS/TSX** (Vite, etc.). The package is imported as
  source, not as prebuilt JS. All current TSL sites are Vite + React Router.
- **`react` / `react-dom` ^19** — peer dependencies the app provides.
- The wordmark is imported via Vite's `?raw` suffix, so the consumer needs
  `vite/client` types (React Router apps have them).
- **SSR / SSG note:** if you prerender or server-render, mark the package
  `noExternal` so it's transpiled in the server build too:

  ```ts
  // vite.config.ts
  export default defineConfig({
    ssr: { noExternal: ["@tomsawyerlabs/ui"] },
  });
  ```

## Usage

```tsx
// app root
import { Footer, GradientBackground } from "@tomsawyerlabs/ui";
import "@tomsawyerlabs/ui/styles.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body>
      <GradientBackground />
      {children}
      <Footer>Do the math, change the world!</Footer>
    </body>
  );
}
```

```tsx
// any page
import { Logo } from "@tomsawyerlabs/ui";

<Logo />;
```

### Exports

| Export                         | What it is                                                       |
| ------------------------------ | ---------------------------------------------------------------- |
| `<GradientBackground />`       | Mounts the cursor-reactive gradient animation. Renders nothing.  |
| `useGradientMouse()`           | The underlying hook, if you want to drive the gradient yourself. |
| `<Footer>{…}</Footer>`         | Fixed low-emphasis footer; you pass the tagline.                 |
| `<Logo />`                     | The TSL wordmark (inherits `currentColor`).                      |
| `logoSvg`                      | Raw wordmark SVG markup as a string.                             |
| `@tomsawyerlabs/ui/styles.css` | Base gradient + typography + `.tsl-logo` / `.tsl-footer`.        |

## Develop

There's no build — just typecheck and format:

```bash
bun install
bun run typecheck
bun run fmt
bun run hooks      # install the lefthook pre-commit format check
```

`src/logo.svg` is the source of truth for the wordmark; `src/logo-markup.ts`
imports it as a raw string for the `Logo` component.

### Local cross-repo development

To edit `ui` and a consuming site together without pushing tags, point the
consumer at a local checkout — no rebuild needed, since the consumer compiles
the source directly:

```bash
# in the consuming app's package.json
"@tomsawyerlabs/ui": "file:../ui"
```

Switch back to the `github:` dependency before committing.
