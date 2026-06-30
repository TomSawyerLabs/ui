# @tomsawyerlabs/ui

The shared Tom Sawyer Labs design system: the interactive gradient background,
base styling, wordmark, and layout shell used across TSL web properties
(public and internal).

This is a framework-agnostic React component package — plain React 19 components,
a hook, and a stylesheet. It has no dependency on any app framework, so it can be
consumed by React Router, Next, Vite SPAs, etc.

## Install

Consumed as a git dependency (no registry publish required):

```bash
bun add github:TomSawyerLabs/ui#v0.1.2
```

Pin to a tag (or commit) so consumers get reproducible builds. The package builds
itself on install via the `prepare` lifecycle (tsdown for the JS bundle, `tsc` for
the `.d.ts`), so `dist/` is not committed.

**Required:** Bun blocks dependency lifecycle scripts by default, so the consumer
**must** mark this package as trusted or the build won't run (you'd get
`dist/index.js` missing). Add to the consuming app's `package.json`:

```json
"trustedDependencies": ["@tomsawyerlabs/ui"]
```

This is honored non-interactively, so CI works too.

`react` and `react-dom` (^19) are peer dependencies — the consuming app provides them.

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

```bash
bun install        # also builds via prepare
bun run build      # generate logo + tsdown JS bundle + tsc .d.ts
bun run dev        # watch build
bun run typecheck
bun run fmt
bun run hooks      # install the lefthook pre-commit format check
```

`src/logo.svg` is the source of truth for the wordmark; `bun run generate` inlines
it into `src/logo.generated.ts` (gitignored) for the `Logo` component.

### Local cross-repo development

To edit `ui` and a consuming site together without pushing tags, point the
consumer at a local checkout:

```bash
# in the consuming app's package.json
"@tomsawyerlabs/ui": "file:../ui"
```

Rebuild `ui` (`bun run build`) after changes, or run `bun run dev` for a watch
build. Switch back to the `github:` dependency before committing.
