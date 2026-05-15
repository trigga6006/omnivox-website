import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";

const BASE = "https://cdn.prod.website-files.com";

// All discovered image assets from the page
const assets = [
  // SEO / Meta
  { url: `${BASE}/682f84b3838c89f8ff7667db/684b3be32acf9b372f54d41_ws-favi.png`, dest: "public/seo/favicon.png" },
  { url: `${BASE}/682f84b3838c89f8ff7667db/68d27d1a8a10f417b5644527_flow-wc-v2.png`, dest: "public/seo/apple-touch-icon.png" },
  { url: `${BASE}/682f84b3838c89f8ff7667db/683c611aba65ade013982bcd_wispr-og-min.jpg`, dest: "public/seo/og-image.jpg" },

  // Logo
  { url: `${BASE}/682f84b3838c89f8ff7667db/683215c6f233131a07d8bafc_navbar_logo.svg`, dest: "public/images/navbar_logo.svg" },

  // Nav icons
  { url: `${BASE}/682f84b3838c89f8ff7667db/6832181fdb427a83a4270c9a_dropdown_arrow.svg`, dest: "public/images/dropdown_arrow.svg" },
  { url: `${BASE}/682f84b3838c89f8ff7667db/698253c37a362938d982d229_android-icon.svg`, dest: "public/images/android-icon.svg" },

  // Platform icons
  { url: `${BASE}/682f84b3838c89f8ff7667db/68335d5ca4a30e3a678bf92d_mic-icon.svg`, dest: "public/images/mic-icon.svg" },
  { url: `${BASE}/682f84b3838c89f8ff7667db/686d4881d944a4b80f7d047e_windows.svg`, dest: "public/images/windows-icon.svg" },

  // Hero section
  { url: `${BASE}/682f84b3838c89f8ff7667db/683c97bbbb11df97317068ad_Frame%2048096292-1.avif`, dest: "public/images/hero-auto-edits.avif" },

  // Use case illustrations
  { url: `${BASE}/682fa12727f78b943ed45584/68485a9b3f5985030355f9d8_acessibility.avif`, dest: "public/images/use-case-accessibility.avif" },
];

// We'll also fetch all images we can enumerate
const additionalImages = [
  // Nav dropdown icons
  "6985066f81584cc3d6676b3d_ni-toggles.svg",
  "6985066f520e4076bbf2d4ef_ni-dollar-circle.svg",
  "6985066fecbc15fdf3640fac_ni-lock.svg",
  "6985066f0e48d2f8dd8cc148_ni-browser.svg",
  "6871316099ef4cdaa2d5a491_ni-users.svg",
  "68713161422abeaaa67d75d8_ni-laptop-code.svg",
];

for (const name of additionalImages) {
  assets.push({
    url: `${BASE}/682f84b3838c89f8ff7667db/${name}`,
    dest: `public/images/icons/${name}`,
  });
}

async function download(url, dest) {
  try {
    const dir = dirname(dest);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  SKIP ${dest} (${res.status})`);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`  OK   ${dest} (${(buf.length / 1024).toFixed(1)}KB)`);
  } catch (e) {
    console.error(`  ERR  ${dest}: ${e.message}`);
  }
}

async function main() {
  console.log(`Downloading ${assets.length} assets...`);

  // Download in batches of 6
  for (let i = 0; i < assets.length; i += 6) {
    const batch = assets.slice(i, i + 6);
    await Promise.all(batch.map((a) => download(a.url, a.dest)));
  }

  console.log("\nDone!");
}

main();
