import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JacarandaIcon from "@/components/JacarandaIcon";
import HoverBinaryLogo from "@/components/HoverBinaryLogo";
import heroNetwork from "@/assets/hero-network.jpg";
import logoColor from "@/assets/logo-color.png";
import heroHLogo from "@/assets/hero-h-logo.png";
import hero3dLogo from "@/assets/hero-3d-logo.png";
import { Play, ArrowRight } from "lucide-react";

// 2026-09-19: Commercial video (button now labelled "Hatfield.ai Commercial",
// see the button comment below). Served as a static file from
// public/videos/ (not imported from src/assets) so Vite copies it verbatim
// and the browser can stream it. The file is a web re-encode of
// Commercial_revised.mp4 (141.8 MB -> 35.8 MB, H.264 + AAC, moov atom moved
// to the front with +faststart so playback starts before the download ends).
// The original was over GitHub's 100 MB per-file limit and could not be pushed.
// 2026-09-19 (rename): the file path and this constant name deliberately keep
// "nexus" so the already-pushed 35.8 MB video does not have to be renamed or
// re-pushed; only the visible wording changed.
const NEXUS_COMMERCIAL_SRC = "/videos/nexus-commercial.mp4";

// ---------------------------------------------------------------------------
// HOMEPAGE TICKER CONTENT
// 2026-10-01 (rev 7, Frank): rebuilt to the "Homepage Ticker Requirements"
// document (NEXUS + SIGNAL + Capabilities + Why Hatfield rotation). The
// ticker moves from statistics to a WHAT + WHY story: four rotations, each
// tile a short uppercase headline with a one-line value statement.
//
// EVERYTHING the ticker says is in TICKER_ROTATIONS below and nowhere else
// (requirement 5: content-configurable, not hard-coded into the animation).
//   - Edit a tile:      change its headline or value text.
//   - Reorder:          move the tile's line, or move a whole rotation block.
//   - Switch off a tile:      add  enabled: false  to that tile.
//   - Switch off a rotation:  set the rotation's  enabled  to false.
//   - anchor: true      gives the dark product-anchor treatment
//                       (NEXUS, SIGNAL, HATFIELD.AI).
//   - href              makes the tile a link.
//
// Content governance (requirement 6) applied here:
//   - REMOVED: 96.8% / #1 of 12, 70%, ~3X, 40-75% and 100% audit-ready. No
//     NEXUS percentage or ranking appears in the ticker any more; NEXUS is
//     told through qualitative proof (one identity, assess once, SIGNAL
//     built in, examiner ready), per requirement 7.
//   - REMOVED: "21 live intelligence surfaces" (requirement 7).
//   - The optional SIGNAL scale rotation (847 sources / 12 lists / 234
//     countries) is included but SWITCHED OFF (enabled: false), because
//     requirements 6 and 7 allow it only once the figures are validated
//     against production, and that has not been done: the code base shows
//     11 sanctions/export-control lists, not 12, and the 847 source count
//     lives in the database. Set enabled to true when they are confirmed.
//
// Links (requirement 5): SIGNAL goes to /signal, the same address the
// hero's "Introducing SIGNAL" link uses. NEXUS and HATFIELD.AI go to the
// Platform Capabilities section of this page (#capabilities) because this
// file does not show a dedicated NEXUS or overview page address; change
// the two href values below if one exists.
// Punctuation: the requirements' " - " is set as an em dash and its
// apostrophes as typographic ones, matching the rest of this page. The
// words are exactly as supplied.
// ---------------------------------------------------------------------------
type TickerTile = {
  headline: string;
  value: string;
  anchor?: boolean;
  href?: string;
  enabled?: boolean;
};
type TickerRotation = { id: string; enabled: boolean; tiles: TickerTile[] };

