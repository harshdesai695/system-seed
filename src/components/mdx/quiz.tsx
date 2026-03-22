"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from "lucide-react";

interface QuizOption {
  label: string;
  correct?: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export function Quiz({ question, options, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const correctIndex = options.findIndex((o) => o.correct);
  const isCorrect = selected === correctIndex;

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 bg-muted/50 border-b border-border">
        <HelpCircle className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          Knowledge Check
        </span>
      </div>

      {/* Question */}
      <div className="p-5">
        <p className="font-medium text-foreground mb-4">{question}</p>

        {/* Options */}
        <div className="space-y-2">
          {options.map((option, i) => {
            const isThis = selected === i;
            const isCorrectOption = option.correct;

            let borderColor = "border-border hover:border-primary/40 hover:bg-muted/40";
            if (revealed && isCorrectOption) {
              borderColor = "border-emerald-500/50 bg-emerald-500/10";
            } else if (revealed && isThis && !isCorrectOption) {
              borderColor = "border-rose-500/50 bg-rose-500/10";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={revealed}
                className={cn(
                  "w-full text-left flex items-center gap-3 rounded-lg border p-3 transition-all duration-200",
                  borderColor,
                  revealed ? "cursor-default" : "cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border",
                    revealed && isCorrectOption
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : revealed && isThis
                        ? "bg-rose-500 text-white border-rose-500"
                        : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {revealed && isCorrectOption ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : revealed && isThis ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-sm text-foreground/90">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Result & Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <div
                className={cn(
                  "rounded-lg p-4 text-sm",
                  isCorrect
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-amber-500/10 border border-amber-500/30"
                )}
              >
                <p className="font-semibold mb-1">
                  {isCorrect ? "✅ Correct!" : "❌ Not quite!"}
                </p>
                {explanation && (
                  <p className="text-foreground/70">{explanation}</p>
                )}
              </div>

              <button
                onClick={reset}
                className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
