import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Crafto — We Craft Digital Perfection",
  description:
    "Crafto is a premium web agency designing high-performance, immersive digital experiences. We craft websites that turn visitors into customers.",
  keywords: [
    "Crafto",
    "web agency",
    "premium web design",
    "WebGL",
    "3D websites",
    "UI/UX",
    "Next.js agency",
  ],
  authors: [{ name: "Crafto Studio" }],
  openGraph: {
    title: "Crafto — We Craft Digital Perfection",
    description:
      "A premium web agency building immersive, high-performance digital experiences.",
    siteName: "Crafto",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafto — We Craft Digital Perfection",
    description:
      "A premium web agency building immersive, high-performance digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SonnerToaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0f0f12",
              border: "1px solid rgba(245,215,122,0.25)",
              color: "#f6f5f1",
            },
          }}
        />
      </body>
    </html>
  );
}
