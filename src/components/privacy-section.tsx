"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, ServerOff, HardDrive } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";

const privacyPoints = [
  {
    icon: ServerOff,
    text: "No cloud servers — processing never leaves your machine",
  },
  {
    icon: Lock,
    text: "No accounts, passwords, or authentication required",
  },
  {
    icon: HardDrive,
    text: "All data stored locally in your own SQLite database",
  },
];

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="py-24 lg:py-32 border-y border-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_75/0.03)_0%,transparent_60%)]" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <AnimatedDiv>
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 mb-6"
            style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
          >
            <ShieldCheck className="size-8 text-primary" />
          </motion.div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.1}>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Your data never leaves
            <br />
            <span className="text-primary">your machine. Period.</span>
          </h2>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
            OmniVox was built from the ground up with a single principle:
            your voice data belongs to you. There are no servers to breach,
            no APIs to intercept, no data to leak.
          </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {privacyPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 text-primary/70 shrink-0" />
                  <span>{point.text}</span>
                </div>
              );
            })}
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
}
