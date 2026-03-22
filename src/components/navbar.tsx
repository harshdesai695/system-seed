"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { concepts } from "@/config/concepts.config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const filteredConcepts = searchQuery.trim()
    ? concepts.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center px-4 gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Sidebar className="h-full" />
          </SheetContent>
        </Sheet>

        {/* Logo - visible on mobile only */}
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-base">SystemSeed</span>
        </Link>

        {/* Breadcrumbs */}
        <nav className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          {pathname.startsWith("/concepts") && (
            <>
              <span>/</span>
              <Link
                href="/concepts"
                className="hover:text-foreground transition-colors"
              >
                Concepts
              </Link>
            </>
          )}
          {pathname.includes("/hld") && (
            <>
              <span>/</span>
              <Link
                href="/concepts/hld"
                className="hover:text-foreground transition-colors text-blue-500"
              >
                HLD
              </Link>
            </>
          )}
          {pathname.includes("/lld") && (
            <>
              <span>/</span>
              <Link
                href="/concepts/lld"
                className="hover:text-foreground transition-colors text-emerald-500"
              >
                LLD
              </Link>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search concepts"
            >
              <Search className="h-4 w-4" />
            </Button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-xl p-3 z-50"
                >
                  <Input
                    placeholder="Search concepts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                    autoFocus
                  />
                  {filteredConcepts.length > 0 && (
                    <div className="max-h-64 overflow-y-auto space-y-1">
                      {filteredConcepts.map((c) => (
                        <Link
                          key={`${c.category}-${c.slug}`}
                          href={`/concepts/${c.category}/${c.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                        >
                          <div className="font-medium">{c.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {c.category.toUpperCase()} · {c.difficulty}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.trim() && filteredConcepts.length === 0 && (
                    <p className="text-sm text-muted-foreground px-3 py-2">
                      No concepts found.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
