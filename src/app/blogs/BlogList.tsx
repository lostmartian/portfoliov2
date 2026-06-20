"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/blogs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import AbstractFlowBackground from "@/components/AbstractFlowBackground";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 6; // Bento works well with multiples of 3

export default function BlogList({ initialPosts }: BlogListProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let result = initialPosts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.categories.some(cat => cat.toLowerCase().includes(search.toLowerCase()))
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

  // Helper to assign Bento layout classes to grid items
  const getBentoClasses = (index: number) => {
    const layouts = [
      "md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[460px]", // Large featured
      "md:col-span-1 min-h-[220px]",
      "md:col-span-1 min-h-[220px]",
      "md:col-span-1 min-h-[220px]",
      "md:col-span-2 min-h-[220px]",
      "md:col-span-3 min-h-[180px]", // Full-width horizontal bento strip
    ];
    return layouts[index % layouts.length];
  };

  return (
    <div className="space-y-8 sm:space-y-12 font-sans">
      {/* Minimal controls - styled like OpenAI */}
      <div className="flex flex-row gap-2 sm:gap-4 items-center justify-between pb-6 sm:pb-8 border-b border-border/10">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-foreground/[0.02] border border-border/10 hover:border-border/20 rounded-full py-2 sm:py-2.5 pl-10 pr-4 text-xs sm:text-sm font-sans placeholder:text-foreground/40 text-foreground/80 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all duration-350"
          />
        </div>

        <button
          onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
          className="text-[10px] sm:text-xs font-mono text-foreground/60 uppercase tracking-wider hover:text-foreground transition-colors flex items-center gap-1.5 sm:gap-2 border border-border/10 rounded-full px-3 sm:px-4 py-2 bg-foreground/[0.01] hover:bg-foreground/[0.03] shrink-0"
        >
          <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {sortOrder === "desc" ? "Latest" : "Oldest"}
        </button>
      </div>

      {/* Bento Grid */}
      <AnimatePresence mode="wait">
        {paginatedPosts.length > 0 ? (
          <motion.div
            key={currentPage + search + sortOrder}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr"
          >
            {paginatedPosts.map((post, index) => {
              const bentoClass = getBentoClasses(index);
              const isLarge = bentoClass.includes("md:col-span-2 md:row-span-2");

              return (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className={`group relative flex flex-col justify-between p-5 sm:p-6 md:p-8 rounded-2xl border border-border/10 hover:border-border/30 hover:shadow-[0_12px_45px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_45px_-15px_rgba(0,0,0,0.5)] transition-all duration-200 overflow-hidden bg-white/50 dark:bg-foreground/[0.02] ${bentoClass}`}
                >
                  {/* Dynamic Abstract Flow Art Background */}
                  <AbstractFlowBackground title={post.title} description={post.description} categories={post.categories} />

                  {/* Top Metadata */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-foreground/80 uppercase tracking-widest bg-background/50 backdrop-blur-xs border border-foreground/10 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <span className="p-1.5 rounded-full border border-foreground/15 bg-background/50 backdrop-blur-xs text-foreground/80 group-hover:text-foreground group-hover:border-foreground/35 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Main Content Area */}
                  <div className="relative z-10 mt-6 sm:mt-8 mb-4 sm:mb-6 space-y-3">
                    <h2 className={`${isLarge ? "text-2xl sm:text-3xl font-bold leading-tight" : "text-lg sm:text-xl font-semibold"
                      } text-foreground tracking-tight`}>
                      {post.title}
                    </h2>
                    <p className={`${isLarge ? "text-sm sm:text-base text-foreground/85" : "text-xs sm:text-sm text-foreground/80"
                      } font-normal line-clamp-3 leading-relaxed tracking-normal font-sans`}>
                      {post.description}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="relative z-10 pt-4 border-t border-foreground/10 flex items-center justify-between text-[10px] font-mono text-foreground/60 tracking-wider">
                    <span className="uppercase">{post.date}</span>
                    <span className="font-bold">{post.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        ) : (
          <div className="py-24 text-center border border-dashed border-border/10 rounded-2xl">
            <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest">No_Blogs_Match_Search</p>
          </div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 pt-8 border-t border-border/10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2.5 bg-foreground/[0.02] border border-border/10 disabled:opacity-20 hover:bg-foreground/[0.04] rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-[0.2em]">
            Page {currentPage} _of_ {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2.5 bg-foreground/[0.02] border border-border/10 disabled:opacity-20 hover:bg-foreground/[0.04] rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
