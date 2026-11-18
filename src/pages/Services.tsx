import { Bot, Code, Lightbulb, Rocket, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const Services = () => {
  const services = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Spec-Driven AI-Native Development",
      description: "Modern AI-native software delivery using Speckitplus and AI CLIs (Claude Code, Gemini CLI, Qwen CLI). From written specification to shipped, tested software — fast and reproducible.",
      features: [
        "Specification-first workflows",
        "AI CLI-powered development",
        "Multi-agent coding pipelines",
        "Rapid prototype-to-production"
      ]
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Agentic AI Development",
      description: "Build autonomous AI agents using OpenAI Agents SDK that can plan, execute, and adapt to complex tasks. Perfect for automating workflows and creating intelligent assistants.",
      features: [
        "Custom AI agent architecture",
        "Multi-step task planning",
        "Tool integration & orchestration",
        "Autonomous decision-making systems"
      ]
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Prompt & Context Engineering",
      description: "Optimize your AI models with expertly crafted prompts and context strategies. Achieve better accuracy, consistency, and performance from your language models.",
      features: [
        "Advanced prompt optimization",
        "Context window management",
        "Few-shot learning strategies",
        "Model performance tuning"
      ]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Custom AI Application Development",
      description: "Full-stack development of AI-powered applications using Streamlit, Chainlit, and FastAPI. From prototype to production-ready solutions.",
      features: [
        "Streamlit dashboard development",
        "Chainlit conversational interfaces",
        "FastAPI backend services",
        "End-to-end integration"
      ]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Python Scripting & Automation",
      description: "Automate repetitive tasks, data processing, and workflows with efficient Python scripts. Increase productivity and reduce manual work.",
      features: [
        "Task automation scripts",
        "Data processing pipelines",
        "API integrations",
        "Custom tool development"
      ]
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "API Development & Integration",
      description: "Build robust, scalable APIs with FastAPI. Connect your systems, third-party services, and AI models seamlessly.",
      features: [
        "RESTful API design",
        "Async processing",
        "API documentation",
        "Third-party integrations"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "AI Consulting & Strategy",
      description: "Strategic guidance on implementing AI solutions in your organization. From ideation to deployment and scaling.",
      features: [
        "AI feasibility analysis",
        "Technology stack selection",
        "Architecture planning",
        "Best practices implementation"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="Services — Agentic AI, Automation & Full-Stack Development"
        description="Hire Hafiz Wildan Siddiqui for agentic AI development, prompt & context engineering, Streamlit/Chainlit/FastAPI apps, Python automation and spec-driven AI-native delivery."
        path="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Hafiz Wildan Siddiqui — AI & Full-Stack Development",
          areaServed: "Worldwide",
          provider: { "@type": "Person", name: "Hafiz Wildan Ahmed Siddiqui" },
          makesOffer: services.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x.title, description: x.description } })),
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="// services" title="What I can build for you" subtitle="AI development services tailored to your needs — from first prototype to production." />

        <Stagger className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <SpotlightCard className="h-full p-7">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">{service.icon}</span>
                <h2 className="mb-2 text-xl font-semibold">{service.title}</h2>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start text-sm text-foreground/80"><span className="mr-2 text-accent">▹</span>{f}</li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mb-20 max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">How I Work</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery", desc: "Understand your needs and goals" },
              { step: "02", title: "Planning", desc: "Spec the optimal solution" },
              { step: "03", title: "Development", desc: "Build with best practices" },
              { step: "04", title: "Delivery", desc: "Deploy and support" },
            ].map((p) => (
              <div key={p.step} className="text-center">
                <div className="mb-3 font-heading text-5xl font-bold text-gradient">{p.step}</div>
                <h3 className="mb-1 font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mx-auto max-w-4xl">
          <div className="glass rounded-3xl p-10 text-center sm:p-14">
            <h2 className="mb-3 text-3xl font-bold">Ready to get started?</h2>
            <p className="mb-7 text-muted-foreground">Let's discuss how I can help turn your idea into reality.</p>
            <Link to="/contact" className="btn-sheen inline-flex rounded-xl bg-accent px-7 py-3 font-medium text-accent-foreground shadow-accent transition hover:brightness-110">
              Schedule a Consultation
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Services;
