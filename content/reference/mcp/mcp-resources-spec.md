---
title: "MCP Resources Specification"
source: "https://modelcontextprotocol.io/specification/2025-11-25/server/resources"
category: "reference"
tags:
  - "MCP"
  - "resources"
  - "specification"
  - "protocol"
  - "URI"
---

### Overview

The Model Context Protocol (MCP) provides a standardized way for servers to expose resources to clients. Resources allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information. Each resource is uniquely identified by a URI.

### User Interaction Model

Resources in MCP are designed to be **application-driven**, with host applications determining how to incorporate context based on their needs. For example, applications could expose resources through UI elements for explicit selection, allow the user to search through and filter available resources, or implement automatic context inclusion based on heuristics.

### Capabilities

Servers that support resources **MUST** declare the `resources` capability:

```json
{
  "capabilities": {
    "resources": {
      "subscribe": true,
      "listChanged": true
    }
  }
}
```

The capability supports two optional features:
- `subscribe`: whether the client can subscribe to be notified of changes to individual resources
- `listChanged`: whether the server will emit notifications when the list of available resources changes

### Protocol Messages

#### Listing Resources

To discover available resources, clients send a `resources/list` request. This operation supports pagination.

#### Reading Resources

To retrieve resource contents, clients send a `resources/read` request with the URI of the resource.

#### Resource Templates

Resource templates allow servers to expose parameterized resources using URI templates. Arguments may be auto-completed through the completion API.

### Data Types

#### Resource

A resource definition includes:
- `uri`: Unique identifier for the resource
- `name`: The name of the resource
- `title`: Optional human-readable name for display purposes
- `description`: Optional description
- `icons`: Optional array of icons for display in user interfaces
- `mimeType`: Optional MIME type
- `size`: Optional size in bytes

#### Resource Contents

Resources can contain either text or binary data:
- **Text Content**: Plain text with MIME type
- **Binary Content**: Base64-encoded data with MIME type

#### Annotations

Resources support optional annotations:
- `audience`: Array indicating intended audience ("user" and/or "assistant")
- `priority`: Number from 0.0 to 1.0 indicating importance
- `lastModified`: ISO 8601 timestamp of last modification

### Common URI Schemes

- `https://`: Resources available on the web
- `file://`: Resources that behave like a filesystem
- `git://`: Git version control integration
- Custom URI schemes are allowed per RFC3986
