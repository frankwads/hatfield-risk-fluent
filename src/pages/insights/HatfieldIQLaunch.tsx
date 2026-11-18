import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductName from "@/components/ProductName";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/lib/usePageMeta";

// This file is kept to plain ASCII (same rule as the other Insights pages,
// 2026-10-13, "weird question marks"). Typographic characters are written as
// escapes that survive any file encoding:
//   in JavaScript strings  \u2014 (em dash)  \u2019 (apostrophe)  \u2122 (TM)
//   in page text           &mdash; &rsquo; &ldquo; &rdquo; &trade; &bull;
// Keep new copy in this file to the same rule.

// ---------------------------------------------------------------------------
// PRESS RELEASE: "Hatfield.ai Launches HatfieldIQ(TM), an AI-Powered Global
// Company Intelligence Platform" (distributed by EIN Presswire, November 17,
// 2026). Route: /insights/hatfieldiq-launch
//
// 2026-11-18 (Frank): "add the press release to news and insights and also
// have something on homepage announcing the launch and linking to the press
// release". Agreed approach: our own page carrying the release, a link to the
// original on EIN Presswire, the release reproduced WORD FOR WORD as
// distributed. Only typography differs from the EIN copy (curly apostrophes
// and quotes, the em dash in "supports - not replaces"). Points noted to
// Frank and deliberately left as published: "24/7 monitoring"; the pricing
// sentence "decreases to $25 per company in volume bands for portfolios above
// 200 companies" (the tear sheet and /iq state $25 applies to each company
// above 200); "There are no minimum number of companies". Change them here
// only on his instruction - a hosted release normally matches the wire copy.
//
// IMAGES: the three images embedded in Frank's release PDF, his own material:
//   public/insights/hatfieldiq-launch-banner.jpg  (launch banner, 1200x538)
//   public/insights/frank-wadsworth.jpg           (portrait, 600x800)
//   public/insights/hatfield-advisory-board.jpg   (Advisory Board, 1600x900)
//
// LOOK: the same page design as src/pages/insights/OneWeekExposure.tsx (light
// page, navy callouts); colours copied from that file. The page header turns
// to dark text on every /insights/ address (src/components/Navigation.tsx).
//
// READING TIME: "4 min read" = 825 words of release body text (headings
// and paragraphs; header, quote panel, figures and links excluded) at 225
// words a minute, counted from the rendered page on 2026-11-18. Kept in step with the card in
// src/pages/Insights.tsx.
// ---------------------------------------------------------------------------

const ARTICLE_PATH = "/insights/hatfieldiq-launch";
const ARTICLE_TITLE =
  "Hatfield.ai Launches HatfieldIQ\u2122, an AI-Powered Global Company Intelligence Platform";
const ARTICLE_SUBTITLE =
  "Integrated intelligence from ~900 curated sources connects company developments with the geopolitical, economic, regulatory and market forces shaping business";
const ARTICLE_DESCRIPTION =
  "Hatfield.ai today announced the launch of HatfieldIQ\u2122, an AI-powered company surveillance and intelligence platform that helps organizations worldwide understand developments affecting the companies they monitor.";
const PUBLISHED_ISO = "2026-11-17";
const PUBLISHED_LABEL = "November 17, 2026";
const READ_TIME = "4 min read";
const HERO_IMAGE = "/insights/hatfieldiq-launch-banner.jpg";
const PORTRAIT_IMAGE = "/insights/frank-wadsworth.jpg";
const BOARD_IMAGE = "/insights/hatfield-advisory-board.jpg";
const EIN_URL = "https://www.einpresswire.com/article/957296954";

// Colours copied from src/pages/insights/OneWeekExposure.tsx.
const C = {
  page: "bg-[hsl(216,24%,96%)]",
  heading: "text-[hsl(215,30%,25%)]",
  body: "text-[hsl(215,20%,34%)]",
  accent: "text-[hsl(215,65%,48%)]",
  callout: "bg-[hsl(220,65%,25%)]",
};

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className={`text-3xl font-bold ${C.heading} mt-14 mb-5`}>{children}</h2>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className={`text-lg ${C.body} leading-relaxed mb-5`}>{children}</p>
);

