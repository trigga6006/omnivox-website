"use client";

import { useEffect, useState } from "react";

/**
 * OmniVox-style 16-bar waveform — bell-curve weighted, center bars peak higher.
 * Idle: flat muted bars. Active: amber bars animate with staggered timing.
 */
const BAR_COUNT = 16;
const WEIGHTS = [
  0.25, 0.35, 0.48, 0.6, 0.72, 0.84, 0.92, 1.0, 1.0, 0.92, 0.84, 0.72, 0.6,
  0.48, 0.35, 0.25,
];
const PHASE_OFFSETS = [
  0, 0.15, 0.05, 0.22, 0.1, 0.28, 0.08, 0.18, 0.12, 0.25, 0.06, 0.2, 0.14,
  0.03, 0.24, 0.09,
];

function PillWaveform() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    // Simulate organic audio levels
    let frame: number;
    const animate = () => {
      setLevel(0.3 + Math.sin(Date.now() / 400) * 0.25 + Math.sin(Date.now() / 170) * 0.15);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex items-center justify-center" style={{ gap: 3, height: 28 }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => {
        const weight = WEIGHTS[i];
        const phase = PHASE_OFFSETS[i];
        const h = 3 + Math.min(1, level * weight + phase * level * 0.5) * 25;
        return (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 3,
              height: h,
              backgroundColor: "#E8B546",
              transition: "height 100ms ease-out",
            }}
          />
        );
      })}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--section-light-bg)" }}
    >
      {/* Main content — vertically centered in the viewport-minus-nav space */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-32 text-center lg:pt-36">
        {/* Heading — single line with generous letter-spacing */}
        <h1 className="font-heading mx-auto text-[44px] leading-[1em] tracking-[-0.02em] font-normal md:text-[72px] lg:text-[110px]">
          <span
            style={{
              color: "color-mix(in srgb, var(--foreground) 30%, transparent)",
            }}
          >
            Don&apos;t type,{" "}
          </span>
          <span
            className="font-bold italic"
            style={{ color: "var(--foreground)" }}
          >
            just speak
          </span>
        </h1>

        {/* Subtitle — tighter coupling to heading */}
        <p
          className="font-sans mx-auto mt-6 max-w-[520px] text-lg leading-relaxed font-normal md:text-xl"
          style={{ color: "var(--dark-secondary)" }}
        >
          The voice-to-text AI that turns speech into clear, polished writing in
          every app.
        </p>

        {/* CTA Button — breathing room above and below */}
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
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect x="0" y="0" width="7" height="7" fill="currentColor" />
              <rect x="9" y="0" width="7" height="7" fill="currentColor" />
              <rect x="0" y="9" width="7" height="7" fill="currentColor" />
              <rect x="9" y="9" width="7" height="7" fill="currentColor" />
            </svg>
            Download for Windows
          </a>
        </div>

        {/* Availability text */}
        <p
          className="mt-3 text-[13px] tracking-wide"
          style={{ color: "var(--muted-foreground)" }}
        >
          Available on Mac, Windows, iPhone, and Android
        </p>
      </div>

      {/* === Hero Animation: SVG text trails + OmniVox-style floating pill === */}
      <div
        className="relative mx-auto mt-6 flex items-end justify-center lg:mt-2"
        style={{ height: 300, maxWidth: 1440 }}
      >
        {/* Left SVG — messy/unedited text flowing along a curved path */}
        <div className="flex-1 overflow-visible" aria-hidden="true">
          <svg
            id="hero-svg-left"
            viewBox="0 0 1048 594"
            width="100%"
            height="auto"
            style={{ overflow: "visible" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <style>{`
                #marquee-text-left {
                  font-size: 16px;
                  font-weight: 400;
                  fill: var(--foreground);
                  opacity: 0.25;
                  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
                }
              `}</style>
            </defs>
            <path
              id="curve-left"
              d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"
              stroke="transparent"
              fill="none"
            />
            <text x="-3300">
              <textPath id="marquee-text-left" xlinkHref="#curve-left">
                Umm, hope your week has started well…I was talking to Cheyene
                earlier but reception was really bad and I think their going to
                handle the first part of the project, but I&apos;m not totally
                sure. Also, I told the team the the new timeline should be ready
                by Friday, although it&apos;s probably going to slip.
                There&apos;s been a lot of back and forth and honestly the the
                whole thing&apos;s been kind of chaotic, like nobody really knows
                what&apos;s going on so can you check in with them and see if the
                notes from yesterday&apos;s meeting were sent out, or if
                they&apos;re still waiting. I think Cheyene mentioned it but
                didn&apos;t confirm, and now I&apos;m a little lost.
              </textPath>
              <animate
                attributeName="x"
                values="-3300; 0"
                dur="35s"
                repeatCount="indefinite"
              />
            </text>
          </svg>
        </div>

        {/* Center: OmniVox-style glass-morphic floating pill */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ bottom: 16, left: "50%", transform: "translateX(-50%)" }}
        >
          {/* "Removed repetition" tag above pill */}
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide"
            style={{ backgroundColor: "var(--section-green-bg)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7L5.5 10.5L12 3.5"
                stroke="#E8B546"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ color: "#E8B546" }}>Removed repetition</span>
          </span>

          {/* Floating pill — OmniVox glass morphism style */}
          <div
            className="flex items-center gap-3 rounded-full px-5"
            style={{
              height: 48,
              minWidth: 280,
              background: "rgba(18, 16, 14, 0.72)",
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Left: brand mark */}
            <span
              className="shrink-0 text-sm font-semibold tracking-wider"
              style={{ color: "rgba(255,255,235,0.5)" }}
            >
              OV
            </span>

            {/* Center: animated waveform */}
            <div className="flex-1 flex items-center justify-center">
              <PillWaveform />
            </div>

            {/* Right: recording indicator dot */}
            <div className="shrink-0 flex items-center justify-center">
              <span
                className="block h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: "#E8B546",
                  boxShadow: "0 0 8px rgba(232,181,70,0.4)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right SVG — clean/edited text flowing along a curved path */}
        <div className="flex-1 overflow-visible" aria-hidden="true">
          <svg
            id="hero-svg-right"
            viewBox="0 0 1024 620"
            width="100%"
            height="auto"
            style={{ overflow: "visible" }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <style>{`
                #marquee-text-right {
                  font-size: 16px;
                  font-weight: 600;
                  fill: #FFFFEB;
                  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
                }
              `}</style>
            </defs>
            <path
              id="curve-right-bg"
              d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
              stroke="var(--section-dark-bg)"
              strokeWidth="48"
              strokeLinecap="round"
              fill="none"
            />
            <path
              id="curve-right"
              d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
              stroke="transparent"
              fill="none"
            />
            <text x="-4500">
              <textPath id="marquee-text-right" xlinkHref="#curve-right">
                Hope your week is off to a good start. I was talking to Cheyene
                earlier, but the reception was really bad. I think they&apos;re
                going to handle the first part of the project, but I&apos;m not
                totally sure. I also told the team the new timeline should be
                ready by Friday — although it might slip. There&apos;s been a lot
                of back and forth, and honestly, the whole thing has been a bit
                chaotic. It feels like nobody really knows what&apos;s going on.
                Can you check in with them and see if the notes from
                yesterday&apos;s meeting were sent out, or if they&apos;re still
                waiting? I think Cheyene mentioned it, but didn&apos;t confirm —
                and now I&apos;m a little lost!
              </textPath>
              <animate
                attributeName="x"
                values="-4500; 0"
                dur="50s"
                repeatCount="indefinite"
              />
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
