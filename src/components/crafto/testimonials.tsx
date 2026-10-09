"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const QUOTES = [
  {
    quote:
      "Hamari coaching ki website pe ab admissions ke liye log khud call kar rahe hain. Pehle sirf pamphlets bant'e the — ab Google pe top par aa gaye.",
    name: "Rahul Verma",
    role: "Director, BrightMinds Coaching, Pune",
  },
  {
    quote:
      "Our clinic's old site looked like it was made in 2010. Crafto built something patients actually trust — bookings doubled in two months.",
    name: "Dr. Anjali Deshmukh",
    role: "Owner, Govindji Dental Care",
  },
  {
    quote:
      "Mere boutique ke liye bilingual site chahiye thi — Hindi aur English dono. They understood exactly what a local brand needs. Shandar kaam.",
    name: "Priya Nair",
    role: "Founder, Sutraa Boutique, Kochi",
  },
  {
    quote:
      "From our sweet shop in Lucknow to orders across UP — the website changed everything. Simple, fast, and our customers love it.",
    name: "Mohammed Faiz",
    role: "Owner, Royal Mishthan Bhandar",
  },
];

function QuoteCard({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <figure className="edge relative w-[88vw] shrink-0 overflow-hidden p-8 sm:w-[28rem]" style={{ background: "#fff9c4" }}>
      <div className="relative flex items-center gap-1 text-[#ff4d4d]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <blockquote className="relative mt-5 font-hand text-lg font-medium leading-snug text-[#2d2d2d] sm:text-xl">
        “{q.quote}”
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d5da1] font-marker text-sm font-bold text-white">
          {q.name.charAt(0)}
        </span>
        <span>
          <span className="block font-hand text-sm font-semibold text-[#2d2d2d]">
            {q.name}
          </span>
          <span className="block font-hand text-xs text-[#2d2d2d]/50">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const doubled = [...QUOTES, ...QUOTES, ...QUOTES];
  return (
    <section id="studio" className="relative overflow-hidden bg-[#e5e0d8] py-24 sm:py-32">
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
            <span className="font-hand text-xs font-medium uppercase tracking-[0.3em] text-[#ff4d4d]/80">
              Loved by business owners
            </span>
            <h2 className="mt-3 max-w-xl font-marker text-4xl font-bold leading-[1.05] tracking-tight text-[#2d2d2d] sm:text-5xl md:text-6xl">
              Don&apos;t take our{" "}
              <span className="text-[#ff4d4d]">word</span>.
            </h2>
          </div>
          <p className="max-w-sm font-hand text-sm text-[#2d2d2d]/60 sm:text-base">
            4.9 / 5 average rating across 200+ local businesses. We measure
            success in your outcomes — not deliverables.
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
          { v: "₹10L+", l: "Revenue influenced" },
          { v: "200+", l: "Businesses served" },
          { v: "4.9/5", l: "Avg client rating" },
          { v: "7 din", l: "Median time to v1" },
        ].map((s) => (
          <div
            key={s.l}
            className="border-2 border-[#2d2d2d] bg-white p-6 text-center shadow-hard-sm"
          >
            <div className="font-marker text-3xl font-bold text-[#ff4d4d] sm:text-4xl">
              {s.v}
            </div>
            <div className="mt-1 font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/50">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
