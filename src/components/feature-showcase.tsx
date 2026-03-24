"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Rocket, Check, Layers } from "lucide-react";
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

function ShipModeVisual() {
  return (
    <MockWindow title="omnivox — ship mode">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="size-3 text-primary" />
            <span className="text-xs font-mono font-medium text-primary">
              Ship Mode Active
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-400/15 text-green-400 border border-green-400/20">
            Armed
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
            Transcribed
          </span>
          <div className="mt-2 rounded-lg bg-muted/50 border border-border px-3 py-2">
            <p className="text-sm text-foreground/90 leading-relaxed">
              Update the auth middleware to validate JWT tokens on every request
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground/60">Auto-sending...</span>
            <span className="text-primary">1.5s</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "linear", delay: 0.5 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-xs font-mono text-green-400/80">
          <Check className="size-3" />
          <span>Enter pressed — message shipped</span>
        </div>
      </div>
    </MockWindow>
  );
}

function ContextModesVisual() {
  return (
    <MockWindow title="omnivox — context modes">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-mono font-medium text-primary">
              General
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs font-mono text-muted-foreground">
              Programming
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
              Mode Dictionary
            </span>
            <span className="text-[10px] font-mono text-primary/50">
              70+ entries
            </span>
          </div>

          <div className="space-y-1">
            {[
              { from: "react", to: "React" },
              { from: "typescript", to: "TypeScript" },
              { from: "api", to: "API" },
            ].map((entry) => (
              <div
                key={entry.from}
                className="flex items-center gap-2 text-xs font-mono"
              >
                <span className="text-muted-foreground/60">{entry.from}</span>
                <span className="text-primary/40">&rarr;</span>
                <span className="text-foreground/80">{entry.to}</span>
              </div>
            ))}
            <span className="text-[10px] text-muted-foreground/30 font-mono">
              + 67 more...
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-2">
            Waveform Color
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-px h-6">
              {[40, 65, 85, 70, 50, 75, 90, 60, 45, 80, 55, 70].map(
                (h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-blue-400/70"
                    style={{ height: `${h}%` }}
                  />
                )
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/50">
              Matches active mode color
            </span>
          </div>
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
    badge: "Ship Mode",
    icon: Rocket,
    title: "Dictate it. Ship it.",
    description:
      "Ship Mode auto-presses Enter 1.5 seconds after your transcription lands in the text field. Designed for agentic coding workflows with Claude Code, Cursor, and any chat-based tool — dictate your intent and it ships, completely hands-free.",
    highlights: [
      "Auto-sends 1.5s after transcription completes",
      "Built for agentic coding with Claude Code & Cursor",
      "Works with TypeSimulation and Both output modes",
      "Toggle instantly from the floating pill or settings",
    ],
    visual: <ShipModeVisual />,
    reverse: false,
  },
  {
    badge: "Context Modes",
    icon: Layers,
    title: "Switch profiles, switch vocabulary",
    description:
      "Context Modes let you switch between General and Programming profiles — each with its own scoped dictionary and snippets. Programming mode ships with 70+ entries for languages, frameworks, and tools. The floating pill changes color to match your active mode.",
    highlights: [
      "General and Programming modes with scoped dictionaries",
      "70+ built-in programming terms (React, TypeScript, API, etc.)",
      "Mode-specific snippets for shebangs, comment markers, and more",
      "Waveform color reflects active mode — amber, blue, and beyond",
    ],
    visual: <ContextModesVisual />,
    reverse: true,
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
