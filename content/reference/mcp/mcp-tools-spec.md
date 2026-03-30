---
title: "MCP Tools Specification"
source: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools"
category: "reference"
tags:
  - "MCP"
  - "tools"
  - "specification"
  - "protocol"
  - "security"
---

### Overview

The Model Context Protocol (MCP) allows servers to expose tools that can be invoked by language models. Tools enable models to interact with external systems, such as querying databases, calling APIs, or performing computations. Each tool is uniquely identified by a name and includes metadata describing its schema.

### User Interaction Model

Tools in MCP are designed to be **model-controlled**, meaning that the language model can discover and invoke tools automatically based on its contextual understanding and the user's prompts.

However, implementations are free to expose tools through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.

**Trust & Safety Note:** For trust and safety and security, there **SHOULD** always be a human in the loop with the ability to deny tool invocations. Applications **SHOULD** provide UI that makes clear which tools are being exposed to the AI model, insert clear visual indicators when tools are invoked, and present confirmation prompts to the user for operations.

### Capabilities

Servers that support tools **MUST** declare the `tools` capability:

```json
{
  "capabilities": {
    "tools": {
      "listChanged": true
    }
  }
}
```

`listChanged` indicates whether the server will emit notifications when the list of available tools changes.

### Protocol Messages

#### Listing Tools

To discover available tools, clients send a `tools/list` request. This operation supports pagination.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {
    "cursor": "optional-cursor-value"
  }
}
```

#### Calling Tools

To invoke a tool, clients send a `tools/call` request:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "New York"
    }
  }
}
```

### Data Types

#### Tool

A tool definition includes:

- `name`: Unique identifier for the tool
- `title`: Optional human-readable name of the tool for display purposes
- `description`: Human-readable description of functionality
- `icons`: Optional array of icons for display in user interfaces
- `inputSchema`: JSON Schema defining expected parameters
- `outputSchema`: Optional JSON Schema defining expected output structure
- `annotations`: Optional properties describing tool behavior
- `execution`: Optional object describing execution-related properties

#### Tool Names Guidelines

- Tool names **SHOULD** be between 1 and 128 characters in length
- Tool names **SHOULD** be considered case-sensitive
- Only allowed characters: uppercase/lowercase ASCII letters (A-Z, a-z), digits (0-9), underscore (_), hyphen (-), and dot (.)
- Tool names **SHOULD NOT** contain spaces, commas, or other special characters
- Tool names **SHOULD** be unique within a server

### Tool Result Content Types

Tool results may contain structured or unstructured content:

1. **Text Content**: Basic text results
2. **Image Content**: Base64-encoded image data with MIME type
3. **Audio Content**: Base64-encoded audio data
4. **Resource Links**: Links to resources with metadata
5. **Embedded Resources**: Full resource content embedded in response

### Error Handling

Tools use two error reporting mechanisms:

1. **Protocol Errors**: Standard JSON-RPC errors for issues like unknown tools, malformed requests, or server errors

2. **Tool Execution Errors**: Reported in tool results with `isError: true` for API failures, input validation errors, or business logic errors

Tool Execution Errors contain actionable feedback that language models can use to self-correct and retry with adjusted parameters.

### Security Considerations

**Servers MUST:**
- Validate all tool inputs
- Implement proper access controls
- Rate limit tool invocations
- Sanitize tool outputs

**Clients SHOULD:**
- Prompt for user confirmation on sensitive operations
- Show tool inputs to the user before calling the server
- Validate tool results before passing to LLM
- Implement timeouts for tool calls
- Log tool usage for audit purposes
