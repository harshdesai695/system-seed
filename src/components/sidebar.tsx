"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Server,
  Code2,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getConceptsByCategory } from "@/config/concepts.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const hldConcepts = getConceptsByCategory("hld");
const lldConcepts = getConceptsByCategory("lld");

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [hldOpen, setHldOpen] = useState(true);
  const [lldOpen, setLldOpen] = useState(true);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">SystemSeed</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {/* HLD Section */}
          <button
            onClick={() => setHldOpen(!hldOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md hover:bg-accent transition-colors"
          >
            <Server className="h-4 w-4 text-blue-500" />
            <span>High-Level Design</span>
            <div className="ml-auto">
              {hldOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {hldOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 border-l border-border pl-2 space-y-0.5">
                  {hldConcepts.map((concept) => {
                    const href = `/concepts/hld/${concept.slug}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={concept.slug}
                        href={href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-blue-500/10 text-blue-500 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <span className="truncate flex-1">
                          {concept.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LLD Section */}
          <button
            onClick={() => setLldOpen(!lldOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md hover:bg-accent transition-colors"
          >
            <Code2 className="h-4 w-4 text-emerald-500" />
            <span>Low-Level Design</span>
            <div className="ml-auto">
              {lldOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {lldOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 border-l border-border pl-2 space-y-0.5">
                  {lldConcepts.map((concept) => {
                    const href = `/concepts/lld/${concept.slug}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={concept.slug}
                        href={href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-emerald-500/10 text-emerald-500 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <span className="truncate flex-1">
                          {concept.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </ScrollArea>
    </aside>
  );
}
