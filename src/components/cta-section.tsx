"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-section";

const INSTALL_CMD =
  "irm https://raw.githubusercontent.com/trigga6006/OmniVox/main/install.ps1 | iex";

function InstallBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-block rounded-xl border border-border bg-card/60 overflow-hidden text-left">
      {/* Header + copy button */}
      <div className="flex items-center justify-between border-b border-border bg-card/40 px-4 py-2">
        <span className="text-xs font-medium text-foreground relative">
          PowerShell
          <span className="absolute -bottom-2 left-0 right-0 h-px bg-primary" />
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Copy install command"
        >
          {copied ? (
            <Check className="size-3.5 text-green-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>

      {/* Command */}
      <div className="px-4 py-4">
        <pre className="font-mono text-[13px] text-foreground/80 break-all whitespace-pre-wrap select-all">
          {INSTALL_CMD}
        </pre>
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <section id="download" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.78_0.16_75/0.04)_0%,transparent_60%)]" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <AnimatedDiv>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
            Ready to reclaim
            <br />
            your voice?
          </h2>
        </AnimatedDiv>

        <AnimatedDiv delay={0.1}>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            Install OmniVox with a single command. No account needed. No strings
            attached.
          </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div className="mt-8">
            <InstallBlock />
          </div>

          <p className="mt-5 text-xs text-muted-foreground/50">
            Windows 10 or later. Run as Administrator.
          </p>
        </AnimatedDiv>
      </div>
    </section>
  );
}
