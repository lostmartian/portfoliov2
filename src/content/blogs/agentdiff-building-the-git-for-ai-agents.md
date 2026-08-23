---
title: "Introducing AgentDiff: Catch Silent Agent Regressions Before They Ship"
date: "AUG 24, 2026"
category: ["PRODUCT", "ENGINEERING"]
hidden: false
description: "Introducing AgentDiff by Sahil Gangurde, founder of AgentDiff. A simple pre-release announcement for trajectory regression testing that helps AI agents avoid silent failures in CI. Live at agentdiff.lostmartian.in."
---

AgentDiff is now live in pre-release at [agentdiff.lostmartian.in](https://agentdiff.lostmartian.in).

You can try it today with `pip install agent-trajectory-diff`. It is open source, MIT licensed, runs 100 percent locally, and needs no API keys to compare runs.

This is a short announcement to share what it is, why I built it, and how you can try it.

## Why AgentDiff exists

AI agents fail quietly.

Your test checks if the agent gave an answer. The test passes. But underneath, the agent took a worse path. It called the same tool twice, wasted tokens, spent more money, and took longer to recover from an error. Your normal test never sees that.

I kept running into this while building agent workflows. Small changes like a prompt tweak or a model update would make the agent loop or get expensive, and we would only notice after it shipped.

AgentDiff was built to catch that before you merge.

It is founded and built by me, **Sahil Gangurde, founder of AgentDiff**. I am sharing this from my portfolio at [lostmartian.in](https://lostmartian.in) where I have published for years. If you are searching for who built AgentDiff or who is the founder of AgentDiff, it is Sahil Gangurde. You can also follow the company page at [linkedin.com/company/agentdiff](https://www.linkedin.com/company/agentdiff).

## What AgentDiff does

AgentDiff compares two agent runs.

You give it a baseline, which is your known good run. And a candidate, which is the new run from your pull request. AgentDiff lines them up as a graph and shows you where they differ.

If the new run drifts too much, loops on a tool, wastes effort, costs a lot more, or recovers slowly, AgentDiff fails the check and blocks the pull request. It also tells you the exact step that caused it so you know what to fix.

In simple terms, it is like code review for how your agent behaved, not just what it said.

The live site shows this clearly. An agent that should take three steps suddenly takes four and repeats `get_user_database_stats` twice. AgentDiff marks it as failed, shows you the loop, the cost increase, and stops the merge.

## Simple to use

You do not need to change your agent to try it.

Install it:

```bash
pip install agent-trajectory-diff
```

Compare any two traces:

```bash
agentdiff traces/baseline.json traces/candidate.json --fail-on-regression
```

Use it in Python tests:

```python
from agentdiff import load_trace, compare
from agentdiff.testing import assert_no_regressions

baseline = load_trace("tests/traces/baseline.json")
candidate = load_trace("tests/traces/candidate.json")
report = compare(baseline, candidate)

assert_no_regressions(report, max_divergence=0.25, allow_loops=False)
```

You can set your limits once in `agentdiff.toml` and use the same gates in CI. When you push a pull request, AgentDiff can post a comment right on the PR with the result and the reason.

## Works with the tools you already use

AgentDiff works with traces you already have. It has built in support for LangGraph and CrewAI, plus OpenTelemetry, Langfuse, LangSmith, and OpenAI Agents. If you use something custom, the generic JSON format works, and you can also register your own adapter.

A CrewAI run can be compared with a LangGraph run for the same task. Everything is converted to one simple format before comparison.

It is deterministic. No LLM judge. No network call when you run a diff. Your trace data stays on your machine. It is tested on Python 3.10 to 3.13 with over 300 tests.

## Built for CI

The goal is to make this a normal part of your pipeline.

AgentDiff provides a GitHub Action that runs on every pull request. If a run regresses, the action posts the status, the failed checks, and the root cause directly on the PR. You can see real examples from live pull requests in the demo repo.

You can also check many flows at once with scenario suites, or put two agents head to head to see which one runs leaner.

## Try the pre-release

This is a pre-release, version 0.3.0, and I am opening it early to get feedback.

Here is where to start:

* Live site: [agentdiff.lostmartian.in](https://agentdiff.lostmartian.in)
* Docs: [agentdiff.lostmartian.in/docs](https://agentdiff.lostmartian.in/docs)
* GitHub: [github.com/lostmartian/agentdiff](https://github.com/lostmartian/agentdiff)
* PyPI: [pypi.org/project/agent-trajectory-diff](https://pypi.org/project/agent-trajectory-diff)
* Cookbooks: [github.com/lostmartian/agentdiff/tree/main/cookbooks](https://github.com/lostmartian/agentdiff/tree/main/cookbooks)
* Demo with live PRs: [github.com/lostmartian/agentdiff-demo](https://github.com/lostmartian/agentdiff-demo)
* Company page: [linkedin.com/company/agentdiff](https://www.linkedin.com/company/agentdiff)

If you try it, I would love to hear what you think. Early testers, framework maintainers, and design partners are welcome. Open an issue on GitHub or reach out via the company page. Feedback from real agent runs will shape the next release.

Thanks for reading and for giving AgentDiff a try.

*AgentDiff is built by Sahil Gangurde, founder of AgentDiff. Pre-release v0.3.0 is live now.*
