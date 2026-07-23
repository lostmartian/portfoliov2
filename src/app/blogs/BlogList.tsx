"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { BlogPost } from "@/lib/blogs";
import Link from "next/link";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Search } from "lucide-react";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export default function BlogList({ initialPosts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside, excluding the trigger button
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const trigger = document.getElementById("filter-trigger-button");
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        (!trigger || !trigger.contains(event.target as Node))
      ) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract unique categories dynamically
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    initialPosts.forEach((post) => {
      post.categories.forEach((c) => cats.add(c));
    });
    return Array.from(cats);
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    let result = initialPosts.filter((post) => {
      // 1. Domain category filter
      if (selectedCategories.length > 0) {
        const hasCategory = post.categories.some((cat) => selectedCategories.includes(cat));
        if (!hasCategory) return false;
      }

      // 2. Search query filter
      const query = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.categories.some((cat) => cat.toLowerCase().includes(query))
      );
    });

    // 3. Sorting
    result = result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialPosts, search, sortOrder, selectedCategories]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls Container */}
      <div className="relative flex gap-4 items-center justify-between pb-2">
        {/* Minimal Search Input with Border */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-foreground/[0.02] border border-border/50 rounded py-1.5 pl-9 pr-4 text-sm placeholder:text-foreground/30 text-foreground focus:outline-none focus:border-foreground/30 transition-all font-sans"
          />
        </div>

        {/* Minimal Filter Trigger */}
        <button
          id="filter-trigger-button"
          onClick={() => setShowFilters((prev) => !prev)}
          className={`text-xs font-mono hover:text-foreground transition-all flex items-center gap-2 cursor-pointer px-3 py-1.5 border rounded ${showFilters || selectedCategories.length > 0
            ? "border-foreground/30 text-foreground bg-foreground/[0.03]"
            : "border-border/50 text-foreground/50 bg-foreground/[0.01]"
            }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span className="font-semibold">Filters</span>
          {selectedCategories.length > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          )}
        </button>

        {/* Floating Dropdown Filter Box (Overlay) */}
        {showFilters && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-1.5 z-50 w-48 p-4 border border-border/40 rounded bg-background shadow-lg space-y-4 animate-in fade-in slide-in-from-top-1 duration-100"
          >
            {/* Sorting Option */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 block font-semibold">
                Sort Order
              </span>
              <div className="flex flex-col gap-1">
                {(["desc", "asc"] as const).map((order) => (
                  <button
                    key={order}
                    onClick={() => setSortOrder(order)}
                    className={`text-left py-0.5 text-xs font-mono transition-all cursor-pointer ${sortOrder === order
                      ? "text-foreground font-semibold"
                      : "text-foreground/50 hover:text-foreground"
                      }`}
                  >
                    {order === "desc" ? "• Latest First" : "• Oldest First"}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Category Filter */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 block font-semibold">
                Domain
              </span>
              <div className="flex flex-col gap-1">
                {allCategories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategories((prev) =>
                          isSelected ? prev.filter((c) => c !== cat) : [...prev, cat]
                        );
                        setCurrentPage(1);
                      }}
                      className={`text-left py-0.5 text-xs font-mono transition-all uppercase tracking-wider cursor-pointer flex items-center justify-between ${isSelected
                        ? "text-emerald-500 dark:text-emerald-400 font-semibold"
                        : "text-foreground/50 hover:text-foreground"
                        }`}
                    >
                      <span>• {cat}</span>
                      {isSelected && <span className="text-[9px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple Vertical List of Posts */}
      {paginatedPosts.length > 0 ? (
        <div className="space-y-5 text-sm text-foreground/80 font-sans">
          {paginatedPosts.map((post) => (
            <div key={post.slug} className="flex items-start gap-2">
              <span className="text-xs font-mono text-foreground/30 mt-1">•</span>
              <div className="flex-grow space-y-1">
                {/* Line 1: Title and Date/ReadTime */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <Link href={`/blogs/${post.slug}`} className="font-semibold text-foreground hover:underline">
                    {post.title}
                  </Link>
                  <span className="text-xs text-foreground/40 font-mono">
                    {post.date} &middot; {post.readTime}
                  </span>
                </div>

                {/* Line 2: Description */}
                <p className="text-foreground/70 font-light text-sm leading-relaxed">
                  {post.description}
                </p>

                {/* Line 3: Categories & Series */}
                {(post.categories.length > 0 || post.seriesName) && (
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono pt-1">
                    {post.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 text-foreground/50 uppercase tracking-wider bg-foreground/[0.04] border border-border/10 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                    {post.seriesName && (
                      <span className="px-2 py-0.5 text-foreground/50 uppercase tracking-wider bg-foreground/[0.04] border border-border/10 rounded">
                        {post.seriesName} · Part {post.seriesPart}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border border-dashed border-border/20 rounded">
          <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest">
            No matching blogs found
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-border/20">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 bg-foreground/[0.02] border border-border disabled:opacity-20 hover:bg-foreground/[0.04] rounded transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 bg-foreground/[0.02] border border-border disabled:opacity-20 hover:bg-foreground/[0.04] rounded transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
