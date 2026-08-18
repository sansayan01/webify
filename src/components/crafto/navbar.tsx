"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6 sm:py-3",
          scrolled
            ? "border-white/10 bg-[oklch(0.12_0.005_270/0.72)] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2"
          aria-label="Crafto home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d77a] to-[#b8932f] text-black shadow-[0_0_24px_rgba(212,175,55,0.45)]">
            <span className="font-display text-lg font-extrabold leading-none">
              C
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white/80" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Crafto
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#f5d77a] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <MagneticButton
            href="#contact"
            className="hidden px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#f5d77a] to-[#d4af37] sm:inline-flex"
            strength={0.45}
            ariaLabel="Start a project"
          >
            <span className="relative z-10">Start a Project</span>
            <span className="absolute inset-0 -z-0 translate-x-[-120%] bg-white/40 transition-transform duration-500 ease-out group-hover:translate-x-[120%] [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]" />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-20 z-[101] rounded-3xl border border-white/10 bg-[oklch(0.12_0.005_270/0.92)] p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-gradient-to-r from-[#f5d77a] to-[#d4af37] px-4 py-3 text-center text-base font-semibold text-black"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
