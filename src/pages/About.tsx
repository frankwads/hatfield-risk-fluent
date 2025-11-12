import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import hero3dLogo from "@/assets/hero-3d-logo.png";

const About = () => {
  const values = [
    {
      title: "Intellectual Curiosity",
      description:
        "We approach every challenge with a mindset of continuous learning and innovation, staying ahead of industry trends.",
    },
    {
      title: "Data-Driven Analytics",
      description:
        "Our decisions and solutions are grounded in rigorous analysis and empirical evidence, ensuring optimal outcomes.",
    },
    {
      title: "Client Centricity",
      description:
        "Your success is our success. We build lasting partnerships by deeply understanding and addressing your unique needs.",
    },
    {
      title: "Pragmatic Problem Solving",
      description:
        "We deliver practical, actionable solutions that can be implemented effectively in real-world business environments.",
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
              About Hatfield
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
               Hatfield is an AI-powered Third-Party Risk Management (TPRM) platform purpose-built to streamline risk workflows, automate assessments, and ensure seamless regulatory alignment. It integrates effortlessly into procurement and supply chain ecosystems, helping organizations strengthen governance, accelerate onboarding, and enhance operational resilience.
               <br /><br />
               Hatfield Advisory also provides consulting services to support TPRM assessments, implementation, and integration within client procurement and supply chain environments.
            </p>

          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={hero3dLogo} 
                    alt="Hatfield 3D Logo" 
                    className="w-32 h-32 md:w-40 md:h-40 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-6 text-center md:text-left">
                    Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed text-center md:text-left">
                    Hatfield’s mission is to redefine Third-Party Risk Management through intelligence, automation, and trust.
                    Purpose-built for the financial-services industry, Hatfield delivers an AI-powered platform that streamlines risk workflows, automates due diligence, and ensures seamless regulatory alignment — transforming TPRM from a reactive compliance burden into a proactive source of insight and resilience.
                    Developed by practitioners for practitioners, Hatfield empowers institutions to manage risk with speed, precision, and confidence — bridging the gap between compliance and performance in an increasingly complex world.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[hsl(215,25%,75%)] p-6 rounded-lg border border-gray-300 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold mb-3 text-[hsl(215,45%,15%)]">
                  {value.title}
                </h3>
                <p className="text-[hsl(215,45%,15%)]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
              About Our Founder
            </h2>
            <Card className="border-border shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-foreground text-center">
                    Frank Wadsworth
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Frank Wadsworth is a senior financial services executive with experience building high-performing vendor and risk management programs for complex, global top-tier Wall Street enterprises. Leveraging deep experience across technology, procurement, and third-party risk management, Frank has developed Hatfield—an AI-powered third-party risk management solution purpose-built for the financial services industry.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Having honed his expertise at some of Wall Street's most distinguished financial institutions, Frank is known for transforming business, supply chain, and procurement operations to reduce third-party risk, unlock business value, and deliver significant, sustainable savings. He has led large-scale programs in highly matrixed environments and was recognized as a change agent who enabled global adoption of new operating models, technologies, and process improvements. In 2022, he was featured in Supply Chain, Procurement, and Sustainability magazines.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Frank currently serves on the Philippines Information, Communications & Technology (ICT) advisory board in New York. He previously served on the Philippines Business Process Outsourcing (BPO) Council led by the Consulate General in New York City, and on the board of the United Nations–affiliated Global Sourcing Council (GSC), a non-profit advancing sustainable and socially responsible sourcing.
                  </p>
                  
                  <div className="pt-4">
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      Areas of Expertise
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Strategic Planning & Transformation</li>
                      <li>• Procurement Leadership & Cost Optimization</li>
                      <li>• Third-Party Risk Management (TPRM)</li>
                      <li>• Supply Chain Operations & Governance</li>
                      <li>• Global Workforce Strategy</li>
                      <li>• IT & Business Process Outsourcing (ITO/BPO)</li>
                      <li>• Offshoring, Nearshoring & Vendor Consolidation</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      Speaking & Industry Engagement
                    </h4>
                    <p className="text-muted-foreground mb-3">
                      Frank is a frequent guest speaker and industry contributor. He has presented at events hosted by:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• RSA Archer</li>
                      <li>• Institute for Supply Management (ISM)</li>
                      <li>• Sourcing Industry Group (SIG)</li>
                      <li>• Procurement Leaders</li>
                      <li>• Penn State University – Supply Chain Management Association (SCMA)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              From AI-powered TPRM solutions to strategic consulting services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Hatfield.ai Platform
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our flagship TPRM solution that combines AI intelligence with
                  regulatory expertise to transform how organizations manage
                  third-party risk.
                </p>
                <Button asChild variant="outline">
                  <Link to="/capabilities">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  Advisory Services
                </h3>
                <p className="text-muted-foreground mb-4">
                  Strategic consulting tailored to financial services
                  organizations, covering risk management, compliance, and
                  operational excellence.
                </p>
                <Button asChild variant="outline">
                  <Link to="/consulting">Explore Services</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Schedule a Demo or Become a Beta Client</h2>
          <p className="text-xl text-gray-800 mb-12">
            Partner with us to transform your risk management and achieve
            sustainable growth
          </p>
          <Button asChild size="lg" className="text-xl px-12 py-6 h-auto bg-transparent border-2 border-gray-400 text-gray-900 hover:bg-gray-400/10">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
