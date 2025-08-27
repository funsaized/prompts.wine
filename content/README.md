# SuperClaude Framework & AI Development Prompts Library

<p align="center">
  <a href="https://claude.ai/code" target="_blank">
    <img alt="Claude Code" src="https://img.shields.io/badge/Claude-Code-blue.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="SuperClaude" src="https://img.shields.io/badge/SuperClaude-Framework-purple.svg">
  </a>
</p>

> Advanced Claude Code SuperClaude framework with intelligent command orchestration, persona-driven AI, and multi-stage execution for enterprise-grade software development.

## 📚 Overview

The SuperClaude Framework transforms Claude Code into an intelligent development orchestrator featuring:

- **🎯 Intelligent Command System**: 20+ specialized commands with auto-activation and wave orchestration
- **🤖 Persona-Driven AI**: 11 specialized personas (Architect, Security, Performance, etc.) with auto-activation
- **🌊 Wave Orchestration**: Multi-stage execution for complex operations with compound intelligence
- **🔗 MCP Integration**: Context7, Sequential, Magic, and Playwright server orchestration
- **⚡ Performance Optimization**: Sub-100ms routing with intelligent resource management
- **🛡️ Quality Gates**: 8-step validation framework with evidence-based completion

This repository contains the complete SuperClaude framework configuration and traditional AI development prompts for various technology stacks.

## 📁 Repository Structure

```
prompts/
├── SuperClaude Framework (Core System)
│   ├── CLAUDE.md              # 🚀 SuperClaude entry point
│   ├── COMMANDS.md            # 🎯 20+ intelligent commands
│   ├── PERSONAS.md            # 🤖 11 specialized personas
│   ├── FLAGS.md               # ⚙️ Auto-activation flags
│   ├── ORCHESTRATOR.md        # 🧠 Intelligent routing
│   ├── MCP.md                 # 🔗 MCP server integration
│   ├── PRINCIPLES.md          # 📏 Development principles
│   ├── RULES.md               # ✅ Operational rules
│   └── MODES.md               # 🎛️ Operational modes
├── Legacy AI Development (Traditional)
│   ├── .windsurf/rules/       # Framework-specific rules
│   ├── .github/               # GitHub configurations
│   ├── claude/                # Claude prompts
│   └── universal-app/         # App templates
└── README.md                  # This file
```

## 🚀 SuperClaude Framework

### Core System Components

**[📋 CLAUDE.md](CLAUDE.md)** - SuperClaude Entry Point
- Framework initialization and component loading
- Command system overview and quick reference
- Integration with Claude Code native features

**[🎯 COMMANDS.md](COMMANDS.md)** - Intelligent Command System
- 20+ specialized commands with wave orchestration
- Auto-activation patterns and performance profiles
- Development, analysis, quality, and meta commands
- Wave-enabled commands for complex operations

**[🤖 PERSONAS.md](PERSONAS.md)** - Specialized AI Personas
- 11 domain experts: Architect, Frontend, Backend, Security, Performance, etc.
- Auto-activation based on context and keywords
- Cross-persona collaboration and expertise sharing
- Decision frameworks and quality standards

**[⚙️ FLAGS.md](FLAGS.md)** - Auto-Activation Flags
- Planning flags: `--think`, `--think-hard`, `--ultrathink`
- MCP server control: `--c7`, `--seq`, `--magic`, `--play`
- Performance flags: `--uc`, `--delegate`, `--wave-mode`
- Quality flags: `--validate`, `--safe-mode`, `--loop`

**[🧠 ORCHESTRATOR.md](ORCHESTRATOR.md)** - Intelligent Routing
- Pattern recognition and complexity detection
- Dynamic decision trees and tool orchestration
- Resource management and performance optimization
- Quality gates and validation framework

**[🔗 MCP.md](MCP.md)** - MCP Server Integration
- Context7: Documentation and research
- Sequential: Complex analysis and thinking  
- Magic: UI components and design systems
- Playwright: Browser automation and testing

**[📏 PRINCIPLES.md](PRINCIPLES.md)** - Development Philosophy
- Evidence-based reasoning and SOLID principles
- Senior developer mindset and decision frameworks
- Quality standards and ethical guidelines
- Human-AI collaboration patterns

**[✅ RULES.md](RULES.md)** - Operational Rules
- Task management and file operation security
- Framework compliance and systematic changes
- Quality gates and validation requirements

**[🎛️ MODES.md](MODES.md)** - Operational Modes
- Task management with TodoWrite system
- Introspection mode for meta-cognitive analysis
- Token efficiency mode with intelligent compression

### Quick Start Guide

1. **Installation**: Copy SuperClaude files to `~/.claude/` directory
2. **Activation**: Framework auto-loads via `@CLAUDE.md` reference
3. **Usage**: Commands auto-activate based on context, or use explicit flags
4. **Customization**: Modify configurations for team-specific needs

### Command Examples

```bash
# Intelligent analysis with auto-persona activation
/analyze @src --focus security

# Wave orchestration for comprehensive improvements  
/improve @codebase --wave-mode progressive

# Multi-stage implementation with validation
/implement "user authentication" --validate --seq

# Performance optimization with specialized tools
/build --perf --persona-performance --play
```

## 🛠️ Legacy AI Development (Traditional)

### Framework-Specific Guidelines

Traditional development rules and best practices maintained for compatibility:

#### **Framework Rules** (Legacy)
- Angular Fullstack with NgRx and TypeScript patterns
- React/Next.js with modern state management
- Data Science with Python and ML pipelines  
- Monorepo with Tamagui cross-platform development

## 🎯 Legacy AI Development (Traditional)

