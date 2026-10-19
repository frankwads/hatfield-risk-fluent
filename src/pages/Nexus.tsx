// Nexus.tsx - NEXUS product page (www.hatfield.ai/nexus)
//
// Hatfield.ai - The Intelligent Choice
//
// 2026-10-19 (Frank): "create a NEXUS page similar to the SIGNAL page and
// add NEXUS to navigation as we have with signal - use attached pdf to
// create NEXUS page".
//
// WHAT THIS PAGE IS. The NEXUS counterpart of src/pages/Signal.tsx: same
// structure (own dark header, dark hero, white narrative, pricing,
// capabilities, closing band, dark footer), same palette and type, so the
// two product pages read as a pair. It does NOT render <Navigation /> or
// <Footer />, for the same reason the SIGNAL page does not: it carries its
// own header and footer, matching the tear sheet.
//
// WHERE THE WORDS COME FROM. Every sentence on this page is taken from the
// three-page NEXUS tear sheet (Hatfield.ai_NEXUS.pdf, the same file served
// at NEXUS_PDF_URL below):
//   page 1 - hero, the four word-stats (ONE / SIGNAL / AI / EVERY), the
//            problem, how it works, built to replace, built by a
//            practitioner;
//   page 2 - "One relationship. One lifecycle. One defensible record.",
//            annual platform pricing, the entitlement clarification, the
//            four "Included with NEXUS" columns and the fine print;
//   page 3 - "The relationship changes. NEXUS keeps the thread.", the
//            twelve lifecycle moments, and the two closing panels.
// Nothing was added to the sheet's claims. To change the copy, change the
// sheet first and then mirror it here.
//
// WRITTEN ONCE. Prices live in PRICING_ROWS, the capability lists in
// INCLUDED and the lifecycle moments in LIFECYCLE; the desktop and mobile
// layouts both render from those arrays, so there is no second hand-typed
// copy to drift (the rule the SIGNAL page adopted on 2026-10-09).
//
// NO FORM, NO ENDPOINT. NEXUS is an enterprise platform sold by briefing.
// The tear sheet's call to action on every page is "Book a briefing at
// https://www.hatfield.ai/contact", so that is where every button here
// goes. This page posts nothing and calls no API.
//
// PLAIN ASCII. As in Insights.tsx (2026-10-13), typographic characters are
// written as escapes so the file survives the Windows codepage:
//   in JavaScript strings  \u2014 (em dash)  \u2019 (apostrophe)
//                          \u201C and \u201D (curly double quotes)
//   in page text           &mdash; &rsquo; &ldquo; &rdquo;
// Keep new copy in this file to the same rule.
//
// ROUTING. This component needs a route in the app's router (the file that
// maps /signal to Signal), e.g. <Route path="/nexus" element={<Nexus />} />.
// The header menu item that points here is in src/components/Navigation.tsx.

/** The NEXUS tear sheet, served from public/docs/ (same file the homepage
 *  NEXUS panel opens). */
const NEXUS_PDF_URL = "/docs/Hatfield.ai_NEXUS.pdf";

/** Where every call to action goes - the tear sheet's "Book a briefing". */
const BRIEFING_URL = "/contact";

/** Tear sheet page 2: annual platform pricing, written once. */
type PricingRow = { product: string; price: string; total?: boolean };

const PRICING_ROWS: PricingRow[] = [
  { product: "NEXUS", price: "$85,000" },
  { product: "CLMS Add-on", price: "+$35,000" },
  { product: "SIGNAL Surveillance", price: "Included in NEXUS" },
  { product: "Vendor Portal", price: "Included in NEXUS" },
  { product: "Total Annual Subscription", price: "$85,000\u2013$120,000", total: true },
];

/** Tear sheet page 2: the four "Included with NEXUS" columns. `detail`
 *  renders after an em dash in a quieter colour. */
type Capability = { main: string; detail?: string };

