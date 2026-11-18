import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductName from "@/components/ProductName";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/lib/usePageMeta";

// 2026-10-13 (Frank, "weird question marks"): this file is kept to plain
// ASCII. Saved in the Windows codepage, typographic characters (em dash,
// curly quotes, bullets) arrived in the browser as a "?" in a black diamond.
// They are now written as escapes that survive any file encoding:
//   in JavaScript strings  \u2014 (em dash)  \u2019 (apostrophe)
//                          \u201C and \u201D (curly double quotes)
//   in page text           &mdash; &rsquo; &ldquo; &rdquo; &bull; &#9656; (the arrow)
// Keep new copy in this file to the same rule.

// ---------------------------------------------------------------------------
// INSIGHTS ARTICLE: "In Just One Week, the World Changed. Did Your
// Understanding of Risk Keep Up?" by Frank Wadsworth (published November 17,
// 2026). Route: /insights/one-week-the-world-changed
//
// 2026-11-17 (Frank): article text is Frank's draft of 17 November 2026,
// published with the changes he accepted that evening ("i'll go with all
// your recs and i like the idea of listing sources"):
//   - Huang line: one affair (not "affairs"); the intelligence link is
//     written as reported, not as fact; NVIDIA's board statement that it had
//     no reason to believe secrets or national security were compromised is
//     included. Named person - keep this wording as reported.
//   - "more than 900 global information sources" -> "around 900", per his
//     2026-10-01 ruling ("~900 sources").
//   - The third-party framing is kept on purpose (thought-leadership piece
//     for risk and procurement readers), although HatfieldIQ product copy
//     otherwise says "portfolio companies" (ruling 2026-10-12).
//   - Images: ONLY the Strait illustration Frank supplied, captioned as an
//     illustration (public/insights/one-week-strait-illustration.jpg). The
//     airport-board and Outlook photos he sent look like Getty Images news
//     photos (not licensed for promotional use) and the vaccination image
//     shows invented county case counts, so none of those are used. The two
//     graphics below (the seven-day timeline and the exposure layers) are
//     drawn in code from the sourced facts, so there is no rights question.
//
// SOURCES: every event was checked on 2026-11-17 against the reports listed
// in SOURCES below (dates, who said what). Each claim carries an inline,
// clickable citation and the full list is printed at the end of the article.
// Facts as checked: Huang resignation announced Nov 12 (SEC 8-K); Microsoft
// 365 / Outlook outage began Nov 12 and ran into Nov 13; FAA nationwide
// ground stop Nov 13, network provider L3Harris had been deploying a new
// router at a remote site (FAA Q&A, Nov 15); Chase outage Nov 16, other
// banks' customers also reported problems; NSA Net degraded Nov 17 (NSA
// called it scheduled routine maintenance); PAHO announced on Nov 17 that
// the U.S. lost its measles elimination status.
//
// LOOK: the same page design as src/pages/AIGovernanceArticle.tsx (light
// page, navy callouts, inline citations, Sources list); colours copied from
// that file. The page header switches to dark text on every /insights/
// address (src/components/Navigation.tsx).
//
// READING TIME: "4 min read" = 915 words at 225 words a minute,
// counted from the rendered article text on 2026-11-17. Kept in step with
// the card in src/pages/Insights.tsx.
// ---------------------------------------------------------------------------

const ARTICLE_PATH = "/insights/one-week-the-world-changed";
const ARTICLE_TITLE =
  "In Just One Week, the World Changed. Did Your Understanding of Risk Keep Up?";
const ARTICLE_DESCRIPTION =
  "A CEO resignation, cloud and banking outages, a nationwide flight ground stop and the return of endemic measles: one week that shows why your third party\u2019s problem is your problem.";
const PUBLISHED_ISO = "2026-11-17";
const PUBLISHED_LABEL = "November 17, 2026";
const READ_TIME = "4 min read";
const HERO_IMAGE = "/insights/one-week-strait-illustration.jpg";

