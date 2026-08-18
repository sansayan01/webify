"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  result: string;
  year: string;
  image: string;
  href: string; // placeholder link — user will provide later
};

const PROJECTS: Project[] = [
  {
    id: "aurora",
    title: "Aurora Finance",
    category: "Fintech · Dashboard",
    result: "40% faster load · +22% activation",
    year: "2024",
    image: "/projects/project-1.png",
    href: "#", // placeholder
  },
  {
    id: "nova",
    title: "Nova Commerce",
    category: "E-commerce · Storefront",
    result: "+38% conversion · 2.1× AOV",
    year: "2024",
    image: "/projects/project-2.png",
    href: "#", // placeholder
  },
  {
    id: "vertex",
    title: "Vertex Studio",
    category: "3D · Brand Site",
    result: "Awwwards SOTD · 4.9★",
    year: "2023",
    image: "/projects/project-3.png",
    href: "#", // placeholder
  },
  {
    id: "lumen",
    title: "Lumen SaaS",
    category: "SaaS · Platform",
    result: "−54% bounce · +61% signups",
    year: "2023",
    image: "/projects/project-4.png",
    href: "#", // placeholder
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    damping: 24,
    stiffness: 220,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    damping: 24,
    stiffness: 220,
  });

  // image parallax
  const imgX = useTransform(mx, [0, 1], [12, -12]);
  const imgY = useTransform(my, [0, 1], [12, -12]);
  const imgScale = useTransform(mx, [0, 1], [1.05, 1.15]);

  // glare
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);

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

  const isAlt = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={isAlt ? "md:mt-12" : ""}
    >
      <a
        href={project.href}
        target={project.href !== "#" ? "_blank" : undefined}
        rel={project.href !== "#" ? "noopener noreferrer" : undefined}
        className="group block [perspective:1400px]"
        aria-label={`${project.title} — ${project.category}`}
      >
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="edge relative overflow-hidden rounded-[2rem]"
        >
          {/* image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.image}
              alt={`${project.title} project mockup`}
              style={{ x: imgX, y: imgY, scale: imgScale }}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.005_270)] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

            {/* glare */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([gx, gy]) =>
                    `radial-gradient(600px circle at ${gx} ${gy}, rgba(245,215,122,0.22), transparent 40%)`
                ),
              }}
            />

            {/* year badge */}
            <span
              className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur"
              style={{ transform: "translateZ(60px)" }}
            >
              {project.year}
            </span>

            {/* hover CTA */}
            <motion.span
              className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d77a] to-[#d4af37] text-black shadow-[0_8px_30px_rgba(212,175,55,0.5)]"
              style={{ transform: "translateZ(80px)" }}
              initial={{ scale: 0.6, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              animate={{}}
            >
              <ArrowUpRight size={20} />
            </motion.span>
          </div>

          {/* meta */}
          <div
            className="flex items-end justify-between gap-4 p-6 sm:p-8"
            style={{ transform: "translateZ(40px)" }}
          >
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#f5d77a]/80">
                {project.category}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {project.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-white/40">
                Result
              </span>
              <span className="block text-sm font-semibold text-white/85">
                {project.result}
              </span>
            </div>
          </div>
        </motion.div>
      </a>
    </motion.article>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#f5d77a]/80">
              Selected work
            </span>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Work that{" "}
              <span className="text-gold-gradient">moves metrics</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55 sm:text-base">
            A peek at recent launches. Hover to tilt, click to view. Final
            project links will be dropped in soon.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* footer note */}
        <div className="mt-14 flex items-center justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10"
          >
            See full case studies
            <ExternalLink
              size={14}
              className="text-[#f5d77a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
