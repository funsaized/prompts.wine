---
title: "Fix GitHub Issue"
description: "Claude Code slash command that analyzes a GitHub issue, implements a fix, runs tests, and creates a PR."
category: "commands"
tags: [commands, claude-code, github, automation]
---

Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

1. Use `gh issue view` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes to fix the issue
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.
