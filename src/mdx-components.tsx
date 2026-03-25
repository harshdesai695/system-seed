import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
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
import {
  LoadBalancerSim,
  CacheSim,
  RateLimiterSim,
  ConsistentHashingSim,
} from "@/components/mdx/simulators";
import {
  MessageQueueSim,
  CAPTheoremSim,
  CircuitBreakerSim,
  DNSSim,
  ParkingLotSim,
  ElevatorSim,
  LRUCacheVisualSim,
} from "@/components/mdx/simulators-v2";

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Styled HTML elements
    table: Table,
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
    LoadBalancerSim,
    CacheSim,
    RateLimiterSim,
    ConsistentHashingSim,
    MessageQueueSim,
    CAPTheoremSim,
    CircuitBreakerSim,
    DNSSim,
    ParkingLotSim,
    ElevatorSim,
    LRUCacheVisualSim,
  };
}
