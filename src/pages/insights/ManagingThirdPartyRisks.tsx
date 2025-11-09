import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ManagingThirdPartyRisks = () => {
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
            Managing Third-Party Risks: Ensuring Business Continuity & Compliance
          </h1>
          <div className="flex items-center gap-4 text-article-text/70 text-sm">
            <span>October 15, 2025</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-article-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-article-text leading-relaxed mb-8">
              Third-party engagements are integral to the functioning of modern businesses. However, they come with critical risks that must be managed to safeguard the company's operations, reputation, and financial health.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Understanding Third-Party Risks</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              The foundation of any TPRM program lies in identifying and managing six primary categories of risk:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Operational & Financial Risk:</span>
                  <span className="text-article-text/90"> This pertains to the operational stability and financial health of third-party vendors.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Information & Physical Security:</span>
                  <span className="text-article-text/90"> Protecting sensitive data and physical assets from unauthorized access or breaches.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Legal & Regulatory Risk:</span>
                  <span className="text-article-text/90"> Ensuring compliance with laws and regulations to avoid legal repercussions.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Business Continuity:</span>
                  <span className="text-article-text/90"> Maintaining continuous business operations despite disruptions.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Geographic Risk:</span>
                  <span className="text-article-text/90"> Considering the political, economic, and environmental stability of the regions where third parties operate.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Reputational Risk:</span>
                  <span className="text-article-text/90"> The potential damage to the company's reputation, influenced by the other risk categories.</span>
                </div>
              </li>
            </ul>

            <div className="bg-[hsl(220,65%,25%)] p-6 my-8 rounded-lg">
              <p className="text-white italic">
                <strong>Note:</strong> It is crucial to align these risks with your organization's risk appetite and tolerance, defining the acceptable levels of risk and the maximum that can be tolerated.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">The Consequences of Loopholes in TPRM</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              Failing to manage third-party risks can lead to significant and costly consequences. High-profile breaches highlight the vulnerability of companies, regardless of size or industry:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">UnitedHealth Group's $872M loss in April 2024 ($1.6BN YTD August 2024) due to a cyberattack, executed via a vulnerable Citrix portal and impacting one third of Americans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">Capital One incident in 2019 where over 100 million credit applications were compromised</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">▸</span>
                <span className="text-article-text/90">Target breach in 2014, which exposed payment and personal information for 110 million customers, was linked to a compromised heating and air conditioning vendor</span>
              </li>
            </ul>

            <div className="bg-[hsl(220,65%,25%)] p-6 my-8 rounded-lg">
              <p className="text-white italic">
                <strong>Note:</strong> These cases highlight the vulnerability of companies, regardless of size or industry, to third-party risks.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Regulatory Guidance and Compliance</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              The regulatory landscape for TPRM is becoming increasingly stringent, especially concerning data privacy and cybersecurity. Legislation like the California Consumer Privacy Act (CCPA) emphasizes protecting consumer data privacy. In the financial services sector, regulators such as the FFIEC, OCC, and DFS have issued detailed guidelines focusing on business continuity, subcontracting, and cybersecurity. Aligning your TPRM program with these regulatory requirements is essential to avoid significant penalties and operational disruptions.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Building a Robust TPRM Program</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              A successful TPRM program should be built across six dimensions:
            </p>

            <ul className="space-y-3 mb-6 not-prose">
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Governance:</span>
                  <span className="text-article-text/90"> Establishing a robust governance model with enforceable policies and procedures.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Strategy:</span>
                  <span className="text-article-text/90"> Developing a strategic approach that aligns with business objectives.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Process:</span>
                  <span className="text-article-text/90"> Implementing efficient processes for risk assessment and mitigation.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Risk Framework:</span>
                  <span className="text-article-text/90"> Establishing a comprehensive risk framework.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Tools & Analytics:</span>
                  <span className="text-article-text/90"> Leveraging advanced tools and analytics for real-time risk monitoring.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-semibold">•</span>
                <div>
                  <span className="text-article-text font-semibold">Implementation & Change Management:</span>
                  <span className="text-article-text/90"> Ensuring effective implementation and adaptability to change.</span>
                </div>
              </li>
            </ul>

            <div className="bg-[hsl(220,65%,25%)] p-6 my-8 rounded-lg">
              <p className="text-white italic">
                <strong>Note:</strong> It is crucial to identify, assess, and mitigate risks at the speed of business, enabling rather than impeding business operations.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Rule-Based Segmentation and Risk Assessment</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              Not all vendors and suppliers pose the same level of risk. It is important to use a rule-based model to quickly identify and assess the critical and high-risk third parties. Generally, about 5-10% of your third-party population will meet this criterion. Continuous monitoring and risk sensing are essential to manage these critical suppliers effectively. Establish/leverage supplier risk dashboards that utilize real-time data and predictive analytics to manage supplier risk, providing insights into social media sentiment, negative news alerts, company litigation, geographical risk, financials, and supply chain relationships.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Ensuring Business Continuity</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              The COVID-19 pandemic has highlighted the importance of supply chain resilience. According to the National Association of Manufacturers, 78% of manufacturers in the U.S. were financially impacted by COVID-19, with 35% confirming supply chain disruptions. While we cannot fully mitigate the risk of events like COVID-19, we must consider such catastrophic events in our risk planning, ensuring business continuity and disaster recovery plans are adaptable and robust.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">The Criticality of Third-Party Dependencies</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              Understanding and managing critical third-party dependencies is vital. A small but essential component supplier can significantly impact business operations if non-compliant or disrupted. It's not the size of the supplier that matters but their potential impact on your business. Ensuring compliance, maintaining sufficient inventory, and working closely with critical suppliers are key to mitigating such risks.
            </p>

            <h2 className="text-3xl font-bold text-article-text mb-6 mt-12">Conclusion</h2>
            <p className="text-article-text/90 leading-relaxed mb-6">
              Effective Third-Party Risk Management is essential for safeguarding business operations, maintaining compliance, and protecting reputations. By understanding and addressing the six categories of risk, adhering to regulatory requirements, and building a robust TPRM program, organizations can manage third-party risks effectively and ensure business continuity.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ManagingThirdPartyRisks;
