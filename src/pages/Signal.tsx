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
//     (2026-11-05: now "14-calendar-day", see item 31.)
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
// 2026-10-19. TWO MORE, MATCHING THE NEW NEXUS PAGE.
//
// 24. "SIGNAL OVERVIEW" (Frank: "we should add signal pdf link as we do
//     with nexus"). The NEXUS page (src/pages/Nexus.tsx) offers the NEXUS
//     tear sheet as a hero button and a footer link; this page now does
//     the same for the SIGNAL tear sheet. SIGNAL_PDF_URL points at
//     public/docs/Hatfield.ai_SIGNAL.pdf, the same file the homepage
//     SIGNAL panel opens, so there is one copy of the sheet.
//
// 25. BUTTON ROW AND ICON (Frank: "put the signal overview pdf next to or
//     to the right of sample risk report ... use pdf icon instead of
//     words pdf"). The hero button row no longer wraps on a desktop
//     window (lg:flex-nowrap), so the three buttons sit in one line with
//     the overview last, to the right of Sample risk report; on narrower
//     windows the row still wraps. The button reads "SIGNAL overview"
//     followed by the red-and-white PDF icon (PdfIcon,
//     src/components/PdfIcon.tsx, shared with the homepage and the NEXUS
//     page) in place of the word "(PDF)". The footer link keeps its
//     wording because it sits in a plain text row.
//
// 2026-11-05. MODEL C: PROGRESSIVE COMPANY-BASED PRICING (Frank's brief
// "SIGNAL pricing update" and the Model C requirements document).
//
// 26. THE FIXED TIERS ARE GONE. Watch / Monitor / Portfolio / Enterprise as
//     capped plans ($950 / $3,500 / $6,000, +$25 above 200) are replaced
//     by five PRICE BANDS, each charging its own rate only for the
//     companies that fall inside it: 1-5 $50, 6-25 $45, 26-100 $40,
//     101-200 $35, 201+ $25 per company per month. 30 companies =
//     5 x $50 + 20 x $45 + 5 x $40 = $1,350, never 30 x $40. No minimum
//     company count, unlimited users, annual prepaid = 10 x monthly.
//     The band NAMES keep the old plan names for the upper four bands
//     (Frank, 2026-11-05) and add "Focus" for 1-5, so the table keeps its
//     Plan / Companies / Monthly / Annual shape - only the cells changed.
//     Each row shows the band-top TOTAL ("Up to 25" = $1,150 / $11,500),
//     as the original showed plan totals (Frank, 2026-11-05); Enterprise
//     shows the 200-company total plus the per-additional-company rate.
//     The blended rate per company is shown only in the calculator.
//     Every figure lives ONCE, in PRICE_BANDS; TIER_ROWS, the "from $50"
//     line, the calculator and the form estimate all derive from it.
//
// 27. monthlyFor() / breakdownFor() are INTEGER arithmetic in whole
//     dollars (the Model C spec forbids floating point in anything that
//     touches a bill). The blended rate is the only division and is
//     rendered to cents for display only - it is never posted.
//
// 28. PRICING CALCULATOR. A new section under the table: enter a company
//     count, see monthly total, blended monthly rate per company (shown
//     next to - and labelled distinctly from - the marginal rate), annual
//     prepaid, and the saving against twelve monthly payments, with the
//     per-band breakdown. Same PRICE_BANDS as everything else.
//
// 29. THE FORM. "Tier of interest" is replaced by "Subscription" (Free
//     trial / Paid subscription) plus "Companies to monitor" (a whole
//     number, 1 or more) and the billing preference for a paid
//     subscription. The POST now carries BOTH `tier` (the band key for
//     that count - focus/watch/monitor/portfolio/enterprise - or "demo")
//     AND `companies` (the count). PUBLISH GATE: the server's tiers are
//     still keyed demo/watch/monitor/portfolio/enterprise with fixed
//     Stripe prices, approve_client silently falls back to "watch" for a
//     key it does not know ("focus" is new), and nothing reads
//     `companies`. DO NOT PUBLISH THIS PAGE until dal.TIERS, Stripe
//     (graduated tiered price, quantity = companies) and
//     svc_registration_api accept a company count - or a prospect reads
//     $50 a company here and is provisioned onto a $950 Watch plan.
//
// 30. OUT-OF-PORTFOLIO CHARGES: carried over as $65 FVA / $32 sanctions
//     pending CEO confirmation, then set to $35 EACH on Frank's
//     instruction (2026-11-05, "change fva and ofac pricing to $35 each").
//     The product's own copies (the Stripe invoice-item amounts for the
//     one-off runs) must be changed to match before this page publishes.
//     Capability lists, page-3 questions, SEO metadata, the sample
//     report and all links are untouched.
//
// 31. TRIAL TERM (Frank, 2026-11-05: "change the 10 business days to 14
//     calendar days"). The Trial row's Annual cell and the hero button
//     now say 14 calendar days, matching the clock the product stamps at
//     approval; the tear sheet's footers say the same.
//
// 2026-11-12. PRODUCT RENAME (Frank: "rebrand both"; "visible wording only").
//
// 32. SIGNAL IS NOW HatfieldIQ (and NEXUS is HatfieldRISQ). Every product
//     name a visitor reads or a screen reader announces is renamed, including
//     the "Ask SIGNAL" feature, now "Ask HatfieldIQ". The hero name is the
//     two-tone wordmark (white "Hatfield", blue "IQ") and is the ONE place
//     on the page that carries the trademark symbol. The header's running
//     head is the new descriptor and tagline, "Enterprise Intelligence -
//     Know what matters.", replacing "Your GPS for business decisions"
//     (item 10). The lower-case wordplay stays: "Signal. Not noise.", "The
//     signal is already there.", "You have a signal problem."
//     (Later the same day the page gained the address /iq, item 33.)
//     NOT changed, on purpose: the address /signal, signal.hatfield.ai, the
//     PDF file name, the tier keys the form posts, env and constant names
//     (VITE_SIGNAL_API_BASE, SIGNAL_PDF_URL ...), the component name Signal,
//     and the dated items above, which keep the name in use when written.
//
// 36. TAGLINE IN THE BRAND BLUE TINT (2026-11-14 "bold" change, restored
//     2026-11-15). The header tagline "The signal is already there." moves
//     from #7CA4FF, a tint of the retired wordmark blue, to
//     --brand-blue-light (#7CADFF, src/index.css), matching the "IQ" above
//     it, exactly as the HatfieldRISQ page did in the same change. The
//     2026-11-14 save of this file was cut short by an encoding fault
//     (only the last 524 lines survived) and broke every Vercel build since;
//     this file is the last deployed version (commit 393c130) plus this
//     one change. "IQ" is one step bolder through ProductName.
//
// 35. HEADER AND WORDMARK (Frank, 2026-11-12, approved from a rendering).
//     The header leads with the HatfieldIQ wordmark and "The signal is
//     already there." in place of "Hatfield.ai / The Intelligent Choice";
//     the wordmark is the link home; the right side is unchanged. The hero
//     no longer repeats them. Product names in headlines are drawn by
//     ProductName (src/components/ProductName.tsx) so font and colour match
//     the wordmark; "Ask HatfieldIQ" keeps the brand capitals inside its
//     upper-cased label; Hatfield.ai carries the trademark symbol in the
//     footer.
//
// 34. PDF FILE NAME (Frank, 2026-11-12): the tear sheet is now served as
//     /docs/HatfieldIQ.pdf (was Hatfield.ai_SIGNAL.pdf). The old name
//     redirects to it (vercel.json), so links already sent keep working.
//     The HatfieldRISQ page is likewise at /risq, with /nexus kept.
//
// 33. /iq (Frank, 2026-11-12: "change https://www.hatfield.ai/signal to
//     https://www.hatfield.ai/iq ... make sure the website is updated").
//     This page is now served at /iq, the address the tear sheet prints.
//     /signal still serves the same page, so links already sent out keep
//     working. Both routes are in src/App.tsx. signal.hatfield.ai (the app)
//     is unchanged.
//
// 2026-11-17. PRICE TIERS, NOT NAMED PLANS (Frank: "change the pricing model
// in tear sheet to reflect various pricing tiers instead of categories - may
// be too confusing"; "make modification to pdf and also to website").
//
// 37. THE TABLE NOW SHOWS THE RATE PER COMPANY, NOT PLAN TOTALS. This
//     supersedes the band names and band-top totals of item 26. The old rows
//     ("Monitor - Up to 100 - $4,150") read as plans: a bank with 30
//     companies saw $4,150 and actually pays $1,350. The rows are now the
//     five tiers as the User Agreement states them - First 5 $50, Next 20
//     $45, Next 75 $40, Next 100 $35, Above 200 $25, per company per month,
//     with the annual rate (10 x) beside each - followed by three worked
//     example portfolios (10, 40 and 150 companies, monthly and annual
//     totals) and the free trial row. Plan names (Focus / Watch / Monitor /
//     Portfolio / Enterprise) and "MOST POPULAR" no longer appear anywhere a
//     visitor reads, including the calculator breakdown, the form estimate
//     and the "You selected" line. Everything still derives from
//     PRICE_BANDS; the example totals use the same monthlyFor().
//
// 38. THE PLAN KEYS STAY, INVISIBLY. PRICE_BANDS keeps `key`, and the form
//     still posts `tier` (the key of the band the requested count falls in)
//     alongside `companies`, because svc_registration_api reads both. Only
//     the visible labels went; changing the posted keys is a server-side
//     decision, not this page's.
//
// 39. "FROM AS LOW AS $25 A MONTH" IS GONE (supersedes the 2026-11-12 note at
//     LOWEST_MONTHLY). Next to a table that opens at $50 it read like bait:
//     $25 applies only above 200 companies. The narrative now says
//     progressive pricing runs from $50 down to $25 per company a month,
//     both figures read from PRICE_BANDS. The tear sheet page 1 says the
//     same.
//
// 40. THE PROGRESSIVE NOTE carries the 30-company example (5 x $50 + 20 x
//     $45 + 5 x $40 = $1,350), the case a rate table invites people to
//     mis-multiply as 30 x $40. "Figures shown are for a full band" is gone
//     because no band totals are shown any more.
//
// 41. "ONE PRICE." IN BRAND BLUE (Frank, 2026-11-17: "can we change the
//     color of this to blue One price."). The narrative heading reads
//     "10 users or 1,000." in ink and "One price." in #2F6BFF - the same blue
//     the tear sheet prints it in, and the same treatment as "You have a
//     signal problem." above.
//
// ENV (Vercel project settings):
//   VITE_SIGNAL_API_BASE      default https://signal.hatfield.ai
//   VITE_TURNSTILE_SITE_KEY   Cloudflare Turnstile site key. Unset =>
//                             the widget is not rendered and the server
//                             falls back to the honeypot and its rolling
//                             throttle.