const TICKER_ROTATIONS: TickerRotation[] = [
  {
    id: "A - NEXUS",
    enabled: true,
    tiles: [
      { headline: "NEXUS", value: "The operating system for third-party risk.", anchor: true, href: "#capabilities" },
      { headline: "One vendor. One identity.", value: "Eliminate duplicate records." },
      { headline: "Intelligent intake", value: "Ask once. Route the right risk." },
      { headline: "Assess once", value: "Reuse what remains valid." },
      { headline: "Contract right", value: "Align terms to the engagement and risk." },
      { headline: "SIGNAL built in", value: "Know when something changes." },
      { headline: "Examiner ready", value: "Keep the evidence behind every decision." },
    ],
  },
  {
    id: "B - SIGNAL",
    enabled: true,
    tiles: [
      { headline: "SIGNAL", value: "Your GPS for business decisions.", anchor: true, href: "/signal" },
      { headline: "Financial intelligence", value: "See deterioration earlier." },
      { headline: "Cyber intelligence", value: "Know when exposure changes." },
      { headline: "Sanctions & regulatory", value: "Screen against authoritative sources." },
      { headline: "Litigation & corporate actions", value: "See material events as they emerge." },
      { headline: "Geopolitical & supply chain", value: "See disruption before it reaches you." },
      { headline: "Economic intelligence", value: "Understand the environment around your portfolio." },
      { headline: "Signal. Not noise.", value: "Know what changed. Know what matters. Know where to act." },
    ],
  },
  {
    id: "C - Capabilities",
    enabled: true,
    tiles: [
      { headline: "Entity intelligence", value: "Know exactly who you’re dealing with." },
      { headline: "Intelligent intake", value: "Ask once. Route the right risk." },
      { headline: "Assessment reuse", value: "Don’t assess the same risk twice." },
      { headline: "Contract intelligence", value: "The right agreement. The right obligations." },
      { headline: "Continuous surveillance", value: "Know when risk changes." },
      { headline: "Event intelligence", value: "One material event — not hundreds of alerts." },
      { headline: "4th-party intelligence", value: "See beyond the vendor." },
      { headline: "Operational resilience", value: "Know where disruption can reach you." },
      { headline: "Economic intelligence", value: "Understand the environment around your portfolio." },
      { headline: "AI with control", value: "Automate the work. Keep people in command." },
      { headline: "Full provenance", value: "Every signal. Every source. Every decision." },
      { headline: "Hatfield.ai", value: "From intake to intelligence.", anchor: true, href: "#capabilities" },
    ],
  },
  {
    id: "D - Why Hatfield",
    enabled: true,
    tiles: [
      { headline: "Built by practitioners", value: "Designed around how the work actually gets done." },
      { headline: "Connected. Not stitched.", value: "One architecture instead of another integration layer." },
      { headline: "AI with control", value: "AI proposes. Logic verifies. People decide." },
      { headline: "Source to decision", value: "Evidence and provenance stay attached." },
      { headline: "Priced for the institution", value: "Access should follow the work — not the seat." },
      { headline: "Built to replace", value: "Not another tool to add to the stack." },
    ],
  },
  {
    // Optional SIGNAL scale/proof rotation (requirement 7). OFF until the
    // figures are validated against production - see the note above.
    id: "E - SIGNAL scale (optional, off)",
    enabled: false,
    tiles: [
      { headline: "847", value: "Curated global sources." },
      { headline: "12", value: "Sanctions & export-control lists." },
      { headline: "234", value: "Countries & territories." },
    ],
  },
];

// ---------------------------------------------------------------------------
// HOMEPAGE TICKER MECHANICS (no wording below this line)
// One "pass" is every enabled tile of every enabled rotation, in order,
// with a thin separator ahead of each rotation. Built from TICKER_ROTATIONS
// so the two can never disagree.
// ---------------------------------------------------------------------------
type TickerItem = { kind: "separator" } | { kind: "tile"; tile: TickerTile };
const TICKER_PASS: TickerItem[] = [];
TICKER_ROTATIONS.forEach((rotation) => {
  if (!rotation.enabled) return;
  const tiles = rotation.tiles.filter((tile) => tile.enabled !== false);
  if (tiles.length === 0) return;
  TICKER_PASS.push({ kind: "separator" });
  tiles.forEach((tile) => TICKER_PASS.push({ kind: "tile", tile }));
});
const TICKER_TILE_COUNT = TICKER_PASS.filter(
  (item) => item.kind === "tile",
).length;

// The moving track is two identical halves (w-max); sliding it left by 50%
// of its own width lands the second half exactly where the first started,
// so the loop has no jump (requirement 5). Each half must be wider than the
// browser window or a blank gap would show, so if tiles are switched off
// until fewer than TICKER_MIN_TILES_PER_HALF remain, the pass is repeated
// inside each half to make up the width. With all four rotations on there
// are 33 tiles and no repeat is needed.
const TICKER_MIN_TILES_PER_HALF = 24;
const TICKER_REPEATS = Math.max(
  1,
  Math.ceil(TICKER_MIN_TILES_PER_HALF / Math.max(1, TICKER_TILE_COUNT)),
);
const TICKER_HALF: TickerItem[] = Array.from(
  { length: TICKER_REPEATS * TICKER_PASS.length },
  (_, i) => TICKER_PASS[i % TICKER_PASS.length],
);

