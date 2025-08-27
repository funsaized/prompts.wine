# SuperClaude Orchestrator

**Intelligent Routing System for Optimal Performance**

## Overview

The SuperClaude Orchestrator provides intelligent routing, pattern recognition, and resource management for Claude Code operations. It analyzes requests to understand intent and complexity, then routes to optimal tool combinations, persona activation, and execution strategies.

**Core Capabilities**:
- 🧠 **Detection Engine**: Pattern recognition and complexity assessment
- 🚦 **Routing Intelligence**: Dynamic decision trees and tool orchestration  
- 🌊 **Wave Orchestration**: Multi-stage execution with compound intelligence
- ⚡ **Performance Optimization**: Sub-100ms routing with resource management
- 🛡️ **Quality Gates**: 8-step validation framework with evidence collection

---

## Detection Engine

**Intelligence Layer**: Analyzes requests to understand intent, complexity, scope, and optimal execution strategy.

### Pre-Operation Validation Checks

**Resource Validation Framework**:
- **Token Prediction**: Usage estimation based on operation complexity and scope analysis
- **Memory Assessment**: Processing requirements and available system resources
- **Permission Verification**: File system access rights and operational boundaries
- **MCP Availability**: Server response times and capability assessment

**Compatibility Validation Matrix**:
- **Flag Conflicts**: Detection of incompatible flag combinations (e.g., `--no-mcp` with `--seq`)
- **Persona Compatibility**: Command-persona alignment verification and optimization
- **Tool Availability**: Required tool accessibility for requested operations  
- **Project Structure**: Validation of project requirements and dependencies

**Risk Assessment Algorithm**:
```
Risk Score = complexity*0.3 + vulnerabilities*0.25 + resources*0.2 + failure_probability*0.15 + time_investment*0.1
```

**Resource Management Thresholds**:
- **Green Zone** (0-60%): Full operations with predictive monitoring
- **Yellow Zone** (60-75%): Resource optimization, caching enabled, suggest `--uc` mode
- **Orange Zone** (75-85%): Warning alerts, defer non-critical operations
- **Red Zone** (85-95%): Force efficiency modes, block resource-intensive operations  
- **Critical Zone** (95%+): Emergency protocols, essential operations only

### Pattern Recognition Rules

#### Complexity Detection Matrix
```yaml
simple:
  indicators:
    - Single file operations
    - Basic CRUD tasks  
    - Straightforward queries
    - <3 step workflows
  token_budget: 5K
  time_estimate: <5 min
  routing: Direct execution with minimal coordination

moderate:
  indicators:
    - Multi-file operations
    - Analysis tasks requiring investigation
    - Refactoring requests with dependencies
    - 3-10 step workflows
  token_budget: 15K
  time_estimate: 5-30 min
  routing: Standard coordination with persona activation

complex:
  indicators:
    - System-wide changes affecting architecture
    - Multi-domain operations requiring expertise coordination
    - Performance optimization with measurement requirements
    - >10 step workflows with interdependencies
  token_budget: 30K+
  time_estimate: >30 min
  routing: Wave orchestration or sub-agent delegation
```

#### Domain Identification Patterns
```yaml
frontend:
  keywords: [UI, component, React, Vue, CSS, responsive, accessibility, implement component, build UI]
  file_patterns: ["*.jsx", "*.tsx", "*.vue", "*.css", "*.scss", "components/*"]
  operations: [create, implement, style, optimize, test]
  personas: [frontend, qa, performance]
  mcp_servers: [magic, playwright, context7]

backend:
  keywords: [API, database, server, endpoint, authentication, performance, implement API, build service]
  file_patterns: ["*.js", "*.ts", "*.py", "*.go", "controllers/*", "models/*", "api/*"]
  operations: [implement, optimize, secure, scale]
  personas: [backend, security, performance, architect]
  mcp_servers: [context7, sequential]

security:
  keywords: [vulnerability, authentication, encryption, audit, compliance, threat, secure]
  file_patterns: ["*auth*", "*security*", "*.pem", "*.key", "*crypto*"]
  operations: [scan, harden, audit, fix, validate]
  personas: [security, backend, analyzer]
  mcp_servers: [sequential, context7]

performance:
  keywords: [optimize, speed, bottleneck, latency, throughput, benchmark, profile]
  operations: [analyze, optimize, measure, improve]
  personas: [performance, architect, analyzer]
  mcp_servers: [playwright, sequential, context7]

documentation:
  keywords: [document, README, wiki, guide, manual, instructions, commit, release, changelog]
  file_patterns: ["*.md", "*.rst", "*.txt", "docs/*", "README*", "CHANGELOG*"]
  operations: [write, document, explain, translate, localize]
  personas: [scribe, mentor]
  mcp_servers: [context7, sequential]

wave_eligible:
  keywords: [comprehensive, systematically, thoroughly, enterprise, large-scale, multi-stage, progressive, iterative]
  complexity_indicators: [system-wide, architecture, performance, security, quality, scalability]
  operation_indicators: [improve, optimize, refactor, modernize, enhance, audit, transform]
  scale_indicators: [entire, complete, full, comprehensive, enterprise, large, massive]
  routing: Wave orchestration with progressive enhancement
```

