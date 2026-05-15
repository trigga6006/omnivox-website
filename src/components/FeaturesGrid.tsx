import {
  Plus,
  Mic,
  Layers,
  Mail,
  Terminal,
  FileText,
  MessageSquare,
  BookOpen,
  ScrollText,
  ArrowRight,
  ShieldCheck,
  Eye,
  Cpu,
  KeyRound,
} from "lucide-react";

/* ============================================================ */
/*  Section A — Structured Mode (Voxify) — flagship feature      */
/* ============================================================ */

function StructuredModeSection() {
  return (
    <section
      id="structured"
      className="mx-auto w-full max-w-[1280px] px-6 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid var(--border)",
              color: "var(--ember)",
            }}
          >
            <span className="inline-block size-1.5 rounded-full" style={{ backgroundColor: "var(--ember)" }} />
            Structured Mode · voxify
          </span>

          <h2
            className="font-display text-[44px] leading-[0.96] font-medium tracking-[-0.02em] sm:text-[54px] lg:text-[64px]"
            style={{ color: "var(--foreground)" }}
          >
            Rambling thought,{" "}
            <span className="font-display-italic" style={{ color: "var(--ember)" }}>
              agent-ready
            </span>{" "}
            prompt.
          </h2>

          <p className="max-w-[520px] text-[17px] leading-[1.55]" style={{ color: "var(--dark-secondary)" }}>
            Say <span className="font-mono text-[15px]" style={{ color: "var(--ember)" }}>&ldquo;voxify&rdquo;</span>{" "}
            at the end of any thought. A local Qwen3 model recognises whether
            you&apos;re asking to <em>implement</em>, <em>explore</em>, or
            <em> get advice</em>, and slots your speech into a grammar-validated
            prompt — file paths intact, fillers gone, hallucinations refused.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <FeatureBullet
              icon={<ShieldCheck className="size-4" />}
              title="Always in shape"
              body="Slots stay slots. The model can't drift into prose, double-fill, or skip required fields."
            />
            <FeatureBullet
              icon={<Eye className="size-4" />}
              title="Fabrication defences"
              body="Files must appear in your speech. Third-person rewritten. Short input refused."
            />
            <FeatureBullet
              icon={<KeyRound className="size-4" />}
              title="Voxify trigger"
              body="Only structures when you ask. Otherwise it&apos;s just clean dictation."
            />
          </div>
        </div>

        {/* Right: the structured demo split panel */}
        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid var(--border)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -28px rgba(31,20,10,0.32), 0 12px 24px -8px rgba(31,20,10,0.15)",
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="size-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <div className="size-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
              <div className="size-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span
                className="ml-3 font-mono text-[10.5px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                omnivox · structured preview
              </span>
              <span
                className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em]"
                style={{
                  backgroundColor: "rgba(16,185,129,0.12)",
                  color: "#10B981",
                }}
              >
                ready
              </span>
            </div>

            {/* Raw transcript panel — collapsible look */}
            <div
              className="p-5"
              style={{
                background:
                  "linear-gradient(180deg, var(--cream-dark) 0%, var(--paper) 100%)",
              }}
            >
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                style={{ color: "var(--muted-foreground)" }}
              >
                raw transcript ▾
              </p>
              <p
                className="mt-2 text-[14px] leading-[1.55]"
                style={{ color: "var(--dark-secondary)" }}
              >
                &ldquo;Um, okay, so we need to look at the auth middleware — the
                JWT refresh thing — it&apos;s failing on stale tokens in{" "}
                <span className="font-mono" style={{ color: "var(--foreground)" }}>
                  src/middleware/auth.ts
                </span>
                . Has to ship by Friday&apos;s review, can&apos;t break the
                refresh-token flow.{" "}
                <span style={{ color: "var(--ember)", fontWeight: 600 }}>
                  Voxify.
                </span>
                &rdquo;
              </p>
            </div>

            {/* Divider */}
            <div
              className="flex items-center justify-center gap-3 py-2.5"
              style={{
                backgroundColor: "var(--paper)",
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
              <span
                className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
                style={{ color: "var(--ember)" }}
              >
                qwen3 · structured · 240ms
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
            </div>

            {/* Structured output panel */}
            <div className="p-5" style={{ backgroundColor: "var(--paper)" }}>
              <div className="flex items-center justify-between mb-3">
                <p
                  className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  structured prompt
                </p>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em]"
                  style={{
                    backgroundColor: "rgba(232,120,44,0.12)",
                    color: "var(--ember)",
                  }}
                >
                  implementation
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Slot label="goal" value="Fix auth middleware on stale JWT refresh" />
                <Slot
                  label="files"
                  value="src/middleware/auth.ts"
                  mono
                />
                <Slot
                  label="constraints"
                  value="Must not break refresh-token flow"
                />
                <Slot
                  label="urgency"
                  value="High — Friday review"
                  pill={{ text: "high", color: "var(--ember)" }}
                />
              </div>

              {/* Action bar */}
              <div
                className="mt-5 flex items-center gap-2 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  type="button"
                  className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors"
                  style={{
                    backgroundColor: "var(--ember)",
                    color: "#FFFBF1",
                  }}
                >
                  Paste
                </button>
                <button
                  type="button"
                  className="rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  Copy
                </button>
                <button
                  type="button"
                  className="rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  Edit
                </button>
                <span className="flex-1" />
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  ↵ enter to paste
                </span>
              </div>
            </div>
          </div>

          {/* Floating "intent" badge */}
          <div
            className="absolute -top-3 -right-3 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{
              backgroundColor: "var(--section-deep-bg)",
              color: "#FFB166",
              boxShadow: "0 14px 28px -12px rgba(31,20,10,0.4)",
            }}
          >
            intent detected
          </div>
        </div>
      </div>
    </section>
  );
}

