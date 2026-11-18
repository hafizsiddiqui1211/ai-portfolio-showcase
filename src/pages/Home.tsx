import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, Braces, Cpu, Download, FileCheck2, Github, Linkedin, MapPin, Sparkles, Workflow } from "lucide-react";
import Seo, { SITE_URL } from "@/components/Seo";
import SpotlightCard from "@/components/SpotlightCard";
import ProjectCard from "@/components/ProjectCard";
import { Reveal, Stagger, StaggerItem, ease } from "@/lib/motion";
import { sortedProjects } from "@/data/projects";

const EXPERTISE = [
  { icon: Bot, number: "01", title: "Agents with a purpose", text: "Tool-calling, memory and multi-step workflows with OpenAI Agents SDK, Agno and Chainlit.", tools: "AGENTIC AI · AUTOMATION" },
  { icon: Braces, number: "02", title: "From API to interface", text: "Python and FastAPI behind the scenes. React, Next.js and Streamlit where people use them.", tools: "FULL-STACK DEVELOPMENT" },
  { icon: Sparkles, number: "03", title: "Context that makes sense", text: "Clear prompts, grounded responses and thoughtful guardrails across modern LLM ecosystems.", tools: "PROMPT & CONTEXT ENGINEERING" },
  { icon: Cpu, number: "04", title: "A spec. A build. A result.", text: "Spec-driven development with Speckitplus, Claude Code and Gemini CLI — from an idea to working software.", tools: "AI-NATIVE DEVELOPMENT" },
];

const EXPERIENCE = [
  { title: "Back Office Executive", place: "K-Electric", period: "Mar 2026 – Present", detail: "Built an attendance automation system with Python and Streamlit for HR workflows covering 45+ employees, including biometric data parsing and reporting." },
  { title: "Python Development Intern", place: "Aptura Tech Solutions", period: "Jul 2026 · Remote", detail: "A task-based development internship delivering scoped Python features and practical projects." },
  { title: "Freelance Developer", place: "Upwork & Freelancer.com", period: "2024 – Present", detail: "AI, automation and web projects for clients, including event platforms, gym websites and community management tools." },
];

