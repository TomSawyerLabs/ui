import type { ReactElement } from "react";
import { logoSvg } from "./logo.generated";

// The Tom Sawyer Labs wordmark. The SVG uses `fill="currentColor"`, so it picks
// up the surrounding text color (light/dark aware). Inlined as markup so it can
// inherit color without an <img>; sized via the .tsl-logo class in styles.css.
export function Logo({
  className = "tsl-logo",
}: {
  className?: string;
}): ReactElement {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: logoSvg }} />
  );
}
