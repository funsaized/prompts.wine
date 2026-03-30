---
title: "Azure SDK Copilot Instructions"
source: "https://raw.githubusercontent.com/Azure/azure-sdk-for-net/main/.github/copilot-instructions.md"
category: "system-prompts"
tags: [github-copilot, azure, microsoft, mcp-integration, team-config]
---

# Azure SDK Copilot Instructions

> **Note**: For general AI agent guidelines and repository overview, see [AGENTS.md](https://github.com/Azure/azure-sdk-for-net/blob/main/AGENTS.md) at the repository root.

This repo contains Azure SDKs for various Azure services and tools that generate them.

## Prerequisites
- To use MCP tool calls, PowerShell must be installed. Provide PowerShell installation instructions if not installed, and recommend restarting the IDE to use the MCP server.
- When using Copilot from Visual Studio or VS Code:
  - **Always run** the `azsdk_verify_setup` tool first to validate the user's development environment for SDK MCP tools.
  - **Do not proceed** with any other tool execution until this step is complete.
  - **Skip this check only** for queries that do not require tool execution.

## Folder Structure

- `/eng/packages/http-client-csharp`: Contains the source code of the generator for Azure Data Plane SDKs (aka Azure Generator).
- `/eng/packages/http-client-csharp-mgmt`: Contains the source code of the generator for Azure Management Plane SDKs (aka Azure Management Generator).
- `/sdk`: Contains the individual SDKs for Azure services.

### Azure Generator

- Always run `npm install` in the `/eng/packages/http-client-csharp` directory before running the generator.
- Always run `/eng/packages/http-client-csharp/eng/scripts/Generate.ps1` to regenerate the test projects to validate the result of generator code changes.
- For emitter changes, always run `npm run lint` and `npm run prettier` in the `/eng/packages/http-client-csharp` directory to ensure the changes won't break CI.

### Azure Management Generator

- Always run `npm install` in the `/eng/packages/http-client-csharp-mgmt` directory before running the generator.
- Always run `/eng/packages/http-client-csharp-mgmt/eng/scripts/Generate.ps1` to regenerate the test projects.
- For emitter changes, always run `npm run lint` and `npm run prettier` in the `/eng/packages/http-client-csharp-mgmt` directory.

## Local SDK Generation and Package Lifecycle (TypeSpec)

### AUTHORITATIVE REFERENCE
For all TypeSpec-based SDK workflows (generation, building, validation, testing, versioning, and release preparation), follow the local-sdk-workflow.instructions.md file.

### DEFAULT BEHAVIORS
- **Repository:** Use the current workspace as the local SDK repository unless the user specifies a different path.
- **Configuration:** Identify `tsp-location.yaml` from files open in the editor. If unclear, ask the user.

### REQUIRED CONFIRMATIONS
Ask the user for clarification if repository path or configuration file is ambiguous.

## Pre-Commit Validation

Before committing changes to SDK packages under `sdk/`, always run the pre-commit validation checks described in the `pre-commit-checks` skill.
