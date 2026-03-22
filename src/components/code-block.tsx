"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  title?: string;
  java?: string;
  python?: string;
  go?: string;
  cpp?: string;
  highlightLines?: Record<string, number[]>;
}

const languageLabels: Record<string, string> = {
  java: "Java",
  python: "Python",
  go: "Go",
  cpp: "C++",
};

export function CodeBlock({
  title,
  java,
  python,
  go,
  cpp,
  highlightLines = {},
}: CodeBlockProps) {
  const languages = Object.entries({ java, python, go, cpp }).filter(
    ([, code]) => code
  );
  const [activeTab, setActiveTab] = useState(languages[0]?.[0] ?? "java");
  const [copied, setCopied] = useState(false);

  const currentCode =
    languages.find(([lang]) => lang === activeTab)?.[1] ?? "";
  const currentHighlight = highlightLines[activeTab] ?? [];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentCode.split("\n");

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        {title && (
          <span className="text-sm font-medium text-foreground">{title}</span>
        )}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      {languages.length > 1 && (
        <div className="flex border-b border-border bg-muted/30">
          {languages.map(([lang]) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={cn(
                "px-4 py-2 text-xs font-medium transition-colors border-b-2",
                activeTab === lang
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {languageLabels[lang] ?? lang}
            </button>
          ))}
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  currentHighlight.includes(i + 1) &&
                    "bg-blue-500/10 -mx-4 px-4 border-l-2 border-blue-500"
                )}
              >
                <span className="w-8 text-right pr-4 text-muted-foreground/50 select-none text-xs leading-relaxed">
                  {i + 1}
                </span>
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
