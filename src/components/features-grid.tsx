"use client";

import { motion } from "framer-motion";
import {
  CloudOff,
  Mic,
  Keyboard,
  Clipboard,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: CloudOff,
    title: "Zero Cloud",
    description:
      "All transcription runs locally via Whisper. No internet needed. No data leaves your device.",
  },
  {
    icon: Mic,
    title: "Smart Voice Detection",
    description:
      "VAD auto-stops recording when you finish speaking. No manual stop required.",
  },
  {
    icon: Keyboard,
    title: "Global Hotkey",
    description:
      "Press Ctrl+Alt from anywhere to start dictating. Hold-to-record or double-tap to toggle.",
  },
  {
    icon: Clipboard,
    title: "Multi-Output",
    description:
      "Paste via clipboard, simulate keystrokes directly into any app, or use both simultaneously.",
  },
  {
    icon: Sparkles,
    title: "Qwen3 AI Cleanup",
    description:
      "Optional local Qwen3 LLM polishes grammar, removes filler words, and fixes spelling — entirely on-device.",
  },
  {
    icon: Zap,
    title: "4 Whisper Models",
    description:
      "Choose from Tiny, Base, Small, or Medium Whisper models. Hardware-aware recommendations for your CPU.",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  return (
    <AnimatedDiv delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
        className="group relative h-full rounded-xl border border-border bg-card/40 p-6 transition-all duration-300 hover:border-primary/15 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="size-5" />
        </div>

        <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
          {feature.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </motion.div>
    </AnimatedDiv>
  );
}

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <AnimatedDiv>
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs border-primary/20 text-primary bg-primary/5"
            >
              Features
            </Badge>
          </AnimatedDiv>

          <AnimatedDiv delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
              Everything you need.
              <br />
              <span className="text-muted-foreground">
                Nothing you don&apos;t.
              </span>
            </h2>
          </AnimatedDiv>

          <AnimatedDiv delay={0.2}>
            <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Professional dictation with local AI processing, built for
              speed, privacy, and seamless integration into your workflow.
            </p>
          </AnimatedDiv>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
