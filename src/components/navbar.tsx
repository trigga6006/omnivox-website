"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { Download, Menu, X, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Privacy", href: "#privacy" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.svg"
            alt="OmniVox"
            width={28}
            height={28}
            className="shrink-0"
          />
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            OmniVox
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-muted-foreground"
            )}
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a
            href="#download"
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Download className="size-3.5" />
            Download
          </a>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2 border-t border-border">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "flex-1 gap-1.5"
                )}
              >
                <Github className="size-4" />
                GitHub
              </a>
              <a
                href="#download"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "flex-1 gap-1.5"
                )}
              >
                <Download className="size-3.5" />
                Download
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
