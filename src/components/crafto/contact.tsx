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
const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+"];

function GlowingField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea";
}) {
  const id = name;
  const shared =
    "peer w-full resize-none border-0 border-b border-white/15 bg-transparent pb-3 pt-6 text-base text-white placeholder-transparent outline-none transition-colors focus:border-[#f5d77a]";

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-[0.2em] text-white/40 transition-all duration-300 peer-focus:text-[#f5d77a] peer-[:not(:placeholder-shown)]:text-[#f5d77a]"
      >
        {label}
      </label>
      {/* glow underline */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#f5d77a] to-transparent transition-all duration-300 peer-focus:w-full" />
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder || " "}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder || " "}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
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
    toast.success("Message sent — we'll reply within 24h.", {
      description: `${name || "Friend"}, check ${email || "your inbox"}.`,
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-[oklch(0.10_0.005_270)] px-4 pt-24 sm:pt-32"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="ambient-glow left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 bg-[#d4af37]/18" />
        <div className="ambient-glow right-[-10%] bottom-1/4 h-[360px] w-[360px] bg-[#b8932f]/12" />
      </div>

      {/* massive headline */}
      <div
        ref={headlineRef}
        className="mx-auto max-w-6xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-[#f5d77a]/80"
        >
          Start a project
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-[18vw] font-extrabold leading-[0.88] tracking-tight sm:text-[12vw] lg:text-[10rem]"
        >
          <span className="text-chrome-gradient">LET&apos;S </span>
          <span className="text-gold-gradient">BUILD.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-balance text-base text-white/60 sm:text-lg"
        >
          Tell us about your project. We reply to every serious inquiry within
          24 hours.
        </motion.p>
      </div>

      {/* form */}
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2"
      >
        <GlowingField
          label="Your name"
          name="name"
          required
          value={name}
          onChange={setName}
        />
        <GlowingField
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={setEmail}
        />

        {/* service + budget selectors */}
        <div className="sm:col-span-2">
          <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-white/40">
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
                    ? "rounded-full border border-[#f5d77a] bg-[#f5d77a]/15 px-4 py-2 text-sm text-[#f5d77a]"
                    : "rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-white/40">
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
                    ? "rounded-full border border-[#f5d77a] bg-[#f5d77a]/15 px-4 py-2 text-sm text-[#f5d77a]"
                    : "rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
                }
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <GlowingField
            label="Project details"
            name="message"
            required
            value={message}
            onChange={setMessage}
            as="textarea"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#f5d77a] to-[#d4af37] px-8 py-4 text-sm font-semibold text-black transition-all hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] disabled:opacity-60 sm:w-auto"
          >
            <span className="relative z-10">
              {submitting ? "Sending…" : "Send Project Brief"}
            </span>
            <span className="absolute inset-0 -translate-x-[120%] bg-white/45 transition-transform duration-700 ease-out group-hover:translate-x-[120%] [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]" />
          </button>
        </div>
      </form>

      {/* direct email */}
      <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-white/40">
        Prefer email?{" "}
        <a
          href="mailto:hello@crafto.studio"
          className="text-white/70 underline decoration-[#f5d77a]/40 underline-offset-4 transition-colors hover:text-[#f5d77a]"
        >
          hello@crafto.studio
        </a>
      </div>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-white/5 bg-[oklch(0.08_0.005_270)]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
            {/* brand */}
            <div className="max-w-sm">
              <a href="#top" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f5d77a] to-[#b8932f] font-display text-lg font-extrabold text-black">
                  C
                </span>
                <span className="font-display text-lg font-bold text-white">
                  Crafto
                </span>
              </a>
              <p className="mt-4 text-sm text-white/45">
                We craft immersive, high-performance digital experiences for
                brands that refuse to blend in.
              </p>
            </div>

            {/* link columns */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Studio
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {["About", "Process", "Work", "Careers"].map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/60 transition-colors hover:text-[#f5d77a]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Services
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {["Design", "Development", "3D / WebGL", "SEO"].map((l) => (
                    <li key={l}>
                      <a
                        href="#services"
                        className="text-white/60 transition-colors hover:text-[#f5d77a]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Social
                </h4>
                <ul className="mt-4 space-y-2 text-sm">
                  {["Twitter / X", "LinkedIn", "Dribbble", "GitHub"].map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/60 transition-colors hover:text-[#f5d77a]"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Crafto Studio. All rights reserved.</p>
            <p>
              Crafted with{" "}
              <span className="text-[#f5d77a]">obsession</span> in Next.js +
              Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
