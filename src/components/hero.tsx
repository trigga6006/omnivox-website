"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Flowing text stream — luminous arcs of dictated text ────────────────────

const FLOW_PRIMARY =
  "ok claude lets refactor this hook into a custom composable and add proper error boundaries · can you center these divs and fix the padding on mobile · I need you to write a unit test for the auth middleware before we merge · hey grab the response type from that API endpoint and make it generic · ";

const FLOW_SECONDARY =
  "move this logic into a server action and cache the result · add a loading skeleton to the dashboard while the query resolves · pull the latest from main and rebase our feature branch on top · why is this useEffect firing twice on mount · ";

const PRI_CW = 12.2; // char width at fontSize 20 + letterSpacing
const SEC_CW = 9.8; // char width at fontSize 16 + letterSpacing
const PRI_LEN = FLOW_PRIMARY.length * PRI_CW;
const SEC_LEN = FLOW_SECONDARY.length * SEC_CW;

function FlowingTextStream() {
  const p1 = useRef<SVGTextPathElement>(null);
  const p2 = useRef<SVGTextPathElement>(null);
  const s1 = useRef<SVGTextPathElement>(null);
  const s2 = useRef<SVGTextPathElement>(null);
  const raf = useRef(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    let offP = 0;
    let offS = 0;
    let prev = 0;

    const tick = (time: number) => {
      if (!prev) prev = time;
      const dt = (time - prev) / 1000;
      prev = time;

      offP -= 42 * dt; // primary speed
      offS -= 56 * dt; // secondary — slightly faster for parallax

      if (offP < -PRI_LEN) offP += PRI_LEN;
      if (offS < -SEC_LEN) offS += SEC_LEN;

      p1.current?.setAttribute("startOffset", String(offP));
      p2.current?.setAttribute("startOffset", String(offP + PRI_LEN));
      s1.current?.setAttribute("startOffset", String(offS));
      s2.current?.setAttribute("startOffset", String(offS + SEC_LEN));

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  if (!show) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full hidden md:block z-[1]"
      viewBox="0 0 1400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ pointerEvents: "none", overflow: "visible" }}
    >
      <defs>
        {/* Primary arc — sweeps from upper-left down through center to lower-right */}
        <path
          id="flowArc1"
          d="M -500 -40 C 0 40 300 220 700 270 C 1100 320 1400 200 1900 20"
          fill="none"
        />
        {/* Secondary arc — counter-curve, lower-left up through center to upper-right */}
        <path
          id="flowArc2"
          d="M -400 440 C 0 280 350 40 700 -10 C 1050 -60 1400 160 1900 380"
          fill="none"
        />

        {/* Warm glow filter — blurs then composites over crisp text */}
        <filter id="flowGlow" x="-15%" y="-40%" width="130%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Primary layer — warm cream, large text, glowing ── */}
      <g filter="url(#flowGlow)">
        <animate
          attributeName="opacity"
          values="0.5;0.7;0.5"
          dur="8s"
          repeatCount="indefinite"
        />
        <text
          fill="#e8dfd0"
          fontSize="20"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          letterSpacing="0.04em"
        >
          <textPath ref={p1} href="#flowArc1">
            {FLOW_PRIMARY}
          </textPath>
        </text>
        <text
          fill="#e8dfd0"
          fontSize="20"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          letterSpacing="0.04em"
        >
          <textPath ref={p2} href="#flowArc1">
            {FLOW_PRIMARY}
          </textPath>
        </text>
      </g>

      {/* ── Secondary layer — soft gold, smaller, subtler ── */}
      <g opacity="0.35">
        <text
          fill="#c9b07a"
          fontSize="16"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          letterSpacing="0.03em"
        >
          <textPath ref={s1} href="#flowArc2">
            {FLOW_SECONDARY}
          </textPath>
        </text>
        <text
          fill="#c9b07a"
          fontSize="16"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          letterSpacing="0.03em"
        >
          <textPath ref={s2} href="#flowArc2">
            {FLOW_SECONDARY}
          </textPath>
        </text>
      </g>
    </svg>
  );
}

// Pre-compute bar data — complex multi-frequency waveform
const BAR_COUNT = 140;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const x = i / (BAR_COUNT - 1);
  // Bell curve envelope — tallest in center, tapers at edges
  const envelope = Math.pow(Math.sin(x * Math.PI), 0.7);
  // Multi-frequency modulation for audio-like complexity
  const wave =
    0.4 +
    0.3 * Math.sin(x * Math.PI * 4.5) +
    0.2 * Math.sin(x * Math.PI * 11 + 0.8) +
    0.1 * Math.sin(x * Math.PI * 23 + 1.6);
  const height = Math.max(4, Math.round(envelope * wave * 100));
  return {
    height,
    delay: Math.round(((i * 3 + 7) % 19) * 5) / 100,
    duration: Math.round((20 + ((i * 7 + 3) % 11) * 3)) / 10,
  };
});

function MassiveWaveform() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px]">
      {/* Layered ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,oklch(0.78_0.16_75/0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_50%_48%,oklch(0.78_0.16_75/0.05)_0%,transparent_50%)]" />

      {/* Center baseline */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      {/* Flowing text stream — rendered behind bars, z-[1] */}
      <FlowingTextStream />

      {mounted && (
        <div className="relative z-[2] flex items-center justify-between w-full h-full px-2 sm:px-4 md:px-8 lg:px-12">
          {BARS.map((bar, i) => (
            <div
              key={i}
              className={cn(
                "relative h-full",
                i % 2 === 1 && "hidden sm:block"
              )}
              style={{ width: 3 }}
            >
              {/* Upper bar — extends from center upward */}
              <div
                className="absolute bottom-1/2 w-full rounded-t-full"
                style={{
                  height: `${bar.height * 0.45}%`,
                  background:
                    "linear-gradient(to top, oklch(0.78 0.16 75 / 0.75), oklch(0.78 0.16 75 / 0.06))",
                  boxShadow: "0 0 8px oklch(0.78 0.16 75 / 0.12)",
                  animation: `wave-bar ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
                  transformOrigin: "bottom",
                }}
              />
              {/* Lower bar — mirrored, shorter */}
              <div
                className="absolute top-1/2 w-full rounded-b-full"
                style={{
                  height: `${bar.height * 0.28}%`,
                  background:
                    "linear-gradient(to bottom, oklch(0.78 0.16 75 / 0.5), oklch(0.78 0.16 75 / 0.02))",
                  animation: `wave-bar ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
                  transformOrigin: "top",
                }}
              />
            </div>
          ))}
        </div>
      )}
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
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      {/* Editorial two-column content */}
      <div className="flex-1 flex items-start lg:items-center pt-8 lg:pt-0">
        <div className="max-w-7xl mx-auto px-6 w-full py-10 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
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

      {/* Waveform — below content, slightly overlapping upward */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        className="relative flex-shrink-0 -mt-8 lg:-mt-16"
      >
        <MassiveWaveform />
      </motion.div>
    </section>
  );
}
