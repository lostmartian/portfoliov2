// Videos from youtube.com/@sahilgangurdetech, grouped by series. Kept as data (YouTube's RSS
// feed is unreliable) with the upload date and length each video page reports, which
// VideoObject structured data needs. Add new uploads to the top of their series.

export type Video = { id: string; title: string; description: string; date: string; seconds: number };

export const series: { name: string; blurb: string; videos: Video[] }[] = [
  {
    name: "Retrieval",
    blurb: "How search really works, from scratch: the machine behind every search box and every chatbot that answers from your documents.",
    videos: [
      {
        id: "P66zWHd0Amo",
        title: "The Inverted Index: How Search Engines Find Anything in Milliseconds",
        description: "Search engines don't read your documents when you search. They read a few short lists from an inverted index, built here from scratch with real numbers.",
        date: "2026-10-29T06:00:02-07:00",
        seconds: 906,
      },
      {
        id: "MQx_bS60dS0",
        title: "Tokenization, Stop Words, Stemming and Lemmatization",
        description: "Why the simplest search misses half the good answers, and how every search engine fixes words before it stores them.",
        date: "2026-10-29T05:50:13-07:00",
        seconds: 870,
      },
      {
        id: "W0bFw025P68",
        title: "MRR and nDCG Explained: Ranking Metrics",
        description: "Two searches find the same good results but one buries the answer at rank four. MRR and nDCG are the numbers that notice.",
        date: "2026-10-27T06:09:36-07:00",
        seconds: 361,
      },
      {
        id: "io0ZVfC86nM",
        title: "What Makes a Search Result Good? Precision vs Recall",
        description: "How do you know if a search is any good? The first video of a series on retrieval and vector search.",
        date: "2026-10-27T05:39:28-07:00",
        seconds: 423,
      },
    ],
  },
  {
    name: "LLM internals",
    blurb: "How large language models actually run, from the GPU up: attention, memory and the tricks that make long context affordable.",
    videos: [
      {
        id: "si_thYJnd30",
        title: "MLA Explained: How DeepSeek Shrinks the KV Cache 57×",
        description: "A 128K-token conversation with DeepSeek-V3 would need about 488 GB with standard attention. It needs about 8.6 GB. A full deep dive into multi-head latent attention.",
        date: "2026-10-23T07:22:35-07:00",
        seconds: 2554,
      },
      {
        id: "uOsFsDnCAWE",
        title: "RoPE Explained: How LLMs Know Word Order (and Stretch to 128K)",
        description: "Rotary position embeddings, and how Position Interpolation lets a model trained on 2,048 tokens read 32,768.",
        date: "2026-10-21T08:40:26-07:00",
        seconds: 2950,
      },
      {
        id: "g-owfWGKvIU",
        title: "MHA vs GQA vs MQA: Attention Heads, Explained Simply",
        description: "Your GPU has 80 GB of memory and the model only needs 14 GB. So why can it serve only about 30 people at once?",
        date: "2026-10-15T02:12:34-07:00",
        seconds: 1687,
      },
      {
        id: "URxH7cpu0NI",
        title: "Why LLMs Don't Re-Read Your Prompt for Every Word (KV Cache Explained)",
        description: "The KV cache: the simple trick that stops an LLM redoing the same math for every word, and one of the biggest costs in serving it.",
        date: "2026-10-12T09:09:45-07:00",
        seconds: 2872,
      },
      {
        id: "kBvLpoYivDs",
        title: "How Attention Actually Works: Math, GPU Memory, and Systems",
        description: "A first-principles breakdown of attention from \"Attention Is All You Need\": the linear algebra, GPU execution and real production bottlenecks.",
        date: "2026-10-06T07:57:16-07:00",
        seconds: 3220,
      },
    ],
  },
  {
    name: "Breakdowns",
    blurb: "System design and security stories, and new AI releases checked claim by claim.",
    videos: [
      {
        id: "o4YGWgzAOW4",
        title: "Gemini 4 Carbon: Google's New #1 AI Model? Every Claim Fact-Checked",
        description: "Google's newest frontier model, and every claim in its announcement checked against the benchmarks.",
        date: "2026-10-28T10:44:16-07:00",
        seconds: 507,
      },
      {
        id: "0HZNDJiswKc",
        title: "The Private Key Was 4: How eMudhra Broke Web Trust",
        description: "Eight certificate authorities' private keys were supposed to be secret 116-digit numbers. One of them was 4. What happened and why it matters.",
        date: "2026-10-25T02:22:42-07:00",
        seconds: 620,
      },
      {
        id: "E9xgymY8JJc",
        title: "How REA Works: AI Agents That Reverse Engineer Anything",
        description: "An AI agent recovered the C function behind a 1998 game's sound panning, verified on 3,205 inputs. A system-design breakdown.",
        date: "2026-10-17T04:46:19-07:00",
        seconds: 1181,
      },
    ],
  },
  {
    name: "Launches",
    blurb: "Things I've built, shown in under a minute.",
    videos: [
      {
        id: "L722FxVfQTo",
        title: "AgentDiff: Catch Silent AI Agent Regressions Before They Ship",
        description: "Your agent tripled its token bill. Every test stayed green. The launch of AgentDiff.",
        date: "2026-09-16T08:38:12-07:00",
        seconds: 42,
      },
    ],
  },
];

export const videos = series.flatMap((s) => s.videos);

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const duration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const isoDuration = (s: number) => `PT${Math.floor(s / 60)}M${s % 60}S`;
