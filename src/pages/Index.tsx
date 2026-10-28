import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// 2026-10-06 (Frank): DialogTitle and DialogDescription added to this import
// for the hidden pop-up titles (see the two video dialogs below). Both are
// exported by src/components/ui/dialog.tsx (checked 2026-10-06).
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JacarandaIcon from "@/components/JacarandaIcon";
import HoverBinaryLogo from "@/components/HoverBinaryLogo";
// 2026-10-19 (Frank): the PDF icon now lives in its own component so the
// NEXUS and SIGNAL product pages can use the same drawing (see
// src/components/PdfIcon.tsx). It was defined inline here from 2026-10-02
// (rev 16) until today; the drawing and the default size are unchanged.
import PdfIcon from "@/components/PdfIcon";
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
// 2026-10-28 (Frank): the button is now "Hatfield.ai NEXUS Commercial" and a
// second button, "Hatfield.ai SIGNAL Commercial", sits beside it. The SIGNAL
// video is served the same way from public/videos/ and must be placed there
// under exactly this name (lower-case, hyphen, no spaces — Vercel's servers
// are case-sensitive and a space would become %20 in the URL):
//   public/videos/signal-commercial.mp4
const NEXUS_COMMERCIAL_SRC = "/videos/nexus-commercial.mp4";
const SIGNAL_COMMERCIAL_SRC = "/videos/signal-commercial.mp4";

// 2026-10-02 (rev 11, Frank): "add pdf icons to nexus and signal boxes and
// link to revised pdf docs for each if either box is clicked on". The two
// product overviews are served as static files from public/docs/, the same
// way the commercial video is served from public/videos/. The files must be
// placed there under exactly these names:
//   public/docs/Hatfield.ai_NEXUS.pdf
//   public/docs/Hatfield.ai_SIGNAL.pdf
// To publish a revised PDF, replace the file and keep the name.
const NEXUS_PDF_SRC = "/docs/Hatfield.ai_NEXUS.pdf";
const SIGNAL_PDF_SRC = "/docs/Hatfield.ai_SIGNAL.pdf";

// 2026-10-19 (Frank): the three-page SIGNAL vs NEXUS comparison PDF, served
// from public/docs/ like the two product overviews, under the name already
// in the tree:
//   public/docs/Hatfield_SIGNAL_vs_NEXUS_Comparison.pdf
// The panel that links to it is in the Platform Capabilities section below.
const COMPARISON_PDF_SRC = "/docs/Hatfield_SIGNAL_vs_NEXUS_Comparison.pdf";

// 2026-10-02 (rev 16, Frank): "a it is". The PDF icon on the NEXUS and
// SIGNAL boxes is option A: a WHITE page with a folded corner and a small
// RED label reading "PDF" across it. 2026-10-19: the drawing moved to
// src/components/PdfIcon.tsx (imported above) so the product pages share it.

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
//   - The heading box wording and link are in NEXUS_HEADING,
//     SIGNAL_HEADING and GOVERNANCE_HEADING, defined once and reused.
//
// Content governance: no percentage, ranking, source count or list count
// appears in the ticker. The only figure is the three named
// financial-health models.
//
// Links: only the deep blue heading boxes are links. SIGNAL goes to
// /signal, the same address the hero's "Introducing SIGNAL" link uses.
// NEXUS went to /contact until 2026-10-19 because there was no dedicated
// NEXUS page; 2026-10-19 (Frank): it now goes to /nexus, the NEXUS product
// page (src/pages/Nexus.tsx), the same address the header NEXUS link and
// the email signature use.
// Punctuation: apostrophes are typographic, matching the rest of this page.
//
// 2026-10-13 (Frank, AI governance tranche, option A): AI governance is now
// a FIFTH visit, after the second SIGNAL visit: a deep blue "AI GOVERNANCE"
// heading box ("Intelligence without surrendering control.") linking to the
// new /about/ai-governance page, with SIX boxes, one per principle on that
// page (src/pages/AIGovernance.tsx). It replaces the slim governance band
// that briefly sat below the ticker; that band is removed. Product change
// GOVERNANCE -> NEXUS slides like any other. The loop is now ten frames on
// a desktop window, about 57 seconds (was eight, about 45).
// The governance boxes state principles in the same words as the
// governance page; they make no feature or percentage claim, in line with
// the content-governance rule above.
// ---------------------------------------------------------------------------
type TickerProduct = "NEXUS" | "SIGNAL" | "AI GOVERNANCE";
type TickerHeading = { headline: TickerProduct; value: string; href: string };
type TickerBox = { headline: string; value: string };
type TickerVisit = { heading: TickerHeading; boxes: TickerBox[] };

const NEXUS_HEADING: TickerHeading = {
  headline: "NEXUS",
  value: "The operating system for third-party risk.",
  href: "/nexus",
};
const SIGNAL_HEADING: TickerHeading = {
  headline: "SIGNAL",
  value: "Your GPS for business decisions.",
  href: "/signal",
};
// 2026-10-13: governance heading box. On a 768-1279px window the heading box
// is narrower, so "AI GOVERNANCE" may wrap onto two lines; the 112px box has
// room for that plus the two-line value below it.
const GOVERNANCE_HEADING: TickerHeading = {
  headline: "AI GOVERNANCE",
  value: "Intelligence without surrendering control.",
  href: "/about/ai-governance",
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
  {
    // 2026-10-13: one box per governance principle, in the order of the
    // six principles on /about/ai-governance.
    heading: GOVERNANCE_HEADING,
    boxes: [
      { headline: "Human accountability", value: "Material risk decisions remain with your people." },
      { headline: "Transparent and traceable", value: "AI insight kept distinct from verified source evidence." },
      { headline: "Controlled AI authority", value: "Defined permissions. Autonomy is not accountability." },
      { headline: "Security built in", value: "Data protection across the whole AI lifecycle." },
      { headline: "Resilient by design", value: "Prepared for failure, compromise and the unexpected." },
      { headline: "Always improving", value: "Tested and reviewed as models and threats change." },
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
          className="h-20 md:h-28 md:w-56 xl:w-72 flex-shrink-0 px-6 rounded-lg flex flex-col