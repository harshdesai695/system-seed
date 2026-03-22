import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";
import {
  ComparisonBarChart,
  PerformanceLineChart,
} from "@/components/charts/comparison-chart";
import {
  FlowDiagram,
  ArchitectureDiagram,
} from "@/components/diagrams/flow-diagram";
import {
  AnimatedSection,
  FadeIn,
  SlideIn,
} from "@/components/animations/animated-section";
import { Callout } from "@/components/mdx/callout";
import { Quiz } from "@/components/mdx/quiz";
import {
  ScalingVisualizer,
  StepDiagram,
} from "@/components/mdx/interactive-diagram";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Custom interactive components
    CodeBlock,
    ComparisonBarChart,
    PerformanceLineChart,
    FlowDiagram,
    ArchitectureDiagram,
    AnimatedSection,
    FadeIn,
    SlideIn,
    Callout,
    Quiz,
    ScalingVisualizer,
    StepDiagram,
  };
}
