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
      className="relative bg-[#fdfbf7]"
    >
      {/* heading pinned top */}
      <div className="px-4 pt-24 sm:pt-32">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-hand text-xs font-medium uppercase tracking-[0.3em] text-[#ff4d4d]/80">
              How we work
            </span>
            <h2 className="mt-3 max-w-xl font-marker text-4xl font-bold leading-[1.05] tracking-tight text-[#2d2d2d] sm:text-5xl md:text-6xl">
              The Crafto <span className="text-[#ff4d4d]">process</span>.
            </h2>
          </div>
          <p className="max-w-sm font-hand text-sm text-[#2d2d2d]/60 sm:text-base">
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
                className="edge group relative flex h-[62vh] min-h-[440px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden p-8 sm:w-[46vw] lg:w-[34vw]"
                style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg`, background: "#fff9c4" }}
              >
                {/* huge number */}
                <span className="pointer-events-none absolute -bottom-10 -right-2 font-marker text-[12rem] font-extrabold leading-none text-[#2d2d2d]/[0.06] sm:text-[16rem]">
                  {s.n}
                </span>

                <div className="relative">
                  <span className="inline-flex h-14 w-14 items-center justify-center border-2 border-[#2d2d2d] bg-white text-[#2d5da1]">
                    {s.icon}
                  </span>
                  <span className="ml-3 font-marker text-sm font-semibold text-[#2d2d2d]/40">
                    Step {s.n}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="font-marker text-4xl font-bold tracking-tight text-[#2d2d2d] sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md font-hand text-sm text-[#2d2d2d]/70 sm:text-base">
                    {s.desc}
                  </p>

                  {/* progress dots */}
                  <div className="mt-8 flex items-center gap-2">
                    {STEPS.map((_, j) => (
                      <span
                        key={j}
                        className={
                          j === i
                            ? "h-1.5 w-8 rounded-full bg-[#ff4d4d]"
                            : "h-1.5 w-2 rounded-full bg-[#2d2d2d]/15"
                        }
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* end card */}
            <article className="flex h-[62vh] min-h-[440px] w-[82vw] shrink-0 flex-col items-center justify-center gap-6 border-2 border-dashed border-[#2d2d2d] p-8 text-center sm:w-[40vw]" style={{ background: "#ffffff" }}>
              <span className="font-marker text-2xl font-bold text-[#2d2d2d]">
                Ready to start?
              </span>
              <p className="max-w-xs font-hand text-sm text-[#2d2d2d]/60">
                Let&apos;s turn your idea into a digital experience worth
                showing off.
              </p>
              <a
                href="#contact"
                className="rounded-full bg-[#ff4d4d] px-6 py-3 font-hand text-sm font-semibold text-white shadow-hard-sm transition-transform hover:translate-x-1 hover:translate-y-1"
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
