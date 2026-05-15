import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "OmniVox — Local-first voice dictation for the agentic age";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadLocalFont(path: string): Promise<ArrayBuffer | null> {
  try {
    return await fetch(new URL(path, import.meta.url)).then((r) =>
      r.arrayBuffer()
    );
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  // Load typography from bundled TTFs
  const [bricolage, jetbrainsMono] = await Promise.all([
    loadLocalFont("./fonts/Bricolage.ttf"),
    loadLocalFont("./fonts/JetBrainsMono-Regular.ttf"),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[] = [];
  // Bricolage is a variable font; register the same data at multiple weights
  // so Satori picks the right axis position.
  if (bricolage) {
    fonts.push({ name: "Bricolage", data: bricolage, weight: 400, style: "normal" });
    fonts.push({ name: "Bricolage", data: bricolage, weight: 700, style: "normal" });
  }
  if (jetbrainsMono)
    fonts.push({ name: "JetBrains", data: jetbrainsMono, weight: 400, style: "normal" });

  // Subtle waveform dots — left half only, between masthead and headline,
  // suggests "audio in" without crowding any text.
  const waveformDots = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13;
    const x = 70 + t * 320;
    const baseY = 185;
    const amp = Math.sin(t * Math.PI * 2.3) * 8;
    const y = baseY + amp;
    const size = 4 + Math.abs(Math.sin(t * Math.PI * 2)) * 2;
    const opacity = 0.25 + Math.abs(Math.sin(t * Math.PI * 1.8)) * 0.35;
    return { x, y, size, opacity };
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #FAF3E2 0%, #FAEAC9 38%, #F2C58E 78%, #E8956F 100%)",
          padding: 56,
          fontFamily: "Bricolage",
          color: "#1F140A",
          position: "relative",
        }}
      >
        {/* Ember orb — top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(216,84,29,0.55), rgba(216,84,29,0))",
            display: "flex",
          }}
        />
        {/* Ember orb — bottom-left, mid-low */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(232,120,44,0.32), rgba(232,120,44,0))",
            display: "flex",
          }}
        />

        {/* Editorial perimeter rule — like a magazine tear-out */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(31,20,10,0.10)",
            borderRadius: 14,
            display: "flex",
            pointerEvents: "none",
          }}
        />
        {/* Corner crosshair markers (top-left + bottom-right) */}
        {[
          { top: 22, left: 22 },
          { bottom: 22, right: 22 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 12,
              height: 12,
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 5,
                left: 0,
                width: 12,
                height: 1,
                background: "rgba(216,84,29,0.55)",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 5,
                top: 0,
                height: 12,
                width: 1,
                background: "rgba(216,84,29,0.55)",
                display: "flex",
              }}
            />
          </div>
        ))}

        {/* Decorative waveform dots — diagonal across the lower half */}
        {waveformDots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.size,
              height: d.size,
              borderRadius: 9999,
              background: "#D8541D",
              opacity: d.opacity,
              display: "flex",
            }}
          />
        ))}

        {/* ─── TOP ROW ──────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Brand mark */}
          <svg width="52" height="52" viewBox="0 0 200 200" style={{ marginRight: 16 }}>
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
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#1F140A",
            }}
          >
            OmniVox
          </div>

          <div style={{ display: "flex", flex: 1 }} />

          {/* Issue / version meta — editorial style */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains",
                fontSize: 12,
                letterSpacing: "0.28em",
                color: "rgba(31,20,10,0.5)",
              }}
            >
              ISSUE 01 / MAY 2026
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "JetBrains",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#D8541D",
              }}
            >
              <span>[ </span>
              <div
                style={{
                  display: "flex",
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: "#D8541D",
                  margin: "0 8px",
                }}
              />
              <span>V0.2.5 · EARLY ACCESS </span>
              <span>]</span>
            </div>
          </div>
        </div>

        {/* Hairline divider under the masthead */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(31,20,10,0.18) 12%, rgba(31,20,10,0.18) 88%, transparent 100%)",
            marginTop: 16,
            position: "relative",
            zIndex: 2,
          }}
        />

        {/* ─── BODY ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            marginTop: 22,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left — headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1.2,
              marginRight: 36,
            }}
          >
            {/* Section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "JetBrains",
                fontSize: 13,
                letterSpacing: "0.28em",
                color: "rgba(31,20,10,0.5)",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 28,
                  height: 1,
                  background: "rgba(31,20,10,0.35)",
                  marginRight: 12,
                }}
              />
              FEATURE
            </div>

            {/* Headline */}
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#1F140A",
              }}
            >
              Speak your
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 0.92,
                color: "#D8541D",
                marginTop: 2,
              }}
            >
              intent.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#1F140A",
                marginTop: 2,
              }}
            >
              Ship a{" "}
              <span
                style={{
                  color: "#D8541D",
                  letterSpacing: "-0.05em",
                  marginLeft: 24,
                }}
              >
                prompt.
              </span>
            </div>

            {/* Subtitle */}
            <div
              style={{
                display: "flex",
                fontSize: 22,
                lineHeight: 1.4,
                color: "#4A382A",
                marginTop: 28,
                maxWidth: 580,
              }}
            >
              Local-first voice dictation for the agentic age. Whisper +
              Qwen on your machine, structured for Claude Code, Cursor, and
              Codex.
            </div>
          </div>

          {/* Right — structured prompt card, slightly tilted */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 350,
              padding: 24,
              borderRadius: 22,
              background: "#FFFBF1",
              border: "1px solid rgba(31,20,10,0.10)",
              boxShadow:
                "0 32px 60px rgba(31,20,10,0.22), 0 8px 16px rgba(31,20,10,0.10)",
              transform: "rotate(2deg)",
              marginRight: -8,
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
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: "#10B981",
                  marginRight: 10,
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "rgba(31,20,10,0.5)",
                }}
              >
                STRUCTURED MODE
              </div>
              <div style={{ display: "flex", flex: 1 }} />
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains",
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "rgba(232,120,44,0.14)",
                  color: "#D8541D",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                }}
              >
                IMPLEMENTATION
              </div>
            </div>

            {/* Slot 1 */}
            <Slot label="GOAL" value="Fix auth middleware on stale JWT" />
            <SlotDivider />
            {/* Slot 2 */}
            <Slot
              label="FILES"
              value="src/middleware/auth.ts"
              mono
            />
            <SlotDivider />
            {/* Slot 3 */}
            <Slot label="URGENCY" value="high — Friday review" />

            {/* Voxify footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px dashed rgba(31,20,10,0.18)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "rgba(31,20,10,0.45)",
                }}
              >
                ENTER TO PASTE
              </div>
              <div style={{ display: "flex", flex: 1 }} />
              <div
                style={{
                  display: "flex",
                  fontFamily: "JetBrains",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "#D8541D",
                  fontWeight: 700,
                }}
              >
                ·VOXIFY
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM ROW ───────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Trust pills */}
          <div style={{ display: "flex" }}>
            {["No cloud", "No API keys", "No telemetry"].map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  padding: "9px 16px",
                  borderRadius: 999,
                  background: "rgba(255,251,241,0.7)",
                  border: "1px solid rgba(31,20,10,0.10)",
                  color: "#1F140A",
                  fontWeight: 400,
                  marginRight: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "#D8541D",
                    marginRight: 10,
                  }}
                />
                {b}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flex: 1 }} />

          {/* Domain */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains",
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "rgba(31,20,10,0.4)",
              }}
            >
              READ MORE AT
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#1F140A",
                marginTop: 4,
              }}
            >
              omnivox.app  /
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}

function Slot({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 4 }}>
      <div
        style={{
          display: "flex",
          fontFamily: "JetBrains",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.24em",
          color: "#D8541D",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 16,
          lineHeight: 1.3,
          color: "#1F140A",
          fontFamily: mono ? "JetBrains" : "Bricolage",
          fontWeight: mono ? 400 : 400,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SlotDivider() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: 1,
        background: "rgba(31,20,10,0.08)",
        margin: "10px 0",
      }}
    />
  );
}
