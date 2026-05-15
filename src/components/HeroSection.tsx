"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { WindowsLogo } from "./AppLogos";
import { APP_VERSION, DOWNLOAD_WIN, WIN_INSTALLER_SIZE } from "@/lib/downloads";

/* ─── OmniVox-style 16-bar waveform ─── */
const BAR_COUNT = 18;
const WEIGHTS = [
  0.25, 0.35, 0.48, 0.6, 0.72, 0.84, 0.92, 1.0, 1.0,
  1.0, 1.0, 0.92, 0.84, 0.72, 0.6, 0.48, 0.35, 0.25,
];
const PHASE_OFFSETS = [
  0, 0.15, 0.05, 0.22, 0.1, 0.28, 0.08, 0.18, 0.04,
  0.12, 0.25, 0.06, 0.2, 0.14, 0.03, 0.24, 0.09, 0.17,
];

function PillWaveform({ active }: { active: boolean }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const t = Date.now();
      const level = active
        ? 0.4 + Math.sin(t / 380) * 0.28 + Math.sin(t / 160) * 0.2 + Math.sin(t / 90) * 0.08
        : 0.05 + Math.sin(t / 1200) * 0.03;

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;
        const w = WEIGHTS[i];
        const p = PHASE_OFFSETS[i];
        const perBarNoise = Math.sin(t / (120 + i * 20) + i * 1.8) * 0.14;
        const h = active
          ? 3 + Math.min(1, level * w + p * level * 0.5 + perBarNoise) * 28
          : 3 + Math.min(1, level * w) * 6;
        bar.style.height = `${h}px`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);

  return (
    <div className="flex items-center justify-center" style={{ gap: 3, height: 32 }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className="rounded-full"
          style={{
            width: 3,
            height: 3,
            backgroundColor: active ? "#FFB166" : "rgba(255,235,200,0.22)",
            transition: active
              ? "background-color 300ms ease"
              : "background-color 600ms ease, height 400ms ease-out",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Pill state types ─── */
type PillState = "idle" | "recording" | "processing" | "structured";

/* ─── Auto-cycle demo sequence ─── */
const DEMO_SEQUENCE: { state: PillState; duration: number }[] = [
  { state: "idle", duration: 1200 },
  { state: "recording", duration: 5200 },
  { state: "processing", duration: 1800 },
  { state: "structured", duration: 4200 },
];

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ─── The structured prompt card on the right ─── */
function StructuredCard({ stage }: { stage: PillState }) {
  // Reveal slots one-by-one as we cycle into "structured"
  const isReady = stage === "structured";
  const isProc = stage === "processing";

  const slots = [
    { label: "intent", value: "implementation", delay: 0 },
    { label: "goal", value: "Fix auth middleware on stale JWT", delay: 140 },
    { label: "files", value: "src/middleware/auth.ts", delay: 280, mono: true },
    { label: "constraints", value: "must not break refresh-token flow", delay: 420 },
    { label: "urgency", value: "high — Friday review", delay: 560 },
  ];

  return (
    <div
      className="relative h-full overflow-hidden rounded-2xl p-5"
      style={{
        backgroundColor: "var(--paper)",
        border: "1px solid var(--border)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 40px -24px rgba(31,20,10,0.18), 0 4px 10px -6px rgba(31,20,10,0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: isReady ? "#10B981" : isProc ? "var(--amber)" : "rgba(31,20,10,0.2)",
            }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            Structured Mode
          </span>
        </div>
        <span
          className="font-mono text-[10px]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {isReady ? "ready" : isProc ? "parsing…" : "waiting"}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {slots.map((slot, i) => (
          <div
            key={slot.label}
            className="flex flex-col gap-1 transition-all duration-500"
            style={{
              opacity: isReady ? 1 : 0.32,
              transform: isReady ? "translateY(0)" : "translateY(0)",
              transitionDelay: isReady ? `${slot.delay}ms` : "0ms",
            }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: "var(--ember)" }}
            >
              {slot.label}
            </span>
            {isReady ? (
              <span
                className={
                  slot.mono
                    ? "font-mono text-[12px] leading-snug"
                    : "text-[13.5px] leading-snug"
                }
                style={{ color: "var(--foreground)" }}
              >
                {slot.value}
              </span>
            ) : (
              <span
                className="h-3 rounded-sm"
                style={{
                  width: `${[68, 80, 60, 75, 55][i] || 60}%`,
                  backgroundColor: "var(--cream-dark)",
                  backgroundImage: isProc
                    ? "linear-gradient(90deg, var(--cream-dark) 0%, var(--secondary) 50%, var(--cream-dark) 100%)"
                    : "none",
                  backgroundSize: "200% 100%",
                  backgroundRepeat: "no-repeat",
                  animation: isProc ? "shimmerLine 1.4s linear infinite" : "none",
                }}
              />
            )}
            {i < slots.length - 1 && (
              <span
                className="mt-1 block h-px w-full"
                style={{ backgroundColor: "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Voxify tag bottom */}
      <div
        className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] transition-opacity duration-500"
        style={{
          backgroundColor: "rgba(216,84,29,0.1)",
          color: "var(--ember)",
          opacity: isReady ? 1 : 0,
        }}
      >
        <span>·voxify</span>
      </div>
    </div>
  );
}

/* ─── The raw transcript card on the left ─── */
function RawTranscriptCard({ stage }: { stage: PillState }) {
  // Show as if being dictated; reveal progressively during recording
  const fullText =
    "um okay so we need to look at the auth middleware, like the JWT refresh thing — it's failing intermittently on stale tokens and it has to ship by Friday's review, can you handle it? Voxify.";
  const showAll = stage === "processing" || stage === "structured";
  const recording = stage === "recording";

  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (stage === "idle") {
      setChars(0);
      return;
    }
    if (showAll) {
      setChars(fullText.length);
      return;
    }
    if (!recording) return;
    const startedAt = Date.now();
    let raf = 0;
    const step = () => {
      const elapsed = Date.now() - startedAt;
      const target = Math.min(fullText.length, Math.floor(elapsed / 35));
      setChars(target);
      if (target < fullText.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [stage, recording, showAll, fullText.length]);

  const shown = fullText.slice(0, chars);

  return (
    <div
      className="relative h-full overflow-hidden rounded-2xl p-5"
      style={{
        backgroundColor: "var(--paper)",
        border: "1px solid var(--border)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 40px -24px rgba(31,20,10,0.18), 0 4px 10px -6px rgba(31,20,10,0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                stage === "recording"
                  ? "var(--ember)"
                  : stage === "idle"
                  ? "rgba(31,20,10,0.2)"
                  : "rgba(31,20,10,0.35)",
              animation: stage === "recording" ? "pulse-glow 2s ease-out infinite" : "none",
            }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            Raw transcript
          </span>
        </div>
        <span
          className="font-mono text-[10px]"
          style={{ color: "var(--muted-foreground)" }}
        >
          whisper-medium
        </span>
      </div>

      <p
        className="text-[14px] leading-[1.55] min-h-[112px]"
        style={{ color: stage === "idle" ? "rgba(31,20,10,0.3)" : "var(--foreground)" }}
      >
        {stage === "idle"
          ? "press Ctrl + Alt to speak…"
          : (
            <>
              {shown}
              {recording && (
                <span
                  className="inline-block w-[6px] -mb-0.5 ml-0.5 align-baseline"
                  style={{
                    height: 14,
                    backgroundColor: "var(--ember)",
                    animation: "pulse 1s ease-in-out infinite",
                  }}
                />
              )}
            </>
          )}
      </p>

      {/* Bottom tag: highlights "voxify" trigger */}
      <div
        className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] transition-opacity duration-500"
        style={{
          backgroundColor: "rgba(232,120,44,0.12)",
          color: "var(--ember)",
          opacity: showAll ? 1 : 0,
        }}
      >
        trigger detected
      </div>
    </div>
  );
}

/* ─── Connecting arrow / flow indicator ─── */
function FlowArrow({ active }: { active: boolean }) {
  return (
    <div
      className="relative hidden lg:flex items-center justify-center"
      style={{ width: 48, height: 2 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "transparent",
          backgroundImage: active
            ? "linear-gradient(90deg, transparent 0%, var(--ember) 50%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(31,20,10,0.15) 50%, transparent 100%)",
          backgroundSize: active ? "200% 100%" : "100% 100%",
          backgroundRepeat: "no-repeat",
          animation: active ? "shimmerLine 1.6s linear infinite" : "none",
          transition: "background-image 400ms ease",
        }}
      />
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        className="absolute right-[-2px]"
        style={{ color: active ? "var(--ember)" : "rgba(31,20,10,0.25)", transition: "color 400ms" }}
      >
        <path d="M1 1 L9 5 L1 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const [pillState, setPillState] = useState<PillState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const seqIdx = useRef(0);

  // Auto-cycle through demo states
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const seq = DEMO_SEQUENCE[seqIdx.current % DEMO_SEQUENCE.length];
      setPillState(seq.state);
      if (seq.state === "recording") setElapsed(0);
      seqIdx.current++;
      timer = setTimeout(step, seq.duration);
    };
    timer = setTimeout(step, DEMO_SEQUENCE[0].duration);
    return () => clearTimeout(timer);
  }, []);

  // Tick the timer during recording
  useEffect(() => {
    if (pillState !== "recording") return;
    const iv = setInterval(() => setElapsed((e) => e + 1000), 1000);
    return () => clearInterval(iv);
  }, [pillState]);

  const isRecording = pillState === "recording";
  const isProcessing = pillState === "processing";
  const isStructured = pillState === "structured";

  // Pill copy
  const pillCenter = useCallback(() => {
    if (isRecording) return <PillWaveform active />;
    if (isProcessing) {
      return (
        <span
          className="font-mono text-[11px] tracking-wider"
          style={{ color: "rgba(255,177,102,0.85)" }}
        >
          structuring…
        </span>
      );
    }
    if (isStructured) {
      return (
        <span
          className="font-mono text-[11px] tracking-wider"
          style={{ color: "rgba(255,177,102,0.95)" }}
        >
          ready · paste
        </span>
      );
    }
    return <PillWaveform active={false} />;
  }, [isRecording, isProcessing, isStructured]);

  return (
    <section
      className="relative overflow-hidden grain-overlay"
      style={{
        backgroundColor: "var(--background)",
        background:
          "radial-gradient(1200px 600px at 50% -8%, rgba(232,120,44,0.10), transparent 60%), radial-gradient(800px 500px at 90% 30%, rgba(200,168,216,0.10), transparent 60%), var(--background)",
      }}
    >
      {/* Decorative ember orb top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,120,44,0.18) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* Decorative ember orb mid-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(216,84,29,0.10) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-32 lg:pt-40">
        {/* Eyebrow tag */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.18em]"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid var(--border)",
              color: "var(--ember)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 6px 14px -8px rgba(31,20,10,0.15)",
            }}
          >
            <span
              className="inline-block size-1.5 rounded-full"
              style={{ backgroundColor: "var(--ember)" }}
            />
            local-first dictation for the agentic age
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display mx-auto mt-7 max-w-[14ch] text-center text-[56px] leading-[0.94] font-medium md:text-[88px] lg:text-[122px]"
          style={{ color: "var(--foreground)" }}
        >
          Speak your{" "}
          <span
            className="font-display-italic"
            style={{
              color: "var(--ember)",
            }}
          >
            intent.
          </span>{" "}
          Ship a{" "}
          <span
            className="font-display-italic"
            style={{
              color: "var(--ember)",
            }}
          >
            prompt.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-7 max-w-[620px] text-center text-[17px] md:text-lg leading-[1.55]"
          style={{ color: "var(--dark-secondary)" }}
        >
          OmniVox listens, structures, and types — all on your machine. Whisper
          for speech, a local Qwen for cleanup, output shaped for Claude Code,
          Cursor, and Codex. No cloud, no API keys, no telemetry.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={DOWNLOAD_WIN}
            download
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
            <span
              className="ml-1 font-mono text-[11px] opacity-70"
              style={{ letterSpacing: "0.06em" }}
            >
              · {WIN_INSTALLER_SIZE}
            </span>
          </a>
          <a
            href="#structured"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors hover:bg-[var(--secondary)]"
            style={{
              border: "1.5px solid var(--foreground)",
              color: "var(--foreground)",
              backgroundColor: "transparent",
            }}
          >
            See Structured Mode
          </a>
        </div>

        <p
          className="mt-4 text-center text-[12.5px] font-mono uppercase tracking-[0.18em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          Windows · macOS · Linux soon · v{APP_VERSION}
        </p>
      </div>

      {/* === The transformation diagram === */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1240px] px-6 pb-24 lg:mt-24">
        <div className="grid items-stretch grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_auto_auto_1fr] lg:gap-3">
          {/* Left: Raw transcript */}
          <div
            className="min-h-[220px]"
            style={{ animation: "fadeInUp 700ms ease-out both" }}
          >
            <RawTranscriptCard stage={pillState} />
          </div>

          {/* Arrow */}
          <FlowArrow active={isProcessing || isStructured} />

          {/* Center: the floating pill */}
          <div className="relative flex items-center justify-center" style={{ minWidth: 320 }}>
            {/* Glow ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-6 rounded-full transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(232,120,44,0.22), transparent 70%)",
                opacity: isRecording ? 1 : isProcessing ? 0.55 : 0.25,
                filter: "blur(12px)",
              }}
            />

            <div className="relative flex flex-col items-center">
              {/* Pill */}
              <div
                className="relative flex items-center gap-3 rounded-full px-5 transition-all duration-500"
                style={{
                  height: 56,
                  minWidth: 280,
                  background:
                    "linear-gradient(180deg, rgba(42,26,14,0.96) 0%, rgba(31,20,10,0.96) 100%)",
                  backdropFilter: "blur(20px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                  boxShadow: isRecording
                    ? "0 1px 0 rgba(255,255,255,0.06) inset, 0 18px 50px -16px rgba(216,84,29,0.55), 0 6px 18px -8px rgba(31,20,10,0.4)"
                    : isStructured
                    ? "0 1px 0 rgba(255,255,255,0.06) inset, 0 18px 50px -16px rgba(16,185,129,0.35), 0 6px 18px -8px rgba(31,20,10,0.4)"
                    : "0 1px 0 rgba(255,255,255,0.06) inset, 0 14px 40px -16px rgba(31,20,10,0.45), 0 6px 14px -8px rgba(31,20,10,0.3)",
                  border: `1px solid ${
                    isRecording
                      ? "rgba(232,120,44,0.35)"
                      : isStructured
                      ? "rgba(16,185,129,0.35)"
                      : "rgba(255,255,255,0.06)"
                  }`,
                }}
              >
                {/* Left: brand / timer */}
                <div className="flex w-[52px] shrink-0 items-center justify-start">
                  {pillState === "idle" && (
                    <span
                      className="font-display text-[15px] font-semibold tracking-[0.05em]"
                      style={{ color: "rgba(255,235,200,0.55)" }}
                    >
                      OV
                    </span>
                  )}
                  {isRecording && (
                    <span
                      className="font-mono text-[12px] tabular-nums tracking-wide"
                      style={{ color: "#FFB166" }}
                    >
                      {formatDuration(elapsed)}
                    </span>
                  )}
                  {isProcessing && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFB166"
                      strokeWidth="2"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  )}
                  {isStructured && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l4 4 10-10"
                        stroke="#34D399"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Center */}
                <div className="flex flex-1 items-center justify-center overflow-hidden">
                  {pillCenter()}
                </div>

                {/* Right: indicator */}
                <div className="flex w-[36px] shrink-0 items-center justify-end">
                  {pillState === "idle" && (
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ border: "1px solid rgba(255,235,200,0.22)" }}
                    />
                  )}
                  {isRecording && (
                    <div className="relative flex items-center justify-center">
                      <span
                        className="absolute h-5 w-5 rounded-full"
                        style={{
                          backgroundColor: "rgba(232,120,44,0.2)",
                          animation: "pulse 2s ease-in-out infinite",
                        }}
                      />
                      <span
                        className="relative h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: "#FFB166",
                          boxShadow: "0 0 12px rgba(232,120,44,0.5)",
                        }}
                      />
                    </div>
                  )}
                  {isProcessing && (
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "rgba(255,177,102,0.55)" }}
                    />
                  )}
                  {isStructured && (
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: "#34D399",
                        boxShadow: "0 0 10px rgba(52,211,153,0.5)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Pill caption */}
              <p
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "var(--muted-foreground)" }}
              >
                Ctrl + Alt · global hotkey
              </p>
            </div>
          </div>

          {/* Arrow */}
          <FlowArrow active={isStructured} />

          {/* Right: Structured prompt */}
          <div
            className="min-h-[220px]"
            style={{ animation: "fadeInUp 700ms ease-out 100ms both" }}
          >
            <StructuredCard stage={pillState} />
          </div>
        </div>

        {/* Stage labels under the diagram */}
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-12 lg:px-2">
          <p
            className="text-center font-mono text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            01 — Speech in (local Whisper)
          </p>
          <p
            className="text-center font-mono text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            02 — Voxify trigger fires
          </p>
          <p
            className="text-center font-mono text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            03 — Slot-shaped prompt out
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.4); opacity: 0; } }
      `}</style>
    </section>
  );
}
