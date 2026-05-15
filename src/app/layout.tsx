import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Resolve the canonical site URL across local dev, Vercel previews,
// and Vercel production. Set NEXT_PUBLIC_SITE_URL in your Vercel
// environment to lock to a custom domain (e.g. https://omnivox.app).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const TITLE = "OmniVox — Voice dictation that stays on your machine";
const DESCRIPTION =
  "Local-first voice dictation for the agentic age. Whisper + Qwen on your hardware, structured for Claude Code, Cursor, and Codex. No cloud, no API keys, no telemetry.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "OmniVox",
  authors: [{ name: "OmniVox" }],
  keywords: [
    "voice dictation",
    "speech to text",
    "local AI",
    "Whisper",
    "Qwen",
    "Claude Code",
    "Cursor",
    "Codex",
    "agentic dev",
    "privacy",
    "Windows",
    "macOS",
  ],
  // Favicons are auto-resolved by Next.js from the App Router file
  // convention: src/app/{favicon.ico, icon.svg, icon.png, apple-icon.png}.
  // Open Graph — Facebook, LinkedIn, Slack, Discord, iMessage
  openGraph: {
    type: "website",
    siteName: "OmniVox",
    title: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    locale: "en_US",
    // The OG image is auto-detected from src/app/opengraph-image.tsx
  },
  // Twitter / X cards
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@omnivox",
    // The Twitter image is auto-detected from src/app/twitter-image.tsx
  },
  // Misc nice-to-haves
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF3E2" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1208" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
