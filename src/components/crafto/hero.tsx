"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { MagneticButton } from "./magnetic-button";

/**
 * Hero — hand-drawn aesthetic.
 * - Large marker-font headline with wobbly entrance
 * - Scribbled underline + hand-drawn arrow pointing to CTA
 * - Magnetic CTAs with hard shadows
 * - Warm paper background (texture from globals.css body)
 */
export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const headlineLines = ["We Craft", "Digital", "Perfection."];

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 sm:pt-28"
    >
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
          className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#2d2d2d] bg-white px-4 py-1.5 font-hand text-xs font-medium uppercase tracking-[0.18em] text-[#2d2d2d]/80 shadow-hard-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d4d] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff4d4d]" />
          </span>
          Web Agency · Now booking
        </motion.div>

        {/* headline */}
        <h1 className="font-marker text-[14vw] font-bold leading-[0.95] tracking-tight text-[#2d2d2d] sm:text-[10vw] md:text-[7rem] lg:text-[8rem]">
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "110%", rotate: i === 2 ? 2 : -2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{
                  duration: 0.95,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {i === 2 ? (
                  <span className="text-[#ff4d4d]">{line}</span>
                ) : (
                  <span className="text-[#2d2d2d]">{line}</span>
                )}
              </motion.span>
            </span>
          ))}
          {/* scribbled underline under headline */}
          <svg
            className="mx-auto mt-2 hidden h-4 w-64 text-[#ff4d4d] sm:block"
            viewBox="0 0 200 20"
            fill="none"
          >
            <path
              d="M2 14 Q 50 4 100 12 T 198 8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </h1>

        {/* sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-6 max-w-2xl font-hand text-balance text-lg text-[#2d2d2d]/70 sm:text-xl"
        >
          A web agency that helps local businesses get found, look great, and
          grow — with hand-crafted websites built for your community.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="#work"
            strength={0.5}
            className="bg-[#ff4d4d] px-7 py-4 text-white"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              View Our Work
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            strength={0.4}
            className="bg-white px-7 py-4 text-[#2d2d2d]"
          >
            <span className="relative z-10">Get a Free Quote</span>
          </MagneticButton>
        </motion.div>

        {/* social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-hand text-xs text-[#2d2d2d]/50"
        >
          <span>Trusted by 200+ businesses</span>
          <span className="hidden sm:inline">•</span>
          <span>4.9/5 average client rating</span>
          <span className="hidden sm:inline">•</span>
          <span>₹10L+ revenue influenced</span>
        </motion.div>
      </motion.div>

      {/* SCROLL CUE */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-hand text-[10px] uppercase tracking-[0.3em] text-[#2d2d2d]/40">
          Scroll to Explore
        </span>
        <div className="relative flex h-9 w-5 items-start justify-center border-2 border-[#2d2d2d] bg-white p-1 shadow-hard-sm">
          <span className="h-1.5 w-1.5 animate-scroll-cue rounded-full bg-[#ff4d4d]" />
        </div>
        <MousePointer2 size={14} className="text-[#2d2d2d]/30" />
      </motion.div>
    </section>
  );
}