const INCLUDED: { title: string; items: Capability[] }[] = [
  {
    title: "AI & automation",
    items: [
      { main: "Assessment intelligence", detail: "valid prior assessments and evidence automatically reused" },
      { main: "Legal-entity intelligence", detail: "normalization and corporate lineage using SEC and global LEI data" },
      { main: "Intelligent intake", detail: "taxonomy-driven classification and guided goods/services selection" },
      { main: "Integrated OFAC screening", detail: "sanctions checks that block at the gate" },
      { main: "Real-time financial viability assessment" },
      { main: "Dual-AI contract risk review", detail: "two models, one arbiter" },
      { main: "Semantic comparison", detail: "contracts, questionnaires and regulations compared by meaning" },
      { main: "Digital Service Agent", detail: "text and voice" },
      { main: "Conversational guided intake" },
      { main: "Configurable approval workflows" },
    ],
  },
  {
    title: "Risk assessment & governance",
    items: [
      { main: "Configurable IRQs", detail: "no-code category and question weighting" },
      { main: "Configurable risk appetite and tolerance" },
      { main: "Third-party and engagement-level risk registers" },
      { main: "Inherent and residual risk by domain" },
      { main: "Integrated issues and remediation" },
      { main: "Risk lifecycle", detail: "watchlists and work queues" },
      { main: "Third-party self-service portal" },
      { main: "Fourth-party mapping", detail: "disclosed by the third party" },
      { main: "Renewal and change-order triggers" },
      { main: "Operational resilience", detail: "RTO, RPO and criticality" },
      { main: "Due-diligence and EDD tiering" },
    ],
  },
  {
    title: "Contracting & regulatory",
    items: [
      { main: "Prebuilt taxonomies, IRQs, questionnaires and contract templates" },
      { main: "Intelligent contract selection", detail: "NDA, MSA, SOW and PO" },
      { main: "Automated contract generation" },
      { main: "Native CLMS with e-signature" },
      { main: "Central document and evidence repository" },
      { main: "AI evidence review", detail: "SOC reports, policies and supporting documents" },
      { main: "Regulatory mapping library" },
      { main: "Regulation-to-clause generation", detail: "only where applicable" },
      { main: "Eight examiner-ready reports, including the DORA register" },
    ],
  },
  {
    title: "Surveillance, reporting & platform",
    items: [
      { main: "SIGNAL built in", detail: "cyber, sanctions, litigation, news, corporate actions and financial health" },
      { main: "Role- and business-unit-based alerts" },
      { main: "Third- and fourth-party concentration analytics" },
      { main: "Operational metrics and SLA management" },
      { main: "Executive, third-party and engagement dashboards" },
      { main: "Standalone deployment", detail: "no mandatory suite" },
      { main: "MFA, role-based access and full audit trail" },
    ],
  },
];

/** Tear sheet page 3: from the first request to the last renewal. In the
 *  sheet's order, read down the left column then the right. */
const LIFECYCLE: { moment: string; what: string }[] = [
  {
    moment: "\u201CI need a third party for this.\u201D",
    what: "A requester talks or types to the Digital Service Agent. It reads the statement of work, classifies the purchase and guides intake.",
  },
  {
    moment: "\u201CWhere is my request?\u201D",
    what: "The same agent answers in plain English, by text or voice, within each user\u2019s role and business unit.",
  },
  {
    moment: "The third party has to respond.",
    what: "A secure portal for questionnaires, evidence and subcontractor disclosure, with reminders and escalation that run themselves.",
  },
  {
    moment: "The evidence arrives.",
    what: "AI reads the evidence, extracts the controls and compares them with the third party\u2019s responses.",
  },
  {
    moment: "Legal asks what changed.",
    what: "Contracts compared by meaning, not wording, and checked against the regulations that govern you.",
  },
  {
    moment: "Continuity asks how fast.",
    what: "Recovery time and recovery point per engagement, criticality tiers, delivery locations and critical fourth parties.",
  },
  {
    moment: "The contract comes up for renewal.",
    what: "NEXUS reassesses only when the change is material.",
  },
  {
    moment: "A risk issue emerges.",
    what: "It reaches the right specialist, becomes a tracked issue with an owner, and moves the risk rating when it closes.",
  },
  {
    moment: "Risk asks where we are exposed.",
    what: "See concentration across third and fourth parties by spend, count and criticality.",
  },
  {
    moment: "The business needs its own approvals.",
    what: "Rules written in plain English, trialled on past engagements, approved by email with the evidence attached.",
  },
  {
    moment: "Leadership asks how risk is running.",
    what: "Operational metrics against your service levels by domain and team, and an executive dashboard.",
  },
  {
    moment: "The examiner arrives.",
    what: "Eight regulatory reports on demand, with every decision and override on the record.",
  },
];

