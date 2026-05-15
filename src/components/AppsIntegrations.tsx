"use client";

import {
  ClaudeLogo,
  CursorLogo,
  VSCodeLogo,
  GitHubLogo,
  TerminalLogo,
  NotionLogo,
  LinearLogo,
  ObsidianLogo,
  SlackLogo,
  DiscordLogo,
  FigmaLogo,
  GmailLogo,
  ChatGPTLogo,
  XLogo,
  OutlookLogo,
  TeamsLogo,
  WordLogo,
  DocsLogo,
  SheetsLogo,
  TelegramLogo,
  TodoistLogo,
  ClickUpLogo,
} from "./AppLogos";

/* ------------------------------------------------------------------ */
/*  App entries — real apps where OmniVox shines                       */
/* ------------------------------------------------------------------ */

interface AppEntry {
  name: string;
  Logo: React.FC<{ className?: string }>;
}

const appIcons: AppEntry[] = [
  { name: "Claude Code", Logo: ClaudeLogo },
  { name: "Cursor", Logo: CursorLogo },
  { name: "VS Code", Logo: VSCodeLogo },
  { name: "Codex (GitHub)", Logo: GitHubLogo },
  { name: "Terminal", Logo: TerminalLogo },
  { name: "Notion", Logo: NotionLogo },
  { name: "Linear", Logo: LinearLogo },
  { name: "Obsidian", Logo: ObsidianLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Discord", Logo: DiscordLogo },
  { name: "Figma", Logo: FigmaLogo },
  { name: "Gmail", Logo: GmailLogo },
  { name: "Google Docs", Logo: DocsLogo },
  { name: "Google Sheets", Logo: SheetsLogo },
  { name: "ChatGPT", Logo: ChatGPTLogo },
  { name: "X", Logo: XLogo },
  { name: "Outlook", Logo: OutlookLogo },
  { name: "Teams", Logo: TeamsLogo },
  { name: "Word", Logo: WordLogo },
  { name: "Telegram", Logo: TelegramLogo },
  { name: "Todoist", Logo: TodoistLogo },
  { name: "ClickUp", Logo: ClickUpLogo },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AppIconTile({ app }: { app: AppEntry }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform hover:scale-110"
      style={{
        backgroundColor: "var(--paper)",
        border: "1px solid var(--border)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 6px 12px -4px rgba(31,20,10,0.18)",
      }}
      title={app.name}
    >
      <app.Logo className="size-8" />
    </div>
  );
}

function DiagonalAppGrid() {
  const rows: AppEntry[][] = [];
  const cols = 6;
  for (let i = 0; i < appIcons.length; i += cols) {
    rows.push(appIcons.slice(i, i + cols));
  }

  return (
    <div
      className="pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="flex flex-col gap-4"
        style={{ transform: "rotate(-12deg)", transformOrigin: "center center" }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="flex gap-4"
            style={{ marginLeft: `${ri * 40}px` }}
          >
            {row.map((app) => (
              <AppIconTile key={`${app.name}-${ri}`} app={app} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Editor-style mockup with the pill at the bottom — light theme */
function EditorMockup() {
  const waveBarHeights = [
    8, 14, 22, 12, 26, 18, 14, 22, 10, 16, 20, 8, 14, 22, 12,
  ];

  return (
    <div
      className="relative mx-auto w-[320px] shrink-0 overflow-hidden rounded-2xl lg:w-[380px]"
      style={{
        backgroundColor: "var(--paper)",
        border: "1px solid var(--border)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -28px rgba(31,20,10,0.4), 0 12px 24px -8px rgba(31,20,10,0.18)",
      }}
    >
      {/* Window title bar */}
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
          auth.ts — claude code
        </span>
      </div>

      {/* Fake code/doc content */}
      <div className="flex flex-col gap-2.5 p-5 pt-4">
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            1
          </span>
          <div className="h-2.5 w-2/3 rounded" style={{ backgroundColor: "var(--border)" }} />
        </div>
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            2
          </span>
          <div className="h-2.5 w-1/2 rounded" style={{ backgroundColor: "var(--border)" }} />
        </div>
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            3
          </span>
          <div
            className="h-2.5 w-3/4 rounded"
            style={{ backgroundColor: "rgba(232,120,44,0.25)" }}
          />
        </div>
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            4
          </span>
          <div className="h-2.5 w-5/6 rounded" style={{ backgroundColor: "var(--border)" }} />
        </div>
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            5
          </span>
          <div className="h-2.5 w-2/5 rounded" style={{ backgroundColor: "var(--border)" }} />
        </div>
        {/* Caret line */}
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--ember)" }}
          >
            6
          </span>
          <span
            className="inline-block w-[2px] h-3.5"
            style={{
              backgroundColor: "var(--ember)",
              animation: "pulse 1s ease-in-out infinite",
            }}
          />
        </div>
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            7
          </span>
          <div className="h-2.5 w-1/3 rounded" style={{ backgroundColor: "var(--border)" }} />
        </div>
        <div className="flex gap-3 items-center">
          <span
            className="font-mono text-[9.5px] w-3 text-right"
            style={{ color: "var(--muted-foreground)" }}
          >
            8
          </span>
          <div className="h-2.5 w-3/5 rounded" style={{ backgroundColor: "var(--border)" }} />
        </div>
      </div>

      {/* OmniVox floating pill overlay */}
      <div className="relative h-20">
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
          <div
            className="flex items-center gap-2.5 rounded-full px-4"
            style={{
              height: 36,
              minWidth: 220,
              background: "linear-gradient(180deg, #2A1A0E 0%, #1F140A 100%)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(232,120,44,0.25)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px -6px rgba(31,20,10,0.5)",
            }}
          >
            <span
              className="font-display text-[10px] font-semibold tracking-[0.08em]"
              style={{ color: "#FFB166" }}
            >
              OV
            </span>
            <div
              className="flex items-center justify-center gap-[2px]"
              style={{ height: 20 }}
            >
              {waveBarHeights.slice(0, 14).map((h, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 2,
                    height: Math.max(3, h * 0.7),
                    backgroundColor: "#FFB166",
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
            <div className="relative flex items-center justify-center ml-1">
              <span
                className="absolute h-4 w-4 rounded-full"
                style={{
                  backgroundColor: "rgba(232,120,44,0.18)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                className="relative h-2 w-2 rounded-full"
                style={{ backgroundColor: "#FFB166" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

export function AppsIntegrations() {
  return (
    <section
      id="features"
      className="relative w-full overflow-hidden grain-overlay"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Decorative warm orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(216,84,29,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-24 lg:py-32">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-12">
          {/* Left column: text */}
          <div className="flex max-w-xl flex-col gap-7 lg:max-w-lg lg:pt-6">
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
              Type Simulation
            </span>

            <h2
              className="font-display text-[44px] leading-[0.96] font-medium tracking-[-0.02em] sm:text-[56px] lg:text-[68px]"
              style={{ color: "var(--foreground)" }}
            >
              Lands cleanly in{" "}
              <span className="font-display-italic" style={{ color: "var(--ember)" }}>
                every app
              </span>{" "}
              you already use.
            </h2>

            <p
              className="max-w-[520px] text-[17px] leading-[1.55]"
              style={{ color: "var(--dark-secondary)" }}
            >
              OmniVox simulates keystrokes the moment a transcript is ready, so
              your words land in the focused window — whether that&apos;s
              Claude Code, Cursor, your terminal, Linear, Notion, or any text
              field. Clipboard, type, or both, with focus restored after.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Clipboard",
                "Type-simulation",
                "Auto-paste",
                "Focus restore",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11.5px] font-medium"
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column: diagonal grid + editor mockup */}
          <div className="relative flex flex-1 items-center justify-center lg:justify-end min-h-[460px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-90">
              <DiagonalAppGrid />
            </div>
            <div className="relative z-10">
              <EditorMockup />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.4); opacity: 0; } }
      `}</style>
    </section>
  );
}
