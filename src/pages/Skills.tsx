import { Brain, Code2, Database, Cpu, Zap, Terminal, Globe, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Agentic AI & LLMs",
      note: "Primary specialization — production experience",
      skills: ["OpenAI Agents SDK", "Agno", "Chainlit", "Prompt Engineering", "Context Engineering", "Tool Calling", "Multi-Agent Orchestration", "RAG Concepts"]
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "AI CLI & Spec-Driven Development",
      note: "AI-native workflow — daily drivers",
      skills: ["Claude Code", "OpenAI Codex", "Gemini CLI", "Qwen CLI", "Speckitplus", "Spec-Driven Development"]
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Python & Backend",
      note: "1.25+ years hands-on",
      skills: ["Python", "FastAPI", "Streamlit", "Selenium", "Async Programming", "REST API Development", "API Integration"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Frontend & Web",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Docusaurus"]
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Models & Platforms",
      skills: ["OpenAI GPT Models", "Anthropic Claude", "Google Gemini", "Qwen", "Grok", "LLM Output Evaluation"]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data & Automation",
      skills: ["Data Processing", "Data Cleaning", "Excel Automation", "Pandas", "Workflow Automation", "Third-Party Tool Integration"]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Architecture & Quality",
      skills: ["System Architecture", "Code Optimization", "Scalability Design", "MVC Refactoring"]
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Tools & Workflow",
      skills: ["Git & GitHub", "Google Colab", "VS Code", "Firebase", "Supabase", "Netlify", "Microsoft Office"]
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Technical Skills</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The stack I build with — from agentic AI systems to full-stack delivery
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="glow-border shadow-custom-md transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${categoryIndex * 0.08}s` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="text-accent">{category.icon}</span>
                  {category.title}
                </CardTitle>
                {category.note && (
                  <p className="text-xs font-mono-code text-accent/80 pl-9">{category.note}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs px-3 py-1 hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Languages */}
        <div className="max-w-6xl mx-auto mt-10 text-center animate-fade-up">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Languages:</span> English (Fluent) · Urdu (Native)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