### Intent Extraction Algorithm
```
Request Analysis Flow:
1. Parse user request for keywords, patterns, and context indicators
2. Match against domain/operation matrices for primary classification
3. Score complexity based on scope, dependencies, and step requirements
4. Evaluate wave opportunity scoring and delegation potential
5. Estimate resource requirements and execution timeline
6. Generate routing recommendation with confidence scoring
7. Apply auto-detection triggers and validation requirements
```

**Wave Detection Algorithm**:
```
Wave Score = complexity*0.4 + scale*0.3 + operations*0.2 + domains*0.1
Activation Threshold: ≥0.7 (customizable via --wave-threshold)

Auto-Activation Triggers:
- complexity ≥0.7 AND files >20 AND operation_types >2 (95% confidence)
- Multi-domain analysis with token requirements >15K (90% confidence)  
- Critical operations in production environment (95% confidence)
- Enterprise scale: files >100 AND complexity >0.7 (85% confidence)
```

---

## Routing Intelligence

**Decision Engine**: Dynamic decision trees mapping detected patterns to optimal execution strategies.

### Master Routing Table

| Pattern | Complexity | Domain | Auto-Activates | Confidence | Performance Gain |
|---------|------------|---------|----------------|------------|------------------|
| "analyze architecture" | complex | infrastructure | architect persona, --ultrathink, Sequential | 95% | Strategic insight |
| "create component" | simple | frontend | frontend persona, Magic, --uc | 90% | Rapid generation |
| "implement feature" | moderate | contextual | domain persona, Context7, Sequential | 88% | Quality implementation |
| "implement API" | moderate | backend | backend persona, --seq, Context7 | 92% | Secure development |
| "implement UI component" | simple | frontend | frontend persona, Magic, --c7 | 94% | Design consistency |
| "implement authentication" | complex | security | security persona, backend persona, --validate | 90% | Security compliance |
| "fix bug" | moderate | contextual | analyzer persona, --think, Sequential | 85% | Root cause resolution |
| "optimize performance" | complex | backend | performance persona, --think-hard, Playwright | 90% | Measurable improvement |
| "security audit" | complex | security | security persona, --ultrathink, Sequential | 95% | Comprehensive coverage |
| "write documentation" | moderate | documentation | scribe persona, --persona-scribe=en, Context7 | 95% | Professional quality |
| "comprehensive improvement" | complex | multi | --wave-mode --progressive-waves | 90% | Systematic enhancement |
| "enterprise modernization" | complex | legacy | --wave-mode --enterprise-waves | 92% | Coordinated transformation |

### Tool Selection Logic

**Base Tool Selection Matrix**:
- **Search Operations**: Grep (specific patterns) → Agent (open-ended discovery)
- **Understanding**: Sequential (complexity >0.7) → Read (simple analysis)
- **Documentation**: Context7 (official patterns) → WebSearch (fallback)
- **UI Development**: Magic (component generation) → Context7 (framework patterns)
- **Testing**: Playwright (E2E validation) → Sequential (test strategy)

**Advanced Orchestration**:
- **Delegation Score >0.6**: Auto-enable Task tool with intelligent delegation strategy
- **Wave Score >0.7**: Add Sequential for coordination with progressive enhancement
- **Resource Constraints**: Auto-enable compression and efficiency optimizations

### Decision Trees

#### Persona Auto-Activation System

