import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    heading: "Product",
    links: [
      { label: "Structured Mode", href: "#structured" },
      { label: "Features", href: "#features" },
      { label: "For agents", href: "#agentic" },
      { label: "Privacy", href: "#privacy" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    heading: "Download",
    links: [
      { label: "Windows", href: "#download" },
      { label: "macOS · beta", href: "#download" },
      { label: "Linux · soon", href: "#" },
      { label: "Release notes", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 pt-16 pb-10">
        <div
          className="grid grid-cols-2 gap-10 md:grid-cols-4"
          style={{ paddingBottom: 56 }}
        >
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/omnivox-logo.svg"
                alt="OmniVox"
                width={28}
                height={28}
              />
              <span
                className="font-display text-[20px] font-semibold tracking-[-0.02em]"
                style={{ color: "var(--foreground)" }}
              >
                OmniVox
              </span>
            </Link>
            <p
              className="max-w-[240px] text-[13.5px] leading-[1.55]"
              style={{ color: "var(--dark-secondary)" }}
            >
              Local-first voice dictation for the agentic age. Built so your
              words never leave your machine.
            </p>
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              v0.2.5 · Tauri · Whisper · Qwen3
            </span>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                style={{ color: "var(--ember)" }}
              >
                {col.heading}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] transition-colors hover:opacity-100"
                      style={{ color: "var(--foreground)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          className="flex flex-col items-start justify-between gap-3 pt-7 md:flex-row md:items-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-[12.5px]"
            style={{ color: "var(--muted-foreground)" }}
          >
            &copy; {new Date().getFullYear()} OmniVox · made in a quiet room
          </p>
          <p
            className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            no cloud · no api · no telemetry
          </p>
        </div>
      </div>
    </footer>
  );
}