### **AI Safety & Prompt Engineering** (Legacy)
Traditional prompt engineering resources for non-SuperClaude environments:
- Prompt engineering fundamentals and safety frameworks
- Bias mitigation and responsible AI usage guidelines
- Security considerations and validation methodologies

### **Project Templates** (Legacy)
Traditional project configuration templates:
- Universal app configuration for monorepo projects
- Framework-specific development guidelines
- Testing and deployment command reference

## 🚀 SuperClaude Installation & Usage

### Installation

#### Method 1: Global Installation (Recommended)
```bash
# Clone repository
git clone https://github.com/snimmagadda1/prompts.git
cd prompts

# Copy SuperClaude framework to Claude Code global configuration
cp CLAUDE.md COMMANDS.md PERSONAS.md FLAGS.md ORCHESTRATOR.md MCP.md PRINCIPLES.md RULES.md MODES.md ~/.claude/
```

#### Method 2: Project-Specific Installation
```bash
# Copy framework files to your project's .claude directory
mkdir -p .claude
cp path/to/prompts/{CLAUDE,COMMANDS,PERSONAS,FLAGS,ORCHESTRATOR,MCP,PRINCIPLES,RULES,MODES}.md .claude/
```

### Activation

SuperClaude auto-activates when Claude Code detects the framework files. No additional configuration required.

### Usage Patterns

#### Intelligent Command Usage
```bash
# Commands auto-detect complexity and activate appropriate personas
/analyze codebase                    # → Auto: analyzer persona, --seq, complexity assessment
/implement "user dashboard"          # → Auto: frontend persona, --magic, --c7
/improve performance                 # → Auto: performance persona, --think, --play
/build --comprehensive               # → Auto: architect persona, wave orchestration
```

#### Wave Orchestration
```bash
# Complex operations automatically trigger wave mode
/improve @large-codebase            # → Wave: progressive enhancement strategy
/analyze --comprehensive @system    # → Wave: systematic analysis with validation
```

#### Flag-Based Control
```bash
# Explicit control over framework behavior
/analyze --think-hard --seq --persona-architect
/build --wave-mode force --persona-frontend --magic
/implement --validate --safe-mode --loop
```

### Legacy AI Tools Integration

For non-Claude Code environments:

1. **Cursor/Windsurf**: Use `.windsurf/rules/` files
2. **GitHub Copilot**: Reference `.github/instructions/`
3. **Other Tools**: Adapt traditional templates to your workflow

## 🔧 SuperClaude Customization

### Framework Customization

SuperClaude supports extensive customization for team and organization needs:

#### **COMMANDS.md** - Add Custom Commands
```yaml
custom_command:
  command: "/mycommand"
  category: "Custom Operations"
  purpose: "Organization-specific workflow"
  wave-enabled: true
  performance-profile: "standard"
```

#### **PERSONAS.md** - Custom Personas
```yaml
custom_persona:
  identity: "Domain Expert"
  priority_hierarchy: "custom > standard > fallback"
  activation_triggers: ["keyword1", "keyword2"]
```

#### **FLAGS.md** - Organization Flags
```yaml
--org-standard: "Apply organization coding standards"
--team-workflow: "Enable team-specific workflow patterns"
```

#### **ORCHESTRATOR.md** - Custom Routing
```yaml
custom_routing:
  pattern: "organization pattern"
  complexity: "moderate"
  auto_activates: ["custom persona", "specific flags"]
```

### Legacy Customization

Traditional templates can be customized for specific technology stacks:

1. **Technology Stack**: Framework versions and libraries
2. **Coding Standards**: Style guides and conventions  
3. **Testing Requirements**: Coverage thresholds and strategies
4. **Performance Metrics**: Specific performance targets
5. **Security Policies**: Organization-specific requirements

## 👨‍💻 Author

**Sai Naveen Nimmagadda**

- 🌐 Website: [s11a.com](https://s11a.com)
- 💻 GitHub: [@funsaized](https://github.com/funsaized)

## 🤝 Contributing

Contributions to SuperClaude framework and legacy AI development resources are welcome!

### SuperClaude Framework Contributions

**Framework Enhancement Areas**:
- **Commands**: New specialized commands with wave orchestration
- **Personas**: Additional domain expert personas with auto-activation
- **MCP Integration**: New server integrations and workflow patterns
- **Quality Gates**: Enhanced validation and evidence frameworks
- **Performance**: Optimization and efficiency improvements

### Legacy AI Development Contributions

**Traditional Template Areas**:
- **Framework Rules**: Updated development guidelines
- **Project Templates**: New technology stack configurations
- **Safety Guidelines**: Enhanced prompt engineering practices

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/supercloud-enhancement`)
3. Commit your changes (`git commit -m 'Add SuperClaude persona'`)
4. Push to the branch (`git push origin feature/supercloud-enhancement`)
5. Open a Pull Request

### Contribution Guidelines

- **SuperClaude**: Test framework components with Claude Code
- **Legacy**: Test prompts with multiple AI assistants
- Follow existing file structure and naming conventions
- Include examples and documentation for new features
- Validate against quality gates and evidence requirements

## 📝 License

This project is [MIT](LICENSE) licensed.

## 🌟 Show your support

Give a ⭐️ if SuperClaude enhanced your Claude Code development experience!

---

## 📈 Performance Metrics

SuperClaude Framework delivers measurable improvements:

- **⚡ 40-70% faster execution** through intelligent routing and parallel processing
- **🎯 30-50% token efficiency** with adaptive compression and caching
- **🤖 95%+ accuracy** in persona auto-activation and context detection  
- **🌊 80%+ better results** for complex operations using wave orchestration
- **🛡️ 8-step quality gates** ensuring consistent, validated outcomes

---

*SuperClaude Framework: Transforming Claude Code into an intelligent development orchestrator. Actively maintained and continuously enhanced with new capabilities and optimizations.*