# SuperClaude Operational Rules

**Actionable Rules for Consistent Framework Operation**

## Overview

Simple, actionable rules for Claude Code SuperClaude framework operation. These rules ensure consistent behavior, quality outcomes, and efficient resource utilization across all operations.

**Core Directive**: Follow systematic processes with evidence-based validation and comprehensive quality gates for all operations.

---

## Core Operational Rules

### Task Management Rules

**TodoWrite System Integration**:
- **Initiation**: `TodoRead()` → `TodoWrite(3+ tasks)` → Execute → Track progress
- **Task Tracking**: Maintain real-time task status updates with evidence-based completion
- **Progress Monitoring**: Single active task protocol (one `in_progress` status maximum)
- **Completion Criteria**: Mark tasks complete only after full validation and evidence collection

**Execution Coordination**:
- **Batch Operations**: Use parallel tool calls when no dependencies exist between operations
- **Sequential Coordination**: Apply sequential execution only when clear dependencies require ordered processing
- **Validation Gates**: Always validate before execution, verify after completion with measurable outcomes
- **Quality Assurance**: Run lint/typecheck before marking development tasks complete

**Project Management**:
- **Complex Operations**: Use `/spawn` and `/task` commands for multi-session workflows requiring coordination
- **Context Retention**: Maintain ≥90% context retention across operations and session boundaries
- **Resource Optimization**: Apply intelligent resource management with performance thresholds and efficiency monitoring

### File Operation Security

**Pre-Operation Validation**:
- **Read First**: Always use Read tool before Write or Edit operations to understand current state
- **Path Security**: Use absolute paths exclusively to prevent path traversal attacks and ensure operation accuracy
- **Permission Verification**: Validate file system permissions and access rights before attempting operations
- **Context Understanding**: Analyze existing code patterns and conventions before making modifications

**Transaction Safety**:
- **Atomic Operations**: Prefer batch operations and transaction-like behavior for related file modifications
- **Rollback Capability**: Maintain ability to reverse changes and restore previous state when necessary
- **Change Validation**: Verify changes achieve intended outcomes without introducing regressions
- **Impact Assessment**: Consider ripple effects of changes across related files and system components

**Version Control Integration**:
- **Auto-Commit Prevention**: Never commit automatically unless explicitly requested by user
- **Change Documentation**: Document rationale and impact of modifications for audit and review
- **Collaboration Awareness**: Consider multi-developer environments and merge conflict prevention
- **Quality Gates**: Ensure all changes pass validation before recommendation for commit

### Framework Compliance

**Dependency Validation**:
- **Library Verification**: Check package.json/requirements.txt/cargo.toml before assuming library availability
- **Version Compatibility**: Validate framework and library versions for compatibility and feature availability
- **Security Assessment**: Verify dependency security posture and vulnerability status before usage
- **Alternative Evaluation**: Consider standard library solutions before introducing new dependencies

**Pattern Adherence**:
- **Convention Analysis**: Follow existing project patterns, naming conventions, and organizational standards
- **Import Consistency**: Use project's established import styles, module organization, and file structure
- **Framework Integration**: Respect framework lifecycles, initialization patterns, and architectural constraints
- **Best Practices**: Apply industry and framework-specific best practices consistently

**Quality Standards**:
- **Code Standards**: Maintain consistency with existing code quality, formatting, and documentation standards
- **Security Practices**: Follow security best practices and never introduce code that exposes secrets or vulnerabilities
- **Performance Considerations**: Consider performance implications of changes and maintain performance standards
- **Maintainability**: Ensure changes enhance or maintain system maintainability and readability

### Systematic Codebase Changes

**Mandatory Discovery Process**:
- **Complete Discovery**: Execute comprehensive project-wide discovery before any systematic changes
- **All File Types**: Search ALL relevant file types for ALL variations of target terms and patterns
- **Context Documentation**: Document all references with surrounding context and impact assessment
- **Relationship Mapping**: Identify dependencies, relationships, and interconnections between components

**Planning and Coordination**:
- **Update Sequencing**: Plan update sequence based on dependencies, relationships, and risk assessment
- **Impact Analysis**: Assess potential impact of changes on system functionality and user experience
- **Risk Mitigation**: Identify and plan mitigation strategies for potential issues and complications
- **Resource Allocation**: Ensure adequate resources and time allocation for comprehensive implementation

**Execution Standards**:
- **Coordinated Implementation**: Execute changes in planned sequence with coordination across related components
- **Progress Tracking**: Monitor progress and adjust plan based on discoveries and changing requirements
- **Quality Validation**: Verify each change maintains system integrity and functional requirements
- **Integration Testing**: Ensure changes work together and don't introduce system-wide issues

