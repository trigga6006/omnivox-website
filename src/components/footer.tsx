import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="OmniVox"
                width={22}
                height={22}
              />
              <span className="font-heading text-base font-bold tracking-tight">
                OmniVox
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Local AI dictation for Windows
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/#features"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/changelog"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Changelog
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} OmniVox. Built with privacy in
            mind.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40">
            <span>An</span>
            <Image
              src="/omni-impact.svg"
              alt="Omni Impact"
              width={14}
              height={14}
              className="opacity-50"
            />
            <span>Omni Impact product</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
