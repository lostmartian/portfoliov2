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
import AudioComparisonPlayer from "@/components/AudioComparisonPlayer";
import "highlight.js/styles/github-dark.css";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
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

  return (
    <>
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
      <div className={`prose ${mounted && resolvedTheme === 'dark' ? 'prose-invert' : ''} prose-zinc w-full max-w-full overflow-hidden prose-h1:font-serif prose-h2:font-serif prose-h3:font-serif prose-p:text-foreground/70 prose-p:leading-relaxed prose-p:text-lg`}>
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
                  <div className="relative group my-8 w-full max-w-full overflow-hidden">
                    {/* Code Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-foreground/[0.03] border border-border/20 border-b-0 rounded-t-lg w-full">
                      <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
                        {language || "code"}
                      </span>
                      <button
                        onClick={(e) => {
                          navigator.clipboard.writeText(codeContent);
                          const btn = e.currentTarget;
                          const originalText = btn.innerText;
                          btn.innerText = "COPIED_";
                          setTimeout(() => { btn.innerText = originalText; }, 2000);
                        }}
                        className="text-[10px] font-mono text-foreground/40 hover:text-foreground uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        COPY_
                      </button>
                    </div>
                    {/* Code Block */}
                    <div className="border border-border/20 rounded-b-lg overflow-hidden w-full max-w-full">
                      <pre className="!m-0 !rounded-none overflow-x-auto max-w-full w-full" {...props}>
                        <code className={className}>
                          {codeChild.props?.children}
                        </code>
                      </pre>
                    </div>
                  </div>
                );
              }

              return <pre {...props}>{children}</pre>;
            },
            code({ className, children, ...props }: any) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            "audio-comparison": ({ original, compressed }: any) => {
              return <AudioComparisonPlayer original={original} compressed={compressed} />;
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

            return <p className="mb-8">{children}</p>;
          },
          a: ({ href, children }: any) => {
            // Never return a DIV here to avoid "div in p" errors
            // Standalone links are already handled by the P renderer above
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground border-b border-foreground/20 hover:border-foreground transition-colors"
              >
                {children}
              </a>
            );
          },
          h1: ({ children }: any) => <h1 className="text-4xl sm:text-6xl font-serif text-foreground mb-12 tracking-tight leading-tight pt-8">{children}</h1>,
          h2: ({ children }: any) => <h2 className="text-2xl sm:text-4xl font-serif text-foreground mt-16 mb-8 tracking-tight">{children}</h2>,
          h3: ({ children }: any) => <h3 className="text-xl sm:text-2xl font-serif text-foreground mt-12 mb-6 tracking-tight">{children}</h3>,
          h4: ({ children }: any) => <h4 className="text-base sm:text-lg font-medium text-foreground mt-8 mb-4 tracking-tight">{children}</h4>,
          ul: ({ children }: any) => <ul className="list-none space-y-4 my-8 pl-0">{children}</ul>,
          li: ({ children }: any) => (
            <li className="flex items-start gap-4 min-w-0 w-full">
              <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full mt-2.5 flex-shrink-0" />
              <span className="min-w-0 flex-1 break-words">{children}</span>
            </li>
          ),
          blockquote: ({ children }: any) => (
            <blockquote className="border-l-2 border-border/40 pl-8 my-12 italic text-foreground/40 font-serif text-2xl leading-relaxed">
              {children}
            </blockquote>
          ),
          table: ({ children }: any) => (
            <div className="my-12 w-full overflow-x-auto border border-border/10">
              <table className="min-w-full w-max border-collapse text-left text-sm font-mono">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: any) => <thead className="bg-foreground/[0.03] border-b border-border/20">{children}</thead>,
          th: ({ children }: any) => (
            <th className="px-6 py-4 border border-border/10 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              {children}
            </th>
          ),
          td: ({ children }: any) => (
            <td className="px-6 py-4 border border-border/10 text-foreground/70">
              {children}
            </td>
          ),
        } as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  </>
);
}
