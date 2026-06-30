import type { ReactElement, ReactNode } from "react";

// Fixed, low-emphasis site footer. Tagline is supplied by the consumer so each
// property can set its own.
export function Footer({ children }: { children: ReactNode }): ReactElement {
  return <footer className="tsl-footer">{children}</footer>;
}
