import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { Reveal } from "@/lib/motion";
import { categories, sortedProjects } from "@/data/projects";

const Projects = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const reduce = useReducedMotion();
  const list = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matches = sortedProjects.filter((project) =>
      (active === "All" || project.category === active) &&
      (!search || [project.title, project.summary, ...project.tags].join(" ").toLowerCase().includes(search))
    );
    return sort === "name" ? matches.sort((a, b) => a.title.localeCompare(b.title)) : matches;
  }, [active, query, sort]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <Seo title="Projects — AI Agents, Automation & Full-Stack Apps"
        description="Explore Hafiz Wildan Siddiqui's AI agents, Python automation, websites and mobile projects. Browse by technology, with recent public repository updates first."
        path="/projects"
        jsonLd={{ "@context": "https://schema.org", "@type": "ItemList", name: "Projects by Hafiz Wildan Siddiqui",
          itemListElement: sortedProjects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, ...(p.demo || p.repo ? { url: p.demo || p.repo } : {}) })) }} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="01 / Selected work" title="Ideas, made real."
          subtitle="AI agents, useful automation and thoughtful interfaces. A collection of experiments, client work and products in progress." />
        <div className="mb-8 space-y-5 border-y border-white/10 py-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} type="button" aria-pressed={active === category} onClick={() => setActive(category)}
                  className={`min-h-10 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${active === category ? "border-accent bg-accent text-accent-foreground" : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground"}`}>
                  {category}
                </button>
              ))}
            </div>
            <div className="relative lg:w-64">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input type="search" aria-label="Search projects or technologies" placeholder="Search projects or stack…" value={query}
                onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-full border border-white/10 bg-card pl-10 pr-4 text-sm placeholder:text-muted-foreground" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <p role="status" aria-live="polite">{list.length} {list.length === 1 ? "project" : "projects"} · Public updates and portfolio milestones</p>
            <label className="flex items-center gap-2"><SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Sort projects</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-white/10 bg-card px-2 py-1.5 text-foreground">
                <option value="latest">Latest first</option><option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
        </div>
        <motion.div layout={!reduce} className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((project) => (
              <motion.div key={project.slug} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <div className="py-20 text-center"><h2 className="text-xl font-medium">No matching projects</h2><p className="mt-2 text-sm text-muted-foreground">Try a different technology or category.</p><button className="mt-5 text-sm text-accent underline underline-offset-4" onClick={() => { setActive("All"); setQuery(""); }}>Clear filters</button></div>}
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Website previews are saved captures of the public demos. Repository previews are labeled. Private, local and unavailable demos use a project summary. Dates use the latest verified GitHub push where available; other dates are supplied portfolio milestones.</p>
        <Reveal className="mt-24 border-t border-white/10 pt-12 text-center">
          <p className="mb-4 text-2xl font-heading">Your next idea could be here.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-accent">Let’s build something useful <ArrowUpRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </div>
  );
};
export default Projects;
