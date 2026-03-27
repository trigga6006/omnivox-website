"use client";

import { useState } from "react";

interface UseCase {
  id: string;
  label: string;
  title: string;
  desc: string;
}

const useCases: UseCase[] = [
  {
    id: "accessibility",
    label: "Accessibility",
    title: "Flow for Accessibility",
    desc: "Your voice deserves a shortcut. Flow supports anyone who feels slowed down by a keyboard by turning speech into structured, polished text\u2014quietly, reliably, naturally.",
  },
  {
    id: "teams",
    label: "Teams",
    title: "Flow for Teams",
    desc: "Fewer meetings, faster alignment, and a voice for everyone when it matters most. Teams also get centralized admin controls and special pricing.",
  },
  {
    id: "students",
    label: "Students",
    title: "Flow for Students",
    desc: "Blank pages and looming deadlines? Flow\u2019s got you. Capture class notes, draft cover letters, and break through writer\u2019s block with minimal effort.",
  },
  {
    id: "developers",
    label: "Developers",
    title: "Flow for Developers",
    desc: "Dictate in natural language and let Flow translate\u2014perfect for Cursor, VS Code, or wherever you build. From commit messages to refactors, stay in the zone with Flow.",
  },
  {
    id: "creators",
    label: "Creators",
    title: "Flow for Creators",
    desc: "Ideas hit fast, but execution is slow. Breeze through unread DMs, comment replies, and draft content with your voice. Create more, type less.",
  },
  {
    id: "sales",
    label: "Sales",
    title: "Flow for Sales",
    desc: "Slow follow ups mean lost deals. With Flow, you can follow up instantly after meetings, personalize outreach, and punch up your pitch\u2014without typing a word.",
  },
  {
    id: "support",
    label: "Customer Support",
    title: "Flow for Customer Support",
    desc: "Speak naturally to resolve tickets faster. Skip the script. Flow helps reps speak naturally while still sending perfect replies\u2014across tickets, chats, and DMs.",
  },
  {
    id: "lawyers",
    label: "Lawyers",
    title: "Flow for Lawyers",
    desc: "Legal precision demands perfect transcription. Flow delivers smart dictation for contracts, case notes, and client records\u2014with formatting that catches every clause, not typos. HIPAA-ready on all plans, SOC 2 Type II compliant on Enterprise plans.",
  },
  {
    id: "leaders",
    label: "Leaders",
    title: "Flow for Leaders",
    desc: "Who doesn\u2019t want faster teams and happier people? Flow delivers instant productivity your team will actually use. SOC2 Type II compliant for Enterprise plans and HIPAA-eligible for everyone\u2014so you can move fast without breaking anything.",
  },
];

/** Gradient pairs for illustration placeholders, one per use-case. */
const illustrationGradients: Record<string, [string, string]> = {
  accessibility: ["#034F46", "#0A7A6B"],
  teams: ["#034F46", "#2D6A4F"],
  students: ["#1B4332", "#52796F"],
  developers: ["#034F46", "#1A535C"],
  creators: ["#2D6A4F", "#40916C"],
  sales: ["#034F46", "#3A7D5E"],
  support: ["#1B4332", "#52796F"],
  lawyers: ["#034F46", "#2D6A4F"],
  leaders: ["#1B4332", "#40916C"],
};

function IllustrationPlaceholder({ useCase }: { useCase: UseCase }) {
  const [from, to] = illustrationGradients[useCase.id] ?? ["#034F46", "#0A7A6B"];

  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl"
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      {/* Decorative floating shapes */}
      <div
        className="absolute top-6 left-8 h-16 w-16 rounded-2xl opacity-20"
        style={{ backgroundColor: "#FFFFEB" }}
      />
      <div
        className="absolute right-10 bottom-10 h-20 w-20 rounded-full opacity-15"
        style={{ backgroundColor: "#F0D7FF" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-xl opacity-10"
        style={{ backgroundColor: "#FFFFEB" }}
      />

      {/* Central icon area */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-semibold"
          style={{ backgroundColor: "rgba(255, 255, 235, 0.15)", color: "#FFFFEB" }}
        >
          {useCase.label.charAt(0)}
        </div>
        <span
          className="text-sm font-medium tracking-wide opacity-60"
          style={{ color: "#FFFFEB" }}
        >
          {useCase.label}
        </span>
      </div>
    </div>
  );
}

function extractCategoryWord(title: string): { before: string; category: string } {
  // Title format: "Flow for [Category]"
  const parts = title.split("for ");
  if (parts.length >= 2) {
    return { before: parts[0] + "for ", category: parts.slice(1).join("for ") };
  }
  return { before: title, category: "" };
}

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const activeCase = useCases.find((uc) => uc.id === activeTab) ?? useCases[0];
  const { before, category } = extractCategoryWord(activeCase.title);

  return (
    <section
      className="mx-auto w-full max-w-[1360px] px-6"
      style={{ marginTop: "80px", marginBottom: "80px" }}
    >
      <div
        className="rounded-[32px] px-6 py-20 md:px-16"
        style={{ backgroundColor: "var(--section-dark-bg)", minHeight: "50rem" }}
      >
        {/* Heading */}
        <h2
          className="mb-10 font-heading text-5xl font-normal leading-[0.95em] md:text-7xl lg:text-[80px]"
          style={{ color: "rgb(255, 255, 235)" }}
        >
          Flow is made{" "}
          <span style={{ color: "#F0D7FF" }}>for you</span>
        </h2>

        {/* Tab Bar */}
        <div
          className="mb-12 flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {useCases.map((uc) => {
            const isActive = uc.id === activeTab;
            return (
              <button
                key={uc.id}
                type="button"
                onClick={() => setActiveTab(uc.id)}
                className="shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors"
                style={
                  isActive
                    ? {
                        backgroundColor: "#F0D7FF",
                        color: "#1a1a1a",
                        fontWeight: 600,
                        border: "1px solid transparent",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(255, 255, 235, 0.5)",
                        border: "1px solid rgba(255, 255, 235, 0.2)",
                      }
                }
              >
                {uc.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-12">
          {/* Left — Illustration Placeholder */}
          <IllustrationPlaceholder useCase={activeCase} />

          {/* Right — Copy */}
          <div className="flex flex-col gap-6">
            <h3
              className="font-heading text-3xl font-normal md:text-[48px] md:leading-[1.1]"
              style={{ color: "#FFFFEB" }}
            >
              {before}
              <span className="underline decoration-[#F0D7FF] decoration-2 underline-offset-4">
                {category}
              </span>
            </h3>

            <p
              className="max-w-[480px] text-lg leading-7"
              style={{ color: "rgba(255, 255, 235, 0.7)" }}
            >
              {activeCase.desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#"
                className="text-base font-semibold underline underline-offset-4"
                style={{ color: "#FFFFEB" }}
              >
                Learn more
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold"
                style={{
                  backgroundColor: "#F0D7FF",
                  color: "#1a1a1a",
                  border: "2px solid #1a1a1a",
                }}
              >
                Download for Windows
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
