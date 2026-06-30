import { useEffect } from "react";

// Four gradient spots with spring-based attraction to cursor
const SPOTS = [
  { baseX: 15, baseY: 20, pull: 0.18, stiffness: 0.004, damping: 0.91 },
  { baseX: 85, baseY: 10, pull: -0.12, stiffness: 0.002, damping: 0.94 },
  { baseX: 70, baseY: 80, pull: 0.2, stiffness: 0.005, damping: 0.89 },
  { baseX: 30, baseY: 90, pull: -0.1, stiffness: 0.0015, damping: 0.95 },
];

// Attraction model: spots drift toward cursor with spring damping. Writes
// --gx{n}/--gy{n} custom properties on <html>, consumed by the gradient in
// styles.css. Safe under SSG/prerender: the effect only runs in the browser.
export function useGradientMouse(): void {
  useEffect(() => {
    let mouseX = 50;
    let mouseY = 50;
    const state = SPOTS.map((s) => ({
      x: s.baseX,
      y: s.baseY,
      vx: 0,
      vy: 0,
    }));
    let frameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 100;
      mouseY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      const style = document.documentElement.style;

      for (let i = 0; i < SPOTS.length; i++) {
        const spot = SPOTS[i];
        const s = state[i];

        const targetX = spot.baseX + (mouseX - spot.baseX) * spot.pull;
        const targetY = spot.baseY + (mouseY - spot.baseY) * spot.pull;

        s.vx = s.vx * spot.damping + (targetX - s.x) * spot.stiffness;
        s.vy = s.vy * spot.damping + (targetY - s.y) * spot.stiffness;
        s.x += s.vx;
        s.y += s.vy;

        style.setProperty(`--gx${i + 1}`, `${s.x}%`);
        style.setProperty(`--gy${i + 1}`, `${s.y}%`);
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
}
