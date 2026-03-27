import type { Metadata } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Wispr Flow | Effortless Voice Dictation",
  description:
    "Flow makes writing quick and clear with seamless voice dictation. It is the fastest, smartest way to type with your voice.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-touch-icon.png",
  },
  openGraph: {
    title: "Wispr Flow | Effortless Voice Dictation",
    description:
      "Flow makes writing quick and clear with seamless voice dictation. It is the fastest, smartest way to type with your voice.",
    images: ["/seo/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-dark">
        {children}
      </body>
    </html>
  );
}
