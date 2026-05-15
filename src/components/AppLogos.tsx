/**
 * Brand-mark components for the AppsIntegrations grid + AgenticSection.
 *
 * Uses Simple Icons (via react-icons/si) for the brands that are in
 * the Simple Icons set. Brands omitted from Simple Icons (Microsoft
 * products, VS Code, Cursor, Aider) are hand-rolled with care.
 *
 * Each component renders at the size given by its parent via className,
 * filled with that brand's official color.
 */

import {
  SiClaude,
  SiOpenai,
  SiGithub,
  SiSlack,
  SiDiscord,
  SiFigma,
  SiNotion,
  SiLinear,
  SiObsidian,
  SiGmail,
  SiGoogledocs,
  SiGooglesheets,
  SiTelegram,
  SiTodoist,
  SiClickup,
  SiApple,
  SiLinux,
} from "react-icons/si";
import { FaXTwitter, FaWindows } from "react-icons/fa6";
import {
  ClaudeCode as LobeClaudeCode,
  Codex as LobeCodex,
  Cursor as LobeCursor,
} from "@lobehub/icons";

type LogoProps = { className?: string };

/* ─── Brands available in Simple Icons (react-icons/si) ───────── */

export function ClaudeLogo({ className }: LogoProps) {
  // General Claude / Anthropic asterisk
  return <SiClaude className={className} color="#D97757" />;
}

export function ClaudeCodeLogo({ className }: LogoProps) {
  // Claude Code product mark from @lobehub/icons (official, distinct from
  // the generic Claude/Anthropic asterisk)
  return (
    <span className={className} style={{ display: "inline-flex", color: "#D97757" }}>
      <LobeClaudeCode size="100%" />
    </span>
  );
}

export function ChatGPTLogo({ className }: LogoProps) {
  // OpenAI knot — used for the ChatGPT product
  return <SiOpenai className={className} color="#10A37F" />;
}

export function CodexLogo({ className }: LogoProps) {
  // OpenAI Codex CLI — distinct mark from the OpenAI knot
  return (
    <span className={className} style={{ display: "inline-flex", color: "#000000" }}>
      <LobeCodex size="100%" />
    </span>
  );
}

export function GitHubLogo({ className }: LogoProps) {
  return <SiGithub className={className} color="#181717" />;
}

export function SlackLogo({ className }: LogoProps) {
  return <SiSlack className={className} color="#4A154B" />;
}

export function DiscordLogo({ className }: LogoProps) {
  return <SiDiscord className={className} color="#5865F2" />;
}

export function FigmaLogo({ className }: LogoProps) {
  return <SiFigma className={className} color="#F24E1E" />;
}

export function NotionLogo({ className }: LogoProps) {
  return <SiNotion className={className} color="#000000" />;
}

export function LinearLogo({ className }: LogoProps) {
  return <SiLinear className={className} color="#5E6AD2" />;
}

export function ObsidianLogo({ className }: LogoProps) {
  return <SiObsidian className={className} color="#7C3AED" />;
}

export function GmailLogo({ className }: LogoProps) {
  return <SiGmail className={className} color="#EA4335" />;
}

export function DocsLogo({ className }: LogoProps) {
  return <SiGoogledocs className={className} color="#4285F4" />;
}

export function SheetsLogo({ className }: LogoProps) {
  return <SiGooglesheets className={className} color="#0F9D58" />;
}

export function TelegramLogo({ className }: LogoProps) {
  return <SiTelegram className={className} color="#26A5E4" />;
}

export function TodoistLogo({ className }: LogoProps) {
  return <SiTodoist className={className} color="#E44332" />;
}

export function ClickUpLogo({ className }: LogoProps) {
  return <SiClickup className={className} color="#7B68EE" />;
}

export function XLogo({ className }: LogoProps) {
  return <FaXTwitter className={className} color="#000000" />;
}

/* ─── Operating system marks ──────────────────────────────────── */

export function WindowsLogo({ className }: LogoProps) {
  return <FaWindows className={className} />;
}

export function AppleLogo({ className }: LogoProps) {
  return <SiApple className={className} />;
}

export function LinuxLogo({ className }: LogoProps) {
  return <SiLinux className={className} />;
}

/* ─── Hand-rolled marks (not in any library) ───────────────────── */

export function CursorLogo({ className }: LogoProps) {
  // Cursor — official mark from @lobehub/icons
  return (
    <span className={className} style={{ display: "inline-flex", color: "#000000" }}>
      <LobeCursor size="100%" />
    </span>
  );
}

export function VSCodeLogo({ className }: LogoProps) {
  // VS Code — official ribbon mark (Microsoft owns the brand;
  // not in Simple Icons by policy, so we render the public mark directly).
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-label="VS Code"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
        fill="#0078D4"
      />
    </svg>
  );
}

export function TerminalLogo({ className }: LogoProps) {
  // Generic terminal — dark square with a green prompt
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Terminal">
      <rect width="24" height="24" rx="4" fill="#1A1A1A" />
      <path
        d="M5.5 7.5L9 11l-3.5 3.5M11 15.5h7"
        stroke="#34D399"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function AiderLogo({ className }: LogoProps) {
  // Aider — a CLI coding tool. No official mark in any icon set.
  // Render a clean terminal-prompt + sparkle composition.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Aider">
      <rect width="24" height="24" rx="4" fill="#1F140A" />
      <path
        d="M5 8.5l3 3-3 3"
        stroke="#FFB166"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10.5 14.5h6"
        stroke="#FFB166"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 5l.6 1.4L20 7l-1.4.6L18 9l-.6-1.4L16 7l1.4-.6L18 5z"
        fill="#FFB166"
      />
    </svg>
  );
}

/* ─── Microsoft 365 (no Simple Icons by policy — clean letter marks) ── */

export function OutlookLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Outlook">
      <rect width="24" height="24" rx="4" fill="#0078D4" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#FFFFFF"
        fontFamily="Geist, Arial, sans-serif"
      >
        O
      </text>
    </svg>
  );
}

export function TeamsLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Teams">
      <rect width="24" height="24" rx="4" fill="#6264A7" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#FFFFFF"
        fontFamily="Geist, Arial, sans-serif"
      >
        T
      </text>
    </svg>
  );
}

export function WordLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Word">
      <rect width="24" height="24" rx="4" fill="#2B579A" />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#FFFFFF"
        fontFamily="Geist, Arial, sans-serif"
      >
        W
      </text>
    </svg>
  );
}
