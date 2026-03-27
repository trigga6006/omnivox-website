# Page Topology — wisprflow.ai

## Overall Structure
- Webflow site (w-mod-ix interactions)
- No Lenis or Locomotive Scroll
- No videos — all visual assets are images/avif
- Splide.js for testimonial marquee
- SVG text-on-path for hero animations
- CSS keyframe animation for logo ticker

## Sections (top to bottom)

### 1. Announcement Bar
- **Class:** `.banner_wrapper`
- **BG:** rgb(3, 79, 70) — dark green
- **Content:** "Now live on Android — free & unlimited during launch" + "Download now" link
- **Height:** ~65px
- **Sticky:** No (flow content above nav)

### 2. Navigation
- **Class:** `.nav_fixed`
- **Position:** fixed, z-index: 999
- **BG:** transparent (over cream page bg)
- **Content:** Flow logo, Product dropdown, Individuals dropdown, Business dropdown, Resources dropdown, "Flow for Android" bordered button, "Download for Windows" purple button
- **Height:** ~69px
- **Interaction model:** Click-driven dropdowns (Webflow native)

### 3. Hero Section
- **Class:** `.hero-wrapper`
- **BG:** cream (page default rgb(255, 255, 235))
- **Height:** ~784px
- **Content:**
  - H1: "Don't type, just speak" (EB Garamond 120px)
  - Subtitle: "The voice-to-text AI that turns speech into clear, polished writing in every app."
  - CTA: "Download for Windows" purple button
  - "Available on Mac, Windows, iPhone, and Android"
  - Animated SVG text-on-path (spiral text showing messy dictation)
  - "Removed repetition" green tag
  - Microphone icon
  - Second SVG text-on-path (cleaned up text)
- **Interaction model:** SVG text animations (auto-playing, CSS keyframes on SVG textPath)

### 4. Apps/Integrations Section
- **Class:** `.section_integrations-clients`
- **BG:** Dark section, starts with dark green (rgb(3, 79, 70)), transitions to dark (rgb(26, 26, 26))
- **Height:** ~1349px
- **Content:**
  - Platform pills: iPhone, Mac, Windows, Android (bordered pills on dark bg)
  - H2: "Write faster in all your apps, on any device" (EB Garamond 64px, cream text)
  - Subtitle: "Seamless speech-to-text in every application on your phone or computer."
  - "Watch in action" bordered button (opens YouTube embed)
  - Diagonal app icon grid (cascade of real app icons)
  - Phone mockup (messaging UI showing dictation)
  - "Used by professionals everywhere" text
  - Logo ticker (CSS keyframe marquee): Rivian, Notion, Substack, Amazon, Strava, Nvidia, Superhuman, Clay, Nuuly, etc.
  - Illustration: person with binoculars
- **Interaction model:** Logo ticker is auto-animated CSS keyframes (translateX -100%)

### 5. Speed Section
- **Class:** `.section_faster`
- **BG:** cream (rgb(255, 255, 235))
- **Height:** ~1298px
- **Content:**
  - H2: "4x faster than typing" (EB Garamond 120px) with purple underline decoration
  - Body text about voice that finally works
  - "Try Flow" bordered button + "Download for Windows" purple button
  - Side-by-side comparison:
    - Left: "Keyboard / 45 wpm" card with slow typing text
    - Right: "Flow / 220 wpm" card with video/image bg, spiral text overlay, mic icon
- **Interaction model:** Static layout, text-on-path SVG animation in Flow card

### 6. Use Cases Section
- **Class:** `.section_use-cases`
- **BG:** rgb(26, 26, 26) — dark
- **Height:** ~800px
- **Content:**
  - H2: "Flow is made for you" (EB Garamond, cream/white text, "for you" in purple)
  - Tab links (horizontal scrollable): Teams, Students, Developers, Creators, Sales, Customer Support, Lawyers, Leaders, Accessibility
  - Each tab shows: illustration image + "Flow for [X]" title + description + "Learn more" link + "Download for Windows" button
