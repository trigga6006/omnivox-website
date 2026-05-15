export function SpeedSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-28 lg:py-36"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Soft warm wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 400px at 50% 0%, rgba(232,120,44,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] text-center">
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
          Speed
        </span>

        {/* Heading */}
        <h2
          className="font-display mt-7 text-[52px] leading-[0.94] font-medium tracking-[-0.02em] md:text-[80px] lg:text-[120px]"
          style={{ color: "var(--foreground)" }}
        >
          <span className="relative inline-block">
            <span className="font-display-italic" style={{ color: "var(--ember)" }}>
              4×
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(232,120,44,0.45) 30%, rgba(232,120,44,0.45) 70%, transparent 100%)",
              }}
            />
          </span>{" "}
          faster than{" "}
          <span style={{ color: "var(--foreground)" }}>typing.</span>
        </h2>

        {/* Body text */}
        <p
          className="mx-auto mt-7 mb-10 max-w-[640px] text-[17px] leading-[1.55] md:text-lg"
          style={{ color: "var(--dark-secondary)" }}
        >
          You think at 400 words per minute, speak at ~180, and type at 45.
          OmniVox closes the gap between thought and prompt — so you stop
          translating ideas into keystrokes and start shipping them.
        </p>

        {/* Comparison cards */}
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-[1fr_2fr]">
          {/* Keyboard card — paper, restrained */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 text-left"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid var(--border)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.6) inset, 0 14px 28px -16px rgba(31,20,10,0.16)",
            }}
          >
            <p
              className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Keyboard
            </p>
            <p
              className="font-display mt-4 text-[60px] leading-none font-medium"
              style={{ color: "var(--foreground)" }}
            >
              45<span className="font-display-italic" style={{ fontSize: "0.5em", marginLeft: "0.1em", color: "var(--muted-foreground)" }}>wpm</span>
            </p>
            <p
              className="mt-6 max-h-24 overflow-hidden text-[14.5px] leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              I&apos;m getting started with the project. How would you like to
              set up the file…
            </p>
            {/* Tiny key visualization */}
            <div className="mt-6 grid grid-cols-10 gap-1 opacity-50">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 rounded-sm"
                  style={{ backgroundColor: "var(--border)" }}
                />
              ))}
            </div>
          </div>

          {/* OmniVox card — warm ember gradient with thought streams */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 text-left"
            style={{
              background:
                "linear-gradient(135deg, #C8794A 0%, #D8541D 45%, #8B2C0C 100%)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.1) inset, 0 20px 40px -20px rgba(216,84,29,0.5)",
            }}
          >
            {/* Decorative orb */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-[260px] h-[260px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,235,200,0.18) 0%, transparent 65%)",
                filter: "blur(20px)",
              }}
            />

            {/* Floating thought snippets */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <div className="relative h-full w-full">
                <span
                  className="absolute top-[18%] left-[8%] font-display-italic whitespace-nowrap"
                  style={{
                    color: "rgba(255,251,241,0.25)",
                    transform: "rotate(-8deg)",
                    fontSize: 18,
                    animation: "drift 14s ease-in-out infinite",
                  }}
                >
                  refactor the auth middleware to handle stale tokens
                </span>
                <span
                  className="absolute top-[36%] right-[6%] font-display-italic whitespace-nowrap"
                  style={{
                    color: "rgba(255,251,241,0.18)",
                    transform: "rotate(4deg)",
                    fontSize: 15,
                    animation: "drift 16s ease-in-out infinite 1s",
                  }}
                >
                  draft an email to Jenny about Q2 goals
                </span>
                <span
                  className="absolute bottom-[26%] left-[10%] font-display-italic whitespace-nowrap"
                  style={{
                    color: "rgba(255,251,241,0.22)",
                    transform: "rotate(-3deg)",
                    fontSize: 16,
                    animation: "drift 18s ease-in-out infinite 2s",
                  }}
                >
                  ship a prompt to Claude Code, hands-free
                </span>
                <span
                  className="absolute bottom-[12%] right-[12%] font-display-italic whitespace-nowrap"
                  style={{
                    color: "rgba(255,251,241,0.17)",
                    transform: "rotate(5deg)",
                    fontSize: 14,
                    animation: "drift 20s ease-in-out infinite 0.5s",
                  }}
                >
                  capture this idea before it&apos;s gone
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="relative z-10">
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,251,241,0.7)" }}
              >
                OmniVox · spoken
              </p>
              <p
                className="font-display mt-4 text-[60px] leading-none font-medium"
                style={{ color: "#FFFBF1" }}
              >
                180<span className="font-display-italic" style={{ fontSize: "0.5em", marginLeft: "0.1em", color: "rgba(255,251,241,0.65)" }}>wpm</span>
              </p>
              <p className="mt-6 max-w-[60%] text-[14.5px] leading-relaxed" style={{ color: "rgba(255,251,241,0.78)" }}>
                Natural speech, captured locally, structured for the tool you&apos;re aiming it at.
              </p>
            </div>

            {/* Centered mic indicator */}
            <div className="absolute right-8 bottom-8 z-10 flex items-end gap-1">
              {[0.4, 0.7, 1.0, 0.85, 0.5].map((w, i) => (
                <span
                  key={i}
                  className="block w-[3px] rounded-full"
                  style={{
                    height: `${10 + w * 30}px`,
                    backgroundColor: "#FFFBF1",
                    opacity: 0.85,
                    animation: `waveform 1.2s ease-in-out ${i * 0.12}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
