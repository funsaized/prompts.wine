---
title: "awesome-mcp-servers"
source: "https://github.com/punkpeye/awesome-mcp-servers"
category: "reference"
tags:
  - "awesome-list"
  - "MCP"
  - "servers"
  - "community"
  - "integrations"
---

A curated list of awesome Model Context Protocol (MCP) servers. MCP is an open protocol that enables AI models to securely interact with local and remote resources through standardized server implementations.

**What is MCP?**
MCP (Model Context Protocol) is an open protocol that enables AI models to securely interact with local and remote resources through standardized server implementations. This list focuses on production-ready and experimental MCP servers that extend AI capabilities through file access, database connections, API integrations, and other contextual services.

**Key Resources:**
- [glama.ai/mcp/servers](https://glama.ai/mcp/servers) — Web directory of MCP servers (synced with repo)
- [MCP Inspector](https://glama.ai/mcp/inspector) — Test servers interactively
- [The State of MCP in 2025](https://glama.ai/blog/2025-12-07-the-state-of-mcp-in-2025) — Comprehensive report
- [r/mcp Reddit](https://www.reddit.com/r/mcp/) — Community discussions
- [Discord Server](https://glama.ai/mcp/discord) — Real-time community

**Server Implementation Categories (30+ categories, hundreds of servers):**

- **Aggregators:** [1mcp/agent](https://github.com/1mcp-app/agent) — Unified MCP server aggregating multiple servers; [Aganium/agenium](https://github.com/Aganium/agenium) — Bridge any MCP server to agent:// network; [entire-vc/evc-spark-mcp](https://github.com/entire-vc/evc-spark-mcp) — Search 4500+ AI agents, skills, prompts, bundles

- **Browser Automation:** Servers for controlling Chrome/Firefox browsers, taking screenshots, scraping dynamic content

- **Coding Agents:** [steipete/claude-code-mcp](https://github.com/steipete/claude-code-mcp) — Run Claude Code as MCP server; [K-Dense-AI/claude-skills-mcp](https://github.com/K-Dense-AI/claude-skills-mcp) — Let every model use Claude Agent Skills

- **Cloud Platforms:** AWS, Azure, GCP helper servers for cloud resource management

- **Code Execution:** Sandboxed code execution environments for Python, JS, and other languages

- **Databases:** PostgreSQL, MySQL, SQLite, MongoDB, Redis connectors; [julien040/anyquery](https://github.com/julien040/anyquery) — Query 40+ apps with SQL

- **Data Science Tools:** ML experiment tracking, model evaluation, embedding management, RAG pipelines

- **Developer Tools:** Linters, formatters, git operations, CI/CD integrations

- **File Systems:** Secure file access, directory traversal, file content reading/writing

- **Knowledge & Memory:** [gzoonet/cortex](https://github.com/gzoonet/cortex) — Local-first knowledge graph; [glenngillen/mcpmcp-server](https://github.com/glenngillen/mcpmcp-server) — List of MCP servers for self-discovery

- **Search & Data Extraction:** Web search, data scraping, structured extraction

- **Security:** Vulnerability scanning, secret detection, code review

- **Social Media:** Integration with Twitter/X, LinkedIn, Reddit APIs

- **Version Control:** Git operations, GitHub/GitLab API integration

- **Custom/Enterprise:** Build your own MCP servers for internal tools

**Legend (server metadata):**
- 🎖️ — official implementation
- 🐍 — Python, 📇 — TypeScript, 🏎️ — Go, 🦀 — Rust, #️⃣ — C#, ☕ — Java
- ☁️ — Cloud Service, 🏠 — Local Service, 📟 — Embedded Systems
- 🍎 — macOS, 🪟 — Windows, 🐧 — Linux
