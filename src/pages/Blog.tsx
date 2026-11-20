import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Stagger, StaggerItem } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

const Blog = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <Seo
        title="Blog — Agentic AI, Prompt Engineering & Shipping Python"
        description="Practical articles on designing agentic workflows with the OpenAI Agents SDK, prompt engineering in production and shipping Streamlit apps people actually use."
        path="/blog"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="// writing" title="Articles & Notes" subtitle="Practical writing on agentic AI, prompt engineering and shipping Python systems." />
        <Stagger className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
            <StaggerItem key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <SpotlightCard className="h-full p-6 transition-transform duration-300 group-hover:-translate-y-1.5">
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-accent" />{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-accent" />{post.readTime}</span>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-accent">{post.title}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (<Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">Read article<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

export default Blog;
