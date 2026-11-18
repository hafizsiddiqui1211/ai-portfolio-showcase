import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, Twitter, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { backendConfig, isBackendConfigured } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/lib/motion";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "" // honeypot — real users never fill this
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website || isLoading || !backendConfig) return; // bot trap / unavailable preview
    setIsLoading(true);

    try {
      const response = await fetch(`${backendConfig.url}/functions/v1/send-contact-email`, {
        method: "POST",
        credentials: "omit",
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json", apikey: backendConfig.publishableKey },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok || data?.success !== true) throw new Error("Message was not saved");

      // Navigate to success page
      navigate("/contact/success");
    } catch {
      toast({
        title: "Error",
        description: "We could not confirm delivery. Please try again, or email wildansiddiqui8@gmail.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "wildansiddiqui8@gmail.com", href: "mailto:wildansiddiqui8@gmail.com" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", value: "www.linkedin.com/in/hafiz-siddiqui-018587295", href: "https://www.linkedin.com/in/hafiz-siddiqui-018587295/" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "github.com/hafizsiddiqui1211", href: "https://github.com/hafizsiddiqui1211" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", value: "@hafiz_siddiqui_", href: "https://x.com/hafiz_siddiqui_" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="Contact — Hire an Agentic AI Engineer"
        description="Get in touch with Hafiz Wildan Siddiqui for AI agent development, automation, full-stack projects, internships and consulting. Typical response within 24 hours."
        path="/contact"
        jsonLd={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Hafiz Wildan Siddiqui", url: "https://chainlit-shine-site.lovable.app/contact" }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="// contact" title="Get in Touch" subtitle="Have a project in mind? Let's discuss how we can work together." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <Reveal className="lg:col-span-2">
            <Card className="shadow-custom-lg border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Tell me what you're building and I'll get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isBackendConfigured && (
                  <p role="status" className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm text-muted-foreground">
                    The contact form is unavailable in this preview. Email me at{" "}
                    <a className="text-accent underline" href="mailto:wildansiddiqui8@gmail.com">wildansiddiqui8@gmail.com</a>.
                  </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        maxLength={100}
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        maxLength={254}
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      maxLength={200}
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      minLength={10}
                      maxLength={2000}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent"
                    disabled={isLoading || !isBackendConfigured}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          {/* Contact Info */}
          <Reveal delay={0.1} className="space-y-6">
            <Card className="shadow-custom-md border-border">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="p-2 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{link.label}</div>
                      <div className="break-all text-xs text-muted-foreground">{link.value}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="gradient-accent text-accent-foreground shadow-accent">
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-accent-foreground/90 leading-relaxed">
                  I'm currently available for freelance projects and consulting opportunities. 
                  Typical response time is within 24 hours.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
