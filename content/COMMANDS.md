# SuperClaude Command System

**Intelligent Command Execution Framework for Claude Code**

## Overview

20+ specialized commands with auto-activation, wave orchestration, and intelligent routing. Commands automatically detect complexity, activate appropriate personas, and orchestrate MCP servers for optimal performance.

## Command Architecture

### Core Structure
```yaml
command: "/{command-name}"
category: "Primary classification"  
purpose: "Operational objective"
wave-enabled: true|false
performance-profile: "optimization|standard|complex"
```

### Execution Pipeline
1. **Input Parsing**: Arguments with `@<path>`, `!<command>`, `--<flags>`
2. **Context Resolution**: Auto-persona activation and MCP server selection
3. **Wave Eligibility**: Complexity assessment and orchestration mode
4. **Tool Coordination**: Resource allocation and parallel execution
5. **Quality Gates**: Validation checkpoints and evidence collection

## Development Commands

### `/build $ARGUMENTS`
**Project builder with intelligent framework detection**

```yaml
category: "Development & Deployment"
purpose: "Framework-aware build optimization"
wave-enabled: true
performance-profile: "optimization"
```

**Auto-Activates**: Frontend, Backend, Architect, Scribe personas
**MCP Integration**: Magic (UI builds), Context7 (patterns), Sequential (logic)
**Tools**: Read, Grep, Glob, Bash, TodoWrite, Edit, MultiEdit

**Usage Examples**:
```bash
/build                              # Auto-detect and build entire project
/build @frontend --perf             # Frontend-focused performance build
/build --comprehensive --wave-mode  # Wave orchestration for complex builds
```

**Wave Orchestration**: Multi-stage build process with validation gates

### `/implement $ARGUMENTS`
**Feature and code implementation with intelligent persona activation**

```yaml
category: "Development & Implementation"
purpose: "Context-aware feature development"
wave-enabled: true
performance-profile: "standard"
```

**Auto-Activates**: Frontend, Backend, Architect, Security (context-dependent)
**MCP Integration**: Magic (UI components), Context7 (patterns), Sequential (logic)
**Tools**: Read, Write, Edit, MultiEdit, Bash, Glob, TodoWrite, Task

**Usage Examples**:
```bash
/implement "user authentication system"     # Auto-detects security context
/implement @components/Button --magic       # UI component with Magic server
/implement --type api --framework fastapi   # Backend API implementation
```

**Arguments**:
- `[feature-description]` - Natural language feature description
- `--type component|api|service|feature` - Implementation type
- `--framework <name>` - Target framework specification

### `/design $ARGUMENTS`
**Design orchestration with UI and architecture focus**

```yaml
category: "Design & Architecture"
purpose: "System and UI design coordination"
wave-enabled: true
performance-profile: "complex"
```

**Auto-Activates**: Architect, Frontend personas
**MCP Integration**: Magic, Sequential, Context7
**Tools**: Write, Read, Edit, Context tools

**Usage Examples**:
```bash
/design "e-commerce checkout flow"          # UI/UX design orchestration
/design --architecture --system-wide       # System architecture design
/design --component "data visualization"   # Component design patterns
```

## Analysis Commands

### `/analyze $ARGUMENTS`
**Multi-dimensional code and system analysis**

```yaml
category: "Analysis & Investigation"
purpose: "Comprehensive system understanding"
wave-enabled: true
performance-profile: "complex"
```

**Auto-Activates**: Analyzer, Architect, Security personas
**MCP Integration**: Sequential (primary), Context7 (patterns), Magic (UI analysis)
**Tools**: Read, Grep, Glob, Bash, TodoWrite

**Usage Examples**:
```bash
/analyze @src --focus security              # Security-focused analysis
/analyze --comprehensive --wave-mode        # Deep wave-orchestrated analysis
/analyze performance @api                   # Performance bottleneck analysis
```

**Analysis Dimensions**:
- **Code Quality**: Maintainability, complexity, technical debt
- **Security**: Vulnerabilities, compliance, threat assessment
- **Performance**: Bottlenecks, optimization opportunities
- **Architecture**: Structure, patterns, design principles

### `/troubleshoot [symptoms] [flags]`
**Problem investigation and root cause analysis**

**Auto-Activates**: Analyzer, QA personas
**MCP Integration**: Sequential, Playwright
**Focus**: Systematic debugging and issue resolution

### `/explain [topic] [flags]`
**Educational explanations with examples**

**Auto-Activates**: Mentor, Scribe personas  
**MCP Integration**: Context7, Sequential
**Focus**: Knowledge transfer and learning

## Quality Commands

### `/improve [target] [flags]`
**Evidence-based code enhancement**

```yaml
category: "Quality & Enhancement"
purpose: "Systematic code improvement"
wave-enabled: true
performance-profile: "optimization"
```

**Auto-Activates**: Refactorer, Performance, Architect, QA personas
**MCP Integration**: Sequential (logic), Context7 (patterns), Magic (UI improvements)
**Tools**: Read, Grep, Glob, Edit, MultiEdit, Bash