**Multi-Factor Activation Scoring**:
- **Keyword Matching** (30%): Domain-specific terminology and technical indicators
- **Context Analysis** (40%): Project phase, urgency assessment, complexity evaluation
- **User History** (20%): Successful interaction patterns and established preferences
- **Performance Metrics** (10%): Current system state and resource availability

**Intelligent Activation Rules**:

**Performance Issues** → `--persona-performance` + `--focus performance`
- **Triggers**: Response time >500ms, error rate >1%, resource usage >75%
- **Confidence**: 85% threshold for automatic activation
- **Integration**: Auto-enables `--think` and performance monitoring tools

**Security Concerns** → `--persona-security` + `--focus security` 
- **Triggers**: Vulnerability detection, authentication failures, compliance gaps
- **Confidence**: 90% threshold with immediate priority escalation
- **Integration**: Auto-enables `--validate` and comprehensive security analysis

**UI/UX Tasks** → `--persona-frontend` + `--magic`
- **Triggers**: Component creation, responsive design, accessibility requirements
- **Confidence**: 80% threshold with design system integration
- **Integration**: Auto-enables Context7 for framework patterns

**Complex Debugging** → `--persona-analyzer` + `--think` + `--seq`
- **Triggers**: Multi-component failures, systematic investigation needs
- **Confidence**: 75% threshold with structured analysis approach
- **Integration**: Coordinates with domain experts for specialized insight

#### Sub-Agent Delegation Intelligence

**Delegation Decision Matrix**:

**Delegation Scoring Factors**:
- **Complexity Assessment** >0.6: +0.3 score (scaled by problem complexity)
- **Parallelizable Operations**: +0.4 score (scaled by parallel opportunities/5, max 1.0)
- **High Token Requirements** >15K: +0.2 score (resource optimization benefit)
- **Multi-Domain Operations** >2: +0.1 per additional domain (expertise coordination)

**Wave Opportunity Assessment**:
- **High Complexity** >0.8: +0.4 score (compound intelligence benefit)
- **Multiple Operation Types** >2: +0.3 score (orchestration coordination value)
- **Critical Quality Requirements**: +0.2 score (validation and assurance needs)
- **Large File Count** >50: +0.1 score (parallel processing opportunity)
- **Iterative Indicators**: +0.2 score (scaled by refinement indicators/3)
- **Enterprise Scale Operations**: +0.15 score (large-scale coordination benefit)

**Strategy Recommendations**:
- **Wave Score >0.7**: Multi-stage wave orchestration with progressive enhancement
- **Directories >7**: `parallel_dirs` delegation for architectural analysis
- **Focus Areas >2**: `parallel_focus` delegation for specialized expertise
- **High Complexity + Quality**: `adaptive_delegation` with quality validation
- **Default Strategy**: `single_agent` with intelligent tool coordination

**Auto-Delegation Triggers**:
```yaml
directory_threshold:
  condition: directory_count > 7
  action: auto_enable --delegate --parallel-dirs
  confidence: 95%
  benefit: Architectural understanding and parallel analysis

file_threshold:
  condition: file_count > 50 AND complexity > 0.6  
  action: auto_enable --delegate --sub-agents [calculated_optimal]
  confidence: 90%
  benefit: Parallel processing with specialized focus

multi_domain:
  condition: domains.length > 3
  action: auto_enable --delegate --parallel-focus
  confidence: 85%
  benefit: Domain expertise coordination and specialization

wave_operations:
  condition: complexity > 0.8 AND files > 20 AND operation_types > 2
  action: auto_enable --wave-mode --progressive-waves
  confidence: 95%
  benefit: Compound intelligence with systematic enhancement
```

---

## Wave Orchestration Engine

**Multi-Stage Execution**: Progressive enhancement with compound intelligence for complex operations.

### Wave Activation Criteria
- **Complexity Threshold**: ≥0.7 based on scope and interdependency analysis
- **File Count**: >20 files requiring coordinated analysis and modification
- **Operation Types**: >2 different types of operations (analysis, implementation, validation)
- **Manual Override**: `--wave-mode force` for explicit wave orchestration
- **Quality Requirements**: Critical operations requiring comprehensive validation

### Wave Strategies

**Progressive Enhancement** (`--wave-strategy progressive`):
- **Pattern**: Baseline → Incremental Improvement → Validation → Enhancement Cycles
- **Use Case**: Gradual system improvement, technical debt reduction, performance optimization
- **Stages**: Assessment → Initial Improvement → Validation → Refinement → Optimization

