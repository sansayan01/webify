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
  href: string; // live project URL
};

const PROJECTS: Project[] = [
  {
    id: "microflow-pro",
    title: "MicroFlow Pro",
    category: "SaaS · Web App",
    result: "Marketing site & product platform",
    year: "2025",
    image: "https://image.thum.io/get/width/1200/url/https://microflow-pro.vercel.app/",
    href: "https://microflow-pro.vercel.app/",
  },
  {
    id: "hfburdwan",
    title: "HF Burdwan",
    category: "Education · Institute Site",
    result: "Brand site & student portal",
    year: "2025",
    image: "https://image.thum.io/get/width/1200/url/https://hfburdwan.in/",
    href: "https://hfburdwan.in/",
  },
  {
    id: "hfburdwan-dashboard",
    title: "HF Burdwan — Dashboard",
    category: "Admin · Web App",
    result: "Internal dashboard & analytics",
    year: "2025",
    image: "https://image.thum.io/get/width/1200/url/https://dashboard.hfburdwan.in/",
    href: "https://dashboard.hfburdwan.in/",
  },
  {
    id: "govindji-dental",
    title: "Govindji Dental",
    category: "Healthcare · Clinic Site",
    result: "Clinic site with appointment booking",
    year: "2025",
    image: "https://image.thum.io/get/width/1200/url/https://govindji-dental.vercel.app/",
    href: "https://govindji-dental.vercel.app/",
  },
  {
    id: "mcc",
    title: "MCC",
    category: "Community · Framer Site",
    result: "Community site & resources hub",
    year: "2025",
    image: "https://image.thum.io/get/width/1200/url/https://mcc.framer.wiki/",
    href: "https://mcc.framer.wiki/",
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
        className="group block"
        aria-label={`${project.title} — ${project.category}`}
      >
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY }}
          className="edge relative overflow-hidden"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#e5e0d8] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2d2d2d]/40 via-transparent to-transparent" />

            {/* year badge */}
            <span
              className="absolute right-4 top-4 border-2 border-[#2d2d2d] bg-[#fff9c4] px-3 py-1 font-hand text-xs font-medium text-[#2d2d2d]"
            >
              {project.year}
            </span>

            {/* hover CTA */}
            <motion.span
              className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center bg-[#ff4d4d] text-white shadow-hard-sm"
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
          >
            <div>
              <span className="font-hand text-xs font-medium uppercase tracking-[0.2em] text-[#ff4d4d]/80">
                {project.category}
              </span>
              <h3 className="mt-2 font-marker text-3xl font-bold tracking-tight text-[#2d2d2d] sm:text-4xl">
                {project.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="block font-hand text-[11px] uppercase tracking-[0.2em] text-[#2d2d2d]/40">
                Result
              </span>
              <span className="block font-hand text-sm font-semibold text-[#2d2d2d]/85">
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
            <span className="font-hand text-xs font-medium uppercase tracking-[0.3em] text-[#ff4d4d]/80">
              Selected work
            </span>
            <h2 className="mt-3 max-w-xl font-marker text-4xl font-bold leading-[1.05] tracking-tight text-[#2d2d2d] sm:text-5xl">
              Work that{" "}
              <span className="text-[#ff4d4d]">moves metrics</span>.
            </h2>
          </div>
          <p className="max-w-sm font-hand text-sm text-[#2d2d2d]/60 sm:text-base">
            A peek at recent launches. Hover to tilt, click to open the live
            site.
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
            className="group inline-flex items-center gap-2 border-2 border-[#2d2d2d] bg-white px-6 py-3 font-hand text-sm font-medium text-[#2d2d2d] shadow-hard-sm transition-all hover:translate-x-1 hover:translate-y-1"
          >
            See full case studies
            <ExternalLink
              size={14}
              className="text-[#ff4d4d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
