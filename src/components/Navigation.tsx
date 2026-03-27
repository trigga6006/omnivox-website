"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = ["Product", "Individuals", "Business", "Resources"] as const;

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] pt-[65px]">
      <div className="mx-auto max-w-[1360px] flex items-center justify-between px-6 py-2.5 backdrop-blur-sm" style={{ backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--nav-border)" }}>
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/683215c6f233131a07d8bafc_navbar_logo.svg"
            alt="Vox Logo"
            width={80}
            height={23}
            priority
          />
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((label) => (
            <Link
              key={label}
              href="#"
              className="text-base font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--foreground)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right-side CTA buttons — hidden on mobile */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Download for Windows */}
          <Link
            href="#"
            className="flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-base font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: "var(--foreground)", backgroundColor: "var(--purple)", color: "var(--foreground)" }}
          >
            <WindowsIcon />
            Download for Windows
          </Link>
        </div>

        {/* Mobile hamburger placeholder */}
        <button
          type="button"
          className="flex size-10 items-center justify-center lg:hidden"
          aria-label="Open menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--foreground)" }}
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

/** Small Windows-style 4-square grid icon */
function WindowsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}