function Slot({
  label,
  value,
  mono,
  pill,
}: {
  label: string;
  value: string;
  mono?: boolean;
  pill?: { text: string; color: string };
}) {
  return (
    <div
      className="flex flex-col gap-1 pb-3"
      style={{ borderBottom: "1px dashed var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
          style={{ color: "var(--ember)" }}
        >
          {label}
        </span>
        {pill && (
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{
              backgroundColor: "rgba(232,120,44,0.12)",
              color: pill.color,
            }}
          >
            {pill.text}
          </span>
        )}
      </div>
      <span
        className={
          mono
            ? "font-mono text-[13px] leading-snug"
            : "text-[14.5px] leading-snug"
        }
        style={{ color: "var(--foreground)" }}
      >
        {value}
      </span>
    </div>
  );
}

function FeatureBullet({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "rgba(232,120,44,0.12)",
          color: "var(--ember)",
        }}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[14.5px] font-semibold" style={{ color: "var(--foreground)" }}>
          {title}
        </span>
        <span className="text-[13.5px] leading-snug" style={{ color: "var(--dark-secondary)" }}>
          {body}
        </span>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Section B — 2x2 feature cards (real OmniVox capabilities)    */
/* ============================================================ */

function PrivacyCard() {
  return (
    <FeatureCard
      title="Lives on your machine"
      subtitle="Whisper and Qwen run locally with optional Vulkan or CUDA acceleration. No cloud round-trip. No API keys. No telemetry. Air-gap-friendly."
      tag="Privacy"
    >
      <div
        className="relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl"
        style={{
          backgroundColor: "var(--section-deep-bg)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Top zone: orb visual */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden px-8 pt-10 pb-6">
          {/* Concentric rings */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 64 + i * 44,
                  height: 64 + i * 44,
                  border: `1px solid rgba(232,120,44,${0.34 - i * 0.07})`,
                }}
              />
            ))}
          </div>

          {/* Center mic pill */}
          <div
            className="relative flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(180deg, #2A1A0E 0%, #1F140A 100%)",
              border: "1px solid rgba(232,120,44,0.4)",
              boxShadow: "0 0 32px rgba(232,120,44,0.4)",
            }}
          >
            <Mic className="size-5" style={{ color: "#FFB166" }} />
          </div>

          {/* "your machine" pill — anchored to bottom of the orb zone */}
          <span
            className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{
              backgroundColor: "rgba(232,120,44,0.12)",
              color: "#FFB166",
              border: "1px solid rgba(232,120,44,0.25)",
            }}
          >
            <span
              className="inline-block size-1 rounded-full"
              style={{ backgroundColor: "#FFB166" }}
            />
            your machine
          </span>
        </div>

        {/* Bottom zone: tech stack — its own clean row, no overlap */}
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 px-5 py-4"
          style={{ borderTop: "1px solid rgba(245,233,204,0.08)" }}
        >
          {["whisper.cpp", "qwen3 · 0.6B", "vulkan", "cuda"].map((b) => (
            <span
              key={b}
              className="rounded-full px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em]"
              style={{
                backgroundColor: "rgba(245,233,204,0.06)",
                color: "rgba(245,233,204,0.6)",
                border: "1px solid rgba(245,233,204,0.1)",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </FeatureCard>
  );
}

function ScreenContextCard() {
  return (
    <FeatureCard
      title="Reads what's on screen"
      subtitle="Windows-only: OmniVox peeks at your focused window and feeds file paths, identifiers, and CLI flags to Whisper as bias tokens — so technical strings transcribe verbatim."
      tag="Screen Context"
    >
      <div
        className="relative flex min-h-[300px] flex-col gap-3 overflow-hidden rounded-3xl p-5"
        style={{
          backgroundColor: "var(--paper)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Mock window with visible technical text */}
        <div
          className="rounded-xl p-4 font-mono text-[11.5px] leading-[1.5]"
          style={{
            backgroundColor: "var(--section-deep-bg)",
            color: "rgba(245,233,204,0.85)",
            border: "1px solid var(--border)",
          }}
        >
          <span style={{ color: "#FF8B3D" }}>$</span> claude{" "}
          <span style={{ color: "rgba(255,177,102,0.7)" }}>--model</span>{" "}
          opus-4-7
          <br />
          <span style={{ color: "rgba(245,233,204,0.5)" }}>// editing </span>
          <span style={{ color: "#34D399" }}>
            src/middleware/auth.ts
          </span>
          <br />
          <span style={{ color: "rgba(245,233,204,0.5)" }}>
            // verifyJWT( ) failed @ line{" "}
          </span>
          <span style={{ color: "#FF8B3D" }}>42</span>
        </div>

        {/* Captured tokens chip cloud */}
        <div className="rounded-xl p-4" style={{ border: "1px dashed var(--border)" }}>
          <p
            className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.22em]"
            style={{ color: "var(--ember)" }}
          >
            bias tokens captured
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "claude",
              "opus-4-7",
              "src/middleware/auth.ts",
              "verifyJWT",
              "--model",
              "line 42",
            ].map((token) => (
              <span
                key={token}
                className="inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[11px]"
                style={{
                  backgroundColor: "rgba(232,120,44,0.1)",
                  color: "var(--ember)",
                  border: "1px solid rgba(232,120,44,0.18)",
                }}
              >
                {token}
              </span>
            ))}
          </div>
        </div>

        <div
          className="mt-auto flex items-center gap-2 rounded-xl p-3"
          style={{ backgroundColor: "var(--cream-dark)" }}
        >
          <ArrowRight className="size-4 shrink-0" style={{ color: "var(--ember)" }} />
          <span className="text-[13px]" style={{ color: "var(--foreground)" }}>
            Whisper now hears{" "}
            <span className="font-mono" style={{ color: "var(--ember)" }}>
              verifyJWT
            </span>{" "}
            — not <em>verify J. W. T.</em>
          </span>
        </div>
      </div>
    </FeatureCard>
  );
}

function CustomizationCard() {
  return (
    <FeatureCard
      title="Three layers of vocabulary"
      subtitle="Bias Whisper's recognition, post-correct phonetic mishears, and expand voice shortcuts into full text. Scope each entry globally or to a single mode."
      tag="Customization"
    >
      <div
        className="relative flex min-h-[300px] flex-col gap-3 overflow-hidden rounded-3xl p-5"
        style={{
          backgroundColor: "var(--paper)",
          border: "1px solid var(--border)",
        }}
      >
        <VocabRow
          icon={<BookOpen className="size-3.5" />}
          label="Vocabulary"
          desc="seed Whisper's prompt"
          items={[
            "OmniVox",
            "Claude Code",
            "Qwen3",
            "Tauri",
            "Vulkan",
            "verifyJWT",
          ]}
        />

        <VocabRow
          icon={<ArrowRight className="size-3.5" />}
          label="Dictionary"
          desc="replace what Whisper hears"
          items={[
            "omni vox → OmniVox",
            "claude codes → Claude Code",
            "tow ree → Tauri",
          ]}
        />

        <VocabRow
          icon={<ScrollText className="size-3.5" />}
          label="Snippets"
          desc="expand short phrases"
          items={[
            "ty → thank you",
            "tldr → too long; didn’t read",
            "calendly → cal.com/me/intro",
          ]}
        />
      </div>
    </FeatureCard>
  );
}

function VocabRow({
  icon,
  label,
  desc,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  items: string[];
}) {
  return (
    <div
      className="rounded-2xl p-3.5"
      style={{
        backgroundColor: "var(--cream-dark)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="flex size-5 items-center justify-center rounded-md"
          style={{ backgroundColor: "rgba(232,120,44,0.16)", color: "var(--ember)" }}
        >
          {icon}
        </span>
        <span className="text-[12.5px] font-semibold" style={{ color: "var(--foreground)" }}>
          {label}
        </span>
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.18em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {desc}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[11px]"
            style={{
              backgroundColor: "var(--paper)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function VoiceCommandsCard() {
  const commands = [
    { phrase: "new line", action: "Shift + Enter" },
    { phrase: "new paragraph", action: "Shift + Enter × 2" },
    { phrase: "delete last word", action: "Ctrl + Backspace" },
    { phrase: "send", action: "Enter ↵", emph: true },
  ];

  return (
    <FeatureCard
      title="Speak the keystroke"
      subtitle="A short, focused command vocabulary that turns into real keystrokes. Toggle each command on or off — independent toggles, no accidents."
      tag="Voice Commands"
    >
      <div
        className="relative flex min-h-[300px] flex-col gap-2 overflow-hidden rounded-3xl p-5"
        style={{
          backgroundColor: "var(--paper)",
          border: "1px solid var(--border)",
        }}
      >
        {commands.map((cmd) => (
          <div
            key={cmd.phrase}
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              backgroundColor: cmd.emph ? "rgba(232,120,44,0.08)" : "var(--cream-dark)",
              border: `1px solid ${cmd.emph ? "rgba(232,120,44,0.25)" : "var(--border)"}`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: cmd.emph ? "var(--ember)" : "var(--paper)",
                  color: cmd.emph ? "#FFFBF1" : "var(--ember)",
                  border: cmd.emph ? "none" : "1px solid var(--border)",
                }}
              >
                <Mic className="size-3.5" />
              </span>
              <span className="text-[14.5px]" style={{ color: "var(--foreground)" }}>
                &ldquo;{cmd.phrase}&rdquo;
              </span>
            </div>
            <span
              className="font-mono text-[11.5px] rounded-md px-2 py-0.5"
              style={{
                backgroundColor: cmd.emph ? "rgba(232,120,44,0.16)" : "var(--paper)",
                color: cmd.emph ? "var(--ember)" : "var(--muted-foreground)",
                border: cmd.emph ? "1px solid rgba(232,120,44,0.3)" : "1px solid var(--border)",
              }}
            >
              {cmd.action}
            </span>
          </div>
        ))}

        <div
          className="mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3"
          style={{ borderColor: "var(--border)" }}
        >
          <Plus className="size-3.5" style={{ color: "var(--muted-foreground)" }} />
          <span className="text-[12.5px]" style={{ color: "var(--muted-foreground)" }}>
            Add app-binding (launches hotkeys & programs)
          </span>
        </div>
      </div>
    </FeatureCard>
  );
}

function FeatureCard({
  title,
  subtitle,
  tag,
  children,
}: {
  title: string;
  subtitle: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {tag && (
          <span
            className="inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--ember)" }}
          >
            <span
              className="inline-block size-1 rounded-full"
              style={{ backgroundColor: "var(--ember)" }}
            />
            {tag}
          </span>
        )}
        <h3
          className="font-display text-[30px] font-medium leading-[1.05] tracking-[-0.015em] md:text-[36px]"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <p
          className="max-w-md text-[14.5px] leading-[1.6]"
          style={{ color: "var(--dark-secondary)" }}
        >
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}

function FeaturesGridSection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
        <PrivacyCard />
        <ScreenContextCard />
        <CustomizationCard />
        <VoiceCommandsCard />
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Section C — Context Modes (auto-switching brains)            */
/* ============================================================ */

interface ContextMode {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  style: string;
}

const contextModes: ContextMode[] = [
  {
    name: "Coding",
    description: "Tech vocab, file-paths bias, code-style snippets",
    icon: <Terminal className="size-5" />,
    color: "#10B981",
    style: "Casual",
  },
  {
    name: "Email",
    description: "Formal structure, signoffs, salutations",
    icon: <Mail className="size-5" />,
    color: "#3B82F6",
    style: "Formal",
  },
  {
    name: "Notes",
    description: "Minimal formatting, append straight to a note",
    icon: <FileText className="size-5" />,
    color: "#F59E0B",
    style: "Very Casual",
  },
  {
    name: "Chat",
    description: "Ship mode on — send right after transcription",
    icon: <MessageSquare className="size-5" />,
    color: "#A855F7",
    style: "Very Casual",
  },
];

function ContextModesSection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-24 md:py-28">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid var(--border)",
              color: "var(--ember)",
            }}
          >
            <Layers className="size-3" />
            Context Modes
          </span>

          <h2
            className="font-display text-[44px] leading-[0.96] font-medium tracking-[-0.02em] sm:text-[54px] lg:text-[60px]"
            style={{ color: "var(--foreground)" }}
          >
            A different{" "}
            <span className="font-display-italic" style={{ color: "var(--ember)" }}>
              brain
            </span>{" "}
            for every app.
          </h2>

          <p className="max-w-lg text-[17px] leading-[1.55]" style={{ color: "var(--dark-secondary)" }}>
            Build a profile per workflow. Each mode gets its own vocabulary,
            dictionary, snippets, writing style, icon, and app bindings — and
            OmniVox switches the second you switch windows.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Vocabulary", "Snippets", "Style", "Bindings", "Icon", "Color"].map((b) => (
              <span
                key={b}
                className="rounded-full px-2.5 py-1 font-mono text-[11px]"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right: mode cards */}
        <div className="flex flex-col gap-3">
          {contextModes.map((mode) => (
            <div
              key={mode.name}
              className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:translate-x-1"
              style={{
                backgroundColor: "var(--paper)",
                border: "1px solid var(--border)",
                borderLeft: `4px solid ${mode.color}`,
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 22px -16px rgba(31,20,10,0.18)",
              }}
            >
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${mode.color}1A`,
                  color: mode.color,
                }}
              >
                {mode.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {mode.name}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: `${mode.color}1A`,
                      color: mode.color,
                    }}
                  >
                    {mode.style}
                  </span>
                </div>
                <p
                  className="mt-0.5 text-[13px] leading-snug"
                  style={{ color: "var(--dark-secondary)" }}
                >
                  {mode.description}
                </p>
              </div>

              <span
                className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
                style={{ color: "var(--muted-foreground)" }}
              >
                Auto
              </span>
            </div>
          ))}

          <div
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4"
            style={{ borderColor: "var(--border)" }}
          >
            <Plus className="size-4" style={{ color: "var(--muted-foreground)" }} />
            <span className="text-[13.5px]" style={{ color: "var(--muted-foreground)" }}>
              Create a new mode — 13 icons, 6 colors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Section D — Hardware band (GPU + models)                     */
/* ============================================================ */

function HardwareBand() {
  return (
    <section className="px-6 py-12">
      <div
        className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 rounded-3xl px-8 py-8 lg:flex-row"
        style={{
          backgroundColor: "var(--section-deep-bg)",
          backgroundImage:
            "radial-gradient(600px 200px at 50% 0%, rgba(232,120,44,0.18), transparent 70%)",
          border: "1px solid var(--border)",
          color: "#F5E9CC",
        }}
      >
        <div className="flex items-center gap-4">
          <span
            className="flex size-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "rgba(232,120,44,0.18)",
              color: "#FFB166",
            }}
          >
            <Cpu className="size-5" />
          </span>
          <div>
            <p
              className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,177,102,0.7)" }}
            >
              Built for your hardware
            </p>
            <p className="mt-1 font-display text-[22px] leading-tight md:text-[26px]">
              Hardware-aware. Model-agnostic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          <Stat label="Speech models" value="base · small · medium · large" />
          <Stat label="LLM" value="Qwen3 0.6B (local)" />
          <Stat label="Acceleration" value="Vulkan + CUDA" />
          <Stat label="Languages" value="100+" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
        style={{ color: "rgba(255,177,102,0.55)" }}
      >
        {label}
      </span>
      <span className="text-[13.5px] font-medium" style={{ color: "#F5E9CC" }}>
        {value}
      </span>
    </div>
  );
}

/* ============================================================ */
/*  Main Export                                                   */
/* ============================================================ */

export function FeaturesGrid() {
  return (
    <div
      className="relative"
      style={{ backgroundColor: "var(--background)" }}
    >
      <StructuredModeSection />
      <FeaturesGridSection />
      <ContextModesSection />
      <HardwareBand />
    </div>
  );
}

