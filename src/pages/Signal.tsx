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
// 8. PRICES. Every published figure rose ~8% (Frank, 2026-09-17) so the
//    cost of taking payment - card processing, Stripe Billing, Stripe
//    Tax - sits inside the list price instead of being surcharged at
//    checkout. Watch 1,575 / 15,750, Monitor 4,875 / 48,750, Portfolio
//    10,250 / 102,500; out-of-portfolio FVA 65 and sanctions screen 32.
//    These figures appear THREE times in this file (desktop matrix,
//    mobile list, fine print) and are also held in the product's
//    dal.TIERS. Changing one without the others is the defect that put
//    $10 in a signed agreement while the product charged $59.
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
//    second hostname in this file to drift. Every other sign-in link in
//    the product (billing emails, Stripe success_url, the app's own
//    masthead) already targets /login; these two were the only ones
//    that did not.
//
// ENV (Vercel project settings):
//   VITE_SIGNAL_API_BASE      default https://signal.hatfield.ai
//   VITE_TURNSTILE_SITE_KEY   Cloudflare Turnstile site key. Unset =>
//                             the widget is not rendered and the server
//                             falls back to the honeypot and its rolling
//                             throttle. Matches the server's behaviour
//                             when SVC_TURNSTILE_SECRET is unset, so the
//                             page works before the Cloudflare account
//                             exists.

import { FormEvent, useEffect, useRef, useState } from "react";

const API_BASE =
  (import.meta as any).env?.VITE_SIGNAL_API_BASE ?? "https://signal.hatfield.ai";

/**
 * Where "Client sign in" goes - the app's /login route, NOT its root.
 *
 * 2026-09-19 (Frank): the root of the SIGNAL app is its own landing
 * page (surveillance_svc_app.route() falls through to landing_layout()
 * for "/"), so linking the bare host sent clients to a second pricing
 * page instead of the sign-in screen. Built from API_BASE so a staging
 * build signs in to staging - one hostname in this file, not two.
 */
const SIGNAL_LOGIN_URL = `${API_BASE.replace(/\/+$/, "")}/login`;

