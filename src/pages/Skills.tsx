import { Brain, Code2, Database, Cpu, Zap, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const skillCategories = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI & Machine Learning",
      skills: [
        { name: "OpenAI Agents SDK", level: 95 },
        { name: "Prompt Engineering", level: 98 },
        { name: "Context Engineering", level: 90 },
        { name: "LLM Integration", level: 92 },
      ]
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Development Frameworks",
      skills: [
        { name: "Streamlit", level: 95 },
        { name: "Chainlit", level: 90 },
        { name: "FastAPI", level: 93 },
        { name: "Python", level: 96 },
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend & APIs",
      skills: [
        { name: "REST API Design", level: 94 },
        { name: "Python Scripting", level: 97 },
        { name: "Async Programming", level: 88 },
        { name: "API Integration", level: 91 },
      ]
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Tools & Platforms",
      skills: [
        { name: "OpenAI GPT Models", level: 95 },
        { name: "Vector Databases", level: 85 },
        { name: "LangChain", level: 88 },
        { name: "Hugging Face", level: 82 },
      ]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance & Optimization",
      skills: [
        { name: "Code Optimization", level: 90 },
        { name: "System Architecture", level: 87 },
        { name: "Performance Tuning", level: 85 },
        { name: "Scalability Design", level: 88 },
      ]
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "DevOps & Tools",
      skills: [
        { name: "Git & Version Control", level: 93 },
        { name: "Docker", level: 85 },
        { name: "CI/CD Pipelines", level: 80 },
        { name: "Linux/Unix", level: 88 },
      ]
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Technical Skills</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my expertise across AI development, frameworks, and technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className="shadow-custom-md hover:shadow-custom-lg transition-all duration-300 border-border animate-fade-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    {category.icon}
                  </div>
                  <span>{category.title}</span>
                </CardTitle>
                <CardDescription>
                  Specialized expertise and proficiency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="gradient-accent text-accent-foreground shadow-accent animate-fade-up">
            <CardHeader>
              <CardTitle className="text-2xl">Continuous Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-accent-foreground/90 leading-relaxed">
                I'm passionate about staying at the forefront of AI technology. I regularly explore new 
                frameworks, attend conferences, and contribute to open-source projects. My commitment to 
                continuous learning ensures that I bring the most cutting-edge solutions to every project.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Skills;
