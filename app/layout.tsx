import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

// 1. Configure fonts with explicit fallbacks
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "variable", // Ensure variable weight is loaded
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Blue Note",
  description: "Jazz Discovery Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 2. Apply font variables directly to the HTML tag to ensure global availability */}
      <body className={`${fraunces.variable} ${instrument.variable} bg-jazz-void antialiased selection:bg-jazz-ember selection:text-jazz-bone`}>
        {/* Noise Overlay */}
        <div className="bg-noise fixed inset-0 pointer-events-none z-50 opacity-[0.03]" />
        
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}