const Nexus = () => {
  const bulletStyle =
    "relative pl-[15px] pb-[13px] text-[13px] leading-[1.42] before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1 before:h-1 before:rounded-full before:bg-[#2F6BFF]";

  const kicker =
    "m-0 text-[11px] font-semibold tracking-[0.15em] text-[#2F6BFF] uppercase leading-[1.5]";

  const primaryButton =
    "inline-block px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors";

  const ghostButton =
    "inline-block px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold border border-white/35 text-white hover:border-white/60 transition-colors";

  const renderCapability = (c: Capability) => (
    <>
      {c.main}
      {c.detail && (
        <span className="text-[#667085]"> &mdash; {c.detail}</span>
      )}
    </>
  );

  return (
    <div
      className="min-h-screen bg-white text-[#101828]"
      style={{
        fontFamily: 'Inter, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      {/* HEADER - mirrors the SIGNAL page header; the tagline on the right
          is the tear sheet's running head. */}
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
            <p className="hidden md:block m-0 text-[11px] font-semibold tracking-[0.13em] text-white/70 uppercase">
              The operating system for third-party risk
            </p>

            <a
              href={BRIEFING_URL}
              className="px-[16px] py-[10px] border border-white/35 rounded-[7px] text-white no-underline text-[13px] font-medium hover:border-white/60 transition-colors"
            >
              Book a briefing
            </a>
          </div>
        </div>
      </header>

      {/* HERO - tear sheet page 1 */}
      <section className="bg-[#071326] text-white py-[72px] md:pb-[76px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <p className="text-[24px] md:text-[30px] font-semibold tracking-[0.26em] m-0 mb-6 text-[#7CA4FF]">
              NEXUS
            </p>

            <p className="m-0 mb-4 text-[11px] font-semibold tracking-[0.15em] text-[#7CA4FF] uppercase">
              Stop managing third-party risk in silos.
            </p>

            <h1 className="m-0 font-serif text-[34px] sm:text-[42px] lg:text-[50px] font-semibold leading-[1.08] tracking-[-0.03em] max-w-[18ch]">
              Connected. Not stitched.
            </h1>

            <p className="mt-7 mb-0 text-[#B8C4D6] text-base max-w-[62ch] leading-7">
              NEXUS connects intake, identity, assessment, contracting,
              obligations, resilience, surveillance and evidence around one
              authoritative third-party record. One relationship. One
              lifecycle. One defensible record.
            </p>
          </div>

          <div className="flex flex-wrap gap-[10px] lg:pb-1">
            <a href={BRIEFING_URL} className={primaryButton}>
              Book a briefing
            </a>

            <a
              href={NEXUS_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={ghostButton}
            >
              NEXUS overview (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="pt-16 pb-[10px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px]">

          {/* NARRATIVE BLOCK - tear sheet pages 1 and 2 */}
          <section className="max-w-[1120px] mx-auto mb-[64px]">

            {/* Lede + the four word-stats */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16">
              <div className="lg:max-w-[46%]">
                <h2 className="m-0 font-serif text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.03em] text-[#0A1A33]">
                  One relationship.
                  <br />
                  <span className="italic font-normal text-[#98A2B3]">
                    One lifecycle.
                  </span>
                  <br />
                  One defensible record.
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-7 lg:pt-3 lg:min-w-[380px]">
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    ONE
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    authoritative identity
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    AI
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    automates. You decide.
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    SIGNAL
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    built in
                  </p>
                </div>
                <div>
                  <p className="m-0 text-[30px] md:text-[34px] font-medium tracking-[-0.03em] text-[#0A1A33]">
                    EVERY
                  </p>
                  <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-[#667085]">
                    decision on the record
                  </p>
                </div>
              </div>
            </div>

            {/* Scattered fragments converging on one record, as on the
                tear sheet. Decorative only. */}
            <svg
              viewBox="0 0 800 60"
              aria-hidden="true"
              focusable="false"
              className="mt-10 w-full h-[54px]"
              preserveAspectRatio="none"
            >
              <path d="M 0 22 L 60 36 L 130 24" fill="none" stroke="#C3CCDA" strokeWidth="1.5" />
              <path d="M 170 20 L 230 38 L 290 30" fill="none" stroke="#C3CCDA" strokeWidth="1.5" />
              <path d="M 330 38 L 400 20 L 450 32" fill="none" stroke="#C3CCDA" strokeWidth="1.5" />
              <path d="M 500 8 L 760 30" fill="none" stroke="#2F6BFF" strokeWidth="1.5" />
              <path d="M 500 19 L 760 30" fill="none" stroke="#2F6BFF" strokeWidth="1.5" />
              <path d="M 500 30 L 760 30" fill="none" stroke="#2F6BFF" strokeWidth="1.5" />
              <path d="M 500 41 L 760 30" fill="none" stroke="#2F6BFF" strokeWidth="1.5" />
              <path d="M 500 52 L 760 30" fill="none" stroke="#2F6BFF" strokeWidth="1.5" />
              <circle cx="762" cy="30" r="4.5" fill="#2F6BFF" />
            </svg>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* The problem */}
            <p className={kicker}>The problem</p>

            <div className="mt-5 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
              <h3 className="m-0 lg:max-w-[46%] font-serif font-normal text-[26px] md:text-[30px] leading-[1.18] tracking-[-0.025em] text-[#0A1A33]">
                You don&rsquo;t have a third-party problem.{" "}
                <span className="text-[#2F6BFF]">
                  You have a fragmentation problem.
                </span>
              </h3>

              <p className="m-0 lg:max-w-[46%] text-[13px] leading-[1.75] text-[#475467]">
                The relationship is scattered across procurement, contracts,
                TPRM, cyber, sanctions, financial data, resilience and business
                ownership. The handoffs between them are where context
                disappears, duplicate work begins and defensibility breaks.
              </p>
            </div>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* How it works */}
            <p className={kicker}>How it works</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Onboard once.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Describe the purchase in plain English. Every third party
                  resolves to one legal entity, with sanctions and financial
                  viability checked on the spot.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Assess once.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  Questionnaires, SOC reports and evidence are gathered through
                  the portal and read by AI. Valid prior assessments and
                  evidence are reused &mdash; not repeated.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Contract right.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  The right NDA, MSA, SOW or PO from smart templates &mdash;
                  reviewed by two AI models and mapped to the regulators that
                  actually govern you.
                </p>
              </div>
              <div>
                <h3 className="m-0 text-[19px] md:text-[21px] font-normal tracking-[-0.02em] text-[#0A1A33] font-serif">
                  Watch always.
                </h3>
                <p className="mt-3 mb-0 text-[13px] leading-[1.7] text-[#475467]">
                  SIGNAL built in: cyber, sanctions, litigation, adverse media
                  and financial health &mdash; one register entry per issue,
                  not hundreds of alerts.
                </p>
              </div>
            </div>

            <hr className="mt-10 mb-10 border-0 border-t border-[#E2E7EF]" />

            {/* Built to replace + provenance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className={kicker}>Built to replace, not to add</p>

                <h3 className="mt-5 mb-0 font-serif font-normal text-[24px] md:text-[27px] leading-[1.2] tracking-[-0.025em] text-[#0A1A33]">
                  One platform. No suite to buy. No per-vendor data fees.
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  NEXUS replaces the patchwork of procurement, vendor-master,
                  CLM, TPRM, sanctions and financial-data tools.
                </p>
              </div>

              <div>
                <p className={kicker}>Built by a practitioner</p>

                <h3 className="mt-5 mb-0 font-serif font-normal text-[24px] md:text-[27px] leading-[1.2] tracking-[-0.025em] text-[#0A1A33]">
                  AI automates. You decide.
                </h3>

                <p className="mt-4 mb-0 text-[13px] leading-[1.75] text-[#475467]">
                  NEXUS is built by a practitioner with over thirty years of
                  experience at Morgan Stanley, J.P. Morgan, Merrill Lynch,
                  Barclays, SMBC and Bloomberg. AI proposes, logic verifies,
                  your people decide &mdash; and every decision is logged for
                  the examiner.
                </p>
              </div>
            </div>
          </section>

          {/* PRICING - tear sheet page 2 */}
          <div className="mb-8">
            <p className={kicker}>One platform. The entire third-party lifecycle.</p>

            <h2 className="mt-4 mb-0 font-serif text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A1A33]">
              Every user you need. One subscription.
            </h2>

            <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[#475467] max-w-[70ch]">
              TPRM, contracting, assessment, surveillance and examiner
              reporting &mdash; connected around one authoritative third-party
              record.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-16 border-y border-[#E2E7EF] py-2">
            {/* Price table, rendered from PRICING_ROWS */}
            <div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] px-4 py-[15px] border-b border-[#E2E7EF] text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase">
                <span>Annual platform pricing</span>
                <span>Annual subscription</span>
              </div>

              {PRICING_ROWS.map((row) => (
                <div
                  key={row.product}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] gap-6 px-4 py-[15px] border-b border-[#E2E7EF] text-[13px] ${
                    row.total ? "bg-[#EEF4FC]" : ""
                  }`}
                >
                  <span
                    className={`${
                      row.total ? "font-semibold" : "font-medium"
                    } text-[#1B56A6]`}
                  >
                    {row.product}
                  </span>
                  <span className="font-semibold text-[#0A1A33] text-right">
                    {row.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Entitlement notes, as on the sheet */}
            <div className="px-4 py-[15px] text-[12px] leading-[1.6] text-[#667085] space-y-4">
              <p className="m-0">Unlimited users. No per-seat charges.</p>
              <p className="m-0">
                <strong className="text-[#101828] font-semibold">
                  Important entitlement clarification:
                </strong>{" "}
                NEXUS includes integrated SIGNAL company-level surveillance for
                third parties managed within NEXUS. This is not the complete
                standalone SIGNAL product.
              </p>
              <p className="m-0">
                Implementation services are contracted and billed separately by
                approved Hatfield.ai implementation partners.
              </p>
            </div>
          </div>

          {/* INCLUDED WITH NEXUS - rendered from INCLUDED */}
          <div className="mt-12 text-[11px] font-semibold tracking-[0.13em] text-[#667085] uppercase border-b border-[#E2E7EF] pb-4">
            Included with NEXUS
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-0 border-b border-[#E2E7EF]">
            {INCLUDED.map((group) => (
              <div
                key={group.title}
                className="py-6 md:px-5 border-b md:border-b-0 border-[#E2E7EF]"
              >
                <h3 className="text-sm font-semibold text-[#0A1A33] mb-5">
                  {group.title}
                </h3>

                <ul className="list-none m-0 p-0">
                  {group.items.map((item) => (
                    <li key={item.main} className={bulletStyle}>
                      {renderCapability(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FINE PRINT - tear sheet page 2 */}
          <p className="mt-5 mb-0 text-[12px] text-[#667085] leading-[1.6]">
            <strong className="text-[#101828] font-semibold">
              Implementation fees are one-time charges, separate from the base
              subscription, and are negotiated directly with pre-approved
              Hatfield.ai implementation partners.
            </strong>{" "}
            CLMS is an optional add-on. No mandatory suite and no per-vendor
            data fees. Thresholds, weights, service levels and criticality
            bands are configured by your administrators without code. AI
            proposes, logic verifies, your people decide, and every decision
            is logged.
          </p>

          {/* THE RELATIONSHIP CHANGES - tear sheet page 3 */}
          <section className="border-t border-[#E2E7EF] pt-[46px] mt-[54px]">
            <p className={kicker}>From the first request to the last renewal</p>

            <h2 className="mt-4 mb-0 font-serif text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A1A33] max-w-[30ch]">
              The relationship changes. NEXUS keeps the thread.
            </h2>

            <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[#475467] max-w-[80ch]">
              Most platforms manage workflow. NEXUS runs the relationship.
            </p>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7 border-t border-[#E2E7EF] pt-8">
              {LIFECYCLE.map(({ moment, what }) => (
                <div key={moment}>
                  <h3 className="m-0 font-serif font-normal text-[18px] md:text-[19px] leading-[1.3] tracking-[-0.01em] text-[#0A1A33]">
                    {moment}
                  </h3>
                  <p className="mt-2 mb-0 text-[13px] leading-[1.65] text-[#667085]">
                    {what}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-7 border-t border-[#E2E7EF] pt-8">
              <div>
                <p className={kicker}>Your risk appetite, not ours</p>
                <p className="mt-2 mb-0 text-[14px] leading-[1.65] text-[#101828]">
                  Tolerance windows, risk weights, service levels and
                  criticality bands are settings your administrators change on
                  screen. No code.
                </p>
              </div>
              <div>
                <p className={kicker}>Built for a regulated institution</p>
                <p className="mt-2 mb-0 text-[14px] leading-[1.65] text-[#101828]">
                  Role-based access down to the document, multi-factor
                  authentication, a full audit log and a separate database for
                  every client.
                </p>
              </div>
            </div>

            {/* Closing band - the sheet's page-1 footer line */}
            <div className="mt-10 mb-[70px] bg-[#071326] rounded-2xl px-6 md:px-[38px] py-[30px] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="m-0 font-serif text-[22px] md:text-[26px] font-semibold text-white leading-[1.2]">
                  See NEXUS as one connected system.
                </p>
                <p className="mt-2 mb-0 text-[13px] text-[#B8C4D6]">
                  One relationship. One lifecycle. One defensible record.
                </p>
              </div>

              <a href={BRIEFING_URL} className={`shrink-0 ${primaryButton}`}>
                Book a briefing
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER - mirrors the SIGNAL page footer */}
      <footer className="bg-[#071326] text-[#8FA2BC] text-[12px] py-[27px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] flex flex-col sm:flex-row gap-4 justify-between">
          <p className="m-0">
            Hatfield Advisory LLC d/b/a Hatfield.ai, St. Petersburg, Florida
          </p>

          <p className="m-0">
            <a
              href={BRIEFING_URL}
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Book a briefing
            </a>

            {"  \u00b7  "}

            <a
              href={NEXUS_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              NEXUS overview (PDF)
            </a>

            {"  \u00b7  "}

            <a
              href="/signal"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              SIGNAL
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Nexus;