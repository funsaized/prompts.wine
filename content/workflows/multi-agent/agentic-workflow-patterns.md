---
title: "Agentic Workflow Patterns"
source: "https://github.com/arunpshankar/Agentic-Workflow-Patterns"
category: "workflows"
tags:
  - multi-agent
  - workflow-patterns
  - python
  - design-patterns
  - orchestration
---

Agentic Workflow Patterns is a repository showcasing best practices and design patterns for building multi-agent and agentic workflows in Python. This repository emphasizes modular, scalable, and reusable design techniques for intelligent automation through both single-agent and collaborative multi-agent architectures.

Companion Medium article: [Designing Cognitive Architectures: Agentic Workflow Patterns from Scratch](https://medium.com/google-cloud/designing-cognitive-architectures-agentic-workflow-patterns-from-scratch-63baa74c54bc)

## Patterns Overview

### 1. Reflection Pattern
Implements an iterative content generation and refinement system using an Actor-Critic framework. Enables self-improving content generation through continuous feedback loops between an Actor (content generator) and a Critic (content reviewer).

### 2. Web Access Pattern
Implements an agentic workflow for retrieving, processing, and summarizing web content. Orchestrates a pipeline of specialized agents handling search, scrape, and summarize operations.

### 3. Semantic Routing Pattern
Intelligently routes user queries to specialized agents based on semantic intent. Uses a coordinator-delegate architecture where a main TravelPlannerAgent determines user intent and routes requests to specialized sub-agents.

### 4. Parallel Delegation Pattern
Processes complex queries by identifying distinct entities through Named Entity Recognition (NER) and delegating these entities to specialized agents for parallel processing. Effective for independent sub-tasks executed concurrently.

### 5. Dynamic Sharding Pattern
Efficiently processes large datasets by dynamically dividing workload into smaller, manageable shards and processing them in parallel.

### 6. Task Decomposition Pattern
Divides a complex task into independent subtasks, each managed by separate Sub-Task Agents. Beneficial for enhancing efficiency and scalability.

### 7. Dynamic Decomposition Pattern
Autonomously decomposes complex tasks into multiple subtasks using an LLM to generate subtasks, processed by separate agents.

### 8. DAG Orchestration Pattern
Manages complex workflows in a flexible manner, allowing execution of multiple tasks in a specified order using a YAML-defined DAG structure.

## Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation
```bash
git clone https://github.com/arunpshankar/Agentic-Workflow-Patterns.git
cd Agentic-Workflow-Patterns
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Environment Setup
Create a credentials folder:
```bash
mkdir credentials
```

**GCP Service Account:**
1. Go to Google Cloud Console
2. Navigate to APIs & Services > Credentials
3. Create Service Account Key (JSON)
4. Save as key.json in credentials folder

**SERP API:**
1. Sign up at https://serpapi.com/
2. Obtain API key from dashboard
3. Create credentials/key.yml:
```yaml
serp:
  key: your_serp_api_key_here
```

### Environment Variables
```bash
export PYTHONDONTWRITEBYTECODE=1
export PYTHONPATH=$PYTHONPATH:.
```

## Project Structure

- `./src/patterns/` - Source code for all workflow patterns
- `./data/patterns/` - Templates for system/user prompts, JSON schemas, and agent outputs

## Running Patterns

```bash
python src/patterns/reflection/pipeline.py
```
