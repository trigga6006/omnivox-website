/**
 * Single source of truth for download artifacts. Bump VERSION here when
 * a new release ships and every CTA / version chip on the site updates.
 *
 * Asset names follow the Tauri NSIS convention:
 *   OmniVox-v{VERSION}-x86_64-windows-setup.exe
 */

export const APP_VERSION = "0.2.6";
export const RELEASE_DATE = "May 15, 2026";

const REPO = "trigga6006/OmniVox";
const ASSET_WIN = `OmniVox-v${APP_VERSION}-x86_64-windows-setup.exe`;

/** Direct download — clicking immediately triggers the installer save. */
export const DOWNLOAD_WIN = `https://github.com/${REPO}/releases/download/v${APP_VERSION}/${ASSET_WIN}`;

/** Latest release page (release notes + all assets). */
export const RELEASES_URL = `https://github.com/${REPO}/releases`;
export const LATEST_RELEASE_URL = `https://github.com/${REPO}/releases/tag/v${APP_VERSION}`;

/** Repo URL for source code link. */
export const REPO_URL = `https://github.com/${REPO}`;

/** Approximate Windows installer size, shown alongside the CTA. */
export const WIN_INSTALLER_SIZE = "10 MB";

/** SHA-256 digest of the Windows installer (full hex, lowercase). */
export const WIN_INSTALLER_SHA256 =
  "f3e836255f2097054e93460ddaedefcc2a238dc0695dfb558aedc1ac18f2af1c";
