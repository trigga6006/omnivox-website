// Twitter cards use the same image as Open Graph — share the renderer
// from opengraph-image, but declare route segment config statically here
// so Next.js can parse it at build time.
import OpengraphImage from "./opengraph-image";

export const runtime = "edge";
export const alt =
  "OmniVox — Local-first voice dictation for the agentic age";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
