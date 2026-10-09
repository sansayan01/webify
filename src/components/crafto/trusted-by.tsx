"use client";

import React from "react";
import { motion } from "framer-motion";

const CLIENTS = [
  "Sharma ji ka Dhaba",
  "Patel Electronics",
  "BrightMinds Coaching",
  "Royal Mishthan Bhandar",
  "Sutraa Boutique",
  "Govindji Dental",
  "Kumar Tutorials",
  "Mehta Saree House",
  "Verma Auto Garage",
  "Reddy Realty",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`flex w-max gap-12 pr-12 ${reverse ? "rotate-0 sm:-rotate-1" : "rotate-0 sm:rotate-1"}`}>
      {[...CLIENTS, ...CLIENTS].map((c, i) => (
        <span
          key={`${c}-${i}`}
          className="font-marker text-2xl font-semibold tracking-tight text-[#2d2d2d]/40 transition-colors hover:text-[#ff4d4d] sm:text-3xl"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function TrustedBy() {
  return (
    <section className="relative border-y-2 border-[#2d2d2d] bg-[#e5e0d8] py-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center font-hand text-[11px] font-medium uppercase tracking-[0.3em] text-[#2d2d2d]/50"
      >
        Trusted by local businesses near you
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
