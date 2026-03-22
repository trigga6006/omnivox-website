"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Sparkles, Check } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";

function MockWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/60 overflow-hidden shadow-2xl shadow-black/20">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
        </div>
        <span className="text-[11px] text-muted-foreground/60 ml-2 font-mono">
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function StatusLine({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span className="text-muted-foreground/60 w-20">{label}</span>
      <span className="text-foreground/80">{value}</span>
    </div>
  );
}

function ZeroCloudVisual() {
  return (
    <MockWindow title="omnivox — status">
      <div className="space-y-3">
        <StatusLine
          label="Engine"
          value="Whisper v3 (base.en)"
          color="bg-green-400"
        />
        <StatusLine label="Process" value="Local" color="bg-green-400" />
        <StatusLine
          label="Cloud"
          value="Disconnected"
          color="bg-muted-foreground/40"
        />
        <StatusLine label="Data sent" value="0 bytes" color="bg-green-400" />
        <StatusLine label="Latency" value="~95ms" color="bg-green-400" />

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground/60 font-mono">
              Transcribing...
            </span>
            <span className="text-primary font-mono">82%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "82%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

function SmartDictationVisual() {
  const bars = Array.from({ length: 32 }, (_, i) => ({
    h: Math.round(15 + Math.sin(i * 0.6) * 20 + ((i * 5 + 2) % 7) * 4),
    delay: Math.round(((i * 3 + 1) % 9)) / 10,
  }));

  return (
    <MockWindow title="omnivox — recording">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-mono text-red-400/80">
              Recording...
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground/60">
            0:03.2
          </span>
        </div>

        <div className="flex items-end justify-center gap-px h-12 overflow-hidden">
          {bars.map((bar, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-primary/50 origin-bottom"
              style={{
                height: `${bar.h}%`,
                animation: `wave-bar ${1.5 + (i % 3) * 0.3}s ease-in-out ${bar.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground/50 mb-1 font-mono">
            Output:
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            &ldquo;The quarterly report shows significant growth in the
            enterprise segment across all regions.&rdquo;
          </p>
        </div>
      </div>
    </MockWindow>
  );
}

function AICleanupVisual() {
  return (
    <MockWindow title="omnivox — qwen3 cleanup">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
              Raw
            </span>
          </div>
          <p className="text-sm text-muted-foreground/70 leading-relaxed line-through decoration-muted-foreground/20">
            the quarterly report shows uh significant growth in enterprise
            segement across all the regions
          </p>
        </div>

        <div className="flex items-center gap-2 text-primary/60">
          <Sparkles className="size-3" />
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-wider">
              Enhanced
            </span>
            <Check className="size-3 text-green-400/60" />
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            The quarterly report shows significant growth in the enterprise
            segment across all regions.
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/60">
            +capitalization
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/60">
            -filler words
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary/60">
            ~spelling
          </span>
        </div>
      </div>
    </MockWindow>
  );
}

const showcases = [
  {
    badge: "Privacy",
    icon: Shield,
    title: "Your data stays on your machine",
    description:
      "OmniVox processes everything locally using Whisper AI. No cloud servers, no API calls, no telemetry. Your voice data is never transmitted, stored remotely, or accessible to anyone but you.",
    highlights: [
      "No internet connection required",
      "Zero data transmission to external servers",
      "No accounts, no tracking, no analytics",
      "Full SQLite database stored on your machine",
    ],
    visual: <ZeroCloudVisual />,
    reverse: false,
  },
  {
    badge: "Workflow",
    icon: Activity,
    title: "Dictation that adapts to you",
    description:
      "Voice Activity Detection automatically knows when you've finished speaking. The global hotkey works from any application. Text appears exactly where your cursor is — or on your clipboard. Your choice.",
    highlights: [
      "Auto-stops when you stop speaking",
      "Works from any application via system hotkey",
      "Choose clipboard, direct typing, or both",
      "Floating overlay shows recording status",
    ],
    visual: <SmartDictationVisual />,
    reverse: true,
  },
  {
    badge: "Intelligence",
    icon: Sparkles,
    title: "Qwen3 polishes, locally",
    description:
      "Qwen3-0.6B runs entirely on your machine to clean up grammar, remove filler words, and fix spelling — without sending a single byte to the cloud. Define custom dictionaries and snippet shortcuts for domain-specific accuracy.",
    highlights: [
      "Qwen3-0.6B quantized model, bundled and ready to go",
      "Custom dictionary for domain-specific terms",
      "Snippet triggers expand shorthand instantly",
      "Before/after correction tracking",
    ],
    visual: <AICleanupVisual />,
    reverse: false,
  },
];

export function FeatureShowcase() {
  return (
    <div className="py-24 lg:py-32 space-y-24 lg:space-y-32">
      {showcases.map((showcase, i) => {
        const Icon = showcase.icon;

        return (
          <div key={showcase.badge} className="max-w-6xl mx-auto px-6">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                showcase.reverse ? "lg:direction-rtl" : ""
              }`}
            >
              <AnimatedDiv
                className={showcase.reverse ? "lg:order-2" : "lg:order-1"}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="size-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {showcase.badge}
                  </span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  {showcase.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {showcase.description}
                </p>

                <ul className="space-y-2.5">
                  {showcase.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="size-4 text-primary/70 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedDiv>

              <AnimatedDiv
                delay={0.15}
                className={showcase.reverse ? "lg:order-1" : "lg:order-2"}
              >
                {showcase.visual}
              </AnimatedDiv>
            </div>
          </div>
        );
      })}
    </div>
  );
}
