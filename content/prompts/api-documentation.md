---
title: "API Documentation Generator"
description: "Generate comprehensive API documentation from code"
category: "prompts"
tags: ["prompts", "documentation", "api"]
author: "System"
date: "2024-01-27"
---

# API Documentation Generator

A specialized prompt for generating comprehensive API documentation from code analysis.

## Prompt Template

```
Please analyze the provided API code and generate comprehensive documentation following these requirements:

## Documentation Structure:
1. **API Overview**: Brief description of the API's purpose and main functionality
2. **Authentication**: Required authentication methods and security considerations
3. **Endpoints**: Detailed documentation for each endpoint including:
   - HTTP method and URL pattern
   - Request parameters (path, query, body)
   - Response format and status codes
   - Example requests and responses
   - Error handling and error codes
4. **Data Models**: Schema definitions for request/response objects
5. **Rate Limiting**: If applicable, rate limiting rules and headers
6. **Examples**: Real-world usage examples and code samples

## Format Requirements:
- Use OpenAPI 3.0 specification format where possible
- Include interactive examples
- Provide code samples in multiple programming languages
- Use clear, concise descriptions
- Include validation rules and constraints

## Code to analyze:
[INSERT_CODE_HERE]

Generate the documentation now.
```

## Usage Examples

### REST API Documentation
```markdown
# User Management API

## Overview
This API provides user account management functionality including registration, authentication, and profile management.

## Authentication
All endpoints require JWT token authentication via Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### POST /api/users/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-27T10:00:00Z"
}
```
```

## Best Practices

1. **Consistency**: Ensure consistent formatting and structure across all endpoint documentation
2. **Completeness**: Include all possible response codes and error scenarios
3. **Examples**: Provide realistic examples that developers can copy and test
4. **Validation**: Document all input validation rules and constraints
5. **Versioning**: Include API version information and compatibility notes

## Customization

This prompt can be customized for specific API types:
- REST APIs
- GraphQL APIs
- WebSocket APIs
- RPC APIs

Simply modify the structure requirements and format specifications to match your API style and documentation standards.