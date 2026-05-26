"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/blogs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 5;

export default function BlogList({ initialPosts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let result = initialPosts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    result = result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialPosts, search, sortOrder]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="space-y-8">
      {/* Minimal Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-border/10">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20" />
          <input
            type="text"
            placeholder="Search_Archive..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent border-b border-border/20 rounded-none py-1.5 pl-9 pr-2 text-xs font-mono placeholder:text-foreground/40 text-foreground/80 focus:outline-none focus:border-foreground/50 transition-colors"
          />
        </div>

        <button
          onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
          className="text-[9px] font-mono text-foreground/50 uppercase tracking-widest hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowUpDown className="w-3 h-3" />
          {sortOrder === "desc" ? "Latest_First" : "Oldest_First"}
        </button>
      </div>

      {/* High-Density List */}
      <div className="space-y-0">
        <AnimatePresence mode="wait">
          {paginatedPosts.length > 0 ? (
            <motion.div
              key={currentPage + search + sortOrder}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="divide-y divide-border/10"
            >
              {paginatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-6 transition-all duration-300"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-medium text-foreground group-hover:underline decoration-foreground/20 underline-offset-8 transition-all duration-300">
                      {post.title}
                    </h2>
                    <p className="text-xs text-foreground/40 font-light max-w-2xl tracking-tight leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <span className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest font-medium">
                      {post.categories.join(" / ")}
                    </span>
                    <span className="text-[10px] font-mono text-foreground/50 w-24 text-right">{post.date}</span>
                  </div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[10px] font-mono text-foreground/20 uppercase tracking-widest">No_Results_Found</p>
            </div>
          )}
        </AnimatePresence>
      </div>


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-12 border-t border-border/20">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-3 bg-foreground/[0.03] border border-border/40 disabled:opacity-20 hover:bg-foreground/[0.05] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.2em]">
            Page {currentPage} _of_ {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-3 bg-foreground/[0.03] border border-border/40 disabled:opacity-20 hover:bg-foreground/[0.05] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