// Speed. Tiles are now as wide as their text, so the pace is set per tile
// rather than per pixel: TICKER_SECONDS_PER_TILE is how long each tile takes
// to pass a fixed point. 8 keeps roughly the pace of the previous banner.
// Lower it to speed the ticker up; the total loop time follows the number
// of tiles automatically, so adding or removing tiles never changes pace.
const TICKER_SECONDS_PER_TILE = 8;
const TICKER_LOOP_SECONDS =
  TICKER_REPEATS * TICKER_TILE_COUNT * TICKER_SECONDS_PER_TILE;

// Motion rules (requirement 4): continuous linear scroll, no easing or
// attention effects; PAUSES while the pointer is over the ticker or a tile
// has keyboard focus; and for visitors whose device asks for reduced
// motion the animation is switched off entirely, the duplicate half is
// hidden, and the strip becomes a still row they can scroll sideways.
const TICKER_CSS = `
@keyframes hatfield-ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.hatfield-ticker-track { animation: hatfield-ticker-scroll ${TICKER_LOOP_SECONDS}s linear infinite; }
.hatfield-ticker:hover .hatfield-ticker-track,
.hatfield-ticker:focus-within .hatfield-ticker-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hatfield-ticker { overflow-x: auto; }
  .hatfield-ticker-track { animation: none; }
  .hatfield-ticker-duplicate { display: none; }
}
`;

