import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Secure Data Encryption System",
      description: "A lightweight, secure, and user-friendly data encryption web app built with Streamlit. This system allows users to register, log in, store sensitive data in encrypted form, and securely retrieve and decrypt it — all without any external database.",
      tags: ["Streamlit", "Cryptography", "Hashlib", "PBKDF2 HMAC"],
      image: "project-ai-support",
      demoLink: "https://securedataencryptionsystembyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects.git"
    },
    {
      title: "Streamlit Analytics Dashboard",
      description: "Developed a real-time data visualization platform with AI-powered insights. Features interactive charts, predictive analytics, and automated reporting.",
      tags: ["Streamlit", "Python", "Data Analysis", "ML"],
      image: "project-dashboard",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Chainlit Conversational AI",
      description: "Created an advanced chatbot interface with memory management, document processing, and contextual understanding for enterprise knowledge bases.",
      tags: ["Chainlit", "LangChain", "Context Engineering", "RAG"],
      image: "project-chatbot",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "FastAPI Microservices Suite",
      description: "Architected a scalable microservices ecosystem with async processing, rate limiting, and comprehensive API documentation. Handles 10k+ requests/minute.",
      tags: ["FastAPI", "Python", "Docker", "Redis"],
      image: "project-api",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "AI Content Generator",
      description: "Built a multi-modal content generation platform using advanced prompt engineering techniques. Supports text, code, and structured data generation.",
      tags: ["OpenAI", "Prompt Engineering", "Python", "API Integration"],
      image: "project-generator",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Automated Task Orchestration System",
      description: "Developed an agentic AI system that autonomously plans and executes complex workflows. Integrates with multiple tools and APIs.",
      tags: ["Agentic AI", "Python Scripting", "Task Automation", "AI Agents"],
      image: "project-orchestration",
      demoLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Featured Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing real-world applications of AI and intelligent automation
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group overflow-hidden shadow-custom-md hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2 border-border animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <div className="text-6xl font-heading font-bold text-accent/30">
                  {index + 1}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Demo
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fade-up">
          <p className="text-muted-foreground mb-4">
            Interested in collaborating on a project?
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent">
            Let's Work Together
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
