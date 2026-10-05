import { useEffect, useMemo, useRef, useState } from "react";
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

// 2026-10-02 (rev 11, Frank): "add pdf icons to nexus and signal boxes and
// link to revised pdf docs for each if either box is clicked on". The two
// product overviews are served as static files from public/docs/, the same
// way the commercial video is served from public/videos/. The files must be
// placed there under exactly these names:
//   public/docs/Hatfield_NEXUS.pdf
//   public/docs/Hatfield_SIGNAL.pdf
// To publish a revised PDF, replace the file and keep the name.
const NEXUS_PDF_SRC = "/docs/Hatfield_NEXUS.pdf";
const SIGNAL_PDF_SRC = "/docs/Hatfield_SIGNAL.pdf";

// 2026-10-02 (rev 16, Frank): "a it is". The PDF icon on the NEXUS and
// SIGNAL boxes is now option A: a WHITE page with a folded corner and a
// small RED label reading "PDF" across it, the familiar red-and-white file
// icon. It replaces the plain white outline of rev 15 (and the all-red badge
// of rev 13 before it). It is drawn here as an inline SVG, so there is no
// image file to add. It is a generic file icon: it deliberately does NOT
// include Adobe's Acrobat swirl, which is Adobe's trademark.
const PdfIcon = () => (
  <svg
    viewBox="0 0 34 42"
    width="36"
    height="44"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 1h16l10 10v27a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3z"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="1"
    />
    <path d="M21 1l10 10h-7a3 3 0 0 1-3-3V1z" fill="#E2E8F0" />
    <rect x="0" y="21" width="26" height="13" rx="2" fill="#D92D20" />
    <text
      x="13"
      y="31"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="9"
      fontWeight="700"
      fill="#FFFFFF"
    >
      PDF
    </text>
  </svg>
);

// ---------------------------------------------------------------------------
// HOMEPAGE TICKER CONTENT
// 2026-10-02 (rev 20, Frank): "can we have signal/nexus deep blue heading
// box plus 3 equally sized content boxes slide in and then morph in and then
// slide and then morph" / "okay option a".
//
// The ticker is now a set of FRAMES. A frame is the deep blue NEXUS or
// SIGNAL heading box followed by three content boxes of equal width, filling
// the page width exactly, so nothing is cut off at the edge.
//
// Content is organised as four VISITS, alternating NEXUS, SIGNAL, NEXUS,
// SIGNAL. Each visit has exactly SIX content boxes, shown three at a time:
//   - when the product changes, the whole frame SLIDES out and the next
//     product's frame slides in;
//   - when the product stays the same, the heading box stays where it is
//     and the three content boxes MORPH (fade) into the next three.
// So a loop reads: NEXUS slides in, morphs; SIGNAL slides in, morphs; NEXUS
// slides in, morphs; SIGNAL slides in, morphs; then round again. Eight
// frames, about 45 seconds.
//
// Option A content changes (Frank, 2026-10-02), to give 12 NEXUS and 12
// SIGNAL boxes:
//   - REMOVED from NEXUS: "Stop managing third-party risk in pieces" (its
//     point is made by "Connected. Not stitched.") and "The relationship
//     changes". Both remain in the NEXUS PDF.
//   - ADDED to SIGNAL: "Built by a practitioner".
//   - REMOVED: the closing Hatfield.ai tile, which has no place in a
//     heading-plus-three layout.
// All other wording is unchanged from rev 10 and matches the final NEXUS
// and SIGNAL PDFs. The four original homepage stats remain without
// percentages ("Eliminate redundant processing", "Reduce assessment
// overhead", "Audit ready", "SLA tracking").
//
// EVERYTHING the ticker says is in TICKER_VISITS below and nowhere else.
//   - Edit a box:   change its headline or value text.
//   - Reorder:      move a box's line within its visit, or move a visit.
//   - Keep SIX boxes in every visit. With a different number the last frame
//     of that visit would show fewer than three boxes.
//   - The heading box wording and link are in NEXUS_HEADING and
//     SIGNAL_HEADING, defined once and reused.
//
// Content governance: no percentage, ranking, source count or list count
// appears in the ticker. The only figure is the three named
// financial-health models.
//
// Links: only the deep blue heading boxes are links. SIGNAL goes to
// /signal, the same address the hero's "Introducing SIGNAL" link uses.
// NEXUS goes to /contact (the "Book a briefing" destination used on the
// NEXUS PDF) because there is no dedicated NEXUS page.
// Punctuation: apostrophes are typographic, matching the rest of this page.
// ---------------------------------------------------------------------------
type TickerProduct = "NEXUS" | "SIGNAL";
type TickerHeading = { headline: TickerProduct; value: string; href: string };
type TickerBox = { headline: string; value: string };
type TickerVisit = { heading: TickerHeading; boxes: TickerBox[] };

