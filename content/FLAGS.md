# SuperClaude Flag System

**Auto-Activation Flags with Intelligent Context Detection**

## Overview

Comprehensive flag system for Claude Code SuperClaude framework with automatic activation, conflict resolution, and performance optimization. Flags intelligently activate based on context, complexity, and operational requirements.

**Core Features**:
- **Auto-Activation**: Context-sensitive flag activation based on patterns and thresholds
- **Priority System**: Hierarchical conflict resolution with safety-first approach
- **Performance Optimization**: Resource-aware activation and token efficiency
- **Integration**: Seamless coordination with personas, commands, and MCP servers

## Flag Architecture

### Priority Order (Highest to Lowest)
1. **Safety flags** override optimization flags (`--safe-mode` > `--uc`)
2. **Explicit flags** override auto-detection (user intent > automation)
3. **Thinking depth**: `--ultrathink` > `--think-hard` > `--think`
4. **MCP control**: `--no-mcp` overrides all individual MCP flags
5. **Scope hierarchy**: `system` > `project` > `module` > `file`
6. **Persona precedence**: Last specified persona takes priority
7. **Wave control**: `--wave-mode off` > `--wave-mode force` > `--wave-mode auto`
8. **Delegation**: Explicit `--delegate` > auto-detection patterns
9. **Loop mode**: Explicit `--loop` > keyword-based auto-detection
10. **Compression**: `--uc` auto-activation overrides `--verbose` flags

---

## Planning & Analysis Flags

### `--plan`
**Display execution plan before operations**

**Purpose**: Shows detailed execution strategy including tools, expected outputs, and step sequence
**Auto-Activation**: Never (explicit use only for transparency)
**Integration**: Works with all commands to provide pre-execution visibility
**Performance Impact**: Minimal (~100 tokens for plan generation)

### `--think`
**Multi-file analysis with structured reasoning**

**Purpose**: Enhanced analysis for moderate complexity scenarios (~4K tokens)
**Auto-Activation**: 
- Import chains >5 files detected
- Cross-module references >10 detected
- Module-level refactoring or analysis requests

**Integration**: 
- Auto-enables `--seq` for structured analysis
- Suggests `--persona-analyzer` for investigation focus
- Compatible with all analysis and implementation commands

**Performance Profile**: Standard complexity analysis with moderate token usage

### `--think-hard`
**Deep architectural analysis for complex systems**

**Purpose**: Comprehensive system analysis with cross-module dependencies (~10K tokens)
**Auto-Activation**:
- System-wide refactoring operations detected
- Performance bottlenecks affecting >3 modules
- Security vulnerabilities with system-wide impact
- Architectural decision requests with long-term implications

**Integration**:
- Auto-enables `--seq --c7` for comprehensive analysis
- Suggests `--persona-architect` for structural decision-making
- Triggers quality gate validation for critical decisions

**Performance Profile**: Complex analysis with significant token investment for thorough coverage

### `--ultrathink`
**Critical system redesign analysis**

**Purpose**: Maximum depth analysis for mission-critical operations (~32K tokens)
**Auto-Activation**:
- Legacy system modernization requests
- Critical security vulnerabilities requiring system redesign
- Performance degradation >50% requiring architectural changes
- Enterprise-scale transformations affecting multiple systems

**Integration**:
- Auto-enables `--seq --c7 --all-mcp` for comprehensive server coordination
- Activates appropriate expert personas based on domain complexity
- Forces validation and evidence collection at each decision point

**Performance Profile**: Maximum complexity analysis with extensive resource allocation

---

## Compression & Efficiency Flags

### `--uc` / `--ultracompressed`
**Intelligent token optimization with 30-50% reduction**

**Purpose**: Adaptive compression using symbols, abbreviations, and structured output
**Auto-Activation**:
- Context usage >75% of available tokens
- Large-scale operations with high token requirements
- Resource constraints detected by performance monitoring

**Features**:
- Auto-generated symbol legend for session consistency
- Maintains technical accuracy with >95% information preservation
- Persona-aware compression strategies (domain-specific optimization)
- Real-time compression effectiveness validation

**Integration**: Compatible with all commands, automatically adjusts verbosity based on context

### `--answer-only`
**Direct response mode without automation**

**Purpose**: Provides direct answers without task creation or workflow automation
**Auto-Activation**: Never (explicit use only for minimal interaction)
**Use Case**: Quick queries, simple questions, minimal automation needs
**Performance**: Maximum efficiency for straightforward interactions

### `--validate`
**Pre-operation validation and risk assessment**

