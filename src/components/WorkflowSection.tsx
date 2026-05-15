import { Keyboard, Mic, Sparkles, ArrowDownToLine } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Press the hotkey",
    body: "Ctrl + Alt by default. Remap to any one or two-key combo.",
    icon: <Keyboard className="size-5" />,
    kbd: ["Ctrl", "Alt"],
  },
  {
    num: "02",
    title: "Speak naturally",
    body: "Whisper transcribes locally with screen-context bias for technical terms.",
    icon: <Mic className="size-5" />,
    kbd: ["···"],
  },
  {
    num: "03",
    title: "Say “voxify” (optional)",
    body: "Qwen3 classifies intent and slots your words into a clean prompt shape.",
    icon: <Sparkles className="size-5" />,
    kbd: ["voxify"],
  },
  {
    num: "04",
    title: "Lands in your app",
    body: "Type-simulation pastes it where your cursor is, then restores focus.",
    icon: <ArrowDownToLine className="size-5" />,
    kbd: ["↵"],
  },
];

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="relative overflow-hidden px-6 py-24 lg:py-28"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
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
              How it works
            </span>
            <h2
              className="font-display mt-5 text-[38px] leading-[0.98] font-medium tracking-[-0.02em] sm:text-[48px] lg:text-[56px]"
              style={{ color: "var(--foreground)" }}
            >
              Four keypresses from{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--ember)" }}
              >
                thought
              </span>{" "}
              to{" "}
              <span
                className="font-display-italic"
                style={{ color: "var(--ember)" }}
              >
                shipped.
              </span>
            </h2>
          </div>
          <p
            className="max-w-md text-[15.5px] leading-[1.55]"
            style={{ color: "var(--dark-secondary)" }}
          >
            The whole flow is one global hotkey, your voice, and an optional
            word that turns plain dictation into a structured prompt. Nothing
            else to learn.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[42px] hidden h-px lg:block"
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--border) 0 6px, transparent 6px 12px)",
            }}
          />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.num} className="relative flex flex-col gap-4">
                {/* Numbered dot */}
                <div className="relative z-10 flex items-center gap-3">
                  <span
                    className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl shrink-0"
                    style={{
                      backgroundColor: "var(--paper)",
                      border: "1px solid var(--border)",
                      color: "var(--ember)",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 22px -16px rgba(31,20,10,0.2)",
                    }}
                  >
                    {step.icon}
                  </span>
                  <span
                    className="font-display text-[28px] font-medium leading-none"
                    style={{ color: "var(--ember)" }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Title + body */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-display text-[22px] font-medium leading-tight"
                    style={{ color: "var(--foreground)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[14.5px] leading-[1.55]"
                    style={{ color: "var(--dark-secondary)" }}
                  >
                    {step.body}
                  </p>
                </div>

                {/* KBD chips */}
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  {step.kbd.map((k, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {i > 0 && (
                        <span
                          className="font-mono text-[10px]"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          +
                        </span>
                      )}
                      <kbd
                        className="rounded-md px-2 py-0.5 font-mono text-[11px]"
                        style={{
                          backgroundColor: "var(--paper)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                          boxShadow:
                            "inset 0 -1px 0 var(--border)",
                        }}
                      >
                        {k}
                      </kbd>
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