import { FormEvent, useEffect, useRef, useState } from "react";
import PdfIcon from "@/components/PdfIcon";
import ProductName from "@/components/ProductName";

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
 * The SIGNAL tear sheet, served from public/docs/ by this site (item 24).
 * Same file the homepage SIGNAL panel opens.
 */
const SIGNAL_PDF_URL = "/docs/HatfieldIQ.pdf";

/**
 * MODEL C PRICE BANDS - every published figure, written ONCE (item 26).
 * `rate` is whole US dollars per company per month and applies only to
 * company positions `from`..`to` (inclusive; `to` null = open-ended).
 * Keep in step with dal.TIERS and the Stripe graduated price.
 * `key` is posted as `tier` and is never shown (item 38); no plan names.
 */
type PriceBand = {
  key: string;
  from: number;
  to: number | null;
  rate: number;
};

const PRICE_BANDS: PriceBand[] = [
  { key: "focus", from: 1, to: 5, rate: 50 },
  { key: "watch", from: 6, to: 25, rate: 45 },
  { key: "monitor", from: 26, to: 100, rate: 40 },
  { key: "portfolio", from: 101, to: 200, rate: 35 },
  { key: "enterprise", from: 201, to: null, rate: 25 },
];

/**
 * Visible tier name (item 37): "First 5", "Next 20", "Next 75",
 * "Next 100", "Above 200" - derived from the band edges, never typed.
 */
