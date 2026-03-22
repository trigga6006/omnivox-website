"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

function EntryCard({ entry, defaultOpen }: { entry: ChangelogEntry; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  const formattedDate = new Date(entry.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-card/60 transition-colors"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <Badge
            variant="outline"
            className="px-2.5 py-0.5 text-xs font-mono border-primary/25 text-primary bg-primary/5"
          >
            v{entry.version}
          </Badge>
          <span className="font-heading text-base font-semibold tracking-tight">
            {entry.title}
          </span>
          <span className="text-xs text-muted-foreground/50">
            {formattedDate}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 pt-1 space-y-2 border-t border-border">
              {entry.changes.map((change, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                  {change}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ChangelogEntries({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <EntryCard key={entry.version} entry={entry} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
