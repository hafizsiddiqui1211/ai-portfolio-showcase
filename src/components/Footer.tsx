import { Link } from "react-router-dom";
import { Code2, Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const explore = [
    { path: "/", label: "Home" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/playground", label: "Playground" },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/hafizsiddiqui1211" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/hafiz-siddiqui-018587295/" },
    { icon: Twitter, label: "X / Twitter", href: "https://x.com/hafiz_siddiqui_" },
    { icon: Mail, label: "Email", href: "mailto:wildansiddiqui8@gmail.com" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group w-fit">
              <Code2 className="h-6 w-6 text-accent" />
              <span className="font-heading font-bold text-lg">
                Agentic<span className="text-accent">Automation Labs</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agentic AI Engineer & Full-Stack Python Developer — building production agents, automation systems and
              AI-native software from prompt to deployment.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
              Explore
            </h3>
            <ul className="space-y-2">
              {explore.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-foreground/80 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="flex gap-3 mb-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card glow-border text-muted-foreground hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <Button size="sm" variant="outline" asChild>
              <a href="/downloads/hafiz-wildan-siddiqui-resume.pdf" download="Hafiz-Wildan-Siddiqui-Resume.pdf">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hafiz Wildan Ahmed Siddiqui · Agentic Automation Labs
          </p>
          <p className="text-xs font-mono-code text-muted-foreground">built with React · Tailwind · Python</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
