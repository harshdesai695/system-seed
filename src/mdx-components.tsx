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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    CodeBlock,
    ComparisonBarChart,
    PerformanceLineChart,
    FlowDiagram,
    ArchitectureDiagram,
  };
}
