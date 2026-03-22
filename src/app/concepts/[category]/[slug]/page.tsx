"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  getConceptBySlug,
  getAdjacentConcepts,
} from "@/config/concepts.config";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export default function ConceptPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = use(params);
  const concept = getConceptBySlug(category, slug);
  const [readProgress, setReadProgress] = useState(0);
  const [Content, setContent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamic import of MDX content
    import(`@/content/${category}/${slug}.mdx`)
      .then((mod) => setContent(() => mod.default))
      .catch(() => setContent(null));
  }, [category, slug]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("concept-content");
      if (!el) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = el.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!concept) {
    notFound();
  }

  const { prev, next } = getAdjacentConcepts(category, slug);
  const categoryColor = category === "hld" ? "blue" : "emerald";

  return (
    <div id="concept-content" className="min-h-full">
      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 right-0 z-40">
        <Progress value={readProgress} className="h-0.5 rounded-none" />
      </div>

      <article className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/concepts/${category}`}
              className={`text-sm text-${categoryColor}-500 hover:underline`}
            >
              {category.toUpperCase()}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">
              {concept.title}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {concept.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {concept.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className={cn(difficultyColors[concept.difficulty])}
            >
              {concept.difficulty}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Clock className="h-4 w-4" />
              <span>{concept.estimatedReadTime} min read</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex gap-1.5">
              {concept.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <Separator className="mb-10" />

        {/* MDX Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border">
          {Content ? (
            <Content />
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg mb-2">Content coming soon!</p>
              <p className="text-sm">
                This concept page is being prepared. Check back later.
              </p>
            </div>
          )}
        </div>

        {/* Navigation: Previous / Next */}
        <Separator className="mt-16 mb-8" />
        <nav className="flex justify-between items-center pb-10">
          {prev ? (
            <Link
              href={`/concepts/${category}/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-medium">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/concepts/${category}/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <div>
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="font-medium">{next.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
