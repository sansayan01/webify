import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "sonner";

const kalam = Kalam({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Crafto — Websites That Help Local Businesses Grow",
  description:
    "Crafto is a web agency that helps local businesses grow with websites that turn visitors into customers. Hand-crafted, fast, and made for your community.",
  keywords: [
    "Crafto",
    "local business websites",
    "web design",
    "small business",
    "local SEO",
    "Next.js agency",
  ],
  authors: [{ name: "Crafto Studio" }],
  openGraph: {
    title: "Crafto — Websites That Help Local Businesses Grow",
    description:
      "A web agency building websites that help local businesses get found and grow.",
    siteName: "Crafto",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafto — Websites That Help Local Businesses Grow",
    description:
      "A web agency building websites that help local businesses get found and grow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kalam.variable} ${patrickHand.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SonnerToaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              border: "3px solid #2d2d2d",
              borderRadius: "12px",
              color: "#2d2d2d",
              fontFamily: "var(--font-hand), 'Patrick Hand', cursive",
              boxShadow: "4px 4px 0px 0px #2d2d2d",
            },
          }}
        />
      </body>
    </html>
  );
}
