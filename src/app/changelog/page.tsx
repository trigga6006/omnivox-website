import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChangelogEntries } from "@/components/changelog-entries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — OmniVox",
  description: "See what's new in OmniVox. Release notes, new features, and bug fixes.",
};

const changelog = [
  {
    version: "0.1.5",
    date: "2026-03-23",
    title: "Deterministic Pipeline, Floating Pill & Context Modes",
    changes: [
      "Removed LLM sidecar dependency — text cleanup no longer requires a separate AI model process; post-processing is now fully deterministic, faster, and uses zero additional RAM",
      "Pill overlay quick-toggle buttons — right-click the floating pill to toggle live preview, noise suppression, and auto context switching without opening the main app",
      "Live preview in floating pill — see partial transcription text in the pill while recording, updated every 3 seconds with greedy Whisper inference",
      "RNNoise noise suppression — optional pre-transcription audio denoising removes fan noise, keyboard clicks, and other background sounds",
      "Audio peak normalization — recording volume is automatically normalized before transcription so Whisper performs consistently regardless of mic gain",
      "App-to-mode bindings — bind specific applications (e.g., VS Code, Outlook) to context modes so the right dictionary and snippets activate automatically",
      "Auto context switching — when recording starts, OmniVox detects the focused application and switches to its bound context mode",
      "Mode-scoped dictionaries — each context mode can have its own custom phrase replacements, separate from the global dictionary",
      "Mode-scoped snippets — trigger-word text expansions can now be scoped per context mode",
      "Whisper vocabulary prompting — dictionary replacement terms are fed to Whisper as an initial prompt, biasing the decoder toward correct first-pass recognition of custom terms",
      "Smart list formatting — five detection patterns: counted headers, signal phrases, ordinal sequences with ordinal stripping, repeated sentence starters, and inline comma lists",
      "List runaway prevention — implicit lists auto-terminate when a sentence is significantly longer than the running average, preventing entire paragraphs from becoming bullets",
      "Filler word removal — strips \"um\", \"uh\", \"you know\", \"basically\", \"actually\", \"literally\", \"sort of\", \"kind of\", and sentence-start fillers like \"so\" and \"well\"",
      "Phrase deduplication — catches and removes stuttered 2–3 word phrase repetitions (\"I think I think\" becomes \"I think\")",
      "Abbreviation-aware sentence splitting — periods after Dr., Mr., U.S., etc., decimal numbers, and ellipses no longer incorrectly break sentences",
      "Expanded model catalog — hardware-aware model recommendations based on CPU core count, with bundled medium English model",
      "Pill mode selector improvements — added more icon options (briefcase, heart, scale), auto-closes on window blur, settings link from pill menu",
      "Toast notification system — pipeline errors surface as dismissable toast messages instead of failing silently",
      "Error boundary — app-level crash recovery shows a friendly error screen instead of a blank window",
      "Dictation stats and milestones — home screen shows total words dictated with milestone badges (Chatterbox, Storyteller, Novelist, etc.)",
      "Settings sync across windows — toggling settings in the pill or main window instantly syncs to all other windows",
      "Typed error codes — backend errors now carry specific error codes so the frontend can show targeted guidance",
      "Poisoned mutex recovery — if a background thread panics, the app recovers gracefully instead of locking up",
    ],
  },
  {
    version: "0.1.4",
    date: "2026-03-22",
    title: "Smart List Formatting & Stability",
    changes: [
      "Dictated lists are now automatically formatted as bullet points (3+ enumerated items)",
      "Supports count-word headers (\"these three things\") and ordinal sequences (\"First... Second... Third...\")",
      "List formatting uses deterministic post-processing — zero added latency",
      "Base LLM cleanup rules are now a code constant that ships with every update automatically",
      "Context mode prompts only store domain-specific additions, not the full prompt",
      "Fixed multi-line text not pasting into text fields (Shift+Enter instead of raw newlines)",
      "Fixed LLM responding conversationally to short 1-2 word dictations",
      "Fixed potential data loss in LLM sidecar communication (BufReader persistence)",
      "Fixed app hang on shutdown (Drop deadlock in LLM engine)",
      "Fixed overlay pill ignoring dark theme setting",
      "Increased max LLM output tokens from 256 to 384",
    ],
  },
  {
    version: "0.1.3",
    date: "2026-03-22",
    title: "Context Modes, Light Theme & Polish",
    changes: [
      // Critical Bug Fixes
      "Fixed two mutex deadlocks in the database layer that prevented the app from launching on first run",
      // Context Modes
      "Context Modes: switch between General and Programming profiles with scoped dictionaries and snippets",
      "Programming mode ships with 70+ dictionary entries (languages, frameworks, tools, AI terms) and 7 snippets",
      "Mode-scoped dictionary and snippet CRUD with inline management in the profile edit form",
      "ProcessorChain now merges global + active mode entries when processing dictation",
      "Floating pill mode selector with right-click switching and synced color-coded waveform bars",
      "Fixed mode switching sync between main window and overlay pill",
      "6 new Tauri commands for mode-scoped CRUD operations",
      // Light Mode
      "Full warm stone light theme with OKLch color variables — soft beige surfaces, warm text, amber accent preserved",
      "Theme persistence via SQLite settings with localStorage cache and FOUC prevention",
      "Dark/Light toggle in Settings with Moon/Sun icons",
      "Replaced all hardcoded dark colors with CSS variable references for theme support",
      // Word Counter & Milestones
      "Word counter with milestone progression: First Steps (100) through Prolific Author (100K)",
      "StatsCard on dictation page showing word count, milestone label, and progress bar",
      // UI Polish
      "Fixed record button layout shift when recording starts",
      "Settings page input device selector now functional with live microphone switching",
      "Removed amber left border accent from last transcription card",
      // LLM Safety
      "Hardened LLM system prompts — reframed as text formatter, never answers or interprets input",
      "Output safety check: falls back to raw text if LLM generates conversational responses instead of cleaning",
    ],
  },
  {
    version: "0.1.2",
    date: "2026-03-21",
    title: "Initial Release",
    changes: [
      "Local speech-to-text powered by OpenAI Whisper (base.en model bundled)",
      "4 downloadable Whisper models: Tiny, Base, Small, and Medium",
      "Hardware-aware model recommendations based on CPU cores",
      "Global hotkey (Ctrl+Alt) with hold-to-record and double-tap toggle modes",
      "Voice Activity Detection (VAD) auto-stops recording on silence",
      "Multi-output: clipboard, direct keystroke simulation, or both",
      "Qwen3-0.6B local LLM for optional AI grammar and clarity cleanup",
      "Custom dictionary replacements and snippet trigger expansion",
      "Full transcription history with search and CSV/JSON export",
      "Floating always-on-top overlay pill with live waveform visualization",
      "Optional Vulkan/CUDA GPU acceleration for faster inference",
      "System tray integration with auto-start and minimize-to-tray",
      "Dark and light theme support",
      "One-command PowerShell installer",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            Changelog
          </h1>
          <p className="mt-2 text-muted-foreground text-base">
            New features, improvements, and fixes for each release.
          </p>

          <div className="mt-12">
            <ChangelogEntries entries={changelog} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
