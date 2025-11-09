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
        "Many procurement organizations are perceived by businesses as overly slow and cumbersome, providing minimal value beyond contract management and invoice processing. Procurement professionals often view themselves as underappreciated stewards of supplier relationships and enforcers of procedural compliance, focusing on the do's and don'ts of supplier engagement. Numerous procurement organizations remain aligned with traditional and outdated practices, relegating innovation and thought leadership to secondary roles behind the status quo.",
      details: [
        "Hatfield Advisory partners with our clients to break the mold of old and traditional, helping identify advanced and innovative procurement solutions that drive value and operate at the speed of business.",
      ],
      services: [
        "Optimizing supplier portfolios",
        "Identifying buy and pay channel strategies",
        "Leveraging technology to automate and leapfrog to best-in-class solutions",
        "Identifying strategic sourcing savings targets and spend category strategies",
        "Implementing source-to-pay operational workflow efficiencies",
        "Establishing metrics dashboard to track and manage KPI's and SLA's",
      ],
    },
    {
      title: "Offshoring and Outsourcing",
      subtitle: "Offshoring Done Right: Right Skills in the Right Locations at the Right Price",
      description:
        "Hatfield Advisory provides industry-based insights and expertise in determining the best opportunities for our clients to unleash significant value and savings when exploring offshoring and outsourcing opportunities.",
      details: [
        "The biggest pitfall when considering offshoring opportunities is basing the value proposition almost exclusively on labor rate arbitrage. The value of offshoring work to lower-cost labor markets entails so much more than assessing the cost of resources in one location versus another. It requires detailed labor market studies to understand skills availability, labor market supply and demand dynamics, geopolitical stability, government incentives and so much more. Beyond assessing labor rate arbitrage opportunities, it is important for companies to factor in labor productivity, taking into account business domain knowledge, language barriers, cultural differences, time zone and communication challenges.",
        "With the advent of artificial intelligence (AI) and machine learning (ML), technology is a significant disruptor to traditional offshoring and outsourcing solutions and needs to be carefully considered when establishing related strategies. It is also important to determine which labor markets best suit various business requirements in terms of onshoring, near-shoring and offshoring solutions. Eastern Europe labor markets are very different from India, which are very different from China and the Philippines, which in turn are exceptionally different to Mexico and Latin America. Critical thinking needs to be applied to intellectual/knowledge capital retention requirements and business competitive advantage when outsourcing and offshoring work.",
      ],
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
              In addition to Hatfield, the TPRM AI product, Hatfield Advisory offers strategic advisory services and solutions to our clients, leveraging deep domain industry expertise in procurement, third-party risk management, supply chain operations, offshoring, and outsourcing.
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
