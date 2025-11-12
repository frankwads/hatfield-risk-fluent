import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JacarandaIcon from "@/components/JacarandaIcon";
import HoverBinaryLogo from "@/components/HoverBinaryLogo";
import heroNetwork from "@/assets/hero-network.jpg";
import logoColor from "@/assets/logo-color.png";
import heroHLogo from "@/assets/hero-h-logo.png";
import hero3dLogo from "@/assets/hero-3d-logo.png";
import { Play, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "AI-Powered Intelligence",
      description:
        "Third-party normalization and corporate hierarchy mapping with intelligent entity resolution",
    },
    {
      title: "Automated Screening",
      description:
        "Integrated OFAC screening and automated financial viability assessments using Piotroski F-Score",
    },
    {
      title: "Dynamic Risk Assessment",
      description:
        "Configurable risk tolerance thresholds with intelligent reuse of prior due diligence",
    },
    {
      title: "Smart Contracts",
      description:
        "Auto-populated contract templates with risk and engagement data",
    },
    {
      title: "Flexible Integration",
      description:
        "Rapid systems integration using hub-and-spoke architecture with sophisticated reporting",
    },
    {
      title: "Process Automation",
      description:
        "Eliminate redundant processing with 70% reduction in assessment overhead",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Headline + Logo Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                AI-powered third-party risk&nbsp;management
              </h1>
            </div>
            
            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end items-center">
              <img 
                src={hero3dLogo} 
                alt="Hatfield 3D Logo" 
                className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain"
              />
            </div>
          </div>

          {/* Description and Buttons Below */}
          <div className="max-w-6xl">
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Hatfield is a secure, intelligent TPRM platform purpose-built to
              streamline risk workflows, automate assessments, and align
              seamlessly with regulatory expectations.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Developed as a prototype, Hatfield already rivals leading TPRM platforms in workflow orchestration, reporting capabilities, and compliance support. But this is just the beginning. The prototype lays the foundation for a broader roadmap focused on advanced intelligence, automation, and real-time risk insight.
            </p>
            <p className="text-xl md:text-2xl text-foreground font-semibold mb-8 leading-relaxed">
              We're inviting a select group of beta clients to help shape what comes next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg"
                onClick={() => {
                  document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Capabilities <ArrowRight className="ml-2" size={20} />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="lg" className="text-lg">
                    <Play className="mr-2" size={20} />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 bg-card">
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://youtu.be/l_w4UKB8KWQ"
                      title="Hatfield.ai Platform Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section data-stat-section className="pb-16 pt-8 bg-white overflow-hidden">
        <div className="flex items-center justify-center mb-8 pt-4">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(215,45%,15%)] leading-tight">
            Introducing Hatfield.
          </p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll-infinite">
            {/* First set of cards */}
            <div className="flex gap-6 px-3 flex-shrink-0">
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">100%</div>
                <div className="text-xl font-medium">Audit Ready</div>
              </div>
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">~3X</div>
                <div className="text-xl font-medium">Reduction in redundant processing</div>
              </div>
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">70%</div>
                <div className="text-xl font-medium">Reduction in risk assessment overhead</div>
              </div>
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">SLA</div>
                <div className="text-xl font-medium">Track days outstanding & performance</div>
              </div>
            </div>
            {/* Duplicate set for infinite scroll effect */}
            <div className="flex gap-6 px-3 flex-shrink-0">
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">100%</div>
                <div className="text-xl font-medium">Audit Ready</div>
              </div>
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">~3X</div>
                <div className="text-xl font-medium">Reduction in redundant processing</div>
              </div>
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">70%</div>
                <div className="text-xl font-medium">Reduction in risk assessment overhead</div>
              </div>
              <div className="bg-[hsl(215,25%,75%)] p-12 rounded-lg text-[hsl(215,45%,15%)] border border-gray-300 w-80 h-72 flex flex-col justify-center">
                <div className="text-6xl font-bold mb-4">SLA</div>
                <div className="text-xl font-medium">Track days outstanding & performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="capabilities" className="py-20 relative" style={{ background: 'var(--gradient-capabilities)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-4">
                Platform Capabilities
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive tools to manage, monitor, and mitigate third-party
                risks at scale
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Processing Intelligence Section */}
      <section data-light-section className="pt-20 pb-12 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(215 20% 90%) 0%, hsl(215 25% 92%) 35%, hsl(215 28% 88%) 70%, hsl(215 30% 85%) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-[hsl(215,45%,15%)] mb-6">
              Processing Intelligence
            </h2>
            <p className="text-xl text-[hsl(215,45%,25%)] max-w-5xl mx-auto leading-relaxed">
              Harnessing AI-driven automation and adaptive agenticAI frameworks to orchestrate intelligent workflows,
              enabling continuous risk sensing, dynamic assessment, and autonomous decision-making across the TPRM lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Real-Time Risk Sensing */}
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[hsl(215,45%,15%)] mb-6">
                Real-Time Risk Sensing
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Cybersecurity threat intelligence</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Social media sentiment analysis</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Negative news and reputational alerts</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Litigation tracking</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Corporate action and M&A alerts</span>
                </li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[hsl(215,45%,15%)] mb-6">
                Advanced Analytics
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>AI-powered risk analytics</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Next-generation reporting</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>SLA tracking and governance</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>ESG risk integration</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Automated incident management</span>
                </li>
              </ul>
            </div>

            {/* Platform Evolution */}
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-[hsl(215,45%,15%)] mb-6">
                Platform Evolution
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Smart contract lifecycle management</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Third-party collaboration portal</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Risk event detection</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Continuous monitoring</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(215,45%,25%)] text-lg">
                  <span className="text-[hsl(215,65%,48%)] mt-1">▸</span>
                  <span>Predictive risk modeling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-12 pb-4 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(220 45% 25%) 0%, hsl(220 48% 18%) 50%, hsl(220 50% 8%) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Button asChild size="lg" variant="default" className="text-lg">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
