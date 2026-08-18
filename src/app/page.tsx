import { CustomCursor } from "@/components/crafto/custom-cursor";
import { Navbar } from "@/components/crafto/navbar";
import { Hero } from "@/components/crafto/hero";
import { TrustedBy } from "@/components/crafto/trusted-by";
import { Services } from "@/components/crafto/services";
import { Process } from "@/components/crafto/process";
import { Portfolio } from "@/components/crafto/portfolio";
import { Testimonials } from "@/components/crafto/testimonials";
import { Contact } from "@/components/crafto/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* film grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <CustomCursor />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
