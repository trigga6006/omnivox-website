export function CTASection() {
  // Generate decorative dot positions along a spiral/curved path on the right side
  const dots: Array<{ x: number; y: number; opacity: number }> = [];
  for (let i = 0; i < 30; i++) {
    const t = i / 29;
    // Spiral curve starting from top-right, curving down and inward
    const angle = t * Math.PI * 2.5 + 0.5;
    const radius = 80 + t * 120;
    const x = Math.cos(angle) * radius + 140;
    const y = Math.sin(angle) * radius * 0.8 + 300;
    const opacity = 0.3 + (1 - t) * 0.4;
    dots.push({ x, y, opacity });
  }

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] px-6 py-24"
      style={{
        background: "linear-gradient(180deg, rgba(74,100,50,0.9) 0%, rgba(139,105,20,0.8) 40%, rgba(100,80,40,0.9) 100%)",
      }}
    >
      {/* Decorative spiral dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute size-1 rounded-full bg-white"
            style={{
              right: `${dot.x}px`,
              top: `${dot.y}px`,
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <h2 className="font-heading text-cream text-center font-normal leading-none"
        style={{ fontSize: "clamp(48px, 10vw, 96px)" }}
      >
        Start flowing
      </h2>

      {/* Subtitle */}
      <p className="mt-6 text-center text-lg leading-7 text-cream-muted max-w-[520px]">
        Effortless voice dictation in every application: 4x faster than typing, AI commands and auto-edits.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 justify-center mt-8 flex-wrap">
        <a
          href="#"
          className="rounded-xl border-2 border-cream bg-transparent px-7 py-3.5 text-base font-medium text-cream transition-colors hover:bg-cream/10"
        >
          Try Flow
        </a>
        <a
          href="#"
          className="rounded-xl border-2 border-dark bg-purple px-7 py-3.5 text-base font-medium text-dark transition-colors hover:bg-purple/80"
        >
          Download for Windows
        </a>
      </div>

      {/* Availability text */}
      <p className="mt-4 text-sm text-cream-faint text-center">
        Available on Mac, Windows, iPhone, and Android
      </p>
    </section>
  );
}
