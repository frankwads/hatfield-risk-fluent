import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const RealTimeRiskMonitoring = () => {
  return (
    <div className="min-h-screen bg-article-bg">
      <Navigation />

      {/* Article Header */}
      <section className="pt-32 pb-8 bg-article-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/insights">
            <Button variant="ghost" className="mb-6 text-article-text hover:text-article-text/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-article-text mb-6">
            Real-Time Risk Monitoring: Continuous Third-Party Risk Surveillance
          </h1>
          <div className="flex items-center gap-4 text-article-text/70 text-sm">
            <span>September 28, 2025</span>
            <span>•</span>
            <span>7 min read</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-article-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-article-text leading-relaxed mb-8">
              Hatfield introduces a next-generation approach to continuous third-party risk surveillance through an intelligent, centralized dashboard that provides organizations with a single pane of glass to monitor, detect, and mitigate emerging risks across their critical supplier ecosystem.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Overview</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              Hatfield introduces a next-generation approach to continuous third-party risk surveillance through an intelligent, centralized dashboard that provides organizations with a single pane of glass to monitor, detect, and mitigate emerging risks across their critical supplier ecosystem. Traditional third-party risk programs rely on static, periodic reviews; Hatfield transforms this into a dynamic, real-time risk sensing capability powered by autonomous AI agents and advanced analytics.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Centralized Surveillance Dashboard</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              The Third-Party Risk Surveillance Dashboard consolidates all business-critical and high-risk third parties across the enterprise into one integrated view. It serves as the operational command center for ongoing monitoring, alerting, and mitigation—enabling users to:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <span className="text-article-text/90">Track real-time alerts from financial, legal, cyber, and reputational sources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <span className="text-article-text/90">Visualize geographical exposure and emerging country-level risks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <span className="text-article-text/90">Analyze corporate financial health, including liquidity, profitability, and credit signals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <span className="text-article-text/90">Assess supply chain dependencies and cascading risk exposure</span>
              </li>
            </ul>

            <div className="bg-[hsl(220,65%,25%)] p-6 my-8 rounded-lg">
              <p className="text-white italic">
                <strong>Note:</strong> Through this unified interface, risk and procurement teams gain actionable intelligence and the ability to prioritize response actions based on severity, likelihood, and business impact.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">AI-Driven Risk Sensing</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              Hatfield deploys a network of independent AI agents that continuously monitor each critical third-party across multiple data domains:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Negative News Detection:</span>
                  <span className="text-article-text/90"> NLP models scan trusted global sources for adverse press or regulatory mentions.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Social Media Sentiment Analysis:</span>
                  <span className="text-article-text/90"> Machine-learning classifiers gauge sentiment trends, identifying early reputational risk indicators.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Litigation & Corporate Action Monitoring:</span>
                  <span className="text-article-text/90"> Legal data feeds surface active and historical cases, mergers, divestitures, or restructurings.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Cybersecurity Alerting:</span>
                  <span className="text-article-text/90"> External intelligence sources are cross-referenced with vendor digital footprints to detect breaches or vulnerabilities.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Financial Viability Assessments:</span>
                  <span className="text-article-text/90"> Real-time models perform automated Piotroski-based financial viability scoring (FVA) and trend analytics for public entities, supplemented by manual assessments for private firms.</span>
                </div>
              </li>
            </ul>

            <div className="bg-[hsl(220,65%,25%)] p-6 my-8 rounded-lg">
              <p className="text-white italic">
                <strong>Note:</strong> Each AI agent operates autonomously yet contributes to an integrated risk ontology, ensuring every dimension of third-party risk is continuously sensed and contextualized.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">AgenticAI Coordination and Response</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              At the core of Hatfield's monitoring engine lies agenticAI, an orchestrated multi-agent framework that synthesizes inputs from all sensing agents. AgenticAI performs three key functions:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Risk Correlation & Prioritization:</span>
                  <span className="text-article-text/90"> It correlates signals across financial, cyber, legal, and media domains to derive a composite risk score.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Intelligent Escalation:</span>
                  <span className="text-article-text/90"> Based on pre-defined thresholds and tolerance levels, it automatically generates targeted alerts for end-users, TPRM analysts, and subject-matter experts (SMEs).</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Adaptive Risk Adjustment:</span>
                  <span className="text-article-text/90"> It dynamically updates the associated Third-Party Risk Profile, triggering mitigations such as enhanced due diligence, re-assessment, or temporary suspension of onboarding or renewal activities.</span>
                </div>
              </li>
            </ul>

            <div className="bg-[hsl(220,65%,25%)] p-6 my-8 rounded-lg">
              <p className="text-white italic">
                <strong>Note:</strong> Through this closed feedback loop, Hatfield's surveillance engine ensures that emerging risks are not only detected but actively managed—transforming raw data into actionable operational intelligence.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Outcome</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              The result is a proactive, predictive, and preventative risk-management ecosystem. Organizations can detect early warning signals long before they escalate into compliance, operational, or reputational events. Hatfield thus enables enterprises to move from reactive governance to autonomous risk resilience, achieving:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">Reduced vendor-related disruptions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">Faster incident response and containment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">Lower compliance and audit exposure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">Enhanced transparency and stakeholder confidence</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealTimeRiskMonitoring;
