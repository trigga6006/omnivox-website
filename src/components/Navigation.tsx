"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WindowsLogo } from "./AppLogos";
import { DOWNLOAD_WIN } from "@/lib/downloads";

const SCROLL_THRESHOLD = 80;

const NAV_LINKS = [
  { label: "How it works", href: "#workflow" },
  { label: "Structured Mode", href: "#structured" },
  { label: "For agents", href: "#agentic" },
  { label: "FAQ", href: "#faq" },
];

export function Navigation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-3 left-0 right-0 z-[999] transition-all duration-300 px-4"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-12px)",
      }}
    >
      <div
        className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full px-5 py-2.5 backdrop-blur-md"
        style={{
          backgroundColor: "var(--nav-bg)",
          border: "1px solid var(--nav-border)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.6) inset, 0 14px 28px -16px rgba(31,20,10,0.18)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/omnivox-logo.svg"
            alt="OmniVox"
            width={26}
            height={26}
            priority
          />
          <span
            className="font-display text-[19px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--foreground)" }}
          >
            OmniVox
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium transition-colors hover:opacity-100"
              style={{ color: "var(--muted-foreground)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right-side CTA — direct installer download */}
        <a
          href={DOWNLOAD_WIN}
          download
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all hover:translate-y-[-1px]"
          style={{
            backgroundColor: "var(--ember)",
            color: "#FFFBF1",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.18) inset, 0 8px 16px -8px rgba(216,84,29,0.55)",
          }}
        >
          <WindowsLogo className="size-3.5 shrink-0" />
          Download
        </a>
      </div>
    </nav>
  );
}