const Home = () => {
  const reduce = useReducedMotion();
  const featuredProjects = sortedProjects.filter((project) => project.demo).slice(0, 3);

  return (
    <div>
      <Seo
        title="Hafiz Wildan Siddiqui | Agentic AI Engineer & Full-Stack Python Developer"
        description="Hafiz Wildan Siddiqui — Agentic AI Engineer in Karachi building AI agents, automation systems and full-stack apps with OpenAI Agents SDK, Chainlit, FastAPI, React and Next.js."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org", "@type": "Person", name: "Hafiz Wildan Ahmed Siddiqui",
            alternateName: "Hafiz Wildan Siddiqui", url: SITE_URL,
            jobTitle: "Agentic AI Engineer & Full-Stack Python Developer",
            email: "mailto:wildansiddiqui8@gmail.com",
            address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
            knowsAbout: ["Agentic AI", "OpenAI Agents SDK", "Prompt Engineering", "Python", "FastAPI", "Streamlit", "React", "Next.js", "TypeScript", "Flutter"],
            sameAs: ["https://github.com/hafizsiddiqui1211", "https://www.linkedin.com/in/hafiz-siddiqui-018587295/", "https://x.com/hafiz_siddiqui_"],
          },
          { "@context": "https://schema.org", "@type": "WebSite", name: "Hafiz Wildan Siddiqui", url: SITE_URL },
        ]}
      />

      <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-44" aria-labelledby="intro-title">
        <div className="container relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.04] px-3.5 py-2 text-xs text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden /> Open to roles & freelance projects
              </motion.p>
              <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1, ease }}>
                <p className="mb-4 font-mono-code text-xs uppercase tracking-[0.2em] text-muted-foreground">Developer. Problem solver. Builder.</p>
                <h1 id="intro-title" className="text-[clamp(2.9rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.065em]">Hafiz Wildan<br /><span className="text-gradient">Siddiqui.</span></h1>
                <p className="mt-7 max-w-xl text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">AI agents. Thoughtful interfaces.<br className="hidden sm:block" /> Software that gets work done.</p>
                <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">I’m an Agentic AI Engineer & Full-Stack Python Developer turning complex workflows into useful, approachable tools.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/projects" className="btn-sheen group inline-flex min-h-12 items-center gap-3 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110">Explore my work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
                  <Link to="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-accent/50 hover:text-accent">Let’s talk <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Karachi, Pakistan · Remote</span>
                  <a href="/downloads/hafiz-wildan-siddiqui-resume.pdf" download="Hafiz-Wildan-Siddiqui-Resume.pdf" className="inline-flex min-h-8 items-center gap-1.5 underline-offset-4 transition hover:text-accent hover:underline"><Download className="h-3.5 w-3.5" /> Download résumé</a>
                </div>
              </motion.div>
            </div>

            <motion.div initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="relative min-w-0">
              <div className="workflow-panel relative overflow-hidden rounded-[1.75rem] border border-white/10 p-5 sm:p-7">
                <div className="mb-9 flex items-center justify-between gap-3 border-b border-white/[0.07] pb-5">
                  <span className="flex items-center gap-2 font-mono-code text-[11px] text-foreground/75"><Workflow className="h-4 w-4 text-accent" /> FROM INPUT TO IMPACT</span>
                  <span className="font-mono-code text-[10px] text-muted-foreground">WORKFLOW SKETCH</span>
                </div>
                <div className="relative space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                    <p className="mb-2 font-mono-code text-[10px] uppercase tracking-widest text-muted-foreground">01 — Understand</p>
                    <p className="text-sm leading-relaxed">“Turn attendance data into a clear monthly report.”</p>
                  </div>
                  <div className="flex justify-center py-1 text-accent/60" aria-hidden><ArrowDown className="h-4 w-4" /></div>
                  <div className="rounded-xl border border-accent/30 bg-accent/[0.04] p-4">
                    <div className="mb-3 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent"><Bot className="h-5 w-5" /></span><div><p className="text-sm font-medium">02 — Build the workflow</p><p className="mt-0.5 font-mono-code text-[10px] text-muted-foreground">PARSE → VALIDATE → ORGANIZE</p></div></div>
                    <div className="flex flex-wrap gap-1.5">{["Python", "Shift-aware logic", "Automation"].map((label) => <span key={label} className="rounded-md border border-white/10 px-2 py-1 font-mono-code text-[10px] text-foreground/70">{label}</span>)}</div>
                  </div>
                  <div className="flex justify-center py-1 text-accent/60" aria-hidden><ArrowDown className="h-4 w-4" /></div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4"><FileCheck2 className="h-6 w-6 shrink-0 text-emerald-300" /><div><p className="mb-1 font-mono-code text-[10px] uppercase tracking-widest text-muted-foreground">03 — Make it useful</p><p className="text-sm">Structured reports. Less repetitive work.</p></div></div>
                </div>
                <p className="mt-6 border-t border-white/[0.07] pt-4 text-[11px] leading-relaxed text-muted-foreground">Illustrative workflow inspired by my attendance automation project.</p>
              </div>
            </motion.div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.07] pt-6 sm:mt-24">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3"><span className="font-mono-code text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Built with</span>{["Python", "OpenAI Agents SDK", "FastAPI", "React", "Next.js"].map((tech) => <span key={tech} className="text-xs text-foreground/65">{tech}</span>)}</div>
            <div className="flex items-center gap-1"><a href="https://github.com/hafizsiddiqui1211" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded-lg p-3 text-muted-foreground transition hover:bg-white/5 hover:text-accent"><Github className="h-4 w-4" /></a><a href="https://www.linkedin.com/in/hafiz-siddiqui-018587295/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-lg p-3 text-muted-foreground transition hover:bg-white/5 hover:text-accent"><Linkedin className="h-4 w-4" /></a></div>
          </div>
        </div>
      </section>

      <section className="section-divider py-20 sm:py-28" aria-labelledby="selected-work">
        <div className="container mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="section-eyebrow">01 / Selected work</p><h2 id="selected-work" className="section-heading">Built to be used.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">A selection of public projects, from AI experiments to complete web experiences. Newest updates first.</p></div>
            <Link to="/projects" className="group inline-flex shrink-0 items-center gap-2 text-sm text-accent">All {sortedProjects.length} projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" /></Link>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredProjects.map((project) => <StaggerItem key={project.slug}><ProjectCard project={project} /></StaggerItem>)}</Stagger>
        </div>
      </section>

      <section className="section-divider py-20 sm:py-28" aria-labelledby="expertise-title">
        <div className="container mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal><p className="section-eyebrow">02 / What I bring</p><h2 id="expertise-title" className="section-heading">The thinking.<br />And the building.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">Connecting AI capabilities to real problems — with care for the experience on the other side of the screen.</p><Link to="/skills" className="mt-7 inline-flex items-center gap-2 text-sm text-accent">Explore my toolkit <ArrowUpRight className="h-4 w-4" /></Link></Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2">{EXPERTISE.map((item) => <StaggerItem key={item.number}><SpotlightCard className="h-full p-6"><div className="mb-6 flex items-center justify-between"><item.icon className="h-6 w-6 text-accent" /><span className="font-mono-code text-[11px] text-muted-foreground">{item.number}</span></div><h3 className="mb-3 text-lg font-medium">{item.title}</h3><p className="text-sm leading-6 text-muted-foreground">{item.text}</p><p className="mt-6 border-t border-white/[0.06] pt-4 font-mono-code text-[9px] tracking-wider text-foreground/55">{item.tools}</p></SpotlightCard></StaggerItem>)}</Stagger>
          </div>
        </div>
      </section>

      <section className="section-divider py-20 sm:py-28" aria-labelledby="journey-title">
        <div className="container mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-12"><p className="section-eyebrow">03 / The journey</p><h2 id="journey-title" className="section-heading">Always building.<br />Always learning.</h2></Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div>{EXPERIENCE.map((item, index) => <Reveal key={item.title} delay={index * 0.05} className="border-t border-white/10 py-7"><div className="mb-3 flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-lg font-medium">{item.title}</h3><p className="mt-1 text-sm text-accent">{item.place}</p></div><p className="pt-1 font-mono-code text-[11px] text-muted-foreground">{item.period}</p></div><p className="max-w-xl text-sm leading-7 text-muted-foreground">{item.detail}</p></Reveal>)}</div>
            <Reveal className="self-start rounded-2xl border border-white/10 bg-white/[0.02] p-7"><p className="section-eyebrow">Learning, in parallel</p><h3 className="text-lg font-medium">BS Software Engineering</h3><p className="mt-2 text-sm text-muted-foreground">Sindh Madressatul Islam University, Karachi</p><p className="mt-3 font-mono-code text-xs text-accent">Expected graduation · 2027</p><div className="my-7 h-px bg-white/10" /><h3 className="text-lg font-medium">Generative & Agentic AI</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Governor’s Initiative for AI & Computing — agent frameworks, modern LLMs and AI-native development.</p><p className="mt-3 font-mono-code text-xs text-accent">GIAIC · Ongoing</p></Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-20" aria-labelledby="contact-title">
        <Reveal className="contact-panel relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-accent/15 p-8 sm:p-14 lg:p-20">
          <p className="section-eyebrow">A good place to start</p><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><h2 id="contact-title" className="section-heading">Have something<br />in mind? <span className="text-gradient">Let’s build it.</span></h2><p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">An AI workflow, a useful product, or a problem worth solving. I’d like to hear about it.</p></div><Link to="/contact" className="btn-sheen inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link></div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
