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

// 2026-10-01 (Frank, option B): the four stat cards of the scrolling
// "Introducing Hatfield.ai" banner, defined ONCE. The banner renders this
// list twice, back to back, to make the endless loop; before today the
// eight cards were written out by hand as two copies of the same markup.
// Wording and order are unchanged.
const STAT_CARDS = [
  { value: "100%", label: "Audit Ready" },
  { value: "~3X", label: "Reduction in redundant processing" },
  { value: "70%", label: "Reduction in risk assessment overhead" },
  { value: "SLA", label: "Track days outstanding & performance" },
];

// 2026-10-01 (Frank, option B): the banner's own scroll animation. The
// moving track is exactly two identical sets of cards wide (w-max), so
// sliding it left by 50% of its own width lands the second set precisely
// where the first one started and the loop has no visible jump, whatever
// the card size. It is defined here, next to the banner, rather than
// reusing the old "animate-scroll-infinite" class, because that class is
// defined outside this file and its distance could not be confirmed to
// still match once the cards got smaller.
// 2026-10-01 (rev 2, Frank): the banner now scrolls the full width of the
// page. One set of four cards is only 1024px wide, narrower than a desktop
// window, so on its own it would leave a blank gap at the right before the
// loop restarted. Each half of the track therefore repeats the four cards
// STAT_REPEATS times (4 x 1024px = 4096px, wider than any normal monitor),
// which keeps cards on screen edge to edge at every moment of the loop.
// STAT_SCROLL_SECONDS is the time for one half to pass; it went from 30 to
// 120 because the half is now four times as long, so the cards move at the
// same pace as before. Lower the number to speed the banner up.
const STAT_REPEATS = 4;
const STAT_LOOP_CARDS = Array.from(
  { length: STAT_REPEATS * STAT_CARDS.length },
  (_, i) => STAT_CARDS[i % STAT_CARDS.length],
);
const STAT_SCROLL_SECONDS = 120;
const STAT_SCROLL_KEYFRAMES =
  "@keyframes hatfield-stat-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }";

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
                <div className="flex justify-center lg:justify-end">
                  <img
                    src={hero3dLogo}
                    alt="Hatfield 3D Logo"
                    className="w-32 sm:w-40 lg:w-36 h-auto object-contain"
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

        {/* Key Stats Section */}
        {/* 2026-10-01 (Frank, option B): the banner is a slim band that sits
            directly under the hero so both are visible on one screen.
            - Title is "Introducing Hatfield.ai" (was "Introducing Hatfield.").
            - The cards STILL SCROLL, endlessly, right to left. They are
              smaller (w-60 x 6.5rem, was w-80 x h-72) with the same colours,
              border and wording.
            - The cards come from STAT_CARDS (repeated into STAT_LOOP_CARDS,
              see the top of the file) and the track is rendered twice; the
              second copy is hidden from screen readers.
            2026-10-01 (rev 2, Frank): the title is back ABOVE the cards,
            centred, at every screen size (rev 1 pinned it at the left on
            desktop), and the cards scroll the FULL width of the page, edge
            to edge, as they did originally. The left-side title column and
            its alignment padding are removed. */}
        <section data-stat-section className="bg-white overflow-hidden py-5">
          <style>{STAT_SCROLL_KEYFRAMES}</style>

          <p className="px-4 mb-4 text-3xl lg:text-4xl font-bold text-[hsl(215,45%,15%)] leading-tight text-center">
            Introducing Hatfield.ai
          </p>

          <div className="relative overflow-hidden">
            <div
              className="flex w-max"
              style={{
                animation: `hatfield-stat-scroll ${STAT_SCROLL_SECONDS}s linear infinite`,
              }}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex gap-4 pr-4 flex-shrink-0"
                  aria-hidden={copy === 1}
                >
                  {STAT_LOOP_CARDS.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="bg-[hsl(215,25%,75%)] px-6 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-60 h-[6.5rem] flex flex-col justify-center"
                    >
                      <div className="text-4xl font-bold leading-none mb-2">
                        {card.value}
                      </div>
                      <div className="text-sm font-medium leading-snug">
                        {card.label}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
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