const bandName = (b: PriceBand) =>
  b.from === 1
    ? `First ${b.to}`
    : b.to === null
    ? `Above ${b.from - 1}`
    : `Next ${b.to - b.from + 1}`;

/** Worked example portfolios under the rate rows (item 37). */
const EXAMPLE_PORTFOLIOS = [10, 40, 150];

/** Annual prepaid = this many monthly payments (two months free). */
const ANNUAL_MONTHS = 10;

/** Whole-dollar formatting; no fractional dollars ever reach a price. */
const usd = (n: number) => "$" + n.toLocaleString("en-US");

/**
 * Companies in band `b` for a portfolio of `n` companies. Integer
 * arithmetic only (item 27).
 */
const inBand = (b: PriceBand, n: number) => {
  if (n < b.from) return 0;
  const top = b.to === null ? n : Math.min(n, b.to);
  return top - b.from + 1;
};

/** Per-band breakdown for `n` companies: [{band, companies, amount}]. */
const breakdownFor = (n: number) =>
  PRICE_BANDS.map((b) => {
    const companies = inBand(b, n);
    return { band: b, companies, amount: companies * b.rate };
  }).filter((x) => x.companies > 0);

/** Monthly subscription for `n` companies, whole dollars. */
const monthlyFor = (n: number) =>
  breakdownFor(n).reduce((sum, x) => sum + x.amount, 0);

/** The band in which company number `n` sits (the marginal rate). */
const bandFor = (n: number) =>
  PRICE_BANDS.find((b) => n >= b.from && (b.to === null || n <= b.to)) ??
  PRICE_BANDS[0];

/** Sub-line under a tier name: "companies 1-5", "companies 201+". */
const rangeLabel = (b: PriceBand) =>
  b.to === null ? `companies ${b.from}+` : `companies ${b.from}\u2013${b.to}`;

