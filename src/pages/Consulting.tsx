import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Consulting = () => {
  const services = [
    {
      title: "Third-Party Risk Management",
      subtitle: "Manage Your Third-Party Risk, Don't Let It Manage You",
      description:
        "While effective risk management procedures are important, companies cannot lose sight of underlying primary business objectives. Hatfield Advisory is a valuable resource in helping you develop and enhance the efficacy of your TPRM program.",
      details: [
        "Third-party risk management serves a critical function to the business by ensuring compliance with a wide range of regulatory requirements and more importantly, protecting businesses from ever-increasing risk factors across multiple dimensions:",
      ],
      riskDimensions: [
        "Operational / financial",
        "Legal / regulatory",
        "Information / physical security",
        "Business continuity",
        "Geographic",
        "Reputational",
      ],
      keyConsiderations: [
        "It is important to establish a rule-based risk model that factors in an organization's risk appetite as well as risk tolerance.",
        "In reviewing inherent and residual risk procedures, it is critically important to holistically assess inputs, triggers, and workflow procedures to eliminate redundancies and reduce operational overhead.",
        "In addition to point-in-time risk assessment evaluations, organizations should employ ongoing risk-sensing measures that provide real-time alerts based on social media sentiment, negative news events, corporate actions, company litigation, and more.",
      ],
      closing: "As a trusted partner, Hatfield Advisory can assist in optimizing your risk procedures while ensuring compliance with various regulatory requirements.",
    },
    {
      title: "Procurement",
      subtitle: "Transforming Procurement to Operate at the Speed of Business",
      description:
        "Too often, organizations approach procurement transformation in a fragmented way—implementing point solutions for sourcing, contract management, or third-party risk without examining how each component connects within the broader workflow. The result is inefficiency, redundant effort, and missed opportunities for automation and insight.",
      details: [
        "Hatfield Advisory applies a holistic, end-to-end approach to optimizing procurement and supply chain operations. We integrate Third-Party Risk Management (TPRM) and Contract Lifecycle Management (CLM) directly into sourcing, supplier onboarding, and accounts payable processes—eliminating silos and enabling seamless, risk-aware operations across the enterprise.",

        "Our team includes certified Lean Six Sigma Green and Black Belt process engineers who conduct deep-dive assessments of procurement workflows to identify bottlenecks, inefficiencies, and risk gaps. We then design and recommend integrated solutions that streamline operations, accelerate cycle times, enhance compliance visibility, and drive measurable business value."
      
        "In short: whether deploying a TPRM, CLM, or source-to-pay platform, Hatfield ensures the solution aligns with the entire workflow—delivering cohesive, technology-enabled procurement excellence that operates at the speed of business."
      ]
    },
    {
      title: "Supply Chain",
      subtitle: "Maximizing Your Supply Chain Potential",
      description:
        "In the contemporary business environment, the optimization of supply chain operations stands as a paramount factor for sustained growth and competitive edge. Our advisory services provide bespoke solutions designed to streamline operations, bolster efficiency, and mitigate risks within the supply chain framework. Leveraging extensive industry knowledge and data-driven insights, we empower enterprises to adeptly respond to market dynamics, achieve cost efficiencies, and elevate overall performance benchmarks.",
      details: [
        "Partner with us to unlock the full potential of your supply chain and stay ahead in an ever-changing marketplace. Collaborate with us to unlock the inherent potential of your supply chain infrastructure and maintain a leading position in an ever-evolving marketplace.",
      ],
    },
  ];


  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Consulting Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Beyond Hatfield, our flagship AI-based TPRM solution, Hatfield Advisory provides strategic advisory services that optimize procurement and supply chain operations through integrated third-party risk management. We enable clients to achieve end-to-end process efficiency, enhance supplier transparency, and embed sustainable TPRM frameworks that drive measurable business value.
            </p>
          </div>
        </div>
      </section>

      {/* Consulting Services - Accordion */}
      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="flex items-center gap-4 text-left">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4">
                    {service.subtitle && (
                      <h4 className="text-xl font-semibold text-foreground">
                        {service.subtitle}
                      </h4>
                    )}
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {service.details && service.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {detail}
                      </p>
                    ))}

                    {service.services && (
                      <div>
                        <p className="text-foreground font-semibold mb-3">Our services include:</p>
                        <ul className="space-y-2">
                          {service.services.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                              <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.riskDimensions && (
                      <ul className="space-y-2">
                        {service.riskDimensions.map((dimension, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                            <span>{dimension}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {service.keyConsiderations && (
                      <div>
                        <p className="text-foreground font-semibold mb-3">
                          Too many organizations continue to apply a one-size-fits-all approach to third-party risk management, which is often inefficient and ineffective. Key considerations when establishing a TPRM program include:
                        </p>
                        <ul className="space-y-3">
                          {service.keyConsiderations.map((consideration, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                              <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                              <span>{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.closing && (
                      <p className="text-muted-foreground leading-relaxed font-medium">
                        {service.closing}
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Risk Management?
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Let's discuss how our consulting services can help you achieve your
            objectives
          </p>
          <Button asChild size="lg" className="text-xl px-12 py-6 h-auto bg-transparent border-2 border-gray-400 text-gray-900 hover:bg-gray-400/10">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consulting;
