import { Building, MapPin, Calendar, Cpu, Rocket, Users, Brain, Code, Cloud, Database } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const EXPERIENCE_DATA = [
  {
    title: "AI Engineering Intern",
    company: "SK Networks",
    location: "Seoul, Korea",
    period: "July 2025 – Aug 2025",
    bullets: [
      "Led development of LUMINA, an AI-powered system enabling realistic voice-based conversations with digital replicas of influencers using advanced LLMs and voice cloning",
      "Built a fully working PoC with average response time under 5 seconds, achieving 4.6/5.0 user rating for voice & style realism",
      "Implemented dual-stage LLM architecture (Thinking LLM + Speaking LLM) for content reasoning and personality expression, improving modularity and style transfer",
      "Developed comprehensive voice cloning pipeline using ElevenLabs Multilingual V2, achieving significant gains in voice similarity metrics (cosine sim, PCA, MFCC)",
      "Established scalable credit-based business model with 77% gross margin and validated market potential of $21.9M annual revenue with 200K active users"
    ],
    technologies: ["Python", "Django", "OpenAI", "ElevenLabs", "AWS", "LLM", "Voice Cloning", "AI/ML"],
    icon: Brain,
  },
  {
    title: "Backend Development Intern",
    company: "NeuroTrade",
    location: "Seoul, Korea",
    period: "May 2024 – Aug 2024",
    bullets: [
      "Designed and deployed a hybrid AI trading platform that combined LSTM-based time-series prediction and LLM-driven sentiment analysis to generate real-time, multi-asset trading signals on AWS",
      "Engineered a custom vectorized backtesting engine (Python/C++) capable of simulating thousands of trades per second, including OHLCV replay, risk metrics (drawdown, Sharpe ratio), and strategy benchmarking",
      "Trained LSTM models on historical market data with walk-forward validation, achieving 64% directional accuracy on 1-day asset returns"
    ],
    technologies: ["Python", "C++", "LSTM", "LLM", "AWS", "FAISS", "RAG", "Machine Learning"],
    icon: Cpu,
  },
  {
    title: "Division Commander Driver & Platoon Leader",
    company: "Republic of Korea Army – Transportation Platoon",
    location: "Kyeonggi-do, Korea",
    period: "Oct 2020 – Aug 2022",
    bullets: [
      "Hand-selected to serve as the personal driver to a two-star general in a high-security division; executed confidential and time-critical missions requiring cross-unit coordination",
      "Led and trained a 23-member transport unit in vehicle operations, mission planning, and safety protocols",
      "Designed and implemented a C++-based driver assignment and mission scheduling system, automating over 1,000 logistics tasks; reduced manual overhead by 80%",
      "Collaborated on experimental route optimization under variable terrain/military threat conditions using heuristic planning algorithms"
    ],
    technologies: ["C++", "Logistics Systems", "Route Optimization", "Heuristic Algorithms", "Leadership"],
    icon: Users,
  },
];

const Timeline4 = () => {
  return (
    <section className="py-20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl mb-4">
            Professional Experience
          </h2>
          
        </div>

        {/* Simple Card Layout */}
        <div className="space-y-8">
          {EXPERIENCE_DATA.map((item, index) => (
            <div key={index} className="bg-card border rounded-xl p-8 hover:shadow-md transition-shadow">
              {/* Header Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {item.period}
                  </Badge>
                  <div className="p-2 rounded-lg bg-muted/20">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Bullet Points */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <span className="text-primary text-sm mt-1">•</span>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Timeline4 };
