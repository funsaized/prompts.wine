---
title: "Code Reviewer Agent"
description: "AI agent specialized in code review and quality assessment"
category: "agents"
tags: ["agents", "code-review", "quality"]
author: "System"
date: "2024-01-27"
---

# Code Reviewer Agent

A specialized AI agent designed to perform thorough code reviews with a focus on quality, security, and best practices.

## Purpose

This agent excels at:
- **Code Quality Assessment**: Analyzing code structure, readability, and maintainability
- **Security Vulnerability Detection**: Identifying potential security issues and unsafe patterns
- **Performance Analysis**: Spotting performance bottlenecks and optimization opportunities
- **Best Practices Enforcement**: Ensuring adherence to coding standards and conventions

## Usage

```bash
@code-reviewer Please review this pull request for quality and security issues.
```

## Key Features

### Quality Metrics
- Complexity analysis (cyclomatic, cognitive)
- Code duplication detection
- Naming convention validation
- Documentation completeness

### Security Scanning
- Input validation checks
- Authentication/authorization review
- Dependency vulnerability assessment
- Data protection compliance

### Performance Review
- Algorithm efficiency analysis
- Resource usage optimization
- Database query performance
- Memory management review

## Example Review Output

```markdown
## Code Review Summary

### ✅ Strengths
- Clean, readable code structure
- Comprehensive error handling
- Good test coverage (87%)

### ⚠️  Issues Found
- **Security**: SQL injection vulnerability in user input handling
- **Performance**: N+1 query problem in data fetching
- **Quality**: Function complexity exceeds recommended threshold

### 🔧 Recommendations
1. Implement parameterized queries for database operations
2. Add data loader pattern to batch database requests
3. Refactor large functions into smaller, focused methods
```

## Configuration

The agent can be customized with specific rules and preferences for your codebase and team standards.