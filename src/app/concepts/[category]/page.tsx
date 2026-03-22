"use client";

import { use } from "react";
import Link from "next/link";
import { Server, Code2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getConceptsByCategory } from "@/config/concepts.config";
import { SlideIn } from "@/components/animations/animated-section";
import { notFound } from "next/navigation";

const categoryMeta = {
  hld: {
    title: "High-Level Design",
    description:
      "Architecture concepts for building scalable, reliable distributed systems. Learn how companies like Netflix, Uber, and Amazon design their infrastructure.",
    icon: Server,
    color: "blue",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  lld: {
    title: "Low-Level Design",
    description:
      "Object-oriented design, design patterns, and implementation-level system design. Master the code-level architecture that powers production software.",
    icon: Code2,
    color: "emerald",
    gradient: "from-emerald-500/10 to-emerald-600/5",
  },
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  if (category !== "hld" && category !== "lld") {
    notFound();
  }

  const meta = categoryMeta[category];
  const concepts = getConceptsByCategory(category);
  const Icon = meta.icon;

  return (
    <div className="min-h-full">
      {/* Header */}
      <section
        className={`border-b border-border bg-gradient-to-br ${meta.gradient}`}
      >
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`h-12 w-12 rounded-xl bg-${meta.color}-500/10 flex items-center justify-center`}
            >
              <Icon className={`h-6 w-6 text-${meta.color}-500`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{meta.title}</h1>
              <p className="text-muted-foreground">
                {concepts.length} concepts
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((concept, i) => (
            <SlideIn key={concept.slug} delay={i * 0.03} direction="up">
              <Link href={`/concepts/${category}/${concept.slug}`}>
                <Card
                  className={`h-full bg-card/50 hover:bg-card hover:border-${meta.color}-500/30 transition-all group`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-muted-foreground">
                          {String(concept.order).padStart(2, "0")}
                        </span>
                        <h3
                          className={`font-semibold group-hover:text-${meta.color}-500 transition-colors`}
                        >
                          {concept.title}
                        </h3>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0 ml-2"
                      >
                        {concept.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 ml-8">
                      {concept.description}
                    </p>
                    <div className="flex items-center gap-3 ml-8">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Zap className="h-3 w-3 mr-1" />
                        {concept.estimatedReadTime} min read
                      </div>
                      <div className="flex gap-1">
                        {concept.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs px-2 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SlideIn>
          ))}
        </div>
      </section>
    </div>
  );
}
