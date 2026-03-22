"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Server, Database, Globe, Shield, Cpu, HardDrive, ArrowRight, Plus, Minus } from "lucide-react";

const iconMap: Record<string, typeof Server> = {
  server: Server,
  database: Database,
  globe: Globe,
  shield: Shield,
  cpu: Cpu,
  storage: HardDrive,
};

interface InteractiveDiagramProps {
  title: string;
  description?: string;
  type: "scaling" | "architecture";
}

export function ScalingVisualizer() {
  const [serverCount, setServerCount] = useState(1);
  const [isVertical, setIsVertical] = useState(true);
  const verticalPower = isVertical ? Math.min(serverCount, 4) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground">
          🖥️ Interactive: Scaling Visualizer
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Toggle between scaling types and see the difference
        </p>
      </div>

      <div className="p-5">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => { setIsVertical(true); setServerCount(1); }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              isVertical
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            ⬆️ Vertical Scaling
          </button>
          <button
            onClick={() => { setIsVertical(false); setServerCount(1); }}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              !isVertical
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            ➡️ Horizontal Scaling
          </button>
        </div>

        {/* Visualization */}
        <div className="relative min-h-[200px] flex flex-col items-center justify-center">
          {/* Load Balancer (horizontal only) */}
          <AnimatePresence>
            {!isVertical && serverCount > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-4 flex flex-col items-center"
              >
                <div className="px-4 py-2 rounded-lg bg-amber-500/10 border-2 border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                  ⚖️ Load Balancer
                </div>
                <div className="h-6 w-px bg-border" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Servers */}
          <div className="flex flex-wrap justify-center gap-3">
            {isVertical ? (
              <motion.div
                layout
                className="flex flex-col items-center"
              >
                <motion.div
                  layout
                  className={cn(
                    "rounded-xl border-2 border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center transition-all duration-500",
                    verticalPower === 1 && "w-20 h-20",
                    verticalPower === 2 && "w-28 h-28",
                    verticalPower === 3 && "w-36 h-36",
                    verticalPower >= 4 && "w-44 h-44",
                  )}
                >
                  <Server className={cn(
                    "text-blue-500 transition-all duration-500",
                    verticalPower === 1 && "h-8 w-8",
                    verticalPower === 2 && "h-10 w-10",
                    verticalPower === 3 && "h-12 w-12",
                    verticalPower >= 4 && "h-14 w-14",
                  )} />
                  <span className="text-xs mt-1 text-blue-500 font-medium">
                    {verticalPower * 8}GB / {verticalPower * 4}CPU
                  </span>
                </motion.div>
                <span className="text-xs text-muted-foreground mt-2">Single Server</span>
              </motion.div>
            ) : (
              Array.from({ length: serverCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center">
                    <Server className="h-8 w-8 text-emerald-500" />
                    <span className="text-[10px] mt-0.5 text-emerald-500 font-medium">
                      8GB / 4CPU
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    Server {i + 1}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-sm">
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">
                {isVertical ? verticalPower * 8 : serverCount * 8}GB
              </div>
              <div className="text-xs text-muted-foreground">Total RAM</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">
                {isVertical ? verticalPower * 4 : serverCount * 4}
              </div>
              <div className="text-xs text-muted-foreground">Total CPUs</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">
                {isVertical ? "1" : serverCount.toString()}
              </div>
              <div className="text-xs text-muted-foreground">Machines</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setServerCount(Math.max(1, serverCount - 1))}
            disabled={serverCount <= 1}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-muted-foreground min-w-[80px] text-center">
            {isVertical
              ? `Power: ${verticalPower}x`
              : `${serverCount} server${serverCount > 1 ? "s" : ""}`}
          </span>
          <button
            onClick={() => setServerCount(Math.min(isVertical ? 4 : 8, serverCount + 1))}
            disabled={serverCount >= (isVertical ? 4 : 8)}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Info line */}
        <p className="text-center text-xs text-muted-foreground mt-3">
          {isVertical
            ? "⚠️ Limited by hardware maximum. Single point of failure."
            : "✅ Add more servers on demand. Fault tolerant."}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Generic Step Diagram ─── */

interface StepNodeData {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface StepDiagramProps {
  title?: string;
  steps: StepNodeData[];
}

const defaultColors = [
  "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
  "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  "border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  "border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400",
  "border-cyan-500/30 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
];

export function StepDiagram({ title, steps }: StepDiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      {title && (
        <div className="px-5 py-3 bg-muted/50 border-b border-border">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon ? iconMap[step.icon] : null;
            const color = step.color ?? defaultColors[i % defaultColors.length];

            return (
              <div key={i} className="flex items-center md:flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "flex-1 rounded-xl border-2 p-4 text-center",
                    color
                  )}
                >
                  {Icon && <Icon className="h-6 w-6 mx-auto mb-2" />}
                  <div className="font-semibold text-sm">{step.title}</div>
                  {step.description && (
                    <div className="text-xs mt-1 opacity-70">
                      {step.description}
                    </div>
                  )}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="flex items-center justify-center px-2 text-muted-foreground">
                    <ArrowRight className="h-4 w-4 hidden md:block" />
                    <span className="block md:hidden text-lg">↓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
