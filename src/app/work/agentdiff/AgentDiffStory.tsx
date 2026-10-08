import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { BackToWork, NextCase } from "@/components/case/CaseNav";
import { AgentDiffCover } from "@/components/case/Covers";
import CopyCommand from "@/components/case/agentdiff/CopyCommand";
import { AdaptersScene, AlignScene, DeterministicScene, GateScene, PassedScene } from "@/components/case/agentdiff/AgentDiffScenes";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const mono = { fontFamily: "var(--font-geist-mono)" };

const LINKS = [
  ["agentdiff.app", "https://agentdiff.app"],
  ["Docs", "https://agentdiff.app/docs"],
  ["GitHub", "https://github.com/lostmartian/agentdiff"],
  ["PyPI", "https://pypi.org/project/agent-trajectory-diff"],
  ["Demo with live PRs", "https://github.com/lostmartian/agentdiff-demo"],
];

/** AgentDiff, told as a code review of an agent's behaviour. */
export default function AgentDiffStory() {
  return (
    <article>
      <header className="min-h-[calc(100svh-72px)] flex flex-col pt-10 pb-12">
        <BackToWork className="rise" />
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
          <div className="lg:col-span-6 space-y-8">
            <p className="rise text-[13px] text-muted" style={{ ...d(60), ...mono }}>
              <span className="text-leaf">$</span> case <span className="deva text-accent">०३</span> · founder · Aug 2026 → present
            </p>
            <h1 className="rise text-[3.6rem] sm:text-7xl lg:text-[7rem] leading-[0.9]" style={d(120)}>
              Agent<span className="serif text-accent">Diff</span>
            </h1>
            <p className="rise font-display text-2xl sm:text-3xl leading-snug max-w-xl text-foreground/85" style={d(200)}>
              Catch the agent that gets the right answer the wrong way, before it merges.
            </p>
          </div>
          <div className="rise lg:col-span-6" style={d(260)}>
            <AgentDiffCover bare className="block w-full h-auto border border-border" />
          </div>
        </div>
        <dl className="rise grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 border-t border-foreground/70 pt-5 text-[15px]" style={d(340)}>
          {[
            ["Product", <a key="p" href="https://agentdiff.app" {...ext} className="ink-link">agentdiff.app</a>],
            ["My role", "Founder, sole engineer"],
            ["Status", "Pre-release · MIT"],
            ["Built with", "Python · GitHub Actions"],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="label mb-1.5">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 label flex items-center gap-3 self-center">
          <span className="block h-8 w-px bg-foreground/40 animate-pulse" aria-hidden="true" />
          Scroll to review the run
        </p>
      </header>

      <PassedScene />
      <AlignScene />
      <GateScene />
      <AdaptersScene />
      <DeterministicScene />

      <section className="py-40 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-2">
          <p className="deva text-accent text-3xl leading-none">वापरा</p>
          <p className="label mt-2">Try it</p>
        </div>
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-5xl sm:text-6xl leading-[1]">
            Two commands, <span className="serif text-accent">no API keys.</span>
          </h2>
          <div className="space-y-3">
            <CopyCommand cmd="pip install agent-trajectory-diff" />
            <CopyCommand cmd="agentdiff traces/baseline.json traces/candidate.json --fail-on-regression" />
          </div>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Early testers, framework maintainers and design partners are welcome. Feedback from real agent runs shapes the
            next release.
          </p>
          <p className="flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
            {LINKS.map(([k, v]) => (
              <a key={k} href={v} {...ext} className="group inline-flex items-center gap-1">
                <span className="link-u">{k}</span>
                <ArrowUpRight className="nudge w-3.5 h-3.5" />
              </a>
            ))}
          </p>
        </div>
      </section>

      <NextCase current="agentdiff" />
    </article>
  );
}
