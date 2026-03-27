export function AskAISection() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "var(--section-light-bg)" }}>
      <div className="relative mx-auto max-w-[1200px] rounded-3xl border-2 p-10 md:p-16 overflow-hidden" style={{ borderColor: "var(--foreground)" }}>
        {/* Decorative illustration placeholder - coral/orange shape on the right */}
        <div
          className="absolute -right-5 -top-10 hidden md:block"
          aria-hidden="true"
        >
          <div className="relative size-[200px]">
            {/* Simplified person-with-magnifying-glass shape */}
            <div className="absolute bottom-0 left-6 h-[120px] w-[80px] rounded-t-full bg-[#E8825A]/80" />
            <div className="absolute top-2 left-10 size-[60px] rounded-full bg-[#E8825A]/60" />
            <div className="absolute top-0 right-4 size-[50px] rounded-full border-4 border-[#E8825A]/70 bg-transparent" />
            {/* Speech bubble */}
            <div className="absolute -top-2 right-0 rounded-lg px-3 py-1 text-xs font-bold shadow-sm" style={{ backgroundColor: "var(--section-light-bg)", color: "var(--foreground)" }}>
              eee
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          {/* Heading */}
          <h2 className="font-sans text-[28px] font-bold uppercase leading-tight tracking-tight md:text-[32px]"
            style={{ color: "var(--foreground)", letterSpacing: "-0.5px" }}
          >
            Still not sure that OmniVox is right for you?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-lg" style={{ color: "var(--dark-secondary)" }}>
            Let ChatGPT, Claude, or Perplexity do the thinking for you.
          </p>
          <p className="mt-2 text-lg" style={{ color: "var(--dark-secondary)" }}>
            Click a button and see what your favorite AI says about OmniVox.
          </p>

          {/* AI Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            {/* Ask ChatGPT */}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors hover:opacity-80" style={{ borderColor: "var(--foreground)", backgroundColor: "var(--purple)", color: "var(--foreground)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M9 3 L10.5 7.5 L15 9 L10.5 10.5 L9 15 L7.5 10.5 L3 9 L7.5 7.5 Z" fill="currentColor" />
              </svg>
              Ask ChatGPT
            </a>

            {/* Ask Claude */}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors hover:opacity-80" style={{ borderColor: "var(--foreground)", backgroundColor: "var(--purple)", color: "var(--foreground)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1 L11 7 L17 9 L11 11 L9 17 L7 11 L1 9 L7 7 Z" fill="currentColor" />
              </svg>
              Ask Claude
            </a>

            {/* Ask Perplexity */}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors hover:opacity-80" style={{ borderColor: "var(--foreground)", backgroundColor: "var(--purple)", color: "var(--foreground)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="3" fill="currentColor" />
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="9" y1="1" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="9" y1="13" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" />
                <line x1="1" y1="9" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" />
                <line x1="13" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Ask Perplexity
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