**Purpose**: Comprehensive validation with risk scoring before execution
**Auto-Activation**:
- Risk score >0.7 based on complexity and impact assessment
- Resource usage >75% requiring careful resource management
- Production environment operations detected
- Critical system modifications with potential widespread impact

**Risk Algorithm**: 
`complexity*0.3 + vulnerabilities*0.25 + resources*0.2 + failure_probability*0.15 + time_investment*0.1`

### `--safe-mode`
**Maximum validation with conservative execution**

**Purpose**: Enhanced safety protocols for high-risk operations
**Auto-Activation**:
- Resource usage >85% approaching system limits
- Production environment detected with critical operations
- High-risk operations with potential for irreversible changes

**Features**:
- Forces validation checks at each major decision point
- Automatically enables `--uc` mode for resource efficiency
- Blocks operations with risk scores exceeding safety thresholds
- Provides detailed risk assessment and mitigation strategies

### `--verbose`
**Maximum detail and comprehensive explanations**

**Purpose**: Detailed output with comprehensive explanations and context
**Auto-Activation**: Never (conflicts with efficiency optimization goals)
**Use Case**: Learning scenarios, detailed documentation needs, troubleshooting
**Performance**: High token usage prioritizing completeness over efficiency

---

## MCP Server Control Flags

### `--c7` / `--context7`
**Enable Context7 for documentation and research**

**Purpose**: Access to official library documentation, patterns, and best practices
**Auto-Activation**:
- External library imports detected (import/require/from/use statements)
- Framework-specific questions or implementation requests
- Documentation generation or best practices queries
- Scribe persona activation for professional writing standards

**Workflow Integration**:
1. `resolve-library-id` → Identify Context7-compatible library
2. `get-library-docs` → Retrieve relevant documentation and patterns
3. Implementation with proper attribution and version compatibility
4. Pattern validation against official documentation standards

**Performance**: 2-5K tokens per query with intelligent caching for session reuse

### `--seq` / `--sequential`
**Enable Sequential for complex multi-step analysis**

**Purpose**: Structured thinking and systematic problem-solving capabilities
**Auto-Activation**:
- Complex debugging scenarios requiring systematic investigation
- System design questions with multiple interdependent factors
- Any `--think`, `--think-hard`, or `--ultrathink` flag activation
- Multi-step processes requiring logical coordination

**Capabilities**:
- Systematic problem decomposition and analysis
- Multi-step reasoning with logical flow validation
- Complex decision-making with evidence-based conclusions
- Cross-domain analysis coordination with other MCP servers

**Performance**: Variable based on analysis complexity, optimized for systematic reasoning

### `--magic`
**Enable Magic for UI component generation**

**Purpose**: Modern UI component generation and design system integration
**Auto-Activation**:
- UI component creation requests (component/button/form keywords)
- Design system queries or implementation needs
- JSX/template patterns detected in codebase context
- Frontend persona activation for user interface development
- Accessibility requirements or responsive design requests

**Capabilities**:
- Modern component generation with framework best practices
- Design system integration and consistency validation
- Accessibility compliance (WCAG standards) built-in
- Responsive design patterns with mobile-first approach

**Performance**: Optimized for rapid component generation with design system awareness

### `--play` / `--playwright`
**Enable Playwright for browser automation and testing**

**Purpose**: Cross-browser E2E testing, performance monitoring, and user workflow validation
**Auto-Activation**:
- Testing workflow requests (test/e2e keywords detected)
- Performance monitoring and optimization needs
- Visual testing or cross-browser compatibility requirements
- User experience validation and accessibility testing

**Capabilities**:
- Multi-browser testing (Chrome, Firefox, Safari, Edge)
- Performance metrics collection (Core Web Vitals, load times)
- Visual regression testing with screenshot comparison
- User workflow automation and validation

**Performance**: Resource-intensive for comprehensive testing, optimized for parallel execution

### `--all-mcp`
**Enable all MCP servers simultaneously**

**Purpose**: Maximum capability coordination for complex multi-domain operations
**Auto-Activation**:
- Problem complexity score >0.8 with multi-domain indicators
- Operations requiring documentation, analysis, UI work, and testing
- Enterprise-scale operations with comprehensive requirements

**Features**:
- Coordinated server orchestration with intelligent task distribution
- Cross-server data sharing and result synthesis
- Comprehensive analysis combining all available capabilities

**Performance**: Highest token usage, reserved for complex operations requiring full capabilities

### `--no-mcp`
**Disable all MCP servers, use native tools only**

**Purpose**: Maximum performance with Claude Code native tools
**Auto-Activation**: Never (explicit use only for performance optimization)
**Performance**: 40-60% faster execution with WebSearch fallback for documentation needs
**Use Case**: Simple operations, resource-constrained environments, rapid iteration

