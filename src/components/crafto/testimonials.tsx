"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const QUOTES = [
  {
    quote:
      "Crafto didn't just redesign our site — they re-architected our funnel. Signups jumped 61% in the first month.",
    name: "Maya Lindqvist",
    role: "CEO, Lumen SaaS",
  },
  {
    quote:
      "The most design-obsessed team we've ever hired. Every interaction has intent. Awwwards-worthy, genuinely.",
    name: "Devon Park",
    role: "Founder, Vertex Studio",
  },
  {
    quote:
      "We hit a 2.1× AOV lift after the rebuild. The 3D product pages alone paid for the project in a quarter.",
    name: "Sara Okafor",
    role: "CMO, Nova Commerce",
  },
  {
    quote:
      "Fast, senior, no hand-holding required. They shipped early and kept optimizing. Rare combo.",
    name: "Alex Tan",
    role: "Head of Product, Aurora Finance",
  },
];

function QuoteCard({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <figure className="edge relative w-[88vw] shrink-0 overflow-hidden rounded-[2rem] p-8 sm:w-[28rem]">
      <div className="pointer-events-none absolute -right-1/4 -top-1/3 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-[#d4af37]/15 to-transparent blur-3xl" />
      <div className="relative flex items-center gap-1 text-[#f5d77a]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <blockquote className="relative mt-5 text-lg font-medium leading-snug text-white sm:text-xl">
        “{q.quote}”
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d77a] to-[#b8932f] font-display text-sm font-bold text-black">
          {q.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">
            {q.name}
          </span>
          <span className="block text-xs text-white/50">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const doubled = [...QUOTES, ...QUOTES, ...QUOTES];
  return (
    <section id="studio" className="relative overflow-hidden py-24 sm:py-32">
      {/* header */}
      <div className="mx-auto mb-14 max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#f5d77a]/80">
              Loved by founders
            </span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Don&apos;t take our{" "}
              <span className="text-gold-gradient">word</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55 sm:text-base">
            4.9 / 5 average rating across 40+ engagements. We measure success
            in your outcomes — not deliverables.
          </p>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((q, i) => (
            <QuoteCard key={i} q={q} />
          ))}
        </motion.div>
      </div>

      {/* stats strip */}
      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-4">
        {[
          { v: "120M+", l: "Revenue influenced" },
          { v: "40+", l: "Projects shipped" },
          { v: "4.9/5", l: "Avg client rating" },
          { v: "9 days", l: "Median time to v1" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center"
          >
            <div className="font-display text-3xl font-bold text-gold-gradient sm:text-4xl">
              {s.v}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