const SOURCES = {
  nvidia8k: {
    label:
      "NVIDIA Corporation, Form 8-K, \u201CNVIDIA Announces CEO Transition,\u201D November 12, 2026 (SEC EDGAR)",
    short: "NVIDIA Form 8-K, November 12, 2026",
    href: "https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000082/nvidiaannouncesceotransiti.htm",
  },
  sfStandard: {
    label:
      "The San Francisco Standard, \u201CNvidia CEO Jensen Huang resigns,\u201D November 12, 2026",
    short: "The San Francisco Standard, November 12, 2026",
    href: "https://sfstandard.com/2026/11/12/nvidia-ceo-jensen-huang-resigns/",
  },
  beebom: {
    label:
      "Beebom, \u201CNVIDIA President Jensen Huang Resigns, Board Names Interim CEO,\u201D November 12, 2026",
    short: "Beebom, November 12, 2026",
    href: "https://beebom.com/nvidia-president-ceo-jensen-huang-resigns/",
  },
  microsoft: {
    label:
      "BleepingComputer, \u201CMassive Microsoft 365 outage disrupts Outlook, Teams, Copilot worldwide,\u201D November 12, 2026",
    short: "BleepingComputer, November 12, 2026",
    href: "https://bleepingcomputer.com/news/microsoft/massive-microsoft-365-outage-disrupts-outlook-teams-copilot-worldwide",
  },
  chase: {
    label:
      "NBC News, \u201CChase says transactions back to normal after outage online and at some branches,\u201D November 16, 2026",
    short: "NBC News, November 16, 2026",
    href: "https://www.nbcnews.com/business/consumer/outages-chase-banking-online-branches-rcna609673",
  },
  faa: {
    label:
      "Federal Aviation Administration, \u201CNationwide Ground Stop: Questions and Answers,\u201D November 15, 2026",
    short: "FAA, November 15, 2026",
    href: "https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers",
  },
  nsa: {
    label:
      "Nextgov/FCW, \u201CClassified NSA communications network down, people familiar say,\u201D November 17, 2026",
    short: "Nextgov/FCW, November 17, 2026",
    href: "https://www.nextgov.com/digital-government/2026/11/classified-nsa-communications-network-down-people-familiar-say/417277/",
  },
  paho: {
    label:
      "Pan American Health Organization, \u201CPAHO urges countries to step up efforts to stop measles outbreaks and move towards elimination in the Americas,\u201D November 17, 2026",
    short: "PAHO, November 17, 2026",
    href: "https://www.paho.org/en/news/17-11-2026-paho-urges-countries-step-efforts-stop-measles-outbreaks-and-move-towards",
  },
  hormuz: {
    label:
      "Gulf News, \u201CSix months into the Iran war, Hormuz is still a chokepoint under siege \u2014 and uncertainty grips energy markets,\u201D updated August 26, 2026",
    short: "Gulf News, August 2026",
    href: "https://gulfnews.com/world/mena/six-months-into-the-iran-war-hormuz-is-still-a-chokepoint-under-siege-and-uncertainty-grips-energy-markets-1.500651257",
  },
  refineries: {
    label:
      "Atlantic Council UkraineAlert (Peter Dickinson), \u201CUkraine\u2019s new drone blitz cuts Russian oil refining capacity by 30 percent,\u201D November 10, 2026",
    short: "Atlantic Council, November 10, 2026",
    href: "https://www.atlanticcouncil.org/blogs/ukrainealert/ukraines-new-drone-blitz-cuts-russian-oil-refining-capacity-by-30-percent/",
  },
  ebola: {
    label:
      "European Centre for Disease Prevention and Control, \u201CEbola disease: Multi-country outbreak 2026\u201D (updated regularly)",
    short: "ECDC",
    href: "https://www.ecdc.europa.eu/en/ebola-outbreak-democratic-republic-congo-and-uganda",
  },
  durban: {
    label:
      "Daily Maverick, \u201CBusiness casts a wary eye on Port of Durban as cargo delays persist,\u201D November 11, 2026",
    short: "Daily Maverick, November 11, 2026",
    href: "https://www.dailymaverick.co.za/article/2026-11-11-business-casts-a-wary-eye-on-port-of-durban-as-cargo-delays-persist/",
  },
} as const;

type SourceKey = keyof typeof SOURCES;

// Colours copied from src/pages/AIGovernanceArticle.tsx.
const C = {
  page: "bg-[hsl(216,24%,96%)]",
  heading: "text-[hsl(215,30%,25%)]",
  body: "text-[hsl(215,20%,34%)]",
  accent: "text-[hsl(215,65%,48%)]",
  callout: "bg-[hsl(220,65%,25%)]",
};

