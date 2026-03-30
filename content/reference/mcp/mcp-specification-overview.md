---
title: "Model Context Protocol Specification Overview"
source: "https://modelcontextprotocol.io/specification/2025-11-25"
category: "reference"
tags:
  - "MCP"
  - "specification"
  - "protocol"
  - "JSON-RPC"
  - "standards"
---

The Model Context Protocol (MCP) is an open protocol that enables AI models to securely interact with local and remote resources through standardized server implementations. This list focuses on production-ready and experimental MCP servers that extend AI capabilities through file access, database connections, API integrations, and other contextual services.

### MCP Specification Overview

MCP consists of several key components:

- **Base Protocol**: Core JSON-RPC message types
- **Lifecycle Management**: Connection initialization, capability negotiation, and session control
- **Authorization**: Authentication and authorization framework for HTTP-based transports
- **Server Features**: Resources, prompts, and tools exposed by servers
- **Client Features**: Sampling and root directory lists provided by clients
- **Utilities**: Cross-cutting concerns like logging and argument completion

All implementations **MUST** support the base protocol and lifecycle management components. Other components **MAY** be implemented based on the specific needs of the application.

### Major Changes (2025-11-25 revision)

1. Enhanced authorization server discovery with support for OpenID Connect Discovery 1.0
2. Allow servers to expose icons as additional metadata for tools, resources, resource templates, and prompts
3. Enhanced authorization flows with incremental scope consent via WWW-Authenticate
4. Provide guidance on tool names
5. Updated ElicitResult and EnumSchema to use a more standards-based approach
6. Added support for URL mode elicitation
7. Add tool calling support to sampling via tools and toolChoice parameters
8. Add support for OAuth Client ID Metadata Documents
9. Add experimental support for tasks to enable tracking durable requests

### Schema and TypeScript Definition

The full specification of the protocol is defined as a TypeScript schema. This is the source of truth for all protocol messages and structures. There is also a JSON Schema, which is automatically generated from the TypeScript source of truth, for use with various automated tooling.

MCP uses JSON Schema 2020-12 as the default dialect for MCP schema definitions.

### Architecture

MCP follows a client-host-server architecture where each host can run multiple client instances. This architecture enables users to integrate AI capabilities across applications while maintaining clear security boundaries and isolating concerns.

- **Host**: Container and coordinator that creates/manages multiple client instances
- **Clients**: Each maintains an isolated server connection with 1:1 relationship to a server
- **Servers**: Provide specialized context and capabilities, exposing resources, tools and prompts
