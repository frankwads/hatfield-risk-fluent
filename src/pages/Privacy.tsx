// ---------------------------------------------------------------------------
// PRIVACY NOTICE page
// Route: /privacy   (https://www.hatfield.ai/privacy)
//
// 2026-11-20 (Frank): "generate a privacy notice of best in class standards and
// then commands to publish it" - HatfieldIQ go-live list item "privacy notice
// published, URL added to the footer PRIVACY_URL line and to Stripe".
//
// WHAT THE NOTICE STATES, AND WHERE EACH FACT WAS CHECKED (2026-11-20)
//   Website (this repo, commit f052c9f):
//     - Vercel hosts the site; <Analytics /> in src/App.tsx is Vercel Web
//       Analytics, which Vercel documents as cookieless, with a visitor hash
//       that resets daily.
//     - index.html loads Google Fonts (fonts.googleapis.com / fonts.gstatic.com).
//     - the contact form posts to api/contact.mjs, which e-mails
//       contact@hatfield.ai through Twilio SendGrid (@sendgrid/mail).
//     - the HatfieldIQ registration form (src/pages/Signal.tsx) posts to
//       signal.hatfield.ai/api/register and uses Cloudflare Turnstile.
//     - the homepage video is a YouTube embed inside a dialog, so YouTube
//       loads only when a visitor opens the video.
//   Platform (Frank's production estate, as recorded in earlier sessions):
//     - DigitalOcean server in the United States; Stripe Checkout and the
//       Stripe customer portal (card details never reach Hatfield.ai's
//       servers); passwords stored as salted PBKDF2 hashes; Google Workspace
//       for e-mail and calendars; OpenAI first, Anthropic where used, for AI
//       interpretation and summaries.
//   Product positions (Frank's 2026-11-17 User Agreement rulings): third-party
//   AI providers may not train general-purpose models on identifiable client
//   data; Hatfield.ai may use aggregated / de-identified data to improve its
//   services; risk ratings and sanctions results are standardized indicators.
//
// DELIBERATELY NOT CLAIMED (not verified, or not true today): any certification
// (SOC 2 / ISO), encryption at rest, an EU/UK representative, Data Privacy
// Framework participation, fixed retention periods. Retention is described by
// criteria, which GDPR Art. 13(2)(a) permits. Add any of these only once true.
//
// LOOK: the same hero band and Card component as the About and AI Governance
// pages; no new colours, fonts or libraries. Plain ASCII only (2026-10-13 rule):
// typographic characters are written as HTML entities.
//
// TO CHANGE THE NOTICE: edit the text below, update EFFECTIVE_DATE and
// VERSION, and say what changed in "Changes to this notice".
// ---------------------------------------------------------------------------
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { usePageMeta } from "@/lib/usePageMeta";

const PAGE_PATH = "/privacy";
const EFFECTIVE_DATE = "November 20, 2026";
const VERSION = "2026-11-20.1";
const PRIVACY_EMAIL = "contact@hatfield.ai";
const TERMS_URL = "https://signal.hatfield.ai/terms";

const linkClass = "text-accent underline underline-offset-4 hover:opacity-80";

const toc = [
  { id: "who-we-are", label: "Who we are and what this notice covers" },
  { id: "what-we-collect", label: "Personal information we collect" },
  { id: "how-we-use", label: "How we use it, and our legal bases" },
  { id: "intelligence", label: "People named in our risk intelligence" },
  { id: "ai", label: "Artificial intelligence and automated processing" },
  { id: "cookies", label: "Cookies and similar technologies" },
  { id: "sharing", label: "Who we share it with" },
  { id: "transfers", label: "International transfers" },
  { id: "retention", label: "How long we keep it" },
  { id: "security", label: "How we protect it" },
  { id: "rights", label: "Your rights and choices" },
  { id: "state-rights", label: "Additional information for U.S. residents" },
  { id: "eu-uk", label: "Additional information for the EEA, UK and Switzerland" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes to this notice" },
  { id: "contact", label: "How to contact us" },
];

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 mb-12">
    <h2 id={`${id}-h`} className="text-3xl font-bold text-foreground mb-4">
      {title}
    </h2>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-semibold text-foreground pt-2">{children}</h3>
);

const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-2">{children}</ul>
);

