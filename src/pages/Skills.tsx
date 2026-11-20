import { Brain, Terminal, Code2, Globe, Cpu, Database, Wrench, ShieldCheck, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Stagger, StaggerItem, Reveal } from "@/lib/motion";

// Ordered by current focus, then by tools used in recent public and supplied projects.
const skillCategories = [
  {
    icon: Brain,
    title: "Agentic AI & LLMs",
    note: "Agents, tools and context",
    skills: ["OpenAI Agents SDK", "Claude Code", "Chainlit", "Prompt Engineering", "Context Engineering", "Tool Calling", "MCP (Model Context Protocol)", "Gemini API", "Agno", "Multi-Agent Orchestration"],
  },
  {
    icon: Terminal,
    title: "AI-Native & Spec-Driven Development",
    note: "From specifications to working software",
    skills: ["Spec-Driven Development", "Speckitplus", "Claude Code", "Gemini CLI", "Qwen CLI", "Obsidian", "Lovable", "9Router"],
  },
  {
    icon: Globe,
    title: "Frontend & Web",
    note: "React experiences and full-stack applications",
    skills: ["React", "Next.js", "TypeScript", "Motion / Framer Motion", "Vite", "Tailwind CSS", "JavaScript", "Canvas", "HTML & CSS", "Docusaurus", "SEO & JSON-LD", "Figma → UI"],
  },
  {
    icon: Code2,
    title: "Python & Backend",
    note: "APIs, data applications and maintainable Python",
    skills: ["Python", "FastAPI", "Streamlit", "Pydantic", "SQLModel", "REST APIs", "Async Programming", "JSON Persistence", "MVC Architecture", "Node.js"],
  },
  {
    icon: Database,
    title: "Data & Automation",
    skills: ["Excel Automation", "Pandas", "Data Cleaning", "File Watchers", "PostgreSQL / Neon", "SQLite", "NumPy", "MS SQL Server", "Selenium", "Playwright"],
  },
  {
    icon: Layers,
    title: "Mobile",
    skills: ["Flutter", "Dart", "Firebase (multi-environment)"],
  },
  {
    icon: ShieldCheck,
    title: "Quality & Testing",
    skills: ["Input Validation", "Test Case Design", "Selenium", "Playwright", "Jest", "Jira", "V-Model / Equivalence Partitioning"],
  },
  {
    icon: Cpu,
    title: "AI Models & Platforms",
    skills: ["OpenAI GPT Models", "Anthropic Claude", "Google Gemini", "Qwen", "Grok", "LLM Output Evaluation"],
  },
  {
    icon: Wrench,
    title: "Tools & Deployment",
    skills: ["Git & GitHub", "Vercel", "Supabase", "Better Auth", "Streamlit Cloud", "GitHub Pages", "Netlify", "VS Code", "Google Colab"],
  },
  {
    icon: Layers,
    title: "Working Knowledge",
    note: "Additional tools and ongoing exploration",
    skills: ["LangChain", "LangGraph", "RAG & Vector DBs (Chroma, FAISS)", "Flask", "Django", "Express.js", "NestJS", "scikit-learn", "Hugging Face", "PyTorch / TensorFlow", "Docker"],
  },
];

const Skills = () => (
  <div className="min-h-screen pt-28 pb-16">
    <Seo
      title="Skills — Agentic AI, Python, React & AI-Native Tooling"
      description="Technical skills of Hafiz Wildan Siddiqui: OpenAI Agents SDK, Chainlit, FastAPI, Streamlit, React, Next.js, TypeScript, Flutter, MCP and spec-driven AI-native development."
      path="/skills"
    />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader eyebrow="// stack" title="Technical Skills" subtitle="My current toolkit, led by AI agents and automation, followed by the web, data and mobile stacks behind my projects." />

      <Stagger className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2">
        {skillCategories.map((cat) => (
          <StaggerItem key={cat.title}>
            <SpotlightCard className="h-full p-6">
              <div className="mb-4 flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <cat.icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold leading-tight">{cat.title}</h2>
                  {cat.note && <p className="mt-0.5 font-mono-code text-[11px] text-accent/80">{cat.note}</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="cursor-default px-3 py-1 text-xs font-normal transition-colors hover:bg-accent hover:text-accent-foreground">
                    {s}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mx-auto mt-10 max-w-6xl text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Languages:</span> English (Fluent) · Urdu (Native)
        </p>
      </Reveal>
    </div>
  </div>
);

export default Skills;
