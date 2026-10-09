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
 * Hand-drawn pencil cursor.
 * - Outer ring (wobbly border) follows pointer with spring physics
 * - Inner dot tracks precisely
 * - Grows + turns red when hovering interactive elements
 * - Disabled on touch devices
 */
export function CustomCursor() {
  const enabled = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  // Hide the native cursor only while the hand-drawn cursor is active.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

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
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="flex items-center justify-center border-2 border-[#2d2d2d]"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            borderColor: hovering ? "rgba(255,77,77,0.9)" : "rgba(45,45,45,0.6)",
            backgroundColor: hovering
              ? "rgba(255,77,77,0.10)"
              : "rgba(45,45,45,0)",
            scale: down ? 0.85 : 1,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 320 }}
        />
      </motion.div>

      {/* inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#ff4d4d]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: down ? 0.6 : 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 600 }}
      />
    </>
  );
}
