"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Flowing text with OmniVox pill showcase ─────────────────────────────────

const FLOW_TEXT =
  "ok claude lets refactor this hook into a custom composable and add proper error boundaries · can you center these divs and fix the padding on mobile · I need you to write a unit test for the auth middleware before we merge · hey grab the response type from that API endpoint and make it generic · move this logic into a server action and cache the result · why is this useEffect firing twice on mount · ";

const CHAR_W = 10.5;
const TEXT_LEN = FLOW_TEXT.length * CHAR_W;

// ─── Pill waveform bars (bell-curve weighted, matches real app) ──────────────

const PILL_WEIGHTS = [
  0.25, 0.35, 0.48, 0.6, 0.72, 0.84, 0.92, 1.0, 1.0, 0.92, 0.84, 0.72, 0.6,
  0.48, 0.35, 0.25,
];

function PillWaveform({ recording }: { recording: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-7">
      {PILL_WEIGHTS.map((w, i) => (
        <div
          key={i}
          className={cn(
            "w-[3px] rounded-full",
            recording ? "bg-amber-400" : "bg-white/15"
          )}
          style={
            recording
              ? {
                  height: `${3 + w * 25}px`,
                  transformOrigin: "center",
                  animation: `pill-bar ${0.5 + (i % 4) * 0.2}s ease-in-out ${i * 0.05}s infinite alternate`,
                }
              : {
                  height: "3px",
                  transition: "height 400ms ease-out, background-color 300ms",
                }
          }
        />
      ))}
    </div>
  );
}

// ─── OmniVox floating pill — cycles through all UI states ────────────────────

const PILL_STATES = ["idle", "recording", "processing", "success"] as const;
type PillState = (typeof PILL_STATES)[number];
const PILL_DURATIONS: Record<PillState, number> = {
  idle: 2500,
  recording: 4000,
  processing: 2000,
  success: 2500,
};

