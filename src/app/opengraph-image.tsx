import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "OmniVox — Local-first voice dictation for the agentic age";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #FAF3E2 0%, #FFEAD0 55%, #F5C28A 100%)",
          padding: "70px 80px",
          fontFamily: "system-ui",
          color: "#1F140A",
        }}
      >
        {/* Decorative ember orb top-right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(232,120,44,0.55), rgba(232,120,44,0))",
            display: "flex",
          }}
        />

        {/* Top row: brand + version chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <svg width="56" height="56" viewBox="0 0 200 200" style={{ marginRight: 18 }}>
            <defs>
              <linearGradient id="ogTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="ogBot" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#D97706" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
            <path
              d="m194.6 96.7c-1.85-48.59-42.53-90.99-94.59-90.99-51.21 0-94.19 41.18-94.19 92.38v0.23l0.06-0.01 10.41-1.2c1.29-0.55 3.97-9.68 5.5-15.02 3.2-11.37 5.9-19.75 10.83-19.63 4.11 0.1 5.38 6.62 6.33 10.68l11.47 46.84 16.91-76.27c1.66-7.38 5.36-9.91 7.66-9.77 4.43 0.29 6.6 5.93 8.08 12.97l27.85 115.5h0.51c4.79-12.37 7.83-29.69 12.49-42.17 7.45-20.49 19.97-32.62 38.03-32.58 11.05 0.02 18.78 4.4 32.65 9.03z"
              fill="url(#ogTop)"
            />
            <path
              d="m161.8 97.43c-16.85 0-24.7 11.75-29.83 30.13-4.05 14.25-6.11 23.66-12.02 41.36-2.37 6.45-6.02 8.35-8.62 8.35-4.55 0-7.53-4.3-9.57-10.55l-26.61-111.9-17.13 76.63c-1.73 7.21-4.5 8.81-7.35 8.61-3.59-0.26-6.32-4.86-7.98-11.17l-10.99-43.85c-3.7 11.12-4.81 17.23-8.33 20.07-3.81 3.08-7.95 3.1-17.16 3.78 3.13 45.12 41.98 85.07 93.84 85.07 48.95 0 91.2-38 94.24-86.39-14.18-5.4-22.16-10.16-32.49-10.16z"
              fill="url(#ogBot)"
            />
          </svg>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1F140A",
            }}
          >
            OmniVox
          </div>
          <div style={{ display: "flex", flex: 1 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(31,20,10,0.12)",
              background: "rgba(255,251,241,0.9)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "#D8541D",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#D8541D",
                marginRight: 10,
              }}
            />
            V0.2.5 · EARLY ACCESS
          </div>
        </div>

        {/* Body: headline + preview card */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          {/* Left column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1.15,
              marginRight: 56,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 0.94,
                color: "#1F140A",
              }}
            >
              Speak your intent.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 0.94,
                color: "#D8541D",
                fontStyle: "italic",
                marginTop: 4,
              }}
            >
              Ship a prompt.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: "#4A382A",
                marginTop: 28,
                maxWidth: 620,
              }}
            >
              Local-first voice dictation for the agentic age. Whisper + Qwen
              on your machine, structured for Claude Code, Cursor, and Codex.
            </div>
          </div>

          {/* Right column: structured prompt card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 360,
              padding: 24,
              borderRadius: 24,
              background: "#FFFBF1",
              border: "1px solid rgba(31,20,10,0.10)",
              boxShadow: "0 24px 48px rgba(31,20,10,0.18)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: "#10B981",
                  marginRight: 10,
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "rgba(31,20,10,0.55)",
                }}
              >
                STRUCTURED MODE
              </div>
              <div style={{ display: "flex", flex: 1 }} />
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(232,120,44,0.14)",
                  color: "#D8541D",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                }}
              >
                IMPLEMENTATION
              </div>
            </div>

            {/* Slot 1: Goal */}
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#D8541D",
                  marginBottom: 4,
                }}
              >
                GOAL
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  lineHeight: 1.35,
                  color: "#1F140A",
                }}
              >
                Fix auth middleware on stale JWT
              </div>
            </div>

            {/* Slot 2: Files */}
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#D8541D",
                  marginBottom: 4,
                }}
              >
                FILES
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 15,
                  lineHeight: 1.35,
                  color: "#1F140A",
                  fontFamily: "monospace",
                }}
              >
                src/middleware/auth.ts
              </div>
            </div>

            {/* Slot 3: Urgency */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "#D8541D",
                  marginBottom: 4,
                }}
              >
                URGENCY
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  lineHeight: 1.35,
                  color: "#1F140A",
                }}
              >
                high — Friday review
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: trust badges + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                fontSize: 14,
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(31,20,10,0.07)",
                color: "#4A382A",
                fontWeight: 500,
                marginRight: 10,
              }}
            >
              No cloud
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 14,
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(31,20,10,0.07)",
                color: "#4A382A",
                fontWeight: 500,
                marginRight: 10,
              }}
            >
              No API keys
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 14,
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(31,20,10,0.07)",
                color: "#4A382A",
                fontWeight: 500,
              }}
            >
              No telemetry
            </div>
          </div>
          <div style={{ display: "flex", flex: 1 }} />
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "rgba(31,20,10,0.55)",
            }}
          >
            OMNIVOX.APP
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
