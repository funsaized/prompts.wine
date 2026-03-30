---
title: "Claude Code Best Practices (CLAUDE.md Reference)"
source: "https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/main/CLAUDE.md"
category: "system-prompts"
tags: [claude-code, CLAUDE.md, skills, subagents, configuration, best-practices]
---

# Claude Code Best Practices (CLAUDE.md Reference)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a best practices repository for Claude Code configuration, demonstrating patterns for skills, subagents, hooks, and commands. It serves as a reference implementation rather than an application codebase.

## Key Components

### Weather System (Example Workflow)
A demonstration of two distinct skill patterns via the **Command -> Agent -> Skill** architecture:
- `/weather-orchestrator` command (`.claude/commands/weather-orchestrator.md`): Entry point
- `weather-agent` agent (`.claude/agents/weather-agent.md`): Fetches temperature using its preloaded `weather-fetcher` skill
- `weather-fetcher` skill (`.claude/skills/weather-fetcher/SKILL.md`): Preloaded into agent
- `weather-svg-creator` skill (`.claude/skills/weather-svg-creator/SKILL.md`): Creates SVG weather card

Two skill patterns: agent skills (preloaded via `skills:` field) vs skills (invoked via `Skill` tool).

### Skill Definition Structure
Skills in `.claude/skills/<name>/SKILL.md` use YAML frontmatter:
- `name`: Display name and `/slash-command`
- `description`: When to invoke (recommended for auto-discovery)
- `argument-hint`: Autocomplete hint (e.g., `[issue-number]`)
- `disable-model-invocation`: Set `true` to prevent automatic invocation
- `user-invocable`: Set `false` to hide from `/` menu
- `allowed-tools`: Tools allowed without permission prompts when skill is active
- `model`: Model to use when skill is active
- `context`: Set to `fork` to run in isolated subagent context
- `hooks`: Lifecycle hooks scoped to this skill

### Subagent Definition Structure
Subagents in `.claude/agents/*.md` use YAML frontmatter:
- `name`: Subagent identifier
- `description`: When to invoke (use "PROACTIVELY" for auto-invocation)
- `tools`: Comma-separated allowlist of tools
- `model`: Model alias: `haiku`, `sonnet`, `opus`, or `inherit`
- `permissionMode`: Permission mode (e.g., `"acceptEdits"`, `"plan"`, `"bypassPermissions"`)
- `maxTurns`: Maximum agentic turns before the subagent stops
- `skills`: List of skill names to preload into agent context
- `mcpServers`: MCP servers for this subagent
- `memory`: Persistent memory scope — `user`, `project`, or `local`
- `background`: Set to `true` to always run as a background task
- `isolation`: Set to `"worktree"` to run in a temporary git worktree

### Configuration Hierarchy
1. **Managed** (`managed-settings.json` / MDM plist / Registry): Organization-enforced
2. Command line arguments: Single-session overrides
3. `.claude/settings.local.json`: Personal project settings (git-ignored)
4. `.claude/settings.json`: Team-shared settings
5. `~/.claude/settings.json`: Global personal defaults

## Workflow Best Practices

- Keep CLAUDE.md under 200 lines per file for reliable adherence
- Use commands for workflows instead of standalone agents
- Create feature-specific subagents with skills rather than general-purpose agents
- Perform manual `/compact` at ~50% context usage
- Start with plan mode for complex tasks
- Use human-gated task list workflow for multi-step tasks
