---
title: "How We Built Our Multi-Agent Research System"
source: "https://www.anthropic.com/engineering/multi-agent-research-system"
category: "workflows"
tags:
  - multi-agent
  - anthropic
  - research-system
  - orchestrator-worker
  - prompt-engineering
---

## Introduction

The journey of this multi-agent system from prototype to production taught us critical lessons about system architecture, tool design, and prompt engineering. A multi-agent system consists of multiple agents (LLMs autonomously using tools in a loop) working together. Our Research feature involves an agent that plans a research process based on user queries, and then uses tools to create parallel agents that search for information simultaneously.

## Benefits of Multi-Agent Systems

Research work involves open-ended problems where it's very difficult to predict the required steps in advance. You can't hardcode a fixed path for exploring complex topics, as the process is inherently dynamic and path-dependent. When people conduct research, they tend to continuously update their approach based on discoveries, following leads that emerge during investigation.

Multi-agent systems excel at:
- Flexibility to pivot or explore tangential connections
- Operating autonomously for many turns
- Parallel exploration of different aspects
- Compression of insights from vast information corpora

## Performance Metrics

Our internal evaluations show that multi-agent research systems excel especially for breadth-first queries that involve pursuing multiple independent directions simultaneously. We found that a multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet 4 subagents outperformed single-agent Claude Opus 4 by 90.2% on our internal research eval.

Three factors explained 95% of performance variance in the BrowseComp evaluation:
1. Token usage (80% of variance)
2. Number of tool calls
3. Model choice

Multi-agent systems use about 15x more tokens than chats. For economic viability, multi-agent systems require tasks where the value of the task is high enough to pay for the increased performance.

## Architecture Overview

Our Research system uses a multi-agent architecture with an orchestrator-worker pattern, where a lead agent coordinates the process while delegating to specialized subagents that operate in parallel.

**Workflow:**
1. User submits a query
2. Lead agent analyzes it and develops a strategy
3. Lead spawns specialized Subagents to explore different aspects in parallel
4. Each Subagent iteratively uses search tools to gather information
5. Subagents return findings to the LeadResearcher
6. LeadResearcher synthesizes results and decides if more research is needed
7. Results pass to CitationAgent for proper attribution
8. Final research results with citations returned to user

## Key Prompt Engineering Principles

**Think like your agents**: To iterate on prompts, you must understand their effects. Build simulations with exact prompts and tools, then watch agents work step-by-step.

**Teach the orchestrator how to delegate**: Each subagent needs an objective, an output format, guidance on tools/sources to use, and clear task boundaries. Without detailed task descriptions, agents duplicate work, leave gaps, or fail to find necessary information.

**Scale effort to query complexity**: Embed scaling rules in prompts. Simple fact-finding needs 1 agent with 3-10 tool calls. Direct comparisons need 2-4 subagents with 10-15 calls each. Complex research might use 10+ subagents.

**Tool design and selection are critical**: Bad tool descriptions can send agents down completely wrong paths. Each tool needs a distinct purpose and a clear description. We gave our agents explicit heuristics: examine all available tools first, match tool usage to user intent, search web for broad external exploration, prefer specialized tools over generic ones.

**Let agents improve themselves**: We created a tool-testing agent—when given a flawed MCP tool, it attempts to use the tool and then rewrites the tool description. This process resulted in a 40% decrease in task completion time for future agents.

**Start wide, then narrow down**: Search strategy should mirror expert human research: explore the landscape before drilling into specifics. Agents often default to overly long, specific queries that return few results.

**Parallel tool calling transforms speed**: We introduced two kinds of parallelization: (1) lead agent spins up 3-5 subagents in parallel; (2) subagents use 3+ tools in parallel. These changes cut research time by up to 90%.

## Effective Evaluation of Agents

**Start evaluating immediately with small samples**: Early agent development changes tend to have dramatic impacts. A prompt tweak might boost success rates from 30% to 80%. Start with a set of about 20 queries representing real usage patterns.

**LLM-as-judge evaluation scales when done well**: We used an LLM judge that evaluated outputs against criteria: factual accuracy, citation accuracy, completeness, source quality, and tool efficiency. A single LLM call with scores from 0.0-1.0 and a pass-fail grade was most consistent.

**Human evaluation catches what automation misses**: People testing agents find edge cases that evals miss. Human testers noticed early agents consistently chose SEO-optimized content farms over authoritative but less highly-ranked sources.

## Production Reliability Challenges

**Agents are stateful and errors compound**: We built systems that can resume from where agents were when errors occurred. We combine AI adaptability with deterministic safeguards like retry logic and regular checkpoints.

**Debugging benefits from new approaches**: Adding full production tracing let us diagnose why agents failed. We monitor agent decision patterns and interaction structures without monitoring conversation contents.

**Deployment needs careful coordination**: We use rainbow deployments to avoid disrupting running agents when deploying updates.

**Synchronous execution creates bottlenecks**: Currently lead agents execute subagents synchronously. Asynchronous execution would enable additional parallelism but adds challenges in result coordination, state consistency, and error propagation.

## Conclusion

Multi-agent research systems can operate reliably at scale with careful engineering, comprehensive testing, detail-oriented prompt and tool design, robust operational practices, and tight collaboration between research, product, and engineering teams who have a strong understanding of current agent capabilities.