### `--no-[server]`
**Disable specific MCP server**

**Examples**: `--no-magic`, `--no-seq`, `--no-c7`, `--no-play`
**Purpose**: Selective server disabling for performance optimization
**Performance**: 10-30% faster execution per disabled server
**Fallback**: Server-specific fallback strategies maintain functionality

---

## Wave Orchestration Flags

### `--wave-mode [auto|force|off]`
**Control wave orchestration activation**

**Purpose**: Multi-stage execution with compound intelligence
**Options**:
- **auto**: Activates based on complexity >0.8 AND file_count >20 AND operation_types >2
- **force**: Override auto-detection for borderline cases requiring wave coordination
- **off**: Disable wave mode, use standard execution with optional sub-agent delegation

**Auto-Activation Triggers**:
- Comprehensive improvement requests with system-wide impact
- Multi-domain operations requiring coordinated expertise
- Enterprise-scale operations with >100 files and complexity >0.7

**Performance**: 30-50% better results through progressive enhancement and compound intelligence

### `--wave-strategy [progressive|systematic|adaptive|enterprise]`
**Select wave orchestration strategy**

**Progressive**: Iterative enhancement for incremental improvements and quality refinement
- **Use Case**: Gradual system improvement, technical debt reduction, performance optimization
- **Pattern**: Baseline → Incremental → Validation → Enhancement cycles

**Systematic**: Comprehensive methodical analysis for complex architectural problems
- **Use Case**: Root cause analysis, security audits, architectural reviews
- **Pattern**: Discovery → Analysis → Planning → Implementation → Validation

**Adaptive**: Dynamic configuration based on varying complexity and changing requirements
- **Use Case**: Mixed-complexity operations, evolving requirements, multi-phase projects
- **Pattern**: Assessment → Strategy → Execution → Adaptation → Optimization

**Enterprise**: Large-scale orchestration for >100 files with >0.7 complexity
- **Use Case**: Legacy modernization, system-wide transformations, compliance initiatives
- **Pattern**: Planning → Coordination → Parallel Execution → Integration → Validation

**Auto-Selection**: Automatically chooses strategy based on project characteristics and operation type

### `--wave-delegation [files|folders|tasks]`
**Control wave system delegation to sub-agents**

**Files**: Sub-agent delegates individual file analysis across wave stages
**Folders**: Sub-agent delegates directory-level analysis across wave phases  
**Tasks**: Sub-agent delegates by functional area (security, performance, quality, architecture)

**Integration**: Coordinates with `--delegate` flag for multi-phase execution optimization

---

## Sub-Agent Delegation Flags

### `--delegate [files|folders|auto]`
**Enable Task tool sub-agent delegation for parallel processing**

**Purpose**: Parallel task execution for improved performance and specialized expertise
**Options**:
- **files**: Individual file analysis delegation to specialized sub-agents
- **folders**: Directory-level analysis delegation for architectural understanding
- **auto**: Intelligent delegation strategy based on scope complexity and optimization opportunities

**Auto-Activation**:
- Directory count >7 detected in operation scope
- File count >50 requiring coordinated analysis
- Multi-domain operations requiring specialized expertise coordination

**Performance**: 40-70% time savings through parallel processing and specialized focus

### `--concurrency [n]`
**Control maximum concurrent sub-agents and tasks**

**Purpose**: Resource management for parallel execution optimization
**Range**: 1-15 concurrent sub-agents (default: 7)
**Auto-Adjustment**: Dynamic allocation based on system resources and complexity assessment
**Safety**: Prevents resource exhaustion while maximizing parallel efficiency

---

## Iterative Improvement Flags

### `--loop`
**Enable iterative improvement mode**

**Purpose**: Progressive refinement through multiple improvement cycles
**Auto-Activation**:
- Quality improvement keywords: polish, refine, enhance, improve, correct
- Iterative requests: "step by step", "incrementally", "progressively"
- Cleanup and refinement operations on existing code

**Compatible Commands**: `/improve`, `/refine`, `/enhance`, `/fix`, `/cleanup`, `/analyze`
**Default Behavior**: 3 iterations with automatic validation between cycles

### `--iterations [n]`
**Control number of improvement cycles**

**Range**: 1-10 iterations (default: 3)
**Purpose**: Explicit control over refinement depth and resource investment
**Integration**: Overrides intelligent defaults based on operation complexity assessment

### `--interactive`
**Enable user confirmation between iterations**

**Purpose**: Manual guidance and course correction capability
**Features**: 
- Pauses for review and approval before each improvement cycle
- Allows manual guidance and strategy adjustment
- Provides progress assessment and direction modification options