const TURNSTILE_SITE_KEY =
  (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY ?? "";

/**
 * The published sample report, served BY THE APP, not by this site.
 *
 * 2026-09-18 (Frank): moved off Vercel public/ once it turned out the
 * product already had a purpose-built route for exactly this -
 * surveillance_svc_app.py answers GET /sample-risk-report from the PDF
 * sitting beside the module, 404s honestly when it is absent, and its
 * own landing CTA self-omits in that case. Hosting it there means the
 * document is replaced by dropping a new file on the droplet: no site
 * rebuild, no Vercel deploy, and one copy of the asset rather than two
 * that drift.
 *
 * Absolute and cross-origin on purpose. The anchor below is
 * target="_blank" with rel="noopener noreferrer" and carries NO
 * download attribute - browsers IGNORE `download` cross-origin, so
 * asking for one would quietly get an inline tab regardless. Inline is
 * what we want here anyway: the prospect reads it without a file
 * landing in their Downloads folder.
 *
 * 2026-09-18 (earlier the same day): both "Sample risk report" links
 * used to point at #sample and NOTHING ON THE PAGE HAD THAT ID - so the
 * hero button and the footer link had always scrolled nowhere and
 * swallowed the click. A dead link on the pricing page is the worst
 * thing a prospect can click while they are evaluating: it reads as a
 * broken site, and they do not report it.
 *
 * Set to "" and the section, the hero button and the footer link all
 * disappear together - the page cannot offer a sample it does not have.
 * Set it to the URL and all three appear. There is no state in which a
 * visitor is offered something that is not there.
 */
const SAMPLE_REPORT_URL = "https://signal.hatfield.ai/sample-risk-report";

/**
 * Tier KEYS as the server knows them, with the label this page shows.
 * The key is what gets posted. "Trial" is the published name for the
 * tier keyed 'demo' - the key is load-bearing on the server (the demo
 * activation path refuses a token whose tier is not exactly 'demo', and
 * the Stripe price env names are built from it), so the label is what
 * changes here, never the key.
 */
const TIERS = [
  { key: "demo", label: "Trial" },
  { key: "watch", label: "Watch" },
  { key: "monitor", label: "Monitor" },
  { key: "portfolio", label: "Portfolio" },
  { key: "enterprise", label: "Enterprise" },
] as const;

/**
 * Tiers that carry a price, and therefore a billing interval worth
 * asking about. Mirrors the server's priced_tier() - Trial is free and
 * Enterprise is "Custom", so neither is asked. Keep this in step with
 * the pricing table below.
 */
const PRICED_TIERS = ["watch", "monitor", "portfolio"];

/**
 * Watch monthly, written ONCE.
 *
 * 2026-09-18: this figure appeared twice already - the desktop matrix
 * cell and the mobile row array - and the narrative block above the
 * matrix would have made three. The artwork that block came from said
 * $1,450, the PRE-gross-up price, which would have sat a few hundred
 * pixels above a matrix reading $1,575 on the one page where a buyer
 * decides whether to trust our numbers. One constant, three readers.
 */
const WATCH_MONTHLY = "$1,575";

/**
 * The product's sector vocabulary, hardcoded ONLY as a fallback for when
 * GET /api/sectors cannot be reached. These are the server's own labels
 * (dal.REG_SECTOR_LABELS), so a selection made offline still resolves to
 * a real sector when the registration screen reads it back.
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
    // enclosing form, which is what handleSubmit reads. Explicit
    // rendering would need a global onload callback and buys nothing
    // here - there is one widget on the page.
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  // The industry list, from the product rather than from this file.
  // Failure is silent ON PURPOSE: the fallback is already rendered, and
  // a prospect filling in a form does not need to be told that a
  // background fetch missed. Anything unexpected in the payload is
  // ignored rather than rendered, so a malformed response cannot empty
  // the dropdown.
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
    // Validating here is a courtesy - the server decides, because a
    // disabled or hidden input can still be posted.
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

    // A billing preference is required only for a tier that has a price.
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
      ? "Custom pricing"
      : selectedTier === ""
      ? "Select tier first"
      : "Select";

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

          {/* 2026-09-19: /login, not the app root - see item 9 above. */}
          <a
            href={SIGNAL_LOGIN_URL}
            className="px-[16px] py-[10px] border border-white/35 rounded-[7px] text-white no-underline text-[13px] font-medium hover:border-white/60 transition-colors"
          >
            Client sign in
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#071326] text-white py-[72px] md:pb-[76px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <p className="text-[24px] md:text-[30px] font-semibold tracking-[0.26em] m-0 mb-6 text-[#7CA4FF]">
              SIGNAL
            </p>

            <h1 className="m-0 text-[34px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.08] tracking-[-0.035em] max-w-[20ch]">
              Know what changed.
              <br />
              Know what matters.
              <br />
              Know where to act.
            </h1>

            <p className="mt-7 mb-0 text-[#B8C4D6] text-base max-w-[60ch] leading-6">
              Continuous intelligence at the speed of business.
              <br />
              Know what matters, when it matters.
            </p>
          </div>

          <div className="flex flex-wrap gap-[10px] lg:pb-1">
            <button
              type="button"
              onClick={() => selectTier("demo")}
              className="inline-block px-[18px] py-[11px] rounded-[7px] border-0 cursor-pointer text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors"
            >
              Start a free trial
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

          {/* ---------------------------------------------------------
              NARRATIVE BLOCK (2026-09-18, Frank)

              Replaces the former "One subscription. Unlimited users."
              section, which made the same tenant-pricing point this
              block now makes in Frank's own words. Two sections saying
              it four seconds apart, in different numbers (100 users vs
              1,000), read as drafting rather than design - so there is
              one statement of the pricing model on this page, and it is
              this one.

              PRICE: the "from" figure reads WATCH_MONTHLY, the same
              constant both pricing tables now render. The artwork this
              block came from said $1,450 - the PRE-gross-up number -
              which would have sat a few hundred pixels above a matrix
              reading $1,575, on the one page where a buyer decides
              whether to trust our figures. TIERS carries no price, so
              there was nothing to derive it from; the constant was
              introduced instead and the two existing hardcoded copies
              now read it too.
          ------------------------------------------------------------- */}
          <section className="max-w-[1120px] mx-auto mb-[64px]">

            {/* Lede */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16">
              <div className="lg:max-w-[46%]">
                <p className="m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase leading-[1.5]">
                  Every headline was once a signal someone missed.
                </p>

                <h2 className="mt-5 mb-0 font-serif text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.03em] text-[#0A1A33]">
                  Signal.
                  <br />
                  <span className="italic font-normal text-[#98A2B3]">
                    Not noise.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-7 lg:pt-3 lg:min-w-[340px]">
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    847
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    curated global sources
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    21
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    live intelligence surfaces
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    12
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    sanctions &amp; export-control lists
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    234
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    countries &amp; territories
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-9 mb-0 max-w-[76ch] text-[15px] md:text-[16px] leading-[1.7] text-[#475467]">
              SIGNAL watches the companies that matter to you &mdash; suppliers,
              counterparties, clients and targets &mdash; and tells you what changed,
              why it matters and where to act. Before it becomes the headline.
            </p>

            {/* Noise resolving into one signal. Decorative: the figure
                restates the sentence above it and carries no data, so it
                is hidden from assistive tech rather than described. */}
            <svg
              viewBox="0 0 800 60"
              aria-hidden="true"
              focusable="false"
              className="mt-8 w-full h-[54px]"
              preserveAspectRatio="none"
            >
              <path d="M 0 37 L 8 22 L 15 40 L 23 23 L 30 37 L 38 22 L 46 35 L 53 23 L 61 38 L 68 21 L 76 34 L 84 24 L 91 34 L 99 20 L 106 39 L 114 26 L 122 41 L 129 19 L 137 38 L 144 22 L 152 35 L 160 26 L 167 37 L 175 26 L 182 35 L 190 25 L 198 34 L 205 23 L 213 37 L 220 20 L 228 37 L 236 22 L 243 37 L 251 22 L 258 37 L 266 24 L 274 41 L 281 19 L 289 40 L 296 21 L 304 36 L 312 25 L 319 36 L 327 26 L 334 39 L 342 23 L 350 40 L 357 24 L 365 41 L 372 20 L 380 34 L 388 25 L 395 40 L 403 23 L 410 41 L 418 24 L 426 34 L 433 22 L 441 39 L 448 24 L 456 34 L 464 24 L 471 41 L 479 21 L 486 34 L 494 25 L 496 30" fill="none" stroke="#C3CCDA" strokeWidth="1.5" />
              <path d="M 496 30 L 600 30 L 618 30 L 630 8 L 642 52 L 654 30 L 672 30 L 762 30" fill="none" stroke="#2F6BFF" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="762" cy="30" r="4.5" fill="#2F6BFF" />
            </svg>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* The problem */}
            <p className="m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase">
              The problem
            </p>

            <div className="mt-5 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
              <h3 className="m-0 lg:max-w-[46%] font-serif text-[26px] md:text-[30px] leading-[1.18] tracking-[-0.025em] text-[#0A1A33]">
                You don&rsquo;t have an information problem. You have a signal problem.
              </h3>

              <p className="m-0 lg:max-w-[46%] text-[13px] leading-[1.75] text-[#475467]">
                Today the picture is scattered across a dozen feeds &mdash; financial
                health, litigation, cyber, sanctions, and news and social media
                alerts. None of them talk to each other. None tell you what it
                means for you or your portfolio. And the platforms that do
                consolidate data are expensive, charging $10,000&ndash;$35,000 per
                user p.a.
              </p>
            </div>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* How it works */}
            <p className="m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase">
              How it works
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-medium tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Know what changed.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  847 curated sources watched around the clock &mdash; regulators, courts, filings, exchanges, shipping lanes and national cyber agencies.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-medium tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Know what matters.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Every item tied to the right legal entity, tested for materiality and folded into one event. The noise never reaches your desk.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-medium tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Know where to act.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Severity-ranked, read against your portfolio and summed up in one daily brief &mdash; one click from the original source.
                </p>
              </div>
            </div>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* Pricing model + provenance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className="m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase leading-[1.5]">
                  Priced for the portfolio, not the person
                </p>

                <h3 className="mt-5 mb-0 font-serif text-[24px] md:text-[27px] leading-[1.2] tracking-[-0.025em] text-[#0A1A33]">
                  25 companies. 10 users or 1,000. One price.
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  You pay for the companies you monitor, never for the seat. One
                  subscription replaces a stack of feeds. Plans from{" "}
                  {WATCH_MONTHLY} a month.
                </p>
              </div>

              <div>
                <p className="m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase leading-[1.5]">
                  Built by a practitioner
                </p>

                <h3 className="mt-5 mb-0 font-serif text-[24px] md:text-[27px] leading-[1.2] tracking-[-0.025em] text-[#0A1A33]">
                  The right information, at the right time, is the decision.
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  Thirty years inside Morgan Stanley, J.P. Morgan, Merrill Lynch,
                  Barclays, SMBC and Bloomberg &mdash; not a vendor sprinkling AI on a
                  feed.
                </p>
              </div>
            </div>
          </section>

          {/* DESKTOP MATRIX */}
          <div className="hidden xl:grid grid-cols-[118px_124px_104px_132px_repeat(4,minmax(0,1fr))] bg-white border-y border-[#E2E7EF]">

            {/* GROUP HEADERS */}
            <div className="col-span-4 px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
              Subscription
            </div>

            <div className="col-span-4 px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
              Included with every subscription
            </div>

            {/* COLUMN HEADERS */}
            {[
              "Tier",
              "Companies",
              "Monthly",
              "Annual",
              "Financial & economic health",
              "Security, news & reputation",
              "Legal, regulatory & compliance",
              "Supply chain & location risk",
            ].map((heading) => (
              <div
                key={heading}
                className="px-4 py-[15px] border-b border-[#E2E7EF] bg-[#F6F8FB] text-[12px] font-semibold text-[#0A1A33]"
              >
                {heading}
              </div>
            ))}

            {/* TRIAL */}
            <div className="col-start-1 row-start-3 px-4 py-[15px] border-b border-[#E2E7EF]">
              <button
                type="button"
                onClick={() => selectTier("demo")}
                className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
              >
                Trial
              </button>

              <span className="block font-normal text-[11px] text-[#667085] mt-[3px]">
                read-only
              </span>
            </div>

            <div className="col-start-2 row-start-3 px-4 py-[15px] border-b border-[#E2E7EF]">
              15 pre-selected
            </div>

            <div className="col-start-3 row-start-3 px-4 py-[15px] border-b border-[#E2E7EF] font-semibold text-[#16803C]">
              Free
            </div>

            <div className="col-start-4 row-start-3 px-4 py-[15px] border-b border-[#E2E7EF] text-[#667085]">
              10 business days
            </div>

            {/* WATCH */}
            <div className="col-start-1 row-start-4 px-4 py-[15px] border-b border-[#E2E7EF]">
              <button
                type="button"
                onClick={() => selectTier("watch")}
                className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
              >
                Watch
              </button>
            </div>

            <div className="col-start-2 row-start-4 px-4 py-[15px] border-b border-[#E2E7EF]">
              Up to 25
            </div>

            <div className="col-start-3 row-start-4 px-4 py-[15px] border-b border-[#E2E7EF] font-semibold">
              {WATCH_MONTHLY}
            </div>

            <div className="col-start-4 row-start-4 px-4 py-[15px] border-b border-[#E2E7EF]">
              $15,750
            </div>

            {/* MONITOR */}
            <div className="col-start-1 row-start-5 px-4 py-[15px] border-b border-[#E2E7EF] bg-[#EEF4FC]">
              <span className="block text-[10px] font-bold tracking-[0.08em] text-[#2F6BFF] mb-1">
                MOST POPULAR
              </span>

              <button
                type="button"
                onClick={() => selectTier("monitor")}
                className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
              >
                Monitor
              </button>
            </div>

            <div className="col-start-2 row-start-5 px-4 py-[15px] border-b border-[#E2E7EF] bg-[#EEF4FC]">
              Up to 100
            </div>

            <div className="col-start-3 row-start-5 px-4 py-[15px] border-b border-[#E2E7EF] bg-[#EEF4FC] font-semibold">
              $4,875
            </div>

            <div className="col-start-4 row-start-5 px-4 py-[15px] border-b border-[#E2E7EF] bg-[#EEF4FC]">
              $48,750
            </div>

            {/* PORTFOLIO */}
            <div className="col-start-1 row-start-6 px-4 py-[15px] border-b border-[#E2E7EF]">
              <button
                type="button"
                onClick={() => selectTier("portfolio")}
                className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
              >
                Portfolio
              </button>
            </div>

            <div className="col-start-2 row-start-6 px-4 py-[15px] border-b border-[#E2E7EF]">
              Up to 250
            </div>

            <div className="col-start-3 row-start-6 px-4 py-[15px] border-b border-[#E2E7EF] font-semibold">
              $10,250
            </div>

            <div className="col-start-4 row-start-6 px-4 py-[15px] border-b border-[#E2E7EF]">
              $102,500
            </div>

            {/* ENTERPRISE */}
            <div className="col-start-1 row-start-7 px-4 py-[15px] border-b border-[#E2E7EF]">
              <button
                type="button"
                onClick={() => selectTier("enterprise")}
                className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
              >
                Enterprise
              </button>
            </div>

            <div className="col-start-2 row-start-7 px-4 py-[15px] border-b border-[#E2E7EF]">
              250+
            </div>

            <div className="col-start-3 row-start-7 px-4 py-[15px] border-b border-[#E2E7EF] font-semibold">
              Custom
            </div>

            <div className="col-start-4 row-start-7 px-4 py-[15px] border-b border-[#E2E7EF]">
              Custom
            </div>

            {/* FINANCIAL DOMAIN */}
            <div className="col-start-5 row-start-3 row-span-5 px-4 pt-[17px] pb-[15px] border-b border-[#E2E7EF]">
              <ul className="list-none m-0 p-0">
                <li className={domainStyle}>
                  Financial reporting, two years, with trend analysis
                </li>

                <li className={domainStyle}>
                  Altman Z-score{" "}
                  <span className="text-[#667085]">
                    &mdash; financial resilience
                  </span>
                </li>

                <li className={domainStyle}>
                  Merton default analysis
                </li>

                <li className={domainStyle}>
                  Piotroski F-Score{" "}
                  <span className="text-[#667085]">
                    &mdash; trend analysis
                  </span>
                </li>

                <li className={domainStyle}>
                  Private-company manual FVA
                </li>

                <li className={domainStyle}>
                  Macro indicators{" "}
                  <span className="text-[#667085]">
                    &mdash; eight-year trends, IMF projections
                  </span>
                </li>

                <li className={domainStyle}>
                  Daily indicators{" "}
                  <span className="text-[#667085]">
                    &mdash; indices, bonds, futures, currencies
                  </span>
                </li>
              </ul>
            </div>

            {/* SECURITY DOMAIN */}
            <div className="col-start-6 row-start-3 row-span-5 px-4 pt-[17px] pb-[15px] border-b border-[#E2E7EF]">
              <ul className="list-none m-0 p-0">
                <li className={domainStyle}>
                  Cybersecurity events and vulnerabilities
                </li>

                <li className={domainStyle}>
                  Adverse media and reputational risk
                </li>

                <li className={domainStyle}>
                  Social-media risk signals
                </li>

                <li className={domainStyle}>
                  Sanctions and watchlist screening{" "}
                  <span className="text-[#667085]">
                    &mdash; OFAC, UN, UK OFSI, EU, with PEP coverage
                  </span>
                </li>

                <li className={domainStyle}>
                  World news and geopolitical developments
                </li>
              </ul>
            </div>

            {/* LEGAL DOMAIN */}
            <div className="col-start-7 row-start-3 row-span-5 px-4 pt-[17px] pb-[15px] border-b border-[#E2E7EF]">
              <ul className="list-none m-0 p-0">
                <li className={domainStyle}>
                  Litigation alerts{" "}
                  <span className="text-[#667085]">
                    &mdash; civil, bankruptcy, discrimination, contract, IP,
                    shareholder
                  </span>
                </li>

                <li className={domainStyle}>
                  Applicable regulatory requirements{" "}
                  <span className="text-[#667085]">
                    &mdash; by sector and jurisdiction
                  </span>
                </li>

                <li className={domainStyle}>
                  Regulatory intelligence and rule changes
                </li>

                <li className={domainStyle}>
                  Advisory alerts
                </li>
              </ul>
            </div>

            {/* SUPPLY CHAIN DOMAIN */}
            <div className="col-start-8 row-start-3 row-span-5 px-4 pt-[17px] pb-[15px] border-b border-[#E2E7EF]">
              <ul className="list-none m-0 p-0">
                <li className={domainStyle}>
                  Geographic, geopolitical and climate events
                </li>

                <li className={domainStyle}>
                  Delivery-location exposure{" "}
                  <span className="text-[#667085]">
                    &mdash; disasters, State Department, CDC alerts
                  </span>
                </li>

                <li className={domainStyle}>
                  Country profiles across 230+ countries
                </li>

                <li className={domainStyle}>
                  Fourth-party dependency
                </li>

                <li className={domainStyle}>
                  Port watch{" "}
                  <span className="text-[#667085]">
                    &mdash; shipping routes and choke points
                  </span>
                </li>

                <li className={domainStyle}>
                  Risk simulation
                </li>
              </ul>
            </div>
          </div>

          {/* TABLET / MOBILE */}
          <div className="xl:hidden">
            <div className="text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase border-b border-[#E2E7EF] pb-4">
              Subscription
            </div>

            <div className="divide-y divide-[#E2E7EF]">
              {[
                ["demo", "Trial", "15 pre-selected", "Free", "10 business days"],
                ["watch", "Watch", "Up to 25", WATCH_MONTHLY, "$15,750"],
                ["monitor", "Monitor", "Up to 100", "$4,875", "$48,750"],
                ["portfolio", "Portfolio", "Up to 250", "$10,250", "$102,500"],
                ["enterprise", "Enterprise", "250+", "Custom", "Custom"],
              ].map(([key, tier, companies, monthly, annual]) => (
                <div
                  key={key}
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 ${
                    key === "monitor" ? "bg-[#EEF4FC] px-4" : ""
                  }`}
                >
                  <div>
                    {key === "monitor" && (
                      <span className="block text-[9px] font-bold tracking-[0.08em] text-[#2F6BFF] mb-1">
                        MOST POPULAR
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => selectTier(key)}
                      className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
                    >
                      {tier}
                    </button>
                  </div>

                  <div className="text-sm">
                    <span className="block text-[10px] text-[#667085] uppercase mb-1">
                      Companies
                    </span>
                    {companies}
                  </div>

                  <div className="text-sm">
                    <span className="block text-[10px] text-[#667085] uppercase mb-1">
                      Monthly
                    </span>

                    <span
                      className={
                        monthly === "Free"
                          ? "font-semibold text-[#16803C]"
                          : ""
                      }
                    >
                      {monthly}
                    </span>
                  </div>

                  <div className="text-sm">
                    <span className="block text-[10px] text-[#667085] uppercase mb-1">
                      Annual
                    </span>
                    {annual}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase border-b border-[#E2E7EF] pb-4">
              Included with every subscription
            </div>

            <div className="grid md:grid-cols-2 gap-0 border-b border-[#E2E7EF]">
              {[
                {
                  title: "Financial & economic health",
                  items: [
                    "Financial reporting, two years, with trend analysis",
                    "Altman Z-score \u2014 financial resilience",
                    "Merton default analysis",
                    "Piotroski F-Score \u2014 trend analysis",
                    "Private-company manual FVA",
                    "Macro indicators \u2014 eight-year trends, IMF projections",
                    "Daily indicators \u2014 indices, bonds, futures, currencies",
                  ],
                },
                {
                  title: "Security, news & reputation",
                  items: [
                    "Cybersecurity events and vulnerabilities",
                    "Adverse media and reputational risk",
                    "Social-media risk signals",
                    "Sanctions and watchlist screening \u2014 OFAC, UN, UK OFSI, EU, with PEP coverage",
                    "World news and geopolitical developments",
                  ],
                },
                {
                  title: "Legal, regulatory & compliance",
                  items: [
                    "Litigation alerts \u2014 civil, bankruptcy, discrimination, contract, IP, shareholder",
                    "Applicable regulatory requirements \u2014 by sector and jurisdiction",
                    "Regulatory intelligence and rule changes",
                    "Advisory alerts",
                  ],
                },
                {
                  title: "Supply chain & location risk",
                  items: [
                    "Geographic, geopolitical and climate events",
                    "Delivery-location exposure \u2014 disasters, State Department, CDC alerts",
                    "Country profiles across 230+ countries",
                    "Fourth-party dependency",
                    "Port watch \u2014 shipping routes and choke points",
                    "Risk simulation",
                  ],
                },
              ].map((domain) => (
                <div
                  key={domain.title}
                  className="py-6 md:px-5 border-b md:border-b-0 border-[#E2E7EF]"
                >
                  <h3 className="text-sm font-semibold text-[#0A1A33] mb-5">
                    {domain.title}
                  </h3>

                  <ul className="list-none m-0 p-0">
                    {domain.items.map((item) => (
                      <li key={item} className={domainStyle}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FINE PRINT */}
          <div className="mt-5">
            <p className="m-0 text-[12px] text-[#667085] max-w-[92ch] leading-[1.6]">
              <strong className="text-[#101828] font-semibold">
                Annual billing includes two months free.
              </strong>{" "}
              Trial covers 15 companies we pre-select, read-only, with no
              on-demand financial or sanctions assessments. Out-of-portfolio
              financial viability assessments are $65 each and OFAC sanctions
              screenings are $32 each, introductory pricing. Private-company
              reviews use financials you furnish and are visible only to your
              organization. Financial-health methodologies vary by company type
              and data availability. Every alert carries source evidence,
              severity and an audit trail; AI supports the analysis and your
              organization retains decision authority. Prices are exclusive of
              taxes; any applicable sales or value-added tax is calculated at
              checkout from your billing address.
            </p>
          </div>

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
                      Financial health &mdash; reported figures, Altman Z-score,
                      Merton default analysis and Piotroski F-Score, with the
                      trend behind each
                    </li>

                    <li className={domainStyle}>
                      Sanctions and watchlist position, including PEP coverage
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

                  {/* INDUSTRY */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="industry"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Industry *
                    </label>

                    {/*
                      Options come from GET /api/sectors - the product's
                      own vocabulary - so the selection resolves when the
                      registration screen reads it back. FALLBACK_SECTORS
                      renders until the fetch lands, and stays if it never
                      does. "Other" is last and deliberately outside the
                      vocabulary: it means no sector, which is honest, and
                      sector is optional on the server.
                    */}
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

                {/*
                  HONEYPOT. Hidden from people and from assistive
                  technology, skipped by the tab order, and excluded from
                  autofill - so a value here was not typed by a human.
                  The server treats a filled one as accepted and writes
                  nothing, rather than refusing, because a bot that is
                  told which field betrayed it simply stops filling that
                  field next time.
                */}
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
          <p className="m-0">
            Hatfield Advisory LLC, St. Petersburg, Florida
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

            {/* 2026-09-19: /login, not the app root - see item 9 above. */}
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