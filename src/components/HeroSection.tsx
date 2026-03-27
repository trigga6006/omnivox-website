"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ─── OmniVox-style 16-bar waveform ─── */
const BAR_COUNT = 16;
const WEIGHTS = [
  0.25, 0.35, 0.48, 0.6, 0.72, 0.84, 0.92, 1.0,
  1.0, 0.92, 0.84, 0.72, 0.6, 0.48, 0.35, 0.25,
];
const PHASE_OFFSETS = [
  0, 0.15, 0.05, 0.22, 0.1, 0.28, 0.08, 0.18,
  0.12, 0.25, 0.06, 0.2, 0.14, 0.03, 0.24, 0.09,
];

function PillWaveform({ active }: { active: boolean }) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const t = Date.now();
      const level = active
        ? 0.35 + Math.sin(t / 380) * 0.25 + Math.sin(t / 160) * 0.18 + Math.sin(t / 90) * 0.08
        : 0.05 + Math.sin(t / 1200) * 0.03;

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;
        const w = WEIGHTS[i];
        const p = PHASE_OFFSETS[i];
        const perBarNoise = Math.sin(t / (120 + i * 20) + i * 1.8) * 0.12;
        const h = active
          ? 3 + Math.min(1, level * w + p * level * 0.5 + perBarNoise) * 25
          : 3 + Math.min(1, level * w) * 6;
        bar.style.height = `${h}px`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);

  return (
    <div className="flex items-center justify-center" style={{ gap: 3, height: 28 }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          className="rounded-full"
          style={{
            width: 3,
            height: 3,
            backgroundColor: active ? "#E8B546" : "rgba(255,255,235,0.25)",
            transition: active ? "background-color 300ms ease" : "background-color 600ms ease, height 400ms ease-out",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Pill state types ─── */
type PillState = "idle" | "recording" | "processing";

/* ─── Auto-cycle demo sequence ─── */
const DEMO_SEQUENCE: { state: PillState; duration: number }[] = [
  { state: "idle", duration: 4000 },
  { state: "recording", duration: 5500 },
  { state: "processing", duration: 2500 },
];

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ─── OmniVox App UI (miniature replica of real app) ─── */
const NAV_ITEMS = [
  { id: "mic", label: "Dictation", active: true },
  { id: "clock", label: "History", active: false },
  { id: "book", label: "Dictionary", active: false },
  { id: "download", label: "Models", active: false },
  { id: "settings", label: "Settings", active: false },
];

function NavIcon({ id }: { id: string }) {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "mic": return <svg {...p}><rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="12" y1="19" x2="12" y2="22" /></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "book": return <svg {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case "download": return <svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
    case "settings": return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>;
    default: return null;
  }
}

function AppPopup({ pillState }: { pillState: PillState }) {
  const isIdle = pillState === "idle";
  const isRecording = pillState === "recording";
  const isProcessing = pillState === "processing";

  return (
    <div className="flex overflow-hidden rounded-xl" style={{
      width: 320, height: 240,
      background: "oklch(0.11 0.006 60)",
      border: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
    }}>
      {/* Sidebar */}
      <div className="flex w-[44px] shrink-0 flex-col items-center border-r py-3" style={{ borderColor: "rgba(255,255,255,0.06)", background: "oklch(0.11 0.006 60)" }}>
        <span className="text-[10px] font-bold tracking-wider select-none" style={{ color: "#E8B546" }}>OV</span>
        <div className="my-2 h-px w-5" style={{ background: "rgba(255,255,255,0.08)" }} />
        <nav className="flex flex-1 flex-col items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className="relative flex h-7 w-7 items-center justify-center rounded-lg" style={{ color: item.active ? "#E8B546" : "rgba(255,255,235,0.3)" }}>
              {item.active && <span className="absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-r-full" style={{ background: "#E8B546" }} />}
              <NavIcon id={item.id} />
            </div>
          ))}
        </nav>
      </div>

      {/* Main content — Dictation panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-4" style={{
        background: "radial-gradient(ellipse at 50% 80%, oklch(0.14 0.015 55) 0%, oklch(0.11 0.006 60) 60%)",
      }}>
        {/* Status headline */}
        <p className="text-[11px] font-medium tracking-wide" style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          color: isRecording ? "#E8B546" : isProcessing ? "rgba(255,255,235,0.5)" : "rgba(255,255,235,0.8)",
        }}>
          {isIdle && "Ready to listen"}
          {isRecording && "Listening..."}
          {isProcessing && "Transcribing..."}
        </p>
        <p className="mt-0.5 text-[9px]" style={{ color: "rgba(255,255,235,0.25)" }}>
          {isIdle && "Ctrl + Win to begin"}
          {isRecording && "Speak now — press again to stop"}
          {isProcessing && "Processing your audio..."}
        </p>

        {/* Record button */}
        <div className="relative mt-4 flex items-center justify-center">
          {isRecording && <span className="absolute inset-[-4px] rounded-full" style={{ background: "rgba(180,50,40,0.15)", animation: "pulse 2s ease-in-out infinite" }} />}
          {isProcessing && (
            <svg className="absolute h-[52px] w-[52px]" viewBox="0 0 52 52" style={{ animation: "spin 2s linear infinite" }}>
              <circle cx="26" cy="26" r="24" fill="none" stroke="#E8B546" strokeWidth="1.5" strokeDasharray="38 114" strokeLinecap="round" />
            </svg>
          )}
          <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{
            background: isRecording ? "oklch(0.52 0.22 18)" : "oklch(0.17 0.008 52)",
            border: isRecording ? "1px solid rgba(180,50,40,0.4)" : "1px solid rgba(232,181,70,0.3)",
            boxShadow: isRecording ? "0 0 20px rgba(180,50,40,0.3)" : "none",
          }}>
            {isIdle && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8B546" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="12" y1="19" x2="12" y2="22" /></svg>}
            {isRecording && <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>}
            {isProcessing && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8B546" strokeWidth="1.5" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>}
          </div>
        </div>

        {/* Audio visualizer bars (recording only) */}
        <div className="mt-3 flex items-end justify-center gap-[3px] transition-opacity duration-300" style={{ height: 20, opacity: isRecording ? 1 : 0 }}>
          {[0.5, 0.7, 0.9, 1.0, 0.8].map((w, i) => (
            <div key={i} className="rounded-full" style={{
              width: 3,
              background: "linear-gradient(to top, #E8B546, rgba(232,181,70,0.4))",
              height: isRecording ? `${8 + w * 12}px` : "3px",
              transition: "height 150ms ease-out",
              animation: isRecording ? `bar-bounce 0.6s ease-in-out ${i * 0.08}s infinite alternate` : "none",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [pillState, setPillState] = useState<PillState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
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

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup((v) => !v);
  }, []);

  const isIdle = pillState === "idle";
  const isRecording = pillState === "recording";
  const isProcessing = pillState === "processing";

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--section-light-bg)" }}
    >
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-32 text-center lg:pt-36">
        <h1 className="font-heading mx-auto text-[44px] leading-[1em] tracking-[-0.02em] font-normal md:text-[72px] lg:text-[110px]">
          <span style={{ color: "color-mix(in srgb, var(--foreground) 30%, transparent)" }}>
            Don&apos;t type,{" "}
          </span>
          <span className="font-bold italic" style={{ color: "var(--foreground)" }}>
            just speak
          </span>
        </h1>

        <p
          className="font-sans mx-auto mt-6 max-w-[520px] text-lg leading-relaxed font-normal md:text-xl"
          style={{ color: "var(--dark-secondary)" }}
        >
          The voice-to-text AI that turns speech into clear, polished writing in
          every app.
        </p>

        <div className="mt-8">
          <a
            href="#download"
            className="inline-flex items-center gap-2.5 rounded-xl border-2 px-7 py-3.5 text-[15px] font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: "var(--purple)",
              borderColor: "var(--foreground)",
              color: "var(--foreground)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="0" y="0" width="7" height="7" fill="currentColor" />
              <rect x="9" y="0" width="7" height="7" fill="currentColor" />
              <rect x="0" y="9" width="7" height="7" fill="currentColor" />
              <rect x="9" y="9" width="7" height="7" fill="currentColor" />
            </svg>
            Download for Windows
          </a>
        </div>

        <p className="mt-3 text-[13px] tracking-wide" style={{ color: "var(--muted-foreground)" }}>
          Available on Mac, Windows, iPhone, and Android
        </p>
      </div>

      {/* === Hero Animation === */}
      <div
        className="relative mx-auto mt-6 flex items-end justify-center lg:mt-2"
        style={{ height: 300, maxWidth: 1440 }}
      >
        {/* Left SVG — messy text trail */}
        <div className="flex-1 overflow-visible" aria-hidden="true">
          <svg id="hero-svg-left" viewBox="0 0 1048 594" width="100%" height="auto" style={{ overflow: "visible" }} preserveAspectRatio="xMidYMid meet">
            <defs><style>{`#marquee-text-left { font-size: 16px; font-weight: 400; fill: var(--foreground); opacity: 0.25; font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif; }`}</style></defs>
            <path id="curve-left" d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235" stroke="transparent" fill="none" />
            <text x="-3300">
              <textPath id="marquee-text-left" xlinkHref="#curve-left">
                Umm, hope your week has started well…I was talking to Cheyene earlier but reception was really bad and I think their going to handle the first part of the project, but I&apos;m not totally sure. Also, I told the team the the new timeline should be ready by Friday, although it&apos;s probably going to slip. There&apos;s been a lot of back and forth and honestly the the whole thing&apos;s been kind of chaotic, like nobody really knows what&apos;s going on so can you check in with them and see if the notes from yesterday&apos;s meeting were sent out, or if they&apos;re still waiting. I think Cheyene mentioned it but didn&apos;t confirm, and now I&apos;m a little lost.
              </textPath>
              <animate attributeName="x" values="-3300; 0" dur="35s" repeatCount="indefinite" />
            </text>
          </svg>
        </div>

        {/* Center: OmniVox floating pill with popup */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ bottom: 16, left: "50%", transform: "translateX(-50%)" }}
        >
          {/* "Removed repetition" tag */}
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide"
            style={{ backgroundColor: "var(--section-green-bg)" }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7L5.5 10.5L12 3.5" stroke="#E8B546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#E8B546" }}>Removed repetition</span>
          </span>

          {/* App popup — miniature replica of the real OmniVox desktop app */}
          <div
            className="mb-2 overflow-hidden rounded-xl transition-all duration-300 ease-out"
            style={{
              maxHeight: showPopup ? 260 : 0,
              opacity: showPopup ? 1 : 0,
              transform: showPopup ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
            }}
          >
            <AppPopup pillState={pillState} />
          </div>

          {/* Floating pill */}
          <div
            className="relative flex items-center gap-3 rounded-full px-5 transition-all duration-300 ease-out"
            style={{
              height: 48,
              minWidth: 300,
              background: isIdle
                ? "rgba(18,16,14,0.65)"
                : "rgba(18,16,14,0.82)",
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              boxShadow: isRecording
                ? "0 4px 30px rgba(0,0,0,0.35), 0 0 20px rgba(232,181,70,0.12)"
                : "0 4px 30px rgba(0,0,0,0.35)",
              border: `1px solid ${isRecording ? "rgba(232,181,70,0.2)" : isProcessing ? "rgba(232,181,70,0.15)" : "rgba(255,255,255,0.06)"}`,
              opacity: isIdle ? 0.7 : 1,
              cursor: "pointer",
            }}
            onContextMenu={handleContextMenu}
            onClick={() => showPopup && setShowPopup(false)}
          >
            {/* Processing shimmer */}
            {isProcessing && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(232,181,70,0.08) 50%, transparent 100%)",
                  animation: "shimmer 2s ease-in-out infinite",
                }} />
              </div>
            )}

            {/* Left: brand / timer */}
            <div className="flex w-[48px] shrink-0 items-center justify-start">
              {isIdle && (
                <span className="text-sm font-semibold tracking-wider select-none" style={{ color: "rgba(255,255,235,0.4)" }}>OV</span>
              )}
              {isRecording && (
                <span className="font-mono text-xs tabular-nums tracking-wide" style={{ color: "#E8B546" }}>
                  {formatDuration(elapsed)}
                </span>
              )}
              {isProcessing && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8B546" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </div>

            {/* Center: waveform / status */}
            <div className="flex flex-1 items-center justify-center overflow-hidden">
              {(isIdle || isRecording) && <PillWaveform active={isRecording} />}
              {isProcessing && (
                <span className="truncate text-xs font-medium tracking-wide" style={{ color: "rgba(232,181,70,0.8)" }}>
                  Transcribing...
                </span>
              )}
            </div>

            {/* Right: indicator dot */}
            <div className="flex w-[32px] shrink-0 items-center justify-end">
              {isIdle && <div className="h-2 w-2 rounded-full" style={{ border: "1px solid rgba(255,255,235,0.2)" }} />}
              {isRecording && (
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-5 w-5 rounded-full" style={{ backgroundColor: "rgba(232,181,70,0.15)", animation: "pulse 2s ease-in-out infinite" }} />
                  <span className="relative h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E8B546", boxShadow: "0 0 8px rgba(232,181,70,0.4)" }} />
                </div>
              )}
              {isProcessing && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "rgba(232,181,70,0.5)" }} />}
            </div>
          </div>

          {/* Right-click hint */}
          <p className="mt-2 text-[10px] tracking-wider" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>
            right-click for menu
          </p>
        </div>

        {/* Right SVG — clean text trail */}
        <div className="flex-1 overflow-visible" aria-hidden="true">
          <svg id="hero-svg-right" viewBox="0 0 1024 620" width="100%" height="auto" style={{ overflow: "visible" }} preserveAspectRatio="xMidYMid meet">
            <defs><style>{`#marquee-text-right { font-size: 16px; font-weight: 600; fill: #FFFFEB; font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif; }`}</style></defs>
            <path id="curve-right-bg" d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216" stroke="var(--section-dark-bg)" strokeWidth="48" strokeLinecap="round" fill="none" />
            <path id="curve-right" d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216" stroke="transparent" fill="none" />
            <text x="-4500">
              <textPath id="marquee-text-right" xlinkHref="#curve-right">
                Hope your week is off to a good start. I was talking to Cheyene earlier, but the reception was really bad. I think they&apos;re going to handle the first part of the project, but I&apos;m not totally sure. I also told the team the new timeline should be ready by Friday — although it might slip. There&apos;s been a lot of back and forth, and honestly, the whole thing has been a bit chaotic. It feels like nobody really knows what&apos;s going on. Can you check in with them and see if the notes from yesterday&apos;s meeting were sent out, or if they&apos;re still waiting? I think Cheyene mentioned it, but didn&apos;t confirm — and now I&apos;m a little lost!
              </textPath>
              <animate attributeName="x" values="-4500; 0" dur="50s" repeatCount="indefinite" />
            </text>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.4); opacity: 0; } }
        @keyframes bar-bounce { 0% { height: 4px; } 100% { height: 18px; } }
      `}</style>
    </section>
  );
}
