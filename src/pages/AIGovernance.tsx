import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
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
// AI GOVERNANCE & ASSURANCE page
// Route: /about/ai-governance
//
// 2026-10-13 (Frank, AI governance tranche, from the OpenAI master spec of
// 13 October 2026, sections 7 and 8).
//
// LOOK: built from the same pieces as the About page (src/pages/About.tsx):
// the same hero band, the same Card component, headings, spacing and the
// grey closing call to action. No new colours, fonts or libraries.
//
// WHAT IS HERE:
//   - Hero with the principle "Intelligence without surrendering control."
//   - The six public governance principles, two columns on desktop, one on
//     a phone (spec section 7, wording as approved in the spec).
//   - "AI Third-Party Risk Assessment" for NEXUS. Frank ruled on 2026-10-13
//     that this goes on this page, because the site has no NEXUS page.
//   - SIGNAL's part, the closing commitment, the public disclosure note and
//     a link to the Insights article (the article links back here).
//
// NEXUS CLAIMS (spec: describe unbuilt features as roadmap, not live).
// Checked in golden source prod_tprm on 2026-10-13; all rows are LIVE.
//   - 2026-10-13 (Frank): "as long as we have risk weighting for ai, that's
//     all that counts - the questions can be dynamically built and
//     assessed - there should be NO coding changes required". Confirmed in
//     code: the IRQ screen builds one section per IRQ_risk_category from the
//     irq table (create_irq_questionnaire_ui), the scoring engine weights an
//     "AI" category by RC_ai (irq_processor.py, v7.0) and saves it per
//     engagement as Eng_ai_risk, shown as "AI Risk". Frank set the AI weight
//     to 15% on the Risk Tolerance screen (total 100%).
//   - Agent autonomy, oversight and model risk are assessed through AI
//     questions in that questionnaire. Data rules for loading them: category
//     named exactly "AI"; trigger category InfoSec / BCM / Compliance (an AI
//     trigger flag is raised but nothing acts on it), which launches the
//     existing due-diligence assessment; the IRQ upload replaces the whole
//     question set, so the file carries every current question too.
//   - Information-security, operational-resilience (BCM, RTO/RPO
//     criticality tiers) and fourth-party / concentration assessment apply
//     to every third party, AI users included.
// If a capability is ever withdrawn, set its row in NEXUS_ASSESSMENT to
// "roadmap" and the label changes to "On the roadmap".
// ---------------------------------------------------------------------------

const PAGE_PATH = "/about/ai-governance";
const ARTICLE_PATH = "/insights/ai-intelligence-without-surrendering-control";

const principles = [
  {
    title: "Human Accountability and Oversight",
    description:
      "Responsibility for material risk decisions must remain with authorized individuals and institutions. AI can support analysis, identify concerns and recommend actions, but it should not independently determine risk appetite, accept material risks or replace established governance authority. Clear responsibilities, approval requirements, escalation paths and human oversight are essential.",
  },
  {
    title: "Transparency, Explainability and Traceability",
    description:
      "AI-generated intelligence should be distinguishable from verified source information. Where appropriate, findings should be supported by identifiable evidence, relevant dates, transparent assumptions and records sufficient for review. AI-assisted analysis must remain open to informed challenge.",
  },
  {
    title: "Controlled AI Authority",
    description:
      "AI capabilities should operate within explicitly defined permissions and operational boundaries. Higher-risk actions require proportionately stronger safeguards, authorization controls, activity monitoring, escalation and mechanisms for human intervention. Autonomy must not be confused with accountability.",
  },
  {
    title: "Information Security and Data Protection",
    description:
      "AI governance must be integrated with information security and data protection practices, including sensitive-data access, confidentiality, external technology dependencies and third-party model providers. Security and privacy must be addressed throughout the AI lifecycle.",
  },
  {
    title: "Operational Resilience and Recovery",
    description:
      "Organizations should understand dependencies on AI systems and external providers, establish continuity arrangements and prepare for failure, compromise and unexpected behavior. Critical processes require resilience, recoverability and controlled intervention.",
  },
  {
    title: "Continuous Monitoring and Improvement",
    description:
      "Models evolve, threats change and regulatory expectations develop. Effective governance requires periodic assessment, ongoing monitoring, testing, incident analysis, review of exceptions and continuous improvement.",
  },
];

// Each row is "live" (in NEXUS today, checked in code) or "roadmap".
// See the NEXUS CLAIMS note at the top of this file before changing a status.
type AssessmentStatus = "live" | "roadmap";
const NEXUS_ASSESSMENT: {
  title: string;
  description: string;
  status: AssessmentStatus;
}[] = [
  {
    title: "AI risk scoring",
    description:
      "AI is scored as its own inherent-risk category in every engagement, weighted by your administrators alongside information security, continuity, legal, financial and the other categories.",
    status: "live",
  },
  {
    title: "AI use by the third party",
    description:
      "The inherent risk questionnaire identifies third parties that use automation, AI or machine learning to make decisions on your behalf or in customer interactions. A yes requires an information-security assessment, or reuses a valid recent one.",
    status: "live",
  },
  {
    title: "Agent autonomy and permissions",
    description:
      "How far a third party\u2019s AI can act on its own in your systems, accounts and data, and whether your organization can pause or override it. High-risk answers trigger due diligence.",
    status: "live",
  },
  {
    title: "Governance and human oversight",
    description:
      "Where people remain in control of material decisions, and whether AI output drives decisions on customers, credit, payments or regulatory reporting. High-risk answers trigger due diligence.",
    status: "live",
  },
  {
    title: "Model risk and reliability",
    description:
      "Dependence on other companies\u2019 AI models, use of your data to train them, disclosure of models and testing, and the impact of wrong or harmful output.",
    status: "live",
  },
  {
    title: "Data privacy and security",
    description:
      "Information-security assessment applies to every third party that triggers it, AI users included.",
    status: "live",
  },
  {
    title: "Operational resilience",
    description:
      "Business-continuity assessment and criticality tiering from recovery time and recovery point objectives.",
    status: "live",
  },
  {
    title: "Fourth-party and concentration dependencies",
    description:
      "Fourth-party disclosure and concentration analysis across the third-party portfolio.",
    status: "live",
  },
];