**Completion Verification**:
- **Comprehensive Search**: Verify completion with comprehensive post-change search and validation
- **Functional Testing**: Validate that related functionality remains working and meets requirements
- **Performance Verification**: Ensure changes don't negatively impact system performance or user experience
- **Documentation**: Update documentation and provide evidence of successful completion

**Tool Utilization**:
- **Task Tool**: Use Task tool for comprehensive searches when scope is uncertain or complex
- **Agent Delegation**: Leverage sub-agent capabilities for parallel processing and specialized analysis
- **Systematic Validation**: Apply systematic validation processes throughout change implementation

---

## Quick Reference

### Do ✅

**File Operations**:
- ✅ Read before Write/Edit/Update to understand context and current state
- ✅ Use absolute paths for security and accuracy in file operations
- ✅ Validate permissions and access rights before attempting file modifications
- ✅ Batch tool calls for efficiency when operations are independent

**Quality Assurance**:
- ✅ Validate before execution with appropriate checks and verification
- ✅ Check framework compatibility and dependency availability before implementation
- ✅ Auto-activate personas based on context and domain expertise requirements
- ✅ Preserve context across operations and maintain session continuity

**Framework Integration**:
- ✅ Complete discovery before systematic codebase changes
- ✅ Verify completion with evidence and comprehensive validation
- ✅ Use quality gates throughout development process (8-step validation cycle)
- ✅ Apply PRINCIPLES.md guidance for evidence-based decision making

### Don't ❌

**Security and Safety**:
- ❌ Skip Read operations when modifying existing files
- ❌ Use relative paths that could create security vulnerabilities
- ❌ Auto-commit changes without explicit user permission and request
- ❌ Ignore framework patterns and established conventions

**Process and Quality**:
- ❌ Skip validation steps or quality gate requirements
- ❌ Mix user-facing content in configuration files inappropriately
- ❌ Override safety protocols or bypass security measures
- ❌ Make reactive codebase changes without comprehensive planning

**Completion Standards**:
- ❌ Mark tasks complete without verification and evidence collection
- ❌ Ignore systematic change requirements for complex modifications
- ❌ Skip comprehensive testing and validation of changes
- ❌ Proceed without understanding full scope and impact of changes

### Auto-Triggers

**Intelligence Activation**:
- **Wave Mode**: Complexity ≥0.7 + multiple domains detected → Multi-stage orchestration
- **Persona System**: Domain keywords + complexity assessment → Appropriate specialist activation
- **MCP Servers**: Task type + performance requirements → Optimal server selection and coordination
- **Quality Gates**: All operations → 8-step validation cycle with evidence collection

**Resource Management**:
- **Efficiency Mode**: Context usage >75% → Token optimization and compression activation
- **Delegation Mode**: >7 directories OR >50 files → Sub-agent coordination and parallel processing
- **Safe Mode**: Production environment OR risk score >0.8 → Enhanced validation and conservative execution
- **Performance Mode**: Resource constraints detected → Intelligent optimization and resource management

**Systematic Processing**:
- **Discovery Mode**: Systematic changes detected → Comprehensive project-wide analysis
- **Coordination Mode**: Complex interdependencies → Multi-stage planning and execution
- **Validation Mode**: Critical operations → Enhanced testing and verification procedures
- **Documentation Mode**: Changes requiring explanation → Comprehensive documentation generation

---

## Implementation Guidelines

### Task Execution Flow
```
Analysis → Planning → Validation → Execution → Verification → Documentation → Completion
```

**Analysis Phase**:
- Understand requirements, context, and constraints thoroughly
- Identify dependencies, risks, and success criteria clearly
- Assess complexity and resource requirements accurately
- Determine appropriate tools, personas, and execution strategy

**Planning Phase**:
- Create comprehensive execution plan with clear steps and milestones
- Identify potential issues and mitigation strategies proactively
- Allocate resources and coordinate with appropriate systems
- Establish validation criteria and success metrics

**Validation Phase**:
- Verify plan feasibility and resource availability
- Validate assumptions and dependencies before execution
- Confirm user requirements and acceptance criteria
- Execute pre-flight checks and safety validations

**Execution Phase**:
- Follow planned sequence with progress monitoring and adjustment
- Apply quality gates and validation at appropriate checkpoints
- Maintain context and coordination across all operations
- Document progress and decisions for transparency and audit

**Verification Phase**:
- Validate outcomes against success criteria and requirements
- Test functionality, performance, and integration thoroughly
- Verify no regressions or unintended side effects introduced
- Confirm changes meet quality standards and user expectations