const Index = () => {
  const features = [
    {
      title: "AI-Powered Intelligence",
      description:
        "Third-party normalization and corporate hierarchy mapping with intelligent entity resolution",
    },
    {
      title: "Automated Screening",
      description:
        "Integrated OFAC screening and automated financial viability assessments using Piotroski F-Score",
    },
    {
      title: "Dynamic Risk Assessment",
      description:
        "Configurable risk tolerance thresholds with intelligent reuse of prior due diligence",
    },
    {
      title: "Smart Contracts",
      description:
        "Auto-populated contract templates with risk and engagement data",
    },
    {
      title: "Flexible Integration",
      description:
        "Rapid systems integration using hub-and-spoke architecture with sophisticated reporting",
    },
    {
      title: "Process Automation",
      description:
        "Eliminate redundant processing with 70% reduction in assessment overhead",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      {/* 2026-09-22 (Frank): hero moved up one line. Top padding reduced
          from pt-32 (128px) to pt-24 (96px) — 32px, which is one line of
          the hero body text (text-xl, leading-relaxed = ~32.5px). The
          heading and everything below it in the hero rise together; no
          other spacing, text or layout changed.
          2026-10-01 (Frank, option B): the hero is now a two-column split
          on desktop (lg, 1024px+ windows) so that it and the scrolling
          banner below fit in one screen. Left column: headline, opening
          sentence, the "Together..." line and the four actions. Right
          column: the 3D logo with the NEXUS and SIGNAL paragraphs as two
          panels beneath it. Every word of the copy and every button is
          unchanged; only their arrangement and sizes changed. Bottom
          padding drops from pb-20 to pb-10; pt-24 is kept.
          The grid has three blocks. On desktop blocks 1 and 3 stack in the
          left column and block 2 spans the right column. On tablet and
          phone they simply stack in reading order 1, 2, 3 — headline and
          opening sentence, then logo + NEXUS + SIGNAL, then "Together..."
          and the buttons — the same order the page read in before.
          2026-10-01 (rev 2, Frank): "the home page should be sized so you
          don't see beyond the scrolling banner". The hero and the banner
          are now wrapped in one first-screen block that is exactly as tall
          as the browser window (min-h-screen = 100% of the window height).
          The banner keeps its natural height at the bottom of that block
          and the hero stretches (flex-1) to fill everything above it, with
          its content centred vertically in the space, so the bottom edge
          of the banner sits on the bottom edge of the window and Platform
          Capabilities only appears once the visitor scrolls. This works
          because the Navigation bar floats over the top of the hero rather
          than taking up its own row (that is what pt-24 has always made
          room for). If the window is too short to hold the hero and the
          banner, the block grows past the window instead of cutting
          anything off, so nothing is ever clipped.
          Also rev 2: "third-party" in the headline can no longer split
          across two lines (it was breaking as "third-" / "party"). */}
      <div className="min-h-screen flex flex-col">
        <section
          className="relative pt-24 pb-10 overflow-hidden flex-1 flex items-center"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
              {/* Block 1: headline + opening sentence (left column, top) */}
              <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-tight mb-5">
                  AI-powered{" "}
                  <span className="whitespace-nowrap">third-party</span>{" "}
                  risk&nbsp;management
                </h1>

                {/* 2026-09-19 (Frank): hero copy replaced. The old three
                    paragraphs (secure TPRM platform / developed as a prototype /
                    inviting beta clients) now describe the two products, NEXUS
                    and SIGNAL. 2026-09-19 (rev 2, Frank): the product names
                    that open the NEXUS and SIGNAL paragraphs are bold
                    (<strong>) so each paragraph leads with its product, same
                    colour and size as the sentence around them.
                    2026-10-01 (option B): body copy is text-lg (was
                    text-lg/md:text-xl) so the hero is short enough to share
                    the screen with the banner. */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hatfield.ai brings third-party risk management and real-world
                  risk intelligence together on one AI-native platform.
                </p>
              </div>

              {/* Block 2: logo + NEXUS and SIGNAL panels (right column) */}
              <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center flex flex-col gap-4">
                {/* 2026-10-01 (rev 3, Frank): logo made more prominent.
                    Desktop width goes from w-36 (144px) to w-56 (224px),
                    about one and a half times the size; phone and tablet
                    go from w-32/w-40 to w-40/w-48. Position is unchanged
                    (right-aligned above the NEXUS panel on desktop, centred
                    on phone and tablet).
                    2026-10-01 (rev 5, Frank): "center h logo over nexus and
                    signal boxes and increase size". The logo is now centred
                    above the two panels at every screen size (the desktop
                    right-alignment, lg:justify-end, is removed) and grows
                    again: desktop w-56 (224px) to w-72 (288px), twice the
                    original 144px; phone and tablet w-40/w-48 to
                    w-44/w-52.
                    2026-10-01 (rev 6, Frank): "slightly bigger". One step
                    up at every size: desktop w-72 (288px) to w-80 (320px),
                    about 11% larger; phone and tablet w-44/w-52 to
                    w-48/w-56. Still centred above the two panels. */}
                <div className="flex justify-center">
                  <img
                    src={hero3dLogo}
                    alt="Hatfield 3D Logo"
                    className="w-48 sm:w-56 lg:w-80 h-auto object-contain"
                  />
                </div>

                <p className="rounded-lg border border-white/20 bg-white/5 p-5 text-base text-muted-foreground leading-relaxed">
                  <strong className="font-bold">NEXUS</strong> provides the
                  operating system for third-party risk —
                  managing the entire lifecycle from intake and legal-entity
                  resolution through contracting, risk assessment, operational
                  resilience, regulatory compliance and reporting.
                </p>

                <p className="rounded-lg border border-white/20 bg-white/5 p-5 text-base text-muted-foreground leading-relaxed">
                  <strong className="font-bold">SIGNAL</strong> provides the
                  intelligence layer — continuously monitoring
                  the companies that matter across financial health,
                  cybersecurity, sanctions, litigation, regulatory developments,
                  corporate actions, adverse media, geographic risk and other
                  emerging threats.
                </p>
              </div>

              {/* Block 3: "Together..." line + actions (left column, bottom) */}
              <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
                <p className="text-lg lg:text-xl text-foreground font-semibold mb-6 leading-relaxed">
                  Together, NEXUS and SIGNAL give organizations a connected view
                  of third-party risk — assess what you know, monitor what
                  changes, and act on what matters.
                </p>

                {/* Primary Actions + SIGNAL Introduction */}
                {/* 2026-09-19 (rev 2, Frank): order is Explore Capabilities,
                    Introducing SIGNAL, Hatfield.ai Introduction, Hatfield.ai
                    Commercial (renamed from Nexus Commercial, rev 3).
                    2026-10-01 (option B): the row now lives in the left half
                    of the hero, which is too narrow for four in a line, so
                    the old xl:flex-nowrap is removed and the row wraps: on
                    desktop Explore Capabilities + Introducing SIGNAL sit on
                    the first line and the two video buttons on the second.
                    Order, labels, sizes and behaviour are unchanged. On a
                    phone the four still stack one per line. */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
                  <Button
                    size="lg"
                    className="text-base px-6 whitespace-nowrap"
                    onClick={() => {
                      document
                        .getElementById("capabilities")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Explore Capabilities <ArrowRight className="ml-2" size={18} />
                  </Button>

                  {/* SIGNAL Product Introduction */}
                  {/* 2026-09-19 (rev 2): moved from last place to second,
                      directly after Explore Capabilities. Dividers on both
                      sides set it apart from the buttons around it. */}
                  <a
                    href="/signal"
                    className="group flex items-center gap-3 py-2 transition-opacity duration-300 hover:opacity-80"
                    aria-label="Introducing SIGNAL — Hatfield.ai Real-Time Surveillance"
                  >
                    <span className="hidden sm:block h-9 w-px bg-white/30" />

                    <span className="flex flex-col text-left">
                      <span className="text-xs uppercase tracking-[0.18em] font-semibold text-accent">
                        Introducing SIGNAL
                      </span>

                      <span className="text-sm text-foreground font-medium whitespace-nowrap">
                        Hatfield.ai Real-Time Surveillance
                        <ArrowRight
                          className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1"
                          size={16}
                        />
                      </span>
                    </span>

                    <span className="hidden sm:block h-9 w-px bg-white/30" />
                  </a>

                  {/* 2026-09-19: label renamed from "Watch Introduction" to
                      "Hatfield.ai Introduction" (Frank). Video unchanged.
                      2026-09-22 (Frank): the video now starts playing by itself
                      as soon as the button is clicked, always from 0:00. The
                      embed URL carries autoplay=1 (play on load) and start=0
                      (begin at the start). The iframe's allow list already
                      includes "autoplay", which the browser requires before an
                      embedded player may start on its own. The dialog removes
                      the iframe when it closes, so every click loads a fresh
                      player from the beginning; closing the dialog stops the
                      video. */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="text-base px-6 whitespace-nowrap"
                      >
                        <Play className="mr-2" size={18} />
                        Hatfield.ai Introduction
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl w-full p-0 bg-card">
                      <div className="aspect-video w-full">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/l_w4UKB8KWQ?autoplay=1&start=0"
                          title="Hatfield.ai Platform Demo"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* 2026-09-19: Commercial button (Frank), last in the row
                      after Hatfield.ai Introduction. Same secondary style and
                      modal pattern as the introduction button. The <video>
                      only mounts while the dialog is open, so closing the
                      dialog stops playback and the page does not download the
                      video until someone clicks.
                      2026-09-19 (rev 3, Frank): label renamed from "Nexus
                      Commercial" to "Hatfield.ai Commercial", matching the
                      "Hatfield.ai Introduction" button beside it. The video's
                      title attribute and the no-video fallback link text were
                      renamed with it so no "Nexus Commercial" wording is left
                      anywhere a visitor or screen reader can see it. Video
                      file unchanged. */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="text-base px-6 whitespace-nowrap"
                      >
                        <Play className="mr-2" size={18} />
                        Hatfield.ai Commercial
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl w-full p-0 bg-card">
                      <div className="aspect-video w-full">
                        <video
                          src={NEXUS_COMMERCIAL_SRC}
                          title="Hatfield.ai Commercial"
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="w-full h-full rounded-lg bg-black"
                        >
                          Your browser can't play this video.{" "}
                          <a href={NEXUS_COMMERCIAL_SRC}>Download the Hatfield.ai Commercial</a>.
                        </video>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Homepage Ticker (was "Key Stats Section") */}
        {/* 2026-10-01 (Frank, option B): a slim band directly under the hero
            so both are visible on one screen; scrolls endlessly, right to
            left, the full width of the page (rev 2); no heading above it
            and minimal padding (rev 4).
            2026-10-01 (rev 7, Frank): rebuilt to the Homepage Ticker
            Requirements document. What a visitor sees:
            - Four rotations in order: NEXUS, SIGNAL, Capabilities, Why
              Hatfield. Every tile is an uppercase headline with a one-line
              value statement beneath it (wording: TICKER_ROTATIONS at the
              top of the file).
            - Product anchor tiles (NEXUS, SIGNAL, HATFIELD.AI) keep the
              dark navy treatment and are links; capability tiles keep the
              existing lighter treatment and are not clickable.
            - Tiles are now as wide as their text instead of a fixed 240px,
              so no headline or value line wraps on tablet or desktop. On a
              phone a tile is capped at 80% of the screen width and its text
              may wrap, which shows fewer tiles at full-size type rather
              than shrinking the type.
            - A thin vertical line separates one rotation from the next.
            - Band height is unchanged (h-24 tiles, py-3), same palette.
            - The ticker pauses on hover and on keyboard focus and honours
              the reduced-motion setting (rules: TICKER_CSS).
            - The track is rendered twice for the seamless loop; the second
              copy is hidden from screen readers and its links are skipped
              by the Tab key, so nothing is announced or focused twice. */}
        {TICKER_TILE_COUNT > 0 && (
          <section data-stat-section className="bg-white py-3">
            <style>{TICKER_CSS}</style>

            <div className="hatfield-ticker relative overflow-hidden">
              <div className="hatfield-ticker-track flex w-max">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className={
                      "flex items-center gap-4 pr-4 flex-shrink-0" +
                      (copy === 1 ? " hatfield-ticker-duplicate" : "")
                    }
                    aria-hidden={copy === 1}
                  >
                    {TICKER_HALF.map((item, itemIndex) => {
                      if (item.kind === "separator") {
                        return (
                          <span
                            key={itemIndex}
                            aria-hidden="true"
                            className="h-12 w-px flex-shrink-0 bg-[hsl(215,25%,75%)]"
                          />
                        );
                      }

                      const tile = item.tile;
                      const tileClassName =
                        "h-24 px-6 rounded-lg flex flex-col justify-center flex-shrink-0 max-w-[80vw] sm:max-w-none " +
                        (tile.anchor
                          ? "bg-[hsl(215,45%,15%)] text-white"
                          : "bg-[hsl(215,25%,75%)] text-[hsl(215,45%,15%)] border border-gray-300");
                      const tileBody = (
                        <>
                          <span
                            className={
                              "block font-bold uppercase leading-tight sm:whitespace-nowrap " +
                              (tile.anchor
                                ? "text-xl tracking-[0.18em]"
                                : "text-base tracking-[0.08em]")
                            }
                          >
                            {tile.headline}
                          </span>
                          <span
                            className={
                              "block mt-1.5 text-sm font-medium leading-snug sm:whitespace-nowrap " +
                              (tile.anchor ? "text-white/80" : "")
                            }
                          >
                            {tile.value}
                          </span>
                        </>
                      );

                      return tile.href ? (
                        <a
                          key={itemIndex}
                          href={tile.href}
                          tabIndex={copy === 1 ? -1 : undefined}
                          className={
                            tileClassName +
                            " transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(215,65%,48%)]"
                          }
                        >
                          {tileBody}
                        </a>
                      ) : (
                        <div key={itemIndex} className={tileClassName}>
                          {tileBody}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Features Section */}
      <section
        id="capabilities"
        className="py-20 relative"
        style={{ background: "var(--gradient-capabilities)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-4">
                Platform Capabilities
              </h2>

              <p className="text-xl text-muted-foreground">
                Comprehensive tools to manage, monitor, and mitigate third-party
                risks at scale
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>

                    <p className="text-lg text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Processing Intelligence Section */}
      <section
        data-light-section
        className="pt-20 pb-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(215 20% 90%) 0%, hsl(215 25% 92%) 35%, hsl(215 28% 88%) 70%, hsl(215 30% 85%) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-[hsl(215,45%,15%)] mb-6">
              Processing Intelligence
            </h2>

            <p className="text-xl text-[hsl(215,45%,25%)] max-w-5xl mx-auto leading-relaxed">
              Harnessing AI-driven automation and adaptive agenticAI frameworks
              to orchestrate intelligent workflows, enabling continuous risk
              sensing, dynamic assessment, and autonomous decision-making
              across the TPRM lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Real-Time Risk Sensing */}
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[hsl(215,45%,15%)] mb-6">
                Real-Time Risk Sensing
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Cybersecurity threat intelligence</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Social media sentiment analysis</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Negative news and reputational alerts</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Litigation tracking</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Corporate action and M&A alerts</span>
                </li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[hsl(215,45%,15%)] mb-6">
                Advanced Analytics
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>AI-powered risk analytics</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Next-generation reporting</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>SLA tracking and governance</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>ESG risk integration</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Automated incident management</span>
                </li>
              </ul>
            </div>

            {/* Platform Evolution */}
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[hsl(215,45%,15%)] mb-6">
                Platform Evolution
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Smart contract lifecycle management</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Third-party collaboration portal</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Risk event detection</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Continuous monitoring</span>
                </li>

                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Predictive risk modeling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="pt-12 pb-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 45% 25%) 0%, hsl(220 48% 18%) 50%, hsl(220 50% 8%) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Button asChild size="lg" variant="default" className="text-lg">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;