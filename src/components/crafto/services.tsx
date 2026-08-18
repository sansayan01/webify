"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Palette,
  Code2,
  Boxes,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Services — premium asymmetrical Bento grid.
 * Each card has subtle 3D parallax based on mouse position + reveal animation.
 */

type Service = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  bullets: string[];
  span: string; // grid span classes
  accent: string; // gradient
};

const SERVICES: Service[] = [
  {
    id: "design",
    title: "UI / UX Design",
    desc: "Pixel-perfect interfaces tailored to your brand. We design systems that feel inevitable.",
    icon: <Palette size={22} />,
    bullets: ["Design Systems", "Prototyping", "Brand Identity"],
    span: "md:col-span-4 md:row-span-1",
    accent: "from-[#f5d77a]/25 to-transparent",
  },
  {
    id: "dev",
    title: "Web Development",
    desc: "Fast, secure, responsive sites built on modern technology.",
    icon: <Code2 size={22} />,
    bullets: ["Next.js", "Edge / Serverless", "Headless CMS"],
    span: "md:col-span-2 md:row-span-1",
    accent: "from-[#d4af37]/20 to-transparent",
  },
  {
    id: "3d",
    title: "3D & WebGL",
    desc: "Immersive 3D, shaders, and motion that elevate your brand to Awwwards-tier.",
    icon: <Boxes size={22} />,
    bullets: ["Three.js / R3F", "GSAP / Framer", "Shaders"],
    span: "md:col-span-2 md:row-span-1",
    accent: "from-[#b8932f]/25 to-transparent",
  },
  {
    id: "seo",
    title: "SEO & Optimization",
    desc: "We don't just build and leave — we help you rank and keep your site fast.",
    icon: <Search size={22} />,
    bullets: ["Core Web Vitals", "Technical SEO", "Analytics"],
    span: "md:col-span-4 md:row-span-1",
    accent: "from-[#6f5316]/25 to-transparent",
  },
];

function BentoCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), {
    damping: 22,
    stiffness: 220,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    damping: 22,
    stiffness: 220,
  });
  const bgX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const bgY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group edge relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8",
        service.span
      )}
    >
      {/* moving glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([gx, gy]) =>
              `radial-gradient(520px circle at ${gx} ${gy}, rgba(245,215,122,0.16), transparent 45%)`
          ),
        }}
      />
      {/* accent wash */}
      <div
        className={cn(
          "pointer-events-none absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-gradient-to-br opacity-60 blur-2xl",
          service.accent
        )}
      />

      {/* top row */}
      <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#f5d77a] backdrop-blur">
          {service.icon}
        </span>
        <span className="font-display text-sm font-semibold text-white/20">
          0{index + 1}
        </span>
      </div>

      {/* body */}
      <div className="relative mt-6" style={{ transform: "translateZ(30px)" }}>
        <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-2 max-w-md text-sm text-white/60 sm:text-base">
          {service.desc}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* corner arrow */}
      <span
        className="absolute bottom-6 right-6 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ transform: "translateZ(50px)" }}
        aria-hidden
      >
        <ArrowUpRight size={16} />
      </span>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative px-4 py-16 sm:py-24">
      {/* section header */}
      <div className="mx-auto mb-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#f5d77a]/80">
              What we do
            </span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Services engineered for{" "}
              <span className="text-gold-gradient">conversion</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55 sm:text-base">
            From first sketch to launch day and beyond — a full-stack craft
            studio under one roof. No handoffs, no compromise.
          </p>
        </motion.div>
      </div>

      {/* bento grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 [perspective:1400px] md:grid-cols-6 md:auto-rows-[260px]">
        {SERVICES.map((s, i) => (
          <BentoCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
