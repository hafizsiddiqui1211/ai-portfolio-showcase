import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Code, Sparkles, Github, Linkedin, MapPin, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const TERMINAL_LINES = [
  { prompt: true, text: 'agent.run("automate attendance workflow")' },
  { prompt: false, text: "▸ planning      shift-aware CI/CO pairing", color: "text-violet-400" },
  { prompt: false, text: "▸ tool_call     parse_biometric_data(45 employees)", color: "text-accent" },
  { prompt: false, text: "▸ tool_call     generate_excel_report(sheets=4)", color: "text-accent" },
  { prompt: false, text: "✓ deployed      in production @ K-Electric HR", color: "text-emerald-400" },
];

const Home = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines(v => v + 1), visibleLines === 0 ? 600 : 850);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="orb w-96 h-96 bg-cyan-500 -top-20 -left-20"></div>
        <div className="orb w-96 h-96 bg-violet-600 bottom-0 right-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left — intro */}
            <div className="space-y-7 animate-fade-up text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-medium text-primary-foreground/90">Open to AI roles & internships — Karachi / Remote</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight">
                Hafiz Wildan
                <span className="block text-gradient">Siddiqui</span>
              </h1>

              <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0">
                Agentic AI Engineer & Full-Stack Python Developer. I design, build, and ship
                production AI agents and automation systems — from prompt to deployment.
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm text-primary-foreground/70">
                <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-accent" /> K-Electric</span>
                <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4 text-accent" /> BS SE — SMIU · GIAIC</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> Karachi, PK</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
                <Link to="/projects">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent group">
                    View Projects
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <div className="flex gap-3">
                  <a href="https://github.com/hafizsiddiqui1211" target="_blank" rel="noopener noreferrer"
                     className="glass glow-border rounded-lg p-3 text-primary-foreground/90 hover:text-accent transition-colors" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="http://www.linkedin.com/in/hafiz-siddiqui-018587295" target="_blank" rel="noopener noreferrer"
                     className="glass glow-border rounded-lg p-3 text-primary-foreground/90 hover:text-accent transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right — terminal signature */}
            <div className="animate-float hidden sm:block">
              <div className="glass terminal-shadow rounded-2xl overflow-hidden font-mono-code text-sm">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-accent/15 bg-black/30">
                  <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-3 text-xs text-primary-foreground/50">hafiz@agentic-lab ~ openai-agents-sdk</span>
                </div>
                <div className="p-5 space-y-2.5 min-h-[220px] bg-black/40">
                  {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="animate-fade-in">
                      {line.prompt ? (
                        <span className="text-primary-foreground/90">
                          <span className="text-emerald-400">$ </span>{line.text}
                        </span>
                      ) : (
                        <span className={`${line.color} pl-3`}>{line.text}</span>
                      )}
                    </div>
                  ))}
                  <span className="inline-block w-2.5 h-4 bg-accent animate-blink align-middle"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { value: "1.25+", label: "Years of Python" },
              { value: "10+", label: "Apps Shipped & Deployed" },
              { value: "1", label: "System in Production @ KE" },
              { value: "4", label: "AI CLIs in Daily Workflow" },
            ].map((s, i) => (
              <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="text-3xl font-heading font-bold text-gradient">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Core Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming complex AI concepts into practical, scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Bot className="h-10 w-10 text-accent" />,
                title: "Agentic AI",
                description: "OpenAI Agents SDK, Agno & Chainlit — autonomous agents with tool-calling, memory, and multi-step planning"
              },
              {
                icon: <Code className="h-10 w-10 text-accent" />,
                title: "Full-Stack Python",
                description: "FastAPI backends, Streamlit & Chainlit frontends, React/Next.js — end-to-end AI application delivery"
              },
              {
                icon: <Sparkles className="h-10 w-10 text-accent" />,
                title: "Prompt & Context Engineering",
                description: "Production-grade prompts across Claude, GPT-4, Gemini & Qwen — tested against real user inputs"
              },
              {
                icon: <Cpu className="h-10 w-10 text-accent" />,
                title: "Spec-Driven AI-Native Dev",
                description: "Speckitplus & AI CLI workflows (Claude Code, Codex, Gemini, Qwen) — specs to shipped software, fast"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-7 glow-border shadow-custom-md transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-lg font-heading font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Experience & Education</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: "Back Office Executive — K-Electric",
                period: "Mar 2026 – Present · Karachi",
                detail: "Built and deployed a production attendance automation system (Python + Streamlit) used daily by HR for 45+ employees — shift-aware logic, biometric data parsing, automated reporting. Data operations & analysis at Pakistan's largest power utility."
              },
              {
                title: "BS Software Engineering — SMIU Karachi",
                period: "Semester 6 of 8 · Expected 2026",
                detail: "Coursework: Web Engineering, Data Science (ML labs — regression, clustering), Software Project Management, Software Re-Engineering."
              },
              {
                title: "GIAIC — Governor's Initiative for AI & Computing",
                period: "Ongoing · Karachi",
                detail: "Pakistan's leading Generative & Agentic AI program — modern LLM ecosystems, agent frameworks, and AI-native development practice."
              }
            ].map((item, i) => (
              <div key={i} className="glass glow-border rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                  <span className="text-xs font-mono-code text-accent">{item.period}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Let's discuss how I can help bring your AI vision to life
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent animate-glow">
                Start a Conversation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