const Privacy = () => {
  usePageMeta({
    title: "Privacy Notice | Hatfield.ai",
    description:
      "How Hatfield.ai collects, uses, shares and protects personal information across its website, HatfieldIQ and HatfieldRISQ, and how to exercise your privacy rights.",
    path: PAGE_PATH,
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero - same band as the About and AI Governance pages */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-accent mb-4">
              <span className="normal-case">Hatfield.ai&trade;</span> &mdash; Legal
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Privacy Notice
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We build risk intelligence for organizations, not profiles of
              people. This notice explains, in plain language, what personal
              information we handle, why, and the choices you have.
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              Effective {EFFECTIVE_DATE} &middot; Version {VERSION}
            </p>
          </div>
        </div>
      </section>

      <main className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* At a glance */}
          <Card className="border-border mb-10">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Privacy at a glance
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">We do not sell personal information</strong>,
                  share it for cross-context behavioral advertising, or use it
                  for targeted advertising.
                </li>
                <li>
                  <strong className="text-foreground">We never see your full card number.</strong>{" "}
                  Payments are handled by Stripe; card details go directly to
                  Stripe and are not stored on our servers.
                </li>
                <li>
                  <strong className="text-foreground">No advertising or tracking cookies.</strong>{" "}
                  Our website analytics are cookieless and cannot follow you
                  across days or other websites.
                </li>
                <li>
                  <strong className="text-foreground">Our AI providers may not train on your identifiable data.</strong>{" "}
                  We use AI to interpret information and draft summaries, and a
                  person can always ask us to review a result.
                </li>
                <li>
                  <strong className="text-foreground">The same rights for everyone.</strong>{" "}
                  Wherever you live, you can ask to access, correct or delete
                  your personal information, and object to how we use it, by
                  e-mailing{" "}
                  <a className={linkClass} href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20request`}>
                    {PRIVACY_EMAIL}
                  </a>
                  .
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contents */}
          <nav aria-label="Contents" className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contents</h2>
            <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
              {toc.map((t) => (
                <li key={t.id}>
                  <a className={linkClass} href={`#${t.id}`}>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="who-we-are" title="1. Who we are and what this notice covers">
            <p>
              Hatfield.ai is the trading name of Hatfield Advisory LLC, a New
              York limited liability company (&ldquo;Hatfield.ai&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;). We provide HatfieldIQ&trade;,
              an enterprise risk-intelligence subscription, and HatfieldRISQ&trade;,
              a third-party risk management and contract lifecycle platform, and
              related advisory services.
            </p>
            <p>
              This notice applies to personal information we handle when you
              visit www.hatfield.ai, contact us, register for or use HatfieldIQ
              (signal.hatfield.ai), use HatfieldRISQ, do business with us, apply
              to work with us, or are named in the public-record information our
              services analyze. For that information, Hatfield.ai is the
              &ldquo;controller&rdquo; (the business that decides how and why it
              is used).
            </p>
            <p>
              <strong className="text-foreground">When we act for our clients.</strong>{" "}
              When a client loads its own information into HatfieldRISQ&mdash;for
              example the contacts at its suppliers, questionnaire answers or
              contracts&mdash;or invites people to its vendor portal, we process
              that information on the client&rsquo;s behalf and under its
              instructions, as its &ldquo;processor&rdquo; or &ldquo;service
              provider&rdquo;. The client&rsquo;s own privacy notice governs that
              information, and requests about it should go to the client first;
              we will help the client respond.
            </p>
            <p>
              Your use of our services is also governed by the{" "}
              <a className={linkClass} href={TERMS_URL} target="_blank" rel="noopener noreferrer">
                HatfieldIQ User Agreement
              </a>{" "}
              or your organization&rsquo;s agreement with us.
            </p>
          </Section>

          <Section id="what-we-collect" title="2. Personal information we collect">
            <p>
              We collect only what we need for the purposes in section 3. Most
              of what we handle is about companies, not people.
            </p>

            <Sub>Information you give us</Sub>
            <List>
              <li>
                <strong className="text-foreground">Contact and demo requests:</strong>{" "}
                your name, work e-mail, company, phone number (optional), area of
                interest and message.
              </li>
              <li>
                <strong className="text-foreground">Registration and accounts:</strong>{" "}
                your organization, name, job title or role, work e-mail, phone
                number, industry, the plan and number of companies you request,
                your password (which we store only as a salted hash) and any
                notes you add.
              </li>
              <li>
                <strong className="text-foreground">Using the service:</strong>{" "}
                the companies you choose to monitor, your alert and display
                settings, questions you ask the in-product assistant, and
                feedback or support requests.
              </li>
              <li>
                <strong className="text-foreground">Billing:</strong>{" "}
                billing contact and address details. Card and bank details are
                entered directly with Stripe. We receive from Stripe only
                payment status and limited payment-method details (such as card
                brand and last four digits).
              </li>
              <li>
                <strong className="text-foreground">Business dealings:</strong>{" "}
                contact details and correspondence with clients, partners,
                suppliers and advisers, including meeting scheduling details.
              </li>
              <li>
                <strong className="text-foreground">Job applications:</strong>{" "}
                your CV or resume, work history, qualifications and anything else
                you choose to send us.
              </li>
            </List>

            <Sub>Information collected automatically</Sub>
            <List>
              <li>
                <strong className="text-foreground">Service and security logs:</strong>{" "}
                IP address, browser and device type, pages and features used,
                sign-in times, and error and security events. We use these to
                run, secure and improve the service.
              </li>
              <li>
                <strong className="text-foreground">Website analytics:</strong>{" "}
                aggregated page-view statistics (see section 6).
              </li>
            </List>

            <Sub>Information from other sources</Sub>
            <List>
              <li>
                <strong className="text-foreground">Public and official sources:</strong>{" "}
                government sanctions and watch lists, company registries,
                regulatory filings (for example SEC filings and the GLEIF LEI
                index), court records, regulator announcements and news
                publications. See section 4.
              </li>
              <li>
                <strong className="text-foreground">Business contact information:</strong>{" "}
                professional contact details of people at organizations we may
                work with, from public websites, professional networks you are
                connected to us on, events, referrals from partners, and business
                contact data providers.
              </li>
              <li>
                <strong className="text-foreground">Your organization:</strong>{" "}
                if your organization&rsquo;s administrator gives you access, we
                receive your name and work e-mail from them.
              </li>
              <li>
                <strong className="text-foreground">Service providers:</strong>{" "}
                payment confirmations from Stripe and bot-protection results from
                Cloudflare.
              </li>
            </List>
            <p>
              We do not ask for, and ask you not to send us, sensitive
              information such as government ID numbers, health information or
              information about racial or ethnic origin, religion or sexual
              orientation.
            </p>
          </Section>

          <Section id="how-we-use" title="3. How we use it, and our legal bases">
            <p>
              Where the law requires a legal basis (for example in the EEA and
              the UK), we rely on the one shown for each purpose.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-border">
                <thead className="bg-muted/50 text-foreground">
                  <tr>
                    <th className="p-3 border-b border-border w-1/2">Purpose</th>
                    <th className="p-3 border-b border-border">Legal basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Providing the services: creating and administering accounts, delivering intelligence, alerts and briefings, and support.", "Performance of a contract with you or your organization; our legitimate interest in serving our clients' users."],
                    ["Billing, payments, invoices, tax and accounting.", "Performance of a contract; legal obligation."],
                    ["Answering enquiries and arranging demonstrations and meetings.", "Steps you ask us to take before a contract; legitimate interests."],
                    ["Producing risk intelligence about companies, including sanctions, litigation, regulatory and news screening that may name individuals (section 4).", "Legitimate interests of our clients and of us in helping organizations manage legal, financial and compliance risk; legal obligations our clients are subject to."],
                    ["Security: protecting accounts, detecting fraud and abuse, and keeping the service available.", "Legitimate interests; legal obligation."],
                    ["Improving and developing our services, including with aggregated or de-identified information.", "Legitimate interests."],
                    ["Business-to-business marketing about our services. You can opt out at any time.", "Legitimate interests; consent where the law requires it."],
                    ["Recruiting.", "Steps you ask us to take before a contract; legitimate interests."],
                    ["Complying with law, responding to lawful requests, and establishing or defending legal claims.", "Legal obligation; legitimate interests."],
                  ].map(([purpose, basis]) => (
                    <tr key={purpose} className="align-top">
                      <td className="p-3 border-b border-border">{purpose}</td>
                      <td className="p-3 border-b border-border">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Where we rely on legitimate interests, we have weighed them against
              your rights and expectations. You can ask us for more information
              about that assessment, and you can object (section 11).
            </p>
          </Section>

          <Section id="intelligence" title="4. People named in our risk intelligence">
            <p>
              Our clients use HatfieldIQ and HatfieldRISQ to understand the
              companies they work with. The information we analyze is about
              organizations, but some public records name people: for example
              company officers, directors and owners, individuals on government
              sanctions or politically exposed persons lists, parties to court
              cases, and people mentioned in news reports or regulatory actions.
            </p>
            <List>
              <li>
                We collect this only from public and official sources, and only
                because it bears on the risk an organization presents.
              </li>
              <li>
                We do not build or sell profiles of private individuals, and we
                do not use this information for marketing.
              </li>
              <li>
                Sanctions and similar screening results are possible-match
                indicators produced by name-matching against official lists.
                They are not findings about a person, and our clients are told
                to review them before acting.
              </li>
              <li>
                We keep a link to the source so the information can be checked,
                and we correct or remove information that is shown to be wrong.
              </li>
            </List>
            <p>
              If you believe information about you is inaccurate or should not
              be included, contact us (section 16). You have the right to object
              to this processing, and we will stop unless we have compelling
              legitimate grounds or need it for legal claims.
            </p>
          </Section>

          <Section id="ai" title="5. Artificial intelligence and automated processing">
            <p>
              We use large language models from third-party providers, currently
              OpenAI and Anthropic, to classify and interpret information and to
              draft summaries such as the Executive Daily Briefing. These results
              are labelled as AI-assisted and are decision support, not
              decisions.
            </p>
            <List>
              <li>
                Our providers process the data we send them only to return a
                result to us. Under their business API terms they do not use that
                data to train their models, and we do not authorize any provider
                to train general-purpose models on identifiable client data.
              </li>
              <li>
                We do not make decisions that have legal or similarly significant
                effects on individuals based solely on automated processing.
              </li>
              <li>
                You can ask us to have a person review any AI-assisted result
                that concerns you.
              </li>
            </List>
            <p>
              Our approach to AI is set out further in our{" "}
              <a className={linkClass} href="/about/ai-governance">
                AI Governance &amp; Assurance
              </a>{" "}
              principles.
            </p>
          </Section>

          <Section id="cookies" title="6. Cookies and similar technologies">
            <p>
              We do not use advertising, retargeting or cross-site tracking
              cookies. Because we use only the technologies below, we do not show
              a cookie banner.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-border">
                <thead className="bg-muted/50 text-foreground">
                  <tr>
                    <th className="p-3 border-b border-border">Technology</th>
                    <th className="p-3 border-b border-border">Where</th>
                    <th className="p-3 border-b border-border">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sign-in session cookie", "signal.hatfield.ai", "Keeps you signed in and protects your session. Strictly necessary."],
                    ["Vercel Web Analytics", "www.hatfield.ai", "Counts page views without cookies. Visitors are identified by a hash that resets every day, so you cannot be followed across days or other websites."],
                    ["Cloudflare Turnstile", "HatfieldIQ registration form", "Checks that a person, not a bot, is registering. Strictly necessary for security."],
                    ["Google Fonts", "www.hatfield.ai", "Delivers our typefaces. Your browser connects to Google, which receives your IP address."],
                    ["YouTube video", "www.hatfield.ai homepage", "Loads only if you choose to play our introduction video. YouTube may then set its own cookies under Google's privacy policy."],
                  ].map(([tech, where, what]) => (
                    <tr key={tech} className="align-top">
                      <td className="p-3 border-b border-border text-foreground">{tech}</td>
                      <td className="p-3 border-b border-border">{where}</td>
                      <td className="p-3 border-b border-border">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              You can block or delete cookies in your browser settings. If you
              block the sign-in session cookie, you will not be able to sign in.
            </p>
          </Section>

          <Section id="sharing" title="7. Who we share it with">
            <p>We share personal information only as follows.</p>
            <Sub>Service providers who work for us</Sub>
            <p>
              They may use it only to provide their service to us, under written
              terms that require confidentiality and security.
            </p>
            <List>
              <li>Hosting and infrastructure: DigitalOcean (our platform servers, United States) and Vercel (our website).</li>
              <li>Payments: Stripe.</li>
              <li>E-mail, calendars and productivity: Google Workspace; Twilio SendGrid (delivers website contact-form messages to us).</li>
              <li>Security: Cloudflare (bot protection on registration).</li>
              <li>Artificial intelligence: OpenAI and Anthropic (section 5).</li>
              <li>Professional advisers such as lawyers, accountants and auditors, under duties of confidentiality.</li>
            </List>
            <Sub>Others</Sub>
            <List>
              <li>
                <strong className="text-foreground">Your organization:</strong>{" "}
                administrators of your organization&rsquo;s subscription can see
                its users, their roles and sign-in activity.
              </li>
              <li>
                <strong className="text-foreground">Our clients:</strong>{" "}
                public-record intelligence about organizations (section 4) is
                made available to our subscribers.
              </li>
              <li>
                <strong className="text-foreground">Authorities and legal process:</strong>{" "}
                when the law requires it, or when necessary to protect rights,
                safety or security, or to establish or defend legal claims.
              </li>
              <li>
                <strong className="text-foreground">Business transfers:</strong>{" "}
                to a buyer or successor in a merger, acquisition, financing or
                sale of assets, who will be bound by this notice.
              </li>
              <li>
                <strong className="text-foreground">With your direction:</strong>{" "}
                with anyone else when you ask us to.
              </li>
            </List>
          </Section>

          <Section id="transfers" title="8. International transfers">
            <p>
              We are based in the United States and our platform is hosted
              there. If you are outside the United States, your information will
              be transferred to, and processed in, the United States and in other
              countries where our service providers operate. Those countries may
              not have the same data protection laws as yours.
            </p>
            <p>
              Where the law requires a transfer safeguard, for example for
              information from the European Economic Area, the United Kingdom or
              Switzerland, we use the European Commission&rsquo;s Standard
              Contractual Clauses (with the UK Addendum where relevant), or rely
              on an adequacy decision or a provider&rsquo;s certification. You
              can ask us for a copy of the relevant safeguards.
            </p>
          </Section>

          <Section id="retention" title="9. How long we keep it">
            <p>
              We keep personal information only for as long as we need it for
              the purposes in this notice, and then delete or anonymize it. How
              long depends on:
            </p>
            <List>
              <li>
                <strong className="text-foreground">Accounts:</strong>{" "}
                while your account or your organization&rsquo;s subscription is
                active, and afterwards for as long as needed to close the account,
                resolve questions and meet legal obligations.
              </li>
              <li>
                <strong className="text-foreground">Billing and tax records:</strong>{" "}
                for the periods required by tax and accounting law.
              </li>
              <li>
                <strong className="text-foreground">Enquiries and business contacts:</strong>{" "}
                while the business relationship or conversation is current, or
                until you ask us to stop contacting you. We keep a minimal record
                of an opt-out so that we respect it.
              </li>
              <li>
                <strong className="text-foreground">Risk intelligence:</strong>{" "}
                while it remains relevant to the risk of a monitored organization,
                and as needed to keep an accurate record of screening results our
                clients relied on. Information shown to be wrong is corrected or
                marked as superseded.
              </li>
              <li>
                <strong className="text-foreground">Logs and backups:</strong>{" "}
                security logs for as long as needed to investigate incidents;
                backups are overwritten on a rolling basis.
              </li>
              <li>
                <strong className="text-foreground">Job applications:</strong>{" "}
                for the recruiting process and a reasonable period afterwards,
                unless you agree to us keeping it longer for future roles.
              </li>
            </List>
          </Section>

          <Section id="security" title="10. How we protect it">
            <p>
              We use administrative, technical and organizational measures
              designed to protect personal information, including:
            </p>
            <List>
              <li>encrypted (HTTPS/TLS) connections to our website and services;</li>
              <li>passwords stored only as salted, one-way hashes;</li>
              <li>card payments handled entirely by Stripe, so card numbers never reach our servers;</li>
              <li>separate database accounts for different parts of the platform, with access restricted by role;</li>
              <li>access limited to personnel who need it, and regular backups.</li>
            </List>
            <p>
              No system is perfectly secure. If we become aware of a breach that
              affects your personal information, we will notify you and the
              authorities as the law requires.
            </p>
          </Section>

          <Section id="rights" title="11. Your rights and choices">
            <p>
              We offer these rights to everyone, wherever you live, subject to
              the limits and exceptions the law allows:
            </p>
            <List>
              <li><strong className="text-foreground">Access</strong> the personal information we hold about you and receive a copy, including in a portable format.</li>
              <li><strong className="text-foreground">Correct</strong> information that is inaccurate or incomplete.</li>
              <li><strong className="text-foreground">Delete</strong> your information.</li>
              <li><strong className="text-foreground">Object</strong> to processing based on legitimate interests, including for the intelligence described in section 4, and to direct marketing at any time.</li>
              <li><strong className="text-foreground">Restrict</strong> how we use your information while a concern is resolved.</li>
              <li><strong className="text-foreground">Withdraw consent</strong> where we rely on it, without affecting earlier processing.</li>
              <li><strong className="text-foreground">Ask for human review</strong> of an AI-assisted result that concerns you.</li>
            </List>
            <Sub>How to make a request</Sub>
            <p>
              E-mail{" "}
              <a className={linkClass} href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20request`}>
                {PRIVACY_EMAIL}
              </a>{" "}
              with the subject &ldquo;Privacy request&rdquo;, or write to us at
              the address in section 16. We will confirm receipt, may ask for
              information to verify your identity (we use it only for that), and
              respond within one month, or 45 days where U.S. state law applies.
              If we need longer, we will tell you why. Requests are free unless
              they are clearly unfounded or excessive.
            </p>
            <p>
              You may use an authorized agent; we may ask the agent for proof of
              authority and ask you to confirm your identity. We will not treat
              you differently for exercising your rights.
            </p>
            <Sub>Marketing</Sub>
            <p>
              You can unsubscribe from our marketing e-mails using the link in
              any message, or by e-mailing us. We will still send service and
              billing messages while you have an account.
            </p>
          </Section>

          <Section id="state-rights" title="12. Additional information for U.S. residents">
            <p>
              Several U.S. states, including California, give residents specific
              privacy rights. In the last 12 months we have collected the
              categories of personal information described in section 2:
              identifiers and contact details; commercial information (plans and
              billing); internet and network activity; professional and
              employment information; and, for people named in public records,
              public-record information. We collect it from the sources and use
              it for the purposes in sections 2 and 3, disclose it to the
              categories of recipients in section 7, and keep it as described in
              section 9.
            </p>
            <List>
              <li>We do not sell personal information and do not share it for cross-context behavioral advertising, and have not done so in the last 12 months.</li>
              <li>We do not use or disclose sensitive personal information for purposes that would give a right to limit its use.</li>
              <li>Because we do not sell or share personal information, a &ldquo;Do Not Sell or Share&rdquo; request or a Global Privacy Control signal has nothing to switch off; we honor it by continuing not to sell or share.</li>
              <li>If we decline your request, you can appeal by replying to our decision with the subject &ldquo;Privacy appeal&rdquo;. We will respond within the time the law allows and explain how to contact your state attorney general if you disagree.</li>
            </List>
          </Section>

          <Section id="eu-uk" title="13. Additional information for the EEA, UK and Switzerland">
            <p>
              Hatfield Advisory LLC is the controller of your personal
              information as described in section 1. You have the rights set out
              in section 11, including the right to object, and you also have the
              right to lodge a complaint with the data protection authority where
              you live or work or where an issue arose. We would welcome the
              chance to address your concern first, so please contact us.
            </p>
          </Section>

          <Section id="children" title="14. Children">
            <p>
              Our website and services are for businesses and professionals and
              are not directed at children. We do not knowingly collect personal
              information from anyone under 18. If you believe a child has given
              us personal information, contact us and we will delete it.
            </p>
          </Section>

          <Section id="changes" title="15. Changes to this notice">
            <p>
              We will update this notice when our practices change. We will
              change the effective date and version at the top, and, for material
              changes, notify account holders by e-mail or in the service before
              the change takes effect.
            </p>
            <p>Version {VERSION} ({EFFECTIVE_DATE}): first published version.</p>
          </Section>

          <Section id="contact" title="16. How to contact us">
            <Card className="border-border">
              <CardContent className="pt-6 space-y-2 text-muted-foreground">
                <p className="text-foreground font-semibold">Hatfield Advisory LLC d/b/a Hatfield.ai&trade;</p>
                <p>
                  Attention: Privacy
                  <br />
                  555 5th Avenue Northeast, Suite 833
                  <br />
                  St. Petersburg, FL 33701, United States
                </p>
                <p>
                  E-mail:{" "}
                  <a className={linkClass} href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20request`}>
                    {PRIVACY_EMAIL}
                  </a>{" "}
                  (subject: &ldquo;Privacy request&rdquo;)
                </p>
              </CardContent>
            </Card>
            <p className="pt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className={linkClass}
              >
                Print or save this notice as a PDF
              </button>
            </p>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
