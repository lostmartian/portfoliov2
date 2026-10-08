import type { Metadata } from "next";
import AgentDiffStory from "./AgentDiffStory";

const description =
  "AgentDiff by Sahil Gangurde: trajectory regression testing for AI agents. Compares a baseline and a candidate agent run, catches drift, tool loops, cost and recovery regressions, and blocks the pull request in CI.";

export const metadata: Metadata = {
  title: "AgentDiff — Trajectory Regression Testing for AI Agents | Sahil Gangurde",
  description,
  alternates: { canonical: "https://lostmartian.in/work/agentdiff" },
  keywords: ["AgentDiff", "Sahil Gangurde", "AI agent testing", "trajectory regression", "LLM evals", "CI for AI agents", "LangGraph", "CrewAI"],
  openGraph: {
    title: "AgentDiff | Sahil Gangurde",
    description,
    url: "https://lostmartian.in/work/agentdiff",
    siteName: "Sahil Gangurde Portfolio",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentDiff | Sahil Gangurde",
    description,
    creator: "@lost_martian_",
    site: "@lost_martian_",
  },
};

export default function AgentDiffPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AgentDiff",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    url: "https://agentdiff.app",
    license: "https://opensource.org/licenses/MIT",
    author: { "@type": "Person", name: "Sahil Gangurde", url: "https://lostmartian.in" },
    description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AgentDiffStory />
    </>
  );
}