---

## Scope & Focus Flags

### `--scope [level]`
**Define operation scope and boundaries**

**file**: Single file analysis and modification
**module**: Module or directory-level operations
**project**: Entire project scope with cross-module coordination  
**system**: System-wide analysis with comprehensive coverage

### `--focus [domain]`
**Specify domain focus for specialized analysis**

**performance**: Performance optimization with metrics and benchmarking
**security**: Security analysis, hardening, and compliance validation
**quality**: Code quality, maintainability, and technical debt assessment
**architecture**: System design, structure, and pattern analysis
**accessibility**: UI/UX accessibility compliance and inclusive design
**testing**: Test coverage, quality, and comprehensive validation strategies

---

## Persona Activation Flags

### Available Persona Flags
- `--persona-architect`: Systems architecture and long-term design specialist
- `--persona-frontend`: UX specialist and accessibility advocate with performance focus
- `--persona-backend`: Reliability engineer and API specialist with security awareness
- `--persona-analyzer`: Root cause specialist with evidence-based methodology
- `--persona-security`: Threat modeling and vulnerability assessment expert
- `--persona-mentor`: Knowledge transfer specialist and educational guide
- `--persona-refactorer`: Code quality specialist and technical debt manager
- `--persona-performance`: Optimization specialist with metrics-driven approach
- `--persona-qa`: Quality advocate and comprehensive testing specialist
- `--persona-devops`: Infrastructure specialist and deployment automation expert
- `--persona-scribe=lang`: Professional writer and documentation specialist

**Language Support for Scribe**: `en`, `es`, `fr`, `de`, `ja`, `zh`, `pt`, `it`, `ru`, `ko`

**Auto-Activation Examples**:
- Performance issues → `--persona-performance` + `--focus performance`
- Security concerns → `--persona-security` + `--focus security`
- UI/UX tasks → `--persona-frontend` + `--magic`
- Complex debugging → `--persona-analyzer` + `--think` + `--seq`

---

## Introspection & Transparency Flags

### `--introspect` / `--introspection`
**Deep transparency mode exposing thinking process**

**Purpose**: Meta-cognitive analysis and framework transparency for troubleshooting
**Auto-Activation**:
- SuperClaude framework analysis and optimization work
- Complex debugging requiring decision process visibility
- Framework troubleshooting and performance analysis

**Features**:
- 🤔 **Thinking**: Cognitive process examination and reasoning analysis
- 🎯 **Decision**: Decision-making rationale and alternative consideration
- ⚡ **Action**: Action selection reasoning and execution strategy
- 📊 **Check**: Validation and quality assessment processes
- 💡 **Learning**: Knowledge integration and pattern recognition

**Output**: Conversational reflection with shared uncertainties and decision transparency

---

## Flag Integration Patterns

### Context-Based Auto-Activation

**Performance Issues** → `--persona-performance` + `--focus performance` + `--think`
- Trigger: Response time >500ms, error rate >1%, resource usage >75%
- Confidence: 85% for automatic activation

**Security Concerns** → `--persona-security` + `--focus security` + `--validate`
- Trigger: Vulnerability detection, authentication failures, compliance gaps
- Confidence: 90% for automatic activation with immediate priority

**UI/UX Tasks** → `--persona-frontend` + `--magic` + `--c7`
- Trigger: Component creation, responsive design, accessibility requirements
- Confidence: 80% for automatic activation with design system integration

**Complex Debugging** → `--think` + `--seq` + `--persona-analyzer`
- Trigger: Multi-component failures, root cause investigation needs
- Confidence: 75% for automatic activation with systematic analysis

### Resource-Based Auto-Activation

**High Token Usage** → `--uc` + appropriate efficiency flags
- Trigger: Context usage >75%, large-scale operations detected
- Strategy: Maintain information quality while optimizing resource usage

**Resource Constraints** → `--safe-mode` + `--validate`
- Trigger: Resource usage >85%, production environment detection
- Strategy: Conservative execution with comprehensive validation

**Complex Operations** → `--delegate` + `--wave-mode auto`
- Trigger: >7 directories OR >50 files OR complexity >0.8
- Strategy: Parallel processing with intelligent orchestration

### Integration Workflow

**Flag Resolution Process**:
1. Parse explicit user flags and validate compatibility
2. Analyze context for auto-activation triggers and patterns
3. Apply priority hierarchy to resolve conflicts
4. Coordinate with persona system for domain expertise
5. Configure MCP server integration based on requirements
6. Initialize performance optimization based on resource constraints
7. Execute with continuous monitoring and adaptive optimization

---

**SuperClaude Flags**: Intelligent automation with precise manual control.