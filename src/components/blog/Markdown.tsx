// Renders a post's Markdown on the server: GitHub-flavoured Markdown, KaTeX math, highlighted
// code, plus the two interactive pieces the posts use (mermaid diagrams and the
// <audio-comparison> player), which hydrate on the client.

import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { AudioCompare } from "@/components/blog/AudioCompare";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { Mermaid } from "@/components/blog/Mermaid";
import { slugify } from "@/lib/slug";

type HastNode = { type: string; value?: string; tagName?: string; properties?: Record<string, unknown>; children?: HastNode[] };

const text = (n?: HastNode): string => (n?.type === "text" ? (n.value ?? "") : (n?.children ?? []).map(text).join(""));

const components = {
  // Section headings get ids matching the post's section index (lib/posts.ts).
  h2({ node, children }) {
    return <h2 id={slugify(text(node as HastNode | undefined))}>{children}</h2>;
  },
  pre({ node, children }) {
    const code = (node as HastNode | undefined)?.children?.find((c) => c.tagName === "code");
    const classes = (code?.properties?.className as string[] | undefined) ?? [];
    const language = classes.find((c) => c.startsWith("language-"))?.slice("language-".length);
    const raw = text(code).replace(/\n$/, "");
    if (language === "mermaid") return <Mermaid chart={raw} />;
    return (
      <CodeBlock language={language} raw={raw}>
        {children}
      </CodeBlock>
    );
  },
  a({ href = "", children }) {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  table({ children }) {
    return (
      <div className="post-table">
        <table>{children}</table>
      </div>
    );
  },
  // A lone custom element still arrives wrapped in <p>; unwrap it so the player isn't inside a paragraph.
  p({ node, children }) {
    const only = (node as HastNode | undefined)?.children?.filter((c) => !(c.type === "text" && !c.value?.trim()));
    if (only?.length === 1 && only[0].tagName === "audio-comparison") return <>{children}</>;
    return <p>{children}</p>;
  },
  // HTML attribute names arrive lowercased from the parser.
  "audio-comparison"({ node }: { node?: HastNode }) {
    const p = (node?.properties ?? {}) as Record<string, string>;
    return (
      <AudioCompare
        a={{ src: p.original, title: p.originaltitle ?? "Original", desc: p.originaldesc ?? "" }}
        b={{ src: p.compressed, title: p.compressedtitle ?? "Compressed", desc: p.compresseddesc ?? "" }}
      />
    );
  },
} as Components;

export function Markdown({ source }: { source: string }) {
  return (
    <div className="post-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { plainText: ["mermaid", "txt", "text"] }]]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