- **Interaction model:** Click-driven tabs (Webflow CMS powered)

### 7. AI Auto Edits Feature
- **Class:** `.section_features` (first instance)
- **BG:** cream
- **Height:** ~1040px
- **Content:**
  - Left: Large image showing dictation with "Removed filler" and "Added to Dictionary" orange tags, plus cleaned text output card
  - Right: "AI Auto Edits" heading + description + CTA buttons
- **Layout:** 2-column (image left, text right)

### 8. Features Grid (4 items)
- **Class:** `.section_features` (second instance)
- **BG:** cream
- **Height:** ~2123px
- **Layout:** 2-column grid with 4 feature cards

#### 8a. Personal Dictionary
- Title + description + dark card with "Your Dictionary" list (Robyn, Viktor, SaaS, Caltrain, Mackey, Nguyen, Leong)

#### 8b. Snippet Library
- Title + description + dark card with "Your Snippets" list (Calendar, Hours, Support intro, FAQ, Careers link, Elevator pitch, Address)
- One expanded snippet showing Calendly link

#### 8c. Different Tones for Each App
- Title + description + dark card showing "hello" routed to Gmail ("Hello."), Slack ("Hello"), Messages ("hello")

#### 8d. 100+ Languages
- Title + description + dark card with flag emojis in a circle arrangement + "100+ Languages" center text

### 9. On-the-go Section
- **Class:** `.section_features` (third part)
- **BG:** cream
- **Content:**
  - Platform pills: iPhone, Mac, Windows, Android
  - H2: "On-the-go or at your desk" (EB Garamond)
  - Body text + "Download for Windows" purple button
  - Right side: Desktop + mobile mockup images (Notion workspace, phone dictation UI)
- **Layout:** 2-column

### 10. Testimonials Section
- **Class:** `.section_testimonials`
- **BG:** rgb(26, 26, 26) — dark
- **Height:** ~1374px
- **Content:**
  - H2: "Love letters to Flow" (EB Garamond, cream text) with green sparkle decorations
  - Marquee carousel (Splide.js) of testimonial cards
  - Each card: avatar, quote text, name + title
  - Two featured green case study cards: "4x faster responses" + "50+ hours saved"
- **Interaction model:** Auto-scrolling marquee (Splide.js)

### 11. CTA Section
- **Class:** `.section_cta`
- **BG:** Full-bleed background image (person in field, motion blur)
- **Height:** ~variable
- **Content:**
  - H2: "Start flowing" (EB Garamond, cream text)
  - Subtitle + CTA buttons
  - "Available on Mac, Windows, iPhone, and Android"
  - Dotted spiral decoration (white dots)
- **Interaction model:** Static (decorative dots may animate)

### 12. Ask AI Section
- **Class:** `.section_ask-ai`
- **BG:** cream
- **Content:**
  - Bordered card with rounded corners
  - "STILL NOT SURE THAT WISPR FLOW IS RIGHT FOR YOU?" (uppercase, bold)
  - Subtitle text
  - Three purple buttons: "Ask ChatGPT", "Ask Claude", "Ask Perplexity" (with brand icons)
  - Illustration: person with magnifying glass and speech bubble
- **Interaction model:** Click-driven (buttons link to external AI chats)

### 13. Footer
- **Class:** `.footer`
- **BG:** cream
- **Content:**
  - Three columns: Company (About, Careers, Trust Center, Become an Affiliate, Media Kit), Product (What's New, Use Cases, Flow for Students, Flow for Non-Profits, Flow for Android), Resources (Workflows, Vibe Coding, Talk to Support, Talk to Sales, Help Center)
  - Large Flow logo + wordmark (very large, spans full width)
  - Bottom bar: "© Wispr Flow 2026", Terms, Privacy, Data Controls, social icons (YouTube, Product Hunt, Instagram, X, LinkedIn)
