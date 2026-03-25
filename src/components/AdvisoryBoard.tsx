import { useState } from "react";

interface BoardMember {
  name: string;
  title: string;
  headshot: string;
  shortBio: string;
  fullBio: string;
  expertise?: string[];
}

const members: BoardMember[] = [
  {
    name: "Albert J. Mellina",
    title: "CEO, Mellina Associates LLC",
    headshot: "/advisors/Albert_elite.jpg",
    shortBio: "35+ years as entrepreneur, executive, and management consultant across technology and financial services. Former Senior Partner at KPMG Consulting.",
    fullBio: "Albert J. Mellina is a Strategic Advisor to Hatfield.ai and currently serves as CEO of Mellina Associates LLC. He brings over 35 years of experience as an entrepreneur, executive leader, and management consultant across technology and financial services.\n\nAlbert began his career as a Project Engineer on the NASA Lunar Module program. He later co-founded CP Technology, a market data distribution firm, and led the acquisition of Quay Financial Systems, expanding its international footprint.\n\nFollowing the sale of CP Technology, he joined KPMG Consulting as a Senior Partner in the Financial Services Division, managing a global book of business exceeding $45 million annually. In 2009, he co-founded the Gartland and Mellina Group, scaling it into a $25 million global organization with offices across North America and Europe before its successful acquisition in 2019.",
    expertise: ["Strategic Planning & Growth", "Financial Services Transformation", "Management Consulting", "M&A and Integration", "Board Advisory"],
  },
  {
    name: "Hsing-Hsing Li",
    title: "COO, Aceler8.ai",
    headshot: "/advisors/HsingHsing_elite.jpg",
    shortBio: "Recognized leader in digital transformation, AI innovation, and enterprise strategy. Led initiatives for Goldman Sachs, Marsh McLennan, and AIG across 130+ countries.",
    fullBio: "Hsing-Hsing Li is a Strategic Advisor to Hatfield.ai and currently serves as Chief Operating Officer of Aceler8.ai. A NACD Board Leadership Fellow and CPA (KPMG), she brings a unique combination of financial, technological, and operational expertise.\n\nShe has led large-scale transformation initiatives for Fortune 500 organizations including Marsh McLennan, Goldman Sachs, AIG, Fidelity, Omnicom, and Publicis — spanning enterprise AI strategy, cyber risk management, operating model design, and global expansion across more than 130 countries.\n\nShe is also an Adjunct Professor of Practice at Columbia University, where she teaches AI/ML and developed the Finance for Technology Leaders course. She has been recognized with the AABDC Outstanding 50 Award and named one of the USA's most influential COOs.",
    expertise: ["Digital Transformation", "AI & Enterprise Strategy", "Cyber Risk Management", "Board Governance", "Global Operations"],
  },
  {
    name: "Neil Shroff",
    title: "Founder & CEO, Spark Legacy",
    headshot: "/advisors/Neil_elite.jpg",
    shortBio: "Entrepreneur and investor with 25+ years in technology and capital advisory. Built and exited four technology companies.",
    fullBio: "Neil Shroff is a Strategic Advisor to Hatfield.ai and currently serves as Founder and CEO of Spark Legacy. He is an accomplished entrepreneur, executive, and investor with over 25 years of experience in technology, business development, and capital advisory.\n\nNeil founded Spark Legacy in 2017 to support next-generation technology companies through capital advisory and strategic growth. He also serves as Managing Partner of Defy Group (cybersecurity) and Spark Minds (technology staffing).\n\nOver his career, Neil has built and successfully exited four technology companies. Prior to Spark Legacy, he held senior business development roles at Polaris and Virtusa, leading multi-million dollar engagements and supporting successful private equity exits. He is an active investor in startups including Otis AI, Blackbar.ai, Datavations, and Valiant Payments.",
    expertise: ["Capital Advisory", "Business Development", "Technology Startups", "Private Equity Exits", "Strategic Partnerships"],
  },
  {
    name: "Kevin Kobs",
    title: "Technology & Operations Executive",
    headshot: "/advisors/Kevin_elite.jpg",
    shortBio: "25+ years in financial services and enterprise technology. Former COO for Infrastructure Technology at a global investment bank.",
    fullBio: "Kevin Kobs is a Strategic Advisor to Hatfield.ai and a technology and operations executive with over 25 years of experience in financial services and enterprise technology.\n\nKevin began his career in Technology Business Management at a major global investment bank and advanced to serve as Chief Operating Officer for Infrastructure Technology, overseeing large-scale operations and mission-critical services.\n\nHe later transitioned into client-facing roles selling technology solutions to major financial institutions — giving him a unique dual perspective of operating within large enterprises and selling into them. He also brings experience in private equity-backed environments, the payments industry, and business ownership.",
    expertise: ["Technology Operations", "Infrastructure Management", "Vendor & Partner Ecosystems", "Business Development", "Private Equity"],
  },
  {
    name: "Rene Mandeville",
    title: "Partner & CMO, iVoice Communications",
    headshot: "/advisors/Rene_elite.jpg",
    shortBio: "20+ years in enterprise operations and risk transformation across global financial institutions. Former Managing Director at Sumitomo Mitsui Banking Corporation.",
    fullBio: "Rene Mandeville is a Strategic Advisor to Hatfield.ai and currently serves as Partner and Chief Marketing Officer at iVoice Communications. He is an enterprise operations and risk transformation executive with more than 20 years of experience across global financial institutions.\n\nHe previously served as Managing Director at Sumitomo Mitsui Banking Corporation, where he led large-scale programs across third-party risk management, operational resilience, and corporate services infrastructure throughout the Americas.\n\nRene completed the Artificial Intelligence: Implications for Business Strategy program at MIT Sloan School of Management. His current focus centers on leveraging AI to improve operational resilience, risk governance, and enterprise performance.",
    expertise: ["Third-Party Risk Management", "Operational Resilience", "Risk Governance", "Regulatory Compliance", "AI Strategy"],
  },
];

export default function AdvisoryBoard() {
  const [selected, setSelected] = useState<BoardMember | null>(null);

  return (
    <section className="px-10 py-16 max-w-6xl mx-auto">
      <h2 className="text-center text-white text-3xl font-bold mb-10">
        Advisory Board
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => (
          <div
            key={m.name}
            onClick={() => setSelected(m)}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center cursor-pointer hover:bg-white/10 transition-colors"
          >
            <img
              src={m.headshot}
              alt={m.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <div className="text-white font-bold text-base">{m.name}</div>
            <div className="text-blue-400 text-sm mt-1">{m.title}</div>
            <div className="text-gray-400 text-sm mt-3 leading-relaxed">{m.shortBio}</div>
            <div className="text-blue-400 text-xs mt-4">View full bio →</div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f1e38] border border-white/15 rounded-2xl p-10 max-w-xl w-full max-h-[85vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white text-xl bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-5 mb-6">
              <img
                src={selected.headshot}
                alt={selected.name}
                className="w-20 h-20 rounded-full object-cover shrink-0"
              />
              <div>
                <div className="text-white font-bold text-lg">{selected.name}</div>
                <div className="text-blue-400 text-sm mt-1">{selected.title}</div>
              </div>
            </div>

            <p className="text-gray-300 leading-7 text-sm">{selected.fullBio}</p>

            {selected.expertise && selected.expertise.length > 0 && (
              <div className="mt-6">
                <div className="text-white font-semibold mb-3">Areas of Expertise</div>
                <ul className="list-disc pl-5 text-gray-400 space-y-1 text-sm">
                  {selected.expertise.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}