const NEXUS_HEADING: TickerHeading = {
  headline: "NEXUS",
  value: "The operating system for third-party risk.",
  href: "/contact",
};
const SIGNAL_HEADING: TickerHeading = {
  headline: "SIGNAL",
  value: "Your GPS for business decisions.",
  href: "/signal",
};

const TICKER_VISITS: TickerVisit[] = [
  {
    heading: NEXUS_HEADING,
    boxes: [
      { headline: "Connected. Not stitched.", value: "You don’t have a third-party problem. You have a fragmentation problem." },
      { headline: "One authoritative identity", value: "Every third party resolves to one legal entity." },
      { headline: "Eliminate redundant processing", value: "Onboard once. Assess once." },
      { headline: "Reduce assessment overhead", value: "Valid prior assessments and evidence are reused, not repeated." },
      { headline: "Contract right", value: "Reviewed by two AI models and mapped to the regulators that govern you." },
      { headline: "Watch always", value: "SIGNAL built in. One register entry per issue, not hundreds of alerts." },
    ],
  },
  {
    heading: SIGNAL_HEADING,
    boxes: [
      { headline: "The signal is already there", value: "Know before risk alerts become your news headline." },
      { headline: "Signal. Not noise.", value: "You don’t have an information problem. You have a signal problem." },
      { headline: "The company is the story", value: "SIGNAL sees the whole picture." },
      { headline: "Know what changed", value: "Financials, cyber, sanctions, litigation, regulation and supply chain." },
      { headline: "Know what matters", value: "Tested for materiality and consolidated into one event." },
      { headline: "Know where to act", value: "Severity-ranked and summed up in one daily brief." },
    ],
  },
  {
    heading: NEXUS_HEADING,
    boxes: [
      { headline: "AI automates. You decide.", value: "AI proposes. Logic verifies. Your people decide." },
      { headline: "Audit ready", value: "Every decision on the record." },
      { headline: "SLA tracking", value: "Days outstanding and performance, by domain and team." },
      { headline: "The examiner arrives", value: "Eight regulatory reports on demand." },
      { headline: "Built to replace, not to add", value: "One platform. No suite to buy. No per-vendor data fees." },
      { headline: "Your risk appetite, not ours", value: "Settings your administrators change on screen. No code." },
    ],
  },
  {
    heading: SIGNAL_HEADING,
    boxes: [
      { headline: "Three financial-health models", value: "Piotroski F-Score, Altman Z-Score, Merton." },
      { headline: "Are we watching the right company?", value: "Every name resolved to its registered legal entity." },
      { headline: "Not separate feeds", value: "One intelligence picture." },
      { headline: "A thirteenth question? Ask SIGNAL.", value: "Answers from your own portfolio evidence." },
      { headline: "10 users or 1,000. One price.", value: "Priced for the portfolio, not the person." },
      { headline: "Built by a practitioner", value: "Designed around how the work actually gets done." },
    ],
  },
];

// ---------------------------------------------------------------------------
// HOMEPAGE TICKER MECHANICS (no wording below this line)
//
// History, briefly: revs 9 to 18 tried to make a continuous crawl of small
// text look smooth and could not (tests on 2026-10-02 showed the movement
// was steady and the strip's width was not the cause; small sharp text
// simply looks jerky while sliding slowly). Rev 19 replaced the crawl with
// "rest, then glide one tile". Rev 20 replaces that with frames.
//
// How it works now:
//   - A frame RESTS, perfectly still, for TICKER_REST_MS. Text at rest is
//     drawn sharp.
//   - Then it changes to the next frame, taking TICKER_CHANGE_MS: a SLIDE
//     if the product changes, a MORPH (fade) if it does not.
//   - Hovering over the ticker, or tabbing into it, holds the current frame.
//   - Reduced-motion setting: frames still change, but instantly, with no
//     slide or fade.
//   - How many content boxes a frame holds depends on the window width, so
//     the text always fits: three on a desktop window (1280px and wider),
//     two on a small laptop or tablet (768px to 1279px), one on a phone,
//     where the heading box sits above the content box. The six boxes of a
//     visit are simply dealt out three, two or one at a time.
//   - Tiles are 112px tall (h-28; 96px before) so a value line can wrap to
//     two lines inside an equal-width box.
//   - Two frames are drawn during a change: the outgoing one and the
//     incoming one. The outgoing one is hidden from screen readers and its
//     link is skipped by the Tab key.
// To tune: TICKER_REST_MS is how long a frame stays (5 seconds);
// TICKER_CHANGE_MS is how long a slide or morph takes (0.7 seconds).
// ---------------------------------------------------------------------------
const TICKER_REST_MS = 5000;
const TICKER_CHANGE_MS = 700;

