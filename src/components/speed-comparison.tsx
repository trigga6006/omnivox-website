"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Keyboard, Mic } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

const SAMPLE_TEXT =
  "The quarterly report shows significant growth across all enterprise segments. Revenue increased by thirty-two percent compared to last year, driven primarily by expansion into new markets and improved customer retention rates.";

const TYPING_WPM = 40;
const VOICE_WPM = 160;

// Characters per millisecond based on WPM (average 5 chars per word)
const TYPING_CPMS = (TYPING_WPM * 5) / 60000;
const VOICE_CPMS = (VOICE_WPM * 5) / 60000;

function MockDocument({
  title,
  icon: Icon,
  children,
  accentColor,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/60 overflow-hidden shadow-2xl shadow-black/20 h-full">
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
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`size-3.5 ${accentColor}`} />
            <span className={`text-xs font-mono font-medium ${accentColor}`}>
              {title}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function useTypewriter(
  text: string,
  cpms: number,
  active: boolean,
  startDelay: number = 0
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const delayedRef = useRef(false);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const charCount = Math.min(
        Math.floor(elapsed * cpms),
        text.length
      );
      setDisplayed(text.slice(0, charCount));

      if (charCount < text.length) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    },
    [text, cpms]
  );

  useEffect(() => {
    if (!active) return;

    const delayTimer = setTimeout(() => {
      delayedRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, animate, startDelay]);

  // Reset when becoming inactive
  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      startTimeRef.current = null;
      delayedRef.current = false;
    }
  }, [active]);

  const wordCount = displayed.split(/\s+/).filter(Boolean).length;
  return { displayed, done, wordCount };
}

function Cursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.span
      className="inline-block w-[2px] h-[1.1em] bg-primary ml-px align-text-bottom"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
    />
  );
}

export function SpeedComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      const timer = setTimeout(() => setStarted(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, started]);

  const typing = useTypewriter(SAMPLE_TEXT, TYPING_CPMS, started, 0);
  const voice = useTypewriter(SAMPLE_TEXT, VOICE_CPMS, started, 0);

  // Calculate elapsed time for WPM display
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (started && !voice.done) {
      const start = Date.now();
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - start);
      }, 100);
      return () => clearInterval(timerRef.current);
    }
    if (voice.done) {
      clearInterval(timerRef.current);
    }
  }, [started, voice.done]);

  const elapsedMin = elapsedMs / 60000;
  const typingWpm =
    elapsedMin > 0 ? Math.round(typing.wordCount / elapsedMin) : 0;
  const voiceWpm =
    elapsedMin > 0 ? Math.round(voice.wordCount / elapsedMin) : 0;

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.16_75/0.04)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <AnimatedDiv>
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs border-primary/20 text-primary bg-primary/5"
            >
              Speed
            </Badge>
          </AnimatedDiv>

          <AnimatedDiv delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Stop typing.{" "}
              <span className="text-primary">Start talking.</span>
            </h2>
          </AnimatedDiv>

          <AnimatedDiv delay={0.2}>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              The average person types at 40 WPM. You speak at 150+. Watch the
              difference in real time.
            </p>
          </AnimatedDiv>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Typing side */}
          <AnimatedDiv>
            <MockDocument
              title="Keyboard Input"
              icon={Keyboard}
              accentColor="text-muted-foreground"
            >
              <div className="min-h-[180px] rounded-lg bg-muted/30 border border-border p-4">
                <p className="text-sm text-foreground/90 leading-relaxed font-mono whitespace-pre-wrap">
                  {typing.displayed}
                  <Cursor visible={started && !typing.done} />
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      started && !typing.done
                        ? "bg-muted-foreground/60 animate-pulse"
                        : typing.done
                          ? "bg-muted-foreground/40"
                          : "bg-muted-foreground/20"
                    }`}
                  />
                  <span className="text-[11px] font-mono text-muted-foreground/60">
                    {typing.done ? "Done" : started ? "Typing..." : "Waiting"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground/60">
                    {typing.wordCount} words
                  </span>
                  <span className="text-xs font-mono font-medium text-muted-foreground/80 tabular-nums">
                    {typingWpm} WPM
                  </span>
                </div>
              </div>
            </MockDocument>
          </AnimatedDiv>

          {/* Voice side */}
          <AnimatedDiv delay={0.15}>
            <MockDocument
              title="OmniVox Transcription"
              icon={Mic}
              accentColor="text-primary"
            >
              <div className="min-h-[180px] rounded-lg bg-primary/[0.03] border border-primary/10 p-4">
                <p className="text-sm text-foreground/90 leading-relaxed font-mono whitespace-pre-wrap">
                  {voice.displayed}
                  <Cursor visible={started && !voice.done} />
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      started && !voice.done
                        ? "bg-primary animate-pulse"
                        : voice.done
                          ? "bg-green-400"
                          : "bg-muted-foreground/20"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-mono ${
                      voice.done
                        ? "text-green-400/80"
                        : started
                          ? "text-primary/80"
                          : "text-muted-foreground/60"
                    }`}
                  >
                    {voice.done
                      ? "Complete"
                      : started
                        ? "Transcribing..."
                        : "Waiting"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground/60">
                    {voice.wordCount} words
                  </span>
                  <span className="text-xs font-mono font-medium text-primary tabular-nums">
                    {voiceWpm} WPM
                  </span>
                </div>
              </div>
            </MockDocument>
          </AnimatedDiv>
        </div>

        {/* Speed multiplier callout */}
        <AnimatedDiv delay={0.3}>
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={voice.done ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {voice.done && (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5">
                <span className="text-sm text-muted-foreground">
                  Voice transcription finished
                </span>
                <span className="font-heading font-bold text-primary text-lg">
                  4x faster
                </span>
              </div>
            )}
          </motion.div>
        </AnimatedDiv>
      </div>
    </section>
  );
}