/** Every paid subscription takes a billing interval. */
const PRICED_TIERS = PRICE_BANDS.map((b) => b.key);

/**
 * Table rows (item 37). Both pricing layouts render from this array,
 * which is DERIVED from PRICE_BANDS - there is no second copy of any
 * figure. `kind`: "rate" = a tier, per-company figures; "heading" = the
 * example-portfolios caption; "example" = a worked portfolio total;
 * "trial" = the free trial (the only row that is a button).
 */
type PriceRow = {
  key: string;
  kind: "rate" | "heading" | "example" | "trial";
  label: string;
  note?: string;
  monthly: string;
  annual: string;
};

const PRICE_ROWS: PriceRow[] = [
  ...PRICE_BANDS.map(
    (b): PriceRow => ({
      key: b.key,
      kind: "rate",
      label: bandName(b),
      note: rangeLabel(b),
      monthly: usd(b.rate),
      annual: usd(b.rate * ANNUAL_MONTHS),
    })
  ),
  { key: "examples", kind: "heading", label: "Example portfolios", monthly: "", annual: "" },
  ...EXAMPLE_PORTFOLIOS.map(
    (n): PriceRow => ({
      key: `ex-${n}`,
      kind: "example",
      label: `${n.toLocaleString("en-US")} companies`,
      monthly: usd(monthlyFor(n)),
      annual: usd(monthlyFor(n) * ANNUAL_MONTHS),
    })
  ),
  {
    key: "demo",
    kind: "trial",
    label: "Free Trial",
    note: "pre-selected companies, read-only",
    monthly: "Free",
    annual: "14 calendar days",
  },
];

/**
 * Narrative range (item 39): highest and lowest per-company rates, read
 * from PRICE_BANDS. Replaces "from as low as $25 a month".
 */
const HIGHEST_RATE = usd(Math.max(...PRICE_BANDS.map((b) => b.rate)));
const LOWEST_RATE = usd(Math.min(...PRICE_BANDS.map((b) => b.rate)));