const HatfieldIQLaunch = () => {
  usePageMeta({
    title: `${ARTICLE_TITLE} | Hatfield.ai News`,
    description: ARTICLE_DESCRIPTION,
    path: ARTICLE_PATH,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: ARTICLE_TITLE,
      description: ARTICLE_DESCRIPTION,
      datePublished: PUBLISHED_ISO,
      image: `https://www.hatfield.ai${HERO_IMAGE}`,
      author: { "@type": "Organization", name: "Hatfield.ai" },
      publisher: { "@type": "Organization", name: "Hatfield.ai" },
      mainEntityOfPage: `https://www.hatfield.ai${ARTICLE_PATH}`,
    },
  });

  return (
    <div className={`min-h-screen ${C.page}`}>
      <Navigation />

      <article className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/insights"
            className={`inline-flex items-center gap-2 text-sm font-medium ${C.heading} hover:opacity-80 mb-8`}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to News &amp; Insights
          </Link>

          <header>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${C.accent} mb-3`}
            >
              Press release
            </p>
            <h1
              className={`text-4xl md:text-5xl font-bold ${C.heading} leading-tight mb-5`}
            >
              Hatfield.ai Launches <ProductName product="IQ" tm />, an
              AI-Powered Global Company Intelligence Platform
            </h1>
            <p className={`text-xl ${C.heading} leading-relaxed mb-6 italic`}>
              {ARTICLE_SUBTITLE}
            </p>
            <p className={`text-sm ${C.body} opacity-80 mb-10`}>
              Hatfield.ai
              <span aria-hidden="true" className="mx-3">
                &bull;
              </span>
              <time dateTime={PUBLISHED_ISO}>{PUBLISHED_LABEL}</time>
              <span aria-hidden="true" className="mx-3">
                &bull;
              </span>
              {READ_TIME}
            </p>
          </header>

          <figure className="mb-12">
            <img
              src={HERO_IMAGE}
              alt="HatfieldIQ launch banner: The world is connected. Your intelligence should be, too."
              width={1200}
              height={538}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </figure>

          <P>
            <strong className={C.heading}>
              NEW YORK, NY, UNITED STATES, November 17, 2026
            </strong>{" "}
            &mdash; Hatfield.ai today announced the launch of HatfieldIQ&trade;,
            an AI-powered company surveillance and intelligence platform that
            helps organizations worldwide understand developments affecting the
            companies they monitor. HatfieldIQ synthesizes information across
            risk, financial, regulatory, cybersecurity, geopolitical and market
            domains and organizes it around client-selected company portfolios,
            so professionals can see not only what has changed, but how
            developments across domains connect.
          </P>
          <P>
            Designed for enterprise risk, audit and compliance professionals,
            procurement and supply-chain leaders, financial and equity research
            analysts, private equity professionals, investment teams and
            business executives, HatfieldIQ supports a wide range of use cases,
            from monitoring suppliers and business partners to tracking
            competitors, investment holdings, acquisition targets and other
            organizations of interest. Third-party risk management remains a
            core application, and the platform serves organizations across
            industries and professional functions.
          </P>

          <aside
            aria-label="Quote from Frank Wadsworth"
            className={`${C.callout} text-white rounded-lg my-10 overflow-hidden flex flex-col sm:flex-row`}
          >
            <img
              src={PORTRAIT_IMAGE}
              alt="Frank Wadsworth, Founder and CEO, Hatfield.ai"
              width={600}
              height={800}
              className="w-full sm:w-44 h-56 sm:h-auto object-cover object-top"
            />
            <div className="px-6 py-6 flex flex-col justify-center">
              <p className="text-xl leading-relaxed font-semibold">
                &ldquo;The world is interconnected. Intelligence should be, too.
                HatfieldIQ was built on that principle. We connect developments
                across companies, markets, regulations and global events&rdquo;
              </p>
              <p className="mt-4 text-sm text-white/75">
                Frank Wadsworth, Founder &amp; CEO, Hatfield.ai
              </p>
            </div>
          </aside>

          <H2>The world is interconnected. Intelligence should be, too.</H2>
          <P>
            Geopolitical developments can move financial markets.
            Macroeconomic policy can change investment assumptions. Cyber
            incidents can disrupt supply chains. Regulatory actions can reshape
            a company&rsquo;s risk profile. Yet these developments are often
            delivered through separate alerts and disconnected information
            streams. HatfieldIQ brings relevant developments together in a
            portfolio-centered view, so users can interpret company-specific
            events in the context of wider global forces.
          </P>

          <H2>From more alerts to a clearer picture</H2>
          <P>
            HatfieldIQ&rsquo;s sources span cybersecurity, litigation, corporate
            actions, financial health, sanctions, negative news, ESG, regulatory
            intelligence, geopolitics, supply chains and financial markets.
            Rather than simply aggregating information, the platform
            orchestrates it across domains: associating developments with
            monitored companies, consolidating related events, reducing
            duplicate alerts and showing what the combined signals may indicate.
          </P>
          <P>
            The platform provides 24/7 monitoring, with source evidence to
            support review. HatfieldIQ uses AI to interpret developments,
            surface context and direct attention to issues that warrant further
            investigation. It supports&mdash;not replaces&mdash;professional
            judgment and decision-making.
          </P>

          <H2>Company intelligence, tailored to each portfolio</H2>
          <P>
            Clients choose the companies to monitor, and HatfieldIQ focuses on
            those companies while providing broader context through global
            news, geopolitical and geographic intelligence, regulatory
            developments, market and economic indicators, portfolio-level
            analysis and Executive Daily Briefings that consolidate developments
            by company and severity.
          </P>
          <P>
            HatfieldIQ also includes Ask HatfieldIQ, which allows users to ask
            questions in plain English and receive answers based on their
            monitored portfolio, supported by source evidence. Financial-health
            intelligence can include financial reporting and models such as
            Piotroski F-Score, Altman Z-Score and Merton analysis where
            applicable. Coverage extends to vulnerabilities, export-control
            lists, ownership changes, mergers, restructuring and leadership
            developments, with geopolitical and supply-chain events tracked
            across more than 230 countries and territories, including
            fourth-party dependencies and transportation disruptions.
          </P>
          <P>
            &ldquo;In an interconnected world, the greatest risk isn&rsquo;t
            just what you don&rsquo;t know&mdash;it&rsquo;s what you fail to
            connect before it matters,&rdquo; said Frank Wadsworth, Founder and
            CEO of Hatfield.ai. &ldquo;Geopolitical events reshape economies,
            cyberattacks disrupt businesses, and decisions made thousands of
            miles away can ripple through global supply chains overnight. Yet
            organizations are still expected to make critical decisions using
            fragmented information and disconnected alerts.&rdquo;
          </P>
          <P>
            &ldquo;The world is interconnected. Intelligence should be, too.
            HatfieldIQ was built on that principle. We connect developments
            across companies, markets, regulations and global events,
            transforming fragmented information into meaningful intelligence
            that helps professionals see the bigger picture, understand what
            matters and act with greater clarity. Know what changed. Know what
            matters. Know where to act.&rdquo;
          </P>

          <H2>A simple path from subscription to surveillance</H2>
          <P>
            HatfieldIQ is a low-friction subscription service, with no lengthy
            implementation process or complex integration required to begin
            monitoring a portfolio. Clients subscribe, select their companies
            and start monitoring.
          </P>
          <P>
            Pricing is based on the number of companies monitored, not the
            number of individual users. Plans include unlimited authorized
            users, enabling teams across risk, procurement, compliance,
            cybersecurity, research, investment and executive leadership to
            share intelligence without additional per-user licensing charges.
            Pricing is progressive, starting at $50 per company per month. This
            decreases to $25 per company in volume bands for portfolios above
            200 companies. There are no minimum number of companies and annual
            billing includes two months free.
          </P>

          <H2>Availability</H2>
          <P>
            HatfieldIQ is available now through Hatfield.ai subscription plans,
            with a complimentary 14-day trial at{" "}
            <Link
              to="/iq"
              className={`${C.accent} underline underline-offset-2 hover:opacity-80`}
            >
              www.hatfield.ai/iq
            </Link>{" "}
            for organizations evaluating the platform. Additional information is
            available at{" "}
            <Link
              to="/"
              className={`${C.accent} underline underline-offset-2 hover:opacity-80`}
            >
              www.hatfield.ai
            </Link>
            .
          </P>

          <aside
            aria-label="Explore HatfieldIQ"
            className={`${C.callout} text-white rounded-lg px-6 py-5 my-10`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
              Experience HatfieldIQ firsthand
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Explore the platform, price your portfolio or start a free trial.
            </p>
            <Link
              to="/iq"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-base font-semibold text-[hsl(220,65%,25%)] hover:opacity-90"
            >
              Explore HatfieldIQ
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>

          <H2>Part of Hatfield.ai&rsquo;s broader risk intelligence offering</H2>
          <P>
            HatfieldIQ is offered as a standalone subscription and also forms
            part of HatfieldRISQ&trade;, Hatfield.ai&rsquo;s integrated
            AI-powered third-party risk management platform. HatfieldRISQ
            connects procurement intake, entity identification, risk
            assessments, contracting, obligations, operational resilience,
            surveillance and supporting evidence around a single third-party
            record. Organizations can use HatfieldIQ for focused company
            intelligence or access its monitoring capabilities within
            HatfieldRISQ&rsquo;s broader third-party governance workflows.
          </P>

          <H2>About Hatfield.ai</H2>
          <P>
            Hatfield.ai develops AI-powered risk management, procurement and
            company intelligence solutions that help organizations strengthen
            oversight, improve operational efficiency and make informed
            decisions. Founded by Frank Wadsworth, a financial-services and
            technology executive with more than 30 years of industry
            experience, Hatfield.ai offers HatfieldIQ&trade;, a company
            surveillance and intelligence platform, and HatfieldRISQ&trade;, an
            integrated procure-to-contract and third-party risk management
            platform.{" "}
            <Link
              to="/"
              className={`${C.accent} underline underline-offset-2 hover:opacity-80`}
            >
              www.hatfield.ai
            </Link>
            .
          </P>

          <figure className="my-12">
            <img
              src={BOARD_IMAGE}
              alt="Hatfield.ai Advisory Board: Frank Wadsworth, Albert J. Mellina, Hsing-Hsing Li, Kevin Kobs, Rene Mandeville and Neil Shroff"
              width={1600}
              height={900}
              loading="lazy"
              className="w-full h-auto rounded-xl shadow-md"
            />
            <figcaption className={`mt-3 text-sm ${C.body} opacity-80`}>
              Hatfield.ai Advisory Board
            </figcaption>
          </figure>

          <div
            className={`mt-12 border-t border-[hsl(215,25%,85%)] pt-6 ${C.body}`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${C.accent} mb-3`}
            >
              Media contact
            </p>
            <p className={`font-semibold ${C.heading}`}>Rene Mandeville</p>
            <p>iVoice Communications, Inc.</p>
            <p>
              <a
                href="tel:+19178334735"
                className="underline underline-offset-2 hover:opacity-80"
              >
                +1 9178334735
              </a>
            </p>
            <p>
              <a
                href="mailto:rene@ivoice.agency"
                className="underline underline-offset-2 hover:opacity-80"
              >
                rene@ivoice.agency
              </a>
            </p>
          </div>

          <p className={`mt-10 text-sm ${C.body} opacity-80`}>
            This press release was originally distributed by EIN Presswire on{" "}
            {PUBLISHED_LABEL}.{" "}
            <a
              href={EIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
            >
              View the original release
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . Images: Hatfield.ai.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default HatfieldIQLaunch;