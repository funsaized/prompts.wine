---
title: "Claude Code System Prompts Catalog"
source: "https://github.com/Piebald-AI/claude-code-system-prompts"
category: "system-prompts"
tags: [claude-code, anthropic, leaked-prompt, model-tiers, configuration]
---

# Claude Code System Prompts Catalog

A curated collection of Claude Code system prompts for different model tiers (opus, sonnet, haiku) and configurations. This repository provides insight into how Anthropic configures different capability tiers within Claude Code.

## Repository Structure

The repository contains separate system prompt configurations for different Claude Code model variants:

- **claude-code-opus.md** — System prompt for Claude Opus 4 model tier (highest capability)
- **claude-code-sonnet.md** — System prompt for Sonnet tier (balanced capability/speed)
- **claude-code-haiku.md** — System prompt for Haiku tier (fastest, lower context)

Each variant has tailored instructions reflecting the model's capabilities and intended use case. The prompts differ in complexity of reasoning guidance, tool access levels, and context management approach.

## Key Observations

The existence of tiered system prompts demonstrates that the same base model (Claude) can be configured differently for different market segments. Haiku-tier prompts are likely shorter and more direct, while Opus-tier prompts can include more sophisticated multi-step reasoning instructions.

The prompts are reverse-engineered from actual Claude Code behavior, not officially published by Anthropic. They represent community observations of how Claude Code behaves under different model configurations.
