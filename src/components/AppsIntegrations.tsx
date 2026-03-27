"use client";

/* ------------------------------------------------------------------ */
/*  Platform pill data                                                 */
/* ------------------------------------------------------------------ */

const platforms = [
  {
    label: "Windows",
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
        <path d="M0 2.2l6.5-.9v6.3H0V2.2zm7.3-1l8.7-1.2v7.6H7.3V1.2zM16 8.4v7.6l-8.7-1.2V8.4H16zM6.5 14.7L0 13.8V8.4h6.5v6.3z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  App icon data                                                      */
/* ------------------------------------------------------------------ */

interface AppIcon {
  name: string;
  initial: string;
  bg: string;
  textColor?: string;
}

const appIcons: AppIcon[] = [
  { name: "Gmail", initial: "G", bg: "#EA4335" },
  { name: "Notion", initial: "N", bg: "#FFFFFF", textColor: "#000000" },
  { name: "Slack", initial: "S", bg: "#4A154B" },
  { name: "Figma", initial: "F", bg: "#A259FF" },
  { name: "VS Code", initial: "V", bg: "#007ACC" },
  { name: "Discord", initial: "D", bg: "#5865F2" },
  { name: "Docs", initial: "D", bg: "#4285F4" },
  { name: "Sheets", initial: "S", bg: "#34A853" },
  { name: "X", initial: "X", bg: "#000000" },
  { name: "WhatsApp", initial: "W", bg: "#25D366" },
  { name: "Teams", initial: "T", bg: "#6264A7" },
  { name: "Signal", initial: "S", bg: "#3A76F0" },
  { name: "Snapchat", initial: "S", bg: "#FFFC00", textColor: "#000000" },
  { name: "iMessage", initial: "i", bg: "#34C759" },
  { name: "Telegram", initial: "T", bg: "#0088CC" },
  { name: "Instagram", initial: "I", bg: "#E1306C" },
  { name: "OmniFocus", initial: "O", bg: "#7B46A3" },
  { name: "ClickUp", initial: "C", bg: "#7B68EE" },
  { name: "Todoist", initial: "T", bg: "#E44332" },
  { name: "Cursor", initial: "C", bg: "#1A1A1A" },
  { name: "Linear", initial: "L", bg: "#5E6AD2" },
  { name: "Slides", initial: "S", bg: "#F4B400" },
];

/* ------------------------------------------------------------------ */
/*  Logo ticker companies                                              */
/* ------------------------------------------------------------------ */

const tickerLogos = [
  "Rivian",
  "Notion",
  "Substack",
  "Amazon",
  "Strava",
  "Nvidia",
  "Spotify",
  "Figma",
  "Stripe",
  "Linear",
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PlatformPill({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
      style={{
        border: "1.5px solid #FFFFEB",
        color: "#FFFFEB",
      }}
    >
      {icon}
      {label}
    </span>
  );
}

function AppIconTile({ app }: { app: AppIcon }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold"
      style={{
        backgroundColor: app.bg,
        color: app.textColor ?? "#FFFFFF",
        border: app.bg === "#000000" || app.bg === "#1A1A1A" ? "1px solid rgba(255,255,255,0.15)" : undefined,
      }}
      title={app.name}
    >
      {app.initial}
    </div>
  );
}

function DiagonalAppGrid() {
  /* Build rows of icons to create a diagonal / cascading look.
     We rotate the whole grid -15 deg and offset each row. */
  const rows: AppIcon[][] = [];
  const cols = 6;
  for (let i = 0; i < appIcons.length; i += cols) {
    rows.push(appIcons.slice(i, i + cols));
  }

  return (
    <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <div
        className="flex flex-col gap-4"
        style={{ transform: "rotate(-15deg)", transformOrigin: "center center" }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="flex gap-4"
            style={{ marginLeft: `${ri * 40}px` }}
          >
            {row.map((app) => (
              <AppIconTile key={app.name} app={app} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMockup() {
  /* Bars for the sound-wave animation */
  const barHeights = [12, 20, 28, 16, 32, 24, 18, 30, 14, 22, 26, 10, 20, 28, 16];

  return (
    <div
      className="relative mx-auto w-[280px] shrink-0 overflow-hidden rounded-[32px] lg:w-[320px]"
      style={{
        backgroundColor: "#111111",
        border: "3px solid #333",
        aspectRatio: "9/18",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-medium" style={{ color: "#FFFFEB" }}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>&#9679;&#9679;&#9679;</span>
        </div>
      </div>

      {/* Back arrow + contact */}
      <div className="flex items-center gap-3 px-4 pt-2 pb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFEB" strokeWidth={2} className="h-5 w-5">
          <path d="M15 19l-7-7 7-7" />
        </svg>
        {/* Avatar */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
          style={{ backgroundColor: "#E1306C", color: "#fff" }}
        >
          M
        </div>
        <span className="text-sm font-medium" style={{ color: "#FFFFEB" }}>
          mom &#10084;&#65039;
        </span>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col gap-3 px-4 pt-2">
        {/* Incoming bubble */}
        <div
          className="max-w-[200px] self-start rounded-2xl rounded-bl-sm px-4 py-2.5 text-[13px]"
          style={{ backgroundColor: "#2A2A2A", color: "#FFFFEB" }}
        >
          hey sweetie, how&rsquo;s your day going?
        </div>
      </div>

      {/* Bottom input area */}
      <div className="absolute right-0 bottom-0 left-0 px-4 pt-3 pb-6">
        {/* Sound wave visualizer */}
        <div className="mb-3 flex items-end justify-center gap-[3px]">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 3,
                height: h,
                backgroundColor: "#34C759",
                opacity: 0.8,
              }}
            />
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-3">
          {/* X close button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: "#333" }}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFEB" strokeWidth={2} className="h-4 w-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {/* Text field */}
          <div
            className="flex-1 rounded-full px-4 py-2 text-xs"
            style={{ backgroundColor: "#2A2A2A", color: "rgba(255,255,235,0.4)" }}
          >
            Transcribing&hellip;
          </div>
          {/* Mic button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: "#34C759" }}
            aria-label="Microphone"
          >
            <svg viewBox="0 0 24 24" fill="#fff" className="h-4 w-4">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Zm5 11a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V22h2v-3.08A7 7 0 0 0 19 12h-2Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function LogoTicker() {
  const track = tickerLogos.map((name) => (
    <span
      key={name}
      className="whitespace-nowrap text-xl font-semibold uppercase tracking-[4px]"
      style={{ color: "rgba(255,255,235,0.6)" }}
    >
      {name}
    </span>
  ));

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex gap-12"
        style={{ animation: "logoTicker 60s linear infinite" }}
      >
        {/* Duplicate the set for seamless looping */}
        {track}
        {track}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

export function AppsIntegrations() {
  return (
    <section className="w-full">
      {/* Green curved transition at top */}
      <div
        className="w-full px-4 pb-0 pt-16 sm:px-6 lg:px-8"
        style={{
          backgroundColor: "var(--section-green-bg)",
          borderRadius: "32px 32px 0 0",
        }}
      >
        {/* Dark inner container */}
        <div
          className="w-full overflow-hidden"
          style={{
            backgroundColor: "var(--section-dark-bg)",
            borderRadius: "32px 32px 0 0",
          }}
        >
          {/* ---- Top content area: text left, grid+phone right ---- */}
          <div className="mx-auto max-w-7xl px-6 pt-16 pb-0 sm:px-8 lg:px-12 lg:pt-20">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-8">
              {/* ---- Left column: pills, heading, subtitle, button ---- */}
              <div className="flex max-w-xl flex-col gap-6 lg:max-w-lg lg:pt-4">
                {/* Platform pills */}
                <div className="flex flex-wrap gap-2">
                  {platforms.map((p) => (
                    <PlatformPill key={p.label} label={p.label} icon={p.icon} />
                  ))}
                </div>

                {/* Heading */}
                <h2
                  className="font-heading text-5xl font-normal leading-[0.95em] sm:text-6xl lg:text-[64px]"
                  style={{ color: "#FFFFEB" }}
                >
                  Write faster in all your apps, on any device
                </h2>

                {/* Subtitle */}
                <p
                  className="max-w-[480px] text-lg"
                  style={{ color: "rgba(255,255,235,0.7)" }}
                >
                  Seamless speech-to-text in every application on your phone or
                  computer.
                </p>

                {/* CTA button */}
                <div>
                  <button
                    type="button"
                    className="rounded-xl px-6 py-3 text-base font-medium transition-opacity hover:opacity-80"
                    style={{
                      border: "1.5px solid #FFFFEB",
                      color: "#FFFFEB",
                      backgroundColor: "transparent",
                    }}
                  >
                    Watch in action
                  </button>
                </div>
              </div>

              {/* ---- Right column: diagonal grid + phone ---- */}
              <div className="relative flex flex-1 items-center justify-center lg:justify-end">
                {/* Diagonal app icons behind the phone */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 lg:opacity-80">
                  <DiagonalAppGrid />
                </div>
                {/* Phone mockup on top */}
                <div className="relative z-10">
                  <PhoneMockup />
                </div>
              </div>
            </div>
          </div>

          {/* ---- "Used by professionals" section ---- */}
          <div
            className="mt-16 w-full px-6 py-16 sm:px-8 lg:mt-20 lg:px-12"
            style={{
              backgroundColor: "var(--section-green-bg)",
              borderRadius: "32px 32px 0 0",
            }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <p
                className="text-base font-normal leading-relaxed sm:text-lg"
                style={{ color: "#FFFFEB" }}
              >
                Used by professionals everywhere to speed up their thoughts
              </p>
            </div>

            {/* Logo ticker */}
            <div className="mt-10">
              <LogoTicker />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
