import { Sparkles, FileCode, GitBranch, ArrowRight } from "lucide-react";
import { ClaudeCodeLogo, CursorLogo, CodexLogo, AiderLogo } from "./AppLogos";

const AGENTS = [
  { name: "Claude Code", Logo: ClaudeCodeLogo },
  { name: "Cursor", Logo: CursorLogo },
  { name: "Codex", Logo: CodexLogo },
  { name: "Aider", Logo: AiderLogo },
];

type FlowStep =
  | { kind: "raw"; label: string; body: string }
  | { kind: "structured"; label: string }
  | { kind: "agent"; label: string; body: string };

const FLOW: FlowStep[] = [
  {
    kind: "raw",
    label: "you say",
    body: "fix the auth middleware, the jwt refresh keeps failing on stale tokens, has to ship by friday, voxify",
  },
  {
    kind: "structured",
    label: "structured",
  },
  {
    kind: "agent",
    label: "agent receives",
    body: "Reading src/middleware/auth.ts… I see the JWT refresh handler. To preserve the existing flow, I'll …",
  },
];

const STRUCTURED_SECTIONS = [
  { heading: "Goal", body: "Fix auth middleware on stale JWT refresh" },
  { heading: "Files", body: "src/middleware/auth.ts", mono: true },
  { heading: "Constraints", body: "Must not break refresh-token flow" },
  { heading: "Urgency", body: "high — Friday review" },
];

export function AgenticSection() {
  return (
    <section
      id="agentic"
      className="relative overflow-hidden px-6 py-28 lg:py-36 grain-overlay"
      style={{
        backgroundColor: "var(--section-deep-bg)",
        color: "#F5E9CC",
      }}
    >
      {/* Warm orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 w-[900px] h-[420px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,120,44,0.22), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(216,84,29,0.18) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
            style={{
              backgroundColor: "rgba(245,233,204,0.06)",
              border: "1px solid rgba(245,233,204,0.12)",
              color: "#FFB166",
            }}
          >
            <Sparkles className="size-3" />
            Built for agentic dev tools
          </span>

          <h2
            className="font-display mt-7 max-w-[20ch] text-[46px] leading-[0.96] font-medium tracking-[-0.02em] sm:text-[64px] lg:text-[88px]"
            style={{ color: "#F5E9CC" }}
          >
            Talk to your{" "}
            <span
              className="font-display-italic"
              style={{ color: "#FFB166" }}
            >
              agents.
            </span>
          </h2>

          <p
            className="mt-7 max-w-[640px] text-[17px] leading-[1.6]"
            style={{ color: "rgba(245,233,204,0.7)" }}
          >
            Most dictation tools just paste text. OmniVox shapes what you say
            into the structure agentic coding tools actually want — intent
            classification, preserved file paths, explicit constraints. Skip
            the prompt-engineering tax.
          </p>

          {/* Agent logos */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(245,233,204,0.4)" }}
            >
              tested with
            </span>
            <div className="flex items-center gap-3">
              {AGENTS.map((agent) => (
                <div
                  key={agent.name}
                  className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1"
                  style={{
                    backgroundColor: "rgba(245,233,204,0.04)",
                    border: "1px solid rgba(245,233,204,0.1)",
                  }}
                >
                  <span
                    className="flex size-6 items-center justify-center rounded-full overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                    }}
                  >
                    <agent.Logo className="size-4" />
                  </span>
                  <span
                    className="text-[12.5px] font-medium"
                    style={{ color: "rgba(245,233,204,0.85)" }}
                  >
                    {agent.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The flow */}
        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {FLOW.map((step, idx) => (
            <div
              key={step.label}
              className="relative rounded-3xl p-6"
              style={{
                backgroundColor: "rgba(245,233,204,0.04)",
                border: "1px solid rgba(245,233,204,0.1)",
              }}
            >
              {/* Step badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="flex size-6 items-center justify-center rounded-full font-mono text-[10px] font-semibold"
                    style={{
                      backgroundColor: "rgba(232,120,44,0.18)",
                      color: "#FFB166",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                    style={{ color: "rgba(245,233,204,0.55)" }}
                  >
                    {step.label}
                  </span>
                </div>
                {idx === 0 && (
                  <span
                    className="font-mono text-[9.5px]"
                    style={{ color: "rgba(245,233,204,0.4)" }}
                  >
                    + voxify
                  </span>
                )}
                {idx === 1 && (
                  <span
                    className="font-mono text-[9.5px] rounded-full px-2 py-0.5"
                    style={{
                      backgroundColor: "rgba(16,185,129,0.15)",
                      color: "#34D399",
                    }}
                  >
                    intent · implementation
                  </span>
                )}
                {idx === 2 && (
                  <span
                    className="font-mono text-[9.5px]"
                    style={{ color: "rgba(245,233,204,0.4)" }}
                  >
                    pasted by OV
                  </span>
                )}
              </div>

              {/* Body */}
              {step.kind === "structured" ? (
                <div className="flex flex-col gap-3">
                  {STRUCTURED_SECTIONS.map((s) => (
                    <div key={s.heading} className="flex flex-col gap-1">
                      <span
                        className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
                        style={{ color: "#FFB166" }}
                      >
                        {s.heading}
                      </span>
                      <span
                        className={
                          s.mono
                            ? "font-mono text-[12.5px] leading-snug"
                            : "text-[14px] leading-snug"
                        }
                        style={{ color: "#F5E9CC" }}
                      >
                        {s.body}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className={`text-[14.5px] leading-[1.6] ${
                    step.kind === "agent" ? "font-display-italic" : ""
                  } ${step.kind === "raw" ? "lowercase" : ""}`}
                  style={{
                    color:
                      step.kind === "raw"
                        ? "rgba(245,233,204,0.55)"
                        : "rgba(245,233,204,0.92)",
                  }}
                >
                  {step.body}
                </p>
              )}

              {/* Arrow between steps */}
              {idx < FLOW.length - 1 && (
                <div
                  className="hidden lg:block absolute right-[-22px] top-1/2 z-10 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <span
                    className="flex size-9 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--section-deep-bg)",
                      border: "1px solid rgba(232,120,44,0.4)",
                    }}
                  >
                    <ArrowRight className="size-4" style={{ color: "#FFB166" }} />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom guarantees */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Guarantee
            icon={<FileCode className="size-4" />}
            title="File paths preserved"
            body="If you said it, it appears. If you didn’t, it doesn’t — the model is forbidden from inventing filenames."
          />
          <Guarantee
            icon={<GitBranch className="size-4" />}
            title="Intent classified"
            body="Implementation, exploration, or advice. Each maps to a different slot shape so agents read context the right way."
          />
          <Guarantee
            icon={<Sparkles className="size-4" />}
            title="Clean every time"
            body="Filler words, repetition, and third-person mishears are stripped. What lands in your editor is the prompt you meant to write."
          />
        </div>
      </div>
    </section>
  );
}

function Guarantee({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="flex size-8 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "rgba(232,120,44,0.16)",
          color: "#FFB166",
        }}
      >
        {icon}
      </span>
      <span className="font-display text-[18px] font-medium" style={{ color: "#F5E9CC" }}>
        {title}
      </span>
      <span
        className="text-[13.5px] leading-[1.5]"
        style={{ color: "rgba(245,233,204,0.6)" }}
      >
        {body}
      </span>
    </div>
  );
}
