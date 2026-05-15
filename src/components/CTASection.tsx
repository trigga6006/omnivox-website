import { ShieldCheck, WifiOff, Lock, Cpu, HardDrive, Globe } from "lucide-react";
import { WindowsLogo, AppleLogo } from "./AppLogos";
import {
  APP_VERSION,
  RELEASE_DATE,
  DOWNLOAD_WIN,
  WIN_INSTALLER_SIZE,
  WIN_INSTALLER_SHA256,
  RELEASES_URL,
  LATEST_RELEASE_URL,
} from "@/lib/downloads";

const SHORT_SHA = WIN_INSTALLER_SHA256.slice(0, 16);
const INSTALLER_FILENAME = `OmniVox-v${APP_VERSION}-x86_64-windows-setup.exe`;

export function CTASection() {
  return (
    <section
      id="privacy"
      className="relative overflow-hidden px-6 py-32 grain-overlay"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Soft warm ambient washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 0%, rgba(232,120,44,0.08), transparent 70%), radial-gradient(700px 400px at 50% 100%, rgba(216,84,29,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center">
        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
          style={{
            backgroundColor: "var(--paper)",
            border: "1px solid var(--border)",
            color: "var(--ember)",
          }}
        >
          <span
            className="inline-block size-1.5 rounded-full"
            style={{ backgroundColor: "var(--ember)" }}
          />
          Privacy by architecture
        </span>

        {/* Headline (anchor target so #download lands here) */}
        <h2
          id="download"
          className="font-display mt-8 max-w-[18ch] scroll-mt-32 text-center text-[64px] leading-[0.92] font-medium tracking-[-0.025em] sm:text-[84px] lg:text-[112px]"
          style={{ color: "var(--foreground)" }}
        >
          Your voice.{" "}
          <span
            className="font-display-italic"
            style={{ color: "var(--ember)" }}
          >
            Your machine.
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="mt-8 max-w-[600px] text-center text-[17px] md:text-lg leading-[1.55]"
          style={{ color: "var(--dark-secondary)" }}
        >
          No cloud round-trip. No API keys. No telemetry. Whisper and Qwen run
          on your hardware — air-gap your laptop and OmniVox still works.
        </p>

        {/* Primary download card */}
        <div
          className="mt-12 w-full max-w-[720px] overflow-hidden rounded-3xl"
          style={{
            backgroundColor: "var(--paper)",
            border: "1px solid var(--border)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -28px rgba(31,20,10,0.28), 0 12px 24px -8px rgba(31,20,10,0.15)",
          }}
        >
          {/* Top — version + release notes link */}
          <div
            className="flex items-center justify-between px-7 py-4"
            style={{
              backgroundColor: "var(--cream-dark)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ember)" }}
              >
                Latest · v{APP_VERSION}
              </span>
              <span
                className="font-mono text-[11px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                · {RELEASE_DATE}
              </span>
            </div>
            <a
              href={LATEST_RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted-foreground)" }}
            >
              Release notes →
            </a>
          </div>

          {/* Body — primary CTA */}
          <div className="flex flex-col items-center px-7 py-9 md:py-11">
            <a
              href={DOWNLOAD_WIN}
              download
              className="group inline-flex items-center gap-3 rounded-full px-9 py-4 text-[16px] font-semibold transition-all hover:translate-y-[-1px]"
              style={{
                backgroundColor: "var(--ember)",
                color: "#FFFBF1",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.18) inset, 0 18px 32px -12px rgba(216,84,29,0.55), 0 6px 14px -4px rgba(216,84,29,0.35)",
              }}
            >
              <WindowsLogo className="size-[16px]" />
              Download for Windows
              <span
                className="ml-1 font-mono text-[12px] opacity-80"
                style={{ letterSpacing: "0.06em" }}
              >
                · {WIN_INSTALLER_SIZE}
              </span>
            </a>

            {/* File name */}
            <code
              className="mt-4 font-mono text-[11.5px]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {INSTALLER_FILENAME}
            </code>

            {/* SHA-256 verify line */}
            <div
              className="mt-7 flex flex-col items-center gap-2 rounded-2xl px-5 py-4 sm:flex-row sm:gap-4"
              style={{
                backgroundColor: "var(--cream-dark)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--ember)" }}
              >
                SHA-256
              </span>
              <code
                className="font-mono text-[11.5px] break-all"
                style={{ color: "var(--foreground)" }}
                title={WIN_INSTALLER_SHA256}
              >
                {SHORT_SHA}…{WIN_INSTALLER_SHA256.slice(-8)}
              </code>
              <a
                href={LATEST_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                style={{ color: "var(--muted-foreground)" }}
              >
                full hash →
              </a>
            </div>

            {/* PowerShell verify command — collapsible */}
            <details className="mt-3 w-full max-w-[540px] text-center">
              <summary
                className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                style={{ color: "var(--muted-foreground)" }}
              >
                Verify with PowerShell
              </summary>
              <pre
                className="mt-3 overflow-x-auto rounded-xl p-4 text-left font-mono text-[11.5px] leading-[1.6]"
                style={{
                  backgroundColor: "var(--ink)",
                  color: "#F5E9CC",
                }}
              >
                <span style={{ color: "rgba(245,233,204,0.5)" }}>
                  # PowerShell — paste in the directory you downloaded to
                </span>
                {"\n"}
                Get-FileHash{" "}
                <span style={{ color: "#FFB166" }}>
                  .\{INSTALLER_FILENAME}
                </span>{" "}
                -Algorithm SHA256
              </pre>
            </details>
          </div>

          {/* Footer — system requirements + alt platforms */}
          <div
            className="flex flex-col gap-5 px-7 py-5 md:flex-row md:items-center md:justify-between"
            style={{
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--cream-dark)",
            }}
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Req
                icon={<HardDrive className="size-3.5" />}
                label="Windows 10 / 11 (x64)"
              />
              <Req icon={<Cpu className="size-3.5" />} label="4 GB+ RAM" />
              <Req
                icon={<Globe className="size-3.5" />}
                label="No internet required"
              />
            </div>

            <div className="flex items-center gap-3">
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                style={{ color: "var(--foreground)" }}
              >
                <AppleLogo className="size-[12px]" />
                macOS · soon
              </a>
              <span style={{ color: "var(--muted-foreground)" }}>·</span>
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                style={{ color: "var(--muted-foreground)" }}
              >
                Linux · soon
              </a>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid w-full max-w-[820px] grid-cols-1 gap-4 md:grid-cols-3">
          <TrustItem
            icon={<WifiOff className="size-4" />}
            title="No cloud"
            body="Speech never leaves your device. Disconnect and it still runs."
          />
          <TrustItem
            icon={<Lock className="size-4" />}
            title="No keys"
            body="No accounts, no API tokens, no third-party billing surfaces."
          />
          <TrustItem
            icon={<ShieldCheck className="size-4" />}
            title="No telemetry"
            body="Zero analytics calls. We don't know you exist. That's the point."
          />
        </div>
      </div>
    </section>
  );
}

function Req({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12.5px]"
      style={{ color: "var(--dark-secondary)" }}
    >
      <span style={{ color: "var(--ember)" }}>{icon}</span>
      {label}
    </span>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl p-5"
      style={{
        backgroundColor: "var(--paper)",
        border: "1px solid var(--border)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 20px -16px rgba(31,20,10,0.15)",
      }}
    >
      <span
        className="flex size-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "rgba(232,120,44,0.12)",
          color: "var(--ember)",
        }}
      >
        {icon}
      </span>
      <span className="font-display text-[18px] font-medium" style={{ color: "var(--foreground)" }}>
        {title}
      </span>
      <span className="text-[13px] leading-snug" style={{ color: "var(--dark-secondary)" }}>
        {body}
      </span>
    </div>
  );
}
