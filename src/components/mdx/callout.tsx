"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, BookOpen, Zap, CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "note" | "important" | "success";

const calloutConfig: Record<
  CalloutType,
  { icon: typeof Info; colors: string; iconColor: string; label: string }
> = {
  info: {
    icon: Info,
    colors: "border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10",
    iconColor: "text-blue-500",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    colors: "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10",
    iconColor: "text-amber-500",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    colors: "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10",
    iconColor: "text-emerald-500",
    label: "Tip",
  },
  note: {
    icon: BookOpen,
    colors: "border-purple-500/40 bg-purple-500/5 dark:bg-purple-500/10",
    iconColor: "text-purple-500",
    label: "Note",
  },
  important: {
    icon: Zap,
    colors: "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10",
    iconColor: "text-rose-500",
    label: "Important",
  },
  success: {
    icon: CheckCircle2,
    colors: "border-green-500/40 bg-green-500/5 dark:bg-green-500/10",
    iconColor: "text-green-500",
    label: "Success",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        config.colors,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.iconColor)} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn("font-semibold text-sm mb-1", config.iconColor)}>
              {title}
            </p>
          )}
          <div className="text-sm text-foreground/80 [&>p]:my-1">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
