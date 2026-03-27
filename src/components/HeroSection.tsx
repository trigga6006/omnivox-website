export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--section-light-bg)" }}
    >
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-40 pb-4 text-center">
        {/* Heading */}
        <h1 className="font-heading mx-auto" style={{ textWrap: "balance" }}>
          <span
            className="block text-[48px] leading-[0.85em] font-normal md:text-[72px] lg:text-[120px]"
            style={{ color: "color-mix(in srgb, var(--foreground) 30%, transparent)" }}
          >
            Don&apos;t type,
          </span>
          <span
            className="block text-[48px] leading-[0.85em] font-bold italic md:text-[72px] lg:text-[120px]"
            style={{ color: "var(--foreground)" }}
          >
            just speak
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans mx-auto mt-6 mb-8 max-w-[500px] text-xl leading-7 font-normal"
          style={{ color: "var(--dark-secondary)" }}
        >
          The voice-to-text AI that turns speech into clear, polished writing in
          every app.
        </p>

        {/* CTA Button */}
        <a
          href="#download"
          className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-semibold transition-colors hover:opacity-90"
          style={{
            backgroundColor: "var(--purple)",
            borderColor: "var(--foreground)",
            color: "var(--foreground)",
          }}
        >
          <svg
            width="16"
            height="16"
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

        {/* Availability text */}
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          Available on Mac, Windows, iPhone, and Android
        </p>
      </div>

      {/* === Hero Animation: SVG text-on-path with center pill === */}
      <div
        className="relative mx-auto flex items-end justify-center"
        style={{ height: 430, maxWidth: 1440 }}
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

        {/* Center: transcription pill with waveform */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ bottom: 10, left: "50%", transform: "translateX(-50%)" }}
        >
          {/* "Removed repetition" pill */}
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: "var(--section-green-bg)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7L5.5 10.5L12 3.5"
                stroke="#F97316"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ color: "#F97316" }}>Removed repetition</span>
          </span>

          {/* Waveform pill — bars animate to simulate live audio */}
          <div
            className="flex items-center justify-center rounded-full border"
            style={{
              width: 155,
              height: 57,
              backgroundColor: "var(--color-cream, #FFFFEB)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-[3px]">
              {[
                { base: 14, delay: 0 },
                { base: 20, delay: 0.15 },
                { base: 8, delay: 0.3 },
                { base: 24, delay: 0.05 },
                { base: 6, delay: 0.45 },
                { base: 18, delay: 0.2 },
                { base: 10, delay: 0.55 },
                { base: 26, delay: 0.1 },
                { base: 8, delay: 0.4 },
                { base: 20, delay: 0.25 },
                { base: 14, delay: 0.35 },
                { base: 6, delay: 0.5 },
                { base: 22, delay: 0.08 },
                { base: 10, delay: 0.42 },
                { base: 16, delay: 0.18 },
              ].map((bar, i) => (
                <div
                  key={i}
                  className="animate-waveform rounded-full"
                  style={{
                    width: 3,
                    height: bar.base,
                    backgroundColor: "var(--color-dark, #1A1A1A)",
                    opacity: 0.6,
                    animationDelay: `${bar.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right SVG — clean/edited text flowing along a different curved path */}
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
            {/* Dark background band along the path */}
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