const StatusLabel = ({ status }: { status: AssessmentStatus }) => (
  <span
    className={
      "inline-block flex-shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] " +
      (status === "live"
        ? "bg-[hsl(215,45%,15%)] text-white"
        : "border border-border text-muted-foreground")
    }
  >
    {status === "live" ? "Live today" : "On the roadmap"}
  </span>
);

const AIGovernance = () => {
  usePageMeta({
    title: "AI Governance & Assurance | Hatfield.ai",
    description:
      "Hatfield.ai\u2019s AI governance principles: intelligence without surrendering control. Human accountability, transparency, controlled AI authority, security, resilience and continuous improvement.",
    path: PAGE_PATH,
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero - same band as the About page hero */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-accent mb-4">
              Hatfield.ai &mdash; AI Governance &amp; Assurance
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Intelligence without surrendering control.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Artificial intelligence should strengthen risk identification,
              analysis and decision support&mdash;not replace institutional judgment,
              regulatory accountability or human oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Six principles */}
      <section className="py-12 bg-background" aria-labelledby="principles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="principles"
              className="text-4xl font-bold text-foreground mb-4"
            >
              Our Governance Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <Card
                key={principle.title}
                className="border-border hover:shadow-lg transition-all"
              >
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    {index + 1}. {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NEXUS and SIGNAL */}
      <section className="py-12 bg-muted/30" aria-labelledby="ecosystem">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="ecosystem"
            className="text-4xl font-bold text-foreground mb-6 text-center"
          >
            Extending Governance Across NEXUS and SIGNAL
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Responsible AI governance extends beyond the systems an organization
            operates directly. Third parties may build AI models, autonomous
            agents and external AI services into the work they do for you.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Our commitment to responsible AI extends beyond how we use the
            technology. It includes helping customers understand and govern the
            risks AI introduces throughout their third-party ecosystems.
          </p>

          {/* NEXUS - AI Third-Party Risk Assessment (spec section 8) */}
          <Card className="border-border shadow-lg mb-8">
            <CardContent className="pt-8 pb-8">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-accent mb-2">
                NEXUS &mdash; Govern the AI risks your third parties introduce
              </p>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                AI Third-Party Risk Assessment
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                NEXUS brings AI into the third-party risk assessment itself.
                Every engagement is screened for AI use, autonomy, oversight
                and model risk, scored as its own weighted risk category, and
                high-risk answers trigger due diligence within the same
                framework as every other third party.
              </p>

              <ul className="divide-y divide-border">
                {NEXUS_ASSESSMENT.map((row) => (
                  <li
                    key={row.title}
                    className="py-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
                  >
                    <div className="sm:w-36 sm:pt-1">
                      <StatusLabel status={row.status} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground">
                        {row.title}
                      </h4>
                      <p className="text-muted-foreground">{row.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* SIGNAL */}
          <Card className="border-border shadow-lg">
            <CardContent className="pt-8 pb-8">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-accent mb-2">
                SIGNAL &mdash; Monitor what changes
              </p>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Continuous Surveillance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                SIGNAL complements NEXUS with ongoing surveillance and risk
                intelligence on monitored companies, including cybersecurity
                incidents, regulatory developments, litigation, adverse media
                and material corporate changes. An assessment is a point-in-time
                view; SIGNAL shows when developments may warrant a fresh look.
                Together, NEXUS and SIGNAL support a connected approach: assess
                the exposure, monitor what changes, govern the risk.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Commitment + disclosure + related reading */}
      <section className="py-12 bg-background" aria-labelledby="commitment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="commitment"
            className="text-4xl font-bold text-foreground mb-6 text-center"
          >
            Our Commitment
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 text-center">
            Responsible innovation requires more than technological capability.
            It requires clear governance, effective safeguards, transparency
            about limitations and ongoing evaluation.
          </p>
          <p className="text-2xl font-semibold text-foreground text-center mb-10">
            Better intelligence. Stronger controls. Greater accountability.
          </p>

          <Card className="border-border mb-10">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Public disclosure:</strong>{" "}
                This framework describes Hatfield.ai governance principles and
                intended approach. It does not itself certify the implementation
                or effectiveness of individual technical controls. Specific
                assurance information is available through applicable customer
                due diligence and contractual processes.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-accent mb-3">
              Related reading
            </p>
            {/* h-auto + whitespace-normal: the title is long, so the
                button may wrap to two lines on a phone instead of running
                off the screen. */}
            <Button
              asChild
              variant="outline"
              className="h-auto whitespace-normal py-3"
            >
              <Link to={ARTICLE_PATH}>
                AI at the Crossroads: Why Greater Intelligence Demands Greater
                Control <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA - same as the About page */}
      <section className="py-20 bg-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Schedule a Demo and Become a Client
          </h2>
          <p className="text-xl text-gray-800 mb-12">
            Partner with us to transform your risk management and achieve
            sustainable growth
          </p>
          <Button
            asChild
            size="lg"
            className="text-xl px-12 py-6 h-auto bg-transparent border-2 border-gray-400 text-gray-900 hover:bg-gray-400/10"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIGovernance;