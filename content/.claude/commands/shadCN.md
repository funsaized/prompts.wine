---
title: "shadcn/ui Command"
description: "Claude Code slash command for using shadcn/ui components via the MCP server during planning and implementation."
category: "commands"
tags: [commands, claude-code, shadcn-ui, mcp]
---

shadCN Usage Rule
When asked to use shadcn components, use the MCP server.

Planning Rule
When asked to plan using anything related to shadcn:

- Use the MCP server during planning
- Apply components wherever components are applicable

Implementation Rule
When implementing:

- First call the demo tool to see how it is used
- Then implement it so that it is implemented correctly
- Also install the components. Don't write the files yourself.
