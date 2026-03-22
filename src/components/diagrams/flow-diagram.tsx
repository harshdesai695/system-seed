"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlowNode {
  id: string;
  label: string;
  description?: string;
  color?: string;
}

interface FlowDiagramProps {
  title?: string;
  nodes: FlowNode[];
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function FlowDiagram({
  title,
  nodes,
  direction = "horizontal",
  className,
}: FlowDiagramProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border border-border bg-card p-6",
        className
      )}
    >
      {title && (
        <h4 className="text-sm font-medium text-foreground mb-6">{title}</h4>
      )}
      <div
        className={cn(
          "flex items-center gap-2",
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap justify-center"
        )}
      >
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className={cn(
              "flex items-center gap-2",
              direction === "vertical" ? "flex-col" : "flex-row"
            )}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-lg border-2 px-4 py-3 text-center min-w-[120px]",
                node.color ?? "border-primary/30 bg-primary/5"
              )}
            >
              <div className="font-medium text-sm">{node.label}</div>
              {node.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {node.description}
                </div>
              )}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="text-muted-foreground text-lg"
              >
                {direction === "vertical" ? "↓" : "→"}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ArchitectureNode {
  id: string;
  label: string;
  type: "client" | "server" | "database" | "cache" | "queue" | "service";
  position: { x: number; y: number };
}

interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
}

const nodeColors: Record<string, string> = {
  client: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
  server:
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  database:
    "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
  cache:
    "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
  queue: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
  service:
    "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
};

export function ArchitectureDiagram({
  title,
  nodes,
  className,
}: {
  title?: string;
  nodes: { label: string; type: ArchitectureNode["type"] }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border border-border bg-card p-6",
        className
      )}
    >
      {title && (
        <h4 className="text-sm font-medium text-foreground mb-6">{title}</h4>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "rounded-lg border-2 px-5 py-3 text-center",
              nodeColors[node.type]
            )}
          >
            <div className="text-xs font-mono opacity-60 mb-1 uppercase">
              {node.type}
            </div>
            <div className="font-medium text-sm">{node.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
