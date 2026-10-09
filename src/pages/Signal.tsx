// Signal.tsx - SIGNAL pricing + pre-registration page (www.hatfield.ai/signal)
//
// Hatfield.ai - The Intelligent Choice
//
// 2026-09-17. WHAT CHANGED AND WHY.
//
// 1. THE FORM NOW SUBMITS. handleSubmit previously ran validation and then
//    called setSubmitted(true) - no fetch, no action, no POST. Every
//    "Request access" showed the prospect a thank-you and wrote NOTHING:
//    no registration row, no confirm-your-address email, no notice to
//    contact@hatfield.ai. It now posts to POST /api/register on
//    signal.hatfield.ai, which is the same code path the Dash landing
//    form uses (svc_registration_api.submit_registration) - one path, so
//    this page cannot drift away from the rules the server enforces.
//
// 2. THE TIER SELECT POSTS KEYS, NOT LABELS. It was posting "Trial",
//    "Watch", "Portfolio". The server's tiers are keyed 'demo', 'watch',
//    'portfolio', and approve_client falls back to "watch" for anything
//    it does not recognise - silently. So "Portfolio" became Watch, and
//    "Trial" would have provisioned a free-trial prospect onto a paid
//    subscription. Labels on screen are unchanged; only the posted value
//    moved.
//
// 3. REQUIRED FIELDS NOW MATCH THE SERVER. It required company, first,
//    email and role; the server has required last name, industry and
//    tier since 2026-08-08 ("all input fields are mandatory"). Anything
//    the page let through was refused after the round trip.
//
// 4. IT TELLS PEOPLE TO CONFIRM THEIR EMAIL. Approval is refused for an
//    unconfirmed address, so "we provision within one business day" on
//    its own left prospects waiting on an approval that could not happen
//    and Hatfield with a queue it could not clear.
//
// 5. IT RENDERS REFUSALS. One email = one registration; a returning
//    client was being told their request was received when it was
//    rejected.
//
// 6. BOT DEFENCES. A honeypot field (hidden; humans never fill it) and a
//    Cloudflare Turnstile widget. The endpoint is public and makes THIS
//    DOMAIN send mail - a few thousand junk submissions is how
//    hatfield.ai becomes a flagged sender and real invite links start
//    landing in junk folders at the banks SIGNAL is sold to.
//
// 2026-09-17 (later the same day). TWO MORE.
//
// 7. THE INDUSTRY LIST IS SERVED BY THE APP. It used to be typed here -
//    "Banking", "Capital markets", "Asset and wealth management",
//    "Public sector" - while the product's own vocabulary reads
//    "Financial Services (Banking)", "Capital Markets / Asset
//    Management" and so on. Only three of the eleven matched, so most
//    prospects picked an industry, reached the registration screen, and
//    watched the field come back blank - which also left their
//    Regulatory Intel feed unfocused, silently. The list now comes from
//    GET /api/sectors, which serves dal.REG_SECTOR_LABELS: one
//    vocabulary, no second copy to drift from.
//
//    FALLBACK_SECTORS below is the same vocabulary, hardcoded, so a
//    SIGNAL outage leaves the dropdown populated rather than empty. It
//    is deliberately the SERVER's labels and not the old marketing ones:
//    a fallback that cannot be resolved is worse than no fallback,
//    because it fails invisibly.
//
// 8. PRICES (2026-09-17, SUPERSEDED BY ITEM 14). The ~8% gross-up
//    figures (Watch 1,575, Monitor 4,875, Portfolio 10,250) were
//    replaced on 2026-10-09. The rule this item recorded still stands:
//    every published figure is also held in the product's dal.TIERS and
//    in Stripe, and changing one without the others is the defect that
//    put $10 in a signed agreement while the product charged $59.
//
// 2026-09-19. ONE MORE.
//
// 9. "CLIENT SIGN IN" GOES TO THE SIGN-IN SCREEN. Both copies - the
//    header button and the footer link - pointed at the bare host,
//    https://signal.hatfield.ai. The SIGNAL app's route() sends "/" to
//    landing_layout(): the app's OWN marketing page, with its own
//    pricing cards and its own "Client Sign In" button. So a client who
//    clicked sign in here landed on a second pricing page and had to
//    find sign-in again - and a prospect saw two differently laid-out
//    price lists for the same product one click apart. They now go to
//    SIGNAL_LOGIN_URL, which is "/login" on the same API_BASE the form
//    posts to, so staging builds sign in to staging and there is no
//    second hostname in this file to drift.
//
// 2026-09-21. FOUR, RECONCILING THIS PAGE WITH THE PDF ONE-PAGER.
//
// 10. "Your GPS for business decisions" sits in the header opposite the
//     wordmark, as on every artboard of the PDF.
// 11. The trial button reads "Start your free 10-business-day trial".
// 12. The footer names the legal entity: Hatfield Advisory LLC d/b/a
//     Hatfield.ai.
// 13. (Superseded by item 17 below.)
//
// 2026-10-09. THE PAGE NOW CARRIES THE CONTENT OF THE CURRENT THREE-PAGE
// TEAR SHEET (Hatfield.ai_SIGNAL.pdf, Frank, 2026-10-09).
//
// 14. NEW PRICES (Frank: "these are the new prices - we need to update on
//     both the website and in stripe"). Watch $950 / $9,500, Monitor
//     $3,500 / $35,000, Portfolio $6,000 / $60,000. Every figure lives
//     ONCE, in TIER_ROWS, and both the desktop matrix and the mobile list
//     render from it - there used to be two hand-typed copies. DO NOT
//     PUBLISH THIS PAGE until dal.TIERS and the Stripe prices carry the
//     same figures, or a prospect reads $950 here and is charged $1,575
//     at checkout.
//
// 15. NEW PRICING MODEL (Frank: "change it to reflect the pricing model
//     on the updated tear sheet"). Portfolio covers up to 200 companies
//     (was 250). Enterprise is 201+ and now carries a published price:
//     $6,000 a month or $60,000 a year, plus $25 a month / $250 a year
//     for each company above 200. Enterprise still asks no billing
//     preference on this form - PRICED_TIERS mirrors the server's
//     priced_tier(), which does not treat Enterprise as checkout-priced.
//     Whether Enterprise moves onto Stripe is a server-side decision,
//     not something this page can decide on its own.
//
// 16. THE COPY IS THE TEAR SHEET'S. Hero headline, the four stats
//     (~900 sources, 3 financial-health models, 15+ sanctions and
//     export-control lists, 230+ countries), the problem paragraph, how
//     it works, "Built by someone who has sat in the chair", the fuller
//     capability lists (FDIC bank analysis, U.S. economic intelligence,
//     export controls, people & ownership, ESG, enforcement, corporate
//     actions, due-diligence level, daily briefing, Ask SIGNAL) and the
//     page-3 "twelve questions" section. The competitor-price line
//     ($10,000-$35,000 per user p.a.) is gone because the tear sheet no
//     longer makes that claim. Trial says "Pre-selected", never a count
//     (standing ruling: the number will change). The "10 users or 1,000"
//     line appears once, in the narrative block, not again above the
//     table (2026-09-18 ruling against saying it twice).
//
// 17. "Piotroski F-Score" and "Altman Z-Score", capitalised as the tear
//     sheet now prints them, everywhere on the page.
//
// 18. KEPT, AGAINST THE TEAR SHEET: the tax sentence in the fine print
//     (Frank, 2026-10-09: "correct and agreed"). Checkout adds tax; the
//     page that shows the price discloses it.
//
// 19. CAPABILITY LISTS ARE WRITTEN ONCE. DOMAINS feeds both the desktop
//     matrix and the mobile list; they used to be two hand-kept copies
//     that had already started to differ in punctuation.
//
// 2026-10-09 (later). COPY RULINGS APPLIED TO BOTH TEAR SHEETS AND HERE.
//
// 20. One headline everywhere: "Know before risk becomes your news
//     headline." (Frank, 2026-10-09) - the hero and the closing band
//     now say the same thing; the closing band said "risk alerts become".
// 21. The three-part line reads "Know what changed. Know what matters.
//     Know where to act." in the hero body, matching the How it works
//     headings - the tear sheet's "See ... Understand ..." variant is
//     retired on the sheet too.
// 22. "Over thirty years of experience" (Frank, 2026-10-09), the same
//     wording the NEXUS sheet uses.
// 23. Two months free is said once, in the fine print. The plan note
//     under the table no longer repeats it.
//
// ENV (Vercel project settings):
//   VITE_SIGNAL_API_BASE      default https://signal.hatfield.ai
//   VITE_TURNSTILE_SITE_KEY   Cloudflare Turnstile site key. Unset =>
//                             the widget is not rendered and the server
//                             falls back to the honeypot and its rolling
//                             throttle.

