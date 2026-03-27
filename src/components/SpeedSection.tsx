export function SpeedSection() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "var(--section-light-bg)" }}>
      <div className="mx-auto max-w-[1200px] text-center">
        {/* Heading */}
        <h2 className="font-heading text-[48px] leading-[48px] font-normal md:text-[72px] md:leading-[68px] lg:text-[120px] lg:leading-[102px]" style={{ color: "var(--foreground)" }}>
          <span className="relative inline-block">
            4x faster
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-full rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--purple) 60%, transparent)" }}
            />
          </span>{" "}
          than typing
        </h2>

        {/* Body text */}
        <p className="mx-auto mt-6 mb-8 max-w-[680px] text-lg leading-7" style={{ color: "var(--dark-secondary)" }}>
          After 150 years of using the same keyboard, voice that actually works
          is <em>finally</em> here. When you create, code, and respond faster,
          you free up time for more. Speak naturally at the speed you think and
          let Flow handle the rest.
        </p>

        {/* Buttons row */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border-2 bg-transparent px-7 py-3.5 text-base font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: "var(--foreground)", color: "var(--foreground)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 1a2.5 2.5 0 0 0-2.5 2.5v4a2.5 2.5 0 0 0 5 0v-4A2.5 2.5 0 0 0 8 1Z"
                fill="currentColor"
              />
              <path
                d="M4 6.5a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V14H6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H8.5v-1.525A5 5 0 0 0 13 7.5v-1a.5.5 0 0 0-1 0v1a4 4 0 0 1-8 0v-1Z"
                fill="currentColor"
              />
            </svg>
            Try Flow
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-base font-semibold transition-colors hover:brightness-95"
            style={{ borderColor: "var(--foreground)", backgroundColor: "var(--purple)", color: "var(--foreground)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6.555 1.375 0 7.488h4.574v6.441h3.962V7.488H6.555ZM9.445 1.375v6.441h3.962v6.113L16 7.488h-4.574V1.375H9.445Z"
                fill="currentColor"
              />
            </svg>
            Download for Windows
          </button>
        </div>

        {/* Comparison cards */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 md:grid-cols-[1fr_2.5fr]">
          {/* Keyboard card */}
          <div className="overflow-hidden rounded-3xl border-[1.5px] p-8 text-left" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Keyboard</p>
            <p className="font-heading mt-2 text-5xl font-normal italic" style={{ color: "var(--foreground)" }}>
              45 wpm
            </p>
            <p className="mt-4 max-h-24 overflow-hidden text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              I&apos;m getting started with the project, How would you like to
              set up the file. Here are a few options.
            </p>
          </div>

          {/* Flow card */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 text-left"
            style={{
              background:
                "linear-gradient(135deg, #8B6914 0%, #4A90A4 50%, #8B6914 100%)",
            }}
          >
            {/* Spiral/curved dictation text overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <div className="relative h-full w-full">
                <span
                  className="absolute top-[20%] left-[10%] text-sm whitespace-nowrap text-cream/30"
                  style={{ transform: "rotate(-12deg)" }}
                >
                  I want to build a product that helps people communicate faster
                </span>
                <span
                  className="absolute top-[35%] left-[5%] text-sm whitespace-nowrap text-cream/25"
                  style={{ transform: "rotate(-6deg)" }}
                >
                  The key insight is that voice is naturally faster than typing
                  and more natural
                </span>
                <span
                  className="absolute top-[50%] left-[8%] text-sm whitespace-nowrap text-cream/20"
                  style={{ transform: "rotate(3deg)" }}
                >
                  When you can speak at the speed of thought everything changes
                </span>
                <span
                  className="absolute top-[65%] left-[12%] text-sm whitespace-nowrap text-cream/25"
                  style={{ transform: "rotate(8deg)" }}
                >
                  Let me draft this email quickly and move on to the next task
                </span>
                <span
                  className="absolute top-[78%] left-[6%] text-sm whitespace-nowrap text-cream/20"
                  style={{ transform: "rotate(-4deg)" }}
                >
                  Flow captures your ideas before they disappear from your mind
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="relative z-10">
              <p className="text-sm font-medium text-cream/70">Flow</p>
              <p className="font-heading mt-2 text-5xl font-normal italic text-cream">
                220 wpm
              </p>
            </div>

            {/* Microphone icon in center */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex h-14 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <div className="flex items-end gap-[3px]">
                  <span className="block h-3 w-[3px] rounded-full bg-dark/70" />
                  <span className="block h-5 w-[3px] rounded-full bg-dark/70" />
                  <span className="block h-4 w-[3px] rounded-full bg-dark/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
