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
type PillState = "idle" | "recording" | "processing" | "success";

/* ─── Auto-cycle demo sequence ─── */
const DEMO_SEQUENCE: { state: PillState; duration: number }[] = [
  { state: "idle", duration: 4000 },
  { state: "recording", duration: 5000 },
  { state: "processing", duration: 2500 },
  { state: "success", duration: 2500 },
];

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ─── Popup menu items ─── */
const MENU_ITEMS = [
  { icon: "mic", label: "Start Recording", shortcut: "Alt+V" },
  { icon: "globe", label: "Language", shortcut: "English" },
  { icon: "history", label: "History", shortcut: "" },
  { icon: "sliders", label: "Settings", shortcut: "" },
  { icon: "info", label: "About OmniVox", shortcut: "" },
];

function MenuIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    mic: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" /><line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    globe: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    history: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    sliders: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    info: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

export function HeroSection() {
  const [pillState, setPillState] = useState<PillState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [flashText, setFlashText] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const seqIdx = useRef(0);

  // Auto-cycle through demo states
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const seq = DEMO_SEQUENCE[seqIdx.current % DEMO_SEQUENCE.length];
      setPillState(seq.state);
      if (seq.state === "recording") setElapsed(0);
      if (seq.state === "success") setFlashText("Hope your week is off to a good start...");
      else setFlashText(null);
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
    setShowMenu((v) => !v);
  }, []);

  const isIdle = pillState === "idle";
  const isRecording = pillState === "recording";
  const isProcessing = pillState === "processing";
  const isSuccess = pillState === "success";

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

          {/* Popup menu — appears above the pill on right-click */}
          <div
            className="mb-2 overflow-hidden rounded-2xl transition-all duration-300 ease-out"
            style={{
              maxHeight: showMenu ? 300 : 0,
              opacity: showMenu ? 1 : 0,
              width: 260,
              background: "rgba(18, 16, 14, 0.88)",
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              border: showMenu ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
            }}
          >
            <div className="py-1.5">
              {MENU_ITEMS.map((item, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5"
                  style={{ color: "rgba(255,255,235,0.8)" }}
                  onClick={() => setShowMenu(false)}
                >
                  <span style={{ color: "#E8B546", opacity: 0.8 }}>
                    <MenuIcon name={item.icon} />
                  </span>
                  <span className="flex-1 text-[13px] font-medium">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,235,0.3)" }}>
                      {item.shortcut}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="border-t px-4 py-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-[10px] font-medium tracking-wider" style={{ color: "rgba(255,255,235,0.25)" }}>
                OMNIVOX v1.0
              </span>
            </div>
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
            onClick={() => showMenu && setShowMenu(false)}
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
              {isSuccess && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 8.5 6.5 12 13 4" />
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
              {isSuccess && flashText && (
                <span className="truncate text-xs" style={{ color: "rgba(255,255,235,0.7)" }}>
                  {flashText}
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
              {isSuccess && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "rgba(74,222,128,0.5)" }} />}
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
      `}</style>
    </section>
  );
}
