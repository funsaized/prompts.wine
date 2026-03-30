---
title: "CrewAI Examples"
source: "https://github.com/crewAIInc/crewAI-examples"
category: "workflows"
tags:
  - multi-agent
  - crewai
  - examples
  - code
---

Welcome to the official collection of complete CrewAI applications. This repository contains end-to-end implementations that showcase how to build real-world applications using CrewAI's framework for orchestrating AI agents.

## Example Categories

### Advanced Orchestration Examples (Flows)

- **Content Creator Flow** - Multi-crew content generation system for blogs, LinkedIn posts, and research reports
- **Email Auto Responder Flow** - Automated email monitoring and response generation
- **Lead Score Flow** - Lead qualification with human-in-the-loop review
- **Meeting Assistant Flow** - Meeting notes processing with Trello/Slack integration
- **Self Evaluation Loop Flow** - Iterative content improvement with self-review
- **Write a Book with Flows** - Automated book writing with parallel chapter generation

### Traditional CrewAI Implementations

- **Game Builder Crew** - Multi-agent team that designs and builds Python games
- **Instagram Post** - Creative social media content generation
- **Landing Page Generator** - Full landing page creation from concepts
- **Marketing Strategy** - Comprehensive marketing campaign development
- **Screenplay Writer** - Convert text/emails into screenplay format
- **Job Posting** - Automated job description creation
- **Prep for a Meeting** - Meeting preparation research and strategy
- **Recruitment** - Automated candidate sourcing and evaluation
- **Stock Analysis** - Financial analysis with SEC data integration
- **Industry Agents** - Industry-specific agent implementations
- **Match Profile to Positions** - CV-to-job matching with vector search
- **Markdown Validator** - Automated markdown validation and correction
- **Surprise Trip** - Personalized surprise travel planning
- **Trip Planner** - Destination comparison and itinerary optimization
- **Starter Template** - Basic template for new CrewAI projects

### Integrations

- **CrewAI-LangGraph** - Integration with LangGraph framework
- **Azure Model** - Using CrewAI with Azure OpenAI
- **NVIDIA Models** - Integration with NVIDIA's AI ecosystem

## Key Patterns Demonstrated

- **Configuration**: Most examples use YAML files for agent/task definitions
- **Tools**: Examples showcase integration with APIs, databases, and file systems
- **Flows**: Advanced examples demonstrate state management and orchestration
- **Training**: Several examples include agent training capabilities

## Getting Started

```bash
git clone https://github.com/crewAIInc/crewAI-examples.git
cd crewAI-examples
```

For multi-crew orchestration → check `/flows`
For standard crews → check `/crews`
For platform integrations → check `/integrations`

**Installation with UV:**
```bash
cd crews/marketing_strategy
uv sync  # Installs all dependencies and creates virtual environment
```

## Recommended Starting Points

Beginner:
- Starter Template - Basic crew structure
- Instagram Post - Simple content creation
- Job Posting - Straightforward business use case

Intermediate:
- Marketing Strategy - Multi-agent collaboration
- Self Evaluation Loop Flow - Iterative workflows
- Stock Analysis - External API integration

Advanced:
- Content Creator Flow - Multi-crew orchestration with dynamic routing
- Write a Book with Flows - Complex parallel execution
- Lead Score Flow - Human-in-the-loop patterns
- CrewAI-LangGraph - Framework integration
