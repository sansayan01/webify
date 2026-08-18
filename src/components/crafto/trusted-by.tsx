"use client";

import React from "react";
import { motion } from "framer-motion";

const CLIENTS = [
  "Aurora",
  "Nebula Labs",
  "Vertex",
  "Lumen",
  "Monolith",
  "Polaris",
  "Northwind",
  "Atlas",
  "Quanta",
  "Helix",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex w-max gap-12 pr-12">
      {[...CLIENTS, ...CLIENTS].map((c, i) => (
        <span
          key={`${c}-${i}`}
          className="font-display text-2xl font-semibold tracking-tight text-white/35 transition-colors hover:text-[#f5d77a] sm:text-3xl"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function TrustedBy() {
  return (
    <section className="relative border-y border-white/5 bg-[oklch(0.11_0.005_270)] py-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-white/40"
      >
        Trusted by forward-thinking teams
      </motion.p>

      <div className="relative flex flex-col gap-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <Row />
        </div>
        <div className="flex animate-marquee-reverse whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <Row reverse />
        </div>
      </div>
    </section>
  );
}
