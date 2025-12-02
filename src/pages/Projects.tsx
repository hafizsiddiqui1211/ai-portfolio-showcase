import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "🛡️ Secure Data Encryption System",
      description: "A lightweight, secure, and user-friendly data encryption web app built with Streamlit. This system allows users to register, log in, store sensitive data in encrypted form, and securely retrieve and decrypt it — all without any external database.",
      tags: ["Streamlit", "Cryptography", "Hashlib", "PBKDF2 HMAC"],
      image: "🛡️-Secure-Data-Encryption-System",
      demoLink: "https://securedataencryptionsystembyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects.git"
    },
    {
      title: "Flight Management System (Streamlit + SQLite)",
      description: "A simple and interactive Flight Management System built with Streamlit and SQLite. This system allows admins and staff to manage flights efficiently using a user-friendly web interface.",
      tags: ["Streamlit", "Python", "SQLite", "Pandas"],
      image: "Flight-Management-System-(Streamlit+SQLite)",
      demoLink: "https://flightmanagementsystembyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Flight-Management-System.git"
    },
    {
      title: "📀 Data Sweeper",
      description: "Data Sweeper is a powerful Streamlit-based web application designed to help users convert, clean, and visualize CSV and Excel files efficiently.",
      tags: ["Streamlit", "Pandas", "Python", "BytesIO"],
      image: "📀-Data-Sweeper",
      demoLink: "https://datasweeperbyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects.git"
    },
    {
      title: "🔑 Password Strength Meter",
      description: "A simple web app to check password strength using Streamlit. This app provides feedback on password security based on length, uppercase/lowercase letters, digits, and special characters.",
      tags: ["Streamlit", "Python", "Numpy", "Pandas"],
      image: "🔑-Password-Strength-Meter",
      demoLink: "https://passwordstrengthmeterbyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Sir-Zia-Projects.git"
    },
    {
      title: "🔑 Password Generator",
      description: "A simple and interactive password generator built with Streamlit. This application allows users to generate secure passwords with customizable options like length, inclusion of digits, and special characters.",
      tags: ["Streamlit", "Random", "Python", "String"],
      image: "🔑-Password-Generator",
      demoLink: "https://passwordgeneratorbyhafizsiddiqui.streamlit.app/",
      githubLink: "https://github.com/hafizsiddiqui1211/Ramadan-Coding-Nights-2025.git"
    },
    {
      title: "⏲ Time Zone Application",
      description: "This is a simple web application built using Streamlit that allows users to view and convert time between different time zones.",
      tags: ["Streamlit", "Python Scripting", "ZoneInfo", "datetime"],
      image: "⏲-Time-Zone-Application",
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
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent">
            Let's Work Together
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
