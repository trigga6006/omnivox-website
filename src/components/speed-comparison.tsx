"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Keyboard, Mic } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

const SAMPLE_TEXT =
  "The quarterly report shows significant growth across all enterprise segments. Revenue increased by thirty-two percent compared to last year, driven primarily by expansion into new markets and improved customer retention rates.";

// Demo-accelerated speeds — keeps the 4x ratio but finishes in ~10s
// Voice: ~3.5s to complete, Typing: ~14s (only gets ~25% through before voice wins)
const VOICE_CPMS = SAMPLE_TEXT.length / 3500; // ~65 chars/sec
const TYPING_CPMS = VOICE_CPMS / 4; // 4x slower

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
  startDelay: number = 0,
  stuttery: boolean = false
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const delayedRef = useRef(false);
  // Pre-generate stutter pattern for consistent pauses
  const stutterMapRef = useRef<number[]>([]);

  useEffect(() => {
    if (stuttery && stutterMapRef.current.length === 0) {
      // Build a cumulative time array with micro-pauses every 2-4 chars
      const map: number[] = [];
      let t = 0;
      let burstLen = 0;
      const nextBurst = () => 2 + Math.floor(Math.random() * 3);
      let burstTarget = nextBurst();
      for (let i = 0; i < text.length; i++) {
        t += 1 / cpms; // base ms per char
        burstLen++;
        if (burstLen >= burstTarget) {
          // Add a micro-pause (80-200ms)
          t += 80 + Math.random() * 120;
          burstLen = 0;
          burstTarget = nextBurst();
        }
        map.push(t);
      }
      stutterMapRef.current = map;
    }
  }, [stuttery, text, cpms]);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      let charCount: number;
      if (stuttery && stutterMapRef.current.length > 0) {
        // Binary search for how many chars fit within elapsed time
        const map = stutterMapRef.current;
        let lo = 0, hi = map.length;
        while (lo < hi) {
          const mid = (lo + hi) >>> 1;
          if (map[mid] <= elapsed) lo = mid + 1;
          else hi = mid;
        }
        charCount = Math.min(lo, text.length);
      } else {
        charCount = Math.min(Math.floor(elapsed * cpms), text.length);
      }

      setDisplayed(text.slice(0, charCount));

      if (charCount < text.length) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    },
    [text, cpms, stuttery]
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

  const typing = useTypewriter(SAMPLE_TEXT, TYPING_CPMS, started, 0, true);
  const voice = useTypewriter(SAMPLE_TEXT, VOICE_CPMS, started, 0, false);

  // Show the real WPM labels, animated up from 0
  const [typingWpm, setTypingWpm] = useState(0);
  const [voiceWpm, setVoiceWpm] = useState(0);

  useEffect(() => {
    if (!started) {
      setTypingWpm(0);
      setVoiceWpm(0);
      return;
    }
    // Animate WPM counters up over 800ms after start
    const start = Date.now();
    const raf = setInterval(() => {
      const t = Math.min((Date.now() - start) / 800, 1);
      const ease = t * (2 - t); // easeOut
      setTypingWpm(Math.round(40 * ease));
      setVoiceWpm(Math.round(160 * ease));
      if (t >= 1) clearInterval(raf);
    }, 30);
    return () => clearInterval(raf);
  }, [started]);

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
        {voice.done && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-primary/25 bg-primary/[0.07] shadow-lg shadow-primary/10">
              <span className="text-sm text-muted-foreground">
                Voice finished while typing is at{" "}
                <span className="text-foreground/80 font-medium">
                  {Math.round((typing.displayed.length / SAMPLE_TEXT.length) * 100)}%
                </span>
              </span>
              <div className="w-px h-5 bg-primary/20" />
              <span className="font-heading font-bold text-primary text-xl tracking-tight">
                4x faster
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
