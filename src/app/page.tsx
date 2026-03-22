"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Code2,
  ArrowRight,
  Sparkles,
  BookOpen,
  LineChart,
  Layers,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getConceptsByCategory } from "@/config/concepts.config";
import {
  AnimatedSection,
  SlideIn,
} from "@/components/animations/animated-section";
import { cn } from "@/lib/utils";

const hldConcepts = getConceptsByCategory("hld");
const lldConcepts = getConceptsByCategory("lld");

const features = [
  {
    icon: BookOpen,
    title: "Learn Like You're 10",
    description:
      "Every concept explained with everyday analogies before diving into technical depth.",
  },
  {
    icon: Layers,
    title: "Interactive Diagrams",
    description:
      "Animated architecture diagrams and flowcharts you can explore and interact with.",
  },
  {
    icon: Code2,
    title: "Multi-Language Code",
    description:
      "Implementation examples in Java, Python, Go, and C++ with syntax highlighting.",
  },
  {
    icon: LineChart,
    title: "Visual Comparisons",
    description:
      "Charts and comparison tables that make tradeoffs crystal clear.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-sm font-medium"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Interactive System Design Learning
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                System Design
              </span>
              <br />
              From Zero to Hero
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Learn HLD and LLD concepts with interactive animations, real-world
              analogies, and production-grade code examples. No prior experience
              needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/concepts/hld"
                className={cn(buttonVariants({ size: "lg" }), "px-8")}
              >
                <Server className="h-4 w-4 mr-2" />
                Start with HLD
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="/concepts/lld"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "px-8")}
              >
                <Code2 className="h-4 w-4 mr-2" />
                Start with LLD
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Learn System Design the Right Way
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every concept includes interactive visuals, real-world case studies,
            and code in multiple languages.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <SlideIn key={feature.title} delay={i * 0.1} direction="up">
              <Card className="h-full bg-card/50 border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </SlideIn>
          ))}
        </div>
      </section>

      {/* HLD Concepts Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Server className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">High-Level Design</h2>
              <p className="text-sm text-muted-foreground">
                {hldConcepts.length} concepts · Architecture & distributed
                systems
              </p>
            </div>
            <Link
              href="/concepts/hld"
              className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hldConcepts.slice(0, 6).map((concept, i) => (
            <SlideIn key={concept.slug} delay={i * 0.05} direction="up">
              <Link href={`/concepts/hld/${concept.slug}`}>
                <Card className="h-full bg-card/50 hover:bg-card hover:border-blue-500/30 transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                        {concept.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0 ml-2"
                      >
                        {concept.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {concept.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Zap className="h-3 w-3 mr-1" />
                      {concept.estimatedReadTime} min read
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SlideIn>
          ))}
        </div>
      </section>

      {/* LLD Concepts Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 pb-24">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Code2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Low-Level Design</h2>
              <p className="text-sm text-muted-foreground">
                {lldConcepts.length} concepts · OOP, patterns & implementations
              </p>
            </div>
            <Link
              href="/concepts/lld"
              className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lldConcepts.slice(0, 6).map((concept, i) => (
            <SlideIn key={concept.slug} delay={i * 0.05} direction="up">
              <Link href={`/concepts/lld/${concept.slug}`}>
                <Card className="h-full bg-card/50 hover:bg-card hover:border-emerald-500/30 transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold group-hover:text-emerald-500 transition-colors">
                        {concept.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs shrink-0 ml-2"
                      >
                        {concept.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {concept.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Zap className="h-3 w-3 mr-1" />
                      {concept.estimatedReadTime} min read
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
