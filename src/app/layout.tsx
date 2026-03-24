import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OmniVox — Local AI Dictation for Windows",
  description:
    "Privacy-first speech-to-text powered by Whisper AI. Zero cloud. Zero compromise. Your voice never leaves your machine.",
  keywords: [
    "dictation",
    "speech to text",
    "whisper",
    "local AI",
    "privacy",
    "windows",
    "transcription",
  ],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
