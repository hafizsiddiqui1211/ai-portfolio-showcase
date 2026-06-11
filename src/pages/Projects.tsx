import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "🤖 Agentic AI Chatbot — OpenAI Agents SDK + Chainlit",
      description: "Production-grade multi-turn conversational agent with tool-calling, structured memory, and a custom Chainlit UI. System prompts and context engineering designed and iteratively optimized from scratch.",
      tags: ["OpenAI Agents SDK", "Chainlit", "Tool Calling", "Prompt Engineering"],
      image: "Agentic-AI-Chatbot",
      demoLink: "#",
      githubLink: "https://github.com/hafizsiddiqui1211"
    },
    {
      title: "🏢 KE Attendance Automation System",
      description: "In production at K-Electric HR — replaced a fully manual biometric review process for 45+ employees. Shift-aware CI/CO pairing, ZKTeco data parsing, duplicate rejection, late detection, and automated multi-sheet Excel reporting.",
      tags: ["Python", "Streamlit", "Automation", "Enterprise"],
      image: "KE-Attendance-Automation",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "📊 ERP-Style Operations Dashboard",
      description: "Production-grade ERP-like dashboard with role-based views, REST API data ingestion from multiple third-party sources, automated pipelines, and export features for real-time operational reporting.",
      tags: ["Streamlit", "FastAPI", "REST APIs", "Data Pipelines"],
      image: "ERP-Operations-Dashboard",
      demoLink: "#",
      githubLink: "https://github.com/hafizsiddiqui1211"
    },
    {
      title: "🖥️ Windows Task Manager — Real-Time Web App",
      description: "Live system-monitoring web application streaming Windows process and resource data into a browser dashboard in real time — backend-to-frontend connectivity with Python.",
      tags: ["Python", "Streamlit", "Real-Time", "System Monitoring"],
      image: "Windows-Task-Manager-Live",
      demoLink: "#",
      githubLink: "https://github.com/hafizsiddiqui1211"
    },
    {
      title: "💍 NikkahNow — Venue Booking Platform",
      description: "Commercial-scale Flutter app for marriage venue booking with Customer, Owner, and Admin roles — Firebase multi-environment backend (dev/prod/demo) and a complete design system.",
      tags: ["Flutter", "Firebase", "Multi-Role", "Product Design"],
      image: "NikkahNow-Booking-Platform",
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "📚 Docusaurus Documentation Platform",
      description: "Full developer documentation application built and deployed with Docusaurus — structured technical writing, custom theming, and complete information architecture.",
      tags: ["Docusaurus", "React", "Technical Writing", "Deployment"],
      image: "Docusaurus-Docs-Platform",
      demoLink: "#",
      githubLink: "https://github.com/hafizsiddiqui1211"
    },
    {
      title: "🛡️ Secure Data Encryption System",
      description: "Secure, user-friendly data encryption web app — register, log in, store sensitive data encrypted, and securely retrieve and decrypt it, all without an external database.",
      tags: ["Streamlit", "Cryptography", "PBKDF2 HMAC", "Security"],
      image: "Secure-Data-Encryption-System",
      demoLink: "https://securedataencryptionsystembyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects.git"
    },
    {
      title: "✈️ Flight Management System",
      description: "Interactive flight management system with SQLite persistence — admins and staff manage flights through a clean web interface.",
      tags: ["Streamlit", "Python", "SQLite", "Pandas"],
      image: "Flight-Management-System",
      demoLink: "https://flightmanagementsystembyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Flight-Management-System.git"
    },
    {
      title: "📀 Data Sweeper",
      description: "Streamlit app to convert, clean, and visualize CSV and Excel files efficiently — practical data-processing utility.",
      tags: ["Streamlit", "Pandas", "Data Cleaning", "Visualization"],
      image: "Data-Sweeper",
      demoLink: "https://datasweeperbyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects.git"
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
              className="group overflow-hidden shadow-custom-md glow-border transition-all duration-300 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://placehold.co/400x200/1a1a2e/00d4ff?text=${encodeURIComponent(project.image)}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="text-6xl font-heading font-bold text-accent/30">${index + 1}</div>`;
                  }}
                />
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
                  <Button 
                    size="sm" 
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    asChild
                    disabled={project.demoLink === "#"}
                  >
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    asChild
                    disabled={project.githubLink === "#"}
                  >
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
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
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent" asChild>
            <a href="/contact">Let's Work Together</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