import { FormEvent, useEffect, useRef, useState } from "react";

const API_BASE =
  (import.meta as any).env?.VITE_SIGNAL_API_BASE ?? "https://signal.hatfield.ai";

/**
 * Where "Client sign in" goes - the app's /login route, NOT its root.
 * See item 9 above.
 */
const SIGNAL_LOGIN_URL = `${API_BASE.replace(/\/+$/, "")}/login`;

const TURNSTILE_SITE_KEY =
  (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY ?? "";

/**
 * The published sample report, served BY THE APP (GET
 * /sample-risk-report), not by this site. Set to "" and the section, the
 * hero button and the footer link all disappear together - the page
 * cannot offer a sample it does not have.
 */
const SAMPLE_REPORT_URL = "https://signal.hatfield.ai/sample-risk-report";

/**
 * Tier KEYS as the server knows them, with the label this page shows.
 * The key is what gets posted and is load-bearing on the server; only
 * labels change here.
 */
const TIERS = [
  { key: "demo", label: "Trial" },
  { key: "watch", label: "Watch" },
  { key: "monitor", label: "Monitor" },
  { key: "portfolio", label: "Portfolio" },
  { key: "enterprise", label: "Enterprise" },
] as const;

/**
 * Tiers that go through checkout, and therefore get a billing interval.
 * Mirrors the server's priced_tier(). Enterprise has a published price
 * since 2026-10-09 (item 15) but is still arranged with our team, so it
 * is not in this list until the server says otherwise.
 */
const PRICED_TIERS = ["watch", "monitor", "portfolio"];

/**
 * Every published price, written ONCE (item 14). Both pricing layouts
 * render from this array. Keep it in step with dal.TIERS and Stripe.
 */
type TierRow = {
  key: string;
  label: string;
  note?: string;
  companies: string;
  monthly: string;
  monthlyNote?: string;
  annual: string;
  annualNote?: string;
  popular?: boolean;
};

const TIER_ROWS: TierRow[] = [
  {
    key: "demo",
    label: "Trial",
    note: "read-only",
    companies: "Pre-selected",
    monthly: "Free",
    annual: "10 business days",
  },
  {
    key: "watch",
    label: "Watch",
    companies: "Up to 25",
    monthly: "$950",
    annual: "$9,500",
  },
  {
    key: "monitor",
    label: "Monitor",
    companies: "Up to 100",
    monthly: "$3,500",
    annual: "$35,000",
    popular: true,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    companies: "Up to 200",
    monthly: "$6,000",
    annual: "$60,000",
  },
  {
    key: "enterprise",
    label: "Enterprise",
    companies: "201+",
    monthly: "$6,000",
    monthlyNote: "+$25/addt\u2019l company",
    annual: "$60,000",
    annualNote: "+$250/addt\u2019l company",
  },
];

/** "Plans from ..." reads the cheapest paid tier, never a typed copy. */
const FROM_MONTHLY =
  TIER_ROWS.find((r) => r.key === "watch")?.monthly ?? "";

/**
 * Capabilities, as the tear sheet lists them (item 16). `detail` renders
 * after an em dash in a quieter colour. One copy feeds both layouts.
 */
type Capability = { main: string; detail?: string };

const DOMAINS: { title: string; items: Capability[] }[] = [
  {
    title: "Financial & economic health",
    items: [
      { main: "Two years of financial reporting and trend analysis" },
      { main: "Piotroski F-Score", detail: "financial strength and trend analysis" },
      { main: "Altman Z-Score", detail: "financial resilience and distress risk" },
      { main: "Merton analysis", detail: "market-implied default risk" },
      { main: "Bank-specific financial analysis using FDIC filings" },
      { main: "Private-company manual FVA" },
      { main: "U.S. economic intelligence" },
      { main: "Macro indicators", detail: "multi-year trends and IMF projections" },
      { main: "Daily markets", detail: "indices, bonds, futures and currencies" },
    ],
  },
  {
    title: "Security, news & reputation",
    items: [
      { main: "Cybersecurity events and vulnerabilities" },
      { main: "Adverse media and reputational risk" },
      { main: "Social-media risk signals" },
      { main: "Sanctions screening", detail: "OFAC SDN/non-SDN, UN, UK OFSI and EU" },
      { main: "Export controls", detail: "BIS, ITAR and nonproliferation lists" },
      {
        main: "People & ownership",
        detail:
          "officers, principals and recorded owners screened; OFAC 50% Rule and PEP identification",
      },
      { main: "World news and geopolitical developments" },
      { main: "ESG and conduct incidents" },
    ],
  },
  {
    title: "Legal, regulatory & compliance",
    items: [
      {
        main: "Litigation intelligence",
        detail: "civil, bankruptcy, discrimination, contract, IP and shareholder actions",
      },
      { main: "Regulatory enforcement actions" },
      { main: "Applicable regulatory requirements by sector and jurisdiction" },
      { main: "Regulatory intelligence and rule changes" },
      { main: "Advisory alerts" },
      { main: "Corporate actions and leadership changes" },
      { main: "Due-diligence level per company" },
    ],
  },
  {
    title: "Supply chain & location risk",
    items: [
      { main: "Geographic, geopolitical and climate events" },
      {
        main: "Delivery-location exposure",
        detail: "disasters, State Department advisories and CDC alerts",
      },
      { main: "Country profiles across 230+ countries" },
      { main: "Fourth-party dependencies" },
      { main: "Port watch", detail: "shipping routes and critical chokepoints" },
      { main: "Risk simulation" },
      { main: "Daily executive briefing" },
      { main: "Ask SIGNAL", detail: "answers from your portfolio" },
    ],
  },
];

/** The tear sheet's page 3: twelve questions, one company. */
const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Are we watching the right company?",
    a: "Every name resolved to its registered legal entity. Namesakes rejected. A parent event shown on the subsidiary you use.",
  },
  {
    q: "Is legal risk changing the story?",
    a: "Litigation ranked by what the event is, not how loudly it is reported, with your portfolio company marked plaintiff or defendant.",
  },
  {
    q: "Has their cyber risk changed?",
    a: "Actively exploited vulnerabilities, breach records and outside-in security posture.",
  },
  {
    q: "Is a regulator already on to them?",
    a: "Enforcement actions from the regulators themselves, plus rule changes and requirements by sector and jurisdiction.",
  },
  {
    q: "What changed inside the company?",
    a: "Mergers, restructurings, leadership exits, board changes and credit ratings from primary filings.",
  },
  {
    q: "What is the market hearing?",
    a: "Adverse news and social signals, held to independent sources and tested for materiality.",
  },
  {
    q: "What does conduct tell us?",
    a: "Conduct risk built from recorded incidents and source evidence \u2014 not a bought-in rating.",
  },
  {
    q: "Who do they depend on?",
    a: "Fourth-party and supply-chain dependencies identified across 18 source types, with relationship direction mapped.",
  },
  {
    q: "Where could disruption reach them?",
    a: "Delivery locations matched to travel advisories, health notices and disaster alerts. Ports and shipping lanes. Country profiles.",
  },
  {
    q: "What is changing around them?",
    a: "World news, official advisories, U.S. economic intelligence, macro trends and daily market indicators.",
  },
  {
    q: "What happens if they fail?",
    a: "Risk simulation: pick a company, run the failure, see what it touches.",
  },
  {
    q: "What matters first?",
    a: "A daily executive briefing with consolidated events, prioritized by company and severity.",
  },
];

