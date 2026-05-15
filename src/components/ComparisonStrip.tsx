import { Check, X, Minus } from "lucide-react";

interface Row {
  label: string;
  omnivox: "yes" | "no" | "partial" | string;
  cloud: "yes" | "no" | "partial" | string;
}

const ROWS: Row[] = [
  { label: "Runs entirely on your device", omnivox: "yes", cloud: "no" },
  { label: "Works offline / air-gapped", omnivox: "yes", cloud: "no" },
  { label: "Account & API keys required", omnivox: "no", cloud: "yes" },
  { label: "Monthly subscription", omnivox: "no", cloud: "yes" },
  { label: "Structured output for agentic tools", omnivox: "yes", cloud: "no" },
  { label: "Per-app context modes", omnivox: "yes", cloud: "partial" },
  { label: "Screen-context bias for code", omnivox: "yes", cloud: "no" },
  { label: "Voice commands → keystrokes", omnivox: "yes", cloud: "partial" },
];

function Cell({ value, accent }: { value: Row["omnivox"]; accent?: boolean }) {
  if (value === "yes") {
    return (
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{
          backgroundColor: accent ? "var(--ember)" : "var(--cream-dark)",
          color: accent ? "var(--primary-foreground)" : "var(--muted-foreground)",
        }}
      >
        <Check className="size-4" strokeWidth={accent ? 2.5 : 2} />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{
          backgroundColor: "var(--cream-dark)",
          color: "var(--muted-foreground)",
        }}
      >
        <X className="size-3.5" strokeWidth={2} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{
          backgroundColor: "var(--cream-dark)",
          color: "var(--muted-foreground)",
        }}
      >
        <Minus className="size-3.5" />
      </span>
    );
  }
  return <span className="text-[13px]">{value}</span>;
}

export function ComparisonStrip() {
  return (
    <section
      className="relative px-6 py-24"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-start gap-3 mb-10 md:items-center md:text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em]"
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
            How it stacks up
          </span>
          <h2
            className="font-display text-[36px] leading-[1] font-medium tracking-[-0.02em] md:text-[48px]"
            style={{ color: "var(--foreground)" }}
          >
            What changes when{" "}
            <span
              className="font-display-italic"
              style={{ color: "var(--ember)" }}
            >
              nothing leaves
            </span>{" "}
            your machine.
          </h2>
        </div>

        <div
          className="overflow-hidden rounded-3xl"
          style={{
            backgroundColor: "var(--paper)",
            border: "1px solid var(--border)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset, 0 22px 50px -28px rgba(31,20,10,0.22)",
          }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[1fr_70px_70px] md:grid-cols-[1fr_120px_120px] items-center gap-4 px-6 py-4"
            style={{
              backgroundColor: "var(--cream-dark)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Capability
            </span>
            <span
              className="text-center text-[13.5px] font-semibold"
              style={{ color: "var(--ember)" }}
            >
              OmniVox
            </span>
            <span
              className="text-center font-mono text-[10.5px] uppercase tracking-[0.18em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Cloud dictation
            </span>
          </div>

          {/* Rows */}
          {ROWS.map((row, idx) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_70px_70px] md:grid-cols-[1fr_120px_120px] items-center gap-4 px-6 py-3.5"
              style={{
                borderBottom:
                  idx < ROWS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                className="text-[14.5px]"
                style={{ color: "var(--foreground)" }}
              >
                {row.label}
              </span>
              <div className="flex justify-center">
                <Cell value={row.omnivox} accent={row.omnivox === "yes"} />
              </div>
              <div className="flex justify-center">
                <Cell value={row.cloud} />
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.18em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          comparison based on public docs of major cloud dictation tools, may 2026
        </p>
      </div>
    </section>
  );
}
