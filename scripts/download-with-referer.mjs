import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { dirname } from "path";

// Read URLs from a file or inline
const urls = [
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa161e3fbcf9d836fd622_66f905a7c6b99e86f71f34a1_66f68e171d4a7f9ea7c95c93_notion.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16285a8e25b7b3b8a4a_66f905a7e5f51e2c8f86e23e_66f68e174e93e22e8a9dad73_teams.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa1619b7cfbdcb5e97f7b_66f905ab39bd8eaeab3c41a2_66f68e17da5bb9b77a48c3ed_slack.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa162d74ee07e3e3a3bf2_66f905ab5e86f5b4f93dfc2a_66f68e174e93e22e8a9dad6b_gmail.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa162d0d5208f44e04dd1_66f905a93a6a5bb0d59b54ac_66f68e171d4a7f9ea7c95ca8_figma.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa1628ce0f6f8f0e6e55b_66f905a820c8e8e46e9a5e68_66f68e176437ee8f7e7a4dd3_gdocs.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16192f6a7e86ad47ba3_66f905a8e5f51e2c8f86e22f_66f68e1766846fa7ed88fa2e_vscode.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16137ab35f3e5e73b03_66f905a7e9e4ff2af1fa60ac_66f68e17b74a3e16e9d39b0f_signal.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa162d0d5208f44e04e14_66f905ab0e02ba4f33b1e5ea_66f68e173c6e5107e9c67dc3_snapchat.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa1618ce0f6f8f0e6e470_66f905aac6b99e86f71f34bb_66f68e178ddd37eab44b9e41_imessage.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16285a8e25b7b3b8a47_66f905abfd2ca9b6dddd0f0c_66f68e17b74a3e16e9d39b15_telegram.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa161d74ee07e3e3a3b86_66f905aa39bd8eaeab3c4196_66f68e178ddd37eab44b9e48_insta.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa161e3fbcf9d836fd686_66f905aa0e02ba4f33b1e5e4_66f68e171d4a7f9ea7c95c75_omnifocus.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa1619b7cfbdcb5e97f4c_66f905a75e86f5b4f93dfc18_66f68e17e9a16c2bbe66dac3_clickup.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16285a8e25b7b3b8a52_66f905a7ef0e21e5eb1b58e0_66f68e174e93e22e8a9dad77_todoist.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16119e4e6c42e5ccba5_66f905a720c8e8e46e9a5e59_66f68e17da5bb9b77a48c3f4_cursor.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa162d74ee07e3e3a3bf9_66f905a99e116e2217b7a95e_66f68e171d4a7f9ea7c95caa_gsheets.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa16192f6a7e86ad47b71_66f905a83a6a5bb0d59b549f_66f68e17e9a16c2bbe66dab1_discord.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa161d0d5208f44e04dd8_66f905a93a6a5bb0d59b54b2_66f68e173c6e5107e9c67db2_linear.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/682fa161d74ee07e3e3a3b6c_66f905ab5e86f5b4f93dfc2c_66f68e176437ee8f7e7a4dcf_gpres.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/68d5e962b8fbf9e9e8e21e3f_mom-phone.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c41bcac9306e98e9f5e3_starcursor.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c41b3d8a8a1e7e44f79a_darkmode.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c41b63b2dfc4c8e37ade_mail.svg",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6837f8e15e4eeef5fab1b680_Rivian.svg",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6837f8e0fc70e65e6cfebae3_Notion.svg",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6837f8e059a02e3d8e34a1b3_Substack.svg",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6837f8e0ad3a400e21e9b72f_Amazon.svg",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/6837f8e0abb5e94308d5e5a2_Strava.svg",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/683c43a093dd4303bfc7aefc_nvidia.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683c43c3bba5c3b2d0a7aaee_char_binoculars.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683826d4b91e429a2b6bdbfe_speed-bg.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9bb1e24aa47e9bef51_creators.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9b5b2e67adf0f0a4e7_cs.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9c6d0f7f94f7abb844_devs.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9b9530b7f5e19e1ced_lawyers.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9bad14f5d0ddab9f3a_leaders.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9b90c9e094a9a05c83_sales.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9c1ced1ee12dbb2e3d_students.avif",
  "https://cdn.prod.website-files.com/682fa12727f78b943ed45584/68485a9b5a3ed2e094f0e2cd_teams.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833671c33a78e3ba2af5b20_gmail-icon.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833671c49a2a2b3d0f36e0e_slack-icon.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833671c4a5e4e4f8a6d5e3d_imessage-icon.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/68d5ea1eb8fbf9e9e8e4f00c_on-the-go-desktop.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/68d5e9edb7c39bde4e7d8cd0_on-the-go-mobile.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/68d3a5478dfaa9a72e45b88a_ai-ask-illu.avif",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683ad93f16f0e9f0e38d10a0_chatgpt.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683ad93f16f0e9f0e38d10a4_claude.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683ad93f16f0e9f0e38d10a2_perplexity.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683c43a0f7e4d5e2a2cde8b8_footer-logo.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c6d04a5e4e4f8a6ecc6c_youtube.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c6d073f5cf59979e965a_producthunt.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c6d008cc98e9cff2dda3_instagram.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c6d0a1b8ec28c5f70946_x.svg",
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6833c6d0e2780a8c74cff76c_linkedin.svg",
];

async function download(url, dest) {
  try {
    const dir = dirname(dest);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    const res = await fetch(url, {
      headers: {
        'Referer': 'https://wisprflow.ai/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      }
    });
    if (!res.ok) { console.error(`  SKIP ${dest} (${res.status})`); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`  OK   ${dest} (${(buf.length / 1024).toFixed(1)}KB)`);
  } catch (e) {
    console.error(`  ERR  ${dest}: ${e.message}`);
  }
}

function urlToPath(url) {
  const parts = url.split("/");
  const filename = decodeURIComponent(parts[parts.length - 1]).replace(/[^a-zA-Z0-9._-]/g, "_");
  return `public/images/${filename}`;
}

async function main() {
  console.log(`Downloading ${urls.length} assets with Referer header...`);
  for (let i = 0; i < urls.length; i += 8) {
    const batch = urls.slice(i, i + 8);
    await Promise.all(batch.map(url => download(url, urlToPath(url))));
  }
  console.log("\nDone!");
}

main();
