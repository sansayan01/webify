"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, PenTool, Code2, Rocket } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We dig into your goals, users, and competitors. Strategy first — every pixel earns its place.",
    icon: <Compass size={26} />,
  },
  {
    n: "02",
    title: "Design",
    desc: "Wireframes to high-fidelity prototypes. Design system, motion language, and brand-aligned polish.",
    icon: <PenTool size={26} />,
  },
  {
    n: "03",
    title: "Develop",
    desc: "Next.js, TypeScript, edge-first. We ship fast, accessible, and pixel-true to the design.",
    icon: <Code2 size={26} />,
  },
  {
    n: "04",
    title: "Deploy",
    desc: "Launch, monitor, optimize. We stay on after launch — analytics, A/B tests, and iteration.",
    icon: <Rocket size={26} />,
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Horizontal translate: 0 -> -(75% of scroll width)
  // Each card ~ 80vw on mobile, fixed on desktop. We translate by ~ (count-1) * cardShare.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-[oklch(0.11_0.005_270)]"
    >
      {/* heading pinned top */}
      <div className="px-4 pt-24 sm:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#f5d77a]/80">
              How we work
            </span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              The Crafto <span className="text-gold-gradient">process</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55 sm:text-base">
            A four-step journey from idea to impact — built to be transparent,
            collaborative, and relentlessly craft-driven.
          </p>
        </div>
      </div>

      {/* horizontal scroll track */}
      <div className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 px-[6vw] sm:gap-8 sm:px-[8vw]"
          >
            {STEPS.map((s, i) => (
              <article
                key={s.n}
                className="edge group relative flex h-[62vh] min-h-[440px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:w-[46vw] lg:w-[34vw]"
              >
                {/* glow */}
                <div className="pointer-events-none absolute -right-1/4 -top-1/3 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-3xl" />
                {/* huge number */}
                <span className="pointer-events-none absolute -bottom-10 -right-2 font-display text-[12rem] font-extrabold leading-none text-white/[0.04] sm:text-[16rem]">
                  {s.n}
                </span>

                <div className="relative">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#f5d77a]">
                    {s.icon}
                  </span>
                  <span className="ml-3 font-display text-sm font-semibold text-white/40">
                    Step {s.n}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm text-white/60 sm:text-base">
                    {s.desc}
                  </p>

                  {/* progress dots */}
                  <div className="mt-8 flex items-center gap-2">
                    {STEPS.map((_, j) => (
                      <span
                        key={j}
                        className={
                          j === i
                            ? "h-1.5 w-8 rounded-full bg-[#f5d77a]"
                            : "h-1.5 w-2 rounded-full bg-white/15"
                        }
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* end card */}
            <article className="flex h-[62vh] min-h-[440px] w-[82vw] shrink-0 flex-col items-center justify-center gap-6 rounded-[2rem] border border-dashed border-white/10 p-8 text-center sm:w-[40vw]">
              <span className="font-display text-2xl font-bold text-white">
                Ready to start?
              </span>
              <p className="max-w-xs text-sm text-white/55">
                Let&apos;s turn your idea into a digital experience worth
                showing off.
              </p>
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-[#f5d77a] to-[#d4af37] px-6 py-3 text-sm font-semibold text-black"
              >
                Start a project →
              </a>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
