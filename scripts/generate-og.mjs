#!/usr/bin/env node
/**
 * Regenerate public/og-image.png from the renderer at /api/og.
 *
 * Builds the app, starts a temporary server, fetches the rendered
 * PNG, writes it to public/og-image.png, then shuts the server down.
 *
 * Run:  npm run og
 */
import { writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const PORT = 3099;

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit" });
    p.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))
    );
  });
}

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { method: "HEAD" });
      if (r.ok || r.status === 405) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not become ready within ${timeoutMs}ms`);
}

console.log("Building Next.js app...");
await run("npx", ["next", "build"]);

console.log(`Starting server on port ${PORT}...`);
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: "pipe",
});

try {
  await waitForServer(`http://localhost:${PORT}/`);
  console.log("Fetching /api/og...");
  const res = await fetch(`http://localhost:${PORT}/api/og`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile("public/og-image.png", buf);
  console.log(`Wrote public/og-image.png (${buf.byteLength} bytes)`);
} finally {
  server.kill("SIGTERM");
}
