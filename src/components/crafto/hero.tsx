"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Mouse } from "lucide-react";
import { MagneticButton } from "./magnetic-button";

/**
 * Hero — premium 3D feel built with pure CSS 3D + Framer Motion.
 * - Mouse-driven rotating "Crafto" liquid-metal orb
 * - Animated headline reveal
 * - Magnetic CTAs
 * - Ambient gold glow
 * - Scroll cue
 */
export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // mouse-based 3D for the central orb
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), {
    damping: 30,
    stiffness: 120,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), {
    damping: 30,
    stiffness: 120,
  });

  // scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(relX);
      my.set(relY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const headlineLines = ["We Craft", "Digital", "Perfection."];

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 sm:pt-28"
    >
      {/* AMBIENT GLOWS */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="ambient-glow left-1/2 top-[-12%] h-[560px] w-[560px] -translate-x-1/2 bg-[#d4af37]/35 animate-pulse-glow" />
        <div className="ambient-glow left-[-10%] top-1/3 h-[400px] w-[400px] bg-[#b8932f]/25" />
        <div className="ambient-glow right-[-10%] bottom-1/4 h-[460px] w-[460px] bg-[#f5d77a]/20" />
      </div>

      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 42%, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 65% at 50% 42%, black, transparent 72%)",
        }}
      />

      {/* 3D ORB */}
      <motion.div
        style={{ y: yOrb, opacity, rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(720px,86vw)] w-[min(720px,86vw)] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-full w-full">
          {/* morphing liquid blob */}
          <div className="absolute inset-[8%] animate-morph bg-gradient-to-br from-[#f5d77a] via-[#d4af37] to-[#7a5c1e] shadow-[0_0_160px_rgba(212,175,55,0.55),inset_0_0_80px_rgba(0,0,0,0.35)]" />
          {/* chrome rings */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-white/12" />
          <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-white/6 [animation-direction:reverse]" />
          <div className="absolute inset-[22%] animate-spin-slow rounded-full border border-[#f5d77a]/25" />
          {/* highlight */}
          <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-transparent via-white/15 to-white/40 blur-2xl" />
        </div>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5d77a] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5d77a]" />
          </span>
          Premium Web Agency · Now booking 2025
        </motion.div>

        {/* headline */}
        <h1 className="font-display text-[13vw] font-extrabold leading-[0.92] tracking-tight sm:text-[9vw] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem]">
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.12em] [margin-bottom:-0.12em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.95,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {i === 2 ? (
                  <span className="text-gold-gradient">{line}</span>
                ) : (
                  <span className="text-chrome-gradient">{line}</span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/65 sm:text-lg"
        >
          A premium web agency designing immersive, high-performance digital
          experiences — turning visitors into customers with craft, motion, and
          3D.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton
            href="#work"
            strength={0.5}
            className="px-7 py-4 text-sm font-semibold text-black bg-gradient-to-r from-[#f5d77a] to-[#d4af37] shadow-[0_8px_40px_rgba(212,175,55,0.35)]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              View Our Work
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="absolute inset-0 -translate-x-[120%] bg-white/45 transition-transform duration-700 ease-out group-hover:translate-x-[120%] [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            strength={0.4}
            className="border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
          >
            <span className="relative z-10">Get a Free Quote</span>
          </MagneticButton>
        </motion.div>

        {/* social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40"
        >
          <span>Trusted by 40+ founders</span>
          <span className="hidden sm:inline">•</span>
          <span>4.9/5 average client rating</span>
          <span className="hidden sm:inline">•</span>
          <span>$120M+ revenue influenced</span>
        </motion.div>
      </motion.div>

      {/* SCROLL CUE */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll to Explore
        </span>
        <div className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-1.5 w-1.5 animate-scroll-cue rounded-full bg-[#f5d77a]" />
        </div>
        <Mouse size={12} className="text-white/20" />
      </motion.div>
    </section>
  );
}
