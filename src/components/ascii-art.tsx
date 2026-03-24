"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── Shared animated ASCII block with living post-reveal effects ────────────

type AmbientMode = "breathe" | "equalizer" | "glow";

function AsciiBlock({
  art,
  className = "",
  ambient = "breathe",
}: {
  art: string;
  className?: string;
  ambient?: AmbientMode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [revealed, setRevealed] = useState(false);

  const lines = art.split("\n").filter((l) => l.length > 0);
  const totalLines = lines.length;
  const revealDuration = totalLines * 0.02 + 0.35;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(
      () => setRevealed(true),
      revealDuration * 1000 + 100
    );
    return () => clearTimeout(timer);
  }, [isInView, revealDuration]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center relative">
        {lines.map((line, i) => {
          const centerDistance = Math.abs(i - totalLines / 2) / (totalLines / 2);
          const ambientDelay =
            ambient === "equalizer"
              ? `${((i * 7 + 3) % 11) * 0.18}s`
              : ambient === "glow"
                ? `${centerDistance * 1.5}s`
                : `${i * 0.12}s`;
          const ambientDuration =
            ambient === "equalizer"
              ? `${1.8 + ((i * 3) % 5) * 0.3}s`
              : ambient === "glow"
                ? "3s"
                : `${3 + ((i * 5) % 7) * 0.4}s`;
          const ambientClass =
            ambient === "equalizer"
              ? "animate-ascii-eq"
              : ambient === "glow"
                ? "animate-ascii-glow"
                : "animate-ascii-breathe";

          return (
            <motion.div
              key={i}
              className="font-mono text-[6px] sm:text-[8px] md:text-[10px] leading-[1.15] whitespace-pre"
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: i % 2 === 0 ? -16 : 16 }
              }
              transition={{
                duration: 0.35,
                delay: i * 0.02,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span
                className={revealed ? ambientClass : ""}
                style={
                  revealed
                    ? ({
                        "--ascii-delay": ambientDelay,
                        "--ascii-duration": ambientDuration,
                        display: "inline-block",
                      } as React.CSSProperties)
                    : { display: "inline-block" }
                }
              >
                {line}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Waveform / Audio Visualization ─────────────────────────────────────────

const WAVEFORM_ART = `
                                          ░░░▒▒▓▓██▓▓▒▒░░░
                                    ░░▒▒▓▓██████████████▓▓▒▒░░
                               ░░▒▓████████████████████████████▓▒░░
                          ░░▒▓██████▓▓▒▒░░░░░░░░░░░░░░░░▒▒▓▓██████▓▒░░
                      ░░▒▓████▓▒░░                              ░░▒▓████▓▒░░
                   ░▒▓███▓▒░                                          ░▒▓███▓▒░
                ░▒▓██▓░░            ░░▒▒▓▓████████████▓▓▒▒░░            ░░▓██▓▒░
             ░▒███▓░           ░▒▓████████████████████████████▓▒░           ░▓███▒░
           ░▒██▓░          ░▒▓██████▓▓▒▒░░░░░░░░░░░░▒▒▓▓██████▓▒░          ░▓██▒░
         ░▒██▓░         ░▒████▓▒░░                        ░░▒▓████▒░         ░▓██▒░
        ░▓█▓░         ░▓███▓░                                  ░▓███▓░         ░▓█▓░
      ░▒██░         ░▒██▓░          ░░▒▒▓▓████████▓▓▒▒░░          ░▓██▒░         ░██▒░
     ░▓█▓░        ░▒██▓░         ░▒▓██████████████████████▓▒░         ░▓██▒░        ░▓█▓░
    ░██▓░        ░▓██░         ░▒████▓▓▒▒░░░░░░░░░░▒▒▓▓████▒░         ░██▓░        ░▓██░
   ░██▓░        ░██▓░        ░▓██▓▒░                    ░▒▓██▓░        ░▓██░        ░▓██░
  ░▓█▓░        ░▓█▓░        ░██▓░                          ░▓██░        ░▓█▓░        ░▓█▓░
  ░██▒         ░██▒        ░██▓░   ░░▒▓████████████▓▒░░   ░▓██░        ▒██░         ▒██░
 ░██▒         ░██▒        ░██▓░  ░▒████▓▓▒▒▒▒▒▒▓▓████▒░  ░▓██░        ▒██░         ▒██░
 ▒██░         ▒██░        ░██▒  ░▓██▓░░          ░░▓██▓░  ▒██░        ░██▒         ░██▒
 ▒██░         ▒██░        ░██▒  ░██▓░    ▒▓██▓▒    ░▓██░  ▒██░        ░██▒         ░██▒
 ▒██░         ▒██░        ░██▒  ░▓██▓░░          ░░▓██▓░  ▒██░        ░██▒         ░██▒
 ░██▒         ░██▒        ░██▓░  ░▒████▓▓▒▒▒▒▒▒▓▓████▒░  ░▓██░        ▒██░         ▒██░
  ░██▒         ░██▒        ░██▓░   ░░▒▓████████████▓▒░░   ░▓██░        ▒██░         ▒██░
  ░▓█▓░        ░▓█▓░        ░██▓░                          ░▓██░        ░▓█▓░        ░▓█▓░
   ░██▓░        ░██▓░        ░▓██▓▒░                    ░▒▓██▓░        ░▓██░        ░▓██░
    ░██▓░        ░▓██░         ░▒████▓▓▒▒░░░░░░░░▒▒▓▓████▒░         ░██▓░        ░▓██░
     ░▓█▓░        ░▒██▓░         ░▒▓██████████████████████▓▒░         ░▓██▒░        ░▓█▓░
      ░▒██░         ░▒██▓░          ░░▒▒▓▓████████▓▓▒▒░░          ░▓██▒░         ░██▒░
        ░▓█▓░         ░▓███▓░                                  ░▓███▓░         ░▓█▓░
         ░▒██▓░         ░▒████▓▒░░                        ░░▒▓████▒░         ░▓██▒░
           ░▒██▓░          ░▒▓██████▓▓▒▒░░░░░░░░░░░░▒▒▓▓██████▓▒░          ░▓██▒░
             ░▒███▓░           ░▒▓████████████████████████████▓▒░           ░▓███▒░
                ░▒▓██▓░░            ░░▒▒▓▓████████████▓▓▒▒░░            ░░▓██▓▒░
                   ░▒▓███▓▒░                                          ░▒▓███▓▒░
                      ░░▒▓████▓▒░░                              ░░▒▓████▓▒░░
                          ░░▒▓██████▓▓▒▒░░░░░░░░░░░░░░░░▒▒▓▓██████▓▒░░
                               ░░▒▓████████████████████████████▓▒░░
                                    ░░▒▒▓▓██████████████▓▓▒▒░░
                                          ░░░▒▒▓▓██▓▓▒▒░░░
`;

// ─── Sound Bars / Equalizer ─────────────────────────────────────────────────

const EQUALIZER_ART = `
  █             █                         █                         █             █
  █     █       █       █         █       █       █         █       █       █     █
  █     █   █   █   █   █    █    █   █   █   █   █    █    █   █   █   █   █     █
  █  █  █   █   █   █   █    █    █   █   █   █   █    █    █   █   █   █   █  █  █
  █  █  █   █   █   █   █  █ █ █  █   █   █   █   █  █ █ █  █   █   █   █   █  █  █
  █  █  █ █ █ █ █ █ █ █ █  █ █ █  █ █ █ █ █ █ █ █ █  █ █ █  █ █ █ █ █ █ █ █  █  █
  █  █  █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █  █  █
  █ ██ ██ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ ██ ██ █
  █ ██ ██ █ █ █ █ █ █ █ █ █████████ █ █ █ █ █ █ █ █████████ █ █ █ █ █ █ █ █ ██ ██ █
  ███████████████████████████████████████████████████████████████████████████████████
`;

// ─── Microphone ─────────────────────────────────────────────────────────────

const MICROPHONE_ART = `
                            ░░░▒▒▓▓██████▓▓▒▒░░░
                        ░▒▓████████████████████████▓▒░
                     ░▒████████████████████████████████▒░
                   ░▓████████████████████████████████████▓░
                  ▒██████████████████████████████████████████▒
                 ▓████████████████████████████████████████████▓
                ▓██████████████████████████████████████████████▓
               ▓████████████████████████████████████████████████▓
               █████████████████████████████████████████████████▓
               ██████████████████████████████████████████████████
               ██████████████████████████████████████████████████
               ██████████████████████████████████████████████████
               ██████████████████████████████████████████████████
               ██████████████████████████████████████████████████
               ▓████████████████████████████████████████████████▓
                ▓██████████████████████████████████████████████▓
                 ▓████████████████████████████████████████████▓
                  ▒██████████████████████████████████████████▒
                   ░▓████████████████████████████████████▓░
            ▓▓▒░     ░▒████████████████████████████████▒░     ░▒▓▓
           ▓████▓▒░      ░▒▓████████████████████████▓▒░      ░▒▓████▓
          ▓████████▓░         ░░▒▒▓▓████████▓▓▒▒░░         ░▓████████▓
          ▓██████████▓░                                   ░▓██████████▓
           ▓██████████▓▒░                               ░▒▓██████████▓
            ░▓██████████▓▒░                           ░▒▓██████████▓░
              ░▓███████████▓▒░                     ░▒▓███████████▓░
                ░▒▓███████████▓▓▒░░░░░░░░░░░░░▒▓▓███████████▓▒░
                    ░▒▓█████████████████████████████████▓▒░
                        ░░▒▓▓███████████████████████▓▒░░
                                ░░░▒▒▓▓▓▓▓▓▒▒░░░
                                    ░▓████▓░
                                    ░▓████▓░
                                    ░▓████▓░
                                    ░▓████▓░
                                    ░▓████▓░
                               ░▒▓██████████████▓▒░
                             ▒████████████████████████▒
                             ▓██████████████████████████▓
                              ░▒▓████████████████████▓▒░
`;

// ─── Horizontal line dividers ───────────────────────────────────────────────

const DIVIDER_TOP = `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

const DIVIDER_BOTTOM = `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

// ─── Exported Components ────────────────────────────────────────────────────

export function AsciiWaveform() {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_75/0.03)_0%,transparent_50%)]" />
      <AsciiBlock
        art={WAVEFORM_ART}
        ambient="breathe"
        className="text-primary/20 [text-shadow:0_0_20px_oklch(0.78_0.16_75/0.15)]"
      />
    </section>
  );
}

export function AsciiEqualizer() {
  return (
    <section className="py-8 lg:py-12 relative overflow-hidden">
      <AsciiBlock
        art={EQUALIZER_ART}
        ambient="equalizer"
        className="text-primary/25 [text-shadow:0_0_15px_oklch(0.78_0.16_75/0.2)]"
      />
    </section>
  );
}

export function AsciiMicrophone() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_75/0.04)_0%,transparent_40%)]" />
      <AsciiBlock
        art={MICROPHONE_ART}
        ambient="glow"
        className="text-primary/15 [text-shadow:0_0_25px_oklch(0.78_0.16_75/0.12)]"
      />
    </section>
  );
}

export function AsciiDivider({ variant = "top" }: { variant?: "top" | "bottom" }) {
  return (
    <div className="overflow-hidden">
      <AsciiBlock
        art={variant === "top" ? DIVIDER_TOP : DIVIDER_BOTTOM}
        className="text-primary/15"
      />
    </div>
  );
}
