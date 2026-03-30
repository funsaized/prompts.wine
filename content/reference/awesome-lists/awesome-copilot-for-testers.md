---
title: "awesome-copilot-for-testers"
source: "https://github.com/jaktestowac/awesome-copilot-for-testers"
category: "reference"
tags:
  - "awesome-list"
  - "github-copilot"
  - "testing"
  - "QA"
  - "Playwright"
  - "custom-agents"
---

A collection of resources (prompts, instructions, and chat modes) for using GitHub Copilot to enhance test automation and quality engineering workflows. Helps testers, developers, and quality engineers leverage AI to improve testing practices.

**Core GitHub Copilot Customization Features:**
- Custom Instructions: Define how Copilot should behave, prioritize, and communicate
- Chat Modes (deprecated → renamed to Custom Agents in VS Code 1.106+): Specialized chat modes with tools and instructions
- Custom Agents: Advanced chat modes utilizing multiple instructions and tools for complex tasks
- Prompt Templates: Predefined templates for common tasks

**Custom Instructions (selected):**
- [Copilot Instructions Best Practices Guide](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/instructions/README.md) — Guide for coding standards and best practices
- [API test rules (Playwright + TypeScript)](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/instructions/api-playwright-tests.instructions.md) — API test rules for Playwright + TypeScript
- [Playwright E2E rules](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/instructions/e2e-playwright.instructions.md) — E2E test rules for Playwright + TypeScript
- [Page Objects / App Actions rules](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/instructions/page-objects.instructions.md) — Page Object / App Action patterns
- [Playwright TypeScript Test Generation Instructions](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/instructions/playwright-typescript.instructions.md) — Best practices for Playwright test generation
- [TypeScript style rules](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/instructions/typescript-style.instructions.md) — TypeScript code style conventions

**Prompt Templates:**
- [A11Y Webpage Audit](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/a11y-webpage-audit.prompt.md) — Accessibility audit with WCAG 2.1/2.2 mapping
- [API Test Plan & Test Generator](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/api-test-plan-and-tests.prompt.md) — Risk-based API test plan from OpenAPI/Postman specs
- [Performance & Reliability Test Planner](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/performance-reliability-plan.prompt.md) — Load/soak test design for critical user flows
- [Playwright MCP website exploration](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/playwright-explore-website-requests.prompt.md) — Website exploration with network request gathering
- [QA Strategy](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/qa-strategy.prompt.md) — Edge cases, OWASP Top 10 security, adversarial scenarios
- [Tech Debt Audit](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/tech-debt-audit.prompt.md) — Anti-pattern audit for automated test code
- [Test Generator](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/test-generator.prompt.md) — Generate tests from website scenarios
- [Test Plan Basic / Comprehensive](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/prompts/test-plan-basic.prompt.md) — Test plan generation

**Custom Agents / Chat Modes:**
- [Accessibility Expert](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/chatmodes/accesibility.chatmode.md) — WCAG 2.1 compliance focused
- [Playwright Automation Engineer](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/chatmodes/playwright-expert.chatmode.md) — Expert guidance for Playwright + TypeScript E2E testing
- [QA Strategist](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/chatmodes/qa-strategist.chatmode.md) — Edge cases, boundary values, OWASP Top 10, adversarial scenarios
- [Tech Debt Auditor](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/chatmodes/tech-debt-auditor.chatmode.md) — Anti-pattern detection in test suites
- [Test Automation Architect](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/chatmodes/test-automation-expert.chatmode.md) — Robust, maintainable automated tests for modern SDLC
- [Test Planner](https://github.com/jaktestowac/awesome-copilot-for-testers/blob/main/chatmodes/test-planner.chatmode.md) — Comprehensive test plans for web applications

**Installation methods:**
- Copy to `.github/copilot-instructions.md` or `.github/.instructions.md`
- VS Code command palette: Chat: Attach Instructions
- Install directly via vscode.dev redirect links