// An inline, clickable citation, e.g. "(FAA, November 15, 2026)".
const Cite = ({ source }: { source: SourceKey }) => (
  <>
    {" ("}
    <a
      href={SOURCES[source].href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${C.accent} underline underline-offset-2 hover:opacity-80`}
    >
      {SOURCES[source].short}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
    {")"}
  </>
);

const Callout = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <aside
    aria-label={label}
    className={`${C.callout} text-white rounded-lg px-6 py-5 my-10`}
  >
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
      {label}
    </p>
    <div className="text-lg leading-relaxed">{children}</div>
  </aside>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className={`text-3xl font-bold ${C.heading} mt-14 mb-5`}>{children}</h2>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className={`text-lg ${C.body} leading-relaxed mb-5`}>{children}</p>
);

// A bullet with a bold lead-in, for the event and backdrop lists.
const Item = ({ lead, children }: { lead: string; children: ReactNode }) => (
  <li className={`flex items-start gap-3 text-lg ${C.body} leading-relaxed`}>
    <span className={`${C.accent} mt-1 shrink-0`} aria-hidden="true">
      &#9656;
    </span>
    <span>
      <strong className={C.heading}>{lead}</strong> {children}
    </span>
  </li>
);

// ---------------------------------------------------------------------------
// GRAPHIC 1 - "Six disruptions in seven days". One column per day,
// November 11 to 17, each event under the day it happened (dates as in the
// header note). Drawn in code; on a phone the days stack.
// ---------------------------------------------------------------------------
type DayEvent = { tag: string; text: string };
const WEEK: { day: string; date: string; events: DayEvent[] }[] = [
  { day: "Wed", date: "Nov 11", events: [] },
  {
    day: "Thu",
    date: "Nov 12",
    events: [
      { tag: "Leadership", text: "NVIDIA CEO resigns" },
      { tag: "Cloud", text: "Microsoft 365 / Outlook outage begins" },
    ],
  },
  {
    day: "Fri",
    date: "Nov 13",
    events: [{ tag: "Aviation", text: "FAA nationwide ground stop" }],
  },
  { day: "Sat", date: "Nov 14", events: [] },
  { day: "Sun", date: "Nov 15", events: [] },
  {
    day: "Mon",
    date: "Nov 16",
    events: [{ tag: "Banking", text: "JPMorgan Chase outage" }],
  },
  {
    day: "Tue",
    date: "Nov 17",
    events: [
      { tag: "Security", text: "NSA internal network outage" },
      { tag: "Health", text: "U.S. loses measles elimination status" },
    ],
  },
];

const WeekTimeline = () => (
  <figure className="my-12">
    <div className="rounded-xl border border-[hsl(215,25%,85%)] bg-white p-5 sm:p-6 shadow-sm">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${C.accent} mb-1`}>
        November 11&ndash;17, 2026
      </p>
      <p className={`text-xl font-bold ${C.heading} mb-5`}>
        Six disruptions in seven days
      </p>
      <ol className="grid grid-cols-1 sm:grid-cols-7 gap-3">
        {WEEK.map((d) => (
          <li
            key={d.date}
            className={`rounded-lg p-3 sm:min-h-[180px] ${
              d.events.length
                ? "bg-[hsl(220,65%,25%)] text-white"
                : "bg-[hsl(216,24%,96%)] text-[hsl(215,20%,34%)]"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
              {d.day}
            </p>
            <p className="text-base font-bold mb-2">{d.date}</p>
            {d.events.length === 0 ? (
              <p className="text-sm opacity-50" aria-label="No event listed">
                &mdash;
              </p>
            ) : (
              <ul className="space-y-3">
                {d.events.map((e) => (
                  <li key={e.text}>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[color:hsl(var(--brand-blue-light))]">
                      {e.tag}
                    </span>
                    <span className="block text-sm leading-snug">{e.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
    <figcaption className={`mt-3 text-sm ${C.body} opacity-80`}>
      Dates as reported by the sources cited in this article.
    </figcaption>
  </figure>
);

// ---------------------------------------------------------------------------
// GRAPHIC 2 - "How exposure reaches you". Nested layers from the business
// outward; each layer names an example from this week. Drawn in code.
// ---------------------------------------------------------------------------
const LAYERS: { name: string; example: string }[] = [
  {
    name: "Global events",
    example: "Conflict, disease, port congestion",
  },
  {
    name: "Infrastructure",
    example: "Air traffic telecoms run by a contractor",
  },
  {
    name: "Financial institutions",
    example: "A bank outage delays payments",
  },
  {
    name: "Technology providers",
    example: "Email and collaboration go dark",
  },
  {
    name: "Your direct suppliers",
    example: "The companies you contract with",
  },
];

const ExposureLayers = () => {
  const render = (i: number): ReactNode => {
    if (i === LAYERS.length) {
      return (
        <div className="rounded-lg bg-[hsl(220,65%,25%)] px-4 py-5 text-center text-white">
          <p className="text-lg font-bold">Your business</p>
        </div>
      );
    }
    const layer = LAYERS[i];
    const shade = [
      "bg-[hsl(215,40%,94%)]",
      "bg-[hsl(215,45%,90%)]",
      "bg-[hsl(215,50%,86%)]",
      "bg-[hsl(215,55%,82%)]",
      "bg-[hsl(215,60%,77%)]",
    ][i];
    return (
      <div className={`${shade} rounded-xl px-3 pt-3 pb-3 sm:px-4`}>
        <p className={`flex flex-wrap items-baseline justify-between gap-x-3 mb-2 text-sm`}>
          <span className={`font-bold uppercase tracking-wider ${C.heading}`}>
            {layer.name}
          </span>
          <span className={`${C.body} italic`}>{layer.example}</span>
        </p>
        {render(i + 1)}
      </div>
    );
  };
  return (
    <figure className="my-12">
      <div className="rounded-xl border border-[hsl(215,25%,85%)] bg-white p-5 sm:p-6 shadow-sm">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${C.accent} mb-1`}>
          How exposure reaches you
        </p>
        <p className={`text-xl font-bold ${C.heading} mb-5`}>
          You don&rsquo;t have to be the target to become the victim
        </p>
        {render(0)}
      </div>
      <figcaption className={`mt-3 text-sm ${C.body} opacity-80`}>
        Each outer layer can disrupt every layer inside it. Examples are from
        the week described above.
      </figcaption>
    </figure>
  );
};

const RISK_DIMENSIONS = [
  "Cybersecurity",
  "Financial health and viability",
  "Litigation",
  "Regulatory actions",
  "Sanctions and watchlists",
  "Corporate actions",
  "Adverse news",
  "Geopolitical developments",
  "Supply-chain disruptions",
];

const OneWeekExposure = () => {
  usePageMeta({
    title: `${ARTICLE_TITLE} | Hatfield.ai Insights`,
    description: ARTICLE_DESCRIPTION,
    path: ARTICLE_PATH,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: ARTICLE_TITLE,
      description: ARTICLE_DESCRIPTION,
      datePublished: PUBLISHED_ISO,
      image: `https://www.hatfield.ai${HERO_IMAGE}`,
      author: {
        "@type": "Person",
        name: "Frank Wadsworth",
        jobTitle: "Founder & CEO, Hatfield.ai",
      },
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
            Back to Insights
          </Link>

          <header>
            <h1
              className={`text-4xl md:text-5xl font-bold ${C.heading} leading-tight mb-6`}
            >
              {ARTICLE_TITLE}
            </h1>
            <p className={`text-sm ${C.body} opacity-80 mb-10`}>
              By Frank Wadsworth, Founder &amp; CEO, Hatfield.ai
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
              alt="Illustration of tankers and naval vessels passing through a narrow, mountainous sea strait"
              width={1366}
              height={910}
              className="w-full h-auto rounded-xl shadow-md"
            />
            <figcaption className={`mt-3 text-sm ${C.body} opacity-80`}>
              Illustration. Commercial shipping through a strategic chokepoint.
            </figcaption>
          </figure>

          <p className={`text-xl ${C.heading} leading-relaxed mb-6 italic`}>
            The next major threat to your business may not come from within your
            organization. It may come from a company you depend on&mdash;or one
            you&rsquo;ve never heard of.
          </p>

          <H2>In just seven days&hellip;</H2>
          <ul className="space-y-4 mb-6">
            <Item lead="NVIDIA&rsquo;s CEO, Jensen Huang, resigned">
              after acknowledging an extramarital affair with a woman U.S.
              intelligence agencies reportedly believe passed information to
              China&mdash;raising questions about corporate governance,
              national security and leadership continuity at one of the
              world&rsquo;s most strategically important technology companies.
              NVIDIA&rsquo;s board said it had no reason to believe company
              secrets or national security had been compromised
              <Cite source="nvidia8k" />
              <Cite source="sfStandard" />
              <Cite source="beebom" />.
            </Item>
            <Item lead="Microsoft experienced major service disruptions,">
              affecting Outlook and other essential business communications
              relied upon by organizations worldwide
              <Cite source="microsoft" />.
            </Item>
            <Item lead="JPMorgan Chase suffered a significant technology outage,">
              disrupting banking services and transactions, while customers of
              other major financial institutions reported service issues
              <Cite source="chase" />.
            </Item>
            <Item lead="The FAA issued a nationwide ground stop,">
              disrupting thousands of flights after a telecommunications network
              failure involving infrastructure maintained by a third-party
              technology provider
              <Cite source="faa" />.
            </Item>
            <Item lead="The National Security Agency experienced an internal communications network outage,">
              demonstrating that even institutions responsible for national
              security are vulnerable to infrastructure disruptions
              <Cite source="nsa" />.
            </Item>
            <Item lead="The United States officially lost its measles elimination status after 26 years,">
              underscoring the resurgence of infectious disease and its
              implications for healthcare, workforce availability and business
              continuity
              <Cite source="paho" />.
            </Item>
          </ul>
          <P>
            <strong className={C.heading}>And that&rsquo;s just one week.</strong>
          </P>

          <WeekTimeline />

          <P>
            Against this backdrop, the world continues to confront an
            increasingly volatile risk environment:
          </P>
          <ul className="space-y-4 mb-6">
            <Item lead="The war involving Iran and instability across the Middle East">
              continue to threaten energy infrastructure, commercial shipping and
              critical maritime routes, including the Strait of
              Hormuz&mdash;with implications for oil prices, transportation,
              insurance and global commerce
              <Cite source="hormuz" />.
            </Item>
            <Item lead="Russia&rsquo;s war in Ukraine continues to escalate,">
              with attacks on Russian refining infrastructure disrupting energy
              production and creating further uncertainty across global energy
              markets
              <Cite source="refineries" />.
            </Item>
            <Item lead="An expanding Ebola outbreak in Africa">
              highlights the ongoing threat of infectious diseases to public
              health, international travel and regional economic stability
              <Cite source="ebola" />.
            </Item>
            <Item lead="Congestion and operational challenges at South African ports">
              continue to expose vulnerabilities in international shipping and
              global supply chains
              <Cite source="durban" />.
            </Item>
          </ul>

          <Callout label="One common denominator">
            <p>
              Different events. Different industries. Different continents. One
              common denominator: <strong>EXPOSURE.</strong>
            </p>
          </Callout>

          <H2>Your Third Party&rsquo;s Problem Is Your Problem</H2>
          <P>Consider the implications.</P>
          <P>
            A technology failure at your supplier&rsquo;s service provider can
            disrupt your operations. A banking outage can interrupt your payments
            and liquidity. A geopolitical conflict thousands of miles away can
            affect transportation costs, raw material availability and delivery
            schedules. A leadership crisis at a major technology company can
            create uncertainty across an entire industry. And a vulnerability
            buried three or four layers deep in your supply chain can become
            tomorrow&rsquo;s operational crisis.
          </P>

          <ExposureLayers />

          <P>
            Yet many organizations still manage third-party risk through annual
            assessments, periodic due diligence, static risk ratings and
            questionnaires. These remain important controls. But they provide a
            snapshot of risk at a particular point in time.
          </P>

          <Callout label="The reality">
            <p className="font-semibold text-xl">
              Risk doesn&rsquo;t operate on an annual review cycle. It changes
              every day.
            </p>
          </Callout>

          <H2>The Question Every Business Leader Should Be Asking</H2>
          <P>
            Do you really know what&rsquo;s happening to the companies your
            business depends on? Not just your direct suppliers, but their
            suppliers, technology providers, financial institutions and the
            infrastructure supporting their operations?
          </P>
          <P>
            Are you aware when their financial condition deteriorates, when they
            experience a cybersecurity incident, when regulators take action, or
            when geopolitical developments threaten their ability to deliver?
            And perhaps most importantly:{" "}
            <strong className={C.heading}>
              would you know before the disruption reaches your business?
            </strong>
          </P>
          <P>
            This is no longer simply a third-party risk management question.
            It&rsquo;s a business continuity question. A financial question. A
            cybersecurity question. A supply-chain question.{" "}
            <strong className={C.heading}>It&rsquo;s a leadership question.</strong>
          </P>

          <H2>From Information Overload to Actionable Intelligence</H2>
          <P>
            We live in a world overflowing with information but often lacking
            meaningful intelligence. The challenge isn&rsquo;t finding another
            headline, news feed or risk alert. It&rsquo;s knowing what changed,
            which companies are affected, why it matters and where attention is
            required.
          </P>
          <P>
            That requires moving beyond periodic assessments toward continuous
            surveillance and intelligence across the full spectrum of business
            risks. Not more noise.{" "}
            <strong className={C.heading}>
              More intelligence. Better decisions.
            </strong>
          </P>

          <H2>
            Introducing <ProductName product="IQ" tm />
          </H2>
          <P>
            It&rsquo;s against this backdrop that I&rsquo;m proud to announce
            the launch of HatfieldIQ&trade;, developed by Hatfield.ai.
          </P>
          <P>
            <strong className={C.heading}>
              Built by a practitioner for practitioners,
            </strong>{" "}
            HatfieldIQ is an AI-powered business intelligence and continuous
            surveillance platform designed to help organizations stay informed
            about the companies that matter most to them.
          </P>
          <P>
            Drawing on around 900 global information sources, HatfieldIQ
            continuously monitors companies across critical risk
            dimensions&mdash;transforming fragmented information into relevant,
            timely intelligence:
          </P>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
            {RISK_DIMENSIONS.map((d) => (
              <li
                key={d}
                className={`rounded-lg border border-[hsl(215,25%,85%)] bg-white px-4 py-3 text-base font-medium ${C.heading}`}
              >
                {d}
              </li>
            ))}
          </ul>
          <P>
            Whether you&rsquo;re a business leader, risk professional,
            procurement executive, financial analyst or supply-chain manager,
            HatfieldIQ helps you understand{" "}
            <strong className={C.heading}>
              what changed, what matters and where to focus your attention.
            </strong>
          </P>
          <P>
            No complex implementation. No lengthy onboarding. Simply identify the
            companies you care about and start monitoring.
          </P>

          <Callout label="Experience HatfieldIQ firsthand">
            <p className="mb-4">
              Explore the platform, request a free trial or learn more.
            </p>
            <Link
              to="/iq"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-base font-semibold text-[hsl(220,65%,25%)] hover:opacity-90"
            >
              Explore HatfieldIQ
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Callout>

          <P>
            Because in today&rsquo;s interconnected world,{" "}
            <strong className={C.heading}>
              the greatest risk may not be what you know about your business.
              It&rsquo;s what you don&rsquo;t know about the companies you
              depend on.
            </strong>
          </P>

          <div className={`mt-12 border-t border-[hsl(215,25%,85%)] pt-6 ${C.body}`}>
            <p className={`font-semibold ${C.heading}`}>Frank Wadsworth</p>
            <p>Founder &amp; CEO, Hatfield.ai</p>
            <p className="italic">The Intelligent Choice.</p>
          </div>

          <section aria-labelledby="article-sources" className="mt-16">
            <h2
              id="article-sources"
              className={`text-2xl font-bold ${C.heading} mb-4`}
            >
              Sources
            </h2>
            <ul className="space-y-3">
              {(Object.keys(SOURCES) as SourceKey[]).map((key) => (
                <li
                  key={key}
                  className={`flex items-start gap-3 text-base ${C.body}`}
                >
                  <span className={`${C.accent} mt-1`} aria-hidden="true">
                    &#9656;
                  </span>
                  <a
                    href={SOURCES[key].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-80"
                  >
                    {SOURCES[key].label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className={`mt-6 text-sm ${C.body} opacity-80`}>
              Image: illustration supplied by Hatfield.ai. Graphics: Hatfield.ai,
              drawn from the sources above.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default OneWeekExposure;