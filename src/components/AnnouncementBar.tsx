export function AnnouncementBar() {
  return (
    <div
      className="relative flex items-center justify-center gap-2 px-5 py-3 text-center"
      style={{
        backgroundColor: "var(--ink)",
        color: "var(--paper)",
      }}
    >
      {/* Subtle ember accent */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 60px at 50% 100%, rgba(232,120,44,0.25), transparent 70%)",
        }}
      />
      <p className="relative font-sans text-[13.5px] leading-snug">
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.22em] mr-3"
          style={{ color: "var(--ember)" }}
        >
          v0.2.5
        </span>
        <span className="opacity-90">
          Free during early access on Windows ·{" "}
        </span>
        <a
          href="#download"
          className="inline-flex items-center gap-1 font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
          style={{ color: "var(--paper)" }}
        >
          Download
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>
  );
}
