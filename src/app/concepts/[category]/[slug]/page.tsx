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
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop;
      const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  if (!concept) {
    notFound();
  }

  const { prev, next } = getAdjacentConcepts(category, slug);
  const categoryColor = category === "hld" ? "blue" : "emerald";

  return (
    <div id="concept-content" className="min-h-full">
      {/* Reading progress bar */}
      <div className="sticky top-0 z-30">
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
        <div className="mdx-content">
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