**Usage Examples**:
```bash
/improve @codebase --focus performance      # Performance optimization
/improve --quality --wave-mode progressive # Progressive quality enhancement
/improve --security --validate              # Security hardening with validation
```

**Improvement Areas**:
- **Performance**: Speed, resource optimization, caching
- **Quality**: Code structure, maintainability, readability  
- **Security**: Vulnerability fixes, compliance improvements
- **Architecture**: Design patterns, modularity, coupling

### `/cleanup [target] [flags]`
**Technical debt reduction and code organization**

**Auto-Activates**: Refactorer persona
**MCP Integration**: Sequential
**Focus**: Systematic cleanup and organization

### `/test [type] [flags]`
**Testing workflows and quality validation**

**Auto-Activates**: QA persona
**MCP Integration**: Playwright, Sequential
**Focus**: Comprehensive testing strategies

## Meta Commands

### `/task [operation] [flags]`
**Long-term project management and coordination**

```yaml
category: "Project Management"
purpose: "Multi-session workflow coordination"
wave-enabled: true
performance-profile: "complex"
```

**Auto-Activates**: Architect, Analyzer personas
**MCP Integration**: Sequential
**Focus**: Strategic planning and execution

### `/git [operation] [flags]`
**Git workflow assistant with quality integration**

**Auto-Activates**: DevOps, Scribe, QA personas
**MCP Integration**: Sequential
**Focus**: Version control and collaboration

### `/document [target] [flags]`
**Documentation generation and maintenance**

**Auto-Activates**: Scribe, Mentor personas
**MCP Integration**: Context7, Sequential
**Focus**: Comprehensive documentation workflows

## Wave-Enabled Commands

**Tier 1 (Primary Wave Commands)**:
- `/analyze` - Multi-stage analysis with compound intelligence
- `/build` - Progressive build optimization with validation
- `/implement` - Iterative feature development with quality gates
- `/improve` - Systematic enhancement with evidence tracking

**Tier 2 (Secondary Wave Commands)**:
- `/design` - Multi-phase design with stakeholder validation
- `/task` - Long-term project orchestration with milestone tracking

### Wave Activation Criteria
- **Complexity Score**: ≥0.7 based on scope and requirements
- **File Count**: >20 files requiring coordination  
- **Operation Types**: >2 different types of operations
- **Manual Override**: `--wave-mode force` flag

### Wave Strategies
- **Progressive**: Iterative enhancement with continuous validation
- **Systematic**: Methodical analysis with comprehensive coverage
- **Adaptive**: Dynamic configuration based on evolving complexity
- **Enterprise**: Large-scale coordination for >100 files

## Command Integration Patterns

### Auto-Activation Flow
```
User Input → Pattern Recognition → Complexity Assessment → Persona Selection → MCP Coordination → Tool Orchestration → Quality Validation
```

### Flag Integration
Commands seamlessly integrate with FLAGS.md system:
- Auto-detection overrides for manual control
- Performance flags for optimization
- Quality flags for validation requirements
- MCP flags for server coordination

### Persona Coordination
Commands automatically activate appropriate personas:
- Domain expertise matching (frontend, backend, security)
- Cross-functional collaboration (architect + performance)
- Quality assurance integration (QA validation)

### Tool Orchestration
Intelligent tool selection and coordination:
- Parallel execution for independent operations
- Sequential coordination for dependent tasks
- Resource optimization and caching
- Error handling and recovery patterns

## Performance Metrics

**Command Execution Performance**:
- **Routing Decision**: <100ms for complexity assessment
- **Tool Coordination**: 40-70% faster through parallelization  
- **Resource Efficiency**: 30-50% token savings through optimization
- **Quality Assurance**: 95%+ success rate with validation gates

**Wave Orchestration Benefits**:
- **Complex Operations**: 80%+ better outcomes
- **Resource Management**: Intelligent allocation and scaling
- **Quality Validation**: Continuous validation throughout execution
- **Evidence Collection**: Comprehensive documentation and metrics

## Usage Guidelines

### Best Practices
1. **Trust Auto-Detection**: Commands intelligently select optimal configurations
2. **Use Explicit Flags**: Override auto-detection when specific control needed
3. **Leverage Wave Mode**: Enable for complex, multi-stage operations
4. **Monitor Quality Gates**: Ensure validation requirements are met
5. **Review Evidence**: Validate outcomes against objectives and metrics

### Common Patterns
```bash
# Simple operations - trust auto-detection
/implement "login form"
/analyze @components

# Complex operations - enable wave mode  
/improve @large-codebase --wave-mode progressive
/analyze --comprehensive --wave-mode systematic

# Explicit control - override auto-detection
/build --persona-frontend --magic --validate
/implement --safe-mode --seq --think-hard
```

---

**SuperClaude Commands**: Intelligent orchestration for every development workflow.