import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Article not found</h1>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All articles
          </Link>
        </Button>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-accent" />
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {post.readTime}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-5 text-base leading-relaxed text-foreground/90">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 p-6 glass glow-border rounded-2xl">
          <p className="text-sm text-muted-foreground mb-4">
            Enjoyed this? Let's talk about building it for your team.
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
