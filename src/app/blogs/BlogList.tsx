"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { BlogPost } from "@/lib/blogs";
import Link from "next/link";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Search, LayoutGrid, List } from "lucide-react";
import FluidMeshHeader from "@/components/FluidMeshHeader";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 20;

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  
  // Manual parse of "MMM DD, YYYY" for iOS Safari compatibility
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const monthName = parts[0].toUpperCase().replace(/,/g, "");
    const day = parts[1].replace(/,/g, "").padStart(2, "0");
    const year = parts[2].trim();
    
    const months: Record<string, string> = {
      JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
      JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12"
    };
    
    const month = months[monthName.substring(0, 3)];
    if (month && !isNaN(Number(day)) && !isNaN(Number(year))) {
      return `${day}/${month}/${year}`;
    }
  }

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function BlogList({ initialPosts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load view mode from localStorage on client side
  useEffect(() => {
    const saved = localStorage.getItem("blog-view-mode");
    if (saved === "list" || saved === "grid") {
      setViewMode(saved);
    }
  }, []);

  const handleToggleView = () => {
    const next = viewMode === "list" ? "grid" : "list";
    setViewMode(next);
    localStorage.setItem("blog-view-mode", next);
  };

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

    // 3. Sorting with slug tie-breaker for deterministic ordering when dates match
    result = result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateB !== dateA) {
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      }
      return sortOrder === "desc"
        ? b.slug.localeCompare(a.slug)
        : a.slug.localeCompare(b.slug);
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
            className="w-full bg-foreground/[0.02] border border-border/50 rounded py-1.5 pl-9 pr-4 text-sm placeholder:text-foreground/30 text-foreground focus:outline-none focus:border-accent transition-all font-sans"
          />
        </div>

        {/* Filter and View Action Group */}
        <div className="flex gap-2 items-center">
          {/* Minimal Filter Trigger */}
          <button
            id="filter-trigger-button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`text-sm hover:text-accent transition-all flex items-center gap-2 cursor-pointer px-4 py-2 border rounded-full ${
              showFilters || selectedCategories.length > 0
                ? "border-accent text-accent bg-accent/5"
                : "border-border/50 text-foreground/50 bg-foreground/[0.01]"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="font-semibold">Filters</span>
            {selectedCategories.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </button>

          {/* View Toggle */}
          <button
            onClick={handleToggleView}
            className="text-foreground/50 hover:text-accent hover:bg-accent/5 transition-all p-1.5 border border-border/50 rounded cursor-pointer flex items-center justify-center"
            title={viewMode === "list" ? "Switch to Thumbnail Grid" : "Switch to List View"}
          >
            {viewMode === "list" ? (
              <LayoutGrid className="w-4 h-4" />
            ) : (
              <List className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Floating Dropdown Filter Box (Overlay) */}
        {showFilters && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-1.5 z-50 w-48 p-4 border border-border/40 rounded bg-background shadow-lg space-y-4 animate-in fade-in slide-in-from-top-1 duration-100"
          >
            {/* Sorting Option */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-foreground/45 block font-semibold">
                Sort Order
              </span>
              <div className="flex flex-col gap-1">
                {(["desc", "asc"] as const).map((order) => (
                  <button
                    key={order}
                    onClick={() => setSortOrder(order)}
                    className={`text-left py-0.5 text-sm transition-all cursor-pointer ${sortOrder === order
                      ? "text-accent font-semibold"
                      : "text-foreground/50 hover:text-accent"
                      }`}
                  >
                    {order === "desc" ? "• Latest First" : "• Oldest First"}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Category Filter */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-foreground/45 block font-semibold">
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
                      className={`text-left py-0.5 text-sm transition-all cursor-pointer flex items-center justify-between ${isSelected
                        ? "text-accent font-semibold"
                        : "text-foreground/50 hover:text-accent"
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

      {/* List or Grid (OpenAI Style Thumbnail Cards) of Posts */}
      {paginatedPosts.length > 0 ? (
        viewMode === "list" ? (
          <div className="divide-y divide-border/60">
            {paginatedPosts.map((post) => (
              <div key={post.slug} className="py-4 first:pt-1 last:pb-1 group">
                {/* Desktop Grid Layout (Aligned Columns) */}
                <div className="hidden sm:grid sm:grid-cols-[90px_90px_8px_1fr] gap-x-3 items-baseline">
                  <span className="text-[11px] uppercase tracking-wider text-accent/85 font-bold select-none truncate pr-1">
                    {post.categories[0] || "Article"}
                  </span>
                  <span className="text-sm text-foreground/55 select-none tabular-nums">
                    {formatDate(post.date)}
                  </span>
                  <span className="text-foreground/30 select-none text-center">—</span>
                  <Link href={`/blogs/${post.slug}`} className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </Link>
                </div>

                {/* Mobile Stacked Layout (Full Width Title) */}
                <div className="sm:hidden flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold select-none">
                    <span className="text-accent/85">{post.categories[0] || "Article"}</span>
                    <span className="text-foreground/30 font-normal">&bull;</span>
                    <span className="text-foreground/50 font-normal">{formatDate(post.date)}</span>
                  </div>
                  <Link href={`/blogs/${post.slug}`} className="font-semibold text-[15px] leading-snug text-foreground group-hover:text-accent transition-colors block">
                    {post.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans animate-in fade-in duration-200">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col h-full bg-foreground/[0.01] border border-border rounded-lg overflow-hidden hover:bg-accent/[0.01] transition-all duration-300"
              >
                {/* OpenAI-Style Thumbnail Header */}
                <div className="relative w-full aspect-video overflow-hidden bg-foreground/[0.02] border-b border-border">
                  {post.headerImage ? (
                    <img
                      src={post.headerImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <FluidMeshHeader title={post.title} />
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] tracking-wide text-foreground/55 font-medium uppercase">
                      <span>{post.categories.join(" / ") || "ARTICLE"}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base leading-snug text-foreground group-hover:text-accent transition-colors">
                      {post.title} {post.seriesPart && `· Part ${post.seriesPart}`}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="py-12 text-center border border-dashed border-border/20 rounded">
          <p className="text-sm text-foreground/50">
            No matching blogs found
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 pt-8 border-t border-border/60">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 border border-border disabled:opacity-20 hover:text-accent hover:border-accent transition-colors cursor-pointer rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-foreground/70">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 border border-border disabled:opacity-20 hover:text-accent hover:border-accent transition-colors cursor-pointer rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
