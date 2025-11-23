import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Lightbulb, Rocket, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <Bot className="h-10 w-10" />,
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
      icon: <Lightbulb className="h-10 w-10" />,
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
      icon: <Code className="h-10 w-10" />,
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
      icon: <Zap className="h-10 w-10" />,
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
      icon: <Rocket className="h-10 w-10" />,
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
      icon: <Shield className="h-10 w-10" />,
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
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI development services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="shadow-custom-md hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-1 border-border animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-xl text-accent w-fit mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">How I Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understand your needs and goals" },
              { step: "02", title: "Planning", desc: "Design the optimal solution" },
              { step: "03", title: "Development", desc: "Build with best practices" },
              { step: "04", title: "Delivery", desc: "Deploy and support" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-heading font-bold text-accent mb-3">{phase.step}</div>
                <h3 className="font-heading font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="gradient-accent text-accent-foreground shadow-accent max-w-4xl mx-auto animate-fade-up">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Ready to Get Started?</CardTitle>
            <CardDescription className="text-accent-foreground/80 text-lg">
              Let's discuss how I can help transform your ideas into reality
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Schedule a Consultation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
