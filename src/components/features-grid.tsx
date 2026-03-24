"use client";

import { motion } from "framer-motion";
import {
  CloudOff,
  AudioLines,
  Keyboard,
  Layers,
  Rocket,
  PenLine,
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
    icon: Layers,
    title: "Context Modes",
    description:
      "Create custom profiles with scoped dictionaries and snippets. Bind apps like VS Code or Slack to auto-switch modes when you focus them.",
  },
  {
    icon: Keyboard,
    title: "Global Hotkey",
    description:
      "Press Ctrl+Alt from anywhere to start dictating. Hold-to-record or double-tap to toggle.",
  },
  {
    icon: AudioLines,
    title: "Voice Commands",
    description:
      "Say \"new line\", \"new paragraph\", or \"delete last word\" while dictating to control formatting with your voice.",
  },
  {
    icon: Rocket,
    title: "Ship Mode",
    description:
      "Auto-presses Enter after transcription lands. Dictate and send messages instantly in Slack, Discord, Teams, and more.",
  },
  {
    icon: PenLine,
    title: "Writing Styles",
    description:
      "Choose Formal, Casual, or Very Casual output. Control capitalization, punctuation, and tone — globally or per context mode.",
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
