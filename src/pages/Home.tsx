import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Code, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI Engineering Expert</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight">
              Building Intelligent
              <span className="block text-accent">AI Solutions</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-primary-foreground/80 max-w-2xl mx-auto">
              Specializing in Agentic AI, Prompt Engineering, and Full-Stack AI Development
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/projects">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent group">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Get in Touch
                </Button>
              </Link>
            </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Bot className="h-12 w-12 text-accent" />,
                title: "Agentic AI",
                description: "Expert in OpenAI Agents SDK, building autonomous AI systems that think and act intelligently"
              },
              {
                icon: <Code className="h-12 w-12 text-accent" />,
                title: "Full-Stack Development",
                description: "Streamlit, Chainlit, and FastAPI specialist creating seamless AI-powered applications"
              },
              {
                icon: <Sparkles className="h-12 w-12 text-accent" />,
                title: "Prompt Engineering",
                description: "Crafting precise prompts and context strategies for optimal AI model performance"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-1 border border-border animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Let's discuss how I can help bring your AI vision to life
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent">
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