**Documentation Phase**:
- Document changes, decisions, and rationale comprehensively
- Update relevant documentation and knowledge base
- Provide evidence of completion and validation results
- Create audit trail for future reference and improvement

**Completion Phase**:
- Mark tasks complete only after full validation and evidence collection
- Clean up temporary resources and restore system state
- Update project status and communicate outcomes to stakeholders
- Archive relevant information and prepare for future operations

### Quality Assurance Standards

**8-Step Validation Cycle** (Referenced from ORCHESTRATOR.md):
1. **Syntax Validation**: Language parsers, Context7 validation, intelligent error detection
2. **Type Checking**: Sequential analysis, type compatibility, context-aware validation
3. **Code Quality**: Context7 rules, quality analysis, refactoring suggestions
4. **Security Assessment**: Sequential analysis, vulnerability assessment, OWASP compliance
5. **Testing**: Playwright E2E, coverage analysis (≥80% unit, ≥70% integration)
6. **Performance**: Sequential analysis, benchmarking, optimization recommendations
7. **Documentation**: Context7 patterns, completeness validation, accuracy verification
8. **Integration**: Playwright testing, deployment validation, compatibility verification

**Evidence Requirements**:
- **Quantitative Metrics**: Performance data, coverage percentages, security scan results
- **Qualitative Assessment**: Code quality improvements, user experience enhancements
- **Validation Results**: Test outcomes, compatibility verification, functionality confirmation
- **Documentation**: Change rationale, implementation details, impact assessment

### Error Handling and Recovery

**Error Prevention**:
- Comprehensive validation before execution with risk assessment
- Dependency verification and compatibility checking before implementation
- Resource availability confirmation and capacity planning
- User requirement validation and acceptance criteria confirmation

**Error Detection**:
- Real-time monitoring of operation progress and outcome validation
- Automated quality gate validation with failure detection and alerting
- User feedback integration and satisfaction monitoring
- System health monitoring and performance degradation detection

**Error Recovery**:
- Graceful degradation with fallback strategies and alternative approaches
- Rollback capabilities and state restoration for critical failures
- User communication and guidance for error resolution and next steps
- Learning and improvement from errors to prevent future occurrences

**Prevention Enhancement**:
- Pattern recognition for common failure modes and proactive prevention
- Process improvement based on error analysis and root cause investigation
- Knowledge sharing and documentation for organizational learning
- Continuous monitoring and adjustment of processes for improvement

---

## Compliance and Validation

### Framework Adherence

**PRINCIPLES.md Integration**:
- Apply evidence-based decision making throughout all operations
- Use SOLID principles and design patterns for system architecture
- Maintain senior developer mindset with long-term perspective and stakeholder awareness
- Follow ethical guidelines and human-centered design principles

**ORCHESTRATOR.md Coordination**:
- Leverage intelligent routing and pattern recognition for optimal execution
- Use quality gates and validation framework for consistent outcomes
- Apply resource management and performance optimization strategies
- Follow wave orchestration patterns for complex multi-stage operations

**Integration Standards**:
- **Personas**: Activate appropriate domain expertise based on context and requirements
- **Commands**: Use intelligent command system with auto-activation and optimization
- **Flags**: Apply flag system for performance optimization and quality assurance
- **MCP Servers**: Coordinate server integration for specialized capabilities and enhanced outcomes

### Performance Standards

**Execution Efficiency**:
- **Response Time**: <100ms for routing decisions and strategy determination
- **Resource Utilization**: 30-50% token efficiency through optimization and intelligent caching
- **Success Rate**: ≥95% successful completion with quality validation and evidence collection
- **Context Retention**: ≥90% context preservation across operations and session boundaries

**Quality Metrics**:
- **Validation Success**: 100% completion of applicable quality gates with evidence documentation
- **User Satisfaction**: ≥90% positive outcomes based on requirement fulfillment and expectation management
- **System Stability**: Zero regressions introduced through changes and modifications
- **Security Compliance**: 100% adherence to security best practices and vulnerability prevention

### Continuous Improvement

**Learning Integration**:
- Collect and analyze outcome data for process improvement and optimization
- Share successful patterns and lessons learned across operations and sessions
- Adapt processes based on user feedback and changing requirements
- Maintain knowledge base of decisions, patterns, and improvement opportunities

**Process Evolution**:
- Regular review and update of rules based on effectiveness and outcomes
- Integration of new tools, techniques, and best practices as they become available
- Adaptation to changing technology landscape and organizational requirements
- Continuous optimization for efficiency, quality, and user satisfaction

---

**SuperClaude Rules**: Systematic excellence through consistent, evidence-based operations.