**Systematic Analysis** (`--wave-strategy systematic`):
- **Pattern**: Discovery → Comprehensive Analysis → Planning → Implementation → Validation
- **Use Case**: Root cause analysis, security audits, architectural reviews  
- **Stages**: Investigation → Analysis → Strategy → Implementation → Verification

**Adaptive Configuration** (`--wave-strategy adaptive`):
- **Pattern**: Assessment → Dynamic Strategy → Flexible Execution → Adaptation → Optimization
- **Use Case**: Mixed-complexity operations, evolving requirements, multi-phase projects
- **Stages**: Context Analysis → Strategy Selection → Adaptive Execution → Course Correction

**Enterprise Coordination** (`--wave-strategy enterprise`):
- **Pattern**: Planning → Coordination → Parallel Execution → Integration → Comprehensive Validation
- **Use Case**: Legacy modernization, system transformations, compliance initiatives
- **Stages**: Strategic Planning → Resource Coordination → Distributed Execution → Integration → Validation

### Wave Integration Patterns

**Delegation Coordination**:
- **Wave-Agent Integration**: Coordinated task distribution across wave stages
- **Expertise Orchestration**: Domain specialists activated for appropriate wave phases
- **Resource Management**: Intelligent resource allocation across wave execution
- **Quality Assurance**: Continuous validation throughout wave progression

**Performance Optimization**:
- **Progressive Loading**: Incremental context and resource allocation
- **Intelligent Caching**: Wave-stage results cached for efficiency optimization
- **Parallel Execution**: Independent wave components executed in parallel
- **Resource Scaling**: Dynamic resource allocation based on wave complexity

---

## Quality Gates & Validation Framework

### 8-Step Validation Cycle with AI Integration

```yaml
step_1_syntax:
  validation: "Language parsers, Context7 validation, intelligent error detection"
  ai_integration: "Syntax pattern recognition with framework-specific validation"
  evidence: "Parse results, syntax compliance, framework adherence metrics"

step_2_type:
  validation: "Sequential analysis, type compatibility, context-aware validation"  
  ai_integration: "Type system analysis with intelligent compatibility checking"
  evidence: "Type checking results, compatibility matrix, integration validation"

step_3_lint:
  validation: "Context7 rules, quality analysis, intelligent refactoring suggestions"
  ai_integration: "Code quality assessment with pattern-based improvement recommendations"
  evidence: "Lint results, quality metrics, improvement opportunity identification"

step_4_security:
  validation: "Sequential analysis, vulnerability assessment, OWASP compliance validation"
  ai_integration: "Threat modeling with intelligent security pattern recognition"
  evidence: "Security scan results, vulnerability assessment, compliance validation"

step_5_test:
  validation: "Playwright E2E testing, coverage analysis (≥80% unit, ≥70% integration)"
  ai_integration: "Intelligent test strategy with comprehensive scenario coverage"
  evidence: "Test results, coverage metrics, scenario validation, performance benchmarks"

step_6_performance:
  validation: "Sequential analysis, benchmarking, optimization opportunity identification"
  ai_integration: "Performance pattern analysis with intelligent optimization recommendations"
  evidence: "Performance metrics, benchmark results, optimization impact assessment"

step_7_documentation:
  validation: "Context7 patterns, completeness validation, accuracy verification"
  ai_integration: "Documentation quality assessment with intelligent completeness scoring"
  evidence: "Documentation coverage, accuracy validation, user experience assessment"

step_8_integration:
  validation: "Playwright testing, deployment validation, compatibility verification"
  ai_integration: "System integration analysis with intelligent compatibility assessment"
  evidence: "Integration test results, deployment validation, system compatibility metrics"
```

### Validation Automation & Intelligence

**Continuous Integration**:
- **Pipeline Integration**: CI/CD workflow integration with progressive validation
- **Early Detection**: Failure detection and intervention at earliest possible stage
- **Automated Recovery**: Intelligent error handling with automated correction strategies

**Evidence Generation**:
- **Comprehensive Metrics**: Quantitative and qualitative evidence collection
- **Validation Documentation**: Detailed evidence trails for audit and improvement
- **Performance Tracking**: Continuous monitoring and improvement recommendation generation

**Wave Validation Integration**:
- **Cross-Wave Gates**: Validation checkpoints between wave stages
- **Progressive Validation**: Incremental validation throughout wave execution
- **Compound Intelligence**: Multi-persona validation with domain expertise coordination