/** The note's worked example (item 40): 30 companies. */
const NOTE_EXAMPLE = 30;

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
      { main: "Ask HatfieldIQ", detail: "answers from your portfolio" },
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
  // "demo" (free trial), "paid" (a Model C subscription), or "" (unset).
  const [subscription, setSubscription] = useState("");
  // Requested company count for a paid subscription, as typed.
  const [companiesText, setCompaniesText] = useState("");
  const [selectedBilling, setSelectedBilling] = useState("");
  // Calculator input (item 28). Starts at a mid-size portfolio.
  const [calcText, setCalcText] = useState("100");

  const companies = /^\d+$/.test(companiesText) ? parseInt(companiesText, 10) : 0;
  const calcCompanies = /^\d+$/.test(calcText) ? parseInt(calcText, 10) : 0;

  /**
   * The key posted as `tier`: "demo" for the trial, else the band the
   * requested count falls in. Empty until the form says enough.
   */
  const selectedTier =
    subscription === "demo"
      ? "demo"
      : subscription === "paid" && companies >= 1
      ? bandFor(companies).key
      : "";
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

  const handleSubscriptionChange = (value: string) => {
    setSubscription(value);
    setBillingError(false);
    setSelectedBilling("");
    if (value !== "paid") setCompaniesText("");
  };

  /**
   * The trial buttons and the Free Trial row pre-fill the form with the
   * trial. Tier rows are no longer clickable (item 37: they are rates,
   * not plans to pick); a paid request starts from the calculator or the
   * form's company count.
   */
  const startTrial = () => {
    handleSubscriptionChange("demo");

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
      ["subscription", "Subscription"],
    ];

    const missing = required.filter(([id]) => !val(id)).map(([, lbl]) => lbl);

    // A paid subscription needs a company count of at least one (item 29).
    if (subscription === "paid" && companies < 1) {
      missing.push("Companies to monitor");
    }

    // A billing preference is required only for a paid subscription.
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
          // Item 29: the requested company count, 0 for the trial. The
          // server must read this before the page is published.
          companies: subscription === "paid" ? companies : 0,
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

  const billingDisabled = subscription !== "paid";

  const billingPlaceholder =
    subscription === "demo"
      ? "Not applicable"
      : subscription === ""
      ? "Select subscription first"
      : "Select";

  /** Live estimate under the company-count field (item 29). */
  const estimateMonthly = companies >= 1 ? monthlyFor(companies) : 0;

  /** Calculator figures (item 28). Blended is display-only, to cents. */
  const calcMonthly = calcCompanies >= 1 ? monthlyFor(calcCompanies) : 0;
  const calcAnnual = calcMonthly * ANNUAL_MONTHS;
  const calcSaving = calcMonthly * 12 - calcAnnual;
  const calcBlended =
    calcCompanies >= 1 ? (calcMonthly / calcCompanies).toFixed(2) : "0.00";
  const calcMarginal = calcCompanies >= 1 ? bandFor(calcCompanies) : null;

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
        <span className="block whitespace-pre-line text-[11px] font-normal text-[#667085] mt-[3px] leading-[1.35]">
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
          <a href="/" className="no-underline min-w-0" aria-label="HatfieldIQ - Hatfield.ai home">
            <div className="text-white text-[26px] md:text-[32px] leading-none">
              <ProductName product="IQ" tm onDark />
            </div>

            <div className="text-[11px] font-semibold text-[color:hsl(var(--brand-blue-light))] mt-[9px] tracking-[0.15em] uppercase leading-[1.5]">
              The signal is already there.
            </div>
          </a>

          <div className="flex items-center gap-5 md:gap-7 shrink-0">
            {/* Item 10: sentence case in the DOM, uppercased in CSS. */}
            <p className="hidden md:block m-0 text-[11px] font-semibold tracking-[0.13em] text-white/70 uppercase">
              Enterprise Intelligence &middot; Know what matters.
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

            <h1 className="m-0 font-serif text-[34px] sm:text-[42px] lg:text-[50px] font-semibold leading-[1.08] tracking-[-0.03em] max-w-[18ch]">
              Know before risk becomes your news headline.
            </h1>

            <p className="mt-7 mb-0 text-[#B8C4D6] text-base max-w-[62ch] leading-7">
              HatfieldIQ watches the companies that matter to you &mdash; and
              connects what is changing across financials, cyber, sanctions,
              litigation, regulation, corporate events, geopolitics and supply
              chain. Know what changed. Know what matters. Know where to act.
            </p>
          </div>

          {/* Item 25: one line on desktop, overview last. */}
          <div className="flex flex-wrap lg:flex-nowrap lg:shrink-0 gap-[10px] lg:pb-1">
            {/* Item 11: the term is in the button. */}
            <button
              type="button"
              onClick={startTrial}
              className="inline-block px-[18px] py-[11px] rounded-[7px] border-0 cursor-pointer text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors whitespace-nowrap"
            >
              Start your free 14-calendar-day trial
            </button>

            {SAMPLE_REPORT_URL && (
              <a
                href="#sample"
                className="inline-block px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold border border-white/35 text-white hover:border-white/60 transition-colors whitespace-nowrap"
              >
                Sample risk report
              </a>
            )}

            {/* Items 24 and 25: the tear sheet, with the PDF icon. */}
            <a
              href={SIGNAL_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HatfieldIQ overview, PDF, opens in a new tab"
              className="inline-flex items-center gap-2 px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold border border-white/35 text-white hover:border-white/60 transition-colors whitespace-nowrap"
            >
              HatfieldIQ overview
              <PdfIcon height={18} />
            </a>
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
                HatfieldIQ connects those signals before they become the headline.
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
                  10 users or 1,000.{" "}
                  <span className="text-[#2F6BFF]">One price.</span>
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  You pay for the companies you monitor, never for the seat. One
                  subscription replaces a stack of feeds. Progressive pricing
                  runs from {HIGHEST_RATE} down to {LOWEST_RATE} per company a
                  month &mdash; the more you monitor, the less each company
                  costs. No minimum commitment, unlimited users.
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

          {/* DESKTOP MATRIX - rendered from PRICE_ROWS and DOMAINS (item 37):
              three pricing columns (tier, monthly, annual), then the four
              capability columns spanning every pricing row. */}
          <div className="hidden xl:grid grid-cols-[136px_104px_128px_repeat(4,minmax(0,1fr))] bg-white border-y border-[#E2E7EF]">

            {/* GROUP HEADERS */}
            <div className="col-span-3 px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
              Subscription
            </div>

            <div className="col-span-4 px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
              Included with every subscription
            </div>

            {/* COLUMN HEADERS */}
            {[
              { h: "Companies", sub: "" },
              { h: "Monthly", sub: "per company" },
              { h: "Annual", sub: "per company" },
              ...DOMAINS.map((d) => ({ h: d.title, sub: "" })),
            ].map(({ h, sub }) => (
              <div
                key={h}
                className="px-4 py-[15px] border-b border-[#E2E7EF] bg-[#F6F8FB] text-[12px] font-semibold text-[#0A1A33]"
              >
                {h}
                {sub && (
                  <span className="block text-[11px] font-normal text-[#667085] mt-[2px]">
                    {sub}
                  </span>
                )}
              </div>
            ))}

            {/* PRICING ROWS */}
            {PRICE_ROWS.map((row, i) => {
              const gridRow = 3 + i;
              const cell = "px-4 border-b border-[#E2E7EF] py-[13px]";

              if (row.kind === "heading") {
                return (
                  <div
                    key={row.key}
                    className="px-4 pt-[16px] pb-[8px] border-b border-[#E2E7EF] text-[10px] font-semibold tracking-[0.13em] text-[#667085] uppercase"
                    style={{ gridColumn: "1 / span 3", gridRow }}
                  >
                    {row.label}
                  </div>
                );
              }

              return (
                <div key={row.key} className="contents">
                  <div className={cell} style={{ gridColumn: 1, gridRow }}>
                    {row.kind === "trial" ? (
                      <button
                        type="button"
                        onClick={startTrial}
                        className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
                      >
                        {row.label}
                      </button>
                    ) : (
                      <span
                        className={
                          row.kind === "rate"
                            ? "font-semibold text-[#1B56A6]"
                            : "text-[14px] text-[#101828] whitespace-nowrap"
                        }
                      >
                        {row.label}
                      </span>
                    )}

                    {row.note && (
                      <span className="block font-normal text-[11px] text-[#667085] mt-[3px]">
                        {row.note}
                      </span>
                    )}
                  </div>

                  <div
                    className={`${cell} font-semibold`}
                    style={{ gridColumn: 2, gridRow }}
                  >
                    {renderPrice(row.monthly)}
                  </div>

                  <div
                    className={`${cell}${row.kind === "trial" ? " text-[#667085]" : ""}`}
                    style={{ gridColumn: 3, gridRow }}
                  >
                    {renderPrice(row.annual)}
                  </div>
                </div>
              );
            })}

            {/* DOMAIN COLUMNS - each spans every pricing row */}
            {DOMAINS.map((domain, i) => (
              <div
                key={domain.title}
                className="px-4 pt-[17px] pb-[15px] border-b border-[#E2E7EF]"
                style={{
                  gridColumn: 4 + i,
                  gridRow: `3 / span ${PRICE_ROWS.length}`,
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

          {/* TABLET / MOBILE - same PRICE_ROWS and DOMAINS */}
          <div className="xl:hidden">
            <div className="text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase border-b border-[#E2E7EF] pb-4">
              Subscription
            </div>

            <div className="divide-y divide-[#E2E7EF]">
              {PRICE_ROWS.map((row) =>
                row.kind === "heading" ? (
                  <div
                    key={row.key}
                    className="pt-6 pb-3 text-[10px] font-semibold tracking-[0.13em] text-[#667085] uppercase"
                  >
                    {row.label}
                  </div>
                ) : (
                  <div key={row.key} className="grid grid-cols-3 gap-4 py-5">
                    <div>
                      {row.kind === "trial" ? (
                        <button
                          type="button"
                          onClick={startTrial}
                          className={`${tierLinkStyle} bg-transparent border-0 p-0 text-left`}
                        >
                          {row.label}
                        </button>
                      ) : (
                        <span
                          className={
                            row.kind === "rate"
                              ? "font-semibold text-[#1B56A6]"
                              : "text-sm text-[#101828]"
                          }
                        >
                          {row.label}
                        </span>
                      )}

                      {row.note && (
                        <span className="block text-[11px] text-[#667085] mt-[3px]">
                          {row.note}
                        </span>
                      )}
                    </div>

                    <div className="text-sm">
                      <span className="block text-[10px] text-[#667085] uppercase mb-1">
                        {row.kind === "rate" ? "Monthly / company" : "Monthly"}
                      </span>
                      <span className="font-semibold">{renderPrice(row.monthly)}</span>
                    </div>

                    <div className="text-sm">
                      <span className="block text-[10px] text-[#667085] uppercase mb-1">
                        {row.kind === "rate" ? "Annual / company" : "Annual"}
                      </span>
                      {renderPrice(row.annual)}
                    </div>
                  </div>
                )
              )}
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
              {/* Item 40: the progressive rule, worded as on the tear sheet,
                  with the 30-company example built from breakdownFor(). */}
              <p className="m-0">
                <strong className="text-[#101828] font-semibold">
                  Progressive pricing:
                </strong>{" "}
                each rate applies only to the companies in its tier.{" "}
                {NOTE_EXAMPLE} companies ={" "}
                {breakdownFor(NOTE_EXAMPLE)
                  .map(({ companies: c, band }) => `${c} \u00d7 ${usd(band.rate)}`)
                  .join(" + ")}{" "}
                = {usd(monthlyFor(NOTE_EXAMPLE))} a month.
              </p>
              <p className="mt-3 mb-0">
                No minimum number of companies. Every HatfieldIQ subscription
                includes unlimited users and all standard HatfieldIQ capabilities.
              </p>
            </div>

            <p className="m-0 text-[12px] text-[#667085] leading-[1.6]">
              <strong className="text-[#101828] font-semibold">
                Annual billing includes two months free.
              </strong>{" "}
              Trial covers companies we pre-select, read-only, with no
              on-demand financial or sanctions assessments. Out-of-portfolio
              financial viability assessments are $35 each and sanctions
              screenings are $35 each, introductory pricing. Private-company
              reviews use financials you furnish and are visible only to your
              organization. Financial-health methodologies vary by company type
              and data availability. Every alert carries source evidence,
              severity and an audit trail. AI supports the analysis and your
              organization retains decision authority. Prices are exclusive of
              taxes; any applicable sales or value-added tax is calculated at
              checkout from your billing address.
            </p>
          </div>

          {/* PRICING CALCULATOR (item 28) - same PRICE_BANDS as the table */}
          <section
            id="calculator"
            className="scroll-mt-8 mt-10 bg-[#F6F8FB] rounded-2xl px-6 md:px-[38px] py-[30px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-14 items-start">
              <div>
                <p className={kicker}>Pricing calculator</p>

                <h3 className="mt-3 mb-0 font-serif font-normal text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.02em] text-[#0A1A33]">
                  What would your portfolio cost?
                </h3>

                <label
                  htmlFor="calc-companies"
                  className="block mt-5 text-[12px] font-medium text-[#667085]"
                >
                  Companies to monitor
                </label>

                <input
                  id="calc-companies"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  value={calcText}
                  onChange={(e) => setCalcText(e.target.value.replace(/\D/g, ""))}
                  className="mt-[6px] text-[18px] font-semibold text-[#101828] bg-white border border-[#E2E7EF] rounded-lg px-3 py-[10px] w-full max-w-[200px] outline-none focus:border-[#2F6BFF]"
                />

                <p className="mt-3 mb-0 text-[12px] text-[#667085] leading-[1.6]">
                  Whole companies, no minimum. Prices exclude tax.
                </p>
              </div>

              {calcCompanies >= 1 ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div>
                      <p className="m-0 text-[11px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
                        Monthly
                      </p>
                      <p className="mt-1 mb-0 text-[26px] font-semibold tracking-[-0.02em] text-[#0A1A33]">
                        {usd(calcMonthly)}
                      </p>
                      <p className="mt-[2px] mb-0 text-[11px] text-[#667085]">
                        billed monthly
                      </p>
                    </div>

                    <div>
                      <p className="m-0 text-[11px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
                        Blended rate
                      </p>
                      <p className="mt-1 mb-0 text-[26px] font-semibold tracking-[-0.02em] text-[#0A1A33]">
                        ${calcBlended}
                      </p>
                      <p className="mt-[2px] mb-0 text-[11px] text-[#667085]">
                        average per company per month
                        {calcMarginal && (
                          <>
                            {" "}
                            &middot; marginal rate {usd(calcMarginal.rate)} (
                            {bandName(calcMarginal).toLowerCase()})
                          </>
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="m-0 text-[11px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
                        Annual prepaid
                      </p>
                      <p className="mt-1 mb-0 text-[26px] font-semibold tracking-[-0.02em] text-[#0A1A33]">
                        {usd(calcAnnual)}
                      </p>
                      <p className="mt-[2px] mb-0 text-[11px] text-[#667085]">
                        {ANNUAL_MONTHS} &times; monthly, two months free
                      </p>
                    </div>

                    <div>
                      <p className="m-0 text-[11px] font-semibold tracking-[0.08em] text-[#667085] uppercase">
                        You save
                      </p>
                      <p className="mt-1 mb-0 text-[26px] font-semibold tracking-[-0.02em] text-[#16803C]">
                        {usd(calcSaving)}
                      </p>
                      <p className="mt-[2px] mb-0 text-[11px] text-[#667085]">
                        a year against twelve monthly payments
                      </p>
                    </div>
                  </div>

                  {/* Per-band breakdown: the progressive rule, made visible */}
                  <div className="mt-6 border-t border-[#E2E7EF]">
                    {breakdownFor(calcCompanies).map(({ band, companies: c, amount }) => (
                      <div
                        key={band.key}
                        className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[110px_minmax(0,1fr)_auto] gap-x-4 py-[9px] border-b border-[#E2E7EF] text-[13px]"
                      >
                        <span className="font-semibold text-[#1B56A6]">
                          {bandName(band)}
                        </span>
                        <span className="text-[#475467] col-span-2 sm:col-span-1 order-last sm:order-none">
                          {c.toLocaleString("en-US")}{" "}
                          {c === 1 ? "company" : "companies"} &times;{" "}
                          {usd(band.rate)}
                        </span>
                        <span className="text-right text-[#0A1A33]">
                          {usd(amount)}
                        </span>
                      </div>
                    ))}
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 py-[9px] text-[13px] font-semibold text-[#0A1A33]">
                      <span>Monthly subscription</span>
                      <span className="text-right">{usd(calcMonthly)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleSubscriptionChange("paid");
                      setCompaniesText(String(calcCompanies));
                      window.setTimeout(() => {
                        document
                          .getElementById("request")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    }}
                    className="mt-5 inline-block px-[18px] py-[11px] rounded-[7px] border-0 cursor-pointer text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors"
                  >
                    Request access for {calcCompanies.toLocaleString("en-US")}{" "}
                    {calcCompanies === 1 ? "company" : "companies"}
                  </button>
                </div>
              ) : (
                <p className="m-0 text-[13px] text-[#667085]">
                  Enter the number of companies you want to monitor.
                </p>
              )}
            </div>
          </section>

          {/* ONE COMPANY, EVERY ANGLE - tear sheet page 3 */}
          <section className="border-t border-[#E2E7EF] pt-[46px] mt-[54px]">
            <p className={kicker}>One company. Every angle that matters.</p>

            <h2 className="mt-4 mb-0 font-serif text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A1A33] max-w-[30ch]">
              The company is the story. <ProductName product="IQ" /> sees the
              whole picture.
            </h2>

            <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[#475467] max-w-[80ch]">
              Financial health and sanctions are only two lenses. HatfieldIQ
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
                <p className={kicker}>
                  Ask <span className="normal-case">HatfieldIQ</span>
                </p>
                <p className="mt-2 mb-0 text-[14px] leading-[1.65] text-[#101828]">
                  A thirteenth question? Ask in plain English. HatfieldIQ answers
                  from your own portfolio evidence and shows where the answer
                  came from.
                </p>
              </div>
              <div>
                <p className={kicker}>Due diligence</p>
                <p className="mt-2 mb-0 text-[14px] leading-[1.65] text-[#101828]">
                  Every company gets a standard or enhanced due-diligence
                  level, and HatfieldIQ says plainly which factors it could not
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
                onClick={startTrial}
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
                    This is a real HatfieldIQ report on a public company, with
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

                  {/* SUBSCRIPTION (item 29): trial or paid */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="subscription"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Subscription *
                    </label>

                    <select
                      id="subscription"
                      name="subscription"
                      required
                      value={subscription}
                      onChange={(e) => handleSubscriptionChange(e.target.value)}
                      className={fieldStyle("Subscription")}
                    >
                      <option value="">Select</option>
                      <option value="demo">Free trial</option>
                      <option value="paid">Paid subscription</option>
                    </select>
                  </div>

                  {/* COMPANIES TO MONITOR (item 29) */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="companies"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Companies to monitor
                      {subscription === "paid" && " *"}
                    </label>

                    <input
                      id="companies"
                      name="companies"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      value={companiesText}
                      disabled={subscription !== "paid"}
                      required={subscription === "paid"}
                      placeholder={
                        subscription === "demo"
                          ? "Pre-selected"
                          : subscription === ""
                          ? "Select subscription first"
                          : "1 or more"
                      }
                      onChange={(e) =>
                        setCompaniesText(e.target.value.replace(/\D/g, ""))
                      }
                      className={
                        subscription !== "paid"
                          ? "text-sm bg-[#EAECF0] text-[#98A2B3] border border-[#D0D5DD] rounded-lg px-3 py-[11px] w-full outline-none cursor-not-allowed"
                          : fieldStyle("Companies to monitor")
                      }
                    />

                    {subscription === "paid" && companies >= 1 && (
                      <span className="text-[11px] text-[#667085]">
                        {usd(estimateMonthly)} a month &middot;{" "}
                        {usd(estimateMonthly * ANNUAL_MONTHS)} annual prepaid
                      </span>
                    )}
                  </div>

                  {/* BILLING */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="billing"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Billing preference
                      {subscription === "paid" && " *"}
                    </label>

                    <select
                      id="billing"
                      name="billing"
                      value={selectedBilling}
                      disabled={billingDisabled}
                      required={subscription === "paid"}
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
                    {selectedTier === "demo" && (
                      <>
                        {" "}
                        You selected the{" "}
                        <strong className="text-[#101828]">free trial</strong>.
                      </>
                    )}
                    {selectedTier && selectedTier !== "demo" && (
                      <>
                        {" "}
                        You selected{" "}
                        <strong className="text-[#101828]">
                          {companies.toLocaleString("en-US")}{" "}
                          {companies === 1 ? "company" : "companies"}
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
            Hatfield Advisory LLC d/b/a Hatfield.ai&trade;, St. Petersburg, Florida
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

            {/* Item 24: the tear sheet. */}
            <a
              href={SIGNAL_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              HatfieldIQ overview (PDF)
            </a>

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