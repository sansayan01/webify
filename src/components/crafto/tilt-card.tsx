"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D tilt card — tilts on rotateX/rotateY based on pointer position.
 * Inner content can pop out via translateZ using `data-tilt-pop` wrappers.
 */
type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  max?: number; // max degrees
  glare?: boolean;
  scale?: number;
};

export function TiltCard({
  children,
  className,
  max = 12,
  glare = true,
  scale = 1.0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    damping: 20,
    stiffness: 200,
  });

  // glare position
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  // Glare background is computed unconditionally to keep hook order stable.
  const glareBackground = useTransform(
    [glareX, glareY] as const,
    ([gx, gy]: string[]) =>
      `radial-gradient(420px circle at ${gx} ${gy}, rgba(245,215,122,0.18), transparent 45%)`
  );

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    px.set(relX);
    py.set(relY);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