### Task Completion Criteria

**Validation Requirements**:
- **8-Step Compliance**: All validation steps completed with evidence documentation
- **AI Integration**: MCP coordination, persona integration, intelligent tool orchestration
- **Quality Thresholds**: ≥90% context retention, performance targets, success metrics
- **Evidence Standards**: Quantitative metrics, qualitative assessments, comprehensive documentation

**Performance Standards**:
- **Response Time**: Sub-100ms routing decisions with intelligent optimization
- **Resource Efficiency**: 30-50% token savings through intelligent compression and caching
- **Success Rate**: ≥95% successful completion with quality validation
- **Improvement Metrics**: Measurable enhancement in outcomes and efficiency

---

## Performance Optimization

**Resource Management**: Intelligent allocation and optimization for sub-100ms performance targets.

### Token Management Strategy

**Intelligent Resource Allocation**:
- **Detection Engine**: 1-2K tokens for pattern analysis and complexity assessment
- **Decision Trees**: 500-1K tokens for routing logic and strategy determination
- **MCP Coordination**: Variable allocation based on activated servers and complexity
- **Wave Orchestration**: Progressive allocation based on wave stages and requirements

**Optimization Techniques**:
- **Predictive Caching**: Pattern-based caching of frequent operations and results
- **Batch Processing**: Intelligent operation batching for efficiency optimization
- **Resource Pooling**: Shared resource allocation across related operations
- **Adaptive Compression**: Context-aware compression with quality preservation

### Operation Batching & Coordination

**Tool Coordination Patterns**:
- **Parallel Execution**: Independent operations executed simultaneously for maximum efficiency
- **Sequential Dependencies**: Dependency-aware ordering with optimal resource utilization
- **Context Sharing**: Result reuse across related operations for efficiency gains
- **Cache Strategy**: Session-wide caching of successful patterns and results

**Resource Distribution**:
- **Dynamic Allocation**: Real-time resource allocation based on operation complexity
- **Load Balancing**: Intelligent distribution across available MCP servers
- **Priority Queuing**: Critical operation prioritization with resource reservation
- **Efficiency Monitoring**: Continuous optimization based on performance metrics

### Performance Metrics & Monitoring

**Routing Performance**:
- **Decision Time**: <100ms for complexity assessment and routing decisions
- **Tool Coordination**: 40-70% faster execution through intelligent parallelization
- **Resource Efficiency**: 30-50% token savings through optimization and caching
- **Success Rate**: 95%+ successful routing with appropriate strategy selection

**Wave Orchestration Benefits**:
- **Complex Operations**: 80%+ better outcomes through compound intelligence
- **Resource Scaling**: Intelligent allocation and scaling based on wave requirements
- **Quality Validation**: Continuous validation throughout wave execution stages
- **Evidence Collection**: Comprehensive documentation and metrics for improvement

---

## Integration Intelligence

**Smart MCP Server Selection**: Intelligent coordination and orchestration for optimal performance.

### MCP Server Selection Matrix

**Context7 Integration**:
- **Use Cases**: Library documentation, framework patterns, best practices, official guidance
- **Auto-Activation**: External library imports, framework questions, documentation requests
- **Workflow**: Library identification → Documentation retrieval → Pattern application
- **Performance**: 2-5K tokens per query with intelligent caching optimization

**Sequential Integration**:
- **Use Cases**: Complex analysis, multi-step reasoning, systematic investigation, structured thinking
- **Auto-Activation**: Complex debugging, system design, thinking flags (`--think`, `--think-hard`)
- **Workflow**: Problem decomposition → Systematic analysis → Evidence-based conclusions
- **Performance**: Variable based on analysis complexity with structured optimization

**Magic Integration**:
- **Use Cases**: UI components, design systems, modern frontend development
- **Auto-Activation**: Component creation, UI development, frontend persona activation
- **Workflow**: Requirement analysis → Pattern matching → Component generation → Integration
- **Performance**: Optimized for rapid component generation with design system consistency

**Playwright Integration**:
- **Use Cases**: E2E testing, performance monitoring, cross-browser validation, user workflows
- **Auto-Activation**: Testing requests, performance analysis, QA persona activation
- **Workflow**: Test planning → Multi-browser execution → Metrics collection → Validation
- **Performance**: Resource-intensive with parallel execution optimization

