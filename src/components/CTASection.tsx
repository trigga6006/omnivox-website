import { ShieldCheck, WifiOff, Lock } from "lucide-react";
import { WindowsLogo, AppleLogo } from "./AppLogos";

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

        {/* Headline */}
        <h2
          id="download"
          className="font-display mt-8 max-w-[18ch] text-center text-[64px] leading-[0.92] font-medium tracking-[-0.025em] sm:text-[84px] lg:text-[120px]"
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

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all hover:translate-y-[-1px]"
            style={{
              backgroundColor: "var(--ember)",
              color: "#FFFBF1",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.18) inset, 0 14px 28px -12px rgba(216,84,29,0.55), 0 4px 10px -4px rgba(216,84,29,0.35)",
            }}
          >
            <WindowsLogo className="size-[15px]" />
            Download for Windows
            <svg
              className="ml-1 transition-transform group-hover:translate-x-0.5"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7H12 M8 3 L12 7 L8 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-[var(--secondary)]"
            style={{
              border: "1.5px solid var(--foreground)",
              color: "var(--foreground)",
              backgroundColor: "transparent",
            }}
          >
            <AppleLogo className="size-[15px]" />
            macOS
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em] rounded-full px-1.5 py-0.5"
              style={{
                backgroundColor: "var(--cream-dark)",
                color: "var(--muted-foreground)",
              }}
            >
              beta
            </span>
          </a>
        </div>

        <p
          className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.22em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          Linux soon · v0.2.5 · MIT-licensed core
        </p>

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
