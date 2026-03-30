---
title: "Claude 4 System Prompt Analysis"
source: "https://simonwillison.net/2025/May/25/claude-4-system-prompt/"
category: "system-prompts"
tags: [claude, anthropic, leaked-prompt, web-search, prompt-injection]
---

# Claude 4 System Prompt Analysis

The full system prompt for Claude 4 (Sonnet 4) has been extracted and shared online, providing a detailed look at how Anthropic engineers their AI assistant's behavior.

## Key Features of the System Prompt

**1. Thinking Mode Configuration**
The system prompt includes interleaved thinking mode with a 16,000 token budget:
```
<thinking_mode>interleaved</thinking_mode>
<max_thinking_length>16000</max_thinking_length>
```
This enables extended chain-of-thought reasoning within the same response as tool results.

**2. Query Complexity Categories**
Claude 4 classifies queries into four categories with different tool-use strategies:
- **Never Search**: Stable knowledge, fundamental concepts (e.g., "help me code in language")
- **Do Not Search But Offer**: Slow-changing data where Claude knows the answer but offers a search
- **Single Search**: Factual queries needing current info (one tool call)
- **Research**: Complex queries needing 2-20 tool calls with structured research process

**3. Mandatory Citation Instructions**
When web search results are used, every specific claim must be wrapped in `<cite>` tags with document and sentence indices.

**4. Safety and Copyright Rules**
The prompt includes extensive mandatory copyright requirements: no reproducing content over 15 words, no song lyrics, no regurgitating copyrighted material. Harmful content searches are explicitly blocked.

**5. Artifact System**
Claude can create and reference artifacts for substantial code, analysis, and writing intended for use outside the conversation. Explicit browser storage restrictions (no localStorage/sessionStorage) are included.

**6. Election Information**
The prompt includes specific election information about the 2024 US Presidential election with the date it was inserted.

## How It Was Extracted

The prompt was extracted via a prompt injection attack — a technique where a user includes instructions in their query designed to cause the model to output its own system prompt. This is the same class of attack that has extracted prompts from ChatGPT, Gemini, and other assistants.
