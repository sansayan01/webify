"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic button — subtly pulls toward the cursor as it approaches.
 * Hand-drawn style: wobbly oval, hard shadow, press-flat on active.
 * Renders either an <a> or <button> depending on `href`.
 */
type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.35,
  as = "a",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.5 });
  const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass = cn(
    "hd-btn group relative inline-flex items-center justify-center overflow-hidden font-hand text-lg font-medium tracking-wide will-change-transform",
    className
  );

  const motionProps = {
    ref: ref as any,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: sx, y: sy },
    className: baseClass,
    "aria-label": ariaLabel,
  };

  if (as === "a") {
    return (
      <motion.a href={href ?? "#"} {...motionProps}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