type TickerFrame = { heading: TickerHeading; boxes: TickerBox[] };

const buildTickerFrames = (boxesPerFrame: number): TickerFrame[] => {
  const frames: TickerFrame[] = [];
  TICKER_VISITS.forEach((visit) => {
    for (let i = 0; i < visit.boxes.length; i += boxesPerFrame) {
      frames.push({
        heading: visit.heading,
        boxes: visit.boxes.slice(i, i + boxesPerFrame),
      });
    }
  });
  return frames;
};

const pickBoxesPerFrame = () =>
  window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1;

const TICKER_CSS = `
@keyframes hatfield-frame-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes hatfield-frame-slide-out { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes hatfield-frame-fade-in { from { opacity: 0; } to { opacity: 1; } }
.hatfield-frame-slide-in { animation: hatfield-frame-slide-in ${TICKER_CHANGE_MS}ms cubic-bezier(0.4, 0, 0.2, 1) both; }
.hatfield-frame-slide-out { animation: hatfield-frame-slide-out ${TICKER_CHANGE_MS}ms cubic-bezier(0.4, 0, 0.2, 1) both; }
.hatfield-frame-morph-in { animation: hatfield-frame-fade-in ${TICKER_CHANGE_MS}ms ease both; }
@media (prefers-reduced-motion: reduce) {
  .hatfield-frame-slide-in, .hatfield-frame-morph-in { animation: none; }
  .hatfield-frame-slide-out { animation: none; visibility: hidden; }
}
`;

type TickerView = {
  current: number;
  previous: number | null;
  mode: "none" | "slide" | "morph";
};

