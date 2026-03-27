import {
  Bold,
  Italic,
  Strikethrough,
  RotateCcw,
  List,
  ListOrdered,
  Code,
  ArrowRight,
  Plus,
  Phone,
  Mic,
  Monitor,
  Smartphone,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Section 1 — AI Auto Edits                                         */
/* ------------------------------------------------------------------ */

function AIAutoEditsSection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left — Demo Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] p-6 md:p-8">
          {/* Dark top half — messy dictation */}
          <div className="relative mb-6 rounded-2xl bg-gradient-to-br from-[#2A2018] to-[#1A1A1A] p-6">
            <p className="text-[15px] leading-relaxed text-[#FFFBEB]/70">
              So um let&apos;s reach out to Jenny from Legal she may have
              mentioned the NDA isn&apos;t finalized yet or possibly already sent
              it let&apos;s also cc Dave and finally make sure the Q2 Goals slide
              is updated before Friday&apos;s review the link should be in Slack
            </p>
            {/* Floating tags */}
            <span className="absolute top-3 right-4 inline-flex items-center rounded-full bg-[#FFA946] px-4 py-1.5 text-[13px] font-semibold text-[#1A1A1A]">
              Removed filler
            </span>
            <span className="absolute right-6 bottom-3 inline-flex items-center rounded-full bg-[#FFA946] px-4 py-1.5 text-[13px] font-semibold text-[#1A1A1A]">
              Added to Dictionary
            </span>
          </div>

          {/* Bottom — clean output */}
          <div className="rounded-2xl bg-[#FFFBF0] p-6">
            <p className="text-[15px] leading-relaxed text-[#333]">
              Let&apos;s reach out to Jenny from Legal&mdash;she may have
              mentioned the NDA isn&apos;t finalized yet, or possibly already
              sent it. Let&apos;s also CC Dave. Finally, make sure the Q2 Goals
              slide is updated before Friday&apos;s review. The link should be
              in Slack.
            </p>

            {/* Toolbar */}
            <div className="mt-4 flex items-center gap-1 border-t border-[#E5E2D9] pt-3">
              <ToolbarButton>
                <Bold className="size-4" />
              </ToolbarButton>
              <ToolbarButton>
                <Italic className="size-4" />
              </ToolbarButton>
              <ToolbarButton>
                <Strikethrough className="size-4" />
              </ToolbarButton>
              <ToolbarButton>
                <RotateCcw className="size-4" />
              </ToolbarButton>
              <ToolbarButton>
                <List className="size-4" />
              </ToolbarButton>
              <ToolbarButton>
                <ListOrdered className="size-4" />
              </ToolbarButton>
              <ToolbarButton>
                <Code className="size-4" />
              </ToolbarButton>
              <div className="flex-1" />
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full bg-[#FFA946] text-[#1A1A1A] transition-colors hover:bg-[#FF9B2E]"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right — Text */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="mb-1 block text-xs font-medium tracking-widest text-[#999] uppercase">
              AI
            </span>
            <h2 className="font-heading text-5xl font-normal leading-tight text-[#1A1A1A]">
              Auto Edits
            </h2>
          </div>
          <p className="max-w-md text-lg leading-7 text-[#333]">
            Speak naturally and Flow transcribes and edits your voice, instantly.
            Rambled thoughts become clear, perfectly formatted text, without the
            filler words or typos.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-[#1A1A1A] px-6 py-2.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-[#FFFBF0]"
            >
              Try Flow
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-[#7C3AED] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9]"
            >
              Download for Windows
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolbarButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex size-8 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-[#F0EDE4] hover:text-[#333]"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — 2x2 Feature Cards                                     */
/* ------------------------------------------------------------------ */

function PersonalDictionaryCard() {
  const words = [
    "Robyn",
    "Viktor",
    "SaaS",
    "Caltrain",
    "Mackey",
    "Nguyen",
    "Leong",
  ];

  return (
    <FeatureCard
      title="Personal dictionary"
      subtitle="Flow automatically learns your unique words and adds them to your personal dictionary."
    >
      <div className="rounded-3xl bg-[#1A1A1A] p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-semibold text-[#FFFBEB]">
            Your Dictionary
          </span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full border border-[rgba(255,255,235,0.15)] text-[#FFFBEB] transition-colors hover:bg-white/10"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {words.map((word) => (
            <div
              key={word}
              className="rounded-xl border border-[rgba(255,255,235,0.15)] bg-[#034F46] px-5 py-3 text-[15px] font-medium text-[#FFFBEB]"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </FeatureCard>
  );
}

function SnippetLibraryCard() {
  const snippets = [
    { name: "Calendar", expanded: true },
    { name: "Hours", expanded: false },
    { name: "Support intro", expanded: false },
    { name: "FAQ", expanded: false },
    { name: "Careers link", expanded: false },
    { name: "Elevator pitch", expanded: false },
    { name: "Address", expanded: false },
  ];

  return (
    <FeatureCard
      title="Snippet library"
      subtitle="Create voice shortcuts for the things your team says over and over. From scheduling links to FAQs, just speak a cue and get the full formatted text."
    >
      <div className="rounded-3xl bg-[#1A1A1A] p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-semibold text-[#FFFBEB]">
            Your Snippets
          </span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full border border-[rgba(255,255,235,0.15)] text-[#FFFBEB] transition-colors hover:bg-white/10"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {snippets.map((snippet) => (
            <div
              key={snippet.name}
              className="rounded-xl border border-[rgba(255,255,235,0.15)] px-4 py-3"
            >
              <span className="text-[15px] text-[#FFFBEB]">
                {snippet.name}
              </span>
              {snippet.expanded && (
                <div className="mt-3 flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-[#FFFBEB]/60" />
                  <span className="inline-flex items-center rounded-lg bg-[#FFA946] px-3 py-1.5 text-[13px] font-medium text-[#1A1A1A]">
                    You can book a 30-minute call with me here:
                    calendly.com/wisprflow
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </FeatureCard>
  );
}

function DifferentTonesCard() {
  return (
    <FeatureCard
      title="Different tones for each app"
      subtitle="Flow automatically adjusts tone based on the app you're using. Sound like you—not a robot."
    >
      <div className="relative flex min-h-[320px] flex-col items-center rounded-3xl bg-[#1A1A1A] p-6 md:p-8">
        {/* Top — pill with waveform */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-[rgba(255,255,235,0.15)] bg-[#2A2A2A] px-4 py-2">
          <Mic className="size-4 text-[#FFFBEB]" />
          <span className="text-sm font-medium text-[#FFFBEB]">
            &ldquo;hello&rdquo;
          </span>
        </div>

        {/* Branch lines — SVG */}
        <svg
          className="absolute top-[72px] left-1/2 h-[80px] w-[280px] -translate-x-1/2"
          viewBox="0 0 280 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M140 0 C140 40, 40 40, 40 80"
            stroke="rgba(255,255,235,0.3)"
            strokeWidth="2"
          />
          <path
            d="M140 0 C140 40, 140 40, 140 80"
            stroke="rgba(255,255,235,0.3)"
            strokeWidth="2"
          />
          <path
            d="M140 0 C140 40, 240 40, 240 80"
            stroke="rgba(255,255,235,0.3)"
            strokeWidth="2"
          />
        </svg>

        {/* Three app outputs */}
        <div className="mt-16 grid w-full grid-cols-3 gap-4">
          {/* Gmail */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#EA4335]">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <span className="text-base font-semibold text-[#FFA946]">
              Hello.
            </span>
          </div>
          {/* Slack */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#611F69]">
              <span className="text-lg font-bold text-white">#</span>
            </div>
            <span className="text-base font-semibold text-[#FFA946]">
              Hello
            </span>
          </div>
          {/* iMessage */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#34C759]">
              <span className="text-lg font-bold text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="white"
                >
                  <path d="M12 2C6.48 2 2 5.58 2 10c0 2.24 1.12 4.24 2.88 5.64L4 22l4.36-2.18C9.52 20.28 10.74 20.5 12 20.5c5.52 0 10-3.58 10-8S17.52 2 12 2z" />
                </svg>
              </span>
            </div>
            <span className="text-base font-semibold text-[#FFA946]">
              hello
            </span>
          </div>
        </div>
      </div>
    </FeatureCard>
  );
}

function LanguagesCard() {
  const flags = [
    "\u{1F1FA}\u{1F1F8}",
    "\u{1F1E8}\u{1F1F3}",
    "\u{1F1E9}\u{1F1EA}",
    "\u{1F1EF}\u{1F1F5}",
    "\u{1F1EE}\u{1F1F3}",
    "\u{1F1EC}\u{1F1E7}",
    "\u{1F1EB}\u{1F1F7}",
    "\u{1F1EE}\u{1F1F9}",
    "\u{1F1E8}\u{1F1E6}",
    "\u{1F1E7}\u{1F1F7}",
    "\u{1F1F7}\u{1F1FA}",
    "\u{1F1F0}\u{1F1F7}",
    "\u{1F1E6}\u{1F1FA}",
    "\u{1F1EA}\u{1F1F8}",
    "\u{1F1F2}\u{1F1FD}",
    "\u{1F1EE}\u{1F1E9}",
    "\u{1F1F9}\u{1F1F7}",
    "\u{1F1F3}\u{1F1F1}",
  ];

  return (
    <FeatureCard
      title="100+ languages"
      subtitle="Flow automatically detects and transcribes in your language, letting you move between them—just like you do."
    >
      <div className="relative flex min-h-[320px] items-center justify-center rounded-3xl bg-[#1A1A1A] p-6 md:p-8">
        {/* Center label */}
        <span className="z-10 text-base font-semibold text-[#FFFBEB]">
          100+ Languages
        </span>

        {/* Flags ring */}
        {flags.map((flag, i) => {
          const angle = (360 / flags.length) * i;
          return (
            <span
              key={i}
              className="absolute text-[32px]"
              style={{
                transform: `rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
              }}
            >
              {flag}
            </span>
          );
        })}
      </div>
    </FeatureCard>
  );
}

function FeatureCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-heading text-4xl font-normal leading-tight text-[#1A1A1A]">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-base leading-relaxed text-[#333]">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}

function FeaturesGridSection() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-6">
        <PersonalDictionaryCard />
        <SnippetLibraryCard />
        <DifferentTonesCard />
        <LanguagesCard />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — On-the-go or at your desk                              */
/* ------------------------------------------------------------------ */

function OnTheGoSection() {
  const platforms = ["iPhone", "Mac", "Windows", "Android"];

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left — Text */}
        <div className="flex flex-col gap-6">
          {/* Platform pills */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center rounded-full border border-[#E5E2D9] bg-white px-4 py-1.5 text-sm font-medium text-[#333]"
              >
                {platform}
              </span>
            ))}
          </div>

          <h2 className="font-heading text-5xl font-normal leading-tight text-[#1A1A1A] md:text-6xl lg:text-[64px]">
            On-the-go or at your desk
          </h2>
          <p className="max-w-lg text-lg leading-7 text-[#333]">
            Flow is the only voice-to-text tool that works on any app or device,
            with your personal dictionary, style, and settings synced everywhere.
          </p>
          <div>
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-[#7C3AED] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9]"
            >
              Download for Windows
            </a>
          </div>
        </div>

        {/* Right — Device mockups */}
        <div className="relative flex items-center justify-center">
          {/* Desktop mockup */}
          <div className="relative z-0 w-full max-w-[520px] overflow-hidden rounded-2xl bg-[#1A1A1A] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="size-3 rounded-full bg-[#FF5F57]" />
              <div className="size-3 rounded-full bg-[#FEBC2E]" />
              <div className="size-3 rounded-full bg-[#28C840]" />
              <span className="ml-2 text-xs text-[#FFFBEB]/40">Notion</span>
            </div>
            <div className="flex h-[280px] flex-col gap-3 p-6">
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-white/10" />
              <div className="mt-4 h-4 w-full rounded bg-white/5" />
              <div className="h-4 w-5/6 rounded bg-white/5" />
              <div className="h-4 w-2/3 rounded bg-white/5" />
              <div className="mt-auto flex items-center gap-2">
                <Monitor className="size-4 text-[#FFFBEB]/40" />
                <div className="h-3 w-20 rounded bg-[#FFA946]/40" />
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="absolute -bottom-4 -left-4 z-10 w-[180px] overflow-hidden rounded-2xl bg-[#1A1A1A] shadow-2xl ring-1 ring-white/10 md:-bottom-8 md:left-4">
            <div className="flex items-center justify-center border-b border-white/10 px-3 py-2">
              <div className="h-1 w-12 rounded-full bg-white/20" />
            </div>
            <div className="flex h-[220px] flex-col gap-2 p-4">
              <div className="h-3 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
              <div className="mt-2 h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-5/6 rounded bg-white/5" />
              <div className="mt-auto flex items-center justify-center">
                <div className="flex items-center gap-1.5 rounded-full bg-[#FFA946] px-3 py-1.5">
                  <Smartphone className="size-3 text-[#1A1A1A]" />
                  <span className="text-[10px] font-semibold text-[#1A1A1A]">
                    Dictating...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export function FeaturesGrid() {
  return (
    <div className="bg-[#FFFBF0]">
      <AIAutoEditsSection />
      <FeaturesGridSection />
      <OnTheGoSection />
    </div>
  );
}
