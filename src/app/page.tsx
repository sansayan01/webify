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