const HomepageTicker = () => {
  const [boxesPerFrame, setBoxesPerFrame] = useState(3);
  const [view, setView] = useState<TickerView>({
    current: 0,
    previous: null,
    mode: "none",
  });
  const heldRef = useRef({ hover: false, focus: false });

  // Three, two or one content boxes per frame, following the window width.
  useEffect(() => {
    const apply = () => setBoxesPerFrame(pickBoxesPerFrame());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const frames = useMemo(
    () => buildTickerFrames(boxesPerFrame),
    [boxesPerFrame],
  );

  // A different number of boxes per frame means a different set of frames,
  // so start again from the first one.
  useEffect(() => {
    setView({ current: 0, previous: null, mode: "none" });
  }, [boxesPerFrame]);

  // Rest, then change. This runs once per frame change, not per animation
  // frame; the slide and the morph themselves are CSS animations.
  useEffect(() => {
    if (frames.length < 2) return;
    const timer = window.setInterval(() => {
      if (heldRef.current.hover || heldRef.current.focus) return;
      setView((v) => {
        const from = v.current % frames.length;
        const next = (from + 1) % frames.length;
        const productChanges =
          frames[next].heading.headline !== frames[from].heading.headline;
        return {
          current: next,
          previous: from,
          mode: productChanges ? "slide" : "morph",
        };
      });
    }, TICKER_REST_MS + TICKER_CHANGE_MS);
    return () => window.clearInterval(timer);
  }, [frames]);

  const renderFrame = (frameIndex: number, role: "current" | "previous") => {
    const frame = frames[frameIndex % frames.length];
    const isCurrent = role === "current";
    const animationClass = isCurrent
      ? view.mode === "slide"
        ? " hatfield-frame-slide-in"
        : view.mode === "morph"
          ? " hatfield-frame-morph-in"
          : ""
      : view.mode === "slide"
        ? " hatfield-frame-slide-out"
        : "";

    return (
      <div
        key={`${role}-${frameIndex}`}
        aria-hidden={!isCurrent}
        className={
          "absolute inset-0 flex flex-col md:flex-row gap-3 md:gap-4 px-4 bg-white" +
          animationClass
        }
      >
        <a
          href={frame.heading.href}
          tabIndex={isCurrent ? undefined : -1}
          className="h-20 md:h-28 md:w-56 xl:w-72 flex-shrink-0 px-6 rounded-lg flex flex-col justify-center bg-[hsl(215,45%,15%)] text-white transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(215,65%,48%)]"
        >
          <span className="block font-bold uppercase leading-tight text-xl tracking-[0.18em]">
            {frame.heading.headline}
          </span>
          <span className="block mt-1.5 text-sm font-medium leading-snug text-white/80">
            {frame.heading.value}
          </span>
        </a>

        {frame.boxes.map((box, boxIndex) => (
          <div
            key={boxIndex}
            className="h-28 flex-1 basis-0 min-w-0 overflow-hidden px-6 rounded-lg flex flex-col justify-center bg-[hsl(215,25%,75%)] text-[hsl(215,45%,15%)] border border-gray-300"
          >
            <span className="block mb-1 text-[10px] font-semibold uppercase leading-none tracking-[0.18em] opacity-70">
              {frame.heading.headline}
            </span>
            <span className="block font-bold uppercase leading-tight text-sm xl:text-base tracking-[0.08em]">
              {box.headline}
            </span>
            <span className="block mt-1.5 text-xs xl:text-sm font-medium leading-snug">
              {box.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const current = view.current % frames.length;
  const previous =
    view.previous === null ? null : view.previous % frames.length;

  return (
    <section
      data-stat-section
      aria-label="NEXUS and SIGNAL highlights"
      className="bg-white py-3"
    >
      <style>{TICKER_CSS}</style>

      {/* Height: on a phone the heading box (80px) sits above the content
          box (112px) with a 12px gap = 204px; from tablet up it is one row
          of 112px. */}
      <div
        className="relative overflow-hidden h-[12.75rem] md:h-28"
        onMouseEnter={() => {
          heldRef.current.hover = true;
        }}
        onMouseLeave={() => {
          heldRef.current.hover = false;
        }}
        onFocus={() => {
          heldRef.current.focus = true;
        }}
        onBlur={() => {
          heldRef.current.focus = false;
        }}
      >
        {previous !== null &&
          previous !== current &&
          renderFrame(previous, "previous")}
        {renderFrame(current, "current")}
      </div>
    </section>
  );
};

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

                {/* 2026-10-02 (rev 11, Frank): the NEXUS and SIGNAL panels
                    are now links. Clicking anywhere on a panel opens that
                    product's three-page PDF in a new browser tab. The
                    wording, border, background, padding and text size of the
                    panels are unchanged; the panel brightens slightly on
                    hover and shows a focus outline for keyboard users. The
                    files come from public/docs/ (NEXUS_PDF_SRC and
                    SIGNAL_PDF_SRC at the top of this file).
                    2026-10-02 (rev 16, Frank): the icon at the right of each
                    panel is the white page with a red "PDF" label (PdfIcon,
                    top of this file). Panel size, copy, spacing and click
                    behaviour are unchanged. */}
                <a
                  href={NEXUS_PDF_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NEXUS overview, PDF, opens in a new tab"
                  className="group flex items-start gap-4 rounded-lg border border-white/20 bg-white/5 p-5 transition-colors duration-300 hover:bg-white/10 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="flex-1 text-base text-muted-foreground leading-relaxed">
                    <strong className="font-bold">NEXUS</strong> provides the
                    operating system for third-party risk —
                    managing the entire lifecycle from intake and legal-entity
                    resolution through contracting, risk assessment, operational
                    resilience, regulatory compliance and reporting.
                  </span>

                  <span className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <PdfIcon />
                  </span>
                </a>

                <a
                  href={SIGNAL_PDF_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SIGNAL overview, PDF, opens in a new tab"
                  className="group flex items-start gap-4 rounded-lg border border-white/20 bg-white/5 p-5 transition-colors duration-300 hover:bg-white/10 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="flex-1 text-base text-muted-foreground leading-relaxed">
                    <strong className="font-bold">SIGNAL</strong> provides the
                    intelligence layer — continuously monitoring
                    the companies that matter across financial health,
                    cybersecurity, sanctions, litigation, regulatory developments,
                    corporate actions, adverse media, geographic risk and other
                    emerging threats.
                  </span>

                  <span className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <PdfIcon />
                  </span>
                </a>
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
            so both are visible on one screen, the full width of the page.
            2026-10-02 (rev 20, Frank): frames. Each frame is the deep blue
            NEXUS or SIGNAL heading box with three equal content boxes,
            filling the width. A change of product slides; more of the same
            product morphs. The component, its wording (TICKER_VISITS) and
            its rules are defined above Index. The band is 16px taller than
            before (112px tiles) so a line can wrap inside an equal-width
            box; on a phone the heading box sits above one content box. */}
        <HomepageTicker />
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