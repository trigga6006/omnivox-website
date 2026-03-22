"use client";

import { motion } from "framer-motion";
import { Keyboard, Mic, Type } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    icon: Keyboard,
    title: "Press the hotkey",
    description:
      "Hit Ctrl+Alt from anywhere on your system. OmniVox instantly starts listening.",
  },
  {
    number: "02",
    icon: Mic,
    title: "Speak naturally",
    description:
      "Talk at your normal pace. Voice detection handles the rest — no buttons to press.",
  },
  {
    number: "03",
    icon: Type,
    title: "Text appears",
    description:
      "Your words are transcribed locally and inserted right where your cursor is.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 border-y border-border bg-card/20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <AnimatedDiv>
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs border-primary/20 text-primary bg-primary/5"
            >
              How It Works
            </Badge>
          </AnimatedDiv>

          <AnimatedDiv delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Three steps. That&apos;s it.
            </h2>
          </AnimatedDiv>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimatedDiv key={step.number} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative text-center flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-[10px] font-heading font-bold text-primary/60 bg-background border border-border rounded-full w-6 h-6 flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              </AnimatedDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
