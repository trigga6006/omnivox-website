"use client";

const items = [
  "NO CLOUD",
  "NO SUBSCRIPTION",
  "NO BLOAT",
  "NO ACCOUNT REQUIRED",
  "FREE FOREVER",
  "100% LOCAL",
  "GPU ACCELERATED",
  "WHISPER POWERED",
  "VOICE COMMANDS",
  "NOISE SUPPRESSION",
  "CONTEXT MODES",
];

export function TrustStrip() {
  return (
    <div
      id="marquee"
      className="border-y border-border overflow-hidden py-4 relative"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-6 text-[11px] font-heading font-semibold tracking-[0.2em] text-muted-foreground/40 uppercase select-none">
              {item}
            </span>
            <span className="text-primary/25 text-xs select-none">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