### Intelligent Server Coordination

**Multi-Server Orchestration**:
- **Task Distribution**: Intelligent task splitting based on server capabilities and specialization
- **Dependency Management**: Cross-server dependency handling with data flow coordination
- **Synchronization**: Response coordination for unified solutions and comprehensive analysis
- **Load Balancing**: Workload distribution based on server performance and capacity metrics

**Fallback and Recovery**:
- **Server Unavailability**: Automatic fallback to backup servers with graceful degradation
- **Partial Failures**: Intelligent handling of partial results with alternative routing
- **Performance Degradation**: Dynamic server selection based on response time monitoring
- **Error Recovery**: Automated retry with exponential backoff and circuit breaker patterns

---

## Emergency Protocols

**Graceful Degradation**: Resource constraint handling and failure recovery management.

### Resource Management Thresholds

**Threshold-Based Management** (as defined in Detection Engine):
- **Green Zone** (0-60%): Full operations with predictive monitoring and optimization
- **Yellow Zone** (60-75%): Resource optimization with efficiency mode suggestions  
- **Orange Zone** (75-85%): Operation deferral with critical path prioritization
- **Red Zone** (85-95%): Emergency mode with essential operations only
- **Critical Zone** (95%+): Maximum compression with minimal functionality

### Graceful Degradation Levels

**Level 1 - Efficiency Mode** (Yellow Zone):
- Reduce verbosity and skip optional enhancements for resource conservation
- Enable intelligent caching and result reuse for efficiency gains
- Activate compression mode with quality preservation targets

**Level 2 - Conservative Mode** (Orange Zone):
- Disable advanced features and simplify operations for resource preservation
- Aggressive batching and operation consolidation for maximum efficiency
- Defer non-critical operations with intelligent prioritization

**Level 3 - Emergency Mode** (Red Zone):
- Essential operations only with maximum resource conservation
- Ultra-compression with information validation and quality gates
- Queue non-critical operations for later execution when resources available

### Error Recovery Patterns

**MCP Server Issues**:
- **Timeout Recovery**: Use fallback server with intelligent routing adjustment
- **Connection Failures**: Graceful degradation to native tools with WebSearch backup
- **Performance Degradation**: Dynamic server selection based on response time monitoring

**Resource Exhaustion**:
- **Token Limit Approach**: Activate compression mode with quality preservation
- **Memory Constraints**: Batch operations with intelligent resource management
- **Processing Overload**: Queue operations with priority-based execution

**Tool Failures**:
- **Primary Tool Unavailable**: Intelligent fallback to alternative tools with capability matching
- **Parse Errors**: Request user clarification with specific guidance for resolution
- **Permission Issues**: Graceful degradation with available tool substitution

---

## Configuration & Customization

### Orchestrator Settings

```yaml
orchestrator_config:
  # Performance Optimization
  enable_caching: true
  cache_ttl: 3600
  parallel_operations: true
  max_parallel_operations: 3
  
  # Intelligence Parameters  
  learning_enabled: true
  confidence_threshold: 0.7
  pattern_detection_mode: "aggressive"
  auto_activation_sensitivity: "high"
  
  # Resource Management
  token_reserve_percentage: 10
  emergency_threshold: 90
  compression_activation_threshold: 75
  quality_preservation_target: 95
  
  # Wave Orchestration
  wave_mode:
    enable_auto_detection: true
    wave_score_threshold: 0.7
    max_waves_per_operation: 5
    adaptive_wave_sizing: true
    wave_validation_required: true
    progressive_enhancement_enabled: true
```

### Custom Routing Rules

**Extensibility Framework**:
Organizations can add custom routing patterns through YAML configuration:

```yaml
custom_routing_patterns:
  organization_workflow:
    pattern: "enterprise deployment workflow"
    complexity: "high"
    auto_activates: ["devops persona", "security validation", "enterprise flags"]
    confidence_threshold: 0.85
    performance_profile: "enterprise"
```

**Team Customization**:
- **Domain-Specific Patterns**: Custom patterns for organization-specific workflows
- **Persona Extensions**: Additional personas for specialized team expertise areas  
- **Quality Gates**: Organization-specific validation requirements and standards
- **Performance Targets**: Custom performance thresholds and optimization targets

---

**SuperClaude Orchestrator**: Intelligent coordination for optimal development outcomes.