function OmniVoxPill() {
  const [state, setState] = useState<PillState>("idle");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setState((s) => PILL_STATES[(PILL_STATES.indexOf(s) + 1) % PILL_STATES.length]);
      setElapsed(0);
    }, PILL_DURATIONS[state]);
    return () => clearTimeout(t);
  }, [state]);

  useEffect(() => {
    if (state !== "recording") return;
    const i = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(i);
  }, [state]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className={cn(
        "relative flex items-center rounded-full border transition-all duration-300",
        "backdrop-blur-2xl backdrop-saturate-150",
        "shadow-[0_4px_30px_rgba(0,0,0,0.35)]",
        "h-[52px] w-[320px] sm:w-[360px] px-4",
        state === "idle"
          ? "bg-[rgba(18,16,14,0.7)] border-white/[0.05]"
          : "bg-[rgba(18,16,14,0.82)] border-white/[0.08]"
      )}
    >
      {/* Left indicator */}
      <div className="w-[52px] flex-shrink-0 flex items-center justify-center">
        {state === "idle" && (
          <span className="font-serif text-sm text-white/60 italic tracking-wide">OV</span>
        )}
        {state === "recording" && (
          <span className="font-mono text-xs text-[oklch(0.72_0.16_22)] tabular-nums tracking-tight">
            {mm}:{ss}
          </span>
        )}
        {state === "processing" && (
          <svg className="size-4 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {state === "success" && (
          <svg className="size-4 text-[oklch(0.65_0.15_145)]" viewBox="0 0 16 16" fill="none" aria-hidden>
            <polyline points="3 8.5 6.5 12 13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        {(state === "idle" || state === "recording") && (
          <PillWaveform recording={state === "recording"} />
        )}
        {state === "processing" && (
          <span className="text-xs text-amber-400/80 tracking-wide">Transcribing…</span>
        )}
        {state === "success" && (
          <span className="text-xs text-white/70 truncate">
            can you center these divs and fix…
          </span>
        )}
      </div>

      {/* Right indicator */}
      <div className="w-9 flex-shrink-0 flex items-center justify-center">
        {state === "idle" && (
          <div className="h-2.5 w-2.5 rounded-full border border-white/20" />
        )}
        {state === "recording" && (
          <div className="relative flex items-center justify-center">
            <div className="absolute h-5 w-5 rounded-full bg-[oklch(0.52_0.22_18/0.2)] animate-[recording-pulse_2s_infinite]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.52_0.22_18)] shadow-[0_0_8px_oklch(0.52_0.22_18/0.5)]" />
          </div>
        )}
        {state === "processing" && (
          <div className="h-2 w-2 rounded-full bg-amber-400/60" />
        )}
        {state === "success" && (
          <div className="h-2 w-2 rounded-full bg-[oklch(0.65_0.15_145/0.6)]" />
        )}
      </div>

      {/* Shimmer overlay — processing state */}
      {state === "processing" && (
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}

// ─── Dictation showcase — flowing text loop + animated pill ──────────────────

function DictationShowcase() {
  const t1 = useRef<SVGTextPathElement>(null);
  const t2 = useRef<SVGTextPathElement>(null);
  const raf = useRef(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    let offset = 0;
    let prev = 0;

    const tick = (time: number) => {
      if (!prev) prev = time;
      offset -= 50 * (time - prev) / 1000;
      prev = time;
      if (offset < -TEXT_LEN) offset += TEXT_LEN;

      t1.current?.setAttribute("startOffset", String(offset));
      t2.current?.setAttribute("startOffset", String(offset + TEXT_LEN));
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[520px]">
      {/* Ambient glow behind pill */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_48%_78%,oklch(0.78_0.16_75/0.06)_0%,transparent_70%)]" />

      {/* SVG flowing text — single loop path */}
      {show && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1400 600"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          style={{ pointerEvents: "none", overflow: "visible" }}
        >
          <defs>
            <path
              id="flowLoop"
              d="M -300 660 C -100 500 -50 200 100 50 C 220 -60 400 -40 550 80 C 700 200 500 400 700 490 C 900 580 1250 670 1700 740"
              fill="none"
            />
            <filter id="textGlow" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#textGlow)" opacity="0.65">
            <text
              fill="#d4c9b0"
              fontSize="18"
              fontFamily="var(--font-geist-mono), ui-monospace, monospace"
              letterSpacing="0.03em"
            >
              <textPath ref={t1} href="#flowLoop">
                {FLOW_TEXT}
              </textPath>
            </text>
            <text
              fill="#d4c9b0"
              fontSize="18"
              fontFamily="var(--font-geist-mono), ui-monospace, monospace"
              letterSpacing="0.03em"
            >
              <textPath ref={t2} href="#flowLoop">
                {FLOW_TEXT}
              </textPath>
            </text>
          </g>
        </svg>
      )}

      {/* OmniVox pill — centered at the curve's crossing */}
      <div className="absolute bottom-[18%] sm:bottom-[20%] left-1/2 -translate-x-1/2">
        <OmniVoxPill />
      </div>
    </div>
  );
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const staggerCenter = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export function Hero() {
  return (
    <section className="relative flex flex-col pt-16 sm:pt-20 overflow-hidden lg:min-h-screen">
      {/* ── Centered hero content ── */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-6 lg:pt-0">
        <motion.div
          variants={staggerCenter}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="mb-6 px-3 py-1.5 text-xs font-medium tracking-wide border-primary/20 text-primary bg-primary/5"
            >
              Local AI Dictation for Windows
            </Badge>
          </motion.div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.08]">
            <motion.span variants={fadeUp} className="block">
              Dictate at the
            </motion.span>
            <motion.span variants={fadeUp} className="block text-primary italic">
              speed of light.
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed"
          >
            The voice-to-text AI that turns speech into clean, polished writing
            in every app. 100% on-device, zero cloud.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7">
            <a
              href="#download"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 px-8 h-12 text-sm font-semibold shadow-lg shadow-primary/15"
              )}
            >
              <Download className="size-4" />
              Download for Windows
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-xs text-muted-foreground/50 tracking-wide"
          >
            No cloud · No subscription · No bloat
          </motion.p>
        </motion.div>
      </div>

      {/* ── Dictation showcase — flowing text + pill ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="relative flex-shrink-0"
      >
        <DictationShowcase />
      </motion.div>
    </section>
  );
}
