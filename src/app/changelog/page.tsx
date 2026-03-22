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
