import { useState } from "react";
import { ExternalLink, Github, Lock, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SpotlightCard from "@/components/SpotlightCard";
import { formatMonth, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import captureManifest from "../../public/projects/manifest.json";

type Capture = { src?: string; kind: "website" | "repository" | "unavailable"; capturedAt: string; sourceUrl: string; note?: string };
const captures: Record<string, Capture> = captureManifest as Record<string, Capture>;
const statusStyle: Record<Project["status"], string> = {
  Live: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  "In development": "bg-amber-500/10 text-amber-200 border-amber-400/20",
  Prototype: "bg-violet-500/10 text-violet-200 border-violet-400/20",
  Delivered: "bg-cyan-500/10 text-cyan-200 border-cyan-400/20",
  "Local only": "bg-slate-500/10 text-slate-300 border-slate-400/20",
};

const Thumbnail = ({ project }: { project: Project }) => {
  const [failed, setFailed] = useState(false);
  const capture = captures[project.slug];
  const showShot = capture?.src && !failed;
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-secondary/60">
      {showShot ? <>
        <img src={capture.src} alt={`${capture.kind === "repository" ? "GitHub repository" : "Website first look"}: ${project.title}`}
          width={1280} height={800} loading="lazy" decoding="async" onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none" />
        <span className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-black/85 px-2 py-1 font-mono-code text-[10px] text-white">
          {capture.kind === "repository" ? "REPOSITORY" : "WEBSITE"} · {capture.capturedAt.slice(0, 10)}
        </span>
      </> : <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.12),transparent_70%)] p-6">
        <span className="font-mono-code text-[10px] uppercase tracking-[.18em] text-muted-foreground">{project.category} / {project.status}</span>
        <div><span className="mb-3 inline-block text-3xl" aria-hidden="true">{project.emoji}</span><p className="max-w-[23ch] text-lg font-heading font-medium leading-tight">{project.title.split(" — ")[0]}</p></div>
        <p className="flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
          {project.demo ? <ImageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : project.repo ? <Github className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
          {capture?.note ?? project.note ?? (project.repo ? "Explore the source code" : "Private project")}
        </p>
      </div>}
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <SpotlightCard className="group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-accent/30">
    <Thumbnail project={project} />
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-medium", statusStyle[project.status])}>{project.status}</span>
        <time dateTime={project.updatedAt ?? project.date} title={project.dateSource === "github" ? "Latest verified public repository activity" : "Supplied portfolio milestone"} className="font-mono-code text-[10px] text-muted-foreground">
          {project.dateSource === "github" ? "Updated " : ""}{formatMonth(project.date)}
        </time>
      </div>
      <div><h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p></div>
      <div className="flex flex-wrap gap-1.5">{project.tags.map(tag => <Badge key={tag} variant="secondary" className="rounded-md text-[10px] font-normal">{tag}</Badge>)}</div>
      <div className="mt-auto flex gap-4 border-t border-white/10 pt-4 text-xs font-medium">
        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo in a new tab`} className="inline-flex min-h-8 items-center gap-1.5 text-accent hover:underline underline-offset-4"><ExternalLink className="h-3.5 w-3.5" /> Visit project</a>}
        {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} code on GitHub in a new tab`} className="inline-flex min-h-8 items-center gap-1.5 text-foreground/80 hover:text-accent"><Github className="h-3.5 w-3.5" /> Source code <ArrowUpRight className="h-3 w-3" /></a>}
        {!project.demo && !project.repo && <a href="/contact" className="inline-flex min-h-8 items-center gap-1.5 text-muted-foreground hover:text-accent">Discuss this project <ArrowUpRight className="h-3.5 w-3.5" /></a>}
      </div>
    </div>
  </SpotlightCard>
);
export default ProjectCard;