/**
 * The product's sector vocabulary, hardcoded ONLY as a fallback for when
 * GET /api/sectors cannot be reached (item 7).
 */
const FALLBACK_SECTORS = [
  "Financial Services (Banking)",
  "Insurance",
  "Capital Markets / Asset Management",
  "Healthcare",
  "Technology",
  "Energy & Utilities",
  "Manufacturing",
  "Transportation & Logistics",
];

const labelFor = (key: string) =>
  TIERS.find((t) => t.key === key)?.label ?? "";

type ApiResult = {
  ok: boolean;
  code: string;
  message: string;
  fields?: string[];
};

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

const Signal = () => {
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedBilling, setSelectedBilling] = useState("");
  const [billingError, setBillingError] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>(FALLBACK_SECTORS);
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  // Load the Turnstile script once, and only when a site key exists.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const id = "cf-turnstile-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    // Implicit rendering: Cloudflare finds every .cf-turnstile element
    // and injects a hidden `cf-turnstile-response` input into the
    // enclosing form, which is what handleSubmit reads.
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  // The industry list, from the product rather than from this file.
  // Failure is silent ON PURPOSE: the fallback is already rendered.
  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/sectors`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const rows = data?.sectors;
        if (cancelled || !Array.isArray(rows) || !rows.length) return;
        const labels = rows
          .map((s: { label?: string }) => (s?.label ?? "").trim())
          .filter(Boolean);
        if (labels.length) setSectors(labels);
      })
      .catch(() => {
        /* keep FALLBACK_SECTORS */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
    setBillingError(false);
    setSelectedBilling("");
  };

  const selectTier = (tier: string) => {
    handleTierChange(tier);

    window.setTimeout(() => {
      document
        .getElementById("request")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const val = (id: string) => {
      const el = form.elements.namedItem(id) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | null;
      return (el?.value ?? "").trim();
    };

    // Mirrors the server's mandatory set exactly (2026-08-08, Frank:
    // "all input fields are mandatory"). Phone stays optional by design.
    const required: [string, string][] = [
      ["company", "Company name"],
      ["first", "First name"],
      ["last", "Last name"],
      ["email", "Work email"],
      ["role", "Your role"],
      ["industry", "Industry"],
      ["tier", "Tier of interest"],
    ];

    const missing = required.filter(([id]) => !val(id)).map(([, lbl]) => lbl);

    // A billing preference is required only for a checkout-priced tier.
    const needsBilling = PRICED_TIERS.includes(selectedTier);
    if (needsBilling && !selectedBilling) {
      missing.push("Billing preference");
      setBillingError(true);
    } else {
      setBillingError(false);
    }

    if (missing.length) {
      setInvalid(missing);
      setResult({
        ok: false,
        code: "missing_fields",
        message: "Required: " + missing.join(", ") + ".",
        fields: missing,
      });
      return;
    }

    setInvalid([]);
    setSending(true);
    setResult(null);

    const token =
      (form.elements.namedItem("cf-turnstile-response") as HTMLInputElement | null)
        ?.value ?? "";

    try {
      const resp = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          org: val("company"),
          first: val("first"),
          last: val("last"),
          suffix: val("suffix"),
          email: val("email"),
          role: val("role"),
          phone: val("phone"),
          industry: val("industry"),
          tier: selectedTier,
          interval: needsBilling ? selectedBilling : "",
          message: val("notes"),
          // Honeypot. Hidden from people; bots fill everything.
          company_website: val("company_website"),
          turnstile_token: token,
        }),
      });
      const data: ApiResult = await resp.json();
      setResult(data);
      setInvalid(data.fields ?? []);
      if (!data.ok) window.turnstile?.reset(turnstileRef.current ?? undefined);
    } catch {
      // Network or CORS failure - never claim the request was received.
      setResult({
        ok: false,
        code: "network_error",
        message:
          "We could not reach our servers. Please check your connection " +
          "and try again, or email contact@hatfield.ai with the subject " +
          '"Registration".',
      });
      window.turnstile?.reset(turnstileRef.current ?? undefined);
    } finally {
      setSending(false);
    }
  };

  const domainStyle =
    "relative pl-[15px] pb-[13px] text-[13px] leading-[1.42] before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1 before:h-1 before:rounded-full before:bg-[#2F6BFF]";

  const tierLinkStyle =
    "font-semibold text-[#1B56A6] hover:text-[#2F6BFF] transition-colors cursor-pointer underline-offset-4 hover:underline";

  const fieldStyle = (label: string) =>
    "text-sm text-[#101828] bg-white border rounded-lg px-3 py-[11px] w-full outline-none focus:border-[#2F6BFF] " +
    (invalid.includes(label) ? "border-[#B23B3B]" : "border-[#E2E7EF]");

  const billingDisabled = !PRICED_TIERS.includes(selectedTier);

  const billingPlaceholder =
    selectedTier === "demo"
      ? "Not applicable"
      : selectedTier === "enterprise"
      ? "Arranged with our team"
      : selectedTier === ""
      ? "Select tier first"
      : "Select";

  const renderCapability = (c: Capability) => (
    <>
      {c.main}
      {c.detail && (
        <span className="text-[#667085]"> &mdash; {c.detail}</span>
      )}
    </>
  );

  const renderPrice = (value: string, note?: string) => (
    <>
      <span className={value === "Free" ? "font-semibold text-[#16803C]" : ""}>
        {value}
      </span>
      {note && (
        <span className="block text-[11px] font-normal text-[#667085] mt-[3px] leading-[1.35]">
          {note}
        </span>
      )}
    </>
  );

  const kicker =
    "m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase leading-[1.5]";

  return (
    <div
      className="min-h-screen bg-white text-[#101828]"
      style={{
        fontFamily: 'Inter, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      {/* HEADER */}
      <header className="bg-[#071326] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] py-[22px] flex items-center justify-between gap-6">
          <a href="/" className="no-underline">
            <div className="text-white text-[28px] md:text-[30px] font-semibold tracking-[-0.035em] leading-none">
              Hatfield<span className="text-[#5A8CFF]">.ai</span>
            </div>

            <div className="text-[11px] font-normal text-[#7CA4FF] mt-[6px] tracking-[0.02em]">
              The Intelligent Choice
            </div>
          </a>

          <div className="flex items-center gap-5 md:gap-7">
            {/* Item 10: sentence case in the DOM, uppercased in CSS. */}
            <p className="hidden md:block m-0 text-[11px] font-semibold tracking-[0.13em] text-white/70 uppercase">
              Your GPS for business decisions
            </p>

            {/* Item 9: /login, not the app root. */}
            <a
              href={SIGNAL_LOGIN_URL}
              className="px-[16px] py-[10px] border border-white/35 rounded-[7px] text-white no-underline text-[13px] font-medium hover:border-white/60 transition-colors"
            >
              Client sign in
            </a>
          </div>
        </div>
      </header>

      {/* HERO - tear sheet page 1 (item 16) */}
      <section className="bg-[#071326] text-white py-[72px] md:pb-[76px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <p className="text-[24px] md:text-[30px] font-semibold tracking-[0.26em] m-0 mb-6 text-[#7CA4FF]">
              SIGNAL
            </p>

            <p className="m-0 mb-4 text-[11px] font-semibold tracking-[0.15em] text-[#7CA4FF] uppercase">
              The signal is already there.
            </p>

            <h1 className="m-0 font-serif text-[34px] sm:text-[42px] lg:text-[50px] font-semibold leading-[1.08] tracking-[-0.03em] max-w-[18ch]">
              Know before risk becomes your news headline.
            </h1>

            <p className="mt-7 mb-0 text-[#B8C4D6] text-base max-w-[62ch] leading-7">
              SIGNAL watches the companies that matter to you &mdash; and
              connects what is changing across financials, cyber, sanctions,
              litigation, regulation, corporate events, geopolitics and supply
              chain. Know what changed. Know what matters. Know where to act.
            </p>
          </div>

          <div className="flex flex-wrap gap-[10px] lg:pb-1">
            {/* Item 11: the term is in the button. */}
            <button
              type="button"
              onClick={() => selectTier("demo")}
              className="inline-block px-[18px] py-[11px] rounded-[7px] border-0 cursor-pointer text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors"
            >
              Start your free 10-business-day trial
            </button>

            {SAMPLE_REPORT_URL && (
              <a
                href="#sample"
                className="inline-block px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold border border-white/35 text-white hover:border-white/60 transition-colors"
              >
                Sample risk report
              </a>
            )}
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="pt-16 pb-[10px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px]">

          {/* NARRATIVE BLOCK - one statement of the pricing model on the
              page (2026-09-18 ruling), copy from tear sheet page 1. */}
          <section className="max-w-[1120px] mx-auto mb-[64px]">

            {/* Lede + stats */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16">
              <div className="lg:max-w-[46%]">
                <h2 className="m-0 font-serif text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.03em] text-[#0A1A33]">
                  Signal.
                  <br />
                  <span className="italic font-normal text-[#98A2B3]">
                    Not noise.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-7 lg:pt-3 lg:min-w-[380px]">
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    ~900
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    curated data sources
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    3
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    financial-health models &mdash; Piotroski F-Score, Altman
                    Z-Score, Merton
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    15+
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    sanctions &amp; export-control lists
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    230+
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    countries &amp; territories
                  </p>
                </div>
              </div>
            </div>

            {/* Noise resolving into one signal. Decorative only. */}
            <svg
              viewBox="0 0 800 60"
              aria-hidden="true"
              focusable="false"
              className="mt-10 w-full h-[54px]"
              preserveAspectRatio="none"
            >
              <path d="M 0 37 L 8 22 L 15 40 L 23 23 L 30 37 L 38 22 L 46 35 L 53 23 L 61 38 L 68 21 L 76 34 L 84 24 L 91 34 L 99 20 L 106 39 L 114 26 L 122 41 L 129 19 L 137 38 L 144 22 L 152 35 L 160 26 L 167 37 L 175 26 L 182 35 L 190 25 L 198 34 L 205 23 L 213 37 L 220 20 L 228 37 L 236 22 L 243 37 L 251 22 L 258 37 L 266 24 L 274 41 L 281 19 L 289 40 L 296 21 L 304 36 L 312 25 L 319 36 L 327 26 L 334 39 L 342 23 L 350 40 L 357 24 L 365 41 L 372 20 L 380 34 L 388 25 L 395 40 L 403 23 L 410 41 L 418 24 L 426 34 L 433 22 L 441 39 L 448 24 L 456 34 L 464 24 L 471 41 L 479 21 L 486 34 L 494 25 L 496 30" fill="none" stroke="#C3CCDA" strokeWidth="1.5" />
              <path d="M 496 30 L 600 30 L 618 30 L 630 8 L 642 52 L 654 30 L 672 30 L 762 30" fill="none" stroke="#2F6BFF" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="762" cy="30" r="4.5" fill="#2F6BFF" />
            </svg>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* The problem */}
            <p className={kicker}>The problem</p>

            <div className="mt-5 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
              <h3 className="m-0 lg:max-w-[46%] font-serif font-normal text-[26px] md:text-[30px] leading-[1.18] tracking-[-0.025em] text-[#0A1A33]">
                You don&rsquo;t have an information problem.{" "}
                <span className="text-[#2F6BFF]">
                  You have a signal problem.
                </span>
              </h3>

              <p className="m-0 lg:max-w-[46%] text-[13px] leading-[1.75] text-[#475467]">
                The warning signs rarely arrive as one obvious alert. They
                appear fragmented &mdash; across financials, litigation, cyber,
                sanctions, news, regulation and the world around the company.
                SIGNAL connects those signals before they become the headline.
              </p>
            </div>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* How it works */}
            <p className={kicker}>How it works</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Know what changed.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Intelligence signals curated from ~900 global data sources
                  &mdash; regulators, courts, filings, exchanges, cyber
                  authorities, news, markets, shipping and geopolitical sources.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Know what matters.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Every item is tied to the right legal entity, tested for
                  materiality and consolidated into one event. Duplicate and
                  low-value noise is filtered before it reaches you.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Know where to act.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Severity-ranked, read against your portfolio and summed up in
                  one daily brief &mdash; one click from the original source.
                </p>
              </div>
            </div>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* Pricing model + provenance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className={kicker}>Priced for the portfolio, not the person</p>

                <h3 className="mt-5 mb-0 font-serif font-normal text-[24px] md:text-[27px] leading-[1.2] tracking-[-0.025em] text-[#0A1A33]">
                  10 users or 1,000. One price.
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  You pay for the companies you monitor, never for the seat. One
                  subscription replaces a stack of feeds. Plans from{" "}
                  {FROM_MONTHLY} a month.
                </p>
              </div>

              <div>
                <p className={kicker}>Built by a practitioner</p>

                <h3 className="mt-5 mb-0 font-serif font-normal text-[24px] md:text-[27px] leading-[1.2] tracking-[-0.025em] text-[#0A1A33]">
                  Built by someone who has sat in the chair.
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  Over thirty years of experience at Morgan Stanley, J.P. Morgan,
                  Merrill Lynch, Barclays, SMBC and Bloomberg, shaped around one
                  question: what do I need to know before I am blindsided?
                </p>
              </div>
            </div>
          </section>

          {/* PRICING INTRO - tear sheet page 2. The "10 users or 1,000"
              line is NOT repeated here (item 16). */}
          <div className="mb-8">
            <p className={kicker}>One subscription. Unlimited users.</p>

            <h2 className="mt-4 mb-0 font-serif text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A1A33]">
              Enterprise intelligence. Priced for the portfolio.
            </h2>

            <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[#475467] max-w-[70ch]">
              Monitor the companies that matter. Give the intelligence to
              everyone who needs it.
            </p>
          </div>

          {/* DESKTOP MATRIX - rendered from TIER_ROWS and DOMAINS */}
          <div className="hidden xl:grid grid-cols-[118px_124px_120px_136px_repeat(4,minmax(0,1fr))] bg-white border-y border-[#E2E7EF]">

            {/* GROUP HEADERS */}
            <div className="col-span-4 px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
              Subscription
            </div>

            <div className="col-span-4 px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
              Included with every subscription
            </div>

            {/* COLUMN HEADERS */}
            {[
              "Plan",
              "Companies",
              "Monthly",
              "Annual",
              ...DOMAINS.map((d) => d.title),
            ].map((heading) => (
              <div
                key={heading}
                className="px-4 py-[15px] border-b border-[#E2E7EF] bg-[#F6F8FB] text-[12px] font-semibold text-[#0A1A33]"
              >
                {heading}
              </div>
            ))}

            {/* TIER ROWS */}
            {TIER_ROWS.map((row, i) => {
              const gridRow = 3 + i;
              const cell =
                "px-4 py-[15px] border-b border-[#E2E7EF]" +
                (row.popular ? " bg-[#EEF4FC]" : "");
              return (
                <div key={row.key} className="contents">
                  <div className={cell} style={{ gridColumn: 1, gridRow }}>
                    {row.popular && (
                      <span className="block text-[10px] font-bold tracking-[0.08em] text-[#2F6BFF] mb-1">
                        MOST POPULAR
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => selectTier(row.key)}
                      className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
                    >
                      {row.label}
                    </button>

                    {row.note && (
                      <span className="block font-normal text-[11px] text-[#667085] mt-[3px]">
                        {row.note}
                      </span>
                    )}
                  </div>

                  <div className={cell} style={{ gridColumn: 2, gridRow }}>
                    {row.companies}
                  </div>

                  <div
                    className={`${cell} font-semibold`}
                    style={{ gridColumn: 3, gridRow }}
                  >
                    {renderPrice(row.monthly, row.monthlyNote)}
                  </div>

                  <div
                    className={`${cell}${row.key === "demo" ? " text-[#667085]" : ""}`}
                    style={{ gridColumn: 4, gridRow }}
                  >
                    {renderPrice(row.annual, row.annualNote)}
                  </div>
                </div>
              );
            })}

            {/* DOMAIN COLUMNS - each spans every tier row */}
            {DOMAINS.map((domain, i) => (
              <div
                key={domain.title}
                className="px-4 pt-[17px] pb-[15px] border-b border-[#E2E7EF]"
                style={{
                  gridColumn: 5 + i,
                  gridRow: `3 / span ${TIER_ROWS.length}`,
                }}
              >
                <ul className="list-none m-0 p-0">
                  {domain.items.map((item) => (
                    <li key={item.main} className={domainStyle}>
                      {renderCapability(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* TABLET / MOBILE - same TIER_ROWS and DOMAINS */}
          <div className="xl:hidden">
            <div className="text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase border-b border-[#E2E7EF] pb-4">
              Subscription
            </div>

            <div className="divide-y divide-[#E2E7EF]">
              {TIER_ROWS.map((row) => (
                <div
                  key={row.key}
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 ${
                    row.popular ? "bg-[#EEF4FC] px-4" : ""
                  }`}
                >
                  <div>
                    {row.popular && (
                      <span className="block text-[9px] font-bold tracking-[0.08em] text-[#2F6BFF] mb-1">
                        MOST POPULAR
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => selectTier(row.key)}
                      className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
                    >
                      {row.label}
                    </button>

                    {row.note && (
                      <span className="block text-[11px] text-[#667085] mt-[3px]">
                        {row.note}
                      </span>
                    )}
                  </div>

                  <div className="text-sm">
                    <span className="block text-[10px] text-[#667085] uppercase mb-1">
                      Companies
                    </span>
                    {row.companies}
                  </div>

                  <div className="text-sm">
                    <span className="block text-[10px] text-[#667085] uppercase mb-1">
                      Monthly
                    </span>
                    {renderPrice(row.monthly, row.monthlyNote)}
                  </div>

                  <div className="text-sm">
                    <span className="block text-[10px] text-[#667085] uppercase mb-1">
                      Annual
                    </span>
                    {renderPrice(row.annual, row.annualNote)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase border-b border-[#E2E7EF] pb-4">
              Included with every subscription
            </div>

            <div className="grid md:grid-cols-2 gap-0 border-b border-[#E2E7EF]">
              {DOMAINS.map((domain) => (
                <div
                  key={domain.title}
                  className="py-6 md:px-5 border-b md:border-b-0 border-[#E2E7EF]"
                >
                  <h3 className="text-sm font-semibold text-[#0A1A33] mb-5">
                    {domain.title}
                  </h3>

                  <ul className="list-none m-0 p-0">
                    {domain.items.map((item) => (
                      <li key={item.main} className={domainStyle}>
                        {renderCapability(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* PLAN NOTES + FINE PRINT - tear sheet page 2, plus the tax
              sentence kept on the web page (item 18). */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 lg:gap-12">
            <div className="text-[12px] text-[#667085] leading-[1.6]">
              <p className="m-0">
                Enterprise additional-company charges apply only to companies
                above 200.
              </p>
              <p className="mt-3 mb-0">
                Every paid SIGNAL plan includes unlimited users and all
                standalone SIGNAL capabilities.
              </p>
            </div>

            <p className="m-0 text-[12px] text-[#667085] leading-[1.6]">
              <strong className="text-[#101828] font-semibold">
                Annual billing includes two months free.
              </strong>{" "}
              Trial covers companies we pre-select, read-only, with no
              on-demand financial or sanctions assessments. Out-of-portfolio
              financial viability assessments are $65 each and sanctions
              screenings are $32 each, introductory pricing. Private-company
              reviews use financials you furnish and are visible only to your
              organization. Financial-health methodologies vary by company type
              and data availability. Every alert carries source evidence,
              severity and an audit trail. AI supports the analysis and your
              organization retains decision authority. Prices are exclusive of
              taxes; any applicable sales or value-added tax is calculated at
              checkout from your billing address.
            </p>
          </div>

          {/* ONE COMPANY, EVERY ANGLE - tear sheet page 3 */}
          <section className="border-t border-[#E2E7EF] pt-[46px] mt-[54px]">
            <p className={kicker}>One company. Every angle that matters.</p>

            <h2 className="mt-4 mb-0 font-serif text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A1A33] max-w-[30ch]">
              The company is the story. SIGNAL sees the whole picture.
            </h2>

            <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[#475467] max-w-[80ch]">
              Financial health and sanctions are only two lenses. SIGNAL
              connects the financial, cyber, legal, regulatory, corporate,
              geopolitical, supply-chain and economic picture around the same
              company.
            </p>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7 border-t border-[#E2E7EF] pt-8">
              {QUESTIONS.map(({ q, a }) => (
                <div key={q}>
                  <h3 className="m-0 font-serif font-normal text-[18px] md:text-[19px] leading-[1.3] tracking-[-0.01em] text-[#0A1A33]">
                    {q}
                  </h3>
                  <p className="mt-2 mb-0 text-[13px] leading-[1.65] text-[#667085]">
                    {a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7 border-t border-[#E2E7EF] pt-8">
              <div>
                <p className={kicker}>Ask SIGNAL</p>
                <p className="mt-2 mb-0 text-[14px] leading-[1.65] text-[#101828]">
                  A thirteenth question? Ask in plain English. SIGNAL answers
                  from your own portfolio evidence and shows where the answer
                  came from.
                </p>
              </div>
              <div>
                <p className={kicker}>Due diligence</p>
                <p className="mt-2 mb-0 text-[14px] leading-[1.65] text-[#101828]">
                  Every company gets a standard or enhanced due-diligence
                  level, and SIGNAL says plainly which factors it could not
                  assess.
                </p>
              </div>
            </div>

            <div className="mt-10 bg-[#071326] rounded-2xl px-6 md:px-[38px] py-[30px] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="m-0 font-serif text-[22px] md:text-[26px] font-semibold text-white leading-[1.2]">
                  Not separate feeds. One intelligence picture.
                </p>
                <p className="mt-2 mb-0 text-[13px] text-[#B8C4D6]">
                  Know before risk becomes your news headline.
                </p>
              </div>

              <button
                type="button"
                onClick={() => selectTier("demo")}
                className="shrink-0 px-[18px] py-[11px] rounded-[7px] border-0 cursor-pointer text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors"
              >
                Start your free trial
              </button>
            </div>
          </section>

          {/* SAMPLE RISK REPORT */}
          {SAMPLE_REPORT_URL && (
            <section
              id="sample"
              className="scroll-mt-8 border-t border-[#E2E7EF] pt-[46px] mt-[54px]"
            >
              <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14 items-start">
                <div>
                  <p className="m-0 text-[12px] font-semibold tracking-[0.16em] text-[#2F6BFF] uppercase">
                    See the output
                  </p>

                  <h2 className="mt-4 mb-0 text-[26px] md:text-[30px] font-semibold tracking-[-0.025em] text-[#0A1A33]">
                    A sample risk report
                  </h2>

                  <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[#475467] max-w-[62ch]">
                    This is a real SIGNAL report on a public company, with
                    nothing added for the brochure. It shows the shape of what
                    lands in front of your team: what changed, why it matters,
                    and the evidence behind it.
                  </p>

                  <ul className="list-none m-0 mt-6 p-0 grid sm:grid-cols-2 gap-x-8">
                    <li className={domainStyle}>
                      Financial health &mdash; reported figures, Piotroski
                      F-Score, Altman Z-Score and Merton analysis, with the
                      trend behind each
                    </li>

                    <li className={domainStyle}>
                      Sanctions and watchlist position, including PEP
                      identification
                    </li>

                    <li className={domainStyle}>
                      Litigation, regulatory and cybersecurity events over the
                      review window
                    </li>

                    <li className={domainStyle}>
                      Geographic and supply-chain exposure, with the sources
                      each finding came from
                    </li>
                  </ul>

                  <p className="mt-6 mb-0 text-[12px] text-[#667085] max-w-[62ch] leading-[1.6]">
                    Every finding carries its source, a severity and an audit
                    trail. AI supports the analysis; your organization retains
                    decision authority.
                  </p>
                </div>

                <div className="bg-[#F6F8FB] rounded-2xl px-6 py-7 w-full">
                  <p className="m-0 text-[13px] font-semibold text-[#0A1A33]">
                    Sample risk report
                  </p>

                  <p className="mt-2 mb-0 text-[12px] text-[#667085] leading-[1.6]">
                    PDF, no sign-up required.
                  </p>

                  <a
                    href={SAMPLE_REPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors"
                  >
                    Open the sample report
                  </a>

                  <p className="mt-4 mb-0 text-[11px] text-[#98A2B3] leading-[1.5]">
                    Opens in a new tab.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* REQUEST ACCESS */}
          <section
            id="request"
            className="scroll-mt-8 bg-[#F6F8FB] rounded-2xl px-6 md:px-[38px] py-[38px] my-[70px]"
          >
            <h2 className="m-0 mb-[6px] text-[26px] font-semibold tracking-[-0.025em] text-[#0A1A33]">
              Request access
            </h2>

            <p className="m-0 mb-[26px] text-sm text-[#667085]">
              Confirm your email address, then our team provisions accounts
              within one business day.
            </p>

            {result?.ok ? (
              <div>
                <p className="text-[15px] font-medium text-[#1B56A6] m-0">
                  {result.message}
                </p>

                <p className="mt-3 mb-0 text-[13px] text-[#667085]">
                  The confirmation link is valid for three days. If it does
                  not arrive, check your spam folder or email{" "}
                  <a
                    href="mailto:contact@hatfield.ai?subject=Registration"
                    className="text-[#1B56A6]"
                  >
                    contact@hatfield.ai
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[18px] gap-y-[15px]">

                  {/* COMPANY */}
                  <div className="flex flex-col gap-[6px] md:col-span-2">
                    <label
                      htmlFor="company"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Company name *
                    </label>

                    <input
                      id="company"
                      name="company"
                      required
                      autoComplete="organization"
                      className={fieldStyle("Company name")}
                    />
                  </div>

                  {/* FIRST NAME */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="first"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      First name *
                    </label>

                    <input
                      id="first"
                      name="first"
                      required
                      autoComplete="given-name"
                      className={fieldStyle("First name")}
                    />
                  </div>

                  {/* LAST NAME */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="last"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Last name *
                    </label>

                    <input
                      id="last"
                      name="last"
                      required
                      autoComplete="family-name"
                      className={fieldStyle("Last name")}
                    />
                  </div>

                  {/* SUFFIX */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="suffix"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Suffix
                    </label>

                    <input
                      id="suffix"
                      name="suffix"
                      placeholder="Jr., III, CFA"
                      className={fieldStyle("Suffix")}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="email"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Work email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldStyle("Work email")}
                    />

                    <span className="text-[11px] text-[#98A2B3]">
                      Corporate address required.
                    </span>
                  </div>

                  {/* ROLE */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="role"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Your role *
                    </label>

                    <input
                      id="role"
                      name="role"
                      required
                      autoComplete="organization-title"
                      className={fieldStyle("Your role")}
                    />
                  </div>

                  {/* PHONE */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="phone"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Phone (optional)
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldStyle("Phone")}
                    />
                  </div>

                  {/* INDUSTRY - options from GET /api/sectors (item 7) */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="industry"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Industry *
                    </label>

                    <select
                      id="industry"
                      name="industry"
                      required
                      className={fieldStyle("Industry")}
                    >
                      <option value="">Select</option>
                      {sectors.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </div>

                  {/* TIER */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="tier"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Tier of interest *
                    </label>

                    <select
                      id="tier"
                      name="tier"
                      required
                      value={selectedTier}
                      onChange={(e) => handleTierChange(e.target.value)}
                      className={fieldStyle("Tier of interest")}
                    >
                      <option value="">Select</option>
                      {TIERS.map((t) => (
                        <option key={t.key} value={t.key}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* BILLING */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="billing"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Billing preference
                      {PRICED_TIERS.includes(selectedTier) && " *"}
                    </label>

                    <select
                      id="billing"
                      name="billing"
                      value={selectedBilling}
                      disabled={billingDisabled}
                      required={PRICED_TIERS.includes(selectedTier)}
                      onChange={(e) => {
                        setSelectedBilling(e.target.value);
                        setBillingError(false);
                      }}
                      className={`text-sm border rounded-lg px-3 py-[11px] w-full outline-none transition-colors ${
                        billingDisabled
                          ? "bg-[#EAECF0] text-[#98A2B3] border-[#D0D5DD] cursor-not-allowed"
                          : billingError
                          ? "bg-white text-[#101828] border-[#B23B3B]"
                          : "bg-white text-[#101828] border-[#E2E7EF] focus:border-[#2F6BFF]"
                      }`}
                    >
                      <option value="">
                        {billingPlaceholder}
                      </option>

                      {!billingDisabled && (
                        <>
                          <option value="monthly">
                            Monthly
                          </option>

                          <option value="annual">
                            Annual
                          </option>
                        </>
                      )}
                    </select>

                    {billingError && (
                      <span className="text-[11px] text-[#B23B3B] mt-[2px]">
                        Please select Monthly or Annual.
                      </span>
                    )}
                  </div>

                  {/* NOTES */}
                  <div className="flex flex-col gap-[6px] md:col-span-2">
                    <label
                      htmlFor="notes"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Anything we should know?
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      className="min-h-[72px] text-sm text-[#101828] bg-white border border-[#E2E7EF] rounded-lg px-3 py-[11px] w-full outline-none resize-y focus:border-[#2F6BFF]"
                    />
                  </div>
                </div>

                {/* HONEYPOT - hidden from people, assistive tech, tab order
                    and autofill (item 6). */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="company_website">
                    Company website (leave blank)
                  </label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {TURNSTILE_SITE_KEY && (
                  <div
                    ref={turnstileRef}
                    className="cf-turnstile mt-[18px]"
                    data-sitekey={TURNSTILE_SITE_KEY}
                    data-theme="light"
                  />
                )}

                {result && !result.ok && (
                  <p
                    role="alert"
                    className="mt-[18px] mb-0 text-[13px] text-[#B23B3B]"
                  >
                    {result.message}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-[22px]">
                  <button
                    type="submit"
                    disabled={sending}
                    className={`inline-block px-[18px] py-[11px] rounded-[7px] text-[13px] font-semibold border-0 text-white transition-colors ${
                      sending
                        ? "bg-[#98A2B3] cursor-not-allowed"
                        : "bg-[#2F6BFF] hover:bg-[#245CE0] cursor-pointer"
                    }`}
                  >
                    {sending ? "Sending\u2026" : "Request access"}
                  </button>

                  <p className="m-0 text-[12px] text-[#667085]">
                    We use your details only to provision and support your
                    account.
                    {selectedTier && (
                      <>
                        {" "}
                        You selected{" "}
                        <strong className="text-[#101828]">
                          {labelFor(selectedTier)}
                        </strong>
                        .
                      </>
                    )}
                  </p>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#071326] text-[#8FA2BC] text-[12px] py-[27px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] flex flex-col sm:flex-row gap-4 justify-between">
          {/* Item 12: the d/b/a. */}
          <p className="m-0">
            Hatfield Advisory LLC d/b/a Hatfield.ai, St. Petersburg, Florida
          </p>

          <p className="m-0">
            <a
              href="#request"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Request access
            </a>

            {SAMPLE_REPORT_URL && (
              <>
                {"  \u00b7  "}

                <a
                  href="#sample"
                  className="text-[#C8D3E3] no-underline hover:text-white"
                >
                  Sample risk report
                </a>
              </>
            )}

            {"  \u00b7  "}

            <a
              href="/contact"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Contact us
            </a>

            {"  \u00b7  "}

            {/* Item 9: /login, not the app root. */}
            <a
              href={SIGNAL_LOGIN_URL}
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Client sign in
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signal;