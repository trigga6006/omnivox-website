"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  q: string;
  a: React.ReactNode;
}

const FAQS: FAQ[] = [
  {
    q: "Does my voice really stay on my machine?",
    a: (
      <>
        Yes — both Whisper (speech) and Qwen3 (the optional structuring LLM)
        run as native code through{" "}
        <span className="font-mono">whisper.cpp</span> and{" "}
        <span className="font-mono">llama.cpp</span> on your hardware. There
        are no outbound network calls, no API keys, no telemetry. You can run
        OmniVox on an air-gapped laptop and it still works.
      </>
    ),
  },
  {
    q: "What hardware do I need?",
    a: (
      <>
        Whisper&apos;s <span className="font-mono">base</span> and{" "}
        <span className="font-mono">small</span> models run comfortably on
        modern CPUs. For <span className="font-mono">medium</span> /{" "}
        <span className="font-mono">large</span> models and live Structured
        Mode, a Vulkan-capable GPU (or NVIDIA + CUDA) is a noticeable
        upgrade. The Models tab inspects your machine and recommends a fit.
      </>
    ),
  },
  {
    q: "How accurate is dictation, really?",
    a: (
      <>
        Whisper is state-of-the-art for general English. OmniVox layers two
        things on top: a <em>Vocabulary</em> prompt that biases recognition
        toward your domain (file paths, product names, jargon), and on
        Windows, <em>screen-context bias</em> that reads identifiers from
        your focused window. Technical strings transcribe verbatim where
        cloud tools mishear them.
      </>
    ),
  },
  {
    q: "What is Structured Mode and how do I trigger it?",
    a: (
      <>
        Structured Mode runs a small local LLM over your transcript and
        rewrites it as a clean prompt with labeled sections — Goal, Files,
        Constraints, Urgency — that agentic tools (Claude Code, Cursor,
        Codex) read directly. It only fires when you end your speech with
        the phrase{" "}
        <span className="font-mono" style={{ color: "var(--ember)" }}>
          &ldquo;voxify&rdquo;
        </span>{" "}
        (or one of its phonetic aliases). Plain dictation otherwise.
      </>
    ),
  },
  {
    q: "Will it work in the apps I already use?",
    a: (
      <>
        Anywhere a keyboard works. OmniVox simulates keystrokes (or pastes
        from clipboard, or both — your choice) into the focused window, then
        restores focus. We test against Claude Code, Cursor, VS Code,
        terminals, Notion, Linear, Slack, Gmail, Discord, and every other
        text field on your desktop.
      </>
    ),
  },
  {
    q: "Can I have different vocabularies for different apps?",
    a: (
      <>
        Yes — that&apos;s what <em>Context Modes</em> are. Each mode gets its
        own vocabulary, dictionary (phonetic substitutions), snippets
        (text expansions), writing style, and app bindings. Switch from the
        floating pill or let OmniVox auto-switch when you switch windows.
      </>
    ),
  },
  {
    q: "What languages does it support?",
    a: (
      <>
        Whisper handles 100+ languages with optional translation. OmniVox
        exposes the language selector in Settings and routes through the
        same local pipeline — no per-language cloud surfaces, no
        per-language pricing.
      </>
    ),
  },
  {
    q: "How is this different from Wispr Flow / Otter / Superwhisper?",
    a: (
      <>
        Most alternatives stream your audio to a cloud, charge a
        subscription, and emit raw text. OmniVox runs entirely on your
        machine, is free during early access, and shapes its output for
        agentic dev tools instead of just typing what you said. No account
        required.
      </>
    ),
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative px-6 py-24 lg:py-32"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
              style={{
                backgroundColor: "var(--paper)",
                border: "1px solid var(--border)",
                color: "var(--ember)",
              }}
            >
              <span
                className="inline-block size-1.5 rounded-full"
                style={{ backgroundColor: "var(--ember)" }}
              />
              FAQ
            </span>
            <h2
              className="font-display text-[42px] leading-[0.96] font-medium tracking-[-0.02em] sm:text-[52px] lg:text-[64px]"
              style={{ color: "var(--foreground)" }}
            >
              Honest answers,{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--ember)" }}
              >
                no marketing.
              </span>
            </h2>
            <p
              className="max-w-md text-[15.5px] leading-[1.55]"
              style={{ color: "var(--dark-secondary)" }}
            >
              The questions worth answering before you install something on
              your machine that listens to you.
            </p>
          </div>

          {/* Right: accordion */}
          <ol className="flex flex-col">
            {FAQS.map((faq, idx) => {
              const isOpen = open === idx;
              return (
                <li
                  key={faq.q}
                  className="relative"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:opacity-80"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-[11px] tabular-nums"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-display text-[19px] leading-snug md:text-[22px]"
                        style={{
                          color: "var(--foreground)",
                          fontWeight: isOpen ? 500 : 400,
                        }}
                      >
                        {faq.q}
                      </span>
                    </span>
                    <span
                      className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full transition-all"
                      style={{
                        backgroundColor: isOpen ? "var(--ember)" : "var(--paper)",
                        color: isOpen ? "#FFFBF1" : "var(--foreground)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div
                      className="pb-6 pl-10 pr-12 text-[14.5px] leading-[1.65]"
                      style={{ color: "var(--dark-secondary)" }}
                    >
                      {faq.a}
                    </div>
                  </div>
                </li>
              );
            })}
            <li
              className="relative"
              style={{ borderTop: "1px solid var(--border)" }}
            />
          </ol>
        </div>
      </div>
    </section>
  );
}
