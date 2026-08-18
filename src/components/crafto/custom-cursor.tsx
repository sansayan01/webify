"use client";

import React, { useSyncExternalStore, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subscribe to the (hover: hover) and (pointer: fine) media query in a
 * React-blessed way (useSyncExternalStore) so we avoid setState-in-effect.
 */
function useFinePointer() {
  const subscribe = (cb: () => void) => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
  const getSnapshot = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Premium Awwwards-style custom cursor.
 * - Outer ring follows pointer with spring physics (mix-blend-difference)
 * - Inner dot tracks precisely
 * - Grows + changes color when hovering interactive elements
 * - Disabled on touch devices
 */
export function CustomCursor() {
  const enabled = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.6 });
  const ringY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, [role='button']"
      );
      setHovering(interactive);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border"
          animate={{
            width: hovering ? 64 : 36,
            height: hovering ? 64 : 36,
            borderColor: hovering
              ? "rgba(245,215,122,0.9)"
              : "rgba(245,215,122,0.6)",
            backgroundColor: hovering
              ? "rgba(245,215,122,0.10)"
              : "rgba(245,215,122,0)",
            scale: down ? 0.85 : 1,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 320 }}
        />
      </motion.div>

      {/* inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#f5d77a] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: down ? 0.6 : 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 600 }}
      />
    </>
  );
}
