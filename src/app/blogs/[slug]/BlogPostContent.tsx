"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Mermaid from "@/components/Mermaid";
import { useTheme } from "next-themes";
import { Tweet } from "react-tweet";
import Script from "next/script";
import Link from "next/link";
import AudioComparisonPlayer from "@/components/AudioComparisonPlayer";
import BlogAudioPlayer, { extractSpeechBlocks } from "@/components/BlogAudioPlayer";
import FluidMeshHeader from "@/components/FluidMeshHeader";
import "./hljs-theme.css";

interface BlogPostContentProps {
  content: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  categories: string[];
  slug?: string;
  seriesName?: string;
  seriesPosts?: { slug: string; title: string; part?: number }[];
  headerImage?: string;
  headerImageCaption?: string;
}

export default function BlogPostContent({
  content,
  title,
  description,
  date,
  readTime,
  categories,
  slug = "",
  seriesName = "",
  seriesPosts = [],
  headerImage,
  headerImageCaption,
}: BlogPostContentProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);


  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize MathJax configuration if not already present.
      // Crucial: check if .typesetPromise is present to avoid overwriting a fully loaded MathJax instance.
      if (!(window as any).MathJax || typeof (window as any).MathJax.typesetPromise !== "function") {
        (window as any).MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
          },
          options: {
            enableMenu: false
          }
        };
      }
    }
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      const typeset = () => {
        if (
          typeof window !== "undefined" &&
          (window as any).MathJax &&
          typeof (window as any).MathJax.typesetPromise === "function"
        ) {
          try {
            if (typeof (window as any).MathJax.typesetClear === "function") {
              (window as any).MathJax.typesetClear();
            }
            (window as any).MathJax.typesetPromise();
          } catch (err) {
            console.error("MathJax typeset error:", err);
          }
        }
      };
      
      typeset();
      const timer = setTimeout(typeset, 500);
      return () => clearTimeout(timer);
    }
  }, [content, mounted, resolvedTheme]);

  // Helper to detect and render media
  const renderMedia = (text: string) => {
    const trimmed = text.trim();

    // YouTube Embed
    const ytMatch = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) {
      return (
        <div className="relative aspect-video w-full my-12 border border-border/20 overflow-hidden bg-foreground/[0.02]">
          <iframe
            src={`https://www.youtube.com/embed/${ytMatch[1]}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // Twitter/X Embed (URL or standalone ID)
    const twitterMatch = trimmed.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
    const tweetIdMatch = trimmed.match(/^\d{15,}$/);
    const tweetId = twitterMatch ? twitterMatch[1] : (tweetIdMatch ? tweetIdMatch[0] : null);

    if (tweetId) {
      return (
        <div 
          className="flex justify-center my-12 w-full tweet-container" 
          data-theme={mounted ? resolvedTheme : undefined}
        >
          <Tweet id={tweetId} />
        </div>
      );
    }

    return null;
  };

  const blocks = React.useMemo(() => extractSpeechBlocks(content), [content]);

  // Helper to extract text from react node children
  const getTextFromChildren = (children: any): string => {
    if (!children) return "";
    if (typeof children === "string") return children;
    if (typeof children === "number") return String(children);
    if (Array.isArray(children)) {
      return children.map(getTextFromChildren).join("");
    }
    if (children && typeof children === "object" && children.props) {
      return getTextFromChildren(children.props.children);
    }
    return "";
  };

  // Check if a block matches the current text chunk and return its index
  const getBlockIndex = (children: any): number => {
    const rawText = getTextFromChildren(children).trim();
    if (!rawText || rawText.length < 5) return -1;
    
    // Clean text the same way as speech blocks
    const cleanedText = rawText.replace(/[\*_~`]+/g, "").replace(/\s+/g, " ");
    
    return blocks.findIndex((block) => {
      const cleanBlock = block.replace(/[\*_~`]+/g, "").replace(/\s+/g, " ");
      return cleanBlock.includes(cleanedText) || cleanedText.includes(cleanBlock);
    });
  };

  const renderReadableBlock = (
    children: any,
    blockIdx: number,
    renderFn: (className: string, onClick?: (e: React.MouseEvent) => void) => React.ReactNode
  ) => {
    const isActive = blockIdx !== -1 && blockIdx === activeIndex && isAudioPlaying;
    
    const highlightClasses = isActive
      ? "bg-amber-500/[0.04] dark:bg-amber-400/[0.04] border-l-2 border-amber-500/85 pl-3 -ml-3 transition-all duration-300 rounded-r"
      : "transition-all duration-300 border-l-2 border-transparent";

    const hoverClasses = (blockIdx !== -1 && isAudioPlaying)
      ? "hover:bg-foreground/[0.01] cursor-pointer" 
      : "";

    const combinedClass = `${highlightClasses} ${hoverClasses}`.trim();

    const handleClick = (blockIdx !== -1 && isAudioPlaying) ? (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("select") || 
        target.closest("input") || 
        target.closest("textarea")
      ) {
        return;
      }
      setActiveIndex(blockIdx);
    } : undefined;

    return renderFn(combinedClass, handleClick);
  };

  return (
    <>
      <Script id="mathjax-config" strategy="afterInteractive">
        {`
          if (!window.MathJax || typeof window.MathJax.typesetPromise !== 'function') {
            window.MathJax = {
              tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
              },
              options: {
                enableMenu: false
              }
            };
          }
        `}
      </Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        id="MathJax-script"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).MathJax) {
            try {
              (window as any).MathJax.typesetPromise();
            } catch (err) {
              console.error("MathJax onLoad typeset error:", err);
            }
          }
        }}
      />
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-[1.75rem] sm:text-[2.4rem] font-bold tracking-tight leading-tight text-foreground">
            {title}
          </h1>
          <p className="text-[15px] text-foreground/70 leading-relaxed max-w-xl">
            {description}
          </p>
        </header>

        {/* Metadata Grid */}
        <div className="grid grid-cols-4 gap-2 py-4 border-y border-border/60 divide-x divide-border/40 [&>div]:px-3 [&>div:first-child]:pl-0 [&>div:last-child]:pr-0">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-foreground/45 block">Published</span>
            <time dateTime={new Date(date).toISOString()} className="text-sm text-foreground/85 font-medium truncate block">
              {date}
            </time>
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-foreground/45 block">Read Time</span>
            <span className="text-sm text-foreground/85 font-medium truncate block">{readTime}</span>
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-foreground/45 block">Categories</span>
            <span className="text-sm text-foreground/85 font-medium truncate block" title={categories.join(", ")}>
              {categories.join(", ")}
            </span>
          </div>
          <div className="space-y-1 min-w-0 relative">
            <span className="text-[11px] uppercase tracking-wider text-foreground/35 block">Listen</span>
            <BlogAudioPlayer
              content={content}
              title={title}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              onPlayingStateChange={setIsAudioPlaying}
            />
          </div>
        </div>

        {/* Header Image */}
        <div className="w-full my-6 overflow-hidden rounded-lg border border-border/20 bg-foreground/[0.01]">
          {headerImage ? (
            <img
              src={headerImage}
              alt={headerImageCaption || title}
              className="w-full h-auto object-cover aspect-video"
            />
          ) : (
            <FluidMeshHeader title={title} />
          )}
          <div className="text-center text-sm text-foreground/70 py-3.5 px-6 border-t border-border/10 leading-relaxed">
            {headerImageCaption || description}
          </div>
        </div>

        {/* Series Index UI */}
        {seriesPosts.length > 1 && (
          <div className="border-l-2 border-accent/30 pl-4 py-1.5 space-y-2.5 my-8">
            <span className="text-xs uppercase tracking-wider text-accent font-bold block">
              Series: {seriesName}
            </span>
            <ol className="list-none space-y-2 pl-0">
              {seriesPosts.map((sp) => {
                const isCurrent = sp.slug === slug;
                return (
                  <li key={sp.slug} className="text-sm flex items-baseline gap-2 leading-relaxed">
                    <span className={`text-xs uppercase font-bold tracking-wide w-16 shrink-0 block ${isCurrent ? 'text-accent' : 'text-foreground/40'}`}>
                      {sp.part ? `Part ${sp.part}` : '•'}
                    </span>
                    {isCurrent ? (
                      <span className="text-foreground font-semibold flex-1">{sp.title}</span>
                    ) : (
                      <Link href={`/blogs/${sp.slug}`} className="text-foreground/60 hover:text-accent hover:underline transition-all flex-1">
                        {sp.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        <div className="w-full max-w-full overflow-hidden font-sans">
          <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            pre({ children, ...props }: any) {
              const codeChild = React.Children.toArray(children).find(
                (child: any) =>
                  child &&
                  typeof child === "object" &&
                  "props" in child &&
                  (child.type === "code" || child.props?.node?.tagName === "code")
              ) as any;

              if (codeChild) {
                const className = codeChild.props?.className || "";
                const codeContent = String(codeChild.props?.children || "").replace(/\n$/, "");
                const match = /language-(\w+)/.exec(className);
                const language = match ? match[1] : "";

                if (language === "mermaid") {
                  return <Mermaid chart={codeContent} />;
                }

                return (
                  <div className="relative group my-8 w-full max-w-full overflow-hidden rounded-xl border border-border shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
                    {/* Code Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#eef1f4] dark:bg-[#151a20] border-b border-border w-full">
                      <span className="text-xs text-foreground/55 uppercase tracking-wide font-medium">
                        {language || "code"}
                      </span>
                      <button
                        onClick={(e) => {
                          navigator.clipboard.writeText(codeContent);
                          const btn = e.currentTarget;
                          btn.innerText = "Copied ✓";
                          setTimeout(() => { btn.innerText = "Copy ⎘"; }, 2000);
                        }}
                        className="text-xs text-foreground/55 hover:text-accent transition-colors cursor-pointer"
                      >
                        Copy ⎘
                      </button>
                    </div>
                    {/* Code Block */}
                    <div className="overflow-hidden w-full max-w-full bg-[#f7f9fa] dark:bg-[#101318]">
                      <pre className="!m-0 !rounded-none overflow-x-auto max-w-full w-full !bg-transparent px-4 py-4" {...props}>
                        <code className={`${className} text-[13px] [font-family:var(--font-geist-mono)]`}>
                          {codeChild.props?.children}
                        </code>
                      </pre>
                    </div>
                  </div>
                );
              }

              return <pre className="text-[13px] [font-family:var(--font-geist-mono)] px-4 py-4" {...props}>{children}</pre>;
            },
            code({ className, children, ...props }: any) {
              const isInline = !className || !className.includes("language-");
              return (
                <code 
                  className={`${className || ""} ${isInline ? "[font-family:var(--font-geist-mono)] text-[13px] bg-accent/5 px-1.5 py-0.5 rounded text-accent font-medium" : ""}`} 
                  {...props}
                >
                  {children}
                </code>
              );
            },
            "audio-comparison": ({ 
              original, 
              originaltitle, 
              originaldesc, 
              compressed, 
              compressedtitle, 
              compresseddesc,
              fidelity
            }: any) => {
              return (
                <AudioComparisonPlayer
                  original={original}
                  originalTitle={originaltitle}
                  originalDesc={originaldesc}
                  compressed={compressed}
                  compressedTitle={compressedtitle}
                  compressedDesc={compresseddesc}
                  fidelity={fidelity}
                />
              );
            },
          // Custom paragraph renderer
          p: ({ children }: any) => {
            // Standardize children to an array
            const childrenArray = React.Children.toArray(children);

            // If it is our custom audio-comparison component, render it directly without a <p> tag wrapper
            const hasAudioComparison = childrenArray.some(
              (child: any) =>
                child &&
                typeof child === "object" &&
                (child.props?.node?.tagName === "audio-comparison" ||
                  child.type === "audio-comparison")
            );

            if (hasAudioComparison) {
              return <>{children}</>;
            }

            // Check for standalone media link
            if (childrenArray.length === 1) {
              const child: any = childrenArray[0];

              // Case 1: Raw string link
              if (typeof child === 'string') {
                const media = renderMedia(child);
                if (media) return media;
              }

              // Case 2: Link component (remark-gfm)
              if (child?.type === 'a' || (child?.props?.node?.tagName === 'a')) {
                const href = child.props?.href;
                if (typeof href === 'string') {
                  const media = renderMedia(href);
                  // Only replace if the link text is the same as the URL (standalone)
                  if (media) return media;
                }
              }
            }

            const blockIdx = getBlockIndex(children);
            return renderReadableBlock(children, blockIdx, (extraClass, onClick) => (
              <p 
                onClick={onClick}
                className={`mb-4 text-[15px] leading-relaxed text-foreground/90 ${extraClass}`.trim()}
              >
                {children}
              </p>
            ));
          },
          a: ({ href, children }: any) => {
            // Never return a DIV here to avoid "div in p" errors
            // Standalone links are already handled by the P renderer above
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent border-b border-accent/20 hover:border-accent transition-colors font-sans font-medium"
              >
                {children}
              </a>
            );
          },
          h1: ({ children }: any) => {
            const blockIdx = getBlockIndex(children);
            return renderReadableBlock(children, blockIdx, (extraClass, onClick) => (
              <h1 
                onClick={onClick}
                className={`text-xl font-bold text-foreground mb-4 mt-6 pt-2 font-sans ${extraClass}`.trim()}
              >
                {children}
              </h1>
            ));
          },
          h2: ({ children }: any) => {
            const blockIdx = getBlockIndex(children);
            return renderReadableBlock(children, blockIdx, (extraClass, onClick) => (
              <h2 
                onClick={onClick}
                className={`text-sm uppercase tracking-wider text-accent font-semibold mt-8 mb-2 ${extraClass}`.trim()}
              >
                {children}
              </h2>
            ));
          },
          h3: ({ children }: any) => {
            const blockIdx = getBlockIndex(children);
            return renderReadableBlock(children, blockIdx, (extraClass, onClick) => (
              <h3 
                onClick={onClick}
                className={`text-base font-semibold text-foreground mt-5 mb-2 ${extraClass}`.trim()}
              >
                {children}
              </h3>
            ));
          },
          h4: ({ children }: any) => {
            const blockIdx = getBlockIndex(children);
            return renderReadableBlock(children, blockIdx, (extraClass, onClick) => (
              <h4 
                onClick={onClick}
                className={`text-sm font-semibold text-foreground/85 mt-4 mb-1 ${extraClass}`.trim()}
              >
                {children}
              </h4>
            ));
          },
          ul: ({ children }: any) => <ul className="list-none space-y-2 my-4 pl-0 font-sans">{children}</ul>,
          ol: ({ children }: any) => <ol className="list-decimal space-y-2 my-4 pl-6 font-sans">{children}</ol>,
          li: ({ children }: any) => (
            <li className="flex items-start gap-2 min-w-0 w-full text-[15px] leading-relaxed text-foreground/90">
              <span className="text-xs text-accent/60 mt-1">•</span>
              <span className="min-w-0 flex-1 break-words">{children}</span>
            </li>
          ),
          blockquote: ({ children }: any) => {
            const blockIdx = getBlockIndex(children);
            return renderReadableBlock(children, blockIdx, (extraClass, onClick) => (
              <blockquote 
                onClick={onClick}
                className={`border-l-2 border-accent/40 pl-4 my-4 italic text-foreground/80 text-[15px] leading-relaxed ${extraClass}`.trim()}
              >
                {children}
              </blockquote>
            ));
          },
          table: ({ children }: any) => (
            <div className="my-12 w-full overflow-x-auto border border-border/10">
              <table className="min-w-full w-max border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: any) => <thead className="bg-foreground/[0.03] border-b border-border/20">{children}</thead>,
          th: ({ children }: any) => (
            <th className="px-6 py-4 border border-border/10 text-xs uppercase tracking-wide text-foreground/70 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }: any) => (
            <td className="px-6 py-4 border border-border/10 text-foreground text-sm font-normal">
              {children}
            </td>
          ),
        } as any}
      >
        {content}
      </ReactMarkdown>
        </div>
      </div>
    </>
);
}
