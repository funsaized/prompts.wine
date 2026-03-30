---
title: "Official MCP Servers Repository"
source: "https://github.com/modelcontextprotocol/servers"
category: "reference"
tags:
  - "MCP"
  - "servers"
  - "reference-implementation"
  - "SDKs"
  - "community"
---

### Overview

This repository is a collection of reference implementations for the Model Context Protocol (MCP), as well as references to community-built servers and additional resources.

**Important**: For a list of MCP servers, browse published servers on [the MCP Registry](https://registry.modelcontextprotocol.io/). This repository is dedicated to housing the small number of reference servers maintained by the MCP steering group.

**Warning**: The servers in this repository are intended as reference implementations to demonstrate MCP features and SDK usage. They are meant to serve as educational examples, not as production-ready solutions.

### Official SDKs

The servers are implemented with MCP SDKs in multiple languages:

- **C# MCP SDK** - modelcontextprotocol/csharp-sdk
- **Go MCP SDK** - modelcontextprotocol/go-sdk
- **Java MCP SDK** - modelcontextprotocol/java-sdk
- **Kotlin MCP SDK** - modelcontextprotocol/kotlin-sdk
- **PHP MCP SDK** - modelcontextprotocol/php-sdk
- **Python MCP SDK** - modelcontextprotocol/python-sdk
- **Ruby MCP SDK** - modelcontextprotocol/ruby-sdk
- **Rust MCP SDK** - modelcontextprotocol/rust-sdk
- **Swift MCP SDK** - modelcontextprotocol/swift-sdk
- **TypeScript MCP SDK** - modelcontextprotocol/typescript-sdk

### Reference Servers

These servers demonstrate MCP features and official SDKs:

- **Everything** (`src/everything`) - Reference/test server with prompts, resources, and tools
- **Fetch** (`src/fetch`) - Web content fetching and conversion for efficient LLM usage
- **Filesystem** (`src/filesystem`) - Secure file operations with configurable access controls
- **Git** (`src/git`) - Tools to read, search, and manipulate Git repositories
- **Memory** (`src/memory`) - Knowledge graph-based persistent memory system
- **Sequential Thinking** (`src/sequentialthinking`) - Dynamic and reflective problem-solving through thought sequences
- **Time** (`src/time`) - Time and timezone conversion capabilities

### Archived Servers

The following reference servers are now archived:
- AWS KB Retrieval - Retrieval from AWS Knowledge Base using Bedrock Agent Runtime
- Brave Search - Web and local search using Brave's Search API
- EverArt - AI image generation using various models
- GitHub - Repository management, file operations, and GitHub API integration
- GitLab - GitLab API, enabling project management
- Google Drive - File access and search capabilities for Google Drive
- Google Maps - Location services, directions, and place details
- PostgreSQL - Read-only database access with schema inspection
- Puppeteer - Browser automation and web scraping
- Redis - Interact with Redis key-value stores
- Sentry - Retrieving and analyzing issues from Sentry.io
- Slack - Channel management and messaging capabilities
- SQLite - Database interaction and business intelligence capabilities

### Third-Party Official Integrations

The repository lists official integrations maintained by companies building production-ready MCP servers. These include servers for:
- UI component generation (21st.dev Magic)
- Slides/PPT generation (2slides)
- SaaS integrations (Paragon ActionKit)
- Payments and invoicing (Adfin)
- AI observability (AgentOps)
- Web data extraction (AgentQL)
- Database integrations (various cloud providers)
- Financial market data (Alpaca, AlphaVantage)
- Cloud infrastructure management (Alibaba Cloud, Aiven, AWS)
- Search and search (Algolia)
- And many more...
