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
          "flex w-full max-w-6xl items-center justify-between gap-4 border-2 border-[#2d2d2d] px-4 py-2.5 shadow-hard transition-all duration-500 sm:px-6 sm:py-3",
          scrolled
            ? "bg-white/90 backdrop-blur"
            : "bg-white/60 backdrop-blur-sm"
        )}
        style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2"
          aria-label="Crafto home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4d4d] text-white shadow-hard-sm">
            <span className="font-marker text-lg font-bold leading-none">
              C
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#2d5da1]" />
          </span>
          <span className="font-marker text-lg font-bold tracking-tight text-[#2d2d2d]">
            Crafto
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 font-hand text-sm text-[#2d2d2d]/70 transition-colors hover:text-[#2d2d2d]"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-[#ff4d4d] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <MagneticButton
            href="#contact"
            className="hidden bg-[#ff4d4d] px-5 py-2.5 text-sm text-white sm:inline-flex"
            strength={0.45}
            ariaLabel="Start a project"
          >
            <span className="relative z-10">Start a Project</span>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-[#2d2d2d] bg-white text-[#2d2d2d] md:hidden"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
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
            className="absolute left-4 right-4 top-20 z-[101] border-2 border-[#2d2d2d] bg-[#fff9c4] p-4 shadow-hard md:hidden"
            style={{ borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px" }}
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-hand text-base text-[#2d2d2d]/80 hover:bg-white/60 hover:text-[#2d2d2d]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-[#ff4d4d] px-4 py-3 text-center font-hand text-base font-semibold text-white"
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
