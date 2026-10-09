"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";

const SERVICES = [
  "Web Design",
  "Web Development",
  "3D / WebGL",
  "SEO",
  "Full rebuild",
];
const BUDGETS = ["₹25k – ₹75k", "₹75k – ₹2L", "₹2L – ₹5L", "₹5L+"];

const PLACEHOLDERS: Record<string, string> = {
  name: "Aarav Sharma",
  email: "you@business.in",
  message: "What do you need built? Tell us about your project…",
};

const WOBBLE = "255px 15px 225px 15px / 15px 225px 15px 255px";

function HandField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea";
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="mb-2 block font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/50"
      >
        {label}
      </label>
      <div className="border-2 border-[#2d2d2d] bg-white" style={{ borderRadius: WOBBLE }}>
        {as === "textarea" ? (
          <textarea
            id={name}
            name={name}
            required={required}
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full resize-none bg-transparent px-4 py-3 font-hand text-base text-[#2d2d2d] outline-none placeholder-[#2d2d2d]/30"
            placeholder={
              PLACEHOLDERS[name] ??
              `Tell us about your ${label.toLowerCase()}…`
            }
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent px-4 py-3 font-hand text-base text-[#2d2d2d] outline-none placeholder-[#2d2d2d]/30"
            placeholder={
              PLACEHOLDERS[name] ?? `Your ${label.toLowerCase()}`
            }
          />
        )}
      </div>
    </div>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const headlineRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headlineRef, { once: true, margin: "-100px" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // Simulated send — wire to real backend later
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Message bhej diya — we'll reply within 24h.", {
      description: `${name || "Dost"}, check ${email || "your inbox"}.`,
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t-2 border-[#2d2d2d] bg-[#fdfbf7] px-4 pt-24 sm:pt-32"
    >
      {/* massive headline */}
      <div ref={headlineRef} className="mx-auto max-w-6xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-hand text-xs font-medium uppercase tracking-[0.3em] text-[#ff4d4d]/80"
        >
          Start a project
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-marker text-[18vw] font-bold leading-[0.88] tracking-tight sm:text-[12vw] lg:text-[10rem]"
        >
          <span className="text-[#2d2d2d]">LET&apos;S </span>
          <span className="text-[#ff4d4d]">BUILD.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl font-hand text-base text-[#2d2d2d]/60 sm:text-lg"
        >
          Tell us about your project. We reply to every serious inquiry within
          24 hours.
        </motion.p>
      </div>

      {/* form */}
      <form onSubmit={onSubmit} className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
        <HandField label="Your name" name="name" required value={name} onChange={setName} />
        <HandField label="Email" name="email" type="email" required value={email} onChange={setEmail} />

        {/* service selectors */}
        <div className="sm:col-span-2">
          <span className="mb-3 block font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/50">
            Service
          </span>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={
                  s === service
                    ? "border-2 border-[#2d2d2d] bg-[#ff4d4d] px-4 py-2 font-hand text-sm font-semibold text-white shadow-hard-sm transition-transform hover:-translate-y-0.5"
                    : "border-2 border-[#2d2d2d] bg-white px-4 py-2 font-hand text-sm text-[#2d2d2d]/60 transition-colors hover:text-[#2d2d2d]"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className="mb-3 block font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/50">
            Budget
          </span>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={
                  b === budget
                    ? "border-2 border-[#2d2d2d] bg-[#ff4d4d] px-4 py-2 font-hand text-sm font-semibold text-white shadow-hard-sm transition-transform hover:-translate-y-0.5"
                    : "border-2 border-[#2d2d2d] bg-white px-4 py-2 font-hand text-sm text-[#2d2d2d]/60 transition-colors hover:text-[#2d2d2d]"
                }
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <HandField label="Project details" name="message" required value={message} onChange={setMessage} as="textarea" />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            style={{ borderRadius: WOBBLE }}
            className="group relative inline-flex w-full items-center justify-center border-2 border-[#2d2d2d] bg-[#ff4d4d] px-8 py-4 font-hand text-sm font-semibold text-white shadow-hard transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-[#2d2d2d] disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Sending…" : "Send Project Brief"}
          </button>
        </div>
      </form>

      {/* direct email */}
      <div className="mx-auto mt-10 max-w-3xl text-center font-hand text-sm text-[#2d2d2d]/50">
        Prefer email?{" "}
        <a
          href="mailto:hello@crafto.studio"
          className="text-[#2d5da1] underline decoration-[#ff4d4d]/40 underline-offset-4 transition-colors hover:text-[#ff4d4d]"
        >
          hello@crafto.studio
        </a>
      </div>

      {/* FOOTER */}
      <footer className="mt-24 border-t-2 border-[#2d2d2d] bg-[#fdfbf7]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
            {/* brand */}
            <div className="max-w-sm">
              <a href="#top" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4d4d] font-marker text-lg font-bold text-white">
                  C
                </span>
                <span className="font-marker text-lg font-bold text-[#2d2d2d]">
                  Crafto
                </span>
              </a>
              <p className="mt-4 font-hand text-sm text-[#2d2d2d]/55">
                We craft immersive, high-performance digital experiences for
                brands that refuse to blend in.
              </p>
            </div>

            {/* link columns */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/40">
                  Studio
                </h4>
                <ul className="mt-4 space-y-2 font-hand text-sm">
                  {["About", "Process", "Work", "Careers"].map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[#2d2d2d]/60 transition-colors hover:text-[#ff4d4d]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/40">
                  Services
                </h4>
                <ul className="mt-4 space-y-2 font-hand text-sm">
                  {["Design", "Development", "3D / WebGL", "SEO"].map((l) => (
                    <li key={l}>
                      <a
                        href="#services"
                        className="text-[#2d2d2d]/60 transition-colors hover:text-[#ff4d4d]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-hand text-xs uppercase tracking-[0.2em] text-[#2d2d2d]/40">
                  Social
                </h4>
                <ul className="mt-4 space-y-2 font-hand text-sm">
                  {["Twitter / X", "LinkedIn", "Dribbble", "GitHub"].map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[#2d2d2d]/60 transition-colors hover:text-[#ff4d4d]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-[#2d2d2d]/15 pt-6 font-hand text-xs text-[#2d2d2d]/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Crafto Studio. All rights reserved.</p>
            <p>
              Crafted with{" "}
              <span className="text-[#ff4d4d]">obsession</span> in Next.js +
              Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
