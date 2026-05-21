import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-barlow", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Porsche 911 GT3 RS — Developer Portfolio",
  description: "A high-performance developer portfolio built with the precision of a Porsche 911 GT3 RS. Showcasing projects, skills, and engineering excellence.",
  keywords: ["developer", "portfolio", "3D", "Porsche", "React", "Three.js", "creative developer"],
  openGraph: {
    title: "Porsche 911 GT3 RS — Developer Portfolio",
    description: "Precision-engineered developer portfolio with 3D visuals and cinematic animations.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${barlowCondensed.variable} ${dmSans.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
