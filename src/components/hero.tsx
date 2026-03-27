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
              d="M -300 660 C -100 550 -50 250 80 100 C 180 -20 350 -30 480 80 C 620 200 400 420 640 510 C 880 600 1250 680 1700 740"
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

          <g filter="url(#textGlow)" opacity="0.6">
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

      {/* OmniVox pill — anchored at the curve's focal point */}
      <div className="absolute bottom-[12%] sm:bottom-[14%] left-[44%] -translate-x-1/2">
        <OmniVoxPill />
      </div>
    </div>
  );
}

const negations = [
  {
    label: "No cloud.",
    description:
      "100% on-device Whisper AI. Your voice data never touches a server.",
  },
  {
    label: "No subscription.",
    description: "Currently free. No accounts, no subscriptions, just a one-time fee when pricing launches.",
  },
  {
    label: "No bloat.",
    description: "~80MB download. Extract and run. That\u2019s it.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
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
    <section className="relative flex flex-col pt-20 overflow-hidden lg:min-h-screen">
      {/* Editorial two-column content */}
      <div className="flex-1 flex items-start lg:items-center pt-2 lg:pt-0">
        <div className="max-w-7xl mx-auto px-6 w-full py-4 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
            {/* Left: Headline + Subtitle + CTAs */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              <motion.div variants={slideIn}>
                <Badge
                  variant="outline"
                  className="mb-5 px-3 py-1.5 text-xs font-medium tracking-wide border-primary/20 text-primary bg-primary/5"
                >
                  Local AI Dictation for Windows
                </Badge>
              </motion.div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl font-bold tracking-tight leading-[1.1]">
                <motion.span variants={slideIn} className="block">
                  Dictate at the
                </motion.span>
                <motion.span variants={slideIn} className="block text-primary">
                  speed of light.
                </motion.span>
                <motion.span variants={slideIn} className="block text-muted-foreground/70 text-[0.55em]">
                  With no monthly subscription.
                </motion.span>
              </h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed"
              >
                OmniVox transcribes speech to text entirely on your device using
                Whisper AI. Smart text processing, voice commands, context modes
                that switch per app — all local, all private.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="#download"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 px-6 h-11 text-sm font-semibold shadow-lg shadow-primary/15"
                  )}
                >
                  <Download className="size-4" />
                  Download for Windows
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Negation value props */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.7 },
                },
              }}
              className="lg:col-span-5 flex flex-col justify-center gap-6 lg:gap-8 lg:border-l lg:border-border lg:pl-12"
            >
              {negations.map((item) => (
                <motion.div key={item.label} variants={fadeUp}>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold tracking-tight text-primary">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dictation showcase — flowing text loop + animated pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        className="relative flex-shrink-0 -mt-8 lg:-mt-16"
      >
        <DictationShowcase />
      </motion.div>
    </section>
  );
}
