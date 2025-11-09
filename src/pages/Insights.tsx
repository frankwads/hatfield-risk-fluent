import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Insights = () => {
  const articles = [
    {
      title: "Managing Third-Party Risks: Ensuring Business Continuity & Compliance",
      excerpt:
        "Discover how AI-powered TPRM solutions streamline risk workflows, automate assessments, and align seamlessly with regulatory expectations to ensure business continuity.",
      date: "2025-10-15",
      readTime: "8 min read",
      path: "/insights/managing-third-party-risks",
    },
    {
      title: "Real-Time Risk Monitoring: The Future of Third-Party Risk Management",
      excerpt:
        "Explore how real-time risk sensing through cybersecurity threat intelligence, sentiment analysis, and continuous monitoring transforms third-party risk management.",
      date: "2025-09-28",
      readTime: "7 min read",
      path: "/insights/real-time-risk-monitoring",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Insights & Articles
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert perspectives on third-party risk management, compliance,
              and the future of financial services
            </p>
          </div>
        </div>
      </section>


      {/* Articles Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link key={index} to={article.path}>
                <Card className="border-border hover:shadow-xl transition-all group cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-accent group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to receive the latest insights, industry trends, and best
            practices in TPRM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
