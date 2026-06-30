import { useGradientMouse } from "./useGradientMouse";

// Drives the interactive gradient defined in styles.css. Renders nothing —
// mount it once near the root of the page (e.g. in the <body>). Requires
// `@tomsawyerlabs/ui/styles.css` to be imported for the gradient to show.
export function GradientBackground() {
  useGradientMouse();
  return